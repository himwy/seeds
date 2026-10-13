/**
 * Generate a JPEG thumbnail from a video by seeking to a frame and
 * drawing it to a canvas. Runs entirely in the browser — no server needed.
 *
 * Works with either a local File (during upload) or a remote URL (for
 * backfilling existing events). Remote URLs must serve permissive CORS
 * headers; Appwrite's /view endpoint does when the requesting origin is
 * registered as a Web platform on the project.
 *
 * Robustness notes (learned the hard way):
 *   - Many real-world mp4s have the `moov` atom at the END of the file,
 *     which means the browser must download the whole thing before it can
 *     seek. That's why we wait for `canplay` (or `loadeddata`) instead of
 *     just `loadedmetadata`, and why the timeout is long.
 *   - If `seeked` never fires (some encoders), fall back to drawing
 *     whatever frame the video currently has at time 0.
 */

export type ThumbnailSource = File | string;

export interface GeneratedThumbnail {
  blob: Blob;
  file: File;
  width: number;
  height: number;
}

const PREFERRED_SEEK_SECONDS = 0.5;
const JPEG_QUALITY = 0.82;
const MAX_DIMENSION = 1280;
const LOAD_TIMEOUT_MS = 120_000; // 2 min — large videos with trailing moov can take a while
const SEEK_TIMEOUT_MS = 20_000; // per-seek attempt
const BLACK_LUMA_THRESHOLD = 24; // mean luma (0-255) below this counts as "black"
const SAMPLE_FRACTIONS = [0.5, 0.1, 0.25, 0.4, 0.6, 0.75]; // fractions of duration to try

function makeFilename(source: ThumbnailSource): string {
  if (typeof source === "string") {
    try {
      const u = new URL(source);
      const parts = u.pathname.split("/").filter(Boolean);
      const filesIdx = parts.indexOf("files");
      const id = filesIdx !== -1 ? parts[filesIdx + 1] : null;
      if (id) return `thumb-${id}.jpg`;
    } catch {
      /* fall through */
    }
    return `thumb-${Date.now()}.jpg`;
  }
  const base = source.name.replace(/\.[^.]+$/, "");
  return `${base || "thumb"}.thumb.jpg`;
}

function sourceUrl(source: ThumbnailSource): {
  url: string;
  revoke: () => void;
} {
  if (typeof source === "string") {
    return { url: source, revoke: () => {} };
  }
  const url = URL.createObjectURL(source);
  return { url, revoke: () => URL.revokeObjectURL(url) };
}

function drawFrameToCanvas(video: HTMLVideoElement): {
  blob: Promise<Blob | null>;
  width: number;
  height: number;
} | null {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return null;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(vw, vh));
  const w = Math.round(vw * scale);
  const h = Math.round(vh * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, w, h);
  return {
    blob: new Promise((res) => canvas.toBlob(res, "image/jpeg", JPEG_QUALITY)),
    width: w,
    height: h,
  };
}

/** Mean luma (0-255) of a drawable, sampled on a small downscale. */
function meanLuma(source: CanvasImageSource): number {
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 32;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return 255;
  ctx.drawImage(source, 0, 0, 32, 32);
  const { data } = ctx.getImageData(0, 0, 32, 32);
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return sum / (data.length / 4);
}

/**
 * True if an existing (same-origin / CORS-enabled) image is essentially black.
 * Resolves false on any load/read failure so we never regenerate on a guess.
 */
export function isImageMostlyBlack(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        resolve(meanLuma(img) < BLACK_LUMA_THRESHOLD);
      } catch {
        resolve(false);
      }
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

function trySeek(video: HTMLVideoElement, target: number): Promise<void> {
  return new Promise((resolve, reject) => {
    let done = false;
    const onSeeked = () => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", onSeeked);
      clearTimeout(timer);
      resolve();
    };
    const timer = window.setTimeout(() => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", onSeeked);
      reject(new Error(`seek to ${target}s timed out`));
    }, SEEK_TIMEOUT_MS);
    video.addEventListener("seeked", onSeeked);
    try {
      video.currentTime = target;
    } catch (err) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      video.removeEventListener("seeked", onSeeked);
      reject(err instanceof Error ? err : new Error(String(err)));
    }
  });
}

export async function generateVideoThumbnail(
  source: ThumbnailSource,
): Promise<GeneratedThumbnail> {
  const { url, revoke } = sourceUrl(source);

  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  // crossOrigin is required so the canvas isn't tainted. Appwrite serves
  // permissive CORS on /view for registered web platforms.
  if (typeof source === "string") {
    video.crossOrigin = "anonymous";
  }

  const cleanup = () => {
    revoke();
    video.removeAttribute("src");
    try {
      video.load();
    } catch {
      /* ignore */
    }
  };

  // Wait until enough of the video has loaded that we can read a frame.
  const ready = new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new Error("Video failed to become ready within 2 minutes")),
      LOAD_TIMEOUT_MS,
    );
    const onReady = () => {
      window.clearTimeout(timer);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
      resolve();
    };
    const onError = () => {
      window.clearTimeout(timer);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", onError);
      const code = video.error?.code;
      const codeName =
        code === 1
          ? "MEDIA_ERR_ABORTED"
          : code === 2
            ? "MEDIA_ERR_NETWORK"
            : code === 3
              ? "MEDIA_ERR_DECODE"
              : code === 4
                ? "MEDIA_ERR_SRC_NOT_SUPPORTED (often CORS)"
                : `code=${code}`;
      reject(new Error(`Video load failed: ${codeName}`));
    };
    video.addEventListener("canplay", onReady, { once: true });
    video.addEventListener("loadeddata", onReady, { once: true });
    video.addEventListener("error", onError, { once: true });
  });

  try {
    video.src = url;
    await ready;

    // Many videos fade in from black, so one frame near t=0 is often black.
    // Try several points and keep the first non-black frame; if all are dark,
    // keep the brightest.
    const duration = isFinite(video.duration) ? video.duration : 0;
    const targets =
      duration > 0
        ? SAMPLE_FRACTIONS.map((f) =>
            f === 0.5
              ? Math.min(PREFERRED_SEEK_SECONDS, duration / 2)
              : duration * f,
          )
        : [PREFERRED_SEEK_SECONDS];

    let drawn: ReturnType<typeof drawFrameToCanvas> = null;
    let bestLuma = -1;
    for (const target of targets) {
      try {
        await trySeek(video, target);
      } catch {
        // Seek stalled: use whatever frame is currently showing.
      }
      const candidate = drawFrameToCanvas(video);
      if (!candidate) continue;
      let luma = 255;
      try {
        luma = meanLuma(video);
      } catch {
        /* tainted canvas: accept the frame; toBlob will report it */
      }
      if (luma > bestLuma) {
        bestLuma = luma;
        drawn = candidate;
      }
      if (luma >= BLACK_LUMA_THRESHOLD) break;
    }
    if (!drawn) {
      throw new Error("Video has no dimensions or canvas unavailable");
    }
    const blob = await drawn.blob;
    if (!blob) {
      throw new Error(
        "Canvas produced no blob (canvas tainted — check CORS / web platform whitelist on Appwrite)",
      );
    }
    const filename = makeFilename(source);
    const file = new File([blob], filename, { type: "image/jpeg" });
    return { blob, file, width: drawn.width, height: drawn.height };
  } finally {
    cleanup();
  }
}

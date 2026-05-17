/**
 * Generate a JPEG thumbnail from a video by seeking to a frame and
 * drawing it to a canvas. Runs entirely in the browser — no server needed.
 *
 * Works with either a local File (during upload) or a remote URL (for
 * backfilling existing events). Remote URLs must serve permissive CORS
 * headers; Appwrite's /view endpoint does.
 */

export type ThumbnailSource = File | string;

export interface GeneratedThumbnail {
  blob: Blob;
  file: File;
  width: number;
  height: number;
}

const SEEK_SECONDS = 0.5;
const JPEG_QUALITY = 0.82;
const MAX_DIMENSION = 1280;

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

export async function generateVideoThumbnail(
  source: ThumbnailSource,
): Promise<GeneratedThumbnail> {
  const { url, revoke } = sourceUrl(source);

  return new Promise<GeneratedThumbnail>((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    let settled = false;
    const cleanup = () => {
      revoke();
      video.removeAttribute("src");
      try {
        video.load();
      } catch {
        /* ignore */
      }
    };
    const fail = (reason: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(reason));
    };

    const timeout = window.setTimeout(
      () => fail("Video thumbnail generation timed out"),
      30_000,
    );

    video.addEventListener("error", () => fail("Failed to load video for thumbnail"));

    video.addEventListener(
      "loadedmetadata",
      () => {
        const seekTo = Math.min(SEEK_SECONDS, Math.max(0, (video.duration || 1) / 2));
        try {
          video.currentTime = seekTo;
        } catch {
          fail("Could not seek video for thumbnail");
        }
      },
      { once: true },
    );

    video.addEventListener(
      "seeked",
      () => {
        try {
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          if (!vw || !vh) {
            fail("Video has no dimensions");
            return;
          }
          const scale = Math.min(1, MAX_DIMENSION / Math.max(vw, vh));
          const w = Math.round(vw * scale);
          const h = Math.round(vh * scale);

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            fail("Canvas 2D context unavailable");
            return;
          }
          ctx.drawImage(video, 0, 0, w, h);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                fail("Canvas produced no blob (likely tainted by CORS)");
                return;
              }
              if (settled) return;
              settled = true;
              window.clearTimeout(timeout);
              const filename = makeFilename(source);
              const file = new File([blob], filename, { type: "image/jpeg" });
              cleanup();
              resolve({ blob, file, width: w, height: h });
            },
            "image/jpeg",
            JPEG_QUALITY,
          );
        } catch (err) {
          fail(
            err instanceof Error
              ? err.message
              : "Failed to draw video frame to canvas",
          );
        }
      },
      { once: true },
    );

    video.src = url;
  });
}

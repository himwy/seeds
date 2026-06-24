"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaPlay,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Recent Events",
    heroSubtitle: "Celebrating Our Journey",
    heroDescription:
      "Explore our latest milestones, achievements, and memorable moments that shape our company's legacy.",
    viewGallery: "View Gallery",
    noEvents: "No recent events yet",
    loading: "Loading events...",
    error: "Unable to load events",
    photosCount: "photos",
    videosCount: "videos",
    mediaCount: "items",
    eventsTitle: "Recent Events",
    sortBy: "Sort by",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    stayTuned: "Stay tuned for exciting new events!",
    tryAgain: "Try Again",
    exploreEvent: "Explore Event",
    recentActivity: "Recent Activity",
  },
  "zh-HK": {
    pageTitle: "最近活動",
    heroSubtitle: "慶祝我們的旅程",
    heroDescription: "探索我們最新的里程碑、成就和塑造公司傳承的難忘時刻。",
    viewGallery: "查看相冊",
    noEvents: "暫無最近活動",
    loading: "載入活動中...",
    error: "無法載入活動",
    photosCount: "張相片",
    videosCount: "段影片",
    mediaCount: "項媒體",
    eventsTitle: "最近活動",
    sortBy: "排序方式",
    sortNewest: "最新優先",
    sortOldest: "最舊優先",
    stayTuned: "敬請期待精彩的新活動！",
    tryAgain: "重試",
    exploreEvent: "探索活動",
    recentActivity: "最近活動",
  },
};

export default function RecentEventsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");

  useEffect(() => {
    loadEvents();
  }, []);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return [".mp4", ".mov", ".avi", ".webm", ".mkv", ".m4v"].some((ext) =>
      lower.includes(ext)
    ) || lower.includes("video");
  };

  // Thumbnails load via the cached image proxy (/api/image) for fast, reliable
  // delivery. If the proxy fails, fall back to the direct Appwrite URL; if that
  // also fails, hide the broken image so the dark placeholder (with the play
  // icon for videos) shows instead of a broken-image icon.
  const handleThumbnailError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    directUrl: string
  ) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "direct") {
      img.style.display = "none";
    } else {
      img.dataset.fallback = "direct";
      img.src = directUrl;
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await EventsService.getEventsByCategory("recent");
      console.log(`Loaded ${eventsData.length} recent events`);
      setEvents(eventsData);
    } catch (err) {
      setError(t.error);
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "zh-HK" ? "zh-HK" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* ─── Masthead ─────────────────────────────────────── */}
      <section className="border-b border-stone-200/70">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-10 text-[10px] md:text-xs uppercase tracking-[0.35em] text-stone-500">
              <span className="h-px w-10 bg-amber-500" />
              <span>Chronicle / {t.recentActivity}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-stone-900">
              {t.pageTitle}
            </h1>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              <p className="md:col-span-7 text-lg md:text-xl text-stone-600 leading-relaxed">
                {t.heroDescription}
              </p>
              <p className="md:col-span-5 italic text-stone-500 md:text-right">
                — {t.heroSubtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Sticky meta bar ──────────────────────────────── */}
      {!loading && !error && events.length > 0 && (
        <div className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/85 backdrop-blur supports-[backdrop-filter]:bg-stone-50/70">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 tabular-nums">
              {sortedEvents.length}{" "}
              {sortedEvents.length === 1 ? "entry" : "entries"}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500">
                {t.sortBy}
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-b border-stone-300 px-1 py-1 text-sm text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                <option value="newest">{t.sortNewest}</option>
                <option value="oldest">{t.sortOldest}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ─── Body ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 md:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-stone-500">
              {t.loading}
            </p>
          </div>
        ) : error ? (
          <div className="py-32 text-center">
            <p className="text-3xl font-bold text-stone-900 mb-6">{t.error}</p>
            <button
              onClick={loadEvents}
              className="px-8 py-3 bg-stone-900 text-white text-sm uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="py-32 text-center">
            <div className="text-[10px] uppercase tracking-[0.35em] text-stone-500 mb-6">
              {t.recentActivity}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
              {t.noEvents}
            </h2>
            <p className="text-stone-500">{t.stayTuned}</p>
          </div>
        ) : (
          <ol className="divide-y divide-stone-200 border-y border-stone-200">
            {sortedEvents.map((event, index) => {
              const firstMedia = event.images?.[0];
              const isVideoEvent =
                event.isVideo || (firstMedia ? isVideoUrl(firstMedia) : false);
              const posterSrc =
                event.thumbnail || (isVideoEvent ? null : firstMedia);
              const indexLabel = String(index + 1).padStart(2, "0");
              const title =
                language === "zh-HK" ? event.chineseName : event.name;
              const subtitle =
                language === "zh-HK" ? event.name : event.chineseName;

              return (
                <motion.li
                  key={event.$id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.02, 0.2),
                  }}
                >
                  <Link
                    href={`/events/${event.$id}`}
                    className="group flex items-stretch gap-5 md:gap-8 py-5 md:py-6 outline-none focus-visible:bg-stone-100/60 transition-colors hover:bg-stone-100/40 -mx-3 px-3 rounded-sm"
                  >
                    {/* Index */}
                    <div className="hidden md:flex flex-col items-end justify-center w-12 shrink-0 text-stone-400">
                      <span className="text-xl font-bold tabular-nums">
                        {indexLabel}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-28 h-28 md:w-40 md:h-28 shrink-0 overflow-hidden bg-stone-900">
                      {posterSrc ? (
                        <>
                          <img
                            src={EventsService.getProxiedUrl(posterSrc)}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => handleThumbnailError(e, posterSrc)}
                          />
                          {isVideoEvent && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                              <div className="rounded-full bg-stone-50/95 backdrop-blur p-2.5 shadow-md">
                                <FaPlay className="text-stone-900 text-[10px] md:text-xs" />
                              </div>
                            </div>
                          )}
                        </>
                      ) : firstMedia ? (
                        <>
                          <video
                            src={firstMedia}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(e) => {
                              e.currentTarget.currentTime = 0.1;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="rounded-full bg-stone-50/95 backdrop-blur p-2.5 shadow-md">
                              <FaPlay className="text-stone-900 text-[10px] md:text-xs" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950">
                          <div className="rounded-full bg-stone-50/95 backdrop-blur p-2.5">
                            <FaPlay className="text-stone-900 text-[10px] md:text-xs" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-stone-500">
                        <span className="md:hidden font-bold tabular-nums text-stone-400">
                          {indexLabel}
                        </span>
                        <span className="md:hidden text-stone-300">·</span>
                        <span className="h-px w-6 bg-amber-500" />
                        <time dateTime={event.date}>
                          {formatDate(event.date)}
                        </time>
                        <span className="text-stone-300">·</span>
                        <span className="inline-flex items-center gap-1.5">
                          {isVideoEvent ? (
                            <FaPlay className="text-[7px] text-amber-600" />
                          ) : (
                            <span className="block h-1 w-1 rounded-full bg-stone-400" />
                          )}
                          {event.images.length}{" "}
                          {isVideoEvent ? t.videosCount : t.photosCount}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-stone-700 line-clamp-2">
                        {title}
                      </h2>
                      {subtitle && (
                        <p className="hidden md:block text-sm md:text-base text-stone-500 italic line-clamp-1 mt-1">
                          {subtitle}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center text-stone-400 group-hover:text-stone-900 transition-colors">
                      <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}

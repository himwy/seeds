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
    pageTitle: "Past Events",
    heroSubtitle: "Our Legacy & Memories",
    heroDescription:
      "Journey through our cherished memories and unforgettable moments that have shaped our company's rich history.",
    viewGallery: "View Gallery",
    noEvents: "No past events yet",
    loading: "Loading events...",
    error: "Unable to load events",
    photosCount: "photos",
    videosCount: "videos",
    mediaCount: "items",
    eventsTitle: "Past Events",
    sortBy: "Sort by",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    stayTuned: "Stay tuned for exciting new events!",
    tryAgain: "Try Again",
    exploreEvent: "Explore Event",
    recentActivity: "Past Activity",
  },
  "zh-HK": {
    pageTitle: "過往活動",
    heroSubtitle: "我們的傳承與回憶",
    heroDescription:
      "穿越我們珍貴的回憶和難忘的時刻，這些塑造了我們公司豐富的歷史。",
    viewGallery: "查看相冊",
    noEvents: "暫無過往活動",
    loading: "載入活動中...",
    error: "無法載入活動",
    photosCount: "張相片",
    videosCount: "段影片",
    mediaCount: "項媒體",
    eventsTitle: "過往活動",
    sortBy: "排序方式",
    sortNewest: "最新優先",
    sortOldest: "最舊優先",
    stayTuned: "敬請期待精彩的新活動！",
    tryAgain: "重試",
    exploreEvent: "探索活動",
    recentActivity: "過往活動",
  },
};

export default function PastEventsPage() {
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

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await EventsService.getEventsByCategory("past");
      console.log(`Loaded ${eventsData.length} past events`);
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

  const sortedEvents = events.sort((a, b) => {
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
              <span>Archive / {t.recentActivity}</span>
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
          <ol className="divide-y divide-stone-200">
            {sortedEvents.map((event, index) => {
              const firstMedia = event.images?.[0];
              const isVideoEvent =
                event.isVideo || (firstMedia ? isVideoUrl(firstMedia) : false);
              const posterSrc =
                event.thumbnail || (isVideoEvent ? null : firstMedia);
              const indexLabel = String(index + 1).padStart(2, "0");
              const totalLabel = String(sortedEvents.length).padStart(2, "0");
              const title =
                language === "zh-HK" ? event.chineseName : event.name;
              const subtitle =
                language === "zh-HK" ? event.name : event.chineseName;

              return (
                <motion.li
                  key={event.$id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.04, 0.24),
                  }}
                >
                  <Link
                    href={`/events/${event.$id}`}
                    className="group block py-14 md:py-20 first:pt-0 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50"
                  >
                    {/* Meta row — index + title */}
                    <div className="grid grid-cols-12 gap-6 md:gap-10 items-baseline mb-8 md:mb-10">
                      <div className="col-span-3 md:col-span-2">
                        <span className="block text-3xl md:text-5xl font-bold text-stone-900 tabular-nums leading-none">
                          {indexLabel}
                        </span>
                        <span className="block mt-2 text-[10px] uppercase tracking-[0.3em] text-stone-400 tabular-nums">
                          / {totalLabel}
                        </span>
                      </div>
                      <div className="col-span-9 md:col-span-10">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500">
                          <span className="h-px w-8 bg-amber-500" />
                          <time dateTime={event.date}>
                            {formatDate(event.date)}
                          </time>
                          <span className="text-stone-300">·</span>
                          <span className="inline-flex items-center gap-2">
                            {isVideoEvent ? (
                              <FaPlay className="text-[8px] text-amber-600" />
                            ) : (
                              <span className="block h-1 w-1 rounded-full bg-stone-400" />
                            )}
                            {event.images.length}{" "}
                            {isVideoEvent ? t.videosCount : t.photosCount}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-stone-900 transition-colors group-hover:text-stone-700 mb-2">
                          {title}
                        </h2>
                        {subtitle && (
                          <p className="text-lg md:text-2xl text-stone-500 italic">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-900">
                      {posterSrc ? (
                        <>
                          <img
                            src={posterSrc}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                          {isVideoEvent && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-500 group-hover:bg-black/30">
                              <div className="rounded-full bg-stone-50/95 backdrop-blur p-5 shadow-lg transition-transform duration-500 group-hover:scale-105">
                                <FaPlay className="text-stone-900 text-xl" />
                              </div>
                            </div>
                          )}
                          {/* Top-right index for emphasis */}
                          <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.3em] text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5">
                            {indexLabel}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-950">
                          <div className="rounded-full bg-stone-50/95 backdrop-blur p-5">
                            <FaPlay className="text-stone-900 text-xl" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA row */}
                    <div className="mt-6 md:mt-8 flex items-center gap-6">
                      <div className="hidden md:block flex-1 h-px bg-stone-200 transition-colors duration-500 group-hover:bg-stone-900" />
                      <span className="inline-flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-stone-900">
                        {t.exploreEvent}
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
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

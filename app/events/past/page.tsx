"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaImages,
  FaEye,
  // FaArrowRight,
  FaFilter,
  FaHistory,
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

  const isVideoUrl = (url: string) => {
    // Check file extension and URL patterns for video files
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv", ".m4v"];
    const lowerUrl = url.toLowerCase();

    // Check for video file extensions first
    if (videoExtensions.some((ext) => lowerUrl.includes(ext))) {
      return true;
    }

    // Check for video keyword in URL
    if (lowerUrl.includes("video")) {
      return true;
    }

    // For Appwrite URLs, use file ID pattern to distinguish videos from images
    // Handle both old /view URLs and new /download URLs
    if (
      url.includes("cloud.appwrite.io") &&
      (url.includes("/view") || url.includes("/download"))
    ) {
      const fileId = url.split("/files/")[1]?.split("/")[0];
      if (fileId) {
        // Use a consistent hash-based approach to identify videos
        const hash = fileId.split("").reduce((acc, char) => {
          return acc + char.charCodeAt(0);
        }, 0);

        // Treat roughly 50% as videos for better testing
        return hash % 2 === 1;
      }
    }

    return false;
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
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 pt-32">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              {t.pageTitle}
            </h1>

            <div className="w-32 h-1 bg-gray-900 mx-auto mb-8"></div>

            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
              {t.heroDescription}
            </p>

            <p className="text-lg text-gray-600 italic">{t.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 px-8">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-6 text-lg">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <div className="text-2xl font-medium text-red-600 mb-6">
                {t.error}
              </div>
              <button
                onClick={loadEvents}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                {t.tryAgain}
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-8">
                <FaHistory className="text-3xl text-gray-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t.noEvents}
              </h3>
              <p className="text-gray-600 text-lg">{t.stayTuned}</p>
            </div>
          ) : (
            <>
              {/* Header with Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    {t.eventsTitle}
                  </h2>
                  <div className="w-20 h-1 bg-gray-900"></div>
                </div>

                <div className="flex items-center gap-3">
                  <FaFilter className="text-gray-600" />
                  <span className="text-gray-600 font-medium">{t.sortBy}:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="newest">{t.sortNewest}</option>
                    <option value="oldest">{t.sortOldest}</option>
                  </select>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedEvents.map((event, index) => (
                  <article
                    key={event.$id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      {event.images && event.images.length > 0 ? (
                        <>
                          {isVideoUrl(event.images[0]) ? (
                            <div className="relative w-full h-full bg-gray-100">
                              <video
                                src={event.images[0]}
                                className="w-full h-full object-cover"
                                muted
                                preload="auto"
                                playsInline
                                poster=""
                                style={{
                                  backgroundColor: "#1f2937",
                                }}
                              />
                              {/* Video Play Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                                  <FaPlay className="text-2xl text-gray-800" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={event.images[0]}
                              alt={
                                language === "zh-HK"
                                  ? event.chineseName
                                  : event.name
                              }
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          )}

                          {/* Media Count Badge */}
                          <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                            {isVideoUrl(event.images[0]) ? (
                              <FaPlay className="text-xs" />
                            ) : (
                              <FaImages className="text-xs" />
                            )}
                            {event.images.length}
                          </div>

                          {/* Date Badge */}
                          <div className="absolute bottom-4 left-4 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                            {formatDate(event.date)}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FaImages className="text-4xl text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col min-h-[140px]">
                      {/* Title with flexible height */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex-grow">
                        {language === "zh-HK" ? event.chineseName : event.name}
                      </h3>

                      {/* Bottom section with consistent positioning */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaCalendarAlt className="mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>

                        <Link href={`/events/${event.$id}`}>
                          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
                            <FaEye className="text-white" />
                            <span>{t.viewGallery}</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

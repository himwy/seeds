"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaImages,
  FaArrowRight,
  FaFilter,
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
    eventsTitle: "Recent Highlights",
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
    eventsTitle: "最近亮點",
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

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await EventsService.getEventsByCategory("recent");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sophisticated Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        <div className="relative px-4 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                {t.pageTitle}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light mb-4 max-w-3xl mx-auto">
                {t.heroSubtitle}
              </p>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {t.heroDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-200 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-600 mt-6 text-lg">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <div className="text-2xl font-light text-red-600 mb-6">
                {t.error}
              </div>
              <button
                onClick={loadEvents}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t.tryAgain}
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaCalendarAlt className="text-3xl text-slate-400" />
              </div>
              <h3 className="text-3xl font-light text-slate-700 mb-4">
                {t.noEvents}
              </h3>
              <p className="text-slate-500 text-lg">{t.stayTuned}</p>
            </div>
          ) : (
            <>
              {/* Header with Sort */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-2">
                    {t.eventsTitle}
                  </h2>
                  <p className="text-slate-600">{t.recentActivity}</p>
                </div>

                <div className="flex items-center gap-3">
                  <FaFilter className="text-slate-400" />
                  <span className="text-slate-600 font-medium">
                    {t.sortBy}:
                  </span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-medium focus:ring-2 focus:ring-slate-300 focus:border-slate-300 shadow-sm"
                  >
                    <option value="newest">{t.sortNewest}</option>
                    <option value="oldest">{t.sortOldest}</option>
                  </select>
                </div>
              </div>

              {/* Sophisticated Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedEvents.map((event, index) => (
                  <motion.article
                    key={event.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      {event.images && event.images.length > 0 ? (
                        <>
                          <img
                            src={EventsService.convertUrlToDirectView(event.images[0])}
                            alt={
                              language === "zh-HK"
                                ? event.chineseName
                                : event.name
                            }
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                          {/* Photo Count Badge */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                            <FaImages className="text-xs" />
                            {event.images.length}
                          </div>

                          {/* Date Badge */}
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                            {formatDate(event.date)}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <FaImages className="text-4xl text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-600 transition-colors">
                        {language === "zh-HK" ? event.chineseName : event.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-500 text-sm">
                          <FaCalendarAlt className="mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>

                        {/* Elegant Button */}
                        <Link href={`/events/${event.$id}`}>
                          <button className="group/btn flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-all duration-300">
                            <span>{t.exploreEvent}</span>
                            <FaArrowRight className="text-xs transform transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

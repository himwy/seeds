"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaImages,
  FaHistory,
  FaEye,
  FaClock,
  FaStar,
  FaGem,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Past Events",
    pageSubtitle: "Memory Lane Gallery",
    heroDescription:
      "Journey through our cherished memories and unforgettable company moments.",

    viewPhotos: "View Memories",
    noEvents: "No past events archived",
    loading: "Loading memories...",
    error: "Failed to load memories",
    photosCount: "photos",
    classicEvent: "✨ CLASSIC",
    memoryVault: "Memory Vault",
  },
  "zh-HK": {
    pageTitle: "過往活動",
    pageSubtitle: "回憶走廊",
    heroDescription: "穿越我們珍貴的回憶和難忘的公司時刻。",

    viewPhotos: "查看回憶",
    noEvents: "沒有過往活動記錄",
    loading: "載入回憶中...",
    error: "載入回憶失敗",
    photosCount: "張相片",
    classicEvent: "✨ 經典",
    memoryVault: "回憶寶庫",
  },
};

export default function PastEventsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await EventsService.getEventsByCategory("past");
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

  const getEventAge = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - eventDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 365) {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Vintage Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Vintage Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* Vintage Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>

          {/* Floating Vintage Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center py-12 z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mb-6 shadow-2xl border-4 border-white/20">
              <FaHistory className="text-4xl text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
              {t.pageTitle}
            </h1>

            <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-6 py-3 rounded-full text-xl font-bold inline-block mb-6 shadow-lg border-2 border-white/30">
              <FaGem className="inline mr-2" />
              {t.pageSubtitle}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto font-medium drop-shadow-md"
          >
            {t.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Memory Gallery */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mb-4 animate-spin">
                <FaClock className="text-2xl text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {t.loading}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-2xl font-bold text-purple-600 mb-4">
                💔 {error}
              </div>
              <button
                onClick={loadEvents}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📚</div>
              <div className="text-2xl font-bold text-gray-600 mb-4">
                {t.noEvents}
              </div>
              <p className="text-gray-500">
                Our memory vault is waiting to be filled!
              </p>
            </div>
          ) : (
            <>
              {/* Memory Stats */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 mb-12 shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-black flex items-center justify-center">
                    <FaGem className="mr-3" />
                    {t.memoryVault}
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-black mb-2">
                      {events.length}
                    </div>
                    <div className="text-purple-200">Archived Events</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-black mb-2">
                      {events.reduce(
                        (total, event) => total + (event.images?.length || 0),
                        0
                      )}
                    </div>
                    <div className="text-purple-200">Precious Memories</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-4xl font-black mb-2">
                      {events.length > 0
                        ? Math.min(
                            ...events.map((e) => new Date(e.date).getFullYear())
                          )
                        : new Date().getFullYear()}
                    </div>
                    <div className="text-purple-200">Since Year</div>
                  </div>
                </div>
              </div>

              {/* Vintage Timeline Grid */}
              <div className="space-y-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.$id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Event Image */}
                    <div className="flex-1 group">
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50 hover:border-purple-300 transition-all duration-300">
                        {event.images && event.images.length > 0 ? (
                          <>
                            <img
                              src={event.images[0]}
                              alt={
                                language === "zh-HK"
                                  ? event.chineseName
                                  : event.name
                              }
                              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 filter sepia-0 group-hover:sepia-[0.3]"
                            />
                            {/* Vintage Photo Count */}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg border border-white/30">
                              <FaImages className="mr-2" />
                              {event.images.length} {t.photosCount}
                            </div>
                            {/* Classic Badge */}
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                              <FaStar className="inline mr-1" />
                              {t.classicEvent}
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-80 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <FaImages className="text-6xl text-gray-500" />
                          </div>
                        )}

                        {/* Vintage Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                          <Link
                            href={`/events/${event.$id}`}
                            className="text-white font-bold text-xl flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all"
                          >
                            <FaEye className="mr-2" />
                            {t.viewPhotos}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-200 hover:shadow-2xl transition-all duration-300">
                        <div className="mb-4">
                          <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                            {getEventAge(event.date)}
                          </span>
                        </div>

                        <h3 className="text-3xl font-black text-gray-800 mb-3 hover:text-purple-600 transition-colors">
                          {language === "zh-HK"
                            ? event.chineseName
                            : event.name}
                        </h3>

                        <div className="flex items-center justify-center lg:justify-start text-gray-600 mb-6">
                          <FaCalendarAlt className="mr-3 text-purple-500" />
                          <span className="text-lg font-medium">
                            {formatDate(event.date)}
                          </span>
                        </div>

                        <Link href={`/events/${event.$id}`}>
                          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 px-8 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center mx-auto lg:mx-0">
                            <FaGem className="mr-2" />
                            {t.viewPhotos}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

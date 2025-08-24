"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaImages,
  FaFire,
  FaEye,
  FaClock,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Recent Events",
    pageSubtitle: "Latest Company Happenings",
    heroDescription:
      "Fresh from the oven! Check out our newest company events and celebrations.",

    viewPhotos: "View Gallery",
    noEvents: "No recent events yet",
    loading: "Loading recent events...",
    error: "Failed to load events",
    photosCount: "photos",
    hotEvent: "🔥 HOT",
    newEvent: "NEW!",
  },
  "zh-HK": {
    pageTitle: "最新活動",
    pageSubtitle: "最新公司動態",
    heroDescription: "熱騰騰出爐！查看我們最新的公司活動和慶祝活動。",

    viewPhotos: "查看相冊",
    noEvents: "暫無最新活動",
    loading: "載入最新活動中...",
    error: "載入活動失敗",
    photosCount: "張相片",
    hotEvent: "🔥 熱門",
    newEvent: "新！",
  },
};

export default function RecentEventsPage() {
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
      month: "short",
      day: "numeric",
    });
  };

  const isNewEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - eventDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Events within 7 days are considered "new"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Epic Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-red-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-orange-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center py-12 z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl animate-pulse">
              <FaFire className="text-4xl text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
              {t.pageTitle}
            </h1>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-xl font-bold inline-block mb-6 shadow-lg animate-pulse">
              {t.pageSubtitle}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium drop-shadow-md"
          >
            {t.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Events Gallery */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4 animate-spin">
                <FaClock className="text-2xl text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {t.loading}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-2xl font-bold text-red-600 mb-4">
                💥 {error}
              </div>
              <button
                onClick={loadEvents}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📅</div>
              <div className="text-2xl font-bold text-gray-600 mb-4">
                {t.noEvents}
              </div>
              <p className="text-gray-500">
                Stay tuned for exciting new events!
              </p>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 mb-12 shadow-xl">
                <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                  <div>
                    <div className="text-3xl font-black">{events.length}</div>
                    <div className="text-orange-100">Recent Events</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">
                      {events.reduce(
                        (total, event) => total + (event.images?.length || 0),
                        0
                      )}
                    </div>
                    <div className="text-orange-100">Total Photos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black">
                      {events.filter((event) => isNewEvent(event.date)).length}
                    </div>
                    <div className="text-orange-100">This Week</div>
                  </div>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.$id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    {/* Event Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-transparent hover:border-orange-200">
                      {/* Image Container */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                        {event.images && event.images.length > 0 ? (
                          <>
                            <img
                              src={event.images[0]}
                              alt={
                                language === "zh-HK"
                                  ? event.chineseName
                                  : event.name
                              }
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Photo Count Badge */}
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                              <FaImages className="mr-1" />
                              {event.images.length}
                            </div>
                            {/* New Event Badge */}
                            {isNewEvent(event.date) && (
                              <div className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                {t.newEvent}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaImages className="text-6xl text-gray-400" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <div className="text-white font-bold text-lg flex items-center">
                            <FaEye className="mr-2" />
                            {t.viewPhotos}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                          {language === "zh-HK"
                            ? event.chineseName
                            : event.name}
                        </h3>

                        <div className="flex items-center text-gray-500 mb-4">
                          <FaCalendarAlt className="mr-2 text-orange-500" />
                          <span className="font-medium">
                            {formatDate(event.date)}
                          </span>
                        </div>

                        {/* Action Button */}
                        <Link href={`/events/${event.$id}`} className="block">
                          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                            <FaImages className="mr-2" />
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

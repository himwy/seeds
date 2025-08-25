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
  FaArrowLeft,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Recent Events",
    pageSubtitle: "",
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
    pageTitle: "最近活動",
    pageSubtitle: "",
    heroDescription: "熱騰騰出爐！查看我們最近的公司活動和慶祝活動。",

    viewPhotos: "查看相冊",
    noEvents: "暫無最近活動",
    loading: "載入最近活動中...",
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
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Professional Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                  <FaArrowLeft /> Back to Events
                </Link>
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium tracking-wide">
                  {t.pageSubtitle}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t.pageTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                {t.heroDescription}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaCalendarAlt className="text-gray-700" />
                  <span className="font-medium">{events.length} Events</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="bg-gray-100 rounded-xl p-12 border-2 border-dashed border-gray-300">
                  <FaImages className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg text-center">
                    Recent event highlights
                  </p>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    (Featured images will be displayed here)
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-xl font-semibold text-red-600 mb-4">
                {error}
              </div>
              <button
                onClick={loadEvents}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-6" />
              <div className="text-2xl font-bold text-gray-600 mb-4">
                {t.noEvents}
              </div>
              <p className="text-gray-500">
                Stay tuned for exciting new events!
              </p>
            </div>
          ) : (
            <>
              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 mb-16 shadow-lg border border-gray-200"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{events.length}</div>
                    <div className="text-gray-600 font-medium">Recent Events</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.reduce(
                        (total, event) => total + (event.images?.length || 0),
                        0
                      )}
                    </div>
                    <div className="text-gray-600 font-medium">Total Photos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.filter((event) => isNewEvent(event.date)).length}
                    </div>
                    <div className="text-gray-600 font-medium">This Week</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {new Date().getFullYear()}
                    </div>
                    <div className="text-gray-600 font-medium">Current Year</div>
                  </div>
                </div>
              </motion.div>

              {/* Events Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      {event.images && event.images.length > 0 ? (
                        <>
                          <img
                            src={event.images[0]}
                            alt={
                              language === "zh-HK"
                                ? event.chineseName
                                : event.name
                            }
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          {/* Photo Count Badge */}
                          <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <FaImages className="mr-1" />
                            {event.images.length}
                          </div>
                          {/* New Event Badge */}
                          {isNewEvent(event.date) && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                              {t.newEvent}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImages className="text-4xl text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {language === "zh-HK"
                          ? event.chineseName
                          : event.name}
                      </h3>

                      <div className="flex items-center text-gray-500 mb-4">
                        <FaCalendarAlt className="mr-2 text-gray-700" />
                        <span className="font-medium">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Link href={`/events/${event.$id}`}>
                        <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
                          <FaEye />
                          {t.viewPhotos}
                        </button>
                      </Link>
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

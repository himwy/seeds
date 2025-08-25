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
  FaArrowLeft,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Past Events",
    pageSubtitle: "",
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
    pageSubtitle: "",
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
                  <span className="font-medium">{events.length} Memories</span>
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
                  <FaHistory className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg text-center">
                    Memory vault collection
                  </p>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    (Vintage memories will be displayed here)
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Memory Gallery */}
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
              <FaHistory className="text-6xl text-gray-300 mx-auto mb-6" />
              <div className="text-2xl font-bold text-gray-600 mb-4">
                {t.noEvents}
              </div>
              <p className="text-gray-500">
                Our memory vault is waiting to be filled!
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
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <FaGem className="text-amber-500" />
                    {t.memoryVault}
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.length}
                    </div>
                    <div className="text-gray-600 font-medium">Archived Events</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.reduce(
                        (total, event) => total + (event.images?.length || 0),
                        0
                      )}
                    </div>
                    <div className="text-gray-600 font-medium">Vintage Photos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.length > 0 ? new Set(events.map(event => new Date(event.date).getFullYear())).size : 0}
                    </div>
                    <div className="text-gray-600 font-medium">Years Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {events.length > 0 ? Math.max(...events.map(event => new Date().getFullYear() - new Date(event.date).getFullYear())) : 0}+
                    </div>
                    <div className="text-gray-600 font-medium">Years Old</div>
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
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 filter sepia-0 hover:sepia-[0.1]"
                          />
                          {/* Photo Count Badge */}
                          <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <FaImages className="mr-1" />
                            {event.images.length}
                          </div>
                          {/* Classic Badge */}
                          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {t.classicEvent}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImages className="text-4xl text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-sm font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                          {getEventAge(event.date)}
                        </span>
                      </div>

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

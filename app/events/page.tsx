"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaImages,
  FaHistory,
  FaClock,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaGem,
  FaFire,
} from "react-icons/fa";
import { EventsService, Event } from "../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Company Events",
    heroTitle: "Company Events & Celebrations",
    heroSubtitle: "Building Memories Together",
    heroDescription: "Discover our vibrant company culture through memorable events, team celebrations, and milestone achievements that bring our team together.",
    
    recentEventsTitle: "Recent Events",
    recentEventsDescription: "Stay up-to-date with our newest activities and celebrations",
    
    pastEventsTitle: "Memory Vault", 
    pastEventsDescription: "Explore our cherished moments and memorable celebrations",
    
    viewAll: "View All",
    viewGallery: "View Gallery",
    noRecentEvents: "No recent events to display",
    noPastEvents: "No past events archived",
    photosCount: "photos",
    
    featuredEvents: "Featured Events",
    browseCategories: "Browse Categories",
    
    loadMore: "Load More Events",
    
    eventStats: {
      totalEvents: "Total Events",
      happyMoments: "Happy Moments", 
      teamMembers: "Team Members",
      memories: "Memories Created"
    }
  },
  "zh-HK": {
    pageTitle: "公司活動",
    heroTitle: "公司活動與慶典",
    heroSubtitle: "共建美好回憶",
    heroDescription: "通過難忘的活動、團隊慶祝和里程碑成就，發現我們充滿活力的公司文化，這些都將我們的團隊凝聚在一起。",
    
    recentEventsTitle: "最近活動",
    recentEventsDescription: "了解我們最新的公司動態",
    
    pastEventsTitle: "回憶寶庫",
    pastEventsDescription: "探索我們珍貴的時刻和難忘的慶祝活動",
    
    viewAll: "查看全部",
    viewGallery: "查看相冊",
    noRecentEvents: "暫無最近活動",
    noPastEvents: "沒有過往活動記錄",
    photosCount: "張相片",
    
    featuredEvents: "精選活動",
    browseCategories: "瀏覽分類",
    
    loadMore: "載入更多活動",
    
    eventStats: {
      totalEvents: "總活動數",
      happyMoments: "快樂時光",
      teamMembers: "團隊成員",
      memories: "創造回憶"
    }
  }
};

export default function EventsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const [recent, past] = await Promise.all([
          EventsService.getEventsByCategory('recent'),
          EventsService.getEventsByCategory('past')
        ]);
        setRecentEvents(recent.slice(0, 3)); // Show only first 3
        setPastEvents(past.slice(0, 3)); // Show only first 3
      } catch (err) {
        setError("Failed to load events");
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const stats = [
    {
      icon: FaCalendarAlt,
      number: `${recentEvents.length + pastEvents.length}+`,
      label: t.eventStats.totalEvents
    },
    {
      icon: FaStar,
      number: "500+",
      label: t.eventStats.happyMoments
    },
    {
      icon: FaUsers,
      number: "50+",
      label: t.eventStats.teamMembers
    },
    {
      icon: FaGem,
      number: "1000+",
      label: t.eventStats.memories
    }
  ];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
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
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium tracking-wide">
                  {t.heroSubtitle}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                {t.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/events/recent"
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaFire className="text-white" />
                  Recent Events
                </Link>
                <Link
                  href="/events/past"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaHistory className="text-gray-700" />
                  Memory Vault
                </Link>
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
                  <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg text-center">
                    Featured event gallery will be displayed here
                  </p>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    (Event images to be added)
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-gray-100 rounded-lg mb-4">
                  <stat.icon className="text-2xl text-gray-700" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.recentEventsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.recentEventsDescription}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : recentEvents.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          🔥 NEW
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaClock className="mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {language === 'zh-HK' ? event.chineseName : event.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {language === 'zh-HK' ? event.chineseName : event.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaImages className="mr-1" />
                          {event.images?.length || 0} {t.photosCount}
                        </div>
                        <Link
                          href={`/events/${event.$id}`}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
                        >
                          {t.viewGallery}
                          <FaArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/events/recent"
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2"
                >
                  {t.viewAll} Recent Events
                  <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t.noRecentEvents}</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.pastEventsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.pastEventsDescription}
            </p>
          </motion.div>

          {pastEvents.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          ✨ CLASSIC
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaClock className="mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {language === 'zh-HK' ? event.chineseName : event.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {language === 'zh-HK' ? event.chineseName : event.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaImages className="mr-1" />
                          {event.images?.length || 0} {t.photosCount}
                        </div>
                        <Link
                          href={`/events/${event.$id}`}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
                        >
                          {t.viewGallery}
                          <FaArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/events/past"
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2"
                >
                  {t.viewAll} Memory Vault
                  <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t.noPastEvents}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

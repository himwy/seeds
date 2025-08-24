"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBriefcase, FaUsers, FaArrowRight } from "react-icons/fa";

export default function CareersPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Careers",
      subtitle: "Join Our Team",
      description: "We're building something amazing and looking for talented individuals to join our journey.",
      comingSoon: "Career opportunities coming soon...",
      contact: "Contact Us",
      contactText: "Interested in working with us? Get in touch!"
    },
    "zh-HK": {
      title: "職業發展",
      subtitle: "加入我們的團隊",
      description: "我們正在建立一些令人驚嘆的東西，並尋找有才華的人加入我們的旅程。",
      comingSoon: "職業機會即將推出...",
      contact: "聯繫我們",
      contactText: "有興趣與我們合作？請聯繫我們！"
    }
  };

  const t = content[language];

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
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <FaBriefcase className="text-6xl text-gray-600 mx-auto mb-6" />
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              {t.title}
            </h1>

            <div className="w-32 h-1 bg-gray-900 mx-auto mb-8"></div>

            <p className="text-xl text-gray-700 mb-6">
              {t.subtitle}
            </p>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              {t.description}
            </p>

            <div className="bg-gray-100 rounded-lg p-8 mb-8">
              <FaUsers className="text-4xl text-gray-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 italic">
                {t.comingSoon}
              </p>
            </div>

            <Link href="/about">
              <button className="bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
                <span>{t.contact}</span>
                <FaArrowRight className="ml-2" />
              </button>
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              {t.contactText}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
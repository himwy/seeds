"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { useLanguage } from "../components/LanguageContext";

const translations = {
  en: {
    title: "Case Studies",
    subtitle: "Real client experiences and academic research insights",
    clientStories: {
      title: "Client Stories",
      description:
        "Real testimonials, feedback, and success stories from our valued clients showcasing actual results and experiences.",
      features: [
        "Client Testimonials",
        "Success Stories",
        "Real Results",
        "Client Feedback",
      ],
    },
    academicCases: {
      title: "Academic Case Studies",
      description:
        "Educational case studies, theoretical frameworks, and industry examples about family office structures and strategies.",
      features: [
        "Educational Cases",
        "Industry Examples",
        "Best Practices",
        "Theoretical Insights",
      ],
    },
    learnMore: "Learn More",
  },
  "zh-HK": {
    title: "案例研究",
    subtitle: "真實客戶經驗和學術研究見解",
    clientStories: {
      title: "客戶故事",
      description:
        "來自我們尊貴客戶的真實證言、反饋和成功故事，展示實際結果和經驗。",
      features: ["客戶證言", "成功故事", "真實結果", "客戶反饋"],
    },
    academicCases: {
      title: "學術案例研究",
      description:
        "關於家族辦公室結構和策略的教育案例研究、理論框架和行業案例。",
      features: ["教育案例", "行業案例", "最佳實踐", "理論見解"],
    },
    learnMore: "了解更多",
  },
};

export default function CaseStudiesPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Client Stories */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Link href="/case-studies/client-stories">
                <div className="bg-white rounded-3xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-green-200">
                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FaUsers className="text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {t.clientStories.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {t.clientStories.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {t.clientStories.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <FaHandshake className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
                      {t.learnMore}
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Academic Case Studies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Link href="/case-studies/family-office">
                <div className="bg-white rounded-3xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FaGraduationCap className="text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {t.academicCases.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {t.academicCases.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {t.academicCases.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <FaChartLine className="text-blue-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
                      {t.learnMore}
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

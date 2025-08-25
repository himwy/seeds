"use client";

import React, { useRef } from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion, useInView } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import Image from "next/image";

export default function ContactPage() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-20%" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-20%" });

  const translations = {
    en: {
      pageTitle: "Connect With Us",
      heroSubtitle: "Your Financial Journey Starts Here",
      heroDescription:
        "Experience personalized financial guidance from Hong Kong's premier wealth management team. We're here to transform your financial aspirations into lasting success.",

      // Contact sections
      getInTouch: "Get In Touch",
      contactDescription:
        "Ready to begin your journey towards financial prosperity? Our dedicated team is here to provide you with expert guidance and personalized solutions.",

      // Contact details
      officeAddress: "Hong Kong Office",
      businessHours: "Business Hours",
      reachOut: "Reach Out",

      phone: "Direct Line",
      email: "Email",
      address: "Office Location",

      phoneNumber: "(852) 5530-4114",
      emailAddress: "hr@actiondoitnow.com",
      addressValue:
        "17/F, Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",
      addressValueShort: "Caroline Centre, Causeway Bay",

      // Business hours
      weekdays: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      weekdayHours: "9:00 AM - 6:00 PM",
      saturdayHours: "9:00 AM - 1:00 PM",
      sundayHours: "Closed",

      // Action buttons
      callNow: "Call Now",
      sendEmail: "Send Email",
      getDirections: "Get Directions",

      // Additional content
      whyChooseUs: "Why Partner With Seeds",
      expertise: "Expert Financial Guidance",
      expertiseDesc:
        "20+ years of combined experience in wealth management and financial planning.",
      personalized: "Personalized Solutions",
      personalizedDesc:
        "Tailored strategies designed specifically for your unique financial goals.",
      trust: "Trusted Partnership",
      trustDesc:
        "MDRT members committed to the highest standards of professional excellence.",
    },
    "zh-HK": {
      pageTitle: "聯繫我們",
      heroSubtitle: "您的財務之旅從這裡開始",
      heroDescription:
        "體驗來自香港頂級財富管理團隊的個人化財務指導。我們在這裡將您的財務願望轉化為持久的成功。",

      // Contact sections
      getInTouch: "聯繫我們",
      contactDescription:
        "準備開始您的財富繁榮之旅嗎？我們專業的團隊將為您提供專家指導和個人化解決方案。",

      // Contact details
      officeAddress: "香港辦公室",
      businessHours: "營業時間",
      reachOut: "聯絡方式",

      phone: "直線電話",
      email: "電子郵件",
      address: "辦公地點",

      phoneNumber: "(852) 5530-4114",
      emailAddress: "hr@actiondoitnow.com",
      addressValue: "香港銅鑼灣雲平道28號利園二期嘉蘭中心17樓",
      addressValueShort: "嘉蘭中心，銅鑼灣",

      // Business hours
      weekdays: "星期一至五",
      saturday: "星期六",
      sunday: "星期日",
      weekdayHours: "上午9:00 - 下午6:00",
      saturdayHours: "上午9:00 - 下午1:00",
      sundayHours: "休息",

      // Action buttons
      callNow: "立即致電",
      sendEmail: "發送電郵",
      getDirections: "獲取路線",

      // Additional content
      whyChooseUs: "為什麼選擇 Seeds",
      expertise: "專業財務指導",
      expertiseDesc: "在財富管理和財務規劃方面擁有20+年的綜合經驗。",
      personalized: "個人化解決方案",
      personalizedDesc: "專為您獨特的財務目標量身定制的策略。",
      trust: "值得信賴的夥伴關係",
      trustDesc: "MDRT會員致力於最高標準的專業卓越。",
    },
  };

  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gray-50 py-24 pt-32">
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t.pageTitle}
            </h1>

            <div className="w-24 h-1 bg-gray-900 mx-auto mb-8"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t.heroDescription}
            </p>

            <p className="text-lg text-gray-500 italic">{t.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section ref={contactRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.getInTouch}
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t.contactDescription}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <FiPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.phone}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-6 tracking-wide">
                {t.phoneNumber}
              </p>
              <a
                href={`tel:${t.phoneNumber}`}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <FiPhone className="w-4 h-4" />
                {t.callNow}
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <FiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.email}
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-6 break-all">
                {t.emailAddress}
              </p>
              <a
                href={`mailto:${t.emailAddress}`}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <FiMail className="w-4 h-4" />
                {t.sendEmail}
              </a>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <FiMapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.address}
              </h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                {t.addressValue}
              </p>
              <a
                href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <FiMapPin className="w-4 h-4" />
                {t.getDirections}
              </a>
            </motion.div>
          </div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-8 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {t.businessHours}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-gray-700 font-medium mb-2">
                  {t.weekdays}
                </div>
                <div className="text-gray-900 font-bold">{t.weekdayHours}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-gray-700 font-medium mb-2">
                  {t.saturday}
                </div>
                <div className="text-gray-900 font-bold">{t.saturdayHours}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-gray-700 font-medium mb-2">{t.sunday}</div>
                <div className="text-red-600 font-bold">{t.sundayHours}</div>
              </div>
            </div>
          </motion.div>

          {/* Professional Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Begin Your Financial Journey?
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our experienced team is here to provide personalized financial
              guidance and help you achieve your wealth management goals.
              Contact us today to schedule your consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${t.phoneNumber}`}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <FiPhone className="w-5 h-5" />
                Schedule a Call
              </a>
              <a
                href={`mailto:${t.emailAddress}`}
                className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
              >
                <FiMail className="w-5 h-5" />
                Send Inquiry
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

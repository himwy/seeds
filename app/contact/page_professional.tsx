"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { language } = useLanguage();

  const translations = {
    en: {
      pageTitle: "Contact Us",
      heroSubtitle: "Get in touch with our professional team",
      heroDescription:
        "We're here to help you with all your financial planning and wealth management needs.",

      contactInfo: "Contact Information",
      officeHours: "Office Hours",

      phone: "Phone",
      email: "Email",
      address: "Address",

      phoneNumber: "(852) 5530-4114",
      emailAddress: "hr@actiondoitnow.com",
      addressValue:
        "17/F, Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",

      mondayFriday: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      workingHours: "9:00 AM - 6:00 PM",
      saturdayHours: "9:00 AM - 1:00 PM",
      closed: "Closed",

      getDirections: "Get Directions",
      callUs: "Call Us",
      emailUs: "Email Us",
    },
    "zh-HK": {
      pageTitle: "聯繫我們",
      heroSubtitle: "聯繫我們的專業團隊",
      heroDescription: "我們在這裡為您提供所有財務規劃和財富管理需求的幫助。",

      contactInfo: "聯絡資訊",
      officeHours: "辦公時間",

      phone: "電話",
      email: "電子郵件",
      address: "地址",

      phoneNumber: "(852) 5530-4114",
      emailAddress: "hr@actiondoitnow.com",
      addressValue: "香港銅鑼灣雲平道28號利園二期嘉蘭中心17樓",

      mondayFriday: "星期一至五",
      saturday: "星期六",
      sunday: "星期日",
      workingHours: "上午9:00 - 下午6:00",
      saturdayHours: "上午9:00 - 下午1:00",
      closed: "休息",

      getDirections: "獲取路線",
      callUs: "致電我們",
      emailUs: "發送電子郵件",
    },
  };

  const t = translations[language];

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

      {/* Contact Content */}
      <section className="py-16 px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t.contactInfo}
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <div className="w-full h-full bg-gray-900 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.phone}
                    </h3>
                    <p className="text-gray-700 font-medium text-lg mb-3">
                      {t.phoneNumber}
                    </p>
                    <a
                      href={`tel:${t.phoneNumber}`}
                      className="text-gray-900 font-medium hover:text-gray-700 transition-colors underline"
                    >
                      {t.callUs}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <div className="w-full h-full bg-gray-900 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.email}
                    </h3>
                    <p className="text-gray-700 font-medium text-lg mb-3 break-all">
                      {t.emailAddress}
                    </p>
                    <a
                      href={`mailto:${t.emailAddress}`}
                      className="text-gray-900 font-medium hover:text-gray-700 transition-colors underline"
                    >
                      {t.emailUs}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-1">
                    <div className="w-full h-full bg-gray-900 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.address}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {t.addressValue}
                    </p>
                    <a
                      href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-medium hover:text-gray-700 transition-colors underline"
                    >
                      {t.getDirections}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t.officeHours}
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.mondayFriday}
                  </span>
                  <span className="text-gray-900 font-semibold text-lg">
                    {t.workingHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.saturday}
                  </span>
                  <span className="text-gray-900 font-semibold text-lg">
                    {t.saturdayHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.sunday}
                  </span>
                  <span className="text-red-600 font-semibold text-lg">
                    {t.closed}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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
      location: "Our Location",

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
      location: "我們的位置",

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
        <div className="container mx-auto max-w-4xl">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
              {t.contactInfo}
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.phone}
                </h3>
                <p className="text-gray-700 font-medium text-lg mb-4">
                  {t.phoneNumber}
                </p>
                <a
                  href={`tel:${t.phoneNumber}`}
                  className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  {t.callUs}
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.email}
                </h3>
                <p className="text-gray-700 font-medium text-lg mb-4 break-all">
                  {t.emailAddress}
                </p>
                <a
                  href={`mailto:${t.emailAddress}`}
                  className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  {t.emailUs}
                </a>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.address}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.addressValue}
                </p>
                <a
                  href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  {t.getDirections}
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
              {t.officeHours}
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-12"></div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FaClock className="text-xl text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {t.officeHours}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.mondayFriday}
                  </span>
                  <span className="text-gray-900 font-semibold text-lg">
                    {t.workingHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.saturday}
                  </span>
                  <span className="text-gray-900 font-semibold text-lg">
                    {t.saturdayHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium text-lg">
                    {t.sunday}
                  </span>
                  <span className="text-red-600 font-semibold text-lg">
                    {t.closed}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

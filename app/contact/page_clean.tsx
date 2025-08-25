"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";

export default function ContactPage() {
  const { language } = useLanguage();

  const translations = {
    en: {
      pageTitle: "Contact Us",
      heroSubtitle: "Connect with our professional team",
      heroDescription:
        "Experience personalized wealth management solutions crafted by our team of dedicated financial professionals.",

      contactSection: "Get In Touch",
      contactSubtitle: "Multiple ways to reach our expert team",

      officeHoursTitle: "Business Hours",
      locationTitle: "Visit Our Office",

      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Address",
      addressValue:
        "17/F, Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",

      mondayFriday: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      officeHours: "9:00 AM - 6:00 PM",
      saturdayHours: "9:00 AM - 1:00 PM",
      closed: "Closed",

      phoneNumber: "+852 2234 2123",
      emailAddress: "info@seedsfinancialgroup.com",
      whatsappNumber: "+852 9876 5432",

      getDirections: "Get Directions",
      callNow: "Call Now",
      emailUs: "Email Us",
      whatsappUs: "WhatsApp",

      expertise: "Our Expertise",
      wealthManagement: "Wealth Management",
      financialPlanning: "Financial Planning",
      investmentAdvice: "Investment Advisory",

      professionalService: "Professional Excellence",
      professionalDescription:
        "Our commitment to exceptional service and personalized attention sets us apart in the financial industry.",
    },
    "zh-HK": {
      pageTitle: "聯繫我們",
      heroSubtitle: "與我們的專業團隊聯繫",
      heroDescription:
        "體驗由我們專業財務團隊精心設計的個人化財富管理解決方案。",

      contactSection: "聯絡我們",
      contactSubtitle: "多種方式聯繫我們的專家團隊",

      officeHoursTitle: "營業時間",
      locationTitle: "訪問我們的辦公室",

      phone: "電話",
      email: "電子郵件",
      whatsapp: "WhatsApp",
      address: "地址",
      addressValue: "香港銅鑼灣雲平道28號利園二期嘉蘭中心17樓",

      mondayFriday: "星期一至五",
      saturday: "星期六",
      sunday: "星期日",
      officeHours: "上午9:00 - 下午6:00",
      saturdayHours: "上午9:00 - 下午1:00",
      closed: "休息",

      phoneNumber: "+852 2234 2123",
      emailAddress: "info@seedsfinancialgroup.com",
      whatsappNumber: "+852 9876 5432",

      getDirections: "獲取路線",
      callNow: "立即致電",
      emailUs: "發送電子郵件",
      whatsappUs: "WhatsApp聯繫",

      expertise: "我們的專長",
      wealthManagement: "財富管理",
      financialPlanning: "財務規劃",
      investmentAdvice: "投資諮詢",

      professionalService: "專業卓越",
      professionalDescription:
        "我們對卓越服務和個人化關注的承諾讓我們在金融業中脫穎而出。",
    },
  };

  const t = translations[language];

  const contactMethods = [
    {
      icon: FaPhone,
      title: t.phone,
      value: t.phoneNumber,
      action: t.callNow,
      href: `tel:${t.phoneNumber}`,
      description: "Speak directly with our advisors",
    },
    {
      icon: FaEnvelope,
      title: t.email,
      value: t.emailAddress,
      action: t.emailUs,
      href: `mailto:${t.emailAddress}`,
      description: "Send us your inquiries anytime",
    },
    {
      icon: FaWhatsapp,
      title: t.whatsapp,
      value: t.whatsappNumber,
      action: t.whatsappUs,
      href: `https://wa.me/${t.whatsappNumber.replace(/[^0-9]/g, "")}`,
      description: "Quick messaging support",
    },
  ];

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

      {/* Contact Methods Section */}
      <section className="py-16 px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.contactSection}
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <method.icon className="text-2xl text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {method.description}
                </p>
                <p className="text-gray-700 font-medium mb-6 break-all">
                  {method.value}
                </p>

                <a
                  href={method.href}
                  className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200"
                >
                  <span>{method.action}</span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Office Hours & Location */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FaClock className="text-xl text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {t.officeHoursTitle}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    {t.mondayFriday}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {t.officeHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    {t.saturday}
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {t.saturdayHours}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">{t.sunday}</span>
                  <span className="text-red-600 font-semibold">{t.closed}</span>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {t.locationTitle}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {t.addressValue}
              </p>

              <a
                href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200"
              >
                <FaMapMarkerAlt />
                <span>{t.getDirections}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Excellence Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.professionalService}
            </h2>
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t.professionalDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.wealthManagement}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.financialPlanning}
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.investmentAdvice}
              </h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
  FaArrowRight,
  FaGlobe,
} from "react-icons/fa";

export default function ContactPage() {
  const { language } = useLanguage();

  const translations = {
    en: {
      pageTitle: "Contact Us",
      heroTitle: "Connect With Excellence",
      heroSubtitle: "Your Financial Journey Begins Here",
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
      heroTitle: "卓越連接",
      heroSubtitle: "您的財富旅程從這裡開始",
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
      color: "from-blue-600 to-blue-800",
      lightColor: "from-blue-50 to-blue-100",
      description: "Speak directly with our advisors",
    },
    {
      icon: FaEnvelope,
      title: t.email,
      value: t.emailAddress,
      action: t.emailUs,
      href: `mailto:${t.emailAddress}`,
      color: "from-emerald-600 to-emerald-800",
      lightColor: "from-emerald-50 to-emerald-100",
      description: "Send us your inquiries anytime",
    },
    {
      icon: FaWhatsapp,
      title: t.whatsapp,
      value: t.whatsappNumber,
      action: t.whatsappUs,
      href: `https://wa.me/${t.whatsappNumber.replace(/[^0-9]/g, "")}`,
      color: "from-green-600 to-green-800",
      lightColor: "from-green-50 to-green-100",
      description: "Quick messaging support",
    },
  ];

  const expertise = [
    { icon: FaBuilding, title: t.wealthManagement },
    { icon: FaGlobe, title: t.financialPlanning },
    { icon: FaArrowRight, title: t.investmentAdvice },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Sophisticated Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-900/20"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-400 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        <div className="relative px-4 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light mb-4 max-w-3xl mx-auto">
                {t.heroSubtitle}
              </p>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {t.heroDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
              {t.contactSection}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.lightColor} rounded-2xl transform group-hover:scale-105 transition-transform duration-300`}
                ></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <method.icon className="text-2xl text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {method.description}
                  </p>
                  <p className="text-slate-700 font-medium mb-6 break-all">
                    {method.value}
                  </p>

                  <a
                    href={method.href}
                    className="group/btn inline-flex items-center gap-2 text-slate-800 font-semibold hover:text-slate-600 transition-all duration-300"
                  >
                    <span>{method.action}</span>
                    <FaArrowRight className="text-sm transform transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
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
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                    <FaClock className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {t.officeHoursTitle}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      {t.mondayFriday}
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {t.officeHours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      {t.saturday}
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {t.saturdayHours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-600 font-medium">
                      {t.sunday}
                    </span>
                    <span className="text-red-600 font-semibold">
                      {t.closed}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-slate-100 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {t.locationTitle}
                  </h3>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {t.addressValue}
                </p>

                <a
                  href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 text-slate-800 font-semibold hover:text-slate-600 transition-all duration-300"
                >
                  <FaMapMarkerAlt />
                  <span>{t.getDirections}</span>
                  <FaArrowRight className="text-sm transform transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-100 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              {t.professionalService}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.professionalDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

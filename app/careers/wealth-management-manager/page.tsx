"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBriefcase,
  FaUsers,
  FaGraduationCap,
  FaChartLine,
  FaLightbulb,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  // FaPaperPlane,
} from "react-icons/fa";

const translations = {
  en: {
    pageTitle: "Wealth Management Manager",
    pageSubtitle: "財富策劃經理",
    location: "Hong Kong, Macau and China Region",
    aboutRole: "About This Role",
    keyResponsibilities: "Key Responsibilities",
    requirements: "Requirements",
    whatWeOffer: "What We Offer",
    contactUs: "Contact Us",
    emailDescription: "For applications and inquiries, please email:",
    emailAddress: "hr@actiondoitnow.com",
    backToCareers: "Back to Careers",

    description: [
      "Seeds Financial Group partners with one of the world's largest financial groups to provide advisory services using comprehensive risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
      "With wealth management continuing to be a fast-growing industry in Hong Kong and China, we are looking for ambitious individuals to join our dynamic team.",
      "Candidates who are transitioning and looking for a career change from different industries are welcome. Applicants with less experience will be considered for manager/executive positions.",
    ],

    responsibilities: [
      "Your responsibilities include but are not limited to providing wealth planning advice, risk management, investment planning, estate planning and retirement planning for Hong Kong and Mainland exclusive clients",
      "You will also be responsible for nurturing existing clients and developing new business",
    ],

    qualifications: [
      "Degree holder",
      "Fluent in Cantonese and Mandarin (English is a plus)",
      "Looking for a challenging career",
      "Great interpersonal skills",
      "Valid working visa",
      "Passionate about life and building a brighter future",
      "Candidates transitioning from different industries welcome",
    ],

    benefits: [
      {
        title: "Excellent Training",
        description: "Local and overseas conventions.",
      },
      {
        title: "Fast Career Progression",
        description: "Flexibility to help you enjoy work-life balance.",
      },
      {
        title: "Attractive Package",
        description: "Performance bonuses and commission. Five-day work week.",
      },
      {
        title: "Professional Development",
        description: "Work with one of the world's largest financial groups.",
      },
    ],
  },
  "zh-HK": {
    pageTitle: "財富策劃經理",
    pageSubtitle: "Wealth Management Manager",
    location: "香港、澳門及中國地區",
    aboutRole: "關於此職位",
    keyResponsibilities: "主要職責",
    requirements: "職位要求",
    whatWeOffer: "我們提供",
    contactUs: "聯絡我們",
    emailDescription: "申請和查詢，請發送電子郵件至：",
    emailAddress: "hr@actiondoitnow.com",
    backToCareers: "返回職業發展",

    description: [
      "Seeds Financial Group 與世界上最大的金融集團之一合作，使用廣泛的風險管理、戰略和資產配置計劃提供諮詢服務，使我們的客戶能夠實現其財務目標和未來需求。",
      "隨著財富管理在香港和中國繼續成為一個快速發展的行業，我們目前正在尋找一位雄心勃勃的人加入我們充滿活力的團隊。",
      "歡迎正在過渡並尋求不同行業職業轉變的候選人。經驗較少的申請人將被考慮擔任經理/行政職位。",
    ],

    responsibilities: [
      "您的職責包括但不限於為香港及內地獨家客戶提供財富規劃建議、風險管理、投資規劃、遺產規劃和退休計劃",
      "您還將負責培養現有客戶以及開發新業務",
    ],

    qualifications: [
      "學位持有者",
      "能流利地閱讀和書寫廣東話和普通話（英語是加分項）",
      "尋找具有挑戰性的職業",
      "有很好的人際交往能力",
      "有效的工作簽證",
      "對生活充滿熱情，建設更光明的未來",
      "歡迎正在過渡並尋求不同行業職業轉變的候選人",
    ],

    benefits: [
      {
        title: "出色的培訓",
        description: "本地和海外會議。",
      },
      {
        title: "快速的職業發展",
        description: "幫助您享受工作與生活平衡的靈活性。",
      },
      {
        title: "有吸引力的套餐",
        description: "績效獎金和佣金。每週工作五天。",
      },
      {
        title: "專業發展",
        description: "與世界上最大的金融集團之一合作。",
      },
    ],
  },
};

export default function WealthManagementManagerPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const benefits = [
    {
      icon: FaLightbulb,
      title: t.benefits[0].title,
      description: t.benefits[0].description,
    },
    {
      icon: FaUsers,
      title: t.benefits[1].title,
      description: t.benefits[1].description,
    },
    {
      icon: FaChartLine,
      title: t.benefits[2].title,
      description: t.benefits[2].description,
    },
    {
      icon: FaGraduationCap,
      title: t.benefits[3].title,
      description: t.benefits[3].description,
    },
  ];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20 pt-32">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <FaArrowLeft /> {t.backToCareers}
            </Link>

            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  MANAGEMENT POSITION
                </span>
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {t.pageTitle}
              </h1>

              <p className="text-lg text-gray-500 mb-6 font-medium">
                {t.pageSubtitle}
              </p>

              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>{t.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-600" />
                  <span>Management Level</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t.aboutRole}
                </h2>
                <div className="prose prose-lg text-gray-600 space-y-6">
                  {t.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.keyResponsibilities}
                </h3>
                <ul className="space-y-3">
                  {t.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t.requirements}
                </h3>
                <ul className="space-y-3">
                  {t.qualifications.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="sticky top-8"
              >
                {/* Contact Card */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t.contactUs}
                  </h3>
                  <p className="text-gray-600 mb-4">{t.emailDescription}</p>
                  <a
                    href="mailto:hr@actiondoitnow.com"
                    className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                  >
                    <FaEnvelope />
                    {t.emailAddress}
                  </a>
                </div>

                {/* What We Offer */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {t.whatWeOffer}
                  </h3>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <benefit.icon className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

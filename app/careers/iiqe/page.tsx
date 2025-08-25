"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaFileAlt,
  FaCheckCircle,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";

const translations = {
  en: {
    pageTitle: "IIQE - Insurance Intermediaries Qualifying Examination",
    pageSubtitle: "Your pathway to becoming a licensed insurance professional in Hong Kong",
    qualificationBadge: "PROFESSIONAL QUALIFICATION",
    examRequirementsTitle: "Examination Requirements",
    requirement: 'Every individual licensee must have passed the relevant papers of the Insurance Intermediaries Qualifying Examination ("IIQE") conducted by the Vocational Training Council, the appointed examination body for the IIQE, unless otherwise exempted.',
    moreInfo: "Official Information:",
    officialLink: "IIQE Details",
    keyInfoTitle: "Key Information",
    keyInfoItems: [
      "Mandatory qualification for insurance intermediaries in Hong Kong",
      "Conducted by the Vocational Training Council",
      "Required for individual licensees unless exempted",
      "Essential step for career advancement in insurance"
    ],
    contactTitle: "Need Support?",
    contactDescription: "Join Seeds Financial Group and get the guidance you need for your insurance career.",
    contactButton: "Contact Us",
    quickFactsTitle: "Quick Facts",
    quickFacts: [
      {
        title: "Professional Qualification",
        description: "Recognized industry standard"
      },
      {
        title: "Examination Format", 
        description: "Structured assessment papers"
      },
      {
        title: "Career Advancement",
        description: "Gateway to insurance profession"
      }
    ],
    backToCareers: "Back to Careers",
  },
  "zh-HK": {
    pageTitle: "保險中介人資格考試 (IIQE)",
    pageSubtitle: "成為香港持牌保險專業人士的途徑",
    qualificationBadge: "專業資格",
    examRequirementsTitle: "考試要求",
    requirement: "除非獲得豁免，否則每個個人持牌人必須通過由職業訓練局（獲委任的保險中介人資格考試機構）舉辦的保險中介人資格考試 (IIQE) 的相關試卷。",
    moreInfo: "官方資訊：",
    officialLink: "考試詳情",
    keyInfoTitle: "重要資訊",
    keyInfoItems: [
      "香港保險中介人的強制性資格",
      "由職業訓練局主辦",
      "個人持牌人必須通過，除非獲得豁免",
      "保險業職業發展的重要步驟"
    ],
    contactTitle: "需要支援？",
    contactDescription: "加入Seeds Financial Group，獲得保險事業所需的指導。",
    contactButton: "聯絡我們",
    quickFactsTitle: "快速了解",
    quickFacts: [
      {
        title: "專業資格",
        description: "行業認可標準"
      },
      {
        title: "考試形式",
        description: "結構化評估試卷"
      },
      {
        title: "職業發展",
        description: "保險專業的入門途徑"
      }
    ],
    backToCareers: "返回職業發展",
  },
};

export default function IIQEPage() {
  const { language } = useLanguage();
  const t = translations[language];

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
                  {t.qualificationBadge}
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                IIQE
              </h1>
              
              <p className="text-lg text-gray-500 mb-6 font-medium">
                {t.pageSubtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.examRequirementsTitle}</h2>
                <div className="prose prose-lg text-gray-600 space-y-6">
                  <p>
                    {t.requirement}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <span className="text-gray-700 font-medium">{t.moreInfo}</span>
                    <a
                      href="https://www.ia.org.hk/en/supervision/reg_ins_intermediaries/insurance_intermediaries_qualifying_examination.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="text-sm text-white" />
                      {t.officialLink}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.keyInfoTitle}</h3>
                <ul className="space-y-3">
                  {t.keyInfoItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.contactTitle}</h3>
                  <p className="text-gray-600 mb-6">
                    {t.contactDescription}
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:hr@actiondoitnow.com"
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEnvelope className="text-white" />
                      {t.contactButton}
                    </a>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t.quickFactsTitle}</h3>
                  <div className="space-y-6">
                    {t.quickFacts.map((fact, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            {index === 0 && <FaGraduationCap className="text-blue-600" />}
                            {index === 1 && <FaFileAlt className="text-blue-600" />}
                            {index === 2 && <FaCheckCircle className="text-blue-600" />}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{fact.title}</h4>
                          <p className="text-sm text-gray-600">{fact.description}</p>
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

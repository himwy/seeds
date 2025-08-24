"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaGraduationCap,
  FaExternalLinkAlt,
  FaArrowLeft,
} from "react-icons/fa";

const translations = {
  en: {
    pageTitle: "IIQE - Insurance Intermediaries Qualifying Examination",
    pageSubtitle:
      "Your pathway to becoming a licensed insurance professional in Hong Kong",

    requirement:
      'Every individual licensee must have passed the relevant papers of the Insurance Intermediaries Qualifying Examination ("IIQE") conducted by the Vocational Training Council, the appointed examination body for the IIQE, unless otherwise exempted. For details, please make reference to Annex 1 to GL23: Guideline on "Fit and Proper" Criteria for Licensed Insurance Intermediaries under the Insurance Ordinance (Cap.41).',

    moreInfo: "See more at:",
    officialLink: "Official IIQE Information",

    ctaTitle: "Ready to Start Your IIQE Journey?",
    ctaDescription:
      "Join Seeds Financial Group and get the support you need to succeed in your insurance career.",
    ctaButton: "Contact Us",
    backToCareers: "Back to Careers",
  },
  "zh-HK": {
    pageTitle: "保險中介人資格考試 (IIQE)",
    pageSubtitle: "成為香港持牌保險專業人士的途徑",

    requirement:
      "除非獲得豁免，否則每個個人持牌人必須通過由職業訓練局（獲委任的保險中介人資格考試機構）舉辦的保險中介人資格考試 (IIQE) 的相關試卷。詳情請參閱GL23附件1：《保險業條例》(第41章)下持牌保險中介人的「適當人選」準則指引。",

    moreInfo: "詳情請見：",
    officialLink: "官方保險中介人資格考試信息",

    ctaTitle: "準備開始您的保險中介人資格考試之旅？",
    ctaDescription:
      "加入Seeds Financial Group，獲得在保險事業中成功所需的支持。",
    ctaButton: "聯絡我們",
    backToCareers: "返回職業發展",
  },
};

export default function IIQEPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-black"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/Financial.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 text-center py-12 z-10 relative">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-left"
            >
              <Link href="/careers">
                <span className="inline-flex items-center text-white hover:text-teal-300 font-medium">
                  <FaArrowLeft className="mr-2" />
                  {t.backToCareers}
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center mb-6"
            >
              <FaGraduationCap className="text-4xl text-teal-400 mr-4" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                IIQE
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl md:text-2xl text-teal-300 mb-6"
            >
              {t.pageSubtitle}
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t.requirement}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-gray-600">{t.moreInfo}</span>
                <a
                  href="https://www.ia.org.hk/en/supervision/reg_ins_intermediaries/insurance_intermediaries_qualifying_examination.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  {t.officialLink}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">{t.ctaDescription}</p>
            <Link href="/contact">
              <span className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors inline-block">
                {t.ctaButton}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

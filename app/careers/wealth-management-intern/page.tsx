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
  FaPaperPlane,
} from "react-icons/fa";

export default function WealthManagementInternPage() {
  const { language } = useLanguage();

  const translations = {
    en: {
      backToCareers: "Back to Careers",
      internshipProgram: "INTERNSHIP PROGRAM",
      jobTitle: "Wealth Management Intern",
      jobTitleChinese: "見習財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "Hong Kong, Macau and China Region",
      jobType: "Full-time Internship",
      level: "Entry Level",
      aboutRole: "About This Role",
      roleDescription1: "With wealth management continuing to be a fast-growing industry in Hong Kong, we are looking for ambitious individuals to join our dynamic team to embrace the 'new opportunities in the Greater Bay Area'.",
      roleDescription2: "Your responsibilities include but are not limited to providing wealth planning advice, risk management, investment planning, estate planning and retirement planning for Hong Kong and Mainland exclusive clients. You will also be responsible for nurturing existing clients and developing new business.",
      roleDescription3: "We aim to develop young people to be Future Leaders. Apply now if you are looking for a challenging career, passionate about life, have excellent interpersonal skills and want to build your future.",
      keyResponsibilities: "Key Responsibilities",
      requirements: "Requirements",
      readyToApply: "Ready to Apply?",
      applyDescription: "Send us your resume and cover letter to start your journey with us.",
      applyNow: "Apply Now",
      askQuestions: "Ask Questions",
      whatWeOffer: "What We Offer",
      responsibilities: [
        "Assist in the analysis and management of client portfolios",
        "Support the development of customized financial strategies",
        "Conduct market research and financial data analysis",
        "Collaborate with our team on client presentations",
        "Learn best practices in risk management and investment planning",
        "Opportunities to contribute to impactful client projects"
      ],
      requirementsList: [
        "A degree holder, or currently pursuing a degree in Finance, Economics, Business, or a related field",
        "A keen interest in financial markets and investment strategies",
        "Eagerness to learn and adapt in a fast-paced environment",
        "Strong analytical and problem-solving skills",
        "Great interpersonal skills and passionate about life",
        "Looking for a challenging career",
        "Valid working visa (IANG/dependent visa welcome)"
      ],
      benefits: [
        {
          title: "Comprehensive Training",
          description: "We provide comprehensive and continuous training to ensure you master the skills and knowledge."
        },
        {
          title: "Mentorship Program",
          description: "Work closely with experienced wealth management professionals."
        },
        {
          title: "Real-World Experience",
          description: "Gain real-world experience in financial planning and advisory."
        },
        {
          title: "Career Development",
          description: "Attractive package including five-day work week, flexible hours, performance/commission bonuses, life and medical insurance."
        }
      ]
    },
    "zh-HK": {
      backToCareers: "返回職位",
      internshipProgram: "實習生計劃",
      jobTitle: "見習財富策劃經理",
      jobTitleChinese: "Wealth Management Intern (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "香港、澳門及中國地區",
      jobType: "全職實習",
      level: "入門級",
      aboutRole: "關於這個職位",
      roleDescription1: "隨著財富管理在香港繼續成為一個快速發展的行業，我們現正物色雄心勃勃的人士加入我們充滿活力的團隊，以迎接「粵港澳大灣區的新機遇」。",
      roleDescription2: "您的職責包括但不限於為香港及內地獨家客戶提供財富規劃建議、風險管理、投資規劃、遺產規劃和退休規劃。您還將負責培養現有客戶以及開發新業務。",
      roleDescription3: "我們的目標是培養年輕人成為未來的領導者。如果您正在尋找具有挑戰性的職業、對生活充滿熱情、擁有出色的人際交往能力並希望建立自己的未來，請立即申請。",
      keyResponsibilities: "主要職責",
      requirements: "要求",
      readyToApply: "準備申請？",
      applyDescription: "向我們發送您的履歷和求職信，開始您的職業旅程。",
      applyNow: "立即申請",
      askQuestions: "詢問問題",
      whatWeOffer: "我們提供什麼",
      responsibilities: [
        "協助分析和管理客戶投資組合",
        "支持開發定制化財務策略",
        "進行市場研究和財務數據分析",
        "與我們的團隊合作進行客戶演示",
        "學習風險管理和投資規劃的最佳實踐",
        "有機會參與有影響力的客戶項目"
      ],
      requirementsList: [
        "持有學位或目前正在攻讀金融、經濟、商業或相關領域的學位",
        "對金融市場和投資策略有濃厚興趣",
        "渴望學習並適應快節奏環境",
        "強大的分析和解決問題能力",
        "出色的人際交往技能並對生活充滿熱情",
        "尋找具有挑戰性的職業",
        "有效工作簽證（歡迎IANG/受養人簽證）"
      ],
      benefits: [
        {
          title: "全面培訓",
          description: "我們提供全面而持續的培訓，以確保您能夠掌握技能和知識。"
        },
        {
          title: "導師計劃",
          description: "與經驗豐富的財富管理專業人士密切合作。"
        },
        {
          title: "實際經驗",
          description: "在財務規劃和諮詢方面獲得實際經驗。"
        },
        {
          title: "職業發展",
          description: "有吸引力的套餐，包括五天工作週、靈活的工作時間、績效/佣金獎金、人壽和醫療保險。"
        }
      ]
    }
  };

  const t = translations[language];

  const benefitsWithIcons = [
    { icon: FaLightbulb, ...t.benefits[0] },
    { icon: FaUsers, ...t.benefits[1] },
    { icon: FaChartLine, ...t.benefits[2] },
    { icon: FaGraduationCap, ...t.benefits[3] }
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
                  {t.internshipProgram}
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {t.jobTitle}
              </h1>
              
              <p className="text-lg text-gray-500 mb-6 font-medium">
                {t.jobTitleChinese}
              </p>
              
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>{t.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  <span>{t.jobType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-600" />
                  <span>{t.level}</span>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.aboutRole}</h2>
                <div className="prose prose-lg text-gray-600 space-y-6">
                  <p>
                    {t.roleDescription1}
                  </p>
                  
                  <p>
                    {t.roleDescription2}
                  </p>
                  
                  <p>
                    {t.roleDescription3}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.keyResponsibilities}</h3>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.requirements}</h3>
                <ul className="space-y-3">
                  {t.requirementsList.map((requirement, index) => (
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
                {/* Apply Card */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.readyToApply}</h3>
                  <p className="text-gray-600 mb-6">
                    {t.applyDescription}
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:hr@actiondoitnow.com"
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaPaperPlane className="text-white" />
                      {t.applyNow}
                    </a>
                    <a
                      href="mailto:hr@actiondoitnow.com"
                      className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEnvelope className="text-gray-700" />
                      {t.askQuestions}
                    </a>
                  </div>
                </div>

                {/* What We Offer */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t.whatWeOffer}</h3>
                  <div className="space-y-6">
                    {benefitsWithIcons.map((benefit, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <benefit.icon className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
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

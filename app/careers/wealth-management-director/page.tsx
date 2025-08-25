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

const translations = {
  en: {
    pageTitle: "Wealth Management Director",
    pageSubtitle: "財富策劃總監",
    location: "Hong Kong & Asia-Pacific",
    aboutRole: "About This Role",
    keyResponsibilities: "Key Responsibilities",
    requirements: "Requirements",
    whatWeOffer: "What We Offer",
    readyToApply: "Ready to Apply?",
    applyDescription: "Send us your resume and cover letter to start your journey with us.",
    applyNow: "Apply Now",
    askQuestions: "Ask Questions",
    backToCareers: "Back to Careers",
    
    description: [
      "For over a decade, Seeds Financial Group has been at the forefront of meeting the dynamic financial needs of clients across the Asia-Pacific region. As we continue to expand, we are seeking a highly experienced and visionary Wealth Management Director to lead our team and drive the growth of our diverse financial solutions.",
      "In this pivotal role, you will report directly to the company's founder and collaborate with a talented, results-driven team. You will oversee high-net-worth multinational client portfolios, develop strategic business initiatives, and lead a team of wealth management professionals.",
      "If you are a seasoned wealth management professional with a passion for leadership and a drive to excel, we invite you to apply for this exciting opportunity. Join us in shaping the future of wealth management in the Asia-Pacific region."
    ],
    
    responsibilities: [
      "Lead and mentor a team of wealth management professionals to achieve business objectives",
      "Develop and implement strategic plans to expand the company's client base and market presence",
      "Manage and nurture relationships with high-net-worth individuals and institutional clients",
      "Drive the growth of the company's financial products and services through innovative strategies",
      "Monitor market trends and regulatory changes to identify new opportunities and mitigate risks",
      "Collaborate with senior management to shape the company's long-term vision and goals"
    ],
    
    qualifications: [
      "Proven experience in wealth management, private banking, or related field with strong leadership track record",
      "Exceptional interpersonal and communication skills to build trust with high-net-worth clients",
      "Strategic thinker with results-oriented mindset and ability to drive growth in competitive markets",
      "Fluency in English and/or Cantonese essential; proficiency in Mandarin is an advantage"
    ],
    
    benefits: [
      {
        title: "Leadership Opportunity",
        description: "Take on a senior role with autonomy to shape our wealth management division's future."
      },
      {
        title: "Professional Growth",
        description: "Access to ongoing training, mentorship, and career advancement opportunities."
      },
      {
        title: "Competitive Compensation",
        description: "Attractive salary package with performance bonuses and high commission potential."
      },
      {
        title: "Work-Life Balance",
        description: "A supportive environment that values your well-being and personal growth."
      }
    ]
  },
  "zh-HK": {
    pageTitle: "財富策劃總監",
    pageSubtitle: "Wealth Management Director",
    location: "香港及亞太地區",
    aboutRole: "關於此職位",
    keyResponsibilities: "主要職責",
    requirements: "職位要求",
    whatWeOffer: "我們提供",
    readyToApply: "準備申請？",
    applyDescription: "請將您的履歷和求職信發送給我們，開始您的職業旅程。",
    applyNow: "立即申請",
    askQuestions: "提出問題",
    backToCareers: "返回職業發展",
    
    description: [
      "Seed Financial Group 十多年來一直處於滿足亞太地區客戶動態財務需求的前沿。隨著我們持續擴展，我們正在尋找一位經驗豐富且具有遠見的財富管理總監，以領導我們的團隊並推動我們多元化財務解決方案的增長。",
      "在這個關鍵角色中，您將直接向公司創始人匯報，並與一支才華橫溢、以結果為導向的團隊合作。您將負責監督高淨值跨國客戶的投資組合，制定戰略業務計劃，並領導一支財富管理專業團隊。",
      "如果您是一位經驗豐富的財富管理專業人士，對領導充滿熱情並渴望卓越，我們誠邀您申請這個令人興奮的機會。加入我們，共同塑造亞太地區財富管理的未來。"
    ],
    
    responsibilities: [
      "領導並指導財富管理專業團隊，以實現業務目標",
      "制定並實施戰略計劃，擴展公司的客戶群和市場影響力",
      "管理並培養與高淨值個人和機構客戶的關係",
      "通過創新策略推動公司金融產品和服務的增長",
      "監控市場趨勢和監管變化，以識別新機會並降低風險",
      "與高層管理團隊合作，制定公司的長期願景和目標"
    ],
    
    qualifications: [
      "在財富管理、私人銀行或相關領域擁有豐富經驗，並具有卓越的領導力和業務發展記錄",
      "出色的人際交往和溝通能力，能夠與高淨值客戶建立信任和融洽關係",
      "具有戰略思維和以結果為導向的心態，能夠在競爭激烈的市場中推動增長",
      "流利的英語和/或廣東話是必需的；普通話熟練者優先"
    ],
    
    benefits: [
      {
        title: "領導機會",
        description: "擔任高級職位，擁有自主權來塑造我們財富管理部門的未來。"
      },
      {
        title: "專業成長",
        description: "獲得持續培訓、指導和職業發展機會。"
      },
      {
        title: "具競爭力的薪酬",
        description: "豐厚的薪資待遇，包括績效獎金和高額佣金潛力。"
      },
      {
        title: "工作與生活平衡",
        description: "重視您福祉和個人成長的支持性環境。"
      }
    ]
  }
};

export default function WealthManagementDirectorPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const benefits = [
    {
      icon: FaLightbulb,
      title: t.benefits[0].title,
      description: t.benefits[0].description
    },
    {
      icon: FaUsers,
      title: t.benefits[1].title,
      description: t.benefits[1].description
    },
    {
      icon: FaChartLine,
      title: t.benefits[2].title,
      description: t.benefits[2].description
    },
    {
      icon: FaGraduationCap,
      title: t.benefits[3].title,
      description: t.benefits[3].description
    }
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
                  EXECUTIVE POSITION
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
                  <span>Executive Level</span>
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
                    {benefits.map((benefit, index) => (
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
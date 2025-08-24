"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaArrowLeft,
  FaQuoteLeft,
  FaHospital,
  FaClock,
  FaShieldAlt,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: {
    title: "Reflection After Claiming",
    subtitle: "Mr Mansfield Lai's Words - When Medical Crisis Tests Priorities",
    backToStories: "Back to Client Stories",
    
    mansfieldWords: {
      title: "Mr Mansfield Lai's Words",
      
      crisis: {
        title: "The Midnight Call",
        content: "\"I suddenly felt as though I had forgotten what had happened two days ago\", said one anxious client of mine calling me by midnight two weeks ago. He was asking for my views and gave me a hint that his condition might be symptoms of a stroke."
      },
      
      urgency: {
        title: "Immediate Action Required",
        content: "I urged him to visit the hospital immediately for a check up. In two days' time the doctors at the hospital were unable to identify the cause of his problems. His condition deteriorated very quickly in a few days and was sent to the intensive care unit (\"ICU\"). On the first day when he was inpatient, the estimated medical expense was HK$70,000. It was HK$900,000 upon his admission to the ICU."
      },
      
      protection: {
        title: "Insurance Shield in Action",
        content: "That unexpected turmoil in life has been shielded by a [Premium Medical Policy], which was prepared by him a decade ago for himself and his family. As his financial planner, I assisted his medical insurance claim procedures. In less than two days, our company has approved his claim and issued the guarantee letter that guarantees his medical expenses are to be covered by his insurance policy. My client and his family were lucky enough to avoid the suffering of keeping an eye on the exorbitant medical expenses and were able to focus on the healthcare and recovery process free from financial pressure."
      },
      
      recovery: {
        title: "Recovery and Reflection",
        content: "The client has now largely recovered and his life back on track. I wonder, as financial planners we were often told by clients that they cannot afford to pay the premium given their current expenditure, savings plans or because of other reasons. They nevertheless are always paying for one cup of latte every morning and going to yoga classes every weekend. Some live a fancy lifestyle by going onto overseas vacations several times a year or to purchase a luxury brand handbag every season. What they cannot afford does not appear to be the medical insurance premium itself, but their own lifes. They value their lifestyle more than they do value their own health and the wellbeing of their family."
      },
      
      conclusion: {
        title: "A Matter of Choice",
        content: "Afterall, this is really a question of personal choice."
      }
    },
    
    insights: [
      "Medical emergencies can escalate from HK$70,000 to HK$900,000 in days",
      "Premium Medical Policy provided complete financial protection for a decade-old investment",
      "Insurance claim approved and guarantee letter issued within 2 days",
      "Family could focus on recovery instead of worrying about medical expenses"
    ],
    
    reflections: [
      "Daily lattes and weekend yoga classes cost more than medical insurance over time",
      "Luxury purchases and overseas vacations reflect lifestyle priorities over health protection",
      "What people 'cannot afford' is often about choice, not actual financial capacity",
      "The real question is whether we value lifestyle more than life itself"
    ]
  },
  
  "zh-HK": {
    title: "理賠後的反思",
    subtitle: "Mansfield Lai先生的話 - 當醫療危機考驗優先順序",
    backToStories: "返回客戶故事",
    
    mansfieldWords: {
      title: "Mansfield Lai先生的話",
      
      crisis: {
        title: "午夜來電",
        content: "「我突然覺得好像忘記了兩天前發生的事情」，我的一位焦急客戶在兩週前的午夜給我打電話說。他向我尋求意見，並暗示他的狀況可能是中風的症狀。"
      },
      
      urgency: {
        title: "需要立即行動",
        content: "我敦促他立即到醫院檢查。兩天內，醫院的醫生無法確定他問題的原因。他的病情在幾天內迅速惡化，被送到重症監護室（\"ICU\"）。住院第一天，預估醫療費用為港幣7萬元。入住ICU時已達港幣90萬元。"
      },
      
      protection: {
        title: "保險盾牌在行動",
        content: "生活中這一意外風暴被一份[高端醫療保單]所保護，這是他十年前為自己和家人準備的。作為他的理財規劃師，我協助處理他的醫療保險理賠程序。不到兩天，我們公司就批准了他的理賠並發出了保證函，保證他的醫療費用將由保險單承擔。我的客戶和他的家人很幸運地避免了關注昂貴醫療費用的痛苦，能夠在沒有財務壓力的情況下專注於醫療保健和康復過程。"
      },
      
      recovery: {
        title: "康復與反思",
        content: "客戶現在基本康復，生活重回正軌。我想知道，作為理財規劃師，我們經常被客戶告知，由於目前的支出、儲蓄計劃或其他原因，他們負擔不起保費。然而，他們總是每天早上支付一杯拿鐵的費用，每個週末去瑜伽課。一些人過著奢華的生活方式，每年多次海外度假或每季購買奢侈品牌手袋。他們負擔不起的似乎不是醫療保險費本身，而是他們自己的生命。他們更重視自己的生活方式，而不是自己的健康和家人的福祉。"
      },
      
      conclusion: {
        title: "選擇問題",
        content: "畢竟，這真的是個人選擇的問題。"
      }
    },
    
    insights: [
      "醫療緊急情況可能在幾天內從港幣7萬元升級到90萬元",
      "高端醫療保單為十年前的投資提供了完整的財務保護",
      "保險理賠在2天內獲批並發出保證函",
      "家人可以專注於康復而不用擔心醫療費用"
    ],
    
    reflections: [
      "每日拿鐵和週末瑜伽課程長期成本超過醫療保險",
      "奢侈品購買和海外度假反映了生活方式優先於健康保護",
      "人們「負擔不起」的往往是關於選擇，而非實際財務能力",
      "真正的問題是我們是否更重視生活方式而非生命本身"
    ]
  }
};

export default function MansfieldReflectionPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/case-studies/client-stories" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
              <FaArrowLeft className="mr-2" />
              {t.backToStories}
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <FaStethoscope className="text-5xl text-blue-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-xl text-gray-600 mt-2">{t.subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Mansfield's Photo */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src="/assets/Mansfield Reflection.jpg"
                alt="Mansfield Lai"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.mansfieldWords.title}</h2>
          </motion.section>

          {/* The Story */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Crisis Call */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaClock className="text-red-600 mr-3" />
                {t.mansfieldWords.crisis.title}
              </h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <FaQuoteLeft className="text-red-400 text-2xl mb-2" />
                <p className="text-gray-700 leading-relaxed italic text-lg">
                  {t.mansfieldWords.crisis.content}
                </p>
              </div>
            </div>

            {/* Medical Emergency */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaHospital className="text-orange-600 mr-3" />
                {t.mansfieldWords.urgency.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.mansfieldWords.urgency.content}
              </p>
              <div className="mt-4 bg-orange-50 rounded-lg p-4">
                <div className="flex justify-between text-center">
                  <div>
                    <p className="text-sm text-gray-600">Day 1 (Inpatient)</p>
                    <p className="text-2xl font-bold text-orange-600">HK$70,000</p>
                  </div>
                  <div className="text-4xl text-gray-300">→</div>
                  <div>
                    <p className="text-sm text-gray-600">ICU Admission</p>
                    <p className="text-2xl font-bold text-red-600">HK$900,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Protection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaShieldAlt className="text-green-600 mr-3" />
                {t.mansfieldWords.protection.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.mansfieldWords.protection.content}
              </p>
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <p className="text-center font-semibold text-green-700">
                  ✓ Claim approved and guarantee letter issued within 2 days
                </p>
              </div>
            </div>

            {/* Reflection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="text-yellow-600 mr-3" />
                {t.mansfieldWords.recovery.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.mansfieldWords.recovery.content}
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <FaExclamationTriangle className="text-yellow-600 text-3xl mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-800 mb-2">
                  {t.mansfieldWords.conclusion.content}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Key Insights */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mt-12"
          >
            {/* Financial Insights */}
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {language === "en" ? "Key Insights" : "重要見解"}
              </h3>
              <ul className="space-y-3">
                {t.insights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle Reflections */}
            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {language === "en" ? "Lifestyle vs Life" : "生活方式 vs 生命"}
              </h3>
              <ul className="space-y-3">
                {t.reflections.map((reflection, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{reflection}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === "en" 
                  ? "What Do You Choose to Prioritize?" 
                  : "您選擇優先考慮什麼？"
                }
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {language === "en"
                  ? "Let us help you make informed choices about protecting what matters most - your health and your family's future."
                  : "讓我們幫助您明智地選擇保護最重要的事物——您的健康和家人的未來。"
                }
              </p>
              <Link href="/contact">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                  {language === "en" ? "Contact Mansfield" : "聯繫Mansfield"}
                </button>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
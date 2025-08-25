"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    title: "Reflection After Claiming",
    subtitle: "Mr Mansfield Lai's Words - When Medical Crisis Tests Priorities",
    backToStories: "Back to Case Studies",

    mansfieldWords: {
      title: "Mr Mansfield Lai's Words",

      crisis: {
        title: "The Midnight Call",
        content:
          '"I suddenly felt as though I had forgotten what had happened two days ago", said one anxious client of mine calling me by midnight two weeks ago. He was asking for my views and gave me a hint that his condition might be symptoms of a stroke.',
      },

      urgency: {
        title: "Immediate Action Required",
        content:
          'I urged him to visit the hospital immediately for a check up. In two days\' time the doctors at the hospital were unable to identify the cause of his problems. His condition deteriorated very quickly in a few days and was sent to the intensive care unit ("ICU"). On the first day when he was inpatient, the estimated medical expense was HK$70,000. It was HK$900,000 upon his admission to the ICU.',
      },

      protection: {
        title: "Insurance Shield in Action",
        content:
          "That unexpected turmoil in life has been shielded by a [Premium Medical Policy], which was prepared by him a decade ago for himself and his family. As his financial planner, I assisted his medical insurance claim procedures. In less than two days, our company has approved his claim and issued the guarantee letter that guarantees his medical expenses are to be covered by his insurance policy. My client and his family were lucky enough to avoid the suffering of keeping an eye on the exorbitant medical expenses and were able to focus on the healthcare and recovery process free from financial pressure.",
      },

      recovery: {
        title: "Recovery and Reflection",
        content:
          "The client has now largely recovered and his life back on track. I wonder, as financial planners we were often told by clients that they cannot afford to pay the premium given their current expenditure, savings plans or because of other reasons. They nevertheless are always paying for one cup of latte every morning and going to yoga classes every weekend. Some live a fancy lifestyle by going onto overseas vacations several times a year or to purchase a luxury brand handbag every season. What they cannot afford does not appear to be the medical insurance premium itself, but their own lifes. They value their lifestyle more than they do value their own health and the wellbeing of their family.",
      },

      conclusion: {
        title: "A Matter of Choice",
        content: "Afterall, this is really a question of personal choice.",
      },
    },

    insights: [
      "Medical emergencies can escalate from HK$70,000 to HK$900,000 in days",
      "Premium Medical Policy provided complete financial protection for a decade-old investment",
      "Insurance claim approved and guarantee letter issued within 2 days",
      "Family could focus on recovery instead of worrying about medical expenses",
    ],

    reflections: [
      "Daily lattes and weekend yoga classes cost more than medical insurance over time",
      "Luxury purchases and overseas vacations reflect lifestyle priorities over health protection",
      "What people 'cannot afford' is often about choice, not actual financial capacity",
      "The real question is whether we value lifestyle more than life itself",
    ],

    dayOneLabel: "Day 1 (Inpatient)",
    icuAdmissionLabel: "ICU Admission",
    claimApprovedText:
      "Claim approved and guarantee letter issued within 2 days",
  },

  "zh-HK": {
    title: "理賠後的反思",
    subtitle: "Mansfield Lai先生的話 - 當醫療危機考驗優先順序",
    backToStories: "返回客戶故事",

    mansfieldWords: {
      title: "Mansfield Lai先生的話",

      crisis: {
        title: "午夜來電",
        content:
          "「我突然覺得好像忘記了兩天前發生的事情」，我的一位焦急客戶在兩週前的午夜給我打電話說。他向我尋求意見，並暗示他的狀況可能是中風的症狀。",
      },

      urgency: {
        title: "需要立即行動",
        content:
          '我敦促他立即到醫院檢查。兩天內，醫院的醫生無法確定他問題的原因。他的病情在幾天內迅速惡化，被送到重症監護室（"ICU"）。住院第一天，預估醫療費用為港幣7萬元。入住ICU時已達港幣90萬元。',
      },

      protection: {
        title: "保險盾牌在行動",
        content:
          "生活中這一意外風暴被一份[高端醫療保單]所保護，這是他十年前為自己和家人準備的。作為他的理財規劃師，我協助處理他的醫療保險理賠程序。不到兩天，我們公司就批准了他的理賠並發出了保證函，保證他的醫療費用將由保險單承擔。我的客戶和他的家人很幸運地避免了關注昂貴醫療費用的痛苦，能夠在沒有財務壓力的情況下專注於醫療保健和康復過程。",
      },

      recovery: {
        title: "康復與反思",
        content:
          "客戶現在基本康復，生活重回正軌。我想知道，作為理財規劃師，我們經常被客戶告知，由於目前的支出、儲蓄計劃或其他原因，他們負擔不起保費。然而，他們總是每天早上支付一杯拿鐵的費用，每個週末去瑜伽課。一些人過著奢華的生活方式，每年多次海外度假或每季購買奢侈品牌手袋。他們負擔不起的似乎不是醫療保險費本身，而是他們自己的生命。他們更重視自己的生活方式，而不是自己的健康和家人的福祉。",
      },

      conclusion: {
        title: "選擇問題",
        content: "畢竟，這真的是個人選擇的問題。",
      },
    },

    insights: [
      "醫療緊急情況可能在幾天內從港幣7萬元升級到90萬元",
      "高端醫療保單為十年前的投資提供了完整的財務保護",
      "保險理賠在2天內獲批並發出保證函",
      "家人可以專注於康復而不用擔心醫療費用",
    ],

    reflections: [
      "每日拿鐵和週末瑜伽課程長期成本超過醫療保險",
      "奢侈品購買和海外度假反映了生活方式優先於健康保護",
      "人們「負擔不起」的往往是關於選擇，而非實際財務能力",
      "真正的問題是我們是否更重視生活方式而非生命本身",
    ],

    dayOneLabel: "第1天（住院）",
    icuAdmissionLabel: "ICU入院",
    claimApprovedText: "理賠在2天內獲批並發出保證函",
  },
};

export default function MansfieldReflectionPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Clean Professional Header */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/case-studies/client-stories"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              {t.backToStories}
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <FaStethoscope className="text-3xl text-gray-700" />
              <div>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                  Medical Claims
                </span>
                <span className="text-gray-500 text-sm ml-4">7 min read</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* The Crisis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                {t.mansfieldWords.crisis.title}
              </h2>
              <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg mb-6">
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  {t.mansfieldWords.crisis.content}
                </p>
              </div>
            </motion.div>

            {/* Immediate Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                {t.mansfieldWords.urgency.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.mansfieldWords.urgency.content}
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t.dayOneLabel}
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      HK$70,000
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t.icuAdmissionLabel}
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      HK$900,000
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Insurance Protection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                {t.mansfieldWords.protection.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.mansfieldWords.protection.content}
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-center font-semibold text-gray-800">
                  {t.claimApprovedText}
                </p>
              </div>
            </motion.div>

            {/* Recovery and Reflection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                {t.mansfieldWords.recovery.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.mansfieldWords.recovery.content}
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                <p className="text-xl font-bold text-gray-800">
                  {t.mansfieldWords.conclusion.content}
                </p>
              </div>
            </motion.div>

            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Financial Insights */}
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
                  {language === "en" ? "Key Insights" : "重要見解"}
                </h3>
                <ul className="space-y-4">
                  {t.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Reflections */}
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
                  {language === "en" ? "Lifestyle vs Life" : "生活方式 vs 生命"}
                </h3>
                <ul className="space-y-4">
                  {t.reflections.map((reflection, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{reflection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

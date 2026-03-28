"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    title: "When Preparation Meets Emergency",
    subtitle: "A Financial Planner's Reflection on Protection and Priorities",
    backToStories: "Back to Case Studies",

    mansfieldWords: {
      title: "A Personal Reflection",

      crisis: {
        title: "The Midnight Call",
        content:
          '"I suddenly felt as though I had forgotten what had happened two days ago," said an anxious client calling me at midnight two weeks ago. He sought my perspective, sharing concerns that his symptoms might indicate a stroke.',
      },

      urgency: {
        title: "Immediate Action Required",
        content:
          "I urged him to visit the hospital immediately. Within two days, doctors were unable to identify the cause. His condition deteriorated rapidly, requiring transfer to the intensive care unit (ICU). Initial estimated medical expenses were HK$70,000 on admission day. By ICU admission, costs had escalated to HK$900,000.",
      },

      protection: {
        title: "The Value of Forward Planning",
        content:
          "This unexpected medical crisis was covered by a comprehensive medical policy he had secured a decade earlier for himself and his family. As his financial planner, I assisted with the claims process. Within two days, the claim was approved and a guarantee letter issued, ensuring all medical expenses would be covered. The family could focus entirely on recovery without financial burden.",
      },

      recovery: {
        title: "Recovery and Reflection",
        content:
          "The client has since recovered well and resumed normal life. This experience prompts reflection: clients often express that insurance premiums don't fit their current budget, citing existing commitments or savings goals. Yet these same individuals may spend on daily coffee, weekly fitness classes, frequent overseas holidays, or seasonal luxury purchases. Perhaps what feels unaffordable isn't the premium itself—it's the competing demands of lifestyle versus long-term protection. The question becomes: which priorities serve us best when the unexpected occurs?",
      },

      conclusion: {
        title: "A Matter of Choice",
        content: "Ultimately, these decisions reflect our personal values and priorities.",
      },
    },

    insights: [
      "Medical costs can escalate from HK$70,000 to HK$900,000 within days",
      "Decade-old policy provided comprehensive financial protection when needed",
      "Claims processed and guarantee letter issued within 48 hours",
      "Family could focus on recovery rather than financial concerns",
    ],

    reflections: [
      "Small daily expenses accumulate to exceed annual insurance costs",
      "Discretionary spending often takes priority over protection planning",
      "Affordability is frequently about allocation, not absolute capacity",
      "True priorities become clear when crisis strikes",
    ],

    dayOneLabel: "Day 1 (Admission)",
    icuAdmissionLabel: "ICU Admission",
    claimApprovedText:
      "Claim approved and guarantee letter issued within 48 hours",
  },

  "zh-HK": {
    title: "當準備遇上緊急情況",
    subtitle: "一位理財規劃師對保障與優先順序的反思",
    backToStories: "返回案例研究",

    mansfieldWords: {
      title: "個人反思",

      crisis: {
        title: "午夜來電",
        content:
          "「我突然覺得好像忘記了兩天前發生的事情」，兩週前的午夜，一位焦急的客戶這樣告訴我。他向我尋求意見，擔心他的症狀可能是中風的徵兆。",
      },

      urgency: {
        title: "需要立即行動",
        content:
          "我敦促他立即前往醫院。兩天內，醫生仍無法確定病因。他的病情迅速惡化，需要轉入深切治療部（ICU）。入院當天預估醫療費用為港幣7萬元。到入住ICU時，費用已升至港幣90萬元。",
      },

      protection: {
        title: "前瞻規劃的價值",
        content:
          "這次突發的醫療危機由他十年前為自己和家人購買的全面醫療保險所承保。作為他的理財規劃師，我協助處理理賠程序。不到兩天，理賠獲批並發出保證函，確保所有醫療費用都將獲得承保。家人能夠完全專注於康復，無需承擔財務壓力。",
      },

      recovery: {
        title: "康復與反思",
        content:
          "客戶現已康復良好，恢復正常生活。這次經歷引發反思：客戶經常表示保費不符合他們目前的預算，理由是現有支出或儲蓄目標。然而，這些人可能每天花費在咖啡上、每週參加健身課程、頻繁海外度假或購買時尚奢侈品。也許感覺負擔不起的不是保費本身——而是生活方式與長期保障之間的競爭需求。問題在於：當意外發生時，哪些優先事項最能服務我們？",
      },

      conclusion: {
        title: "選擇問題",
        content: "最終，這些決定反映了我們的個人價值觀和優先事項。",
      },
    },

    insights: [
      "醫療費用可在數天內從港幣7萬元升至90萬元",
      "十年前的保單在需要時提供了全面的財務保障",
      "理賠在48小時內獲批並發出保證函",
      "家人能夠專注於康復，而非擔憂財務",
    ],

    reflections: [
      "日常小額支出累積起來超過年度保險費用",
      "可支配支出往往優先於保障規劃",
      "負擔能力通常關乎分配，而非絕對能力",
      "真正的優先事項在危機來臨時變得清晰",
    ],

    dayOneLabel: "第1天（入院）",
    icuAdmissionLabel: "ICU入院",
    claimApprovedText: "理賠在48小時內獲批並發出保證函",
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

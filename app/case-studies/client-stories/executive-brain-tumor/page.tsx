"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "When Personal Crisis Meets Professional Life",
    subtitle: "How comprehensive coverage provides stability in unexpected moments",
    category: "Medical Emergency",
    readTime: "7 min read",

    sections: [
      {
        title: "A High-Achieving Professional",
        content:
          "A senior executive in investment banking, earning HK$200,000 monthly, had built her career on composure under pressure—the ability to navigate financial crises with clarity and calm. Her professional reputation was built on being unshakeable in challenging situations. Yet personal adversity would soon test her in ways no boardroom ever had.",
      },
      {
        title: "When the Unexpected Strikes",
        content:
          "Financial professionals often project an image of invincibility. The reality is that personal vulnerability emerges when crisis strikes closest to home. When her husband was diagnosed with a brain tumour, she found herself facing multiple overwhelming concerns simultaneously—medical procedures, work obligations, and caregiving responsibilities—all competing for attention she didn't have to give.",
      },
      {
        title: "The Human Response",
        content:
          "In those moments, professional composure gave way to raw human emotion. She reached out repeatedly, seeking reassurance about the claims process. Understanding this response is important: when medical claims are needed, processing does require time for documentation and underwriting review. Yet in crisis moments, clients need more than procedural explanations.",
      },
      {
        title: "Compassionate Professional Support",
        content:
          "With experience supporting clients through difficult circumstances, we understood what she was experiencing. She would not be the first—nor the last—client to need extra support during critical moments. What matters most in these situations is providing genuine care alongside professional service, recognising that clients need emotional support as much as claims expertise.",
      },
      {
        title: "The Resolution",
        content:
          "Several weeks later, HK$1,000,000 in medical insurance claims was processed and approved. This substantial coverage allowed the family to focus entirely on recovery without the additional burden of mounting medical expenses. Their forward planning with comprehensive medical coverage provided the financial stability they needed during the most challenging period of their lives.",
      },
    ],

    keyOutcome:
      "HK$1,000,000 in claims processed, allowing family to focus on recovery rather than finances",

    tags: [
      "Medical Emergency",
      "Critical Illness",
      "Compassionate Support",
      "Family Protection",
    ],
  },
  "zh-HK": {
    backToStories: "返回案例研究",
    title: "當個人危機遇上職業生涯",
    subtitle: "全面保障如何在意想不到的時刻提供穩定",
    category: "醫療緊急情況",
    readTime: "7分鐘閱讀",

    sections: [
      {
        title: "卓越的專業人士",
        content:
          "一位投資銀行的高級管理人員，月薪20萬港元，她的事業建立在壓力下的冷靜——以清晰和沉著應對金融危機的能力。她的專業聲譽建立在面對挑戰時的沉穩。然而，個人逆境即將以任何會議室都無法比擬的方式考驗她。",
      },
      {
        title: "當意外來襲",
        content:
          "金融專業人士常給人一種無懈可擊的印象。現實是，當危機在最親近的地方發生時，個人的脆弱性便會顯現。當丈夫被診斷患有腦腫瘤時，她發現自己同時面對多重壓力——醫療程序、工作義務和照顧責任——所有這些都在爭奪她無法分配的注意力。",
      },
      {
        title: "人性的反應",
        content:
          "在那些時刻，專業的鎮定讓位於真實的人類情感。她多次聯繫我們，尋求關於理賠程序的保證。理解這種反應很重要：當需要醫療理賠時，處理確實需要時間進行文件審核和核保。然而在危機時刻，客戶需要的不僅是程序說明。",
      },
      {
        title: "富有同理心的專業支援",
        content:
          "憑藉支援客戶度過困難時期的經驗，我們理解她正在經歷什麼。她不會是第一個——也不會是最後一個——在關鍵時刻需要額外支援的客戶。在這些情況下最重要的是在提供專業服務的同時給予真誠的關懷，認識到客戶需要情感支持與理賠專業知識同樣重要。",
      },
      {
        title: "最終解決",
        content:
          "幾週後，100萬港元的醫療保險理賠獲得處理和批准。這筆可觀的保障讓家庭能夠完全專注於康復，而無需承擔不斷增加的醫療費用的額外負擔。他們對全面醫療保障的前瞻規劃，在人生最具挑戰的時期提供了所需的財務穩定。",
      },
    ],

    keyOutcome: "處理100萬港元理賠，讓家庭專注於康復而非財務",

    tags: ["醫療緊急情況", "危疾保險", "關懷支援", "家庭保障"],
  },
};

export default function ExecutiveBrainTumorPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
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
              <FaHeartbeat className="text-3xl text-gray-700" />
              <div>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                  {t.category}
                </span>
                <span className="text-gray-500 text-sm ml-4">{t.readTime}</span>
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
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Key Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaHeart className="text-2xl text-gray-700" />
                <h3 className="text-xl font-bold text-gray-800">
                  {language === "en" ? "Key Outcome" : "關鍵結果"}
                </h3>
              </div>
              <p className="text-gray-600 text-lg">{t.keyOutcome}</p>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-3"
            >
              {t.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

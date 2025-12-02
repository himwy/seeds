"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "When Time Doesn't Define Limits",
    subtitle:
      "A rare illness, a forgotten claim, and the unexpected outcome a decade later",
    category: "Rare Disease Claims",
    readTime: "8 min read",

    sections: [
      {
        title: "Understanding Rare Conditions",
        content:
          "Steve Jobs famously noted that upon receiving his pancreatic cancer diagnosis, he didn't even know what a pancreas was. Critical illnesses are often more complex than we imagine, and medical science continues to identify conditions affecting people worldwide. Lacrimal gland cancer—affecting approximately three in one hundred thousand individuals—represents one such rare condition. One of our close contacts became one of the few to face this uncommon diagnosis.",
      },
      {
        title: "Early Detection and Recovery",
        content:
          "Fortunately, the cancer was detected early, providing valuable time for effective treatment. Thanks to advances in medical technology and dedicated healthcare professionals, he overcame the disease and recovered fully. A decade after his successful treatment, during a casual conversation, he shared his experience navigating this challenging journey.",
      },
      {
        title: "A Forgotten Policy",
        content:
          "When asked about his medical expenses, he paused—suddenly realising he had never filed a claim on a critical illness policy purchased years earlier. Years had passed since the purchase, and without anyone to remind him, the claim process had simply been overlooked. Despite policy time limitations that typically require claims within a specific period, we encouraged him to attempt the claim regardless. With nothing to lose, we accompanied him to complete the necessary documentation.",
      },
      {
        title: "An Unexpected Outcome",
        content:
          "The paperwork proved straightforward. Whether the delayed claim would succeed depended entirely on the insurer's approach to serving their customers. Several weeks later came unexpected news: the claim had been approved, resulting in a payout exceeding HK$800,000. Having never anticipated such an outcome after so many years, he expressed genuine gratitude. This unexpected sum ultimately funded his master's degree studies—an investment in his future that stemmed from forward planning made years before.",
      },
      {
        title: "Reconsidering Industry Perceptions",
        content:
          "Many hold misconceptions about insurance companies, viewing them primarily as profit-driven entities. In reality, these organisations exist to provide protection—offering a mechanism to transfer certain risks and provide security when needed. While operating as commercial institutions, successful insurers understand that sustainable growth comes from delivering genuine value and protection to customers. This case illustrates how customer-focused practices can create meaningful outcomes, even in unexpected circumstances.",
      },
    ],

    keyOutcome:
      "Successfully recovered HK$800,000+ claim after 10 years, funding postgraduate education",

    tags: [
      "Critical Illness",
      "Insurance Claims",
      "Medical Recovery",
      "Education Investment",
    ],
  },
  "zh-HK": {
    backToStories: "返回案例研究",
    title: "當時間不再是限制",
    subtitle: "一種罕見疾病、一份被遺忘的保單，以及十年後的意外結果",
    category: "罕見疾病理賠",
    readTime: "8分鐘閱讀",

    sections: [
      {
        title: "了解罕見疾病",
        content:
          "喬布斯曾提到，當醫生告知他患有胰臟癌時，他甚至不知道胰臟在哪裏。危疾往往比我們想像的更為複雜，醫學界也持續發現影響人們的各種疾病。淚腺癌——大約每十萬人中有三人患病——就是這樣一種罕見疾病。我們的一位朋友成為了少數面對這種罕見診斷的人之一。",
      },
      {
        title: "早期發現與康復",
        content:
          "幸運的是，癌症發現得早，為有效治療爭取了寶貴時間。得益於醫療技術的進步和醫護人員的專業付出，他戰勝了疾病並完全康復。在成功治療十年後的一次閒談中，他分享了這段充滿挑戰的經歷。",
      },
      {
        title: "被遺忘的保單",
        content:
          "當問及他的醫療費用時，他停頓了一下——突然意識到他從未就多年前購買的危疾保險提出理賠。時間流逝，沒有人提醒他，理賠程序就這樣被遺忘了。儘管保單通常設有時限規定，我們仍鼓勵他嘗試申請。既然沒有損失，我們陪同他完成了必要的文件。",
      },
      {
        title: "意外的結果",
        content:
          "申請程序相當簡單。延遲的理賠能否成功，完全取決於保險公司服務客戶的態度。幾週後傳來了意外的消息：理賠獲得批准，賠償金額超過80萬港元。他從未想過這麼多年後還能獲得這樣的結果，表達了真摯的感謝。這筆意外之財最終資助了他的碩士學位學業——一項源於多年前前瞻規劃的未來投資。",
      },
      {
        title: "重新審視行業認知",
        content:
          "許多人對保險公司存有誤解，認為它們主要以盈利為導向。事實上，這些機構的存在是為了提供保障——提供一種轉移風險並在需要時提供保障的機制。雖然作為商業機構運營，成功的保險公司深知可持續增長來自於為客戶提供真正的價值和保障。這個案例說明了以客戶為中心的做法如何能在意想不到的情況下創造有意義的結果。",
      },
    ],

    keyOutcome: "成功追回十年後80多萬港元理賠，資助研究生教育",

    tags: ["危疾保險", "保險理賠", "醫療康復", "教育投資"],
  },
};

export default function SpecialHealthDiseasePage() {
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
              <FaStethoscope className="text-3xl text-gray-700" />
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

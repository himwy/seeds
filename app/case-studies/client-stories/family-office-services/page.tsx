"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "Understanding the Needs of High-End Customers",
    subtitle: "Family office services for ultra-high-net-worth families",
    category: "Wealth Management",
    readTime: "6 min read",

    sections: [
      {
        title: "What Defines a High-End Customer?",
        content:
          "What is a high-end customer? Does it mean professionals? Clients of family offices typically have family assets in excess of $100 million. When the accumulation of wealth reaches a certain level, high-end customers have huge financial needs, and they need professional advice and related wealth inheritance plans.",
      },
      {
        title: "The Family Office Business Model",
        content:
          "The family office business allows high-end clients to properly arrange their assets, and it is also a strong backing for the client's family wealth, which can make them feel at ease and effectively pass on the family wealth across generations. Hong Kong is a place where capitalists are concentrated. With the rapid development of the Greater Bay Area, the family office market has a huge space for development.",
      },
      {
        title: "Introduction to Family Office Services",
        content:
          "The business goal of the family office is to allow high-end clients to handle wealth inheritance, succession of family businesses, family spiritual wealth and philanthropy, and can make appropriate recommendations according to the family's own wishes. Traditional businesses include setting up family trusts and family charitable funds, helping high-end clients' assets build firewalls, protecting clients' assets, and avoiding claims from creditors and marital risks.",
      },
      {
        title: "Comprehensive Wealth Management",
        content:
          "Moreover, professionals in the family office business will also help clients manage and arrange suitable overseas asset allocation or alternative investment plans, such as private equity or green investment. Apart from the business of wealth, the family office will also work on the formulation of a family charter. The family constitution refers to the arrangement of family rules, family traditions and property distribution rights within the family, so that the core values and family spirit of the family can be passed on from generation to generation.",
      },
      {
        title: "Cultural and Family Values",
        content:
          "In addition to paying attention to wealth appreciation, the families of high-end customers also attach great importance to the family culture, so there will be various professionals in the market to provide corresponding services.",
      },
      {
        title: "Financial Planners and High-End Clients",
        content:
          "The financial-related services provided by general financial planners revolve around insurance/savings/funds, and will not provide other more complex services, such as the establishment of family trusts mentioned above. However, in the huge capital market of Hong Kong, clients around financial planners also need family trusts. Since financial planners are restricted by their own business, they must rely on a good network of professional relationships to meet the needs of high-end clients.",
      },
      {
        title: "Seeds Financial Group's Expertise",
        content:
          "Wendy Lee and Mansfield Lai of Seeds Financial Group have served in the insurance industry for many years and have accumulated and established a mature and reliable relationship network to meet the needs of team clients. Seeds Financial Group sees the development potential of the Greater Bay Area and knows that the wealth management needs of high-end customers will only increase in the next 10 years. Therefore, we have made adequate preparations to meet the opportunities in the financial market.",
      },
    ],

    keyOutcome:
      "Comprehensive wealth management and succession planning for ultra-high-net-worth families",

    tags: [
      "Family Office",
      "Wealth Management",
      "Succession Planning",
      "Trust Services",
    ],
  },
  "zh-HK": {
    backToStories: "返回案例研究",
    title: "家族辦公室了解高端客戶的需要",
    subtitle: "為超高淨值家族提供的家族辦公室服務",
    category: "財富管理",
    readTime: "6分鐘閱讀",

    sections: [
      {
        title: "什麼是高端客戶？",
        content:
          "什麼是高端客戶？是指專業人士嗎？家族辦公室的服務對象一般擁有超過1億美元的家族資產。當財富的累積達到一定水平，高端客戶的理財需要龐大，他們需要專業的顧問意見以及相關的財富傳承方案安排。",
      },
      {
        title: "家族辦公室的商業模式",
        content:
          "家族辦公室的業務讓高端客戶妥當的安排他們的資產，也是客戶家族財富的強大後盾，可以令他們安心將家族財富有效跨代傳承下去。香港是一個資本家的集中地，在大灣區的高速發展之下，家族辦公室市場的發展空間非常巨大。",
      },
      {
        title: "家族辦公室簡介",
        content:
          "家族辦公室的業務目標是讓高端客戶處理財富的傳承、家族企業的接班、家族精神財富與慈善事業可以根據家族其本身的意願，作出合適的建議。傳統的業務包括成立家族信託與家族慈善基金，幫助高端客戶的資產築起防火牆，保護客戶的資產，避免債權人的追討以及婚姻風險的索償。",
      },
      {
        title: "全面的財富管理",
        content:
          "而且，家族辦公室業務的專業人士也會幫助客戶管理以及安排合適的海外資産配置或另類投方案.，例如私募股權或綠色投資等。除了關於財富的業務以外，家族辦公室也會著手擬家族憲章的訂立。家族憲章是指家族裡面的家規、家風以及財產分配權的安排，使家族的核心價值及家族精神得以代代傳承。",
      },
      {
        title: "文化與家族價值",
        content:
          "高端客戶的家庭除了關注財富增值以外，他們對家族的文化也非常的重視，因此市場上也會有各種專業人士提供相應的服務。",
      },
      {
        title: "財務策劃師與高端客戶",
        content:
          "一般的財務策劃員所提供的金融相關服務都是圍繞著保險/ 儲蓄/ 基金，並不會提供其他更複雜的服務，比如以上所說的成立家族信託。但是在香港這一個龐大的資本市場，財務策劃師身邊的客戶也有需要家族信託的需求。既然財務策劃員受制與自身業務所限，就必須依靠良好的專業關係網絡來滿足高端客戶的需求。",
      },
      {
        title: "Seeds Financial Group的專業能力",
        content:
          "Seeds Financial Group 的Wendy Lee與 Mansfield Lai在保險業服務多年，已經累積與建立了成熟可靠的關係網絡，讓團隊客戶的需求能夠得到滿足。Seeds Financial Group看準了大灣區的發展潛力，知道未來10年高端客戶的理財需求只會有增無減，因此我們已經做好了充足的準備，迎接金融市場的機遇。",
      },
    ],

    keyOutcome: "為超高淨值家族提供全面的財富管理和傳承規劃服務",

    tags: ["家族辦公室", "財富管理", "傳承規劃", "信託服務"],
  },
};

export default function FamilyOfficeServicesPage() {
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
              <FaBuilding className="text-3xl text-gray-700" />
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

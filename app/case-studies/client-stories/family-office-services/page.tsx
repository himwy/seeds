"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "Serving Ultra-High-Net-Worth Families",
    subtitle: "Comprehensive family office solutions for wealth preservation and legacy planning",
    category: "Wealth Management",
    readTime: "6 min read",

    sections: [
      {
        title: "Understanding High-Net-Worth Clients",
        content:
          "Family office clients typically manage family assets exceeding US$100 million. At this level of wealth accumulation, financial needs become complex and multifaceted, requiring professional advisory services and comprehensive wealth succession strategies.",
      },
      {
        title: "The Family Office Framework",
        content:
          "Family office services enable high-net-worth clients to structure their assets strategically, providing robust support for multi-generational wealth preservation and transfer. Hong Kong serves as a significant hub for capital management, and with the Greater Bay Area's continued development, the family office market presents substantial growth opportunities.",
      },
      {
        title: "Core Service Offerings",
        content:
          "Family office services encompass wealth succession, business transition planning, preservation of family values, and philanthropic endeavours—all tailored to each family's specific wishes and objectives. Traditional services include establishing family trusts and charitable foundations, creating asset protection structures, and implementing safeguards against creditor claims and matrimonial risks.",
      },
      {
        title: "Holistic Wealth Management",
        content:
          "Beyond traditional offerings, family office professionals assist with international asset allocation and alternative investment strategies, including private equity and sustainable investments. Services extend to family governance, including the development of family constitutions that codify family values, traditions, and wealth distribution protocols, ensuring core principles endure across generations.",
      },
      {
        title: "Preserving Family Legacy",
        content:
          "High-net-worth families often prioritise cultural heritage and family values alongside wealth growth. This holistic approach requires diverse professional expertise to address both financial and non-financial dimensions of family wealth.",
      },
      {
        title: "Expanding Financial Planning Capabilities",
        content:
          "While traditional financial planning focuses on insurance, savings, and investment products, clients with substantial assets often require more sophisticated solutions such as trust structures. Effective service delivery requires established professional networks that can address these comprehensive needs.",
      },
      {
        title: "Our Expertise and Approach",
        content:
          "Our leadership team brings extensive insurance industry experience and has cultivated reliable professional networks to serve our clients' diverse requirements. Recognising the Greater Bay Area's growth trajectory and the increasing complexity of high-net-worth client needs, we have positioned ourselves to address the evolving demands of this market segment.",
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
    title: "服務超高淨值家族",
    subtitle: "全面的家族辦公室解決方案，專注財富保全與傳承規劃",
    category: "財富管理",
    readTime: "6分鐘閱讀",

    sections: [
      {
        title: "了解高淨值客戶",
        content:
          "家族辦公室的服務對象通常管理超過1億美元的家族資產。在這個財富累積水平，理財需求變得複雜且多元化，需要專業的顧問服務和全面的財富傳承策略。",
      },
      {
        title: "家族辦公室架構",
        content:
          "家族辦公室服務讓高淨值客戶能夠策略性地安排資產，為多代財富保全和轉移提供穩固支持。香港是重要的資本管理中心，隨著大灣區持續發展，家族辦公室市場呈現可觀的增長機遇。",
      },
      {
        title: "核心服務範疇",
        content:
          "家族辦公室服務涵蓋財富傳承、企業交接規劃、家族價值保存及慈善事業——全部根據每個家族的具體意願和目標度身定制。傳統服務包括成立家族信託和慈善基金、建立資產保護架構，以及實施防範債權人追索和婚姻風險的保障措施。",
      },
      {
        title: "全方位財富管理",
        content:
          "除傳統服務外，家族辦公室專業人士協助進行國際資產配置和另類投資策略，包括私募股權和可持續投資。服務延伸至家族治理，包括制定家族憲章，將家族價值觀、傳統和財富分配協議規範化，確保核心原則代代相傳。",
      },
      {
        title: "保存家族傳承",
        content:
          "高淨值家族往往在追求財富增長的同時，也重視文化傳承和家族價值。這種全面的方法需要多元化的專業知識，以處理家族財富的財務和非財務層面。",
      },
      {
        title: "拓展財務規劃能力",
        content:
          "傳統財務規劃側重於保險、儲蓄和投資產品，而擁有大量資產的客戶往往需要更複雜的解決方案，如信託架構。有效的服務交付需要建立專業網絡，以滿足這些全面的需求。",
      },
      {
        title: "我們的專業與方法",
        content:
          "我們的領導團隊擁有豐富的保險行業經驗，並已建立可靠的專業網絡，以服務客戶的多元需求。認識到大灣區的增長軌跡和高淨值客戶需求日益複雜，我們已做好準備，應對這個市場領域不斷演變的需求。",
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

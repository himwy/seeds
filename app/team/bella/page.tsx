"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaUsers } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Bella",
    subtitle: "Wealth Management Director",
    chineseName: "貝拉",
    
    intro: "Bella brings over 30 years of extensive experience in the financial industry, having held prominent leadership positions across banking and state-owned enterprises. She has served as branch manager, regional director, department general manager, and chairman of state-owned enterprises, specializing in asset management, corporate finance, and wealth planning.",
    
    experienceTitle: "Leadership Experience",
    experienceText: "With more than two decades in senior management roles, Bella has demonstrated exceptional decision-making skills and leadership, driving sustained performance growth while earning a stellar reputation within the industry.",
    
    transitionTitle: "New Chapter at AIA",
    transitionText: "Now, Bella embarks on an exciting new chapter by joining AIA Hong Kong and Seeds Financial Group to pursue a career in wealth management. Her decision reflects her deep appreciation for Hong Kong as a global financial hub. Bella recognizes Hong Kong's long-standing financial legacy, robust legal framework, and diversified investment products as key enablers for delivering global asset allocation solutions.",
    
    opportunityTitle: "Market Opportunity",
    opportunityText: "She sees immense potential in combining her expertise with the unique opportunities presented by Hong Kong's market, especially given the growing demand for wealth management and asset protection among high-net-worth individuals.",
    
    aiaTitle: "Why AIA & Seeds Financial Group",
    aiaText: "Bella chose AIA not only for its status as a global leader in life insurance but also for its innovative culture and comprehensive wealth management services. As a company with over a century of history, AIA offers a wide range of products, including family trusts, MPF, insurance, unit-linked funds, and education migration solutions. These offerings align perfectly with Bella's professional values and goals. Additionally, AIA and Seeds Financial Group's robust professional training and elite team support reinforced Bella's confidence in this platform as the ideal stage to further her career.",
    
    expertiseTitle: "Cross-Disciplinary Expertise",
    expertiseText: "As a cross-disciplinary expert in banking and wealth management, Bella leverages her sharp market insights and profound understanding of high-net-worth client needs to provide holistic and personalized financial planning solutions. She excels in strategies such as risk diversification, multi-asset allocation, and cross-border wealth planning to help clients mitigate market fluctuations and achieve sustainable wealth growth.",
    
    servicesTitle: "Comprehensive Services",
    servicesText: "Bella also emphasizes critical services such as intergenerational wealth transfer, marriage and asset segregation, tax planning, and trust management to meet the multifaceted needs of high-net-worth individuals.",
    
    visionTitle: "Vision & Commitment",
    visionText: "Bella views this career transformation as a new professional challenge and an opportunity to deliver greater value to her clients through her unique blend of expertise and experience. She aims to integrate her domestic and international insights with Hong Kong's globally connected market to offer professional, innovative, and forward-looking wealth management services. Through her collaboration with AIA and Seeds Financial Group, Bella is committed to helping clients realize their financial goals while contributing to the growth and success of the team. Her arrival brings unparalleled depth, vision, and potential to the Seeds Financial Group team.",
    
    achievements: [
      "30+ Years Financial Industry Experience",
      "Former Branch Manager & Regional Director",
      "Department General Manager Experience",
      "Chairman of State-Owned Enterprises",
      "Asset Management & Corporate Finance Expert",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Bella",
    subtitle: "財富管理總監",
    chineseName: "貝拉",
    
    intro: "Bella擁有超過30年的金融行業豐富經驗，曾在銀行和國有企業擔任重要領導職位。她曾擔任分行經理、區域總監、部門總經理和國有企業董事長，專門從事資產管理、企業金融和財富規劃。",
    
    experienceTitle: "領導經驗",
    experienceText: "擁有超過二十年的高級管理經驗，Bella展現了卓越的決策能力和領導力，推動持續的業績增長，同時在行業內贏得了卓越的聲譽。",
    
    transitionTitle: "友邦新篇章",
    transitionText: "現在，Bella通過加入友邦香港和Seeds Financial Group開始了一個激動人心的新篇章，追求財富管理事業。她的決定反映了她對香港作為全球金融中心的深度讚賞。Bella認識到香港悠久的金融傳統、穩健的法律框架和多元化的投資產品是提供全球資產配置解決方案的關鍵因素。",
    
    opportunityTitle: "市場機遇",
    opportunityText: "她看到了將自己的專業知識與香港市場所呈現的獨特機遇相結合的巨大潛力，特別是考慮到高淨值人士對財富管理和資產保護日益增長的需求。",
    
    aiaTitle: "選擇友邦及Seeds Financial Group的原因",
    aiaText: "Bella選擇友邦不僅因為其作為全球人壽保險領導者的地位，還因為其創新文化和全面的財富管理服務。作為一家擁有超過一個世紀歷史的公司，友邦提供廣泛的產品，包括家族信託、強積金、保險、單位連結基金和教育移民解決方案。這些產品完全符合Bella的專業價值觀和目標。此外，友邦和Seeds Financial Group強大的專業培訓和精英團隊支持強化了Bella對這個平台作為進一步發展事業理想舞台的信心。",
    
    expertiseTitle: "跨學科專業知識",
    expertiseText: "作為銀行和財富管理領域的跨學科專家，Bella運用她敏銳的市場洞察力和對高淨值客戶需求的深刻理解，提供全面和個性化的財務規劃解決方案。她擅長風險分散、多資產配置和跨境財富規劃等策略，幫助客戶減輕市場波動並實現可持續的財富增長。",
    
    servicesTitle: "全面服務",
    servicesText: "Bella還強調重要服務，如代際財富轉移、婚姻和資產分離、稅務規劃和信託管理，以滿足高淨值人士的多方面需求。",
    
    visionTitle: "願景與承諾",
    visionText: "Bella將這次職業轉型視為新的專業挑戰和通過她獨特的專業知識和經驗組合為客戶提供更大價值的機會。她旨在將她的國內外洞察與香港全球連接的市場相結合，提供專業、創新和前瞻性的財富管理服務。通過與友邦和Seeds Financial Group的合作，Bella致力於幫助客戶實現財務目標，同時為團隊的成長和成功做出貢獻。她的到來為Seeds Financial Group團隊帶來了無與倫比的深度、願景和潛力。",
    
    achievements: [
      "30年+金融行業經驗",
      "前分行經理及區域總監",
      "部門總經理經驗",
      "國有企業董事長",
      "資產管理及企業金融專家",
    ],
  },
};

export default function BellaPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-8">
          <Link
            href="/team"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            {t.backToTeam}
          </Link>
        </div>
      </header>

      {/* Main Article */}
      <article className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <p className="text-gray-700 font-semibold text-xl">
                {t.title}
              </p>
              <p className="text-gray-600">
                {t.chineseName}
              </p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-2xl text-gray-700 mb-2">{t.chineseName}</p>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {t.intro}
          </p>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-gray-800 leading-relaxed text-base">
              {t.achievements.map((achievement, index) => (
                <p
                  key={index}
                  className="mb-2 font-medium"
                >
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.experienceTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.experienceText}
          </p>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-full"
              >
                <source
                  src="/assets/bella/Seeds Team-Bella-Highlight-2024-1211-720p.MP4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">
              Bella's Journey Joining AIA
            </p>
          </div>
        </section>

        {/* New Chapter at AIA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.transitionTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.transitionText}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.opportunityText}
          </p>
        </section>

        {/* Why AIA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.aiaTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.aiaText}
          </p>
        </section>

        {/* Expertise & Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.expertiseTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.expertiseText}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t.servicesTitle}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.servicesText}
          </p>
        </section>

        {/* Vision & Commitment */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.visionTitle}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.visionText}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Karen Wong",
    subtitle: "Associate Wealth Management Director",
    chineseName: "王慧盈",

    intro:
      "Karen is a dual-qualified professional - both a solicitor and licensed insurance agent specializing in financial and legal risk management. With extensive expertise in family law, estate planning, conveyancing, and commercial law, she is uniquely positioned to provide comprehensive wealth protection solutions that bridge legal and financial planning.",

    transformationTitle: "Career Transformation",
    transformationText:
      "However, becoming a mother transformed Karen's perspective on life and career. She began to emphasise the importance of wealth planning and realized that integrating her dual qualifications as both a solicitor and licensed insurance agent could provide more comprehensive support for clients in achieving their life goals. This realization led her to join AIA as our Associate Wealth Management Director, as well as Seeds Financial Group, where she focuses on delivering innovative and diversified solutions that combine legal expertise with financial planning.",

    expertiseTitle: "Dual-Qualified Expertise",
    expertiseText1:
      "Karen's unique dual qualification as both a solicitor and licensed insurance agent enables her to provide clients with unprecedented comprehensive support. Her legal expertise spans family law, estate planning, conveyancing, and commercial law, while her insurance qualifications allow her to design sophisticated financial protection strategies.",

    expertiseText2:
      "Through her collaboration with the Seeds Financial Group team, Karen leverages her interdisciplinary knowledge to address complex financial and legal challenges faced by high-net-worth individuals and professionals. She combines legal strategies with insurance tools to help clients mitigate litigation risks, implement asset segregation, establish trusts, and ensure comprehensive wealth protection. Her specialization in financial and legal risk management makes her an invaluable asset for clients seeking holistic protection strategies.",

    aiaTitle: "Why AIA",
    aiaText:
      "Karen was drawn to AIA by its century-long legacy and industry leadership. She particularly resonates with AIA's forward-looking innovation culture, exemplified by its multi-currency savings plans and comprehensive wealth management center, which align seamlessly with her professional values. At the same time, Seeds Financial Group, as a dynamic wealth management platform, provides highly personalized services and professional training, offering Karen dual support for her career development and further solidifying her expertise.",

    visionTitle: "Vision & Impact",
    visionText:
      "As a cross-disciplinary expert who bridges legal expertise with wealth management, Karen is committed to providing clients with innovative and effective solutions. She also hopes to inspire the younger generation through her own experiences, exploring the limitless possibilities of integrating law and financial planning to build a more impactful career. Her arrival brings new depth and value to the professional services of both AIA and Seeds Financial Group, creating even greater opportunities for our clients.",

    achievements: [
      "Dual-qualified Solicitor & Licensed Insurance Agent",
      "Financial & Legal Risk Management Specialist",
      "Family Law, Estate Planning & Commercial Law Expert",
      "Conveyancing & Trust Establishment Specialist",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Karen Wong",
    subtitle: "財富管理副總監",
    chineseName: "王慧盈",

    intro:
      "Karen擁有深厚的法律背景，專注於家庭法與商業法，曾在資產保護、遺產規劃及法律爭議方面積累了豐富經驗。作為一名專業律師，她在解決複雜法律問題上以專業和細緻見稱，並深受客戶信任。",

    transformationTitle: "職業轉變",
    transformationText:
      "然而，在成為母親後，Karen的人生觀和職業規劃發生了轉變。她開始更加重視財富規劃的重要性，並意識到將法律與財富管理相結合能更全面地幫助客戶實現人生目標。這一啟發促使她加入友邦，成為我們的財富管理副總監，同時加入了Seeds Financial Group，專注於提供創新和多元化的解決方案。",

    expertiseTitle: "雙重專業",
    expertiseText1:
      "Karen的雙重專業背景使她能從法律和財務策劃的雙重視角出發，為客戶提供全方位的支持。她在Seeds Financial Group的團隊協作下，能進一步運用跨界專業知識，針對高淨值人士或專業人士面臨的財務挑戰。",

    expertiseText2:
      "結合法律策略與保險工具，幫助客戶降低法律訴訟風險、進行資產隔離及信託設立，確保財富安全。同時，她還注重通過遺囑和持久授權書的設立，為客戶應對突發情況提供保障。此外，她擁有出色的風險管理能力，善於幫助客戶分散投資風險，制定穩健而長遠的財富增值與傳承計劃，這些服務均與Seeds Financial Group的核心理念高度契合。",

    aiaTitle: "選擇友邦的原因",
    aiaText:
      "Karen加入友邦，主要看重其百年歷史與行業領導地位。她特別認同友邦前瞻性的創新文化，例如推出多元貨幣儲蓄計劃以及完善的一站式財富管理中心，這些優勢與她的專業理念不謀而合。同時，Seeds Financial Group作為一個充滿活力的財富管理平台，提供高度個性化的服務和專業培訓，為Karen的職業發展提供了雙重支持，進一步鞏固她的專業地位。",

    visionTitle: "願景與影響",
    visionText:
      "作為一位將法律專業與財富管理深度融合的跨界專家，Karen不僅致力於為客戶提供創新、高效的服務，也希望透過自身經驗啟發年輕一代，探索法律與財務策劃結合的無限可能，打造更具影響力的職業生涯。她的加入，為友邦與Seeds Financial Group的專業服務增添了新的深度與價值，也為我們的客戶創造了更多可能性。",

    achievements: [
      "家庭法與商業法律背景",
      "友邦財富管理副總監",
      "資產保護及遺產規劃專家",
      "信託及風險管理專家",
    ],
  },
};

export default function KarenWongPage() {
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
          <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/assets/karen/karen.jpg"
              alt="Karen Wong - Deputy Director of Wealth Management"
              fill
              className="object-cover"
            />
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
                <p key={index} className="mb-2 font-medium">
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Career Transformation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.transformationTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.transformationText}
          </p>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/-IzUoPLoemU"
                title="Karen's Journey Joining AIA"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">
              Karen&apos;s Journey Joining AIA
            </p>
          </div>
        </section>

        {/* Dual Expertise */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.expertiseTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.expertiseText1}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.expertiseText2}
          </p>
        </section>

        {/* Why AIA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.aiaTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.aiaText}</p>
        </section>

        {/* Vision & Impact */}
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

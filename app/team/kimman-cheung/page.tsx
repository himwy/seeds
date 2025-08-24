"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Kimman Cheung",
    subtitle: "Senior Business Partner",
    chineseName: "張劍文",
    
    education: "Graduated from the Department of Business Administration of CUHK",
    experience: "Worked at AIA for 7 years, and became a member of AIA Premier Academy",
    
    description1: "Kimman graduated from the Department of Business Administration of CUHK, worked at AIA for 7 years, and became a member of AIA Premier Academy. He has always adhered to the spirit of mutual assistance of Seeds Financial Group and has become one of the young elite representatives in the team by maintaining good communication with customers and team support.",
    
    description2: "Kimman also made practical plans for himself. He strives to maintain his MDRT* qualifications, takes MDRT Life Member** as his personal long-term goal, and hopes to make a fortune in the insurance industry.",
    
    footnote1: "*MDRT ranks among the top 1% of global financial advisors",
    footnote2: "**MDRT Life Member is to maintain MDRT's outstanding results for ten consecutive years",
    
    achievements: [
      "AIA Premier Academy Member",
      "MDRT Qualified",
      "7+ Years at AIA",
      "CUHK Business Administration Graduate",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Kimman Cheung",
    subtitle: "高級業務夥伴",
    chineseName: "張劍文",
    
    education: "畢業於中大工商管理學系",
    experience: "在AIA工作了7年，更成為了AIA Premier Academy會員",
    
    description1: "Kimman畢業於中大工商管理學系，在AIA工作了7年，更成為了AIA Premier Academy會員。他一直秉持著Seeds Financial Group的互助精神，憑著與客户保持良好溝通及團隊支援，成為隊中的年輕精英代表之一。",
    
    description2: "Kimman亦為自己作出實際的未來規劃。他努力保持MDRT*資格，以MDRT Life Member**為個人長遠目標，期望在保險業闖出一片天。",
    
    footnote1: "*MDRT為全球理財顧問中排名前1%",
    footnote2: "**MDRT Life Member為連續保持MDRT十年的優異成績",
    
    achievements: [
      "AIA Premier Academy會員",
      "MDRT資格",
      "AIA工作7年+",
      "中大工商管理學系畢業",
    ],
  },
};

export default function KimmanCheungPage() {
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
              src="/assets/kimman/kimman pfp.jpg"
              alt="Kimman Cheung - Senior Business Partner"
              fill
              className="object-cover object-right"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-2xl text-gray-700 mb-2">{t.chineseName}</p>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

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

        {/* Main Content */}
        <section className="mb-16">
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            {t.description1}
          </p>

          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            {t.description2}
          </p>

          {/* Footnotes */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-gray-700 mb-2 text-sm">
              {t.footnote1}
            </p>
            <p className="text-gray-700 text-sm">
              {t.footnote2}
            </p>
          </div>
        </section>

        {/* Professional Image */}
        <section className="mb-16">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-md max-w-2xl mx-auto">
            <Image
              src="/assets/kimman/IMG_9938.jpg"
              alt="Kimman Cheung Professional"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </article>
    </div>
  );
}
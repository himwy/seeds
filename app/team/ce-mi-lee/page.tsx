"use client";

import React, { useState } from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaPlay } from "react-icons/fa";

/**
 * Hero portrait that gracefully falls back to a monogram if the photo
 * file is missing, so the page never shows a broken image.
 */
function HeroPortrait({ initials }: { initials: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-8">
      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100" />
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl ring-4 ring-white">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600 text-5xl font-bold tracking-wide text-white">
            {initials}
          </div>
        ) : (
          <Image
            src="/assets/cemi/cemi.jpg"
            alt="Ce Mi Lee - Team Member"
            fill
            sizes="256px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Ce Mi Lee",
    subtitle: "An International Path to Wealth Management",

    videoTitle: "Interview",
    videoDescription: "Hear Ce Mi share her journey in her own words.",

    backgroundTitle: "Academic Background",
    backgroundText:
      "Ce Mi Lee graduated from Georgetown University with a Bachelor of Arts in Economics and a minor in Art History, earning First Honors. Before Georgetown, she completed the International Baccalaureate at the Chinese International School (CIS) in Hong Kong, where she was a five-year Head's Commendation recipient. Her studies took her around the world, including exchange terms at Yonsei University in Seoul and a campus in Florence, Italy.",

    experienceTitle: "Professional Experience",
    experienceText:
      "Ce Mi's route into wealth management is grounded in hands-on finance experience across three markets. In Hong Kong she supported wealth-planning consultations, prepared portfolio performance reviews, and helped organize a 30-client seminar on Hong Kong estate-planning law. Earlier, as an asset-management intern at Lotte Non-Life Insurance in Seoul, she analyzed an alternative-investment portfolio of more than US$1.3 billion across real estate and energy infrastructure, presenting restructuring strategies to senior leadership.",

    approachTitle: "A Global Perspective",
    approachText:
      "Fluent in English and Korean with conversational Mandarin, Ce Mi brings a genuinely international outlook to her clients. Her background spanning economics, the arts, and cross-border finance lets her connect with clients from different cultures and translate complex financial ideas into clear, actionable plans, always with a client-first mindset.",

    achievements: [
      "BA in Economics, Georgetown University (First Honors)",
      "Asset Management Intern, Lotte Non-Life Insurance (Seoul)",
      "Fluent in English & Korean; Conversational Mandarin",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Ce Mi Lee",
    subtitle: "跨越國界的財富管理之路",

    videoTitle: "專訪",
    videoDescription: "聽 Ce Mi 親述她的故事。",

    backgroundTitle: "學術背景",
    backgroundText:
      "Ce Mi Lee 畢業於喬治城大學，取得經濟學文學士學位，並副修藝術史，成績獲 First Honors。入讀喬治城之前，她於香港漢基國際學校(CIS)完成國際文憑(IB)課程，並連續五年獲頒校長嘉許狀。求學期間，她的足跡遍及世界各地，包括於首爾延世大學及意大利佛羅倫斯校區交流。",

    experienceTitle: "專業經驗",
    experienceText:
      "Ce Mi 的財富管理之路，建基於橫跨三個市場的實戰金融經驗。在香港，她協助客戶進行財富策劃諮詢、編製投資組合表現報告，並協辦一場涵蓋香港遺產規劃法律、共 30 位客戶參與的講座。此前，她於首爾樂天非壽險擔任資產管理實習生，分析涉及房地產及能源基建、逾 13 億美元的另類投資組合，並向高層管理團隊匯報重組策略。",

    approachTitle: "國際視野",
    approachText:
      "Ce Mi 能操流利英語及韓語，並具備中文會話能力，為客戶帶來真正國際化的視野。她橫跨經濟、藝術與跨境金融的背景，讓她能與來自不同文化的客戶建立聯繫，並將複雜的財務概念轉化為清晰、可行的方案，始終秉持以客為先的信念。",

    achievements: [
      "喬治城大學 經濟學文學士（First Honors）",
      "樂天非壽險 資產管理實習生（首爾）",
      "流利英語及韓語；中文會話",
    ],
  },
};

export default function CeMiLeePage() {
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
          <HeroPortrait initials="CL" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 mb-5">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Interview Video — the centerpiece */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 inline-flex items-center">
              <FaPlay className="text-blue-600 mr-3 text-2xl" />
              {t.videoTitle}
            </h2>
            <p className="text-gray-600">{t.videoDescription}</p>
          </div>

          {/* Video Player — hosted on YouTube, embedded like the other team pages */}
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
              <iframe
                src="https://www.youtube.com/embed/DMIRZVMv9xQ"
                title="Ce Mi Lee Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-8 rounded-xl shadow-md">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {t.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-800 font-medium"
                >
                  <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="max-w-3xl mx-auto">
          {/* Academic Background */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.backgroundTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.backgroundText}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.experienceTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.experienceText}
            </p>
          </section>

          {/* A Global Perspective */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.approachTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.approachText}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

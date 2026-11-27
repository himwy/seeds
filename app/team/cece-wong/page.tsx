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
            src="/assets/cece/cece-v2.jpg"
            alt="Cece Wong - Team Member"
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
    title: "Cece Wong",
    subtitle: "From Law Firm to Financial Planning",

    videoTitle: "Interview",
    videoDescription:
      "Hear Cece explain, in her own words, why she moved from a law firm to financial planning.",

    backgroundTitle: "Academic Background and Work Experience",
    backgroundText:
      "Cece's path to financial planning began in law. After completing her legal education, she spent two years training at an international commercial law firm to qualify as a solicitor in Hong Kong, and is now pending admission. The work was demanding: serving corporate clients, reading hundreds and sometimes thousands of pages of documents a day, and often working into the early hours. One IPO project stays with her. Her team had to complete 200 interviews in a short time, calling Africa and South America across time zones, usually from 2 p.m. Hong Kong time until the early hours. It was grueling, yet it was her favorite project in the department, because every time she finished an interview and thanked the person on the other end, she was met with a big smile.",

    reasonTitle: "Why She Made the Switch",
    reasonText:
      "Cece wanted a career with human interaction and building trust at the core of her day-to-day work: getting to know people, building relationships with them, and providing a professional service. Financial planning gives her exactly that. The conversations are about what clients cherish most, from their families and partners to goals like getting married, buying a home, starting a business, or traveling the world in retirement. She also appreciates that seniors and colleagues on the team readily share their own ways to succeed and how to give different clients the most professional service, so everyone moves toward success together, step by step, along a clear path. Taking ownership of her client relationships and her own time also gives her the flexibility to study part-time for a master's degree in environmental management and to take part in climate-related projects.",

    lookingAheadTitle: "Looking Ahead",
    lookingAheadText:
      "Cece is committed to helping clients manage their risks and resources, so that they can focus on their goals and purpose. She sees this work going hand in hand with climate action: the environmental and climate sector does not lack talented, passionate people; it lacks resources. Once she has established herself in business, she aims to be the one providing them. She also hopes to set an example for law students: legal training opens doors to a diverse range of career paths for those open to continuous learning.",

    achievements: [
      "Two-year traineeship at an international commercial law firm",
      "Hong Kong solicitor qualification (pending admission)",
      "Master's in Environmental Management (in progress, part-time)",
      "Involvement in climate-related projects",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Cece Wong",
    subtitle: "從律師行到財富策劃",

    videoTitle: "專訪",
    videoDescription: "聽 Cece 親述她離開律師行、投身財富策劃的原因。",

    backgroundTitle: "學歷及工作經驗",
    backgroundText:
      "Cece 的事業起點在法律界。修畢法律課程後，她於一間國際商業律師行完成了兩年見習律師培訓，以取得香港律師資格，現正等候認許。那份工作非常吃重：服務企業客戶，每天閱讀數百、甚至數千頁文件，經常工作至凌晨。她至今仍記得一個上市項目：團隊要在短時間內完成 200 場訪談，因為時差關係，他們往往由香港時間下午兩點開始，一直致電非洲及南美洲直至凌晨。這個項目雖然辛苦，卻是她在部門裡最喜歡的一個，因為每完成一場訪談，她向受訪者道謝時，總能換來對方一個燦爛的笑容。",

    reasonTitle: "為何轉投財富策劃",
    reasonText:
      "Cece 希望自己的事業以人與人之間的交流和建立信任為日常工作的核心：認識不同的人、與他們建立關係，並提供專業服務。財富策劃正正如此。每天談的，都是客戶最珍惜的事，由家人和伴侶，到結婚、置業、創業，以至退休後環遊世界等人生目標。她亦欣賞團隊裡的前輩和同事樂於分享各自的成功之道，以及如何為不同客戶提供最專業的服務，讓大家一起一步步邁向成功，路向清晰。自主管理客戶關係和時間，亦讓她有彈性兼讀環境管理碩士課程，並參與氣候相關項目。",

    lookingAheadTitle: "展望未來",
    lookingAheadText:
      "Cece 致力協助客戶管理風險與資源，讓他們能專注於自己的目標與志向。她認為這份工作與氣候行動可以相輔相成：環境及氣候行動界別並不缺乏有才華、有熱誠的人，缺的是資源；只要她在商界站穩陣腳，將來便能成為提供資源的一方。她亦希望為法律系學生樹立榜樣：對願意不斷學習的人而言，法律訓練能打開通往多元事業的大門。",

    achievements: [
      "於國際商業律師行完成兩年見習律師培訓",
      "香港律師資格(待認許)",
      "環境管理碩士課程(兼讀，修讀中)",
      "參與氣候相關項目",
    ],
  },
};

export default function CeceWongPage() {
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
          <HeroPortrait initials="CW" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
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
                src="https://www.youtube.com/embed/YLTO3-djUL8"
                title="Cece Wong Interview"
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
          {/* Academic Background and Work Experience */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.backgroundTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.backgroundText}
            </p>
          </section>

          {/* Why She Made the Switch */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.reasonTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.reasonText}
            </p>
          </section>

          {/* Looking Ahead */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t.lookingAheadTitle}
            </h2>
            <div className="w-16 h-1 bg-gray-900 mb-6"></div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.lookingAheadText}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

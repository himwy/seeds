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
            src="/assets/anne/anne-v2.jpg"
            alt="Anne Chong - Team Member"
            fill
            sizes="256px"
            className="object-cover object-top"
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
    title: "Anne Chong",
    subtitle: "A Cross-Cultural Path to Financial Planning",

    videoTitle: "Interview",
    videoDescription: "Hear Anne share her journey in her own words.",

    backgroundTitle: "Academic Background",
    backgroundText:
      "Anne holds an MSc in Neuroscience with Distinction from City University of Hong Kong, where she studied cognitive and behavioural neuroscience, the neural basis of learning and memory, and the neurobiology of disease. She also earned an LLB (Hons) in Law from the University of the West of England, Bristol, and a Bachelor of Laws from Taylor's University in Malaysia. Her unusual pairing of neuroscience and law gives her both a rigorous, evidence-based mindset and a strong grounding in financial regulation.",

    experienceTitle: "Professional Experience",
    experienceText:
      "Before moving into financial planning, Anne built a diverse, cross-sector career. As a reporter at Oriental Daily News in Malaysia, she covered politics, court cases, and parliamentary proceedings, conducting exclusive interviews and learning to distil complex information under deadline. She has also worked as a legal intern preparing court documents and conducting legal research, a research assistant in a CityU neuroscience laboratory, and a science communicator making life-science topics accessible to the public. That range sharpened her research, communication, and people skills, all of which she now brings to her clients.",

    approachTitle: "A Human-Centred Approach",
    approachText:
      "Anne's interest in human behaviour sits at the heart of how she works. Fluent in Mandarin, English, and Cantonese, she is comfortable serving diverse communities across Hong Kong, mainland China, and Malaysia. Her aim is to help people plan proactively and prepare for life's contingencies, turning the idea of 'saving for a rainy day' into thoughtful, actionable plans.",

    achievements: [
      "MSc Neuroscience (Distinction), City University of Hong Kong",
      "LLB (Hons) Law, University of the West of England, Bristol",
      "Fluent in Mandarin, English & Cantonese",
      "Cross-cultural background across Hong Kong, China & Malaysia",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Anne Chong",
    subtitle: "跨越文化的財務策劃之路",

    videoTitle: "專訪",
    videoDescription: "聽 Anne 親述她的故事。",

    backgroundTitle: "學術背景",
    backgroundText:
      "Anne 於香港城市大學取得神經科學碩士學位（優異），主修認知與行為神經科學、學習與記憶的神經基礎，以及疾病神經生物學。她亦於英國西英格蘭大學（布里斯托）取得法律榮譽學士學位，並於馬來西亞泰萊大學完成法律學士課程。神經科學與法律的獨特組合，讓她兼具嚴謹、以實證為本的思維，以及紮實的金融法規基礎。",

    experienceTitle: "專業經驗",
    experienceText:
      "在轉投財務策劃之前，Anne 建立了橫跨多個界別的多元事業。她曾任馬來西亞《東方日報》記者，報導政治、法庭案件及國會議程，進行獨家專訪，並學會在死線壓力下提煉複雜資訊。她亦曾擔任法律實習生，處理法庭文件及法律研究；於城大神經科學實驗室擔任研究助理；並從事科學傳播，讓生命科學知識更貼近大眾。這些經歷磨練了她的研究、溝通及待人能力，如今她將這些能力全數帶到客戶服務之中。",

    approachTitle: "以人為本",
    approachText:
      "對人類行為的興趣，是 Anne 工作方式的核心。她能操流利普通話、英語及廣東話，樂於服務香港、中國內地及馬來西亞的不同社群。她希望協助人們積極規劃、為人生的各種變數做好準備，將「未雨綢繆」化為周全而實際的方案。",

    achievements: [
      "香港城市大學 神經科學碩士（優異）",
      "西英格蘭大學（布里斯托）法律榮譽學士",
      "流利普通話、英語及廣東話",
      "橫跨香港、中國及馬來西亞的跨文化背景",
    ],
  },
};

export default function AnneChongPage() {
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
          <HeroPortrait initials="AC" />
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

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10">
              <iframe
                src="https://www.youtube.com/embed/Dae789IVfLk"
                title="Anne Chong Interview"
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

          {/* A Human-Centred Approach */}
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

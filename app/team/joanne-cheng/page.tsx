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
            src="/assets/joanne/joanne.jpg"
            alt="Joanne Cheng - Team Member"
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
    title: "Joanne Cheng",
    chineseName: "程婧雯",
    subtitle: "A Lawyer's Approach to Wealth Planning",

    videoTitle: "Interview",
    videoDescription: "Hear Joanne share her journey in her own words.",

    backgroundTitle: "A Legal Foundation",
    backgroundText:
      "Joanne earned her Juris Doctor from Temple University's Beasley School of Law in Philadelphia, where she was a Conwell Scholarship recipient and studied international law, corporate law, securities regulation, federal tax law, and constitutional law. She passed the New York State Bar Examination in 2019 and, in the same year, cleared CFA Level I. Her law degree followed a Bachelor of Arts in Economics from the University of California, San Diego, where she graduated with Provost Honors after concentrating on econometrics, monetary economics, antitrust and economic regulation, and law and economics. That pairing of legal training with economics is the backbone of how she reads a financial plan.",

    experienceTitle: "Professional Experience",
    experienceText:
      "Joanne began in the courts, serving as a judicial intern to Judge Ellen Ceisler at the Court of Common Pleas in Philadelphia, where she conducted research on civil and criminal matters and drafted judgments. She then moved into capital markets at ChinaLin Securities (002945.SZ), executing the issuance and underwriting of two ChiNext convertible bonds and a STAR Market IPO listing, before being appointed Secretary to the Chairman, coordinating with the board and securities regulators and helping drive a strategic transformation alongside McKinsey and BCG. She was later a founding member and Chief Marketing Officer at a Shenzhen fintech services company serving securities firms, mutual funds, and banks. Most recently, as Fund Operation Manager at GIL Fund Services in Hong Kong, she worked with external counsel and fund administrators on fund structuring and operations, and she now advises senior management as a consultant covering legal review, fund middle-office operations, and investment analysis.",

    approachTitle: "A Legal Lens on Wealth Planning",
    approachText:
      "Joanne's instinct is to read the fine print, then explain it plainly. A financial plan is, in the end, a set of contracts and structures, and her legal training means she looks at the terms, the regulatory context, and the downside scenarios before she looks at the illustration. Combined with her capital markets and fund experience, that gives clients a clear view of what they are actually buying and why it fits. A native speaker of both Mandarin and English with intermediate Japanese, she works comfortably with clients across Hong Kong and mainland China.",

    achievements: [
      "Juris Doctor, Temple University Beasley School of Law (Conwell Scholar)",
      "New York State Bar Examination, passed 2019",
      "CFA Level I, passed 2019",
      "BA in Economics, University of California, San Diego (Provost Honors)",
      "Equity capital markets and fund operations background",
      "Native Mandarin and English; Intermediate Japanese",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Joanne Cheng",
    chineseName: "程婧雯",
    subtitle: "以法律思維規劃財富",

    videoTitle: "專訪",
    videoDescription: "聽 Joanne 親述她的故事。",

    backgroundTitle: "法律根基",
    backgroundText:
      "Joanne 於美國費城天普大學 Beasley 法學院取得法學博士(Juris Doctor)學位，並獲頒 Conwell 獎學金，修讀國際法、公司法、證券法規、聯邦稅法及憲法。她於 2019 年通過紐約州律師資格考試，同年亦考獲 CFA 一級。入讀法學院之前，她於加州大學聖地牙哥分校取得經濟學文學士學位，以 Provost Honors 榮譽畢業，主修範疇涵蓋計量經濟學、貨幣經濟學、反壟斷與經濟監管，以及法律與經濟學。法律訓練與經濟學底子的結合，正是她閱讀一份財務方案的核心思維。",

    experienceTitle: "專業經驗",
    experienceText:
      "Joanne 的職涯始於法院，她曾於費城初審法院擔任 Ellen Ceisler 法官的司法實習生，負責民事及刑事案件研究並草擬判詞。其後她轉入資本市場，任職中林證券(002945.SZ)，執行兩隻創業板可轉換債券及一宗科創板 IPO 的發行與承銷工作；及後獲委任為董事長秘書，負責與董事會及證券監管機構的協調工作，並與麥肯錫及波士頓顧問公司(BCG)攜手推動策略轉型。她亦曾是一家深圳金融科技服務公司的創始成員及首席市務官，服務對象包括證券公司、基金公司及銀行。近年，她於香港 GIL Fund Services 出任基金營運經理，與外部律師及基金行政管理人共同處理基金架構及營運事宜；現時則以顧問身份為管理層提供法律審閱、基金中台營運及投資分析方面的支援。",

    approachTitle: "以法律視角規劃財富",
    approachText:
      "Joanne 的習慣，是先把細則讀通，再用最淺白的方式講解。一份財務方案說到底就是一組合約與架構；法律訓練讓她在看計劃書之前，先看條款、監管背景及最壞情況。配合她在資本市場及基金領域的經驗，客戶能夠清楚知道自己買的到底是什麼，以及為何適合自己。她的普通話及英語均為母語水平，並具中級日語能力，能自如地服務香港及中國內地的客戶。",

    achievements: [
      "天普大學 Beasley 法學院 法學博士(Conwell 獎學金)",
      "紐約州律師資格考試 2019 年通過",
      "CFA 一級 2019 年通過",
      "加州大學聖地牙哥分校 經濟學文學士(Provost Honors)",
      "股票資本市場及基金營運背景",
      "普通話及英語母語水平；中級日語",
    ],
  },
};

export default function JoanneChengPage() {
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
          <HeroPortrait initials="JC" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
            {t.title}
          </h1>
          <p className="text-xl text-gray-700 mb-2">{t.chineseName}</p>
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
                src="https://www.youtube.com/embed/wTXgAQavIm8"
                title="Joanne Cheng Interview"
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
          {/* A Legal Foundation */}
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

          {/* A Legal Lens on Wealth Planning */}
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

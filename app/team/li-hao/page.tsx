"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaPlay } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Li Hao",
    subtitle: "From the Laboratory to Wealth Planning",
    chineseName: "李浩",

    videoTitle: "Interview",
    videoDescription: "Hear Li Hao share his journey in his own words.",
    videoComingSoon: "Interview video coming soon.",

    backgroundTitle: "Academic Background",
    backgroundText:
      "Li Hao's path to financial planning began in academia. He earned his bachelor's degree at the University of California, Santa Barbara, and his master's at the University of Oxford, before coming to Hong Kong to pursue a PhD in Biomedical Engineering at City University of Hong Kong. Years of rigorous research gave him a disciplined, analytical approach and the persistence to see long-term projects through.",

    transitionTitle: "Reason for Transition",
    transitionText:
      "As Li Hao weighed his long-term options, he grew increasingly conscious of how quickly AI was reshaping technical fields. He wanted a path that rewarded initiative directly, stayed flexible around his doctoral studies, and could become a lasting career in Hong Kong. He found exactly that in wealth planning — a profession that asked for no major upfront investment, imposed no fixed hours, and tied results directly to his own effort.",

    earlyTitle: "Early Momentum",
    earlyText:
      "Li Hao's results came quickly. Within his first six months, he had signed roughly a third of his university cohort as clients and begun building a Center of Influence (COI) network reaching across the mainland and overseas — all while continuing his doctoral research. His ability to balance demanding scientific work with a fast-growing practice reflects the discipline and drive he brings to every client relationship.",

    goalsTitle: "Looking Ahead",
    goalsText:
      "Li Hao plans to keep expanding his COI network across Hong Kong, the mainland, and overseas while completing his PhD, building a practice that pairs analytical rigor with genuine, long-term care for his clients.",

    quote:
      "The best plans, like the best research, reward those who start early and stay disciplined.",

    achievements: [
      "BSc, University of California, Santa Barbara",
      "MSc, University of Oxford",
      "PhD Candidate in Biomedical Engineering, City University of Hong Kong",
      "Building a cross-border Center of Influence (COI) network",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Li Hao",
    subtitle: "從實驗室走進財富策劃",
    chineseName: "李浩",

    videoTitle: "專訪",
    videoDescription: "聽 Li Hao 親述他的故事。",
    videoComingSoon: "專訪影片即將上線。",

    backgroundTitle: "學術背景",
    backgroundText:
      "Li Hao 的財務策劃之路始於學術界。他先後於加州大學聖塔芭芭拉分校取得學士學位，並在牛津大學完成碩士課程，其後來到香港，於香港城市大學攻讀生物醫學工程博士學位。多年嚴謹的研究訓練，培養了他細緻分析的思維，以及貫徹長遠目標的毅力。",

    transitionTitle: "入行的原因",
    transitionText:
      "在思考長遠發展的過程中，Li Hao 越來越意識到人工智能正以驚人的速度重塑各個技術領域。他希望找到一條能直接回報個人努力、又能配合博士學業彈性安排，並能在香港長遠發展的事業。他在財富策劃中找到了答案——這個行業無需大量前期投資，沒有固定工時，成果亦直接取決於他自身的付出。",

    earlyTitle: "初期成績",
    earlyText:
      "Li Hao 的成績來得很快。在入行首六個月內，他已簽下大約三分之一的大學同窗成為客戶，並開始建立一個遍及內地及海外的影響力中心（COI）網絡——而這一切都在他持續進行博士研究的同時完成。他能在繁重的科研工作與快速增長的事業之間取得平衡，正體現了他在每段客戶關係中所投入的紀律與幹勁。",

    goalsTitle: "展望未來",
    goalsText:
      "Li Hao 計劃在完成博士學位的同時，繼續拓展其遍及香港、內地及海外的 COI 網絡，建立一個既具分析嚴謹性、又對客戶長遠真誠關懷的事業。",

    quote: "最好的規劃，如同最好的研究，總是回報那些及早起步、堅持到底的人。",

    achievements: [
      "加州大學聖塔芭芭拉分校 理學士",
      "牛津大學 碩士",
      "香港城市大學 生物醫學工程博士研究生",
      "建立跨境影響力中心（COI）網絡",
    ],
  },
};

export default function LiHaoPage() {
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
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/assets/lihao/lihao.jpg"
              alt="Li Hao - Team Member"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Interview Video */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaPlay className="text-gray-700 mr-3" />
              {t.videoTitle}
            </h2>
            <p className="text-gray-600 mb-6">{t.videoDescription}</p>

            {/* Video Player — drop the final interview file at the path below */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-auto"
                preload="metadata"
                poster="/assets/lihao/interview-poster.jpg"
              >
                <source src="/assets/lihao/interview.mp4" type="video/mp4" />
                {t.videoComingSoon}
              </video>
            </div>
          </div>
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

        {/* Academic Background */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.backgroundTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.backgroundText}
          </p>
        </section>

        {/* Reason for Transition */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.transitionTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.transitionText}
          </p>
        </section>

        {/* Early Momentum */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.earlyTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.earlyText}</p>
        </section>

        {/* Looking Ahead */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.goalsTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.goalsText}</p>
        </section>

        {/* Inspirational Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === "zh-HK" ? "金句" : "Inspirational Quote"}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <blockquote className="text-2xl font-semibold text-gray-800 italic text-center">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </div>
        </section>
      </article>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaArrowLeft,
  FaQuoteLeft,
  FaPlay,
  FaSeedling,
} from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    title: "A Legacy of Trust",
    subtitle: "In Memory of Joshua - A Client Who Inspired a Career of Service",
    backToStories: "Back to Case Studies",
    videoTitle: "A Message from Joshua's Family",
    videoDescription:
      "An inspiring message about the true value of insurance and dedicated financial planning.",

    wendyWords: {
      opening:
        "Some client relationships transcend business and become life-changing experiences. Joshua was one such client whose impact continues to resonate.",

      character:
        "Joshua exemplified extraordinary understanding and grace. When occasional administrative oversights occurred in managing his portfolio, he responded not with frustration, but with gentle guidance. His continued trust and loyalty spoke volumes about his character, and he never dwelt on past matters once resolved.",

      memories:
        "The depth of our professional relationship became evident in his final days. His wife shared that among his last communications was a message addressed to me—a testament to the trust we had built over the years.",

      lesson:
        "This experience taught me a profound truth: never underestimate the impact of dedicated service. As the saying goes, 'To the world you may be one person, but to one person you may be the world.'",

      bibleVerse: {
        intro: "In honour of Joshua's memory, I find meaning in this verse:",
        reference: "John 12:24",
        text: "Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds.",
      },

      closing: "His legacy inspires me to continue planting seeds of trust and service.",

      videoIntro:
        "Joshua's wife graciously shares her perspective on insurance and financial planning, offering an inspiring message for both clients and financial professionals alike.",
    },
  },

  "zh-HK": {
    title: "信任的傳承",
    subtitle: "紀念Joshua - 一位啟發服務精神的客戶",
    backToStories: "返回案例研究",
    videoTitle: "來自Joshua家人的分享",
    videoDescription:
      "關於保險真正價值和專業理財規劃的啟發性分享。",

    wendyWords: {
      opening:
        "有些客戶關係超越了業務本身，成為改變生命的經歷。Joshua正是這樣一位客戶，他的影響至今仍在迴響。",

      character:
        "Joshua展現了非凡的理解力和風度。當處理他的投資組合時偶爾出現行政疏漏，他不是以沮喪回應，而是給予溫和的指導。他持續的信任和忠誠充分說明了他的品格，問題解決後他從不再提起。",

      memories:
        "我們專業關係的深度在他最後的日子裡變得明顯。他的妻子告訴我，在他最後的通訊中有一條是給我的信息——這見證了我們多年來建立的信任。",

      lesson:
        "這段經歷教會了我一個深刻的道理：永遠不要低估專業服務的影響力。正如一句話所說：「對世界而言，你可能只是一個人，但對一個人而言，你可能就是整個世界。」",

      bibleVerse: {
        intro: "為紀念Joshua，我在這段經文中找到意義：",
        reference: "約翰福音12:24",
        text: "我實實在在地告訴你們，一粒麥子不落在地裡死了，仍舊是一粒，若是死了，就結出許多子粒來。",
      },

      closing: "他的傳承激勵我繼續播下信任與服務的種子。",

      videoIntro:
        "Joshua的妻子分享她對保險和理財規劃的看法，為客戶和理財專業人士提供啟發性的信息。",
    },
  },
};

export default function JoshuaTributePage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Clean Professional Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/case-studies/client-stories"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {t.backToStories}
            </Link>

            <div className="text-center">
              <FaHeart className="text-4xl text-gray-700 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Opening Quote */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center border border-gray-200"
          >
            <FaQuoteLeft className="text-4xl text-gray-700 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 leading-relaxed font-serif">
              {t.wendyWords.opening}
            </h2>
          </motion.section>

          {/* Wendy's Story */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200"
          >
            <div className="space-y-6">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t.wendyWords.character}
                </p>
              </div>

              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t.wendyWords.memories}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  {t.wendyWords.lesson}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Bible Verse */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-50 rounded-lg shadow-lg p-8 mb-8 text-center border border-gray-200"
          >
            <FaSeedling className="text-4xl text-gray-700 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-4">
              {t.wendyWords.bibleVerse.intro}
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">
              {t.wendyWords.bibleVerse.reference}
            </h3>
            <blockquote className="text-xl text-gray-600 italic leading-relaxed mb-6 border-l-4 border-gray-400 pl-6">
              &ldquo;{t.wendyWords.bibleVerse.text}&rdquo;
            </blockquote>
            <p className="text-2xl font-bold text-gray-800">
              {t.wendyWords.closing}
            </p>
          </motion.section>

          {/* Video Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t.wendyWords.videoIntro}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center font-serif">
                <FaPlay className="text-gray-700 mr-3" />
                {t.videoTitle}
              </h3>
              <p className="text-gray-600 mb-6">{t.videoDescription}</p>

              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-auto"
                  preload="metadata"
                  poster="/assets/video-poster.jpg"
                >
                  <source
                    src="/assets/Client Claim Sharing.mp4"
                    type="video/mp4"
                  />
                  {language === "en"
                    ? "Your browser does not support the video tag."
                    : "您的瀏覽器不支持視頻標籤。"}
                </video>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

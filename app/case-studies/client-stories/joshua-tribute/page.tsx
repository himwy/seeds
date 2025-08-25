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
    title: "Ms Wendy Lee's Words",
    subtitle: "In Memory of Joshua - A Client Who Changed Everything",
    backToStories: "Back to Case Studies",
    videoTitle: "Joshua's Wife Shares Her Thoughts",
    videoDescription:
      "Hope this can bring a positive message to everyone about insurance and hope all the financial planners will be proud of what they do.",

    wendyWords: {
      opening:
        "My client, Joshua, he changed my life, although he passed away, his legend lasts!",

      character:
        "Joshua is a very reasonable guy. I'm the type of person who does not allow myself to make mistakes, unfortunately, I did come across some mistakes when I handled Joshua's case. However, he just reminded me to be very careful next time. After that, he continued to buy insurance from me and never mentioned it again.",

      memories:
        'I still remember the time he called me before he left Hong Kong; I still remember the time his wife told me that before he left, the only message on his phone was "AIA Wendy".',

      lesson:
        'Never underestimate the effort you bring to the world. "To the world you may be one person, but to one person you may be a world."',

      bibleVerse: {
        intro: "In memory of Joshua, I would like to quote a bible verse.",
        reference: "John 12:24",
        text: "Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds.",
      },

      closing: "I should be one of the seeds.",

      videoIntro:
        "Joshua's wife in the below video will share with us her thoughts on insurance, hope this can bring a positive message to everyone about insurance and hope all the financial planners will be proud of what they do.",
    },
  },

  "zh-HK": {
    title: "Wendy Lee女士的話",
    subtitle: "紀念Joshua - 一位改變一切的客戶",
    backToStories: "返回客戶故事",
    videoTitle: "Joshua的妻子分享她的想法",
    videoDescription:
      "希望這能為每個人帶來關於保險的正面信息，並希望所有理財規劃師都為自己的工作感到自豪。",

    wendyWords: {
      opening:
        "我的客戶Joshua，他改變了我的生活，雖然他已經離世，但他的傳奇永存！",

      character:
        "Joshua是一個非常講道理的人。我是那種不允許自己犯錯的人，不幸的是，在處理Joshua的案件時我確實犯了一些錯誤。然而，他只是提醒我下次要更加小心。之後，他繼續向我購買保險，再也沒有提及此事。",

      memories:
        "我仍然記得他離開香港前給我打電話的時候；我仍然記得他妻子告訴我，在他離開前，他手機上唯一的信息是「友邦保險Wendy」。",

      lesson:
        "永遠不要低估你為世界帶來的努力。「對世界而言，你可能只是一個人，但對一個人而言，你可能就是整個世界。」",

      bibleVerse: {
        intro: "紀念Joshua，我想引用一段聖經經文。",
        reference: "約翰福音12:24",
        text: "我實實在在地告訴你們，一粒麥子不落在地裡死了，仍舊是一粒，若是死了，就結出許多子粒來。",
      },

      closing: "我應該成為其中一粒種子。",

      videoIntro:
        "在下面的視頻中，Joshua的妻子將與我們分享她對保險的看法，希望這能為每個人帶來關於保險的正面信息，並希望所有理財規劃師都為自己的工作感到自豪。",
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

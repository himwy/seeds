"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaBrain,
  FaUserTie,
  FaSmile,
  FaHeart,
  FaBalanceScale,
  FaBook,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Types
interface PhilosophyIcon {
  icon: IconType;
  color: string;
  bgColor: string;
}

interface ValueConfig {
  icon: IconType;
  color: string;
  gradient: string;
}

// Philosophy icons configuration
const philosophyIcons: PhilosophyIcon[] = [
  { icon: FaBrain, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaUserTie, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaUsers, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaSmile, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaHeart, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaBalanceScale, color: "text-gray-700", bgColor: "bg-gray-100" },
  { icon: FaBook, color: "text-gray-700", bgColor: "bg-gray-100" },
];

// Values configuration
const valuesConfig: ValueConfig[] = [
  { icon: FaUsers, color: "gray", gradient: "from-gray-50 to-white" },
  { icon: FaChartLine, color: "gray", gradient: "from-gray-50 to-white" },
  { icon: FaHandshake, color: "gray", gradient: "from-gray-50 to-white" },
];

// Optimized translations object
const translations = {
  en: {
    pageTitle: "About Seeds Financial Group",
    introduction: {
      title: "About Us",
      description1:
        "Seeds Financial Group is a premier wealth and assets management company that partners with leading global financial institutions. We specialize in comprehensive financial planning, risk management strategies, and sophisticated asset allocation solutions designed to preserve and grow our clients' wealth across generations.",
      description2:
        'We believe every individual, regardless of age, carries the potential for financial growth - like a "seed" full of promise. Our mission is to nurture this potential through expert guidance, turning aspirations into lasting financial success.',
    },
    mission: {
      title: "Mission",
      points: [
        "Elevate families from financial uncertainty to sustainable wealth creation and legacy building.",
        "Provide comprehensive wealth management solutions that protect, grow, and transfer assets efficiently.",
        "Empower clients with the knowledge and strategies needed to achieve true financial independence.",
      ],
      quote:
        "Remember, the only we truly start living, when we start doing whatever we can, to help and better other people's lives.",
    },
    values: {
      title: "Value: PPP",
      items: [
        {
          title: "People",
          description:
            "Integrity, self discipline, good working habit, respect difference, professional, pursue lifetime study, care, team player.",
        },
        {
          title: "Performance",
          description:
            "Demand good performance and reward excellence in performance.",
        },
        {
          title: "Partnership",
          description:
            "We are partner in pursuing our common goals and mutual benefit.",
        },
      ],
    },
    philosophy: {
      title: "7 Circle Philosophy",
      description:
        'We spread the "Heart of the Seed" while coaching our young ambitious team. We follow the 7 circle philosophy:',
      circles: [
        {
          title: "Discipline",
          description:
            "Self-discipline is the ability to push yourself forward, stay motivated, and take action, regardless of how you're feeling, physically or emotionally.",
        },
        {
          title: "Professional",
          description:
            "Professionalism requires behaving with dignity and showing respect and courtesy to clients, fellow professionals, and others in business-related activities.",
        },
        {
          title: "Teamplayer",
          description:
            "We share one vision. We are a team. I will assist my colleagues wherever I can, wherever I am needed.",
        },
        {
          title: "Happiness",
          description:
            "Positive thinking affects our performance and in return to increase our satisfaction. Dedicate a little time to helping others.",
        },
        {
          title: "Gratitude",
          description:
            "We take nothing in my life are for granted. We write a thank-you note to expressing our enjoyment and appreciation.",
        },
        {
          title: "Integrity",
          description:
            "Integrity requires honesty and candor in all professional matters. Financial planning professionals are placed in positions of trust by clients.",
        },
        {
          title: "Lifetime Study",
          description:
            "We never stop to learning our whole life and strive to improve and develop new things. We dare to try and are not afraid of failures.",
        },
      ],
    },
  },
  "zh-HK": {
    pageTitle: "關於 Seeds Financial Group",
    introduction: {
      title: "關於我們",
      description1:
        "Seeds Financial Group 與全球最大的金融公司之一合作，憑藉我們團隊的能力和專業知識，我們提供定制的財務諮詢服務，風險管理計劃和資產分配策略，以滿足各行各業客戶實現其財務目標的需求。",
      description2:
        "無論是甚麼年紀的人，只要有熱誠，我們相信他/她是一顆充滿成長希望的種子，我們都會盡力為他們提供機會及悉心栽培，把他們打造成強壯的大樹。",
    },
    mission: {
      title: "使命",
      points: [
        "提升我們服務的每一個家庭，從貧窮到足夠，從足夠到財富，從財富到創造！",
        "喚起風險管理、退休計劃和客户財務自由的意義和重要性。",
        "為有志者提供向上流動的機會。",
      ],
      quote:
        "請記住，只有當我們開始盡我們所能幫助和改善他人的生活時，我們才算真正活出生命的意義。",
    },
    values: {
      title: "信念",
      items: [
        {
          title: "我們要",
          description:
            "誠信、自律、有良好的工作習慣、尊重差異、專業、追求終身學習、關懷、團隊合作",
        },
        {
          title: "表現",
          description: "追求良好的績效和獎勵卓越的績效。",
        },
        {
          title: "合作伙伴",
          description: "我們是追求共同目標和互利的伙伴。",
        },
      ],
    },
    philosophy: {
      title: "理念 — 7 圈子哲學",
      description:
        '在指導雄心勃勃的年輕團隊的同時，我們會傳播一顆"種子之心"給他們。我們遵循 7 點理念：',
      circles: [
        {
          title: "紀律",
          description:
            "自律是一種推動自己前進、保持動力並採取行動的能力，無論你的身體或情緒如何。",
        },
        {
          title: "專業精神",
          description:
            "專業精神要求在業務相關活動中表現得有尊嚴，對客戶、專業同事和其他人表現出尊重和禮貌。",
        },
        {
          title: "團隊精神",
          description:
            "我們有著共同的願景。我們是一個團隊。我會盡我所能，在任何需要我的地方幫助我的同事。",
        },
        {
          title: "快樂",
          description:
            "積極思考會影響我們的表現，並反過來提高我們的滿意度。從長遠來看，花一點時間幫助他人。",
        },
        {
          title: "感恩",
          description:
            "我們認為在我的生活中沒有什麼是理所當然的。我們寫一封感謝信來表達我們的享受和欣賞。",
        },
        {
          title: "正直",
          description:
            "誠信要求在所有專業事務中都誠實和坦率。財務策劃專業人士被置於客戶信任的位置。",
        },
        {
          title: "終身學習",
          description:
            "我們從不停止學習我們的一生，並努力改進和開發新事物。我們敢於嘗試，不怕失敗。",
        },
      ],
    },
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t =
    translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Clean Professional Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
              {t.introduction.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.introduction.description1}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Company Overview */}
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-80">
                <Image
                  src="/assets/About 2.jpg"
                  alt="Seeds Financial Group"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {t.mission.title}
                </h2>
                <div className="space-y-4">
                  {t.mission.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white rounded border-l-4 border-gray-800">
                  <p className="italic text-gray-700">&ldquo;{t.mission.quote}&rdquo;</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {t.values.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.values.items.map((value: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                >
                  <div className="text-center">
                    <div className="mb-4 inline-flex p-3 bg-white rounded-lg shadow-sm">
                      {React.createElement(valuesConfig[index].icon, {
                        className: "text-2xl text-gray-700",
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Philosophy Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {t.philosophy.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t.philosophy.description}
                </p>
              </div>
              <div className="relative h-80">
                <Image
                  src="/assets/About 3.jpg"
                  alt="Seeds Financial Group Philosophy"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Philosophy Principles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {t.philosophy.circles.map((circle: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 text-center"
                >
                  <div className="mb-3 inline-flex p-2 bg-gray-100 rounded-lg">
                    {React.createElement(philosophyIcons[index].icon, {
                      className: `text-xl ${philosophyIcons[index].color}`,
                    })}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">
                    {circle.title}
                  </h3>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {circle.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Company Vision */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-white p-8 rounded-lg border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed italic">
              {t.introduction.description2}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

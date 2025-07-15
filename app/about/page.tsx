"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../components/LanguageContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

// Translations object for all text content
const translations = {
  en: {
    pageTitle: "About Seeds Financial Group",
    introduction: {
      title: "About Us",
      description1:
        "Seeds Financial Group in partnership with one of the world's largest financial groups provides advisory services using a wide range of risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
      description2:
        'No matter what age a person is, as long as he/she has enthusiasm, we believe that he/she is a "seed" full of hope for growth. We will try our best to provide them opportunities and nurture them carefully to turn them into a strong tree.',
    },
    mission: {
      title: "Mission",
      points: [
        "Uplift every family we served, from poverty to enough, from enough to wealth, from wealth to create!",
        "Arouse the sense and importance of risk management, the retirement planning and financial freedom for customer.",
        "Provide upward mobility opportunities for all.",
      ],
      quote:
        "Remember, the only we truly start living, when we start doing whatever we can, to help and better other people's lives.",
    },
    values: {
      title: "Value: PPP",
      people: {
        title: "People",
        description:
          "Integrity, self discipline, good working habit, respect difference, professional, pursue lifetime study, care, team player.",
      },
      performance: {
        title: "Performance",
        description:
          "Demand good performance and reward excellence in performance.",
      },
      partnership: {
        title: "Partnership",
        description:
          "We are partner in pursuing our common goals and mutual benefit.",
      },
    },
    philosophy: {
      title: "7 Circle Philosophy",
      description:
        'We spread the "Heart of the Seed" while coaching our young ambitious team. We follow the 7 circle philosophy:',
      circles: [
        {
          title: "Discipline",
          description:
            "Self-discipline is the ability to push yourself forward, stay motivated, and take action, regardless of how you're feeling, physically or emotionally. You're showing it when you intentionally choose to pursue something better for yourself, and you do it in spite of factors such as distractions, hard work, or unfavorable odds.",
        },
        {
          title: "Professional",
          description:
            "Professionalism requires behaving with dignity and showing respect and courtesy to clients, fellow professionals, and others in business-related activities, and complying with appropriate rules, regulations, and professional requirements.",
        },
        {
          title: "Teamplayer",
          description:
            "We share one vision. We are a team. I will assist my colleagues wherever I can, wherever I am needed.",
        },
        {
          title: "Happiness",
          description:
            "Positive thinking affects our performance and in return to increase our satisfaction. Dedicate a little time to helping others to increase their overall happiness in the long term.",
        },
        {
          title: "Gratitude",
          description:
            "We take nothing in my life are for granted. We write a thank-you note to expressing our enjoyment and appreciation of that person's impact on our life.",
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
      people: {
        title: "我們要",
        description:
          "誠信、自律、有良好的工作習慣、尊重差異、專業、追求終身學習、關懷、團隊合作",
      },
      performance: {
        title: "表現",
        description: "追求良好的績效和獎勵卓越的績效。",
      },
      partnership: {
        title: "合作伙伴",
        description: "我們是追求共同目標和互利的伙伴。",
      },
    },
    philosophy: {
      title: "理念 — 7 圈子哲學",
      description:
        '在指導雄心勃勃的年輕團隊的同時，我們會傳播一顆"種子之心"給他們。我們遵循 7 點理念：',
      circles: [
        {
          title: "紀律",
          description:
            "自律是一種推動自己前進、保持動力並採取行動的能力，無論你的身體或情緒如何。當你主動選擇為自己追求更好的東西時，你就會表現出來，而且你會不顧使你分心的事、困難或不利的可能性等因素去做。",
        },
        {
          title: "專業精神",
          description:
            "專業精神要求在業務相關活動中表現得有尊嚴，對客戶、專業同事和其他人表現出尊重和禮貌，並遵守適當的規則、法規和專業要求。",
        },
        {
          title: "團隊精神",
          description:
            "我們有著共同的願景。我們是一個團隊。我會盡我所能，在任何需要我的地方幫助我的同事。",
        },
        {
          title: "快樂",
          description:
            "積極思考會影響我們的表現，並反過來提高我們的滿意度。從長遠來看，花一點時間幫助他人提高整體幸福感。",
        },
        {
          title: "感恩",
          description:
            "我們認為在我的生活中沒有什麼是理所當然的。我們寫一封感謝信來對那個人表達我們享受和欣賞對他我們生命的影響。",
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
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(true);

  // Detect if the user is on a mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Philosophy icons for the circles
  const philosophyIcons = [
    <FaBrain key="discipline" className="text-5xl text-purple-600" />,
    <FaUserTie key="professional" className="text-5xl text-blue-600" />,
    <FaUsers key="teamplayer" className="text-5xl text-green-600" />,
    <FaSmile key="happiness" className="text-5xl text-yellow-500" />,
    <FaHeart key="gratitude" className="text-5xl text-red-500" />,
    <FaBalanceScale key="integrity" className="text-5xl text-indigo-600" />,
    <FaBook key="lifetimestudy" className="text-5xl text-teal-600" />,
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden min-w-full">
        {/* Mobile Introduction Section */}
        <section className="pt-20 pb-8 px-5 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              {t.introduction.title}
            </h2>
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <p className="text-dark-gray mb-4 text-sm leading-relaxed">
                {t.introduction.description1}
              </p>
              <p className="text-dark-gray text-sm leading-relaxed">
                {t.introduction.description2}
              </p>
            </div>
          </motion.div>

          {/* Mobile Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              {t.mission.title}
            </h2>
            <div className="space-y-4">
              {t.mission.points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <p className="text-dark-gray text-sm pt-1">{point}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-primary">
              <p className="italic text-dark-gray text-sm">{t.mission.quote}</p>
            </div>
          </motion.div>

          {/* Mobile Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              {t.values.title}
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-400">
                <h3 className="font-semibold text-primary text-center mb-2">
                  {t.values.people.title}
                </h3>
                <p className="text-dark-gray text-sm text-center">
                  {t.values.people.description}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-green-400">
                <h3 className="font-semibold text-primary text-center mb-2">
                  {t.values.performance.title}
                </h3>
                <p className="text-dark-gray text-sm text-center">
                  {t.values.performance.description}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-purple-400">
                <h3 className="font-semibold text-primary text-center mb-2">
                  {t.values.partnership.title}
                </h3>
                <p className="text-dark-gray text-sm text-center">
                  {t.values.partnership.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
              {t.philosophy.title}
            </h2>
            <p className="text-dark-gray mb-6 text-sm text-center">
              {t.philosophy.description}
            </p>

            <div className="space-y-4">
              {t.philosophy.circles.map((circle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-3 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                      {React.cloneElement(philosophyIcons[index], {
                        className: "text-2xl",
                      })}
                    </div>
                    <h3 className="font-semibold text-primary">
                      {circle.title}
                    </h3>
                  </div>
                  <p className="text-dark-gray text-sm">{circle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full overflow-x-hidden">
      {/* Introduction Section - With company icon */}
      <section className="py-16 mt-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex justify-center mb-8">
                <Image
                  src="/assets/Seeds_Icon_Trans.png"
                  alt="Seeds Financial Group"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-primary text-center">
                {t.introduction.title}
              </h2>
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <p className="text-dark-gray mb-4 text-lg">
                  {t.introduction.description1}
                </p>
                <p className="text-dark-gray text-lg">
                  {t.introduction.description2}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced design */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-primary text-center">
                {t.mission.title}
              </h2>

              <div className="grid gap-6">
                {t.mission.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="text-dark-gray text-lg">{point}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-100 p-6 mt-8 rounded-lg shadow-sm text-center border-l-4 border-primary"
              >
                <p className="italic text-lg text-dark-gray">
                  {t.mission.quote}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-primary text-center flex items-center justify-center">
                <FaHandshake className="mr-3 text-blue-500" /> {t.values.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border-t-4 border-blue-400"
                >
                  <div className="mb-4 w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-3xl text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-primary text-xl mb-4 text-center">
                    {t.values.people.title}
                  </h3>
                  <p className="text-dark-gray text-center">
                    {t.values.people.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-sm border-t-4 border-green-400"
                >
                  <div className="mb-4 w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <FaChartLine className="text-3xl text-green-500" />
                  </div>
                  <h3 className="font-semibold text-primary text-xl mb-4 text-center">
                    {t.values.performance.title}
                  </h3>
                  <p className="text-dark-gray text-center">
                    {t.values.performance.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-sm border-t-4 border-purple-400"
                >
                  <div className="mb-4 w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <FaHandshake className="text-3xl text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-primary text-xl mb-4 text-center">
                    {t.values.partnership.title}
                  </h3>
                  <p className="text-dark-gray text-center">
                    {t.values.partnership.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-primary text-center flex items-center justify-center">
                <FaBrain className="mr-3 text-indigo-500" />{" "}
                {t.philosophy.title}
              </h2>
              <p className="text-dark-gray mb-12 text-center max-w-3xl mx-auto text-lg">
                {t.philosophy.description}
              </p>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {t.philosophy.circles.map((circle, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-white shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {philosophyIcons[index]}
                      </div>
                      <h3 className="font-semibold text-primary text-xl mb-2">
                        {circle.title}
                      </h3>
                      <div className="h-1 w-12 rounded-full bg-primary/30 group-hover:w-20 transition-all duration-300"></div>
                    </div>
                    <p className="text-dark-gray text-center">
                      {circle.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

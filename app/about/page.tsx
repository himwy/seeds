"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "../components/LanguageContext";
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

interface MissionCardProps {
  point: string;
  index: number;
}

interface ValueItem {
  title: string;
  description: string;
}

interface ValueCardProps {
  value: ValueItem;
  index: number;
  config: ValueConfig;
}

interface PhilosophyCircle {
  title: string;
  description: string;
}

interface PhilosophyCardProps {
  circle: PhilosophyCircle;
  index: number;
  config: PhilosophyIcon;
}

// Philosophy icons configuration
const philosophyIcons: PhilosophyIcon[] = [
  { icon: FaBrain, color: "text-purple-600", bgColor: "bg-purple-100" },
  { icon: FaUserTie, color: "text-blue-600", bgColor: "bg-blue-100" },
  { icon: FaUsers, color: "text-green-600", bgColor: "bg-green-100" },
  { icon: FaSmile, color: "text-yellow-500", bgColor: "bg-yellow-100" },
  { icon: FaHeart, color: "text-red-500", bgColor: "bg-red-100" },
  { icon: FaBalanceScale, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  { icon: FaBook, color: "text-teal-600", bgColor: "bg-teal-100" },
];

// Values configuration
const valuesConfig: ValueConfig[] = [
  { icon: FaUsers, color: "blue", gradient: "from-blue-50 to-white" },
  { icon: FaChartLine, color: "green", gradient: "from-green-50 to-white" },
  { icon: FaHandshake, color: "purple", gradient: "from-purple-50 to-white" },
];

// Optimized translations object
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

// Reusable components
const MissionCard: React.FC<MissionCardProps> = ({ point, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold">{index + 1}</span>
        </div>
      </div>
      <p className="text-dark-gray text-lg pt-1">{point}</p>
    </div>
  </motion.div>
);

const ValueCard: React.FC<ValueCardProps> = ({ value, index, config }) => {
  const IconComponent = config.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -30 : index === 1 ? 0 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br ${config.gradient} p-6 rounded-xl shadow-sm border-t-4 border-${config.color}-400`}
    >
      <div
        className={`mb-4 w-16 h-16 mx-auto bg-${config.color}-100 rounded-full flex items-center justify-center`}
      >
        <IconComponent className={`text-3xl text-${config.color}-500`} />
      </div>
      <h3 className="font-semibold text-primary text-xl mb-4 text-center">
        {value.title}
      </h3>
      <p className="text-dark-gray text-center">{value.description}</p>
    </motion.div>
  );
};

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  circle,
  index,
  config,
}) => {
  const IconComponent = config.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex flex-col items-center mb-4">
        <div
          className={`w-20 h-20 rounded-full ${config.bgColor} shadow-inner flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          <IconComponent className={`text-5xl ${config.color}`} />
        </div>
        <h3 className="font-semibold text-primary text-xl mb-2">
          {circle.title}
        </h3>
        <div className="h-1 w-12 rounded-full bg-primary/30 group-hover:w-20 transition-all duration-300"></div>
      </div>
      <p className="text-dark-gray text-center">{circle.description}</p>
    </motion.div>
  );
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Memoized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        },
      },
    }),
    []
  );

  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden">
        <section className="pt-20 pb-8 px-5 bg-white">
          {/* Mobile Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group Logo"
                width={80}
                height={80}
              />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-primary text-center">
              {t.introduction.title}
            </h1>
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <p className="text-dark-gray mb-4 text-sm leading-relaxed">
                {t.introduction.description1}
              </p>
              <p className="text-dark-gray text-sm leading-relaxed">
                {t.introduction.description2}
              </p>
            </div>
          </motion.div>

          {/* Mobile Mission */}
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
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
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
                </div>
              ))}
            </div>
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-primary">
              <p className="italic text-dark-gray text-sm">{t.mission.quote}</p>
            </div>
          </motion.div>

          {/* Mobile Values */}
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
              {t.values.items.map((value, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-lg shadow-sm border-t-4 border-${valuesConfig[index].color}-400`}
                >
                  <h3 className="font-semibold text-primary text-center mb-2">
                    {value.title}
                  </h3>
                  <p className="text-dark-gray text-sm text-center">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Philosophy */}
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
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`mr-3 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${philosophyIcons[index].bgColor}`}
                    >
                      {React.createElement(philosophyIcons[index].icon, {
                        className: `text-2xl ${philosophyIcons[index].color}`,
                      })}
                    </div>
                    <h3 className="font-semibold text-primary">
                      {circle.title}
                    </h3>
                  </div>
                  <p className="text-dark-gray text-sm">{circle.description}</p>
                </div>
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
      {/* Introduction Section */}
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
                  alt="Seeds Financial Group Logo"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-3xl font-bold mb-6 text-primary text-center">
                {t.introduction.title}
              </h1>
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

      {/* Mission Section */}
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
                  <MissionCard key={index} point={point} index={index} />
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
                {t.values.items.map((value, index) => (
                  <ValueCard
                    key={index}
                    value={value}
                    index={index}
                    config={valuesConfig[index]}
                  />
                ))}
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
                <FaBrain className="mr-3 text-indigo-500" />
                {t.philosophy.title}
              </h2>
              <p className="text-dark-gray mb-12 text-center max-w-3xl mx-auto text-lg">
                {t.philosophy.description}
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {t.philosophy.circles.map((circle, index) => (
                  <PhilosophyCard
                    key={index}
                    circle={circle}
                    index={index}
                    config={philosophyIcons[index]}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

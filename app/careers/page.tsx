"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaPlay,
  FaUserTie,
  FaLightbulb,
  FaRegHandshake,
  FaGraduationCap,
  FaUserFriends,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

// Types
interface JobPosition {
  id: string;
  title: string;
  chineseTitle: string;
  subtitle: string;
  description: string[];
  ctaText: string;
}

interface ReasonCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Define specific types for translations
interface Reason {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface VideoSectionType {
  title: string;
  internTitle: string;
  description: string;
  watchNowButton: string;
  teamStory1Title: string;
  teamStory1Description: string;
  teamStory2Title: string;
  teamStory2Description: string;
  companyCultureTitle: string;
  companyCultureDescription: string;
}

interface WorkplaceCultureType {
  title: string;
  description: string;
}

interface JobOpeningsType {
  title: string;
  viewDetails: string;
  readMore: string;
  showLess: string;
  positions: JobPosition[];
}

interface CTASectionType {
  title: string;
  subtitle: string;
  buttonText: string;
}

interface WealthManagementType {
  title: string;
  description: string;
  reasons: Reason[];
}

interface TranslationType {
  pageTitle: string;
  pageSubtitle: string;
  viewPositionsButton: string;
  isWealthManagementForYou: WealthManagementType;
  workplaceCulture: WorkplaceCultureType;
  videoSection: VideoSectionType;
  jobOpenings: JobOpeningsType;
  ctaSection: CTASectionType;
}

interface TranslationsType {
  en: TranslationType;
  "zh-HK": TranslationType;
}

// Translations
const translations: TranslationsType = {
  en: {
    pageTitle: "Careers",
    pageSubtitle:
      "Join our dynamic team and build a rewarding career in wealth management",
    viewPositionsButton: "View Open Positions",

    isWealthManagementForYou: {
      title: "Is Wealth Management For You?",
      description:
        "Before anything else, it's important to understand that Wealth Management is a specialized investment-advisory that offers advice and financial services to high-net-worth-individuals (HNWI), small business owners and families, making it one of most popular and distinctive fields within the financial sector. So here's 7 reasons that make wealth management an exciting career and why you should pursue it.",
      reasons: [
        {
          id: "high-earning",
          title: "High Earning Potential",
          description:
            "Wealth managers often earn substantial income through fees, commissions, and bonuses based on client assets and performance.",
        },
        {
          id: "client-relationships",
          title: "Meaningful Client Relationships",
          description:
            "You'll build long-term relationships with clients, helping them achieve their financial goals and secure their future.",
        },
        {
          id: "skill-development",
          title: "Diverse Skill Development",
          description:
            "Gain expertise in various financial areas including investments, tax planning, estate planning, and retirement strategies.",
        },
        {
          id: "intellectual-challenge",
          title: "Intellectual Challenge",
          description:
            "Stay engaged with complex financial problems, market analysis, and evolving investment strategies.",
        },
        {
          id: "work-life",
          title: "Work-Life Balance",
          description:
            "After establishing your client base, enjoy flexibility in scheduling client meetings and managing your workload.",
        },
        {
          id: "career-longevity",
          title: "Career Longevity",
          description:
            "Wealth management offers stability and growth potential throughout your career as clients' needs evolve.",
        },
        {
          id: "make-difference",
          title: "Make a Difference",
          description:
            "Help clients achieve important life goals like retirement security, education funding, and legacy planning.",
        },
      ],
    },

    workplaceCulture: {
      title: "Our Workplace Culture",
      description:
        "Discover our dynamic work environment and see what makes Seeds Financial Group a great place to build your career.",
    },

    videoSection: {
      title: "Hear from our team",
      internTitle: "Intern Sharing",
      description:
        "Hear directly from our interns about their experience working at Seeds Financial Group.",
      watchNowButton: "Watch Now",
      teamStory1Title: "Team Member Story #1",
      teamStory1Description:
        "Learn about our senior advisor's journey and experience at Seeds Financial Group.",
      teamStory2Title: "Team Member Story #2",
      teamStory2Description:
        "Discover how our wealth managers build lasting relationships with clients.",
      companyCultureTitle: "Company Culture",
      companyCultureDescription:
        "Get an inside look at our collaborative work environment and values.",
    },

    jobOpenings: {
      title: "See our job openings",
      viewDetails: "View details",
      readMore: "Read more",
      showLess: "Show less",
      positions: [
        {
          id: "wealth-manager",
          title: "Wealth Management Manager",
          chineseTitle:
            "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "Full-time position for ambitious professionals",
          description: [
            "With wealth management continuing to be a fast-growing industry in Hong Kong and China, we are looking for an ambitious individual to be part of our dynamic team.",
            "In this role, you will oversee and guide client asset management, crafting and implementing tailored investment strategies that ensure sustainable long-term growth.",
            "We provide comprehensive and continuous training to ensure you grasp the skill and knowledge.",
            "We are always happy to work with smart people who are ambitious and passionate.",
          ],
          ctaText: "Apply Now",
        },
        {
          id: "wealth-intern",
          title: "Wealth Management Intern",
          chineseTitle:
            "見習財務策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "Internship opportunity for finance enthusiasts",
          description: [
            "Are you passionate about finance and eager to kickstart your career in wealth management? We're looking for motivated and talented interns to join our dynamic team.",
            "As a Wealth Management Intern, you'll gain hands-on experience in financial analysis, asset allocation, and client advisory services. You'll work closely with seasoned professionals, learning the ins and outs of portfolio management, risk assessment, and strategic planning. This is an excellent opportunity to develop your skills, grow your network, and make a meaningful impact on our clients' financial futures.",
          ],
          ctaText: "Apply Now",
        },
        {
          id: "wealth-director",
          title: "Wealth Management Director",
          chineseTitle: "財富策劃總監 (歡迎應屆畢業生/TTPS/IANG)",
          subtitle: "Leadership role for experienced professionals",
          description: [
            "Seed Financial Group is seeking an accomplished and visionary Wealth Management Director to lead our team and drive the growth of our financial solutions across the Asia-Pacific region. With over a decade of experience serving the diverse needs of our clients, we are looking for a dynamic leader to take our wealth management division to new heights.",
            "As the Wealth Management Director, you will oversee high-net-worth client portfolios, develop strategic business initiatives, and mentor a team of talented professionals. Collaborating closely with senior leadership, you will play a key role in shaping the future of our services, expanding our market presence, and delivering exceptional results. This is an opportunity to leverage your expertise, lead with impact, and make a lasting difference in the financial well-being of our clients.",
          ],
          ctaText: "Apply Now",
        },
      ],
    },

    ctaSection: {
      title: "Ready to join our team?",
      subtitle:
        "Take the first step towards a rewarding career in wealth management",
      buttonText: "Apply Now",
    },
  },
  "zh-HK": {
    pageTitle: "職業發展",
    pageSubtitle: "加入我們充滿活力的團隊，在財富管理領域建立成功的職業生涯",
    viewPositionsButton: "查看職位空缺",

    isWealthManagementForYou: {
      title: "財富管理適合您嗎？",
      description:
        "首先，重要的是要了解財富管理是一種專業的投資諮詢服務，為高淨值個人（HNWI）、小型企業主和家庭提供建議和金融服務，使其成為金融領域中最受歡迎和最具特色的領域之一。以下是讓財富管理成為令人興奮職業的7個理由，以及為什麼您應該選擇這個職業。",
      reasons: [
        {
          id: "high-earning",
          title: "高收入潛力",
          description:
            "財富管理經理通常通過基於客戶資產和業績的費用、佣金和獎金獲得可觀的收入。",
        },
        {
          id: "client-relationships",
          title: "有意義的客戶關係",
          description:
            "您將與客戶建立長期關係，幫助他們實現財務目標並確保未來安全。",
        },
        {
          id: "skill-development",
          title: "多樣化技能發展",
          description:
            "在投資、稅務規劃、遺產規劃和退休策略等各個金融領域獲取專業知識。",
        },
        {
          id: "intellectual-challenge",
          title: "智力挑戰",
          description:
            "保持對複雜金融問題、市場分析和不斷發展的投資策略的參與。",
        },
        {
          id: "work-life",
          title: "工作與生活平衡",
          description:
            "建立客戶基礎後，在安排客戶會議和管理工作量方面享有靈活性。",
        },
        {
          id: "career-longevity",
          title: "職業長壽",
          description:
            "隨著客戶需求的變化，財富管理在整個職業生涯中提供穩定性和增長潛力。",
        },
        {
          id: "make-difference",
          title: "產生影響",
          description:
            "幫助客戶實現重要的生活目標，如退休保障、教育資金和遺產規劃。",
        },
      ],
    },

    workplaceCulture: {
      title: "我們的工作場所文化",
      description:
        "了解我們充滿活力的工作環境，看看是什麼讓Seeds Financial Group成為建立職業生涯的絕佳場所。",
    },

    videoSection: {
      title: "聽聽我們團隊的分享",
      internTitle: "實習生分享",
      description:
        "直接聆聽我們的實習生分享他們在Seeds Financial Group工作的經驗。",
      watchNowButton: "立即觀看",
      teamStory1Title: "團隊成員故事 #1",
      teamStory1Description:
        "了解我們資深顧問在Seeds Financial Group的成長歷程和經驗。",
      teamStory2Title: "團隊成員故事 #2",
      teamStory2Description: "探索我們的財富管理師如何與客戶建立持久的關係。",
      companyCultureTitle: "公司文化",
      companyCultureDescription: "深入了解我們協作的工作環境和價值觀。",
    },

    jobOpenings: {
      title: "查看我們的職位空缺",
      viewDetails: "查看詳情",
      readMore: "閱讀更多",
      showLess: "收起",
      positions: [
        {
          id: "wealth-manager",
          title: "財富管理經理",
          chineseTitle:
            "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "適合有抱負的專業人士的全職職位",
          description: [
            "隨著財富管理在香港和中國繼續成為快速增長的行業，我們正在尋找一位有抱負的個人加入我們充滿活力的團隊。",
            "在這個職位上，您將監督和指導客戶資產管理，制定和實施量身定制的投資策略，確保可持續的長期增長。",
            "我們提供全面和持續的培訓，確保您掌握所需的技能和知識。",
            "我們始終樂於與聰明、有抱負和充滿熱情的人合作。",
          ],
          ctaText: "立即申請",
        },
        {
          id: "wealth-intern",
          title: "財富管理實習生",
          chineseTitle:
            "見習財務策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "為金融愛好者提供的實習機會",
          description: [
            "您對金融充滿熱情並渴望開始財富管理職業生涯嗎？我們正在尋找積極進取、才華橫溢的實習生加入我們充滿活力的團隊。",
            "作為財富管理實習生，您將在財務分析、資產配置和客戶諮詢服務方面獲得實踐經驗。您將與經驗豐富的專業人士密切合作，學習投資組合管理、風險評估和戰略規劃的來龍去脈。這是發展技能、擴大人脈並對客戶財務未來產生有意義影響的絕佳機會。",
          ],
          ctaText: "立即申請",
        },
        {
          id: "wealth-director",
          title: "財富管理總監",
          chineseTitle: "財富策劃總監 (歡迎應屆畢業生/TTPS/IANG)",
          subtitle: "適合經驗豐富專業人士的領導職位",
          description: [
            "Seeds Financial Group正在尋找一位成就斐然、具有遠見卓識的財富管理總監，領導我們的團隊並推動我們的金融解決方案在亞太地區的增長。憑藉超過十年為客戶多樣化需求服務的經驗，我們正在尋找一位充滿活力的領導者，將我們的財富管理部門提升到新的高度。",
            "作為財富管理總監，您將監督高淨值客戶投資組合，制定戰略業務計劃，並指導一支才華橫溢的專業團隊。通過與高級領導層密切合作，您將在塑造我們服務的未來、擴大市場份額和提供卓越成果方面發揮關鍵作用。這是一個發揮您的專業知識、有影響力地領導並對客戶的財務福祉產生持久影響的機會。",
          ],
          ctaText: "立即申請",
        },
      ],
    },

    ctaSection: {
      title: "準備好加入我們的團隊了嗎？",
      subtitle: "邁出第一步，開始充實的財富管理職業生涯",
      buttonText: "立即申請",
    },
  },
};

// Components
const HeroSection = ({ t }: { t: TranslationType }) => (
  <div
    className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden bg-black"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/Recruitment.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center 20%",
    }}
  >
    <div className="container mx-auto px-6 text-center py-12 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
        >
          {t.pageTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white mb-8"
        >
          {t.pageSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="#openings">
            <span className="btn-primary inline-block text-center">
              {t.viewPositionsButton}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
);

// TalentSection has been removed as requested

const FunVideoSection = ({ t }: { t: TranslationType }) => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.workplaceCulture.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.workplaceCulture.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/assets/Seeds_Icon_Trans.png"
            >
              <source src="/assets/Fun.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ReasonCard = ({ reason, index }: { reason: Reason; index: number }) => {
  const icons = [
    <FaChartLine key="chart" className="text-teal-600" size={24} />,
    <FaRegHandshake key="handshake" className="text-teal-600" size={24} />,
    <FaGraduationCap key="education" className="text-teal-600" size={24} />,
    <FaLightbulb key="lightbulb" className="text-teal-600" size={24} />,
    <FaUserFriends key="users" className="text-teal-600" size={24} />,
    <FaUserTie key="user" className="text-teal-600" size={24} />,
    <FaChartLine key="chart2" className="text-teal-600" size={24} />,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-teal-100"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="p-2 md:p-3 bg-teal-50 rounded-lg md:rounded-xl shrink-0">
          {icons[index]}
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">
            {reason.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            {reason.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WealthManagementSection = ({ t }: { t: TranslationType }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
          {t.isWealthManagementForYou.title}
        </h2>
        <p className="text-base md:text-lg text-gray-600">
          {t.isWealthManagementForYou.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {t.isWealthManagementForYou.reasons.map((reason, index) => (
          <ReasonCard
            key={reason.id}
            reason={{ ...reason, icon: null }}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);

const VideoSection = ({ t }: { t: TranslationType }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    {
      id: "intern",
      title: t.videoSection.internTitle,
      description: t.videoSection.description,
      thumbnail: "Intern Video Thumbnail",
    },
    {
      id: "team-1",
      title: t.videoSection.teamStory1Title,
      description: t.videoSection.teamStory1Description,
      thumbnail: "Team Video Thumbnail #1",
    },
    {
      id: "team-2",
      title: t.videoSection.teamStory2Title,
      description: t.videoSection.teamStory2Description,
      thumbnail: "Team Video Thumbnail #2",
    },
    {
      id: "company-culture",
      title: t.videoSection.companyCultureTitle,
      description: t.videoSection.companyCultureDescription,
      thumbnail: "Culture Video Thumbnail",
    },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="py-12 md:py-24 bg-teal-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            {t.videoSection.title}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative">
          {/* Left arrow for desktop */}
          <button
            onClick={prevVideo}
            className="hidden md:flex absolute left-[-100px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <FaArrowRight
              className="rotate-180 text-gray-700 hover:text-teal-600"
              size={20}
            />
          </button>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <motion.h3
              key={`title-${currentVideoIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-bold text-teal-600 mb-3 md:mb-4"
            >
              {videos[currentVideoIndex].title}
            </motion.h3>
            <motion.p
              key={`desc-${currentVideoIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 mb-4 md:mb-6"
            >
              {videos[currentVideoIndex].description}
            </motion.p>
            <a
              href="#video"
              className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              {t.videoSection.watchNowButton} <FaArrowRight className="ml-2" />
            </a>

            {/* Video indicators */}
            <div className="flex gap-2 mt-6">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentVideoIndex ? "bg-teal-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Mobile arrows below indicators */}
            <div className="flex md:hidden gap-4 mt-4 justify-center">
              <button
                onClick={prevVideo}
                className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border"
              >
                <FaArrowRight
                  className="rotate-180 text-gray-700 hover:text-teal-600"
                  size={18}
                />
              </button>
              <button
                onClick={nextVideo}
                className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border group"
              >
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <FaArrowRight
                    className="text-gray-700 group-hover:text-teal-600"
                    size={18}
                  />
                </motion.div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              {/* Video thumbnail placeholder */}
              <motion.div
                key={`video-${currentVideoIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gray-800 flex items-center justify-center"
              >
                <span className="text-white text-sm">
                  {videos[currentVideoIndex].thumbnail}
                </span>
              </motion.div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-600/90 text-white flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors">
                  <FaPlay className="ml-1" size={20} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right arrow for desktop */}
          <button
            onClick={nextVideo}
            className="hidden md:flex absolute right-[-100px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10 group"
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <FaArrowRight
                className="text-gray-700 group-hover:text-teal-600"
                size={20}
              />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

const JobCard = ({
  job,
  language,
  t,
}: {
  job: JobPosition;
  language: string;
  t: TranslationType;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-teal-100"
    >
      <div className="p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-teal-600 mb-1">
          {language === "zh-HK" ? job.chineseTitle : job.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
          {job.subtitle}
        </p>

        <div
          className={`space-y-3 transition-all duration-300 ${
            isExpanded ? "max-h-full" : "max-h-24 md:max-h-28 overflow-hidden"
          }`}
        >
          {job.description.map((paragraph, idx) => (
            <p key={idx} className="text-sm md:text-base text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        {job.description.length > 1 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-teal-600 font-medium mt-3 md:mt-4 text-sm md:text-base hover:underline"
          >
            {isExpanded ? t.jobOpenings.showLess : t.jobOpenings.readMore}
          </button>
        )}

        <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3 md:gap-4">
          <a
            href="#apply"
            className="inline-block text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-base font-semibold transition-all duration-300 shadow-sm hover:transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--primary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary)";
            }}
          >
            {job.ctaText}
          </a>
          <a
            href={`#job-details-${job.id}`}
            className="inline-block text-teal-600 text-sm md:text-base hover:underline"
          >
            {t.jobOpenings.viewDetails}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const JobOpeningsSection = ({
  t,
  language,
}: {
  t: TranslationType;
  language: string;
}) => (
  <section id="openings" className="py-12 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
          {t.jobOpenings.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {t.jobOpenings.positions.map((job: JobPosition) => (
          <JobCard key={job.id} job={job} language={language} t={t} />
        ))}
      </div>
    </div>
  </section>
);

export default function CareersPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    {
      id: "intern",
      title: t.videoSection.internTitle,
      description: t.videoSection.description,
      thumbnail: "Intern Video Thumbnail",
    },
    {
      id: "team-1",
      title: t.videoSection.teamStory1Title,
      description: t.videoSection.teamStory1Description,
      thumbnail: "Team Video Thumbnail #1",
    },
    {
      id: "team-2",
      title: t.videoSection.teamStory2Title,
      description: t.videoSection.teamStory2Description,
      thumbnail: "Team Video Thumbnail #2",
    },
    {
      id: "company-culture",
      title: t.videoSection.companyCultureTitle,
      description: t.videoSection.companyCultureDescription,
      thumbnail: "Culture Video Thumbnail",
    },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden">
        {/* Mobile Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center text-white pt-16 w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/Recruitment.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-lg mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold mb-6 text-white leading-tight"
                style={{ color: "white" }}
              >
                {t.pageTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg mb-8 text-white leading-relaxed"
                style={{ color: "white" }}
              >
                {t.pageSubtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center"
              >
                <Link href="#openings">
                  <span className="bg-white text-gray-900 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg inline-block">
                    {t.viewPositionsButton}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mobile Wealth Management Section */}
        <section className="py-12 px-6 bg-white w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t.isWealthManagementForYou.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
              {t.isWealthManagementForYou.description}
            </p>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            {t.isWealthManagementForYou.reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-xl shrink-0">
                    <FaChartLine className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mobile Fun Video Section */}
        <section className="py-12 px-6 bg-gray-50 w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t.workplaceCulture.title}
            </h2>
            <p className="text-base text-gray-600 max-w-md mx-auto">
              {t.workplaceCulture.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/assets/Seeds_Icon_Trans.png"
              >
                <source src="/assets/Fun.MP4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </section>

        {/* Mobile Video Section */}
        <section className="py-12 px-6 bg-teal-50 w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t.videoSection.title}
            </h2>
          </div>

          <div className="space-y-8 max-w-lg mx-auto">
            {/* Mobile Video Player */}
            <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <motion.div
                key={`mobile-video-${currentVideoIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gray-800 flex items-center justify-center"
              >
                <span className="text-white text-sm">
                  {videos[currentVideoIndex]?.thumbnail}
                </span>
              </motion.div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors">
                  <FaPlay className="ml-1" size={18} />
                </div>
              </div>
            </div>

            {/* Mobile Video Info */}
            <div className="text-center">
              <motion.h3
                key={`mobile-title-${currentVideoIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-teal-600 mb-3"
              >
                {videos[currentVideoIndex]?.title}
              </motion.h3>
              <motion.p
                key={`mobile-desc-${currentVideoIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base text-gray-600 mb-6 leading-relaxed"
              >
                {videos[currentVideoIndex]?.description}
              </motion.p>

              {/* Mobile Video indicators */}
              <div className="flex gap-2 justify-center mb-6">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentVideoIndex
                        ? "bg-teal-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={prevVideo}
                  className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border"
                >
                  <FaArrowRight
                    className="rotate-180 text-gray-700 hover:text-teal-600"
                    size={16}
                  />
                </button>
                <button
                  onClick={nextVideo}
                  className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border group"
                >
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <FaArrowRight
                      className="text-gray-700 group-hover:text-teal-600"
                      size={16}
                    />
                  </motion.div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Job Openings */}
        <section className="py-12 px-6 bg-white w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t.jobOpenings.title}
            </h2>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            {t.jobOpenings.positions.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-xl font-bold text-teal-600 mb-2">
                  {language === "zh-HK" ? job.chineseTitle : job.title}
                </h3>
                <p className="text-base text-gray-600 mb-4">{job.subtitle}</p>

                <div className="space-y-3 mb-6">
                  {job.description.slice(0, 2).map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="#apply"
                    className="text-center text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg"
                    style={{ backgroundColor: "var(--primary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--secondary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--primary)";
                    }}
                  >
                    {job.ctaText}
                  </a>
                  <a
                    href={`#job-details-${job.id}`}
                    className="text-center text-teal-600 text-base hover:underline"
                  >
                    {t.jobOpenings.viewDetails}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection t={t} />

      {/* Wealth Management Section */}
      <WealthManagementSection t={t} />

      {/* Fun Video Section */}
      <FunVideoSection t={t} />

      {/* Video Section */}
      <VideoSection t={t} />

      {/* Job Openings */}
      <JobOpeningsSection t={t} language={language} />
    </div>
  );
}

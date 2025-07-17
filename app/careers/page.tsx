"use client";

import React, { useState } from "react";
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
  FaArrowRight
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
interface Reason extends Omit<ReasonCard, 'icon'> {
  id: string;
  title: string;
  description: string;
}

interface VideoSectionType {
  title: string;
  internTitle: string;
  description: string;
  watchNowButton: string;
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
    pageSubtitle: "Build your career with us",
    viewPositionsButton: "View Open Positions",
    
    isWealthManagementForYou: {
      title: "Is Wealth Management For You?",
      description: "Before anything else, it's important to understand that Wealth Management is a specialized investment-advisory that offers advice and financial services to high-net-worth-individuals (HNWI), small business owners and families, making it one of most popular and distinctive fields within the financial sector. So here's 7 reasons that make wealth management an exciting career and why you should pursue it.",
      reasons: [
        {
          id: "high-earning",
          title: "High Earning Potential",
          description: "Wealth managers often earn substantial income through fees, commissions, and bonuses based on client assets and performance."
        },
        {
          id: "client-relationships",
          title: "Meaningful Client Relationships",
          description: "You'll build long-term relationships with clients, helping them achieve their financial goals and secure their future."
        },
        {
          id: "skill-development",
          title: "Diverse Skill Development",
          description: "Gain expertise in various financial areas including investments, tax planning, estate planning, and retirement strategies."
        },
        {
          id: "intellectual-challenge",
          title: "Intellectual Challenge",
          description: "Stay engaged with complex financial problems, market analysis, and evolving investment strategies."
        },
        {
          id: "work-life",
          title: "Work-Life Balance",
          description: "After establishing your client base, enjoy flexibility in scheduling client meetings and managing your workload."
        },
        {
          id: "career-longevity",
          title: "Career Longevity",
          description: "Wealth management offers stability and growth potential throughout your career as clients' needs evolve."
        },
        {
          id: "make-difference",
          title: "Make a Difference",
          description: "Help clients achieve important life goals like retirement security, education funding, and legacy planning."
        }
      ]
    },
    
    videoSection: {
      title: "Hear from our team",
      internTitle: "Intern Sharing",
      description: "Hear directly from our interns about their experience working at Seeds Financial Group.",
      watchNowButton: "Watch Now"
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
          chineseTitle: "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "Full-time position for ambitious professionals",
          description: [
            "With wealth management continuing to be a fast-growing industry in Hong Kong and China, we are looking for an ambitious individual to be part of our dynamic team.",
            "In this role, you will oversee and guide client asset management, crafting and implementing tailored investment strategies that ensure sustainable long-term growth.",
            "We provide comprehensive and continuous training to ensure you grasp the skill and knowledge.",
            "We are always happy to work with smart people who are ambitious and passionate."
          ],
          ctaText: "Apply Now"
        },
        {
          id: "wealth-intern",
          title: "Wealth Management Intern",
          chineseTitle: "見習財務策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "Internship opportunity for finance enthusiasts",
          description: [
            "Are you passionate about finance and eager to kickstart your career in wealth management? We're looking for motivated and talented interns to join our dynamic team.",
            "As a Wealth Management Intern, you'll gain hands-on experience in financial analysis, asset allocation, and client advisory services. You'll work closely with seasoned professionals, learning the ins and outs of portfolio management, risk assessment, and strategic planning. This is an excellent opportunity to develop your skills, grow your network, and make a meaningful impact on our clients' financial futures."
          ],
          ctaText: "Apply Now"
        },
        {
          id: "wealth-director",
          title: "Wealth Management Director",
          chineseTitle: "財富策劃總監 (歡迎應屆畢業生/TTPS/IANG)",
          subtitle: "Leadership role for experienced professionals",
          description: [
            "Seed Financial Group is seeking an accomplished and visionary Wealth Management Director to lead our team and drive the growth of our financial solutions across the Asia-Pacific region. With over a decade of experience serving the diverse needs of our clients, we are looking for a dynamic leader to take our wealth management division to new heights.",
            "As the Wealth Management Director, you will oversee high-net-worth client portfolios, develop strategic business initiatives, and mentor a team of talented professionals. Collaborating closely with senior leadership, you will play a key role in shaping the future of our services, expanding our market presence, and delivering exceptional results. This is an opportunity to leverage your expertise, lead with impact, and make a lasting difference in the financial well-being of our clients."
          ],
          ctaText: "Apply Now"
        }
      ]
    },
    
    ctaSection: {
      title: "Ready to join our team?",
      subtitle: "Take the first step towards a rewarding career in wealth management",
      buttonText: "Apply Now"
    }
  },
  "zh-HK": {
    pageTitle: "職業發展",
    pageSubtitle: "與我們一起建立您的職業生涯",
    viewPositionsButton: "查看職位空缺",
    
    isWealthManagementForYou: {
      title: "財富管理適合您嗎？",
      description: "首先，重要的是要了解財富管理是一種專業的投資諮詢服務，為高淨值個人（HNWI）、小型企業主和家庭提供建議和金融服務，使其成為金融領域中最受歡迎和最具特色的領域之一。以下是讓財富管理成為令人興奮職業的7個理由，以及為什麼您應該選擇這個職業。",
      reasons: [
        {
          id: "high-earning",
          title: "高收入潛力",
          description: "財富管理經理通常通過基於客戶資產和業績的費用、佣金和獎金獲得可觀的收入。"
        },
        {
          id: "client-relationships",
          title: "有意義的客戶關係",
          description: "您將與客戶建立長期關係，幫助他們實現財務目標並確保未來安全。"
        },
        {
          id: "skill-development",
          title: "多樣化技能發展",
          description: "在投資、稅務規劃、遺產規劃和退休策略等各個金融領域獲取專業知識。"
        },
        {
          id: "intellectual-challenge",
          title: "智力挑戰",
          description: "保持對複雜金融問題、市場分析和不斷發展的投資策略的參與。"
        },
        {
          id: "work-life",
          title: "工作與生活平衡",
          description: "建立客戶基礎後，在安排客戶會議和管理工作量方面享有靈活性。"
        },
        {
          id: "career-longevity",
          title: "職業長壽",
          description: "隨著客戶需求的變化，財富管理在整個職業生涯中提供穩定性和增長潛力。"
        },
        {
          id: "make-difference",
          title: "產生影響",
          description: "幫助客戶實現重要的生活目標，如退休保障、教育資金和遺產規劃。"
        }
      ]
    },
    
    videoSection: {
      title: "聽聽我們團隊的分享",
      internTitle: "實習生分享",
      description: "直接聆聽我們的實習生分享他們在種子金融集團工作的經驗。",
      watchNowButton: "立即觀看"
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
          chineseTitle: "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "適合有抱負的專業人士的全職職位",
          description: [
            "隨著財富管理在香港和中國繼續成為快速增長的行業，我們正在尋找一位有抱負的個人加入我們充滿活力的團隊。",
            "在這個職位上，您將監督和指導客戶資產管理，制定和實施量身定制的投資策略，確保可持續的長期增長。",
            "我們提供全面和持續的培訓，確保您掌握所需的技能和知識。",
            "我們始終樂於與聰明、有抱負和充滿熱情的人合作。"
          ],
          ctaText: "立即申請"
        },
        {
          id: "wealth-intern",
          title: "財富管理實習生",
          chineseTitle: "見習財務策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "為金融愛好者提供的實習機會",
          description: [
            "您對金融充滿熱情並渴望開始財富管理職業生涯嗎？我們正在尋找積極進取、才華橫溢的實習生加入我們充滿活力的團隊。",
            "作為財富管理實習生，您將在財務分析、資產配置和客戶諮詢服務方面獲得實踐經驗。您將與經驗豐富的專業人士密切合作，學習投資組合管理、風險評估和戰略規劃的來龍去脈。這是發展技能、擴大人脈並對客戶財務未來產生有意義影響的絕佳機會。"
          ],
          ctaText: "立即申請"
        },
        {
          id: "wealth-director",
          title: "財富管理總監",
          chineseTitle: "財富策劃總監 (歡迎應屆畢業生/TTPS/IANG)",
          subtitle: "適合經驗豐富專業人士的領導職位",
          description: [
            "種子金融集團正在尋找一位成就斐然、具有遠見卓識的財富管理總監，領導我們的團隊並推動我們的金融解決方案在亞太地區的增長。憑藉超過十年為客戶多樣化需求服務的經驗，我們正在尋找一位充滿活力的領導者，將我們的財富管理部門提升到新的高度。",
            "作為財富管理總監，您將監督高淨值客戶投資組合，制定戰略業務計劃，並指導一支才華橫溢的專業團隊。通過與高級領導層密切合作，您將在塑造我們服務的未來、擴大市場份額和提供卓越成果方面發揮關鍵作用。這是一個發揮您的專業知識、有影響力地領導並對客戶的財務福祉產生持久影響的機會。"
          ],
          ctaText: "立即申請"
        }
      ]
    },
    
    ctaSection: {
      title: "準備好加入我們的團隊了嗎？",
      subtitle: "邁出第一步，開始充實的財富管理職業生涯",
      buttonText: "立即申請"
    }
  }
};

// Components
const HeroSection = ({ t }: { t: TranslationType }) => (
  <div className="relative min-h-[60vh] md:min-h-[70vh] flex items-center bg-gradient-to-r from-teal-600 to-emerald-500 overflow-hidden">
    {/* Background patterns */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-40 md:w-60 h-40 md:h-60 rounded-full bg-white"></div>
      <div className="absolute bottom-20 right-20 w-60 md:w-80 h-60 md:h-80 rounded-full bg-white"></div>
      <div className="absolute top-1/3 right-1/4 w-20 md:w-40 h-20 md:h-40 rounded-full bg-white"></div>
    </div>
    
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6"
        >
          {t.pageTitle}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-6 md:mb-8"
        >
          {t.pageSubtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="#openings">
            <span className="inline-block bg-white text-teal-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-teal-50 transition-colors shadow-lg">
              {t.viewPositionsButton}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
    
    {/* Placeholder for potential image */}
    <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
      {/* Add your image here */}
      <div className="w-full h-full bg-teal-200/30 flex items-center justify-center text-white/50">
        <span className="text-lg font-light">Team Image Placeholder</span>
      </div>
    </div>
  </div>
);

// TalentSection has been removed as requested

const ReasonCard = ({ reason, index }: { reason: ReasonCard; index: number }) => {
  const icons = [
    <FaChartLine key="chart" className="text-teal-600" size={24} />,
    <FaRegHandshake key="handshake" className="text-teal-600" size={24} />,
    <FaGraduationCap key="education" className="text-teal-600" size={24} />,
    <FaLightbulb key="lightbulb" className="text-teal-600" size={24} />,
    <FaUserFriends key="users" className="text-teal-600" size={24} />,
    <FaUserTie key="user" className="text-teal-600" size={24} />,
    <FaChartLine key="chart2" className="text-teal-600" size={24} />
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
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">{reason.title}</h3>
          <p className="text-sm md:text-base text-gray-600">{reason.description}</p>
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">{t.isWealthManagementForYou.title}</h2>
        <p className="text-base md:text-lg text-gray-600">{t.isWealthManagementForYou.description}</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {t.isWealthManagementForYou.reasons.map((reason, index: number) => (
          <ReasonCard key={reason.id} reason={{...reason, icon: null}} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const VideoSection = ({ t }: { t: TranslationType }) => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">{t.videoSection.title}</h2>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-xl md:text-2xl font-bold text-teal-600 mb-3 md:mb-4">{t.videoSection.internTitle}</h3>
            <p className="text-gray-600 mb-4 md:mb-6">{t.videoSection.description}</p>
            <a href="#video" className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors">
              {t.videoSection.watchNowButton} <FaArrowRight className="ml-2" />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Video thumbnail placeholder */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <span className="text-white text-sm">Intern Video Thumbnail</span>
            </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-600/90 text-white flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors">
                <FaPlay className="ml-1" size={20} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const JobCard = ({ job, language, t }: { job: JobPosition; language: string; t: TranslationType }) => {
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
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{job.subtitle}</p>
        
        <div className={`space-y-3 transition-all duration-300 ${isExpanded ? "max-h-full" : "max-h-24 md:max-h-28 overflow-hidden"}`}>
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
            className="inline-block bg-teal-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:bg-teal-700 transition-colors shadow-sm"
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

const JobOpeningsSection = ({ t, language }: { t: TranslationType; language: string }) => (
  <section id="openings" className="py-12 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">{t.jobOpenings.title}</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {t.jobOpenings.positions.map((job: JobPosition) => (
          <JobCard key={job.id} job={job} language={language} t={t} />
        ))}
      </div>
    </div>
  </section>
);

const CTASection = ({ t }: { t: TranslationType }) => (
  <section className="py-12 md:py-20 bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
    <div className="container mx-auto px-4 md:px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
      >
        {t.ctaSection.title}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto"
      >
        {t.ctaSection.subtitle}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <a 
          href="#apply" 
          className="inline-block bg-white text-teal-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-teal-50 transition-colors shadow-lg"
        >
          {t.ctaSection.buttonText}
        </a>
      </motion.div>
    </div>
  </section>
);

export default function CareersPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection t={t} />
      
      {/* Wealth Management Section */}
      <WealthManagementSection t={t} />
      
      {/* Video Section */}
      <VideoSection t={t} />
      
      {/* Job Openings */}
      <JobOpeningsSection t={t} language={language} />
      
      {/* CTA Section */}
      <CTASection t={t} />
    </div>
  );
}

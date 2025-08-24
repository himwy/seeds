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
  FaGlobe,
  FaRocket,
  FaBalanceScale,
  FaStar,
  FaUsers,
  FaMapMarkerAlt,
  FaFileAlt,
  FaLanguage,
  FaHeart,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";

// Types
interface JobPosition {
  id: string;
  title: string;
  chineseTitle: string;
  subtitle: string;
  description: string[];
  ctaText: string;
  responsibilities?: string[];
  benefits?: string[];
  requirements?: string[];
  notes?: string[];
  email?: string;
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
  title: string;
  subtitle: string;
  heroDescription: string;
  keyResponsibilities: string;
  whatWeProvide: string;
  requirements: string;
  additionalNotes: string;
  applyNow: string;
  applyDescription: string;
  applicationNote: string;
  whyJoinUs: string;
  whyJoinDescription: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
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
          responsibilities: [
            "Develop and implement customized financial and investment strategies for HK and Mainland exclusive clients",
            "Monitor and manage client portfolios, regularly assessing and adjusting investment allocations to meet financial goals",
            "Maintain close communication with existing clients, understanding their needs, and providing expert guidance",
            "Stay informed about market trends and economic indicators, offering forward-looking investment insights and risk management strategies",
          ],
          benefits: [
            "Local and overseas conventions",
            "Fast-tracked career progressions",
            "Ongoing professional development and training opportunities",
            "Flexibility to help you enjoy a work-life balance",
            "Attractive package, performance-based bonus and commission",
          ],
          requirements: [
            "A degree holder",
            "Fluent in reading and writing Cantonese and Mandarin. (English is a plus)",
            "Looking for a challenging career",
            "Have great interpersonal skills",
            "Have a great understanding of financial markets",
            "A valid working visa",
            "Passionate about life and building a brighter future",
          ],
          notes: [
            "Candidates who are transitioning and looking for a career change from a different industry are welcome",
            "Applicants with less experience will be considered for manager/executive positions",
            "Our company is an Equal Employment Opportunity employer that adheres to policies that are based on merit and business needs",
            "Candidates without an appropriate visa to work in Hong Kong will not be entertained",
          ],
          email: "hr@actiondoitnow.com",
        },
        {
          id: "wealth-intern",
          title: "Wealth Management Intern (Hong Kong, Macau and China Region)",
          chineseTitle:
            "見習財富策劃經理(歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "Internship opportunity for finance enthusiasts",
          description: [
            "Are you passionate about finance and eager to kickstart your career in wealth management? We're looking for motivated and talented interns to join our dynamic team.",
            "As a Wealth Management Intern, you'll gain hands-on experience in financial analysis, asset allocation, and client advisory services. You'll work closely with seasoned professionals, learning the ins and outs of portfolio management, risk assessment, and strategic planning.",
          ],
          ctaText: "Apply Now",
          responsibilities: [
            "Assist in the analysis and management of client portfolios",
            "Support the development of customized financial strategies",
            "Conduct market research and financial data analysis",
            "Collaborate with our team on client presentations",
            "Learn best practices in risk management and investment planning",
          ],
          benefits: [
            "Comprehensive and continuous training, allowing you to grasp the skill and knowledge",
            "Mentorship from experienced wealth management professionals",
            "Real-world experience in financial planning and advisory",
            "Opportunities to contribute to impactful client projects",
            "Potential for full-time employment upon successful completion of the internship",
            "Performance/ commission bonus, life and medical insurance",
          ],
          requirements: [
            "A degree holder, or currently pursuing a degree in Finance, Economics, Business, or a related field",
            "A keen interest in financial markets and investment strategies",
            "Eagerness to learn and adapt in a fast-paced environment",
            "Strong analytical and problem-solving skills",
          ],
          notes: [
            "We aim to develop young people to be a Future Leader",
            "Apply now if you are looking for a challenging career, are passionate about life, have great interpersonal skills and are looking to build your future",
            "Our company is an Equal Employment Opportunity employer that adheres to policies that are based on merit and business needs when it comes to hiring, recruitment, compensation, benefits, terminations and all other terms of conditions of employment",
            "Please accept our utmost appreciation for your interest and while we may contact you to request further information, please note that only applicants under consideration will be invited for a follow-up interview",
            "Candidates without an appropriate visa to work in Hong Kong will not be entertained",
          ],
          email: "hr@actiondoitnow.com",
        },
      ],
    },

    ctaSection: {
      title: "Ready to join our team?",
      subtitle:
        "Take the first step towards a rewarding career in wealth management",
      buttonText: "Apply Now",
    },
    title: "Join Our Team",
    subtitle: "Build Your Career in Wealth Management",
    heroDescription:
      "Seeds Financial Group in partnership with one of the world's largest financial groups provides advisory services using a wide range of risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
    keyResponsibilities: "Key Responsibilities",
    whatWeProvide: "Our Company Will Provide",
    requirements: "You Must Be",
    additionalNotes: "Additional Information",
    applyNow: "Apply Now",
    applyDescription:
      "Interested applicants may send their resumes directly to:",
    applicationNote:
      "Please accept our utmost appreciation for your interest and while we may contact you to request further information, please note that only applicants under consideration will be invited for a follow-up interview.",
    whyJoinUs: "Why Join Seeds Financial Group?",
    whyJoinDescription:
      "Be part of a dynamic team that's shaping the future of wealth management in Asia",
    benefits: [
      {
        icon: "globe",
        title: "Global Opportunities",
        description:
          "Local and overseas conventions to expand your network and expertise",
      },
      {
        icon: "rocket",
        title: "Fast-Track Career",
        description:
          "Accelerated career progression based on performance and merit",
      },
      {
        icon: "graduation",
        title: "Professional Development",
        description:
          "Ongoing training and development opportunities to enhance your skills",
      },
      {
        icon: "balance",
        title: "Work-Life Balance",
        description:
          "Flexible arrangements to help you maintain a healthy work-life balance",
      },
      {
        icon: "star",
        title: "Attractive Compensation",
        description:
          "Competitive package with performance-based bonuses and commissions",
      },
      {
        icon: "users",
        title: "Diverse Team",
        description:
          "Equal opportunity employer welcoming career changers from different industries",
      },
    ],
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
          responsibilities: [
            "為香港和內地專屬客戶制定和實施定制的財務和投資策略",
            "監控和管理客戶投資組合，定期評估和調整投資配置以實現財務目標",
            "與現有客戶保持密切溝通，了解他們的需求，並提供專業指導",
            "及時了解市場趨勢和經濟指標，提供前瞻性的投資見解和風險管理策略",
          ],
          benefits: [
            "本地和海外會議",
            "快速職業發展軌道",
            "持續的專業發展和培訓機會",
            "靈活性幫助您享受工作與生活的平衡",
            "有吸引力的薪酬、績效獎金和佣金",
          ],
          requirements: [
            "學位持有者",
            "流利的粵語和普通話讀寫能力（英語是加分項）",
            "尋求具挑戰性的職業",
            "具有出色的人際交往技能",
            "對金融市場有很好的理解",
            "有效的工作簽證",
            "對生活充滿熱情，致力於建設更美好的未來",
          ],
          notes: [
            "歡迎正在轉型並尋求從不同行業轉換職業的候選人",
            "經驗較少的申請者將被考慮擔任經理/行政職位",
            "我們公司是平等就業機會雇主，在招聘、薪酬、福利、終止和所有其他就業條款方面堅持基於績效和業務需要的政策",
            "沒有在香港工作適當簽證的候選人將不予考慮",
          ],
          email: "hr@actiondoitnow.com",
        },
        {
          id: "wealth-intern",
          title: "財富管理實習生 (香港、澳門及中國地區)",
          chineseTitle:
            "見習財富策劃經理(歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          subtitle: "為金融愛好者提供的實習機會",
          description: [
            "您對金融充滿熱情並渴望開始財富管理職業生涯嗎？我們正在尋找積極進取、才華橫溢的實習生加入我們充滿活力的團隊。",
            "作為財富管理實習生，您將在財務分析、資產配置和客戶諮詢服務方面獲得實踐經驗。您將與經驗豐富的專業人士密切合作，學習投資組合管理、風險評估和戰略規劃的來龍去脈。",
          ],
          ctaText: "立即申請",
          responsibilities: [
            "協助分析和管理客戶投資組合",
            "支持定制財務策略的開發",
            "進行市場研究和財務數據分析",
            "與我們的團隊合作進行客戶演示",
            "學習風險管理和投資規劃的最佳實踐",
          ],
          benefits: [
            "全面和持續的培訓，讓您掌握技能和知識",
            "經驗豐富的財富管理專業人士的指導",
            "財務規劃和諮詢的實際經驗",
            "有機會參與有影響力的客戶項目",
            "實習成功完成後有可能轉為全職",
            "績效/佣金獎金，壽險和醫療保險",
          ],
          requirements: [
            "學位持有者，或目前正在攻讀金融、經濟、商業或相關領域的學位",
            "對金融市場和投資策略有濃厚興趣",
            "渴望在快節奏的環境中學習和適應",
            "較強的分析和解決問題的能力",
          ],
          notes: [
            "我們旨在培養年輕人成為未來的領袖",
            "如果您正在尋找具有挑戰性的職業，對生活充滿熱情，具有出色的人際交往能力並希望建立自己的未來，請立即申請",
            "我們公司是平等就業機會雇主，在招聘、薪酬、福利、終止和所有其他就業條款方面堅持基於績效和業務需要的政策",
            "請接受我們對您的興趣的最大感謝，雖然我們可能會聯繫您以要求進一步信息，但請注意，只有被考慮的申請者才會被邀請參加後續面試",
            "沒有在香港工作適當簽證的候選人將不予考慮",
          ],
          email: "hr@actiondoitnow.com",
        },
      ],
    },

    ctaSection: {
      title: "準備好加入我們的團隊了嗎？",
      subtitle: "邁出第一步，開始充實的財富管理職業生涯",
      buttonText: "立即申請",
    },
    title: "加入我們的團隊",
    subtitle: "在財富管理領域建立您的職業生涯",
    heroDescription:
      "Seeds Financial Group與世界最大的金融集團之一合作，提供廣泛的風險管理、策略和資產配置計劃的諮詢服務，幫助我們的客戶實現他們的財務目標和未來需求。",
    keyResponsibilities: "主要職責",
    whatWeProvide: "我們公司將提供",
    requirements: "您必須是",
    additionalNotes: "附加信息",
    applyNow: "立即申請",
    applyDescription: "有興趣的申請者可將簡歷直接發送至：",
    applicationNote:
      "請接受我們對您的興趣的最大感謝，雖然我們可能會聯繫您以要求進一步信息，但請注意，只有被考慮的申請者才會被邀請參加後續面試。",
    whyJoinUs: "為什麼加入Seeds Financial Group？",
    whyJoinDescription: "成為塑造亞洲財富管理未來的動態團隊的一員",
    benefits: [
      {
        icon: "globe",
        title: "全球機會",
        description: "本地和海外會議，擴展您的網絡和專業知識",
      },
      {
        icon: "rocket",
        title: "快速職業發展",
        description: "基於績效和成績的加速職業發展",
      },
      {
        icon: "graduation",
        title: "專業發展",
        description: "持續的培訓和發展機會，提升您的技能",
      },
      {
        icon: "balance",
        title: "工作生活平衡",
        description: "靈活安排，幫助您保持健康的工作生活平衡",
      },
      {
        icon: "star",
        title: "有吸引力的薪酬",
        description: "具競爭力的薪酬包，包括績效獎金和佣金",
      },
      {
        icon: "users",
        title: "多元化團隊",
        description: "平等機會雇主，歡迎來自不同行業的職業轉換者",
      },
    ],
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
            href={`mailto:${job.email}`}
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
          <Link href={`/careers/${job.id}`}>
            <span className="inline-block text-teal-600 text-sm md:text-base hover:underline cursor-pointer">
              {t.jobOpenings.viewDetails}
            </span>
          </Link>
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

const iconMap = {
  globe: FaGlobe,
  rocket: FaRocket,
  graduation: FaGraduationCap,
  balance: FaBalanceScale,
  star: FaStar,
  users: FaUsers,
};

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
                    href={`mailto:${job.email}`}
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
                  <Link href={`/careers/${job.id}`}>
                    <span className="text-center text-teal-600 text-base hover:underline cursor-pointer">
                      {t.jobOpenings.viewDetails}
                    </span>
                  </Link>
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

      {/* Why Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {t.whyJoinUs}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.whyJoinDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.benefits.map((benefit, index) => {
              const IconComponent =
                iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <IconComponent className="text-4xl text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

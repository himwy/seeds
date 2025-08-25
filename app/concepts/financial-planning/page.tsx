"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaBalanceScale,
  FaRegLightbulb,
  FaUsers,
  FaShieldAlt,
  FaUserTie,
  FaAward,
  FaMedal,
  FaCertificate,
  FaClipboardList,
  FaHandshake,
  FaPiggyBank,
  FaHome,
  FaGraduationCap,
  FaHeartbeat,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Types
interface SectionIcon {
  icon: IconType;
  badge: IconType | null;
}

interface SectionStep {
  title: string;
  description: string;
}

interface Section {
  id: string;
  title: string;
  content: string[];
  highlights?: string[];
  steps?: SectionStep[];
}

interface Translation {
  pageTitle: string;
  pageSubtitle: string;
  sections: Section[];
  source: string;
  contactCTA: string;
  tableOfContents: string;
}

interface SectionCardProps {
  section: Section;
  index: number;
  t: Translation;
  isMobile: boolean;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

interface QuickNavItem {
  id: string;
  title: string;
  isActive: boolean;
}

// Icons configuration for sections
const sectionIcons: Record<string, SectionIcon> = {
  "what-is": { icon: FaChartLine, badge: FaHome },
  benefits: { icon: FaBalanceScale, badge: FaPiggyBank },
  process: { icon: FaRegLightbulb, badge: null },
  "who-needs": { icon: FaUsers, badge: FaGraduationCap },
  "risk-management": { icon: FaShieldAlt, badge: FaHeartbeat },
  "why-hire": { icon: FaUserTie, badge: null },
  "cfp-difference": { icon: FaAward, badge: null },
  "why-choose-cfp": { icon: FaMedal, badge: null },
  "cfp-guarantee": { icon: FaCertificate, badge: null },
  "how-to-use": { icon: FaClipboardList, badge: null },
  "first-step": { icon: FaHandshake, badge: null },
};

// Background colors for sections - Professional gray scheme like team page
const sectionBgColors: Record<string, string> = {
  "what-is": "bg-gray-50",
  benefits: "bg-white",
  process: "bg-gray-50",
  "who-needs": "bg-white",
  "risk-management": "bg-gray-50",
  "why-hire": "bg-white",
  "cfp-difference": "bg-gray-50",
  "why-choose-cfp": "bg-white",
  "cfp-guarantee": "bg-gray-50",
  "how-to-use": "bg-white",
  "first-step": "bg-gray-50",
};

// Optimized translations
const translations = {
  en: {
    pageTitle: "Financial Planning",
    pageSubtitle: "Setting the foundation for your financial future",
    sections: [
      {
        id: "what-is",
        title: "What is Financial Planning?",
        content: [
          "Financial planning is the process of setting, planning, achieving, and reviewing your life goals through proper financial management.",
          "Life goals include buying a home, getting married, raising children and planning for their education, insuring yourself and your family, saving and investing for retirement, estate and tax planning, etc.",
          "Life goals are not limited to personal matters; they may involve starting and financing a business, joining or leaving a partnership, etc.",
        ],
        highlights: ["Set goals", "Create plans", "Achieve financial security"],
      },
      {
        id: "benefits",
        title: "Benefits of Financial Planning",
        content: [
          "Life is full of changes and challenges. You need to plan and modify your life goals at every turn during the negotiation process.",
          "Financial planning can reduce surprises and give you better control over your goals.",
          "Financial planning allows you to list your financial expectations, now and in the future, and helps you develop realistic plans, objectively evaluate alternatives, and take effective measures.",
          "It can also help you understand how your financial goals relate to each other and how they balance each other.",
        ],
        highlights: [
          "Better control",
          "Reduced uncertainty",
          "Balanced priorities",
        ],
      },
      {
        id: "process",
        title: "Financial Planning Process",
        content: [
          "The financial planning process is a straightforward 6-step method that provides you with an action plan designed to achieve financial goals and financial health.",
        ],
        steps: [
          {
            title: "Establish client-planner relationship",
            description: "Building trust and understanding your needs",
          },
          {
            title: "Collect client data and determine goals",
            description: "Gathering information and setting clear objectives",
          },
          {
            title: "Determine client's financial status",
            description: "Analyzing your current financial situation",
          },
          {
            title: "Analyze and evaluate client information",
            description: "Finding opportunities and addressing challenges",
          },
          {
            title: "Develop and present financial plan",
            description: "Creating a customized roadmap for your finances",
          },
          {
            title: "Implement and monitor financial plan",
            description: "Taking action and tracking progress over time",
          },
        ],
      },
      {
        id: "who-needs",
        title: "Who Needs Financial Planning?",
        content: [
          "Don't think that financial planning is only suitable for multimillionaires.",
          "You don't need to accumulate a large amount of funds to turn to financial planning. You can start immediately after economic independence.",
          "More and more ordinary men and women have recognized the importance of starting financial planning early to benefit themselves and their families.",
          "The advantage of starting financial planning early is that you can get ahead of others who haven't achieved your life goals.",
          "You may be surprised to find that your friends and relatives have been doing financial planning with the help of a financial planner for some time.",
        ],
        highlights: [
          "Everyone benefits",
          "Start early",
          "Achieve goals faster",
        ],
      },
      {
        id: "risk-management",
        title: "Risk Management is the Foundation",
        content: [
          "With proper life insurance, medical insurance, and income protection, you can safeguard your loved ones' finances.",
          "As the breadwinner of the family, you must ensure that your dependents have strong financial security.",
          "It is natural to want to give children the best. For every parent, the primary concern is to ensure that their children have a safe and better tomorrow. This includes being able to give your child the best future and get all the necessary financial support in all the major milestones of their lives—education, lifestyle, marriage, etc. But to achieve this, people should have a clear plan on how to provide the same.",
        ],
        highlights: [
          "Protect loved ones",
          "Secure their future",
          "Peace of mind",
        ],
      },
      {
        id: "why-hire",
        title: "Why Hire a Financial Planner?",
        content: [
          "The general public may not have professional knowledge of financial planning, but some people may like to plan everything themselves.",
          "The most obvious benefit is that you don't have to pay any fees, but this does not mean that you don't pay other costs.",
          "The main costs or additional expenses include: inability to apply valuable time to other more cost-effective matters; inability to obtain the latest information; possible missed use of more profitable strategies; inability to obtain additional professional opinions, etc.",
          "For all the above reasons, the benefits of hiring a financial planner far outweigh the cost. The cost of hiring a financial planner will depend on the size of the investment amount and the complexity of the financial arrangement.",
          "Please contact a CFP professional in Hong Kong or a company that provides financial planning services. They are happy to help you evaluate your financial planning needs.",
        ],
        highlights: ["Expert guidance", "Time-saving", "Optimal strategies"],
      },
      {
        id: "cfp-difference",
        title: "CFP Certified Financial Planners are Different",
        content: [
          "The following professionals can assist you in handling one or more financial planning processes. They include:",
          "• Accountants\n• Financial planners\n• Investment advisors\n• Retirement benefit consultants\n• Bankers\n• Insurance brokers\n• Lawyers or estate planners\n• Stock brokers",
          "Each of the above advisors has their own strengths. But some of them can provide you with more than one professional opinion.",
          "Financial planners who hold CFP certified financial planner qualification certification have undergone professional training and can provide clients with a comprehensive financial planning process.",
        ],
        highlights: [
          "Comprehensive training",
          "Broad expertise",
          "High standards",
        ],
      },
      {
        id: "why-choose-cfp",
        title: "Why Choose a CFP Professional",
        content: [
          "CFP professionals are financial planners who hold a CFP certified financial planner certificate. The certificate is issued by the Hong Kong Institute of Financial Planners (FPHK) or a member association of the Financial Planning Standards Board (FPSB) around the world.",
          "With your permission, they will review your financial planning needs. Including savings, investment, insurance, retirement, estate and tax arrangements, etc.",
          "You can also hire them to deal with individual financial issues, but they will still provide you with professional advice based on your overall financial situation.",
          "The advantage of CFP professionals is that they can use a comprehensive approach to find solutions for you to achieve your set financial goals. Because other financial advisors may only provide opinions on one of your financial needs.",
        ],
        highlights: [
          "Globally recognized",
          "Holistic approach",
          "Client-focused",
        ],
      },
      {
        id: "cfp-guarantee",
        title: "CFP Certification Mark is a Professional Guarantee",
        content: [
          "The quality and reliability of CFP professionals are mainly composed of four areas.",
          "First, the association has very strict requirements for the CFP certification process. CFP professionals need to meet four requirements (i.e., education, examination, experience, and ethics) in order to receive CFP qualification certification for the first time.",
          "Second, through the annual certification renewal system, to ensure that the certificate holder maintains its professional quality.",
          "All CFP qualification certifications need to be updated annually. To ensure certificate holders continuously enrich their professional knowledge and skills, they must complete at least fifteen hours of continuing education courses every year.",
          "Third, the association sets up disciplinary rules and procedures to maintain the 'Professional Ethics and Responsibilities' of the association and the high professional standards of CFP professionals.",
          "To summarize, CFP professionals (1) have the highest competence and professional ethics, (2) hold a CFP certified financial planner certificate, and (3) objectively provide solutions at any time to meet your financial planning needs.",
        ],
        highlights: [
          "Strict requirements",
          "Continuing education",
          "Ethical standards",
        ],
      },
      {
        id: "how-to-use",
        title: "How to Make Good Use of Financial Planning?",
        content: [
          "Despite CFP professionals providing their professional opinions, your participation is also very important to plan a successful financial plan. Here are our suggestions:",
          "• Start financial planning early.\n• Set measurable financial goals.\n• Understand that financial goals may be interconnected.\n• Set realistic expectations.\n• Actively participate in the entire financial planning process.\n• Regularly review your financial situation.",
          "The above financial planning process and our suggestions are expressed in a simple mode. If you need a detailed explanation, please consult your CFP professional.",
        ],
        highlights: ["Be proactive", "Stay engaged", "Regular reviews"],
      },
      {
        id: "first-step",
        title: "Take the First Step for a Better Future",
        content: [
          "Using financial planning and choosing a financial planner is one of the major decisions you make for yourself and your family.",
          "Whether your life goals are simple or complex, you need a CFP professional to balance all aspects of your needs.",
          "Please carefully refer to the list of CFP professionals to choose a suitable financial planner.",
          "You can also inquire with the founding members of the association (see the introduction to the Hong Kong Institute of Financial Planners).",
        ],
        highlights: ["Start today", "Secure tomorrow", "Build wealth"],
      },
    ],
    source: "Source: The Institute of Financial Planners of Hong Kong Limited.",
    contactCTA: "Contact us to learn more about financial planning",
    tableOfContents: "Contents",
  },
  "zh-HK": {
    pageTitle: "財務策劃",
    pageSubtitle: "為您的財務未來奠定基礎",
    sections: [
      {
        id: "what-is",
        title: "財務策劃是甚麼？",
        content: [
          "財務規劃是通過適當的財務管理來設定、規劃、實現和審查您的人生目標的過程。",
          "人生目標包括買房、結婚、撫養孩子和規劃他們的教育、為自己和家人投保、為退休存錢和投資、遺產和稅務規劃等。",
          "人生目標不僅限於個人事務；它們可能涉及創業和融資、加入或退出合夥企業等。",
        ],
        highlights: ["設定目標", "創建計劃", "實現財務安全"],
      },
      {
        id: "benefits",
        title: "財務策劃的好處",
        content: [
          "生活充滿變化和挑戰。您需要在協商過程中的每一個轉彎時計劃和修改您的人生目標。",
          "財務規劃可以減少意外，讓您更好地控制自己的目標。",
          "財務規劃使您能夠列出您的財務預期、現在和未來，並幫助您制定切合實際的計劃、客觀地評估備選方案並採取有效措施。",
          "它還可以幫助您了解您的財務目標如何相互關聯以及它們如何相互平衡。",
        ],
        highlights: ["更好的控制", "減少不確定性", "平衡優先事項"],
      },
      {
        id: "process",
        title: "財務策劃程序",
        content: [
          "財務規劃流程是一個直截了當的 6 步方法，它為您提供旨在實現財務目標和財務健康的行動計劃。",
        ],
        steps: [
          {
            title: "建立客戶與規劃師的關係",
            description: "建立信任並了解您的需求",
          },
          {
            title: "收集客戶數據和確定目標",
            description: "收集信息並設定明確的目標",
          },
          {
            title: "決定客戶的財務狀況",
            description: "分析您當前的財務狀況",
          },
          {
            title: "分析和評估客戶信息",
            description: "發現機會並應對挑戰",
          },
          {
            title: "開發和提出財務計劃",
            description: "為您的財務創建定制的路線圖",
          },
          {
            title: "實施和監控財務計劃",
            description: "採取行動並隨時間跟踪進度",
          },
        ],
      },
      {
        id: "who-needs",
        title: "甚麼人需要理財策劃？",
        content: [
          "不要以為財務規劃只適合千萬富翁。",
          "您無需積累大量資金即可轉向財務規劃。您可以在經濟獨立後立即開始。",
          "越來越多的普通男性和女性已經認識到儘早開始財務規劃以使自己和家人受益的重要性。",
          "儘早開始財務規劃的好處是可以領先於其他沒有實現您的人生目標。",
          "您可能會驚訝地發現，您的親朋好友已經在理財師的幫助下進行了一段時間的理財規劃",
        ],
        highlights: ["每個人都能受益", "及早開始", "更快實現目標"],
      },
      {
        id: "risk-management",
        title: "風險管理是健康財務策劃的基礎",
        content: [
          "有了適當的人壽保險、醫療保險和收入保障，可以為親人的財務保駕護航。",
          "作為家庭的養家糊口者，您必須確保受撫養人有強大的經濟保障。",
          "想要給孩子最好的東西是很自然的。對於每一位父母來說，首要關注的是確保他們的孩子有一個安全和更美好的明天。這包括能夠給您的孩子最好的未來，並在他們生活的所有主要里程碑——教育、生活方式、婚姻等方面獲得所有必要的經濟支持。但要實現這一點，人們應該有一個關於如何提供相同的明確計劃。",
        ],
        highlights: ["保護親人", "確保他們的未來", "心靈平靜"],
      },
      {
        id: "why-hire",
        title: "為何聘用財務策劃師？",
        content: [
          "一般人或許並没有財務策劃的專業知識，但有 些人也許喜歡自己全盤籌劃。",
          "最明顯的好處是您不用支付任何費用，但這並不等如您沒有付出其他代價。",
          "主要的代價或額外開支，包括：不能將寶貴的時間應用於其他更有成本效益的事務上；未能獲取最新資訊；可能錯過運用更有利可圖的策略；不能獲得額外的專業意見等等。您或更要額外投資或購買自用的財務軟件或其他分析工具、又或需訂購一些投資及財經報告。",
          "基於以上種種原因，聘用財務策劃師的好處是遠遠超過其費用。聘用財務策劃師的費用，會視乎投資金額的大小及財務安排的複雜性而設。",
          "請與香港的CFP專業人士，或提供財務策劃服務的公司聯絡。他們很樂意協助您評估您的財務策劃需要。",
        ],
        highlights: ["專家指導", "節省時間", "最佳策略"],
      },
      {
        id: "cfp-difference",
        title: "CFP認可財務策劃師與眾不同",
        content: [
          "以下各種專業人士，均可協助您處理一項或以上的財務策劃程序。他們包括：",
          "• 會計師\n• 財務策劃師\n• 投資顧間\n• 退休福利顧間\n• 銀行家\n• 保險經紀\n• 律師或遺產策劃師\n• 股票經紀",
          "以上各類顧問都各有所長。但當中有些顧問，可以為您提供超過一項的專業意見。",
          "持有CFP認可財務策劃師資格認證的財務策劃師均受過專業的加練，能為客户提供綜合的財務策劃程序。",
        ],
        highlights: ["全面培訓", "廣泛專業知識", "高標準"],
      },
      {
        id: "why-choose-cfp",
        title: "為何選擇CFP專業人士",
        content: [
          "CFP專業人士是持有CFP認可財務策劃師證書的財務策劃師。該證書是由香港財務策劃師學會(FPHK)或遍佈全球的財務策劃標準制定局(FPBS)之成員學會所頒發。",
          "在您允許的情況下，他們會覆核您對財務策劃的需要。包括儲蓄、投資、保險、退休、遺產及税務安排等事項。",
          "您亦可聘用他們為您處理個別的財務間題，但他們仍會以您整體的財務狀況為前提，為您提供專業意見。",
          "CFP專業人士的優勢在於他/她們可運用綜合性的方法，為您得找解決方案，使您達到設定的財務目標。因為，其他的財務顧問可能界會為您某一項的財務需求提供意見。",
        ],
        highlights: ["全球認可", "整體方法", "以客戶為中心"],
      },
      {
        id: "cfp-guarantee",
        title: "CFP認證標誌就是專業保證",
        content: [
          "CFP專業人士的質素與可靠性，主要由四項範疇組成。",
          "第一、學會對CFP認證程序有十分嚴格的要求。CFP 專業人士需要符合四項要求（即教育考試、經驗及操守)，才能首次獲頒發CFP資格認證。",
          "第二、透過每年認證續期的制度，以確保持證人維持其專業質素。",
          "所有CFP資格認證需要每年更新。為確保持證人不斷豐富和發展自己的專業知識和技能 持證人必須每年完成最少十五小時的持續進修課程。",
          "第三、學會設定紀律規則及程序，以維持學會的《專業操守及責任》及CFP專業人士高度的專業標準。",
          "總結以上各項範疇，CFP專業人士(一)具備最高的勝任能力及專業操守，(二)持有CFP認可財務策劃師證書，及(三)隨時客觀地提供解決方案以符合您的財務策劃需要。",
        ],
        highlights: ["嚴格要求", "持續教育", "道德標準"],
      },
      {
        id: "how-to-use",
        title: "如何善用財務策劃？",
        content: [
          "儘管CFP專業人士會提供他/她們的專業意見，但要籌劃—個成功的財務策劃。您的參與也是非常重要。以下是我們的建議：",
          "• 盡早開始財務策劃。\n• 設定可量度的財務目標。\n• 了解財務目標可能互相關連。\n• 要設定實際的期望。\n• 主動參與整個財務策劃程序。\n• 定期對財務狀況作出檢討。",
          "以上的財務策劃程序及我們的建議，皆以簡單的模式表達出來。如需要詳細的解釋，請向您的CFP專業人士查詢。",
        ],
        highlights: ["積極主動", "保持參與", "定期審查"],
      },
      {
        id: "first-step",
        title: "為美好將來，踏出第一步",
        content: [
          "運用財務策劃及選擇財務策劃師，是您為自己及家人作出的重大決定之一。",
          "無論您的人生目標是簡單或複雜，皆需要一個CFP專業人士替您平衡各方面的需要。",
          "請細心參考CFP專業人士的名單，從而選擇一位合適的財務策劃師。",
          "您亦可向學會的創會會員（見香港財務策劃師學會簡介 ） 查詢。",
        ],
        highlights: ["今天開始", "確保明天", "積累財富"],
      },
    ],
    source: "資料來源：香港財務策劃師學會有限公司",
    contactCTA: "聯絡我們了解更多有關財務策劃的資訊",
    tableOfContents: "目錄",
  },
};

// Reusable components
const SectionCard: React.FC<SectionCardProps> = ({
  section,
  index,
  isMobile,
}) => {
  const sectionConfig = sectionIcons[section.id];
  const bgColor = sectionBgColors[section.id];
  const IconComponent = sectionConfig?.icon || FaChartLine;

  // Professional animation for all cards that works on scroll
  const getAnimationProps = () => {
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: Math.min(index * 0.1, 0.3) },
      viewport: { once: true, margin: "-50px" },
    };
  };

  return (
    <motion.div
      {...getAnimationProps()}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`scroll-mt-24 p-${isMobile ? "4" : "6"} sm:p-${
        isMobile ? "5" : "8"
      } rounded-2xl ${bgColor} shadow-sm hover:shadow-md w-full overflow-hidden transition-shadow duration-300`}
      id={section.id}
      style={{
        // Fallback visibility
        opacity: 1,
        minHeight: "200px",
      }}
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <motion.div
          className="mr-3 sm:mr-4 p-2 sm:p-3 bg-white rounded-full shadow-sm flex-shrink-0"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </motion.div>
        <h2
          className={`text-xl sm:text-2xl ${
            isMobile ? "lg:text-2xl" : "lg:text-3xl"
          } font-bold text-primary`}
        >
          {section.title}
        </h2>
      </div>

      {section.highlights && (
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {section.highlights.map((highlight: string, i: number) => (
            <span
              key={i}
              className="bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-primary border border-primary/20 shadow-sm"
            >
              {highlight}
            </span>
          ))}
        </div>
      )}

      <div className={section.steps ? "lg:w-2/3" : "w-full"}>
        <div className="space-y-4">
          {section.content.map((paragraph: string, i: number) => (
            <p key={i} className="text-black leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {section.steps && (
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {section.steps.map((step: SectionStep, i: number) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">{i + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{step.title}</h3>
                  <p className="text-sm text-black mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSection,
  onSectionClick,
}) => (
  <motion.div
    className="sticky top-24 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <h3 className="text-lg font-bold mb-4 text-primary">Contents</h3>
    <ul className="space-y-1">
      {sections.map((section: Section, index: number) => {
        const IconComponent = sectionIcons[section.id]?.icon || FaChartLine;
        return (
          <motion.li
            key={section.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
          >
            <button
              onClick={() => onSectionClick(section.id)}
              className={`flex items-center py-2 px-3 rounded-lg transition-colors w-full text-left hover:scale-[1.02] ${
                activeSection === section.id
                  ? "bg-primary/10 text-dark-gray"
                  : "text-dark-gray hover:bg-gray-100"
              }`}
              aria-current={activeSection === section.id ? "page" : undefined}
            >
              <IconComponent className="w-4 h-4 mr-2 flex-shrink-0 text-dark-gray" />
              <span>{section.title}</span>
            </button>
          </motion.li>
        );
      })}
    </ul>
  </motion.div>
);

export default function FinancialPlanningPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("what-is");
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload hero background image for faster loading
  useEffect(() => {
    const preloadHeroImage = () => {
      const img = document.createElement("img");
      img.src = "/assets/Financial.jpg";
      img.onload = () => {
        // Image preloaded successfully
      };
    };

    // Preload immediately
    preloadHeroImage();
  }, []);

  // Optimized mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    setIsLoaded(true);

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Optimized intersection observer
  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: isMobile ? 0.1 : 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    t.sections.forEach((section: Section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [t.sections, isLoaded, isMobile]);

  // Smooth scroll handler
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  }, []);

  // Memoized quick nav items
  const quickNavItems: QuickNavItem[] = useMemo(
    () =>
      t.sections.map((section: Section) => ({
        id: section.id,
        title:
          section.title.length > 15
            ? section.title.substring(0, 15) + "..."
            : section.title,
        isActive: activeSection === section.id,
      })),
    [t.sections, activeSection]
  );

  if (isMobile) {
    return (
      <div
        className="w-full overflow-x-hidden pb-16"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        {/* Hero Section - Clean like team page, NO background image */}
        <section className="relative bg-gray-50 py-12 sm:py-16 pt-28 sm:pt-32">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t.pageTitle}
              </h1>

              <div className="w-16 sm:w-24 h-1 bg-gray-900 mx-auto mb-6 sm:mb-8"></div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12 px-4">
                {t.pageSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 overflow-x-auto">
          <div className="flex space-x-2 whitespace-nowrap">
            {quickNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1 text-sm text-gray-600 transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <section className="pt-4 sm:pt-6 px-3 sm:px-4 bg-white">
          <div className="space-y-6 sm:space-y-8">
            {t.sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                index={index}
                t={t}
                isMobile={true}
              />
            ))}
          </div>
          <div className="mt-4 sm:mt-6 text-xs text-gray-500 italic px-2">
            {t.source}
          </div>
        </section>
      </div>
    );
  }

  // Desktop view
  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section - Clean like team page, NO background image */}
      <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-20 pt-20 sm:pt-24 lg:pt-32">
        <div className="container mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t.pageTitle}
            </h1>

            <div className="w-20 sm:w-32 h-1 bg-gray-900 mx-auto mb-6 sm:mb-8"></div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              {t.pageSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row">
            {/* Table of Contents */}
            <div className="lg:w-1/4 mb-6 sm:mb-8 lg:mb-0">
              <TableOfContents
                sections={t.sections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>

            {/* Content */}
            <motion.div
              className="lg:w-3/4 lg:pl-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-12">
                {t.sections.map((section, index) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    index={index}
                    t={t}
                    isMobile={false}
                  />
                ))}
              </div>
              <div className="mt-8 text-sm text-gray-500 italic">
                {t.source}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

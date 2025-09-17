"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
// import Image from "next/image";
import Image from "next/image";
import {
  // FaBriefcase,
  FaUsers,
  // FaArrowRight,
  // FaGraduationCap,
  // FaChartLine,
  FaStar,
  FaHandshake,
  FaDollarSign,
  FaUserTie,
  FaLightbulb,
  FaHeart,
  FaRocket,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  // FaEye,
  // FaPaperPlane,
} from "react-icons/fa";

export default function CareersPage() {
  const { language } = useLanguage();

  const translations = {
    en: {
      pageTitle: "Careers",
      heroTitle: "Build Your Career in Wealth Management",
      heroSubtitle: "Join Our Team of Financial Professionals",
      heroDescription:
        "Discover rewarding career opportunities at Seeds Financial Group. We're committed to developing the next generation of wealth management professionals through comprehensive training, mentorship, and growth opportunities.",
      whyWealthTitle: "Why Choose Wealth Management?",
      whyWealthDescription:
        "Before anything else, it's important to understand that Wealth Management is a specialized investment-advisory that offers advice and financial services to high-net-worth-individuals (HNWI), small business owners and families, making it one of most popular and distinctive fields within the financial sector. Here are 7 reasons that make wealth management an exciting career and why you should pursue it.",
      currentOpportunitiesTitle: "Current Opportunities",
      currentOpportunitiesDescription:
        "Join our dynamic team and start your journey in wealth management with comprehensive training and mentorship.",
      viewDetails: "View Details",
      viewOpportunities: "View Opportunities",
      apply: "",
      internSharingTitle: "Intern/Members Sharing Experience",
      internSharingDescription: "Discover what it's like to be part of our team through the experiences of our interns and members.",
      swipeHint: "Swipe left or right to navigate videos",
      featuredVideoTitle: "Featured Video",
      featuredVideoDescription: "Learn more about wealth management opportunities",
      wendyVideoCaption: "Wendy Lee sharing insights from one of her insurance experience journeys",
      hearFromInternsTitle: "Hear from Our Interns",
      hearFromInternsDescription:
        "Discover what it's like to start your career with Seeds Financial Group.",
      videoPlaceholder: "Intern testimonial video will be embedded here",
      videoNote: "(Video link to be provided)",
      reasons: [
        {
          title: "Making a Difference",
          description:
            "Being a wealth manager provides you an opportunity to make life-changing impact on your client's life as you offer advice that fundamentally delivers a solution to help and empower them to meet their financial priorities, aspirations and goals, ultimately contributing to the economy in general. These alone can be extraordinarily fulfilling.",
        },
        {
          title: "Self-Development",
          description:
            "Being a wealth manager will push you to develop your communication, interpersonal, negotiation, problem-solving, team-work, leadership and entrepreneurial skills. These core competencies will get you very, very far in life.",
        },
        {
          title: "Financial Creativity and Innovation",
          description:
            "Getting access and exposure to variety of financial planning, investment, management products and services not only makes you financially smart yourself but also gives you a window of opportunity to innovate and create new solutions.",
        },
        {
          title: "A Career to be Proud Of",
          description:
            "Similar to being a doctor, lawyers, bankers, etc. being wealth manager offers a opportunity for you to build a career and a status you can be proud of.",
        },
        {
          title: "Lifetime Professional and Social Relationship",
          description:
            "Being a financial advisor and wealth manager to someone generates lifelong value and makes you a unique partner as you guide your client through ever-changing situations and financial needs.",
        },
        {
          title: "Earning Potentials",
          description:
            "It's not surprising that every financial firm has made wealth management a priority and constantly hiring financial advisors. It's rapidly growing with high earning potential, bringing a win-win situation to every stakeholder.",
        },
        {
          title: "Business Ownership",
          description:
            "Having an entrepreneurial mindset and successfully creating your own client based creates a path for you to be your boss and a business owner.",
        },
      ],
      jobs: [
        {
          id: "wealth-management-intern",
          title: "Wealth Management Intern",
          titleChinese:
            "見習財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          description:
            "Are you passionate about finance and eager to kickstart your career in wealth management? We're looking for motivated and talented interns to join our dynamic team.",
          details:
            "As a Wealth Management Intern, you'll gain hands-on experience in financial analysis, asset allocation, and client advisory services. You'll work closely with seasoned professionals, learning the ins and outs of portfolio management, risk assessment, and strategic planning.",
          training:
            "This is an excellent opportunity to develop your skills, grow your network, and make a meaningful impact on our clients' financial futures.",
          note: "Comprehensive and continuous training provided with mentorship from experienced professionals.",
        },
        {
          id: "wealth-management-manager",
          title: "Wealth Management Manager",
          titleChinese:
            "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          description:
            "Seeds Financial Group in partnership with one of the world's largest financial groups provides advisory services using a wide range of risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
          details:
            "We are committed to delivering exceptional service that adds real value to our clients' lives and we are constantly looking for driven and hardworking individuals to join our collaborative team.",
          training:
            "Application is open for driven fresh graduates, career changers and individuals with related experience. Comprehensive training provided.",
          note: "This position offers significant growth opportunities and the potential to build a substantial career in wealth management.",
        },
        {
          id: "wealth-management-director",
          title: "Wealth Management Director",
          titleChinese:
            "財富策劃總監 (歡迎經驗人士/企業客戶經理/海外畢業回流/IANG/受養人簽證)",
          description:
            "Are you an experienced professional looking to take your career to the next level? Join our leadership team as a Wealth Management Director.",
          details:
            "Lead a team of wealth management professionals while directly managing high-net-worth client relationships. This role combines strategic leadership with hands-on client advisory services.",
          training:
            "Advanced training in leadership, team management, and sophisticated wealth management strategies for high-net-worth individuals.",
          note: "Ideal for experienced professionals seeking senior leadership opportunities with competitive compensation and equity participation.",
        },
      ],
    },
    "zh-HK": {
      pageTitle: "職業機會",
      heroTitle: "在財富管理領域建立您的職業生涯",
      heroSubtitle: "加入我們的金融專業團隊",
      heroDescription:
        "探索Seeds Financial Group的精彩職業機會。我們致力於通過全面的培訓、指導和成長機會來培養下一代財富管理專業人士。",
      whyWealthTitle: "為什麼選擇財富管理？",
      whyWealthDescription:
        "首先，重要的是要了解財富管理是一個專門的投資諮詢領域，為高淨值個人(HNWI)、小企業主和家庭提供建議和金融服務，使其成為金融領域最受歡迎和最具特色的領域之一。以下是財富管理成為令人興奮的職業以及您應該追求它的7個原因。",
      currentOpportunitiesTitle: "當前機會",
      currentOpportunitiesDescription:
        "加入我們充滿活力的團隊，通過全面的培訓和指導開始您的財富管理之旅。",
      viewDetails: "查看詳情",
      viewOpportunities: "查看機會",
      apply: "",
      internSharingTitle: "實習生/成員經驗分享",
      internSharingDescription: "通過我們實習生和成員的經驗，了解成為我們團隊一員的感受。",
      swipeHint: "左右滑動以瀏覽視頻",
      featuredVideoTitle: "精選視頻",
      featuredVideoDescription: "了解更多財富管理機會",
      wendyVideoCaption: "Wendy Lee 分享她的保險經驗心得",
      hearFromInternsTitle: "聽聽我們實習生的心聲",
      hearFromInternsDescription:
        "了解在Seeds Financial Group開始職業生涯的感受。",
      videoPlaceholder: "實習生推薦視頻將在此嵌入",
      videoNote: "（待提供視頻鏈接）",
      reasons: [
        {
          title: "創造影響",
          description:
            "作為財富經理，您有機會對客戶的生活產生改變人生的影響，因為您提供的建議從根本上提供解決方案，幫助並賦權他們實現財務優先事項、願望和目標，最終為整體經濟做出貢獻。僅此一點就能帶來非凡的滿足感。",
        },
        {
          title: "自我發展",
          description:
            "作為財富經理將推動您發展溝通、人際關係、談判、解決問題、團隊合作、領導力和創業技能。這些核心能力將使您在人生中走得很遠。",
        },
        {
          title: "金融創意和創新",
          description:
            "接觸和了解各種財務規劃、投資、管理產品和服務，不僅讓您自己在財務上變得聰明，還為您提供創新和創造新解決方案的機會窗口。",
        },
        {
          title: "值得驕傲的職業",
          description:
            "類似於成為醫生、律師、銀行家等，成為財富經理為您提供了建立一個您可以為之驕傲的職業和地位的機會。",
        },
        {
          title: "終身專業和社會關係",
          description:
            "成為某人的財務顧問和財富經理會產生終身價值，使您成為獨特的合作夥伴，因為您指導客戶度過不斷變化的情況和財務需求。",
        },
        {
          title: "收入潛力",
          description:
            "毫不奇怪，每家金融公司都將財富管理作為優先事項並不斷招聘財務顧問。它正在快速增長，具有高收入潛力，為每個利益相關者帶來雙贏局面。",
        },
        {
          title: "企業所有權",
          description:
            "具有創業心態並成功創建自己的客戶基礎，為您成為老闆和企業主開闢了道路。",
        },
      ],
      jobs: [
        {
          id: "wealth-management-intern",
          title: "見習財富策劃經理",
          titleChinese:
            "Wealth Management Intern (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          description:
            "您對金融充滿熱情並渴望在財富管理領域開啟職業生涯嗎？我們正在尋找積極主動且才華橫溢的實習生加入我們充滿活力的團隊。",
          details:
            "作為財富管理實習生，您將獲得財務分析、資產配置和客戶諮詢服務的實踐經驗。您將與經驗豐富的專業人士密切合作，學習投資組合管理、風險評估和戰略規劃的來龍去脈。",
          training:
            "這是發展技能、擴展網絡並對客戶財務未來產生有意義影響的絕佳機會。",
          note: "提供全面和持續的培訓，並有經驗豐富的專業人士指導。",
        },
        {
          id: "wealth-management-manager",
          title: "財富策劃經理",
          titleChinese:
            "Wealth Management Manager (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
          description:
            "Seeds Financial group與世界最大的金融集團之一合作，使用廣泛的風險管理、策略和資產配置計劃提供諮詢服務，使我們的客戶能夠實現他們的財務目標和未來需求。",
          details:
            "我們致力於提供為客戶生活增加真正價值的卓越服務，我們不斷尋找有動力和勤奮的個人加入我們的協作團隊。",
          training:
            "歡迎有動力的應屆畢業生、轉行人士和有相關經驗的個人申請。提供全面培訓。",
          note: "此職位提供重大的成長機會和在財富管理領域建立重要職業的潛力。",
        },
        {
          id: "wealth-management-director",
          title: "財富策劃總監",
          titleChinese:
            "Wealth Management Director (歡迎經驗人士/企業客戶經理/海外畢業回流/IANG/受養人簽證)",
          description:
            "您是一位經驗豐富的專業人士，希望將職業生涯提升到新的水平嗎？以財富管理總監的身份加入我們的領導團隊。",
          details:
            "領導財富管理專業團隊，同時直接管理高淨值客戶關係。此角色結合了戰略領導與實際客戶諮詢服務。",
          training:
            "在領導力、團隊管理以及針對高淨值個人的複雜財富管理策略方面的高級培訓。",
          note: "適合尋求高級領導機會並享有競爭性薪酬和股權參與的經驗豐富專業人士。",
        },
      ],
    },
  };

  const t = translations[language];

  // Video data for the carousel
  const videos = [
    {
      id: "ugKwnuLrD7I",
      title: "Original Intern Experience",
      description: "The original intern sharing experience video"
    },
    {
      id: "gkBgleZ0Sm8",
      title: "Intern/Member Sharing #1",
      description: "Additional team member experience"
    },
    {
      id: "UGD8FRl0Dfo",
      title: "Intern/Member Sharing #2", 
      description: "Another team member perspective"
    },
    {
      id: "y1EhJ1HKF6k",
      title: "Intern/Member Sharing #3",
      description: "More insights from our team"
    },
    {
      id: "1NCJtZ4G0aQ",
      title: "Intern/Member Sharing #4",
      description: "Team member journey sharing"
    },
    {
      id: "XX9FEeNz_Vs",
      title: "Intern/Member Sharing #5",
      description: "Professional development story"
    },
    {
      id: "sJU2wSLYqLg",
      title: "Intern/Member Sharing #6",
      description: "Career growth experience"
    }
  ];

  // State for video carousel
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextVideo();
    } else if (isRightSwipe) {
      prevVideo();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevVideo();
      } else if (e.key === 'ArrowRight') {
        nextVideo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const reasonsWithIcons = [
    { icon: FaHeart, ...t.reasons[0] },
    { icon: FaRocket, ...t.reasons[1] },
    { icon: FaLightbulb, ...t.reasons[2] },
    { icon: FaStar, ...t.reasons[3] },
    { icon: FaHandshake, ...t.reasons[4] },
    { icon: FaDollarSign, ...t.reasons[5] },
    { icon: FaUserTie, ...t.reasons[6] },
  ];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium tracking-wide">
                  {t.heroSubtitle}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                {t.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document
                      .getElementById("opportunities-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t.viewOpportunities}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[250px] md:h-[400px]">
                  <iframe
                    src="https://www.youtube.com/embed/SYHptynxjQ0"
                    title="Wendy's Insurance Experience Sharing"
                    width="100%"
                    height="100%"
                    className="w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Video Caption */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 italic">
                  {t.wendyVideoCaption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intern/Members Video Carousel Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
              {t.internSharingTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 leading-relaxed px-4">
              {t.internSharingDescription}
            </p>
            
            {/* Video Carousel */}
            <div className="relative">
              {/* Main Video Display */}
              <div className="max-w-4xl mx-auto mb-8">
                <div 
                  className="relative rounded-xl overflow-hidden shadow-2xl bg-black"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id}`}
                    title={videos[currentVideoIndex].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                  ></iframe>
                  
                  {/* Navigation Arrows - Mobile Only */}
                  <button
                    onClick={prevVideo}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 z-10 touch-manipulation md:hidden"
                    aria-label="Previous video"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={nextVideo}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 z-10 touch-manipulation md:hidden"
                    aria-label="Next video"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Video Thumbnails/Dots Navigation */}
              <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`flex-shrink-0 w-20 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 touch-manipulation ${
                      index === currentVideoIndex
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {/* YouTube Thumbnail */}
                    <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <FaPlay className="absolute text-white text-xs opacity-80" />
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Video Counter */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {currentVideoIndex + 1} of {videos.length}
                </span>
                
                {/* Mobile swipe hint */}
                <div className="mt-2 md:hidden">
                  <p className="text-xs text-gray-500">
                    {t.swipeHint}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Separator */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-16 h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {t.whyWealthTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.whyWealthDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reasonsWithIcons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-white rounded-lg shadow-sm">
                    <reason.icon className="text-2xl text-gray-700" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t.featuredVideoTitle}
            </h2>
            
            {/* Featured Video */}
            <div className="relative max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[250px] md:h-[450px]">
                  <iframe
                    src="https://www.youtube.com/embed/StE1WDLayMY"
                    title="Why Choose Wealth Management - Featured Video"
                    width="100%"
                    height="100%"
                    className="w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Separator */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-16 h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities Section */}
      <section id="opportunities-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.currentOpportunitiesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.currentOpportunitiesDescription}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {t.jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {job.titleChinese}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {job.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {job.details}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {job.training}
                    </p>
                    <p className="text-gray-700 leading-relaxed font-medium text-sm">
                      {job.note}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/careers/${job.id}`}
                      className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

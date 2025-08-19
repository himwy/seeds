"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSeedling } from "react-icons/fa";
import Image from "next/image";

// Types
interface Episode {
  id: number;
  title: string;
  content: string;
  images: string[];
}

interface Translation {
  pageTitle: string;
  pageSubtitle: string;
  episodes: Episode[];
  controls: {
    previous: string;
    next: string;
    episode: string;
  };
}

// Translations
const translations: Record<string, Translation> = {
  en: {
    pageTitle: "The Story of Seeds",
    pageSubtitle:
      "An 8-Episode Journey of Growth, Dreams, and Financial Freedom",
    episodes: [
      {
        id: 1,
        title: "Episode 1: The Fresh Graduate",
        content:
          "As a recent graduate entering the workforce, this is an important stage of life. While your experience may not yet be extensive, you possess unlimited potential and innovative thinking.\n\nAs a newcomer, you should make full use of this time to learn new skills, adapt to the work environment, and actively face various challenges. Most importantly, don't be afraid of failure, as it's a necessary path to growth. Through continuous attempts and efforts, you will be able to unleash your talents and gradually achieve your personal career goals.",
        images: [],
      },
      {
        id: 2,
        title: "Episode 2: Career Development",
        content:
          "Career development requires careful planning and continuous learning. This stage involves building professional networks, acquiring new skills, and taking on greater responsibilities.\n\nSuccess comes from dedication, perseverance, and the ability to adapt to changing circumstances. Focus on building your expertise while maintaining a balance between work and personal life.",
        images: [],
      },
      {
        id: 3,
        title: "Episode 3: Building Relationships",
        content:
          "Strong relationships are the foundation of both personal and professional success. This episode explores the importance of networking, mentorship, and building meaningful connections.\n\nInvest time in understanding others, offering help when possible, and maintaining long-term relationships that can provide mutual benefits throughout your career journey.",
        images: [],
      },
      {
        id: 4,
        title: "Episode 4: Taking Risks",
        content:
          "Growth often requires stepping out of your comfort zone and taking calculated risks. This episode discusses how to evaluate opportunities and make bold decisions.\n\nLearn to distinguish between unnecessary risks and strategic opportunities that can accelerate your personal and professional development.",
        images: [],
      },
      {
        id: 5,
        title: "Episode 5: Leadership",
        content:
          "Leadership is not just about managing others, but about inspiring and empowering people around you. This episode covers the essential qualities of effective leadership.\n\nDevelop your ability to communicate vision, motivate teams, and create environments where everyone can thrive and contribute their best work.",
        images: [],
      },
      {
        id: 6,
        title: "Episode 6: Financial Wisdom",
        content:
          "Understanding finances is crucial for long-term success and security. This episode provides insights into budgeting, investing, and financial planning.\n\nDevelop healthy financial habits early in your career to ensure stability and create opportunities for future growth and independence.",
        images: [],
      },
      {
        id: 7,
        title: "Episode 7: Personal Growth",
        content:
          "Continuous personal development is key to achieving your full potential. This episode focuses on self-reflection, goal setting, and maintaining motivation.\n\nRegularly assess your progress, adapt your strategies, and remain committed to learning and improving throughout your journey.",
        images: [],
      },
      {
        id: 8,
        title: "Episode 8: Financial Freedom & Dreams",
        content:
          "Financial planning is the key step to achieving financial freedom. By establishing and implementing effective financial plans early, you can reach financial freedom faster and reduce economic stress in life.\n\nWhen finances are no longer a burden, you can focus on pursuing your dreams, investing more time and energy into realizing your ideals. Start financial planning early - it not only secures your future but also gives you the freedom and ability to pursue your dreams.",
        images: [],
      },
    ],
    controls: {
      previous: "Previous",
      next: "Next",
      episode: "Episode",
    },
  },
  zh: {
    pageTitle: "白籽的故事",
    pageSubtitle: "成長、夢想與財務自由的 8 集旅程",
    episodes: [
      {
        id: 1,
        title: "第 1 集：初出茅廬的大學畢業生",
        content:
          "身為一個剛進入職場的大學畢業生，這是人生中重要的階段。雖然你的經驗可能還不夠豐富，但你擁有無限的潛力和創新思維。\n\n作為一個職場新人，你應該充分利用這段時間來學習新技能、適應工作環境，並積極面對各種挑戰。最重要的是，不要害怕失敗，因為這是成長過程中必經的道路。透過不斷的嘗試和努力，你將能夠發揮自己的才能，並逐步實現個人的職業目標。",
        images: [],
      },
      {
        id: 2,
        title: "第 2 集：職業發展",
        content:
          "職業發展需要謹慎的規劃和持續學習。這個階段涉及建立專業網絡、獲得新技能，以及承擔更大的責任。\n\n成功來自於奉獻、毅力，以及適應變化環境的能力。專注於建立你的專業知識，同時保持工作與個人生活的平衡。",
        images: [],
      },
      {
        id: 3,
        title: "第 3 集：建立人際關係",
        content:
          "強大的人際關係是個人和職業成功的基礎。這一集探討了網絡建設、指導關係和建立有意義聯繫的重要性。\n\n投入時間了解他人，在可能的時候提供幫助，並維護能在你的職業旅程中提供相互利益的長期關係。",
        images: [],
      },
      {
        id: 4,
        title: "第 4 集：勇於冒險",
        content:
          "成長往往需要走出舒適區並承擔經過計算的風險。這一集討論如何評估機會並做出大膽的決定。\n\n學會區分不必要的風險和能夠加速你個人和職業發展的策略性機會。",
        images: [],
      },
      {
        id: 5,
        title: "第 5 集：領導力",
        content:
          "領導力不僅僅是管理他人，更是關於激勵和賦權周圍的人。這一集涵蓋了有效領導的基本品質。\n\n培養你溝通願景、激勵團隊的能力，創造每個人都能茁壯成長並貢獻最佳工作的環境。",
        images: [],
      },
      {
        id: 6,
        title: "第 6 集：財務智慧",
        content:
          "理解財務對於長期成功和安全至關重要。這一集提供了預算、投資和財務規劃的見解。\n\n在職業生涯早期培養健康的財務習慣，以確保穩定並為未來的成長和獨立創造機會。",
        images: [],
      },
      {
        id: 7,
        title: "第 7 集：個人成長",
        content:
          "年輕人應該透過深入了解自己的優勢與劣勢，來制定適合自己的成長路徑。只有清楚地認識自己，才能更有針對性地提升能力和克服挑戰。同時，不斷地自我學習和精進專業知識，配合長期規劃，才能夠有效地朝著目標邁進。\n\n遇到問題時，通過這種有意識的自我提升和前瞻性計劃，將能夠找到合適的解決方案，最終實現個人目標和理想。",
        images: [],
      },
      {
        id: 8,
        title: "第 8 集：財務自由與夢想",
        content:
          "財務規劃是實現財務自由的關鍵步驟。透過早日制定和實施有效的財務計劃，你可以更快地達到財務自由，從而減輕生活中的經濟壓力。當財務不再成為你的負擔，你便能專注於追尋屬於自己的夢想，投入更多的時間和精力去實現心中的理想。\n\n提早開始財務規劃，不僅能保障你的未來，更能讓你擁有追求夢想的自由和能力。因此，現在就是最佳時機，開始為你的財務自由和夢想努力吧！",
        images: [],
      },
    ],
    controls: {
      previous: "上一頁",
      next: "下一頁",
      episode: "集",
    },
  },
};

// Generate image paths for each episode with correct file names
const generateEpisodeImages = (episodeNum: number): string[] => {
  const episodeImages: Record<number, string[]> = {
    1: [
      "/assets/Seeds Story/IG-01/seeds-1.1.png",
      "/assets/Seeds Story/IG-01/seeds-1.2.png",
      "/assets/Seeds Story/IG-01/seeds-1.3.png",
      "/assets/Seeds Story/IG-01/seeds-1.4.png",
    ],
    2: [
      "/assets/Seeds Story/IG-02/seeds-2.1-2.png",
      "/assets/Seeds Story/IG-02/seeds-2.2-2.png",
      "/assets/Seeds Story/IG-02/seeds-2.3-2.png",
      "/assets/Seeds Story/IG-02/seeds-2.4-2.png",
    ],
    3: [
      "/assets/Seeds Story/IG-03/seeds-3.1.png",
      "/assets/Seeds Story/IG-03/seeds-3.2.png",
      "/assets/Seeds Story/IG-03/seeds-3.3.png",
    ],
    4: [
      "/assets/Seeds Story/IG-04/seeds-4.1-alt.png",
      "/assets/Seeds Story/IG-04/seeds-4.2-2.png",
      "/assets/Seeds Story/IG-04/seeds-4.3-2.png",
      "/assets/Seeds Story/IG-04/seeds-4.4-2.png",
      "/assets/Seeds Story/IG-04/seeds-4.5-2.png",
    ],
    5: [
      "/assets/Seeds Story/IG-05/seeds-5.1.jpg",
      "/assets/Seeds Story/IG-05/seeds-5.2.jpg",
      "/assets/Seeds Story/IG-05/seeds-5.3.png",
      "/assets/Seeds Story/IG-05/seeds-5.4.png",
    ],
    6: [
      "/assets/Seeds Story/IG-06/seeds-6.1.jpg",
      "/assets/Seeds Story/IG-06/seeds-6.2.jpg",
      "/assets/Seeds Story/IG-06/seeds-6.3.png",
    ],
    7: [
      "/assets/Seeds Story/IG-07/seeds-7.1.jpg",
      "/assets/Seeds Story/IG-07/seeds-7.2.jpg",
      "/assets/Seeds Story/IG-07/seeds-7.3.png",
      "/assets/Seeds Story/IG-07/seeds-7.4.jpg",
    ],
    8: [
      "/assets/Seeds Story/IG-08/seeds-8.1.png",
      "/assets/Seeds Story/IG-08/seeds-8.2.png",
      "/assets/Seeds Story/IG-08/seeds-8.3.png",
      "/assets/Seeds Story/IG-08/seeds-8.4.png",
      "/assets/Seeds Story/IG-08/seeds-8.5.png",
    ],
  };

  return episodeImages[episodeNum] || [];
};

export default function SeedsStoryPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Create episodes with images
  const episodes: Episode[] = t.episodes.map((ep: EpisodeData) => ({
    ...ep,
    images: generateEpisodeImages(ep.id),
  }));

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const currentEp = episodes[currentEpisode];
    if (currentSlide < currentEp.images.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (currentEpisode < episodes.length - 1) {
      setCurrentEpisode((prev) => prev + 1);
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else if (currentEpisode > 0) {
      setCurrentEpisode((prev) => prev - 1);
      setCurrentSlide(episodes[currentEpisode - 1].images.length - 1);
    }
  };

  const goToEpisode = (episodeIndex: number) => {
    setCurrentEpisode(episodeIndex);
    setCurrentSlide(0);
  };

  const currentEp = episodes[currentEpisode];

  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden pb-16">
        {/* Clean Simple Header */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-16 mt-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <FaSeedling className="text-4xl text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-4">
                {t.pageTitle}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t.pageSubtitle}
              </p>
              <div className="h-1 w-16 bg-green-600 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Episode Navigation */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {t.controls.episode} {currentEpisode + 1}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {episodes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEpisode(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    index === currentEpisode
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Image Display */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image Slideshow */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentEpisode}-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentEp.images[currentSlide]}
                      alt={`${currentEp.title} - Slide ${currentSlide + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={currentEpisode === 0 && currentSlide === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-70 transition-all"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={
                    currentEpisode === episodes.length - 1 &&
                    currentSlide === currentEp.images.length - 1
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-70 transition-all"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {currentEp.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Episode Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentEp.title}
                </h3>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  {currentEp.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Desktop Version
  return (
    <div className="w-full overflow-x-hidden pb-16">
      {/* Clean Simple Header */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <FaSeedling className="text-5xl text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-6">
              {t.pageTitle}
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              {t.pageSubtitle}
            </p>
            <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Episode Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {t.controls.episode} {currentEpisode + 1}
          </h2>
          <div className="flex justify-center gap-3">
            {episodes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEpisode(index)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                  index === currentEpisode
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Display */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentEpisode}-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentEp.images[currentSlide]}
                      alt={`${currentEp.title} - Slide ${currentSlide + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={currentEpisode === 0 && currentSlide === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-70 transition-all"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={
                    currentEpisode === episodes.length - 1 &&
                    currentSlide === currentEp.images.length - 1
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-70 transition-all"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {currentEp.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Episode Content */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {currentEp.title}
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-6 text-lg">
                {currentEp.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Simple slide counter */}
              <div className="mt-6 text-sm text-gray-500 text-center">
                Slide {currentSlide + 1} of {currentEp.images.length}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

interface EpisodeData {
  id: number;
  title: string;
  content: string;
}

interface Translation {
  pageTitle: string;
  pageSubtitle: string;
  episodes: EpisodeData[];
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
      },
      {
        id: 2,
        title: "Episode 2: Career Development",
        content:
          "Career development requires careful planning and continuous learning. This stage involves building professional networks, acquiring new skills, and taking on greater responsibilities.\n\nSuccess comes from dedication, perseverance, and the ability to adapt to changing circumstances. Focus on building your expertise while maintaining a balance between work and personal life.",
      },
      {
        id: 3,
        title: "Episode 3: Building Relationships",
        content:
          "Strong relationships are the foundation of both personal and professional success. This episode explores the importance of networking, mentorship, and building meaningful connections.\n\nInvest time in understanding others, offering help when possible, and maintaining long-term relationships that can provide mutual benefits throughout your career journey.",
      },
      {
        id: 4,
        title: "Episode 4: Taking Risks",
        content:
          "Growth often requires stepping out of your comfort zone and taking calculated risks. This episode discusses how to evaluate opportunities and make bold decisions.\n\nLearn to distinguish between unnecessary risks and strategic opportunities that can accelerate your personal and professional development.",
      },
      {
        id: 5,
        title: "Episode 5: Leadership",
        content:
          "Leadership is not just about managing others, but about inspiring and empowering people around you. This episode covers the essential qualities of effective leadership.\n\nDevelop your ability to communicate vision, motivate teams, and create environments where everyone can thrive and contribute their best work.",
      },
      {
        id: 6,
        title: "Episode 6: Financial Wisdom",
        content:
          "Understanding finances is crucial for long-term success and security. This episode provides insights into budgeting, investing, and financial planning.\n\nDevelop healthy financial habits early in your career to ensure stability and create opportunities for future growth and independence.",
      },
      {
        id: 7,
        title: "Episode 7: Personal Growth",
        content:
          "Continuous personal development is key to achieving your full potential. This episode focuses on self-reflection, goal setting, and maintaining motivation.\n\nRegularly assess your progress, adapt your strategies, and remain committed to learning and improving throughout your journey.",
      },
      {
        id: 8,
        title: "Episode 8: Financial Freedom & Dreams",
        content:
          "Financial planning is the key step to achieving financial freedom. By establishing and implementing effective financial plans early, you can reach financial freedom faster and reduce economic stress in life.\n\nWhen finances are no longer a burden, you can focus on pursuing your dreams, investing more time and energy into realizing your ideals. Start financial planning early - it not only secures your future but also gives you the freedom and ability to pursue your dreams.",
      },
    ],
    controls: {
      previous: "Previous",
      next: "Next",
      episode: "Episode",
    },
  },
  "zh-HK": {
    pageTitle: "白籽的故事",
    pageSubtitle: "成長、夢想與財務自由的 8 集旅程",
    episodes: [
      {
        id: 1,
        title: "第 1 集：初出茅廬的大學畢業生",
        content:
          "身為一個剛進入職場的大學畢業生，這是人生中重要的階段。雖然你的經驗可能還不夠豐富，但你擁有無限的潛力和創新思維。\n\n作為一個職場新人，你應該充分利用這段時間來學習新技能、適應工作環境，並積極面對各種挑戰。最重要的是，不要害怕失敗，因為這是成長過程中必經的道路。透過不斷的嘗試和努力，你將能夠發揮自己的才能，並逐步實現個人的職業目標。",
      },
      {
        id: 2,
        title: "第 2 集：職業發展",
        content:
          "職業發展需要謹慎的規劃和持續學習。這個階段涉及建立專業網絡、獲得新技能，以及承擔更大的責任。\n\n成功來自於奉獻、毅力，以及適應變化環境的能力。專注於建立你的專業知識，同時保持工作與個人生活的平衡。",
      },
      {
        id: 3,
        title: "第 3 集：建立人際關係",
        content:
          "強大的人際關係是個人和職業成功的基礎。這一集探討了網絡建設、指導關係和建立有意義聯繫的重要性。\n\n投入時間了解他人，在可能的時候提供幫助，並維護能在你的職業旅程中提供相互利益的長期關係。",
      },
      {
        id: 4,
        title: "第 4 集：勇於冒險",
        content:
          "成長往往需要走出舒適區並承擔經過計算的風險。這一集討論如何評估機會並做出大膽的決定。\n\n學會區分不必要的風險和能夠加速你個人和職業發展的策略性機會。",
      },
      {
        id: 5,
        title: "第 5 集：領導力",
        content:
          "領導力不僅僅是管理他人，更是關於激勵和賦權周圍的人。這一集涵蓋了有效領導的基本品質。\n\n培養你溝通願景、激勵團隊的能力，創造每個人都能茁壯成長並貢獻最佳工作的環境。",
      },
      {
        id: 6,
        title: "第 6 集：財務智慧",
        content:
          "理解財務對於長期成功和安全至關重要。這一集提供了預算、投資和財務規劃的見解。\n\n在職業生涯早期培養健康的財務習慣，以確保穩定並為未來的成長和獨立創造機會。",
      },
      {
        id: 7,
        title: "第 7 集：個人成長",
        content:
          "年輕人應該透過深入了解自己的優勢與劣勢，來制定適合自己的成長路徑。只有清楚地認識自己，才能更有針對性地提升能力和克服挑戰。同時，不斷地自我學習和精進專業知識，配合長期規劃，才能夠有效地朝著目標邁進。\n\n遇到問題時，通過這種有意識的自我提升和前瞻性計劃，將能夠找到合適的解決方案，最終實現個人目標和理想。",
      },
      {
        id: 8,
        title: "第 8 集：財務自由與夢想",
        content:
          "財務規劃是實現財務自由的關鍵步驟。透過早日制定和實施有效的財務計劃，你可以更快地達到財務自由，從而減輕生活中的經濟壓力。當財務不再成為你的負擔，你便能專注於追尋屬於自己的夢想，投入更多的時間和精力去實現心中的理想。\n\n提早開始財務規劃，不僅能保障你的未來，更能讓你擁有追求夢想的自由和能力。因此，現在就是最佳時機，開始為你的財務自由和夢想努力吧！",
      },
    ],
    controls: {
      previous: "上一頁",
      next: "下一頁",
      episode: "第",
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
  const t = translations[language] || translations.en; // Fallback to English if language not found
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Create episodes with images
  const episodes: Episode[] = t.episodes.map((ep) => ({
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

  // Reset loading state when episode or slide changes
  useEffect(() => {
    setImageLoading(true);
  }, [currentEpisode, currentSlide]);

  // Preload adjacent images for better performance
  useEffect(() => {
    const preloadImages = () => {
      const currentEp = episodes[currentEpisode];
      if (!currentEp) return;

      // Preload next slide in current episode
      if (currentSlide < currentEp.images.length - 1) {
        const nextImage = document.createElement("img");
        nextImage.src = currentEp.images[currentSlide + 1];
      }

      // Preload previous slide in current episode
      if (currentSlide > 0) {
        const prevImage = document.createElement("img");
        prevImage.src = currentEp.images[currentSlide - 1];
      }

      // Preload first image of next episode
      if (
        currentEpisode < episodes.length - 1 &&
        currentSlide === currentEp.images.length - 1
      ) {
        const nextEpImage = document.createElement("img");
        nextEpImage.src = episodes[currentEpisode + 1].images[0];
      }
    };

    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, [currentEpisode, currentSlide, episodes]);

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

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const currentEp = episodes[currentEpisode];

  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden pb-16">
        {/* Enhanced Header */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-20 mt-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-6">
                <FaSeedling className="text-5xl mx-auto mb-4" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight mb-6">
                {t.pageTitle}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t.pageSubtitle}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Episode Navigation */}
        <section className="py-10 bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {language === "en"
                ? `${t.controls.episode} ${currentEpisode + 1}`
                : `第 ${currentEpisode + 1} 集`}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {episodes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEpisode(index)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-md ${
                    index === currentEpisode
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border border-gray-200"
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image Slideshow */}
              <div className="relative aspect-[16/10] bg-gray-100">
                {/* Loading Spinner */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                )}

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
                      className="object-contain p-4"
                      priority
                      onLoad={handleImageLoad}
                      onError={() => setImageLoading(false)}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={currentEpisode === 0 && currentSlide === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 text-gray-800 p-3 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-100 hover:shadow-xl transition-all border border-gray-200"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={
                    currentEpisode === episodes.length - 1 &&
                    currentSlide === currentEp.images.length - 1
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 text-gray-800 p-3 rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-100 hover:shadow-xl transition-all border border-gray-200"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {currentEp.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all border-2 hover:scale-110 ${
                        index === currentSlide
                          ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50"
                          : "bg-white bg-opacity-60 border-white border-opacity-80 hover:bg-opacity-80"
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
      {/* Enhanced Header */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-24 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-8">
              <FaSeedling className="text-6xl mx-auto mb-6" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight mb-8">
              {t.pageTitle}
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-10">
              {t.pageSubtitle}
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Episode Navigation */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white border-b">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {language === "en"
              ? `${t.controls.episode} ${currentEpisode + 1}`
              : `第 ${currentEpisode + 1} 集`}
          </h2>
          <div className="flex justify-center gap-4">
            {episodes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEpisode(index)}
                className={`px-7 py-4 rounded-full text-base font-semibold transition-all shadow-md ${
                  index === currentEpisode
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl transform scale-110"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-lg border border-gray-200 hover:transform hover:scale-105"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Image Display - Takes up 3 columns */}
            <div className="lg:col-span-3 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Loading Spinner */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                  </div>
                )}

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
                      className="object-contain p-4"
                      priority
                      onLoad={handleImageLoad}
                      onError={() => setImageLoading(false)}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={currentEpisode === 0 && currentSlide === 0}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-95 text-gray-800 p-5 rounded-full shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-100 hover:shadow-3xl transition-all border-2 border-gray-200 hover:border-gray-300 hover:scale-110"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  disabled={
                    currentEpisode === episodes.length - 1 &&
                    currentSlide === currentEp.images.length - 1
                  }
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-95 text-gray-800 p-5 rounded-full shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-100 hover:shadow-3xl transition-all border-2 border-gray-200 hover:border-gray-300 hover:scale-110"
                >
                  <FaChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {currentEp.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all border-2 hover:scale-110 ${
                        index === currentSlide
                          ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50"
                          : "bg-white bg-opacity-60 border-white border-opacity-80 hover:bg-opacity-80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Episode Content - Takes up 2 columns */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center pb-6 border-b border-gray-200 mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                  {currentEp.title}
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4 text-base">
                {currentEp.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Enhanced slide counter */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full shadow-inner border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    {language === "en"
                      ? `Slide ${currentSlide + 1} of ${
                          currentEp.images.length
                        }`
                      : `第 ${currentSlide + 1} 張 / 共 ${
                          currentEp.images.length
                        } 張`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

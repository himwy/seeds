"use client";


import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./components/LanguageContext";
import {
  FaShieldAlt,
  FaGraduationCap,
  FaMoneyBillWave,
  FaMedkit,
  FaPlane,
  FaHeart,
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaImages,
} from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { ReactNode, CSSProperties, MouseEvent } from "react";
import { EventsService, Event } from "./lib/eventsService";

// Types
interface ServiceData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  key: keyof ServiceTranslations;
}

interface ServiceTranslations {
  criticalIllness: { title: string; description: string };
  education: { title: string; description: string };
  annuity: { title: string; description: string };
  medical: { title: string; description: string };
  travel: { title: string; description: string };
  life: { title: string; description: string };
}

interface ServicesSection {
  title: string;
  description: string;
  criticalIllness: { title: string; description: string };
  education: { title: string; description: string };
  annuity: { title: string; description: string };
  medical: { title: string; description: string };
  travel: { title: string; description: string };
  life: { title: string; description: string };
}

interface TranslationData {
  hero: {
    title: string;
    description: string;
    exploreButton: string;
    contactButton: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    learnMoreButton: string;
  };
  services: ServicesSection;
  contact: {
    title: string;
    description: string;
    contactButton: string;
    callButton: string;
    serviceHours: string;
    mondayToFriday: string;
    mondayToFridayHours: string;
    saturday: string;
    saturdayHours: string;
    evenings: string;
    eveningHours: string;
    address: string;
    addressValue: string;
  };
}

interface ContactButtonProps {
  href: string;
  className: string;
  children: ReactNode;
  style: CSSProperties;
  onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
}

interface ServiceCardProps {
  service: ServiceData;
  t: TranslationData;
}

// Service data for better maintainability
const serviceData: ServiceData[] = [
  {
    id: "criticalIllness",
    icon: FaShieldAlt,
    key: "criticalIllness",
  },
  {
    id: "education",
    icon: FaGraduationCap,
    key: "education",
  },
  {
    id: "annuity",
    icon: FaMoneyBillWave,
    key: "annuity",
  },
  {
    id: "medical",
    icon: FaMedkit,
    key: "medical",
  },
  {
    id: "travel",
    icon: FaPlane,
    key: "travel",
  },
  {
    id: "life",
    icon: FaHeart,
    key: "life",
  },
];

// Optimized translations object
const translations = {
  en: {
    hero: {
      title: "Secure Your Financial Future",
      description:
        "Professional financial advisory services to help you achieve your goals and secure your future needs.",
      exploreButton: "Explore Our Services",
      contactButton: "Contact Us",
    },
    about: {
      title: "About Seeds Financial Group",
      description1:
        "Seeds Financial Group is a premier wealth and assets management company that partners with leading global financial institutions. We specialize in comprehensive financial planning, sophisticated investment strategies, and risk management solutions designed to preserve and grow our clients' wealth across generations.",
      description2:
        "We believe every individual, regardless of age, carries the potential for financial growth - like a 'seed' full of promise. Our mission is to nurture this potential through expert guidance, turning aspirations into lasting financial success.",
      learnMoreButton: "Learn More About Us",
    },
    services: {
      title: "Our Financial Services",
      description:
        "We offer a comprehensive range of financial services to help you protect what matters most and plan for a secure future.",
      criticalIllness: {
        title: "Critical Illness Protection",
        description:
          "Critical illness can strike when you least expect it, placing a heavy financial burden on the whole family. With life expectancy rising, there is now an even greater chance of suffering multiple critical illnesses in a lifetime.",
      },
      education: {
        title: "Education Plan",
        description:
          "Education Plan is designed with a specific goal in mind – financing your child's higher education. The plan offers short premium payment terms, opportunities for growth and guaranteed cash payments when your child reaches university age.",
      },
      annuity: {
        title: "Annuity Plan",
        description:
          "A stable guaranteed annuity income stream that you can rely on for your retirement is a must. Our annuity plans are designed to provide financial security during your retirement years.",
      },
      medical: {
        title: "Medical Protection",
        description:
          "In view of rising medical expenses, it is important for you and your family to have adequate hospitalisation protection. Your family responsibilities remain even as you progress with your career.",
      },
      travel: {
        title: "Travel Insurance",
        description:
          "A world of adventure is out there, waiting to be explored. Take iTravel Protect with you for worldwide travel protection that covers all your essential needs, with optional benefits to suit your own itinerary.",
      },
      life: {
        title: "Life Insurance",
        description:
          "Life is unpredictable. As a breadwinner, you will always worry about the wellbeing of your family when mishap unexpectedly happens. Our life insurance plans provide financial security for your loved ones.",
      },
    },
    contact: {
      title: "Ready to Secure Your Financial Future?",
      description:
        "Our team of financial advisors is ready to help you achieve your financial goals. Contact us today to schedule a consultation.",
      contactButton: "Contact Us",
      callButton: "Call Us: (852) 5530-4114",
      serviceHours: "Service Hours",
      mondayToFriday: "Monday - Friday:",
      mondayToFridayHours: "8:30 am to 5:30 pm",
      saturday: "Saturday:",
      saturdayHours: "9:00 am to 12:00 pm",
      evenings: "Evenings:",
      eveningHours: "By appointment",
      address: "Address:",
      addressValue:
        "17/F, Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",
    },
  },
  "zh-HK": {
    hero: {
      title: "保障您的財務未來",
      description: "專業理財顧問服務，幫助您實現目標並確保未來需求。",
      exploreButton: "探索我們的服務",
      contactButton: "聯絡我們",
    },
    about: {
      title: "關於 Seeds Financial Group",
      description1:
        "Seeds Financial Group 與全球最大的金融集團之一合作，提供廣泛的風險管理、策略和資產配置計劃的顧問服務，使我們的客戶能夠實現其財務目標和未來需求。",
      description2:
        "無論一個人的年齡是多少，只要他/她有熱情，我們相信他/她是一顆充滿成長希望的「種子」。我們將盡最大努力為他們提供機會，並精心培育他們，使他們成為一棵強壯的樹。",
      learnMoreButton: "了解更多關於我們",
    },
    services: {
      title: "我們的金融服務",
      description:
        "我們提供全面的金融服務，幫助您保護最重要的事物並規劃安全的未來。",
      criticalIllness: {
        title: "危疾保障",
        description:
          "危疾可能在您最意想不到的時候發生，給整個家庭帶來沉重的經濟負擔。隨著預期壽命的增加，現在在一生中患上多種危疾的可能性更大。",
      },
      education: {
        title: "教育計劃",
        description:
          "教育計劃是為特定目標而設計的 - 為您子女的高等教育提供資金。該計劃提供短期保費支付期限，增長機會和當您的孩子達到大學年齡時的保證現金支付。",
      },
      annuity: {
        title: "年金計劃",
        description:
          "退休時可靠的穩定保證年金收入流是必須的。我們的年金計劃旨在為您的退休年齡提供財務保障。",
      },
      medical: {
        title: "醫療保障",
        description:
          "鑑於醫療費用不斷上漲，您和您的家人擁有足夠的住院保障非常重要。即使您在職業生涯中不斷進步，您的家庭責任仍然存在。",
      },
      travel: {
        title: "旅遊保險",
        description:
          "外面有一個冒險的世界，等待被探索。帶上iTravel Protect，獲得全球旅行保護，涵蓋您所有的基本需求，並提供可選福利以適應您自己的行程。",
      },
      life: {
        title: "人壽保險",
        description:
          "生活是不可預測的。作為一家之主，當意外發生時，您將始終擔心家人的福祉。我們的人壽保險計劃為您所愛的人提供財務保障。",
      },
    },
    contact: {
      title: "準備好保障您的財務未來了嗎？",
      description:
        "我們的財務顧問團隊已準備好幫助您實現財務目標。立即聯絡我們安排諮詢。",
      contactButton: "聯絡我們",
      callButton: "致電：(852) 5530-4114",
      serviceHours: "服務時間",
      mondayToFriday: "星期一至五：",
      mondayToFridayHours: "上午8:30至下午5:30",
      saturday: "星期六：",
      saturdayHours: "上午9:00至中午12:00",
      evenings: "晚間：",
      eveningHours: "預約制",
      address: "地址：",
      addressValue: "香港銅鑼灣恩平道28號利園二期嘉蘭中心17樓",
    },
  },
};

// Contact button component for reusability
const ContactButton: React.FC<ContactButtonProps> = ({
  href,
  className,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => (
  <Link
    href={href}
    className={className}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    {...props}
  >
    {children}
  </Link>
);

// Service card component for reusability
const ServiceCard: React.FC<ServiceCardProps> = ({ service, t }) => {
  const IconComponent = service.icon;
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm min-w-[260px] max-w-[260px]">
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="text-primary text-xl" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-primary">
        {t.services[service.key].title}
      </h3>
      <p className="text-dark-gray text-sm line-clamp-4">
        {t.services[service.key].description}
      </p>
    </div>
  );
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isEventsPaused, setIsEventsPaused] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Load recent events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await EventsService.getEventsByCategory("recent");
        setRecentEvents(events); // Show all events for complete infinite loop
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };
    loadEvents();
  }, []);

  // Continuous smooth auto-scroll functionality with true infinite scrolling
  useEffect(() => {
    if (recentEvents.length <= 1 || isEventsPaused) return;

    const animationFrame = () => {
      setScrollOffset((prevOffset) => {
        const originalEventCount = recentEvents.length;
        // Create enough repetitions to ensure smooth infinite scroll
        const repetitions = Math.max(3, Math.ceil(12 / originalEventCount)); // At least 3 repetitions, more if needed
        const totalSlots = originalEventCount * repetitions;
        const totalGroups = Math.ceil(totalSlots / 3);
        
        // Increment by a small amount for smooth movement
        const newOffset = prevOffset + 0.03; // Smooth speed
        
        // Reset when we've shown one complete cycle of original events
        const oneCompleteReset = (originalEventCount / 3) * 100;
        if (newOffset >= oneCompleteReset) {
          return 0; // Reset to beginning for seamless loop
        }
        
        return newOffset;
      });
    };

    const intervalId = setInterval(animationFrame, 16); // ~60fps for smooth animation

    return () => clearInterval(intervalId);
  }, [recentEvents.length, isEventsPaused]);

  // Update currentEventIndex based on scrollOffset for indicators
  useEffect(() => {
    const currentGroup = Math.floor(scrollOffset / 100);
    setCurrentEventIndex(currentGroup * 3);
  }, [scrollOffset]);

  // Optimized mobile detection with debounce
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in, .slide-in-left, .slide-in-right"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [isMobile]); // Re-run when mobile state changes

  // Memoized contact button handlers
  const contactButtonHandlers = useMemo(
    () => ({
      onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = "#1f2937";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.borderColor = "#1f2937";
      },
      onMouseLeave: (e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "white";
        e.currentTarget.style.borderColor = "white";
      },
    }),
    []
  );

  const contactButtonStyle = {
    backgroundColor: "transparent",
    borderColor: "white",
    color: "white",
  };
  // Mobile view - Fixed to match desktop design exactly
  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden">
        {/* Mobile Hero Section - Match Desktop */}
        <section
          className="relative min-h-screen flex items-center justify-center text-white w-full overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/assets/Home.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-6 text-center z-10 relative">
            <div className="max-w-2xl mx-auto fade-in-up">
              <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-white mb-8 text-lg leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <button
                  onClick={() => {
                    const servicesSection =
                      document.getElementById("services-section");
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="btn-primary text-center w-full"
                >
                  {t.hero.exploreButton}
                </button>
                <ContactButton
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold text-center w-full transition-all duration-300"
                  style={contactButtonStyle}
                  {...contactButtonHandlers}
                >
                  {t.hero.contactButton}
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Highlight Section */}
        <section className="py-10 px-6 bg-gradient-to-r from-primary to-secondary w-full">
          <div className="fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-2.5 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-primary">
                    {language === "en" ? "Featured Highlight" : "精選亮點"}
                  </h2>
                  <span className="text-xs text-primary/70 font-medium">
                    {language === "en" ? "This Month" : "本月"}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* Text Content */}
                <div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {language === "en" ? "Monthly Feature" : "每月精選"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {language === "en" 
                      ? "A Tribute to Joshua" 
                      : "致敬Joshua"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {language === "en"
                      ? "My client Joshua changed my life. Although he has passed away, his legend lives on! A heartfelt tribute from Ms. Wendy Lee to a client who embodied elegance, understanding, and the true meaning of trust in the insurance relationship. Joshua's wife will share her perspectives on insurance with us, hoping to bring positive messages about insurance to everyone and inspire all financial planners to take pride in their work."
                      : "我的客戶Joshua，他改變了我的生活，雖然他已經離世，但他的傳奇永存！Wendy Lee女士對一位體現了優雅、理解和保險關係中真正信任意義的客戶的衷心致敬。Joshua的妻子將與我們分享她對保險的看法，希望這能為每個人帶來關於保險的正面信息，並希望所有理財規劃師都為自己的工作感到自豪。"}
                  </p>
                  
                  {/* Joshua Video - Mobile */}
                  <div className="mb-4">
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/HVU1m1z-TLA"
                        title={language === "en" ? "Joshua's Story - A Tribute" : "Joshua的故事 - 致敬"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Link
                      href="/case-studies/client-stories/joshua-tribute"
                      className="btn-primary inline-flex items-center group"
                    >
                      <span className="mr-3">
                        {language === "en" ? "View More" : "查看更多"}
                      </span>
                      <FaArrowRight className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile About Section - Match Desktop */}
        <section className="py-16 px-6 bg-light-gray w-full">
          <div className="flex flex-col items-center text-center mb-6 fade-in-up">
            <div className="mb-4">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group Logo"
                width={130}
                height={130}
                className="mb-2"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              {t.about.title}
            </h2>
          </div>
          <div className="fade-in-up">
            <p className="text-dark-gray text-sm mb-3">
              {t.about.description1}
            </p>
            <p className="text-dark-gray text-sm mb-4">
              {t.about.description2}
            </p>
            <div className="text-center">
              <Link
                href="/about"
                className="btn-primary inline-block text-sm text-white"
              >
                {t.about.learnMoreButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Mobile Services Section - Professional Design */}
        <section
          id="services-section"
          className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 w-full"
        >
          <div className="text-center mb-12 fade-in-up">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium tracking-wide">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {t.services.title}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              {t.services.description}
            </p>
          </div>

          <div className="overflow-x-auto pb-4 -mx-6 px-6 fade-in">
            <div className="flex gap-6 min-w-max">
              {serviceData.map((service) => (
                <ServiceCard key={service.id} service={service} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Recent Events Section - Match Desktop */}
        {recentEvents.length > 0 && (
          <section className="py-16 relative overflow-hidden bg-light-gray md:hidden">
            <div className="relative z-10 px-6">
              <div className="text-center mb-12 fade-in-up">
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  {language === "en" ? "Recent Events" : "最近活動"}
                </h2>
                <p className="text-dark-gray max-w-2xl mx-auto">
                  {language === "en"
                    ? "Stay updated with our latest professional activities and corporate milestones"
                    : "了解我們最新的專業活動和企業里程碑"}
                </p>
              </div>

              {/* Mobile horizontal scroll */}
              <div className="overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
                <div className="flex gap-6 min-w-max">
                  {recentEvents.map((event) => (
                    <Link
                      key={event.$id}
                      href={`/events/${event.$id}`}
                      className="group flex-none w-80"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                        {event.images && event.images.length > 0 && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={event.images[0]}
                              alt={
                                language === "en"
                                  ? event.name
                                  : event.chineseName
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="320px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="flex items-center text-white/90 text-sm mb-2">
                                <FaCalendarAlt className="mr-2 text-white" />
                                <span className="text-white">
                                  {new Date(event.date).toLocaleDateString(
                                    language === "en" ? "en-US" : "zh-TW",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-3 text-primary line-clamp-2">
                            {language === "en" ? event.name : event.chineseName}
                          </h3>
                          {event.images && event.images.length > 1 && (
                            <div className="flex items-center text-dark-gray text-sm">
                              <FaImages className="mr-2" />
                              <span>
                                {event.images.length}{" "}
                                {language === "en" ? "photos" : "張相片"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/events/recent"
                  className="btn-primary inline-flex items-center group"
                >
                  <span className="mr-3">
                    {language === "en" ? "View All Events" : "查看所有活動"}
                  </span>
                  <FaArrowRight className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Show events loading state if no events */}
        {recentEvents.length === 0 && (
          <section className="py-16 bg-light-gray md:hidden">
            <div className="text-center px-6">
              <h2 className="text-3xl font-bold mb-4 text-primary">
                {language === "en" ? "Recent Events" : "最近活動"}
              </h2>
              <p className="text-dark-gray">
                {language === "en" ? "Loading events..." : "載入活動中..."}
              </p>
            </div>
          </section>
        )}

        {/* Mobile Contact Section - Professional Design */}
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 w-full">
          <div className="fade-in-up">
            <div className="text-center mb-12">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium tracking-wide">
                  Get in Touch
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {t.contact.title}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                {t.contact.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 mb-8 fade-in-up">
            <Link
              href="/contact"
              className="bg-gray-900 text-white text-center py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              {t.contact.contactButton}
            </Link>
            <a
              href="tel:85255304114"
              className="bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 text-center py-4 px-6 rounded-lg font-semibold"
            >
              {t.contact.callButton}
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 fade-in-up">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
              <FaClock className="mr-3 text-gray-600" />
              {t.contact.serviceHours}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-medium text-gray-700">
                  {t.contact.mondayToFriday}
                </span>
                <span className="text-gray-600">
                  {t.contact.mondayToFridayHours}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="font-medium text-gray-700">
                  {t.contact.saturday}
                </span>
                <span className="text-gray-600">{t.contact.saturdayHours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {t.contact.evenings}
                </span>
                <span className="text-gray-600">{t.contact.eveningHours}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    {t.contact.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.contact.addressValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] md:min-h-[85vh] flex items-center w-full overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/assets/Home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6 text-center md:text-left py-12 z-10 relative">
          <div className="max-w-2xl mx-auto md:mx-0 fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => {
                  const servicesSection = document.getElementById(
                    "services-section-desktop"
                  );
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn-primary text-center w-full sm:w-auto"
              >
                {t.hero.exploreButton}
              </button>
              <ContactButton
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold text-center w-full sm:w-auto transition-all duration-300"
                style={contactButtonStyle}
                {...contactButtonHandlers}
              >
                {t.hero.contactButton}
              </ContactButton>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Highlight Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary w-full">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {language === "en" ? "Featured Highlight" : "精選亮點"}
                  </h2>
                  <span className="text-sm text-primary/70 font-medium">
                    {language === "en" ? "This Month" : "本月"}
                  </span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 md:p-8">
                <div className="flex justify-center">
                  {/* Text Content */}
                  <div className="max-w-2xl text-center">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {language === "en" ? "Monthly Feature" : "每月精選"}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      {language === "en" 
                        ? "A Tribute to Joshua" 
                        : "致敬Joshua"}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {language === "en"
                        ? "My client Joshua changed my life. Although he has passed away, his legend lives on! A heartfelt tribute from Ms. Wendy Lee to a client who embodied elegance, understanding, and the true meaning of trust in the insurance relationship. Joshua's wife will share her perspectives on insurance with us, hoping to bring positive messages about insurance to everyone and inspire all financial planners to take pride in their work."
                        : "我的客戶Joshua，他改變了我的生活，雖然他已經離世，但他的傳奇永存！Wendy Lee女士對一位體現了優雅、理解和保險關係中真正信任意義的客戶的衷心致敬。Joshua的妻子將與我們分享她對保險的看法，希望這能為每個人帶來關於保險的正面信息，並希望所有理財規劃師都為自己的工作感到自豪。"}
                    </p>
                    
                    {/* Joshua Video */}
                    <div className="mb-6">
                      <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          src="https://www.youtube.com/embed/HVU1m1z-TLA"
                          title={language === "en" ? "Joshua's Story - A Tribute" : "Joshua的故事 - 致敬"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                      </div>
                    </div>

                    <div className="text-center md:text-left mt-6">
                      <Link
                        href="/case-studies/client-stories/joshua-tribute"
                        className="btn-primary inline-flex items-center group"
                      >
                        <span className="mr-3">
                          {language === "en" ? "View More" : "查看更多"}
                        </span>
                        <FaArrowRight className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-light-gray w-full">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8 fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t.about.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="max-w-3xl mx-auto fade-in-up">
              <p className="text-dark-gray mb-4 md:mb-6 text-center">
                {t.about.description1}
              </p>
              <p className="text-dark-gray mb-6 text-center">
                {t.about.description2}
              </p>
              <div className="text-center">
                <Link href="/about" className="btn-primary inline-block">
                  {t.about.learnMoreButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section-desktop" className="py-12 md:py-20 w-full">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16 fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t.services.title}
            </h2>
            <p className="text-dark-gray max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceData.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow fade-in-up service-card-${
                    index + 1
                  }`}
                >
                  <div className="bg-primary/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto sm:mx-0">
                    <IconComponent className="text-primary text-xl md:text-2xl" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-primary">
                    {t.services[service.key].title}
                  </h3>
                  <p className="text-dark-gray text-sm md:text-base">
                    {t.services[service.key].description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-12 md:py-20 bg-white w-full hidden md:block">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16 fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {language === "en" ? "Recent Events" : "最近活動"}
            </h2>
            <p className="text-dark-gray max-w-3xl mx-auto">
              {language === "en"
                ? "Stay updated with our latest activities and professional milestones."
                : "了解我們最近的活動和專業里程碑。"}
            </p>
          </div>

          {recentEvents.length > 0 ? (
            <>
              {/* Continuous scrolling carousel showing 3 events */}
              <div 
                className="relative"
                onMouseEnter={() => setIsEventsPaused(true)}
                onMouseLeave={() => setIsEventsPaused(false)}
              >
                <div className="overflow-hidden">
                  <div
                    className="flex transition-none"
                    style={{
                      transform: `translateX(-${scrollOffset}%)`,
                    }}
                  >
                    {(() => {
                      // Create infinite scroll by repeating events multiple times
                      const infiniteEvents: Event[] = [];
                      const originalEventCount = recentEvents.length;
                      
                      // Create enough repetitions to ensure smooth infinite scroll for all events
                      const repetitions = Math.max(3, Math.ceil(12 / originalEventCount)); // At least 3 repetitions
                      const totalSlots = originalEventCount * repetitions;
                      
                      // Fill the infinite events array with repeated events
                      for (let i = 0; i < totalSlots; i++) {
                        infiniteEvents.push(recentEvents[i % originalEventCount]);
                      }
                      
                      return Array.from({ length: Math.ceil(infiniteEvents.length / 3) }).map((_, groupIndex) => (
                        <div key={groupIndex} className="flex-none w-full">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                            {infiniteEvents.slice(groupIndex * 3, (groupIndex + 1) * 3).map((event, eventIndex) => (
                            <Link
                              key={`${event.$id}-${groupIndex}-${eventIndex}`}
                              href={`/events/${event.$id}`}
                              className="group"
                            >
                              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full transform hover:scale-105">
                                {event.images && event.images.length > 0 && (
                                  <div className="relative h-64 overflow-hidden">
                                    <Image
                                      src={event.images[0]}
                                      alt={
                                        language === "en"
                                          ? event.name
                                          : event.chineseName
                                      }
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Light overlay so text is readable */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>

                                    {/* Event Date Badge */}
                                    <div className="absolute top-3 left-3">
                                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
                                        <div className="text-center">
                                          <div className="text-primary font-bold text-sm leading-none">
                                            {new Date(event.date).getDate()}
                                          </div>
                                          <div className="text-gray-600 text-xs font-medium uppercase">
                                            {new Date(event.date).toLocaleDateString(
                                              language === "en" ? "en-US" : "zh-TW",
                                              { month: "short" }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                      <h3 className="text-lg font-bold mb-2 text-white drop-shadow-lg line-clamp-2">
                                        {language === "en"
                                          ? event.name
                                          : event.chineseName}
                                      </h3>
                                      <div className="flex items-center text-white text-sm drop-shadow-lg">
                                        <FaCalendarAlt className="mr-2 text-white" />
                                        <span className="text-white">
                                          {new Date(event.date).toLocaleDateString(
                                            language === "en" ? "en-US" : "zh-TW",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                  </div>
                </div>
              </div>

              {/* Call-to-action button with primary button style */}
              <div className="text-center mt-12">
                <Link
                  href="/events/recent"
                  className="btn-primary inline-flex items-center group"
                >
                  <span className="mr-3">
                    {language === "en" ? "View All Events" : "查看所有活動"}
                  </span>
                  <FaArrowRight className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-gray">
                {language === "en"
                  ? "No recent events available."
                  : "暫無最近活動。"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-light-gray w-full">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 slide-in-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary text-center md:text-left">
                {t.contact.title}
              </h2>
              <p className="text-dark-gray mb-6 text-center md:text-left">
                {t.contact.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/contact"
                  className="btn-primary inline-block w-full sm:w-auto text-center"
                >
                  {t.contact.contactButton}
                </Link>
                <a
                  href="tel:85255304114"
                  className="bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center w-full sm:w-auto"
                >
                  {t.contact.callButton}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 slide-in-right">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {t.contact.serviceHours}
                </h3>
                <ul className="space-y-4">
                  <li className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">
                      {t.contact.mondayToFriday}
                    </span>
                    <span className="text-black">
                      {t.contact.mondayToFridayHours}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">{t.contact.saturday}</span>
                    <span className="text-black">
                      {t.contact.saturdayHours}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium">{t.contact.evenings}</span>
                    <span className="text-black">{t.contact.eveningHours}</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-black">
                    <strong>{t.contact.address}</strong>{" "}
                    <span className="block mt-1 text-black">
                      {t.contact.addressValue}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

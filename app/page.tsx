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
} from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { ReactNode, CSSProperties, MouseEvent } from "react";

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
        "Seeds Financial Group is in partnership with one of the world's largest financial groups provides advisory services using a wide range of risk management, strategy and asset allocation plans, enabling our clients to achieve their financial goals and future needs.",
      description2:
        "No matter what age a person is, as long as he/she has enthusiasm, we believe that he/she is a 'seed' full of hope for growth. We will try our best to provide them opportunities and nurture them carefully to turn them into a strong tree.",
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
        "Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",
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
      addressValue: "香港銅鑼灣恩平道28號利園二期嘉蘭中心",
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

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full overflow-x-hidden">
        {/* Mobile Hero Section */}
        <section className="bg-primary text-white pt-3 pb-6 px-6 w-full">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-3">{t.hero.title}</h1>
            <p className="text-lg mb-5">{t.hero.description}</p>
            <div className="flex flex-col gap-3">
              <Link
                href="/services"
                className="bg-accent text-dark-gray font-bold py-3 px-6 rounded-md w-full"
              >
                {t.hero.exploreButton}
              </Link>
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
          <div className="relative h-52 rounded-lg overflow-hidden mt-5 shadow-md">
            <Image
              src="/assets/Lee_Garden 5.jpg"
              alt="Seeds Financial Group Office"
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Mobile About Section */}
        <section className="py-10 px-6 bg-white w-full">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group Logo"
                width={130}
                height={130}
                className="mb-2"
              />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              {t.about.title}
            </h2>
          </div>
          <div>
            <p className="text-black text-sm mb-3">{t.about.description1}</p>
            <p className="text-black text-sm mb-4">{t.about.description2}</p>
            <div className="text-center">
              <Link href="/about" className="btn-primary inline-block text-sm">
                {t.about.learnMoreButton}
              </Link>
            </div>
          </div>
        </section>

        {/* Mobile Services Section */}
        <section className="py-10 px-6 bg-light-gray w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {t.services.title}
            </h2>
            <p className="text-black">{t.services.description}</p>
          </div>

          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-4 min-w-max">
              {serviceData.map((service) => (
                <ServiceCard key={service.id} service={service} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Contact Section */}
        <section className="py-10 px-6 bg-white w-full">
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">
            {t.contact.title}
          </h2>
          <p className="text-dark-gray mb-6 text-center">
            {t.contact.description}
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <Link href="/contact" className="btn-primary text-center w-full">
              {t.contact.contactButton}
            </Link>
            <a
              href="tel:85255304114"
              className="bg-transparent border-2 border-primary text-primary text-center py-3 px-6 rounded-md font-semibold w-full"
            >
              {t.contact.callButton}
            </a>
          </div>

          <div className="bg-light-gray p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">
              {t.contact.serviceHours}
            </h3>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="font-medium">{t.contact.mondayToFriday}</span>
                <span className="font-black text-black">
                  {t.contact.mondayToFridayHours}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">{t.contact.saturday}</span>
                <span className="font-black text-black">
                  {t.contact.saturdayHours}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">{t.contact.evenings}</span>
                <span className="font-black text-black">
                  {t.contact.eveningHours}
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t">
              <p className="text-black">
                <strong>{t.contact.address}</strong>
                <span className="block mt-1 font-black text-black">
                  {t.contact.addressValue}
                </span>
              </p>
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
        className="relative min-h-[90vh] md:min-h-[85vh] flex items-center w-full overflow-hidden bg-black"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/assets/Lee_Garden 5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 text-center md:text-left py-12 z-10 relative">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/services"
                className="btn-primary text-center w-full sm:w-auto"
              >
                {t.hero.exploreButton}
              </Link>
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

      {/* About Section */}
      <section className="py-12 md:py-20 bg-light-gray w-full">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t.about.title}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="max-w-3xl mx-auto">
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
      <section className="py-12 md:py-20 w-full">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {t.services.title}
            </h2>
            <p className="text-dark-gray max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceData.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
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

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-light-gray w-full">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
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
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center w-full sm:w-auto"
                >
                  {t.contact.callButton}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
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

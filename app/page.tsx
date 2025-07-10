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

// Translations object for all text content
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
        learnMore: "Learn More →",
      },
      education: {
        title: "Education Plan",
        description:
          "Education Plan is designed with a specific goal in mind – financing your child's higher education. The plan offers short premium payment terms, opportunities for growth and guaranteed cash payments when your child reaches university age.",
        learnMore: "Learn More →",
      },
      annuity: {
        title: "Annuity Plan",
        description:
          "A stable guaranteed annuity income stream that you can rely on for your retirement is a must. Our annuity plans are designed to provide financial security during your retirement years.",
        learnMore: "Learn More →",
      },
      medical: {
        title: "Medical Protection",
        description:
          "In view of rising medical expenses, it is important for you and your family to have adequate hospitalisation protection. Your family responsibilities remain even as you progress with your career.",
        learnMore: "Learn More →",
      },
      travel: {
        title: "Travel Insurance",
        description:
          "A world of adventure is out there, waiting to be explored. Take iTravel Protect with you for worldwide travel protection that covers all your essential needs, with optional benefits to suit your own itinerary.",
        learnMore: "Learn More →",
      },
      life: {
        title: "Life Insurance",
        description:
          "Life is unpredictable. As a breadwinner, you will always worry about the wellbeing of your family when mishap unexpectedly happens. Our life insurance plans provide financial security for your loved ones.",
        learnMore: "Learn More →",
      },
    },
    promo: {
      title: "IIQE Exam Discount",
      description:
        "Great news! You have the chance to register for the IIQE exam with a huge 50% discount. Don't let this opportunity slip away—save big and take your career to the next level.",
      registerButton: "Register for IIQE Exam",
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
        learnMore: "了解更多 →",
      },
      education: {
        title: "教育計劃",
        description:
          "教育計劃是為特定目標而設計的 - 為您子女的高等教育提供資金。該計劃提供短期保費支付期限，增長機會和當您的孩子達到大學年齡時的保證現金支付。",
        learnMore: "了解更多 →",
      },
      annuity: {
        title: "年金計劃",
        description:
          "退休時可靠的穩定保證年金收入流是必須的。我們的年金計劃旨在為您的退休年齡提供財務保障。",
        learnMore: "了解更多 →",
      },
      medical: {
        title: "醫療保障",
        description:
          "鑑於醫療費用不斷上漲，您和您的家人擁有足夠的住院保障非常重要。即使您在職業生涯中不斷進步，您的家庭責任仍然存在。",
        learnMore: "了解更多 →",
      },
      travel: {
        title: "旅遊保險",
        description:
          "外面有一個冒險的世界，等待被探索。帶上iTravel Protect，獲得全球旅行保護，涵蓋您所有的基本需求，並提供可選福利以適應您自己的行程。",
        learnMore: "了解更多 →",
      },
      life: {
        title: "人壽保險",
        description:
          "生活是不可預測的。作為一家之主，當意外發生時，您將始終擔心家人的福祉。我們的人壽保險計劃為您所愛的人提供財務保障。",
        learnMore: "了解更多 →",
      },
    },
    promo: {
      title: "保險中介人資格考試折扣",
      description:
        "好消息！您有機會以高達50%的折扣報名參加保險中介人資格考試。不要讓這個機會溜走—省錢並將您的職業生涯提升到一個新的水平。",
      registerButton: "報名保險中介人資格考試",
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

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/Lee_Garden 5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.hero.title}
            </h1>
            <p className="text-xl text-white mb-8">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/services" className="btn-primary text-center">
                {t.hero.exploreButton}
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center"
              >
                {t.hero.contactButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={200}
                height={200}
                className="mx-auto md:mx-0"
              />
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                {t.about.title}
              </h2>
              <p className="text-dark-gray mb-6">{t.about.description1}</p>
              <p className="text-dark-gray mb-6">{t.about.description2}</p>
              <Link href="/about" className="btn-primary inline-block">
                {t.about.learnMoreButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {t.services.title}
            </h2>
            <p className="text-dark-gray max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Critical Illness Protection */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.criticalIllness.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.criticalIllness.description}
              </p>
              <Link
                href="/services/critical-illness"
                className="text-primary font-medium hover:underline"
              >
                {t.services.criticalIllness.learnMore}
              </Link>
            </div>

            {/* Education Plan */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaGraduationCap className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.education.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.education.description}
              </p>
              <Link
                href="/services/education"
                className="text-primary font-medium hover:underline"
              >
                {t.services.education.learnMore}
              </Link>
            </div>

            {/* Annuity Plan */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaMoneyBillWave className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.annuity.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.annuity.description}
              </p>
              <Link
                href="/services/annuity"
                className="text-primary font-medium hover:underline"
              >
                {t.services.annuity.learnMore}
              </Link>
            </div>

            {/* Medical Protection */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaMedkit className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.medical.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.medical.description}
              </p>
              <Link
                href="/services/medical"
                className="text-primary font-medium hover:underline"
              >
                {t.services.medical.learnMore}
              </Link>
            </div>

            {/* Travel Insurance */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaPlane className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.travel.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.travel.description}
              </p>
              <Link
                href="/services/travel"
                className="text-primary font-medium hover:underline"
              >
                {t.services.travel.learnMore}
              </Link>
            </div>

            {/* Life Insurance */}
            <div
              className="card bg-white p-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaHeart className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {t.services.life.title}
              </h3>
              <p className="text-dark-gray mb-4">
                {t.services.life.description}
              </p>
              <Link
                href="/services/life"
                className="text-primary font-medium hover:underline"
              >
                {t.services.life.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Offer Section */}
      <section className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold mb-4">{t.promo.title}</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            {t.promo.description}
          </p>
          <Link
            href="/iiqe"
            className="bg-accent hover:bg-opacity-90 transition-colors text-dark-gray font-bold py-3 px-8 rounded-md inline-block"
          >
            {t.promo.registerButton}
          </Link>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                {t.contact.title}
              </h2>
              <p className="text-dark-gray mb-6">{t.contact.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary inline-block">
                  {t.contact.contactButton}
                </Link>
                <a
                  href="tel:85255304114"
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-6 py-3 rounded-md font-semibold text-center"
                >
                  {t.contact.callButton}
                </a>
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {t.contact.serviceHours}
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="font-medium">
                      {t.contact.mondayToFriday}
                    </span>
                    <span>{t.contact.mondayToFridayHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">{t.contact.saturday}</span>
                    <span>{t.contact.saturdayHours}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">{t.contact.evenings}</span>
                    <span>{t.contact.eveningHours}</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-dark-gray">
                    <strong>{t.contact.address}</strong>{" "}
                    {t.contact.addressValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

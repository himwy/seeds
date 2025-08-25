"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaUsers, FaAward } from "react-icons/fa";

const translations = {
  en: {
    pageTitle: "Our Team",
    pageSubtitle: "Meet the Professionals Behind Seeds Financial Group",
    heroDescription:
      "Our experienced team of financial advisors is dedicated to helping you achieve your financial goals through personalized planning and expert guidance.",

    learnMore: "Learn More",
    viewProfile: "View Full Profile",
    teamStats: "Team Excellence",
    experience: "Years Combined Experience",
    clients: "Satisfied Clients",
    expertise: "Areas of Expertise",

    teamMembers: [
      {
        id: "wendy-lee",
        name: "Wendy Lee",
        chineseName: "李春雷",
        position: "Co-Founder & District Manager",
        chinesePosition: "聯合創辦人及地區經理",
        specialization: "Insurance & Financial Planning",
        chineseSpecialization: "保險及財務規劃",
        experience: "20+ years",
        description:
          "Wendy has 20 years of experience in the insurance business. As AIA Senior District Manager, her team achieved #1 ranking across all Hong Kong regions in 2017. She is an MDRT lifetime member and has won multiple industry awards.",
        chineseDescription:
          "Wendy在保險事業擁有20年經驗。作為友邦資深地區經理，她的團隊在2017年度獲得香港全區域排名第一。她是百萬圓桌會議終身會員，並獲得多項行業獎項。",
        email: "wendy.lee@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "mansfield-lai",
        name: "Mansfield Lai",
        chineseName: "黎紹忠",
        position: "Co-Founder & CFP",
        chinesePosition: "聯合創辦人及認證財務規劃師",
        specialization: "Financial Planning & Wealth Management",
        chineseSpecialization: "財務規劃及財富管理",
        experience: "20+ years",
        description:
          "Mansfield is a Certified Financial Planner (CFP) with over 20 years in the financial planning industry. He is an MDRT member and received the Good Citizen Award in 2015, becoming a 'Justice' hero in children's eyes.",
        chineseDescription:
          "Mansfield是認證財務規劃師(CFP)，在財務策劃行業擁有超過20年經驗。他是百萬圓桌會議會員，並於2015年獲得好市民獎，成為孩子心目中的「正義」英雄。",
        email: "mansfield.lai@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "kimman-cheung",
        name: "Kimman Cheung",
        chineseName: "張劍文",
        position: "Senior Business Partner",
        chinesePosition: "高級業務夥伴",
        specialization: "AIA Premier Academy & MDRT",
        chineseSpecialization: "友邦卓越學院及百萬圓桌會議",
        experience: "7+ years",
        description:
          "Kimman畢業於中大工商管理學系，在AIA工作7年並成為Premier Academy會員。他努力保持MDRT資格，以MDRT Life Member為長遠目標。",
        chineseDescription:
          "Kimman畢業於中大工商管理學系，在AIA工作7年並成為Premier Academy會員。他努力保持MDRT資格，以MDRT Life Member為長遠目標。",
        email: "kimman.cheung@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "andy-yiu",
        name: "Andy Yiu",
        chineseName: "姚承彦",
        position: "Business Partner",
        chinesePosition: "業務夥伴",
        specialization: "Hospitality Management & Financial Planning",
        chineseSpecialization: "款客服務業管理及財務規劃",
        experience: "3+ years",
        description:
          "Andy joined AIA in January 2022 after completing his Master's in Hospitality Management in Switzerland. He transitioned from the hospitality industry to financial planning and aims to achieve MDRT and COT this year.",
        chineseDescription:
          "Andy於2022年1月加入AIA，在瑞士完成款客服務業管理碩士學位後，從酒店業轉入財務策劃行業，今年目標達到MDRT和COT。",
        email: "andy.yiu@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "bella",
        name: "Bella",
        chineseName: "貝拉",
        position: "Wealth Management Director",
        chinesePosition: "財富管理總監",
        specialization: "Banking & Asset Management",
        chineseSpecialization: "銀行及資產管理",
        experience: "30+ years",
        description:
          "Bella brings over 30 years of extensive experience in the financial industry, having held leadership positions as branch manager, regional director, and chairman of state-owned enterprises specializing in asset management and corporate finance.",
        chineseDescription:
          "Bella擁有超過30年的金融行業豐富經驗，曾擔任分行經理、區域總監和國有企業董事長等領導職位，專門從事資產管理和企業金融。",
        email: "bella@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "karen-wong",
        name: "Karen Wong",
        chineseName: "黃嘉欣",
        position: "Associate Wealth Management Director",
        chinesePosition: "副財富管理總監",
        specialization: "Dual-qualified Solicitor & Licensed Insurance Agent",
        chineseSpecialization: "雙重資格律師及持牌保險代理人",
        experience: "15+ years",
        description:
          "Karen is a dual-qualified professional - both a solicitor and licensed insurance agent specializing in financial and legal risk management. Her expertise spans family law, estate planning, conveyancing, and commercial law, uniquely positioning her to provide comprehensive wealth protection solutions.",
        chineseDescription:
          "Karen是雙重資格專業人士 - 既是律師又是持牌保險代理人，專門從事金融和法律風險管理。她的專業領域涵蓋家庭法、遺產規劃、物業轉讓和商業法，為提供全面的財富保護解決方案提供獨特優勢。",
        email: "karen.wong@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "annie",
        name: "Annie",
        chineseName: "Annie",
        position: "Financial Advisor",
        chinesePosition: "財務顧問",
        specialization: "Supply Chain Management & Client Relations",
        chineseSpecialization: "供應鏈管理及客戶關係",
        experience: "10+ years",
        description:
          "Annie holds a degree in Global Supply Chain Management from PolyU and served as a general manager in logistics. She transitioned to insurance after experiencing firsthand the importance of protection during her travels.",
        chineseDescription:
          "Annie持有理工大學全球供應鏈管理學位，曾擔任物流業總經理。在旅行中親身體驗到保障的重要性後，她轉入保險行業。",
        email: "annie@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
    ],
  },
  "zh-HK": {
    pageTitle: "我們的團隊",
    pageSubtitle: "認識 Seeds Financial Group 背後的專業人士",
    heroDescription:
      "我們經驗豐富的財務顧問團隊致力於通過個人化規劃和專業指導幫助您實現財務目標。",

    learnMore: "了解更多",
    viewProfile: "查看完整檔案",
    teamStats: "團隊卓越",
    experience: "年綜合經驗",
    clients: "滿意客戶",
    expertise: "專業領域",

    teamMembers: [
      {
        id: "wendy-lee",
        name: "Wendy Lee",
        chineseName: "李春雷",
        position: "Co-Founder & District Manager",
        chinesePosition: "聯合創辦人及地區經理",
        specialization: "Insurance & Financial Planning",
        chineseSpecialization: "保險及財務規劃",
        experience: "20+ 年",
        description:
          "Wendy has 20 years of experience in the insurance business. As AIA Senior District Manager, her team achieved #1 ranking across all Hong Kong regions in 2017. She is an MDRT lifetime member and has won multiple industry awards.",
        chineseDescription:
          "Wendy在保險事業擁有20年經驗。作為友邦資深地區經理，她的團隊在2017年度獲得香港全區域排名第一。她是百萬圓桌會議終身會員，並獲得多項行業獎項。",
        email: "wendy.lee@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "mansfield-lai",
        name: "Mansfield Lai",
        chineseName: "黎紹忠",
        position: "Co-Founder & CFP",
        chinesePosition: "聯合創辦人及認證財務規劃師",
        specialization: "Financial Planning & Wealth Management",
        chineseSpecialization: "財務規劃及財富管理",
        experience: "20+ 年",
        description:
          "Mansfield is a Certified Financial Planner (CFP) with over 20 years in the financial planning industry. He is an MDRT member and received the Good Citizen Award in 2015, becoming a 'Justice' hero in children's eyes.",
        chineseDescription:
          "Mansfield是認證財務規劃師(CFP)，在財務策劃行業擁有超過20年經驗。他是百萬圓桌會議會員，並於2015年獲得好市民獎，成為孩子心目中的「正義」英雄。",
        email: "mansfield.lai@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "kimman-cheung",
        name: "Kimman Cheung",
        chineseName: "張劍文",
        position: "Senior Business Partner",
        chinesePosition: "高級業務夥伴",
        specialization: "AIA Premier Academy & MDRT",
        chineseSpecialization: "友邦卓越學院及百萬圓桌會議",
        experience: "7+ 年",
        description:
          "Kimman畢業於中大工商管理學系，在AIA工作7年並成為Premier Academy會員。他努力保持MDRT資格，以MDRT Life Member為長遠目標。",
        chineseDescription:
          "Kimman畢業於中大工商管理學系，在AIA工作7年並成為Premier Academy會員。他努力保持MDRT資格，以MDRT Life Member為長遠目標。",
        email: "kimman.cheung@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "andy-yiu",
        name: "Andy Yiu",
        chineseName: "姚承彦",
        position: "Business Partner",
        chinesePosition: "業務夥伴",
        specialization: "Hospitality Management & Financial Planning",
        chineseSpecialization: "款客服務業管理及財務規劃",
        experience: "3+ 年",
        description:
          "Andy於2022年1月加入AIA，在瑞士完成款客服務業管理碩士學位後，從酒店業轉入財務策劃行業，今年目標達到MDRT和COT。",
        chineseDescription:
          "Andy於2022年1月加入AIA，在瑞士完成款客服務業管理碩士學位後，從酒店業轉入財務策劃行業，今年目標達到MDRT和COT。",
        email: "andy.yiu@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "bella",
        name: "Bella",
        chineseName: "貝拉",
        position: "Wealth Management Director",
        chinesePosition: "財富管理總監",
        specialization: "Banking & Asset Management",
        chineseSpecialization: "銀行及資產管理",
        experience: "30+ 年",
        description:
          "Bella擁有超過30年的金融行業豐富經驗，曾擔任分行經理、區域總監和國有企業董事長等領導職位，專門從事資產管理和企業金融。",
        chineseDescription:
          "Bella擁有超過30年的金融行業豐富經驗，曾擔任分行經理、區域總監和國有企業董事長等領導職位，專門從事資產管理和企業金融。",
        email: "bella@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "karen-wong",
        name: "Karen Wong",
        chineseName: "黃嘉欣",
        position: "Associate Wealth Management Director",
        chinesePosition: "副財富管理總監",
        specialization: "Dual-qualified Solicitor & Licensed Insurance Agent",
        chineseSpecialization: "雙重資格律師及持牌保險代理人",
        experience: "15+ 年",
        description:
          "Karen是雙重資格專業人士 - 既是律師又是持牌保險代理人，專門從事金融和法律風險管理。她的專業領域涵蓋家庭法、遺產規劃、物業轉讓和商業法，為提供全面的財富保護解決方案提供獨特優勢。",
        chineseDescription:
          "Karen是雙重資格專業人士 - 既是律師又是持牌保險代理人，專門從事金融和法律風險管理。她的專業領域涵蓋家庭法、遺產規劃、物業轉讓和商業法，為提供全面的財富保護解決方案提供獨特優勢。",
        email: "karen.wong@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
      {
        id: "annie",
        name: "Annie",
        chineseName: "Annie",
        position: "Financial Advisor",
        chinesePosition: "財務顧問",
        specialization: "Supply Chain Management & Client Relations",
        chineseSpecialization: "供應鏈管理及客戶關係",
        experience: "10+ 年",
        description:
          "Annie持有理工大學全球供應鏈管理學位，曾擔任物流業總經理。在旅行中親身體驗到保障的重要性後，她轉入保險行業。",
        chineseDescription:
          "Annie持有理工大學全球供應鏈管理學位，曾擔任物流業總經理。在旅行中親身體驗到保障的重要性後，她轉入保險行業。",
        email: "annie@seedsfinancial.com",
        phone: "+852 5530-4114",
      },
    ],
  },
};

export default function TeamPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 pt-32">
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              {t.pageTitle}
            </h1>

            <div className="w-32 h-1 bg-gray-900 mx-auto mb-8"></div>

            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
              {t.heroDescription}
            </p>

            <p className="text-lg text-gray-600 italic">{t.pageSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section - All using featured design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-20">
              {t.teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={index < 2 ? { opacity: 1, y: 0 } : undefined}
                  whileInView={index >= 2 ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.6,
                    delay: index < 2 ? index * 0.2 + 0.5 : 0,
                  }}
                  viewport={
                    index >= 2 ? { once: true, amount: 0.3 } : undefined
                  }
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Member Image */}
                      <div className="relative h-80 lg:h-auto">
                        {member.id === "wendy-lee" ? (
                          <Image
                            src="/assets/wendy/Wendy lee.jpg"
                            alt={`${member.name} - ${member.position}`}
                            fill
                            className="object-cover"
                          />
                        ) : member.id === "mansfield-lai" ? (
                          <Image
                            src="/assets/mansfield/mansfield pfp.jpeg"
                            alt={`${member.name} - ${member.position}`}
                            fill
                            className="object-cover object-top"
                          />
                        ) : member.id === "kimman-cheung" ? (
                          <Image
                            src="/assets/kimman/kimman pfp.jpg"
                            alt={`${member.name} - ${member.position}`}
                            fill
                            className="object-cover object-right"
                          />
                        ) : member.id === "andy-yiu" ? (
                          <Image
                            src="/assets/andy/andy pfp.jpeg"
                            alt={`${member.name} - ${member.position}`}
                            fill
                            className="object-cover"
                          />
                        ) : member.id === "karen-wong" ? (
                          <Image
                            src="/assets/karen/karen.jpg"
                            alt={`${member.name} - ${member.position}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="text-white text-2xl" />
                              </div>
                              <p className="text-gray-700 font-semibold text-xl">
                                {member.name}
                              </p>
                              <p className="text-gray-600">
                                {member.chineseName}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Member Info */}
                      <div className="lg:col-span-2 p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {member.name}
                          </h2>
                          <p className="text-xl text-gray-700 mb-2">
                            {member.chineseName}
                          </p>
                          <p className="text-lg text-blue-600 font-semibold mb-4">
                            {language === "zh-HK"
                              ? member.chinesePosition
                              : member.position}
                          </p>
                          <div className="w-16 h-1 bg-gray-900 mb-6"></div>
                        </div>

                        <div className="mb-6">
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {language === "zh-HK"
                              ? member.chineseDescription
                              : member.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <FaAward className="text-yellow-500 mr-2" />
                            <span>
                              {language === "zh-HK"
                                ? member.chineseSpecialization
                                : member.specialization}{" "}
                              • {member.experience}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Link href={`/team/${member.id}`} className="flex-1">
                            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                              <span>{t.learnMore}</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

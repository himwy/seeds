"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import { FaArrowLeft, FaUsers } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Annie",
    subtitle: "Putting People First, Committed to Helping Others",
    chineseName: "Annie",

    backgroundTitle: "Background Experience",
    backgroundText:
      "Annie holds a degree in Global Supply Chain Management from The Hong Kong Polytechnic University and previously served as a general manager in the logistics industry, responsible for coordinating and communicating between the company and clients. Through this experience, she gained valuable insights, such as adopting a neutral stance that prioritizes win-win situations and placing importance on building relationships with others. Annie's ability to transform many of her clients into friends highlights her strong interpersonal skills.",

    transitionTitle: "Reason for Transition",
    transitionText:
      "Annie's decision to transition into the insurance industry stemmed from several factors. Her frequent travels between mainland China and Hong Kong and an incident during a business trip to Southeast Asia had a significant impact on her. When she felt ill, she received timely and appropriate medical treatment through arrangements with her insurance agent. This experience made Annie deeply appreciate the importance of insurance and she would like to know more about the insurance industry. She realized that the insurance industry not only allows her to genuinely care for customers and develop exclusive plans tailored to their needs but also fulfills her desire to help others. Therefore, Annie has decided to work in the insurance industry.",

    pandemicTitle: "Impact of the Pandemic",
    pandemicText:
      "The pandemic also affected Annie's journey as she faced travel restrictions and had to stay at home. However, this experience taught her the importance of adaptability and the immeasurable value of helping others. Annie began to think outside the box and selflessly offered assistance to those in need, even when she had surplus resources. This period of reflection made her realize that her past experiences and knowledge were not always applicable during times of crisis. It also made her aware of the limited legacy she would leave behind for her family. Motivated to make a lasting impact, Annie decided to work in the insurance industry and believed that she could continue to support her loved ones even in her absence.",

    futureTitle: "Future Development",
    futureText:
      "Annie plans to pursue a master's degree to further enhance her professional capabilities. Recently, she obtained certifications as a mediator. While these certifications may not directly impact her career, Annie firmly believes in the principle of lifelong learning. She is committed to seizing every opportunity to pursue her aspirations and continuously grow through further education.",

    goalsTitle: "Short-Term Goals",
    goalsText:
      "In the short term, Annie aims to successfully integrate into her team, understanding the strengths and expertise of each member to establish a solid foundation for future collaborations. Additionally, she harbors a dream of establishing two funds: an animal fund dedicated to caring for abused animals and providing them with love and shelter, and a healthcare fund aimed at improving existing medical systems and assisting those unable to afford medical treatment.",

    quote: "Live in the present, and be the best version of yourself.",

    achievements: [
      "Global Supply Chain Management Degree (PolyU)",
      "Former General Manager - Logistics Industry",
      "Certified Mediator",
      "Pursuing Master's Degree",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Annie",
    subtitle: "以人為本，致力於幫助他人",
    chineseName: "Annie",

    backgroundTitle: "入行前經驗",
    backgroundText:
      "曾就讀理工大學全球供應鏈管理系，並在入行前擔任物流業的總經理一職，負責公司與客戶之間的協調與溝通。在這段工作經驗中，我學到了許多重要的價值觀，例如不以公司利益為首的中立立場，追求雙贏的局面，以及重視人與人之間的關係。這使Annie將許多客戶變成了朋友，建立了深厚的人際關係。",

    transitionTitle: "入行的原因",
    transitionText:
      "決定轉行投身保險業的原因源於Annie過去多次在中國內地和香港之間的奔波，並在一次東南亞出差中遇到突發疾病的情況。當時，感謝保險代理人的安排和協助，Annie能夠及時獲得適切的治療。這讓Annie深刻體會到保險的重要性，於是開始對保險業產生了興趣。Annie認識到保險業不僅能夠真正地為客戶著想，制定符合其需求的專屬計劃，而且也能滿足到她幫助他人的渴望。因此，annie決定在經過十年的大眾化工作後，轉行進入保險行業。",

    pandemicTitle: "疫情的影響",
    pandemicText:
      "疫情期間，Annie也深受其影響，無法自由出入境，被迫留在家中。然而，這段經歷讓她學會了變通的重要性，並體會到對他人的幫助是無價的。Annie開始思考如何突破自己的框架，並以無私的心態去幫助他人。在疫情期間，當她發現有多餘的物資時，她能夠立即伸出援手，無需期待回報，只是單純為了幫助他人。這段經歷讓她反思到過去的工作經驗和知識未能讓她在重大危機時候發揮作用，同時也意識到自己離開後沒有太多可以留給家人的東西。因此，Annie下定決心轉行，相信即使在她離開後，她仍然能夠幫助到家人。",

    futureTitle: "未來發展",
    futureText:
      "Annie計劃修讀碩士學位，不斷提升自己的專業能力。最近，她更獲得了調解員的證書，儘管這並不一定對其事業有直接幫助，但她相信「活到老，學到老」的理念，她會繼續進修，完成一直想做的事情。",

    goalsTitle: "短期發展",
    goalsText:
      "Annie希望能夠成功融入團隊，了解每位成員的專長，為未來的合作打下堅實的基礎。此外，Annie也懷抱著一個夢想，希望能夠創立兩個基金：動物基金和醫療基金。動物基金致力於照顧被虐待的動物，為牠們提供愛和庇護；而醫療基金則旨在改善現有的醫療體系，幫助那些無法負擔治療費用的人們。",

    quote: "活在當下，做好自己",

    achievements: [
      "理工大學全球供應鏈管理系學位",
      "前物流業總經理",
      "調解員證書",
      "進修碩士學位中",
    ],
  },
};

export default function AnniePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-8">
          <Link
            href="/team"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            {t.backToTeam}
          </Link>
        </div>
      </header>

      {/* Main Article */}
      <article className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <p className="text-gray-700 font-semibold text-xl">{t.title}</p>
              <p className="text-gray-600">{t.chineseName}</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-gray-800 leading-relaxed text-base">
              {t.achievements.map((achievement, index) => (
                <p key={index} className="mb-2 font-medium">
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Background Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.backgroundTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.backgroundText}
          </p>
        </section>

        {/* Reason for Transition */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.transitionTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.transitionText}
          </p>
        </section>

        {/* Pandemic Impact */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.pandemicTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.pandemicText}</p>
        </section>

        {/* Future Development */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.futureTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.futureText}</p>
        </section>

        {/* Short-Term Goals */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.goalsTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.goalsText}</p>
        </section>

        {/* Inspirational Quote */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === "zh-HK" ? "金句" : "Inspirational Quote"}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <blockquote className="text-2xl font-semibold text-gray-800 italic text-center">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </div>
        </section>
      </article>
    </div>
  );
}

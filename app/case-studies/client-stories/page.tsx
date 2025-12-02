"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaArrowRight,
  FaHeartbeat,
  FaBuilding,
  FaGraduationCap,
  FaHeart,
  FaStethoscope,
} from "react-icons/fa";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    title: "Case Studies & Client Stories",
    subtitle:
      "Real experiences and meaningful outcomes that reflect our commitment to client care",
    learnMore: "Read Full Story",

    stories: [
      {
        id: "cervical-cancer-claim",
        title: "Navigating Critical Illness Claims",
        category: "Insurance Claims",
        client: "Cancer Patient Case",
        preview:
          "When conflicting medical reports created uncertainty in a cervical cancer diagnosis, two insurance providers responded very differently. This case study examines how claims processes can vary significantly between insurers, and why having a dedicated advisor matters during difficult times.",
        icon: "heartbeat",
        readTime: "6 min read",
        outcome:
          "Contrasting claim outcomes highlight the importance of choosing the right insurance partner",
      },
      {
        id: "joshua-tribute",
        title: "A Legacy of Trust - In Memory of Joshua",
        category: "Client Tribute",
        client: "Joshua's Story",
        preview:
          "Some client relationships transcend business and become life-changing. This heartfelt tribute from Ms Wendy Lee honours a client whose grace, understanding, and unwavering trust exemplified the true meaning of partnership in financial planning.",
        icon: "heart",
        readTime: "8 min read",
        outcome:
          "A lasting legacy that continues to inspire dedication in client service",
      },
      {
        id: "mansfield-reflection",
        title: "Reflection After Claiming - Mr Mansfield Lai's Perspective",
        category: "Medical Claims",
        client: "Stroke Recovery Case",
        preview:
          "A sudden medical emergency that escalated from HK$70,000 to HK$900,000 within days. Mr Mansfield Lai shares his personal experience of how comprehensive medical coverage allowed his family to focus entirely on recovery rather than financial concerns.",
        icon: "stethoscope",
        readTime: "7 min read",
        outcome:
          "Medical claim processed within 2 days, enabling family to focus on recovery",
      },
      {
        id: "special-health-disease",
        title: "Rare Disease Case - Lacrimal Gland Cancer",
        category: "Rare Disease Claims",
        client: "Lacrimal Gland Cancer Patient",
        preview:
          "A rare cancer affecting only 3 in 100,000 people. After early detection and successful treatment ten years ago, the client had overlooked his critical illness coverage. With proper guidance, a long-forgotten policy became the funding source for his postgraduate education.",
        icon: "stethoscope",
        readTime: "8 min read",
        outcome:
          "Successfully recovered HK$800,000+ claim after 10 years, funding master's degree studies",
      },
      {
        id: "executive-brain-tumor",
        title: "When Adversity Strikes the Successful",
        category: "Medical Emergency",
        client: "Investment Banking Executive",
        preview:
          "A senior investment banking executive earning HK$200,000 monthly faced an unexpected challenge when her husband was diagnosed with a brain tumor. This case illustrates how even the most financially astute professionals can find themselves unprepared for personal medical emergencies.",
        icon: "heartbeat",
        readTime: "7 min read",
        outcome:
          "HK$1,000,000 in medical claims enabled focus on recovery rather than financial stress",
      },
      {
        id: "family-office-services",
        title: "Family Office - Serving High-Net-Worth Families",
        category: "Wealth Management",
        client: "Ultra High Net Worth Families",
        preview:
          "Family office services typically serve families with assets exceeding USD $100 million. At this level of wealth, comprehensive advisory services and sophisticated succession planning become essential for preserving and transferring wealth across generations.",
        icon: "building",
        readTime: "6 min read",
        outcome:
          "Comprehensive wealth management and succession planning for distinguished families",
      },
    ],
  },
  "zh-HK": {
    title: "案例研究與客戶故事",
    subtitle: "真實經歷，體現我們對客戶關懷的承諾",
    learnMore: "閱讀全文",

    stories: [
      {
        id: "cervical-cancer-claim",
        title: "危疾保險理賠案例分析",
        category: "保險理賠",
        client: "癌症患者個案",
        preview:
          "當子宮頸癌診斷出現醫療報告分歧時，兩家保險公司的處理方式截然不同。此案例探討保險公司之間理賠流程的差異，以及為何在困難時期擁有專業顧問至關重要。",
        icon: "heartbeat",
        readTime: "6分鐘閱讀",
        outcome:
          "不同的理賠結果突顯選擇合適保險夥伴的重要性",
      },
      {
        id: "joshua-tribute",
        title: "信任的傳承 - 紀念Joshua",
        category: "客戶致敬",
        client: "Joshua的故事",
        preview:
          "有些客戶關係超越了業務本身，成為改變生命的經歷。Wendy Lee女士以這篇真摯的文章，紀念一位以優雅、理解和堅定信任，詮釋了理財規劃真正夥伴意義的客戶。",
        icon: "heart",
        readTime: "8分鐘閱讀",
        outcome: "持續激勵我們以專業和真誠服務每一位客戶",
      },
      {
        id: "mansfield-reflection",
        title: "理賠後的反思 - Mansfield Lai先生的分享",
        category: "醫療理賠",
        client: "中風康復個案",
        preview:
          "一個突發的醫療緊急情況，在數天內從港幣7萬元升級至90萬元。Mansfield Lai先生分享他的親身經歷，說明全面的醫療保障如何讓家人能夠專注於康復，而非財務壓力。",
        icon: "stethoscope",
        readTime: "7分鐘閱讀",
        outcome: "醫療理賠在2天內獲批，讓家人專注於康復",
      },
      {
        id: "special-health-disease",
        title: "罕見疾病案例 - 淚腺癌",
        category: "罕見疾病理賠",
        client: "淚腺癌患者",
        preview:
          "淚腺癌是一種罕見的癌症，大約每十萬人中只有三人確診。客戶十年前幸運地及早發現並成功康復，卻因缺乏專業指引而忽略了危疾保險理賠。在適當的協助下，這份被遺忘的保單成為了他進修碩士學位的資金來源。",
        icon: "stethoscope",
        readTime: "8分鐘閱讀",
        outcome: "成功追回十年後80多萬港元理賠，資助碩士學位進修",
      },
      {
        id: "executive-brain-tumor",
        title: "當意外降臨成功人士",
        category: "醫療緊急情況",
        client: "投資銀行高管",
        preview:
          "一位月薪20萬港元的投資銀行高管，事業有成，家庭美滿。當丈夫被診斷患有腦腫瘤時，她面臨了意想不到的挑戰。此案例說明即使是財務專業人士，也可能在面對個人醫療緊急情況時措手不及。",
        icon: "heartbeat",
        readTime: "7分鐘閱讀",
        outcome: "100萬港元醫療理賠讓家庭能專注於康復而非財務壓力",
      },
      {
        id: "family-office-services",
        title: "家族辦公室 - 服務高淨值家族",
        category: "財富管理",
        client: "超高淨值家族",
        preview:
          "家族辦公室的服務對象一般為擁有超過1億美元資產的家族。當財富累積達到這個水平，全面的顧問服務和精密的傳承規劃對於跨代保存和轉移財富變得至關重要。",
        icon: "building",
        readTime: "6分鐘閱讀",
        outcome: "為尊貴家族提供全面的財富管理和傳承規劃服務",
      },
    ],
  },
};

const iconMap = {
  heartbeat: FaHeartbeat,
  heart: FaHeart,
  building: FaBuilding,
  graduation: FaGraduationCap,
  stethoscope: FaStethoscope,
};

export default function ClientStoriesPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Clean Professional Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaUsers className="text-4xl text-gray-700 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-6 font-serif">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.stories.map((story, index) => {
              const IconComponent = iconMap[story.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col h-full"
                >
                  {/* Story Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                        {story.category}
                      </span>
                      <IconComponent className="text-2xl text-gray-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">
                      {story.client}
                    </p>
                  </div>

                  {/* Story Content - Flex grow to fill available space */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {story.preview}
                    </p>

                    {/* Outcome Highlight */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">
                        Key Outcome:
                      </h4>
                      <p className="text-gray-600 text-sm">{story.outcome}</p>
                    </div>

                    {/* Read Time & Learn More - Fixed at bottom */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-500 text-sm">
                        {story.readTime}
                      </span>
                      <Link href={`/case-studies/client-stories/${story.id}`}>
                        <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2 group">
                          {t.learnMore}
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform text-white" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

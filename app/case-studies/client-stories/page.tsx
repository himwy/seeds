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
      "Real experiences and transformative outcomes from our valued clients",
    learnMore: "Learn More",

    stories: [
      {
        id: "cervical-cancer-claim",
        title: "Critical Illness Insurance Claim Resolution",
        category: "Insurance Claims",
        client: "Cervical Cancer Patient",
        preview:
          "Wendy has a client who is a cervical cancer patient. This type of cancer kills thousands of people in the world every year, with more than 570k new cases over the past year. When conflicting medical reports created uncertainty about aggressive cancer cells, two insurance companies responded differently - AIA granted the claim while M Company rejected it, despite her being their customer for over two decades.",
        icon: "heartbeat",
        readTime: "6 min read",
        outcome:
          "AIA granted the claim based on customer-centric approach, while M Company rejected despite 20+ year relationship",
      },
      {
        id: "joshua-tribute",
        title: "Ms Wendy Lee's Words - In Memory of Joshua",
        category: "Client Tribute",
        client: "Joshua's Legacy",
        preview:
          "My client, Joshua, he changed my life, although he passed away, his legend lasts! A heartfelt tribute from Ms Wendy Lee about a client who exemplified grace, understanding, and the true meaning of trust in the insurance relationship.",
        icon: "heart",
        readTime: "8 min read",
        outcome:
          "A lasting legacy that continues to inspire financial planners to serve with dedication",
      },
      {
        id: "mansfield-reflection",
        title: "Reflection After Claiming - Mr Mansfield Lai's Words",
        category: "Medical Claims",
        client: "Stroke Patient Recovery",
        preview:
          '"I suddenly felt as though I had forgotten what had happened two days ago", said one anxious client calling by midnight. A medical emergency that escalated from HK$70,000 to HK$900,000 in days, and a decade-old Premium Medical Policy that shielded the family from financial turmoil. Afterall, this is really a question of personal choice.',
        icon: "stethoscope",
        readTime: "7 min read",
        outcome:
          "Medical claim approved within 2 days, family focused on recovery instead of expenses",
      },
      {
        id: "special-health-disease",
        title: "Special Health Disease Case - Lacrimal Gland Cancer",
        category: "Rare Disease Claims",
        client: "Lacrimal Gland Cancer Patient",
        preview:
          "A rare cancer affecting only 3 in 100,000 people. The client was fortunate to have his lacrimal gland cancer detected early ten years ago and recovered after treatment. Recently, Wendy discovered he never claimed his critical illness insurance, having forgotten due to lack of guidance from his previous agent.",
        icon: "stethoscope",
        readTime: "8 min read",
        outcome:
          "Successfully recovered HK$800,000+ claim after 10 years, funding his master's degree studies",
      },
      {
        id: "executive-brain-tumor",
        title: "When Adversity Strikes the Unprepared",
        category: "Medical Emergency",
        client: "Investment Banking Executive",
        preview:
          "A high-earning female executive in investment banking, earning HK$200,000 monthly, faced her biggest challenge when her husband was diagnosed with a brain tumor. Despite her professional success in handling financial crises, personal adversity revealed her vulnerable side.",
        icon: "heartbeat",
        readTime: "7 min read",
        outcome:
          "Received HK$1,000,000 in medical insurance claims, allowing focus on recovery rather than finances",
      },
      {
        id: "family-office-services",
        title: "Family Office - Understanding High-End Client Needs",
        category: "Wealth Management",
        client: "Ultra High Net Worth Families",
        preview:
          "What defines a high-end client? Family office services typically serve families with over USD $100 million in assets. When wealth accumulation reaches a certain level, high-end clients require comprehensive advisory services and wealth succession planning.",
        icon: "building",
        readTime: "6 min read",
        outcome:
          "Comprehensive wealth management and succession planning for ultra-high-net-worth families",
      },
    ],
  },
  "zh-HK": {
    title: "案例研究與客戶故事",
    subtitle: "來自我們尊貴客戶的真實經驗和轉變成果",
    learnMore: "了解更多",

    stories: [
      {
        id: "cervical-cancer-claim",
        title: "危疾保險理賠解決方案",
        category: "保險理賠",
        client: "子宮頸癌患者",
        preview:
          "Wendy有一位客戶是子宮頸癌患者。這種癌症每年在世界各地奪去數千人的生命，過去一年有超過57萬新病例。當相互矛盾的醫療報告對侵襲性癌細胞產生不確定性時，兩家保險公司的反應不同——友邦保險批准了理賠，而M公司拒絕了，儘管她是他們二十多年的客戶。",
        icon: "heartbeat",
        readTime: "6分鐘閱讀",
        outcome:
          "友邦保險基於以客戶為中心的方法批准理賠，而M公司儘管有20+年關係仍拒絕理賠",
      },
      {
        id: "joshua-tribute",
        title: "Wendy Lee女士的話 - 紀念Joshua",
        category: "客戶致敬",
        client: "Joshua的傳奇",
        preview:
          "我的客戶Joshua，他改變了我的生活，雖然他已經離世，但他的傳奇永存！Wendy Lee女士對一位體現了優雅、理解和保險關係中真正信任意義的客戶的衷心致敬。",
        icon: "heart",
        readTime: "8分鐘閱讀",
        outcome: "持續激勵理財規劃師以奉獻精神服務的持久傳奇",
      },
      {
        id: "mansfield-reflection",
        title: "理賠後的反思 - Mansfield Lai先生的話",
        category: "醫療理賠",
        client: "中風患者康復",
        preview:
          "「我突然覺得好像忘記了兩天前發生的事情」，一位焦急的客戶在午夜打電話說。一個醫療緊急情況在幾天內從港幣7萬元升級到90萬元，而一份十年前的高端醫療保單保護了家庭免受財務風暴。畢竟，這真的是個人選擇的問題。",
        icon: "stethoscope",
        readTime: "7分鐘閱讀",
        outcome: "醫療理賠在2天內獲批，家人專注於康復而非費用",
      },
      {
        id: "special-health-disease",
        title: "特殊健康疾病案例",
        category: "罕見疾病理賠",
        client: "淚管癌患者",
        preview:
          "特殊健康疾病淚管癌，一種罕見的癌症，大概每十萬人才有三個人確診。喬布斯曾經講過，當醫生告訴他他患有胰臟癌的時候，他連胰臟在哪裏也不知道。是的，這個世界有太多疾病，太多可能性， 但偏偏有些人就是會患上這一些你連聽都沒有聽過的疾病。故事的主角很幸運，十年前他的淚管癌發現得早，經過治療後康復出院。",
        icon: "stethoscope",
        readTime: "8分鐘閱讀",
        outcome: "成功追回十年後80多萬港元理賠，成為修讀碩士的資金",
      },
      {
        id: "executive-brain-tumor",
        title: "意外來臨的無助",
        category: "醫療緊急情況",
        client: "投資銀行女高管",
        preview:
          "月薪20萬的女強人在投行裡面呼風喚雨，擔當起多少金融才俊夢寐以求的職業，她同時是一名妻子，與丈夫幸福地過著平靜的都市生活。當一個金融業精英可不容易，清晰的頭腦固然是不可或缺，更重要的是臨危不懼、處變不驚的能力。",
        icon: "heartbeat",
        readTime: "7分鐘閱讀",
        outcome: "獲得100萬港元醫療保險理賠，讓家庭專注於康復而非財務壓力",
      },
      {
        id: "family-office-services",
        title: "家族辦公室了解高端客戶的需要",
        category: "財富管理",
        client: "超高淨值家族",
        preview:
          "什麼是高端客戶？是指專業人士嗎？家族辦公室的服務對象一般擁有超過1億美元的家族資產。當財富的累積達到一定水平，高端客戶的理財需要龐大，他們需要專業的顧問意見以及相關的財富傳承方案安排。",
        icon: "building",
        readTime: "6分鐘閱讀",
        outcome: "為超高淨值家族提供全面的財富管理和傳承規劃服務",
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

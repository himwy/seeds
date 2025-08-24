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
    title: "Client Success Stories",
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
          "\"I suddenly felt as though I had forgotten what had happened two days ago\", said one anxious client calling by midnight. A medical emergency that escalated from HK$70,000 to HK$900,000 in days, and a decade-old Premium Medical Policy that shielded the family from financial turmoil. Afterall, this is really a question of personal choice.",
        icon: "stethoscope",
        readTime: "7 min read",
        outcome:
          "Medical claim approved within 2 days, family focused on recovery instead of expenses",
      },
    ],
  },
  "zh-HK": {
    title: "客戶成功故事",
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
        outcome: "友邦保險基於以客戶為中心的方法批准理賠，而M公司儘管有20+年關係仍拒絕理賠",
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
        outcome:
          "持續激勵理財規劃師以奉獻精神服務的持久傳奇",
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
        outcome:
          "醫療理賠在2天內獲批，家人專注於康復而非費用",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaUsers className="text-6xl text-green-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
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
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Story Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {story.category}
                      </span>
                      <IconComponent className="text-2xl text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-green-600 font-medium text-sm">
                      {story.client}
                    </p>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {story.preview}
                    </p>

                    {/* Outcome Highlight */}
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-green-700 text-sm mb-2">
                        Key Outcome:
                      </h4>
                      <p className="text-green-600 text-sm">{story.outcome}</p>
                    </div>

                    {/* Read Time & Learn More */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        {story.readTime}
                      </span>
                      <Link href={`/case-studies/client-stories/${story.id}`}>
                        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 group">
                          {t.learnMore}
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
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

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {language === "en"
                ? "Ready to Create Your Success Story?"
                : "準備創造您的成功故事？"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === "en"
                ? "Let us help you navigate your financial journey with the same dedication and expertise our clients have experienced."
                : "讓我們以客戶體驗過的同樣專業和奉獻精神，幫助您駕馭財務旅程。"}
            </p>
            <Link href="/contact">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                {language === "en" ? "Get Started Today" : "立即開始"}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

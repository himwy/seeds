"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaQuoteLeft, FaStar, FaChartLine, FaTrophy, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../../components/LanguageContext";

const translations = {
  en: {
    title: "Client Success Stories",
    subtitle: "Real experiences and testimonials from our valued clients",
    
    testimonials: {
      title: "Client Testimonials",
      items: [
        {
          name: "Sarah Chen",
          role: "Family Office Principal",
          company: "Chen Family Office",
          content: "Seeds Financial Group transformed our family's approach to wealth management. Their holistic strategy and personalized service exceeded our expectations.",
          rating: 5,
          image: "/assets/client-1.jpg"
        },
        {
          name: "Michael Rodriguez",
          role: "CEO & Founder",
          company: "Rodriguez Enterprises",
          content: "The team's expertise in succession planning helped us navigate a complex multi-generational transition seamlessly. Truly professional service.",
          rating: 5,
          image: "/assets/client-2.jpg"
        },
        {
          name: "Emily Wang",
          role: "Investment Committee Chair",
          company: "Wang Family Foundation",
          content: "Their ESG investment approach aligns perfectly with our family values while delivering exceptional returns. Outstanding partnership.",
          rating: 5,
          image: "/assets/client-3.jpg"
        }
      ]
    },

    successStories: {
      title: "Success Stories",
      stories: [
        {
          title: "Tech Entrepreneur's Wealth Transition",
          client: "Technology Startup Founder",
          challenge: "Managing $200M liquidity event and establishing family office structure",
          solution: "Comprehensive wealth management strategy with tax-efficient structures",
          results: [
            "35% tax savings through strategic planning",
            "Diversified portfolio across 8 asset classes",
            "Family governance framework established",
            "Next-generation education program implemented"
          ],
          timeframe: "18 months",
          category: "Wealth Transition"
        },
        {
          title: "Multi-Generational Family Business",
          client: "Fourth-Generation Manufacturing Family",
          challenge: "Succession planning for $500M family business with 15 family members",
          solution: "Structured succession plan with family governance and professional management",
          results: [
            "Smooth leadership transition completed",
            "Business valuation increased by 40%",
            "Family conflicts resolved through governance",
            "Next-gen successfully integrated"
          ],
          timeframe: "24 months",
          category: "Succession Planning"
        },
        {
          title: "Impact Investment Portfolio",
          client: "Philanthropic Family Foundation",
          challenge: "Balancing financial returns with social impact across $100M portfolio",
          solution: "ESG-focused investment strategy with impact measurement framework",
          results: [
            "12% annual returns achieved",
            "50+ social impact investments",
            "Carbon footprint reduced by 60%",
            "Awards for sustainable investing"
          ],
          timeframe: "36 months",
          category: "Impact Investing"
        }
      ]
    },

    feedback: {
      title: "Client Feedback Highlights",
      categories: [
        {
          title: "Service Excellence",
          score: 4.9,
          comments: [
            "Exceptional attention to detail",
            "Always available when needed",
            "Proactive communication",
            "Tailored solutions"
          ]
        },
        {
          title: "Investment Performance",
          score: 4.8,
          comments: [
            "Consistent outperformance",
            "Strong risk management",
            "Diversified strategies",
            "Transparent reporting"
          ]
        },
        {
          title: "Family Governance",
          score: 4.9,
          comments: [
            "Effective conflict resolution",
            "Clear communication",
            "Educational programs",
            "Next-gen engagement"
          ]
        }
      ]
    },

    metrics: {
      title: "Client Success Metrics",
      stats: [
        { number: "150+", label: "Families Served", icon: "users" },
        { number: "$2.5B+", label: "Assets Under Management", icon: "chart" },
        { number: "98%", label: "Client Retention Rate", icon: "heart" },
        { number: "25+", label: "Years Combined Experience", icon: "trophy" }
      ]
    }
  },
  "zh-HK": {
    title: "客戶成功故事",
    subtitle: "來自我們尊貴客戶的真實經驗和證言",
    
    testimonials: {
      title: "客戶證言",
      items: [
        {
          name: "陳莎拉",
          role: "家族辦公室主管",
          company: "陳氏家族辦公室",
          content: "Seeds Financial Group 改變了我們家族的財富管理方式。他們的整體策略和個性化服務超出了我們的期望。",
          rating: 5,
          image: "/assets/client-1.jpg"
        },
        {
          name: "麥克·羅德里格斯",
          role: "首席執行官及創始人",
          company: "羅德里格斯企業",
          content: "團隊在接班規劃方面的專業知識幫助我們順利完成了複雜的多代傳承。真正專業的服務。",
          rating: 5,
          image: "/assets/client-2.jpg"
        },
        {
          name: "王艾米麗",
          role: "投資委員會主席",
          company: "王氏家族基金會",
          content: "他們的ESG投資方法與我們的家族價值觀完美契合，同時帶來了卓越的回報。傑出的合作夥伴關係。",
          rating: 5,
          image: "/assets/client-3.jpg"
        }
      ]
    },

    successStories: {
      title: "成功故事",
      stories: [
        {
          title: "科技企業家的財富轉型",
          client: "科技初創公司創始人",
          challenge: "管理2億美元流動性事件並建立家族辦公室結構",
          solution: "具有稅務高效結構的綜合財富管理策略",
          results: [
            "通過戰略規劃節省35%稅收",
            "跨8個資產類別的多元化投資組合",
            "建立家族治理框架",
            "實施下一代教育計劃"
          ],
          timeframe: "18個月",
          category: "財富轉型"
        },
        {
          title: "多代家族企業",
          client: "第四代製造業家族",
          challenge: "為價值5億美元的家族企業制定接班計劃，涉及15名家族成員",
          solution: "具有家族治理和專業管理的結構化接班計劃",
          results: [
            "順利完成領導層過渡",
            "企業估值增長40%",
            "通過治理解決家族衝突",
            "下一代成功融入"
          ],
          timeframe: "24個月",
          category: "接班規劃"
        },
        {
          title: "影響力投資組合",
          client: "慈善家族基金會",
          challenge: "在1億美元投資組合中平衡財務回報與社會影響",
          solution: "以ESG為重點的投資策略，配合影響力測量框架",
          results: [
            "實現12%年回報率",
            "50+社會影響力投資",
            "碳足跡減少60%",
            "獲得可持續投資獎項"
          ],
          timeframe: "36個月",
          category: "影響力投資"
        }
      ]
    },

    feedback: {
      title: "客戶反饋亮點",
      categories: [
        {
          title: "服務卓越",
          score: 4.9,
          comments: [
            "對細節的卓越關注",
            "需要時總是可用",
            "主動溝通",
            "量身定制的解決方案"
          ]
        },
        {
          title: "投資表現",
          score: 4.8,
          comments: [
            "持續超越基準",
            "強大的風險管理",
            "多元化策略",
            "透明報告"
          ]
        },
        {
          title: "家族治理",
          score: 4.9,
          comments: [
            "有效的衝突解決",
            "清晰的溝通",
            "教育計劃",
            "下一代參與"
          ]
        }
      ]
    },

    metrics: {
      title: "客戶成功指標",
      stats: [
        { number: "150+", label: "服務家庭", icon: "users" },
        { number: "$2.5B+", label: "管理資產", icon: "chart" },
        { number: "98%", label: "客戶保留率", icon: "heart" },
        { number: "25+", label: "年綜合經驗", icon: "trophy" }
      ]
    }
  }
};

const iconMap = {
  users: FaUsers,
  chart: FaChartLine,
  heart: FaHeart,
  trophy: FaTrophy
};

export default function ClientStoriesPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  };

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

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              {t.metrics.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.metrics.stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
                    <IconComponent className="text-4xl text-green-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              {t.testimonials.title}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <FaQuoteLeft className="text-4xl text-green-600 mx-auto mb-6" />
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      &ldquo;{t.testimonials.items[currentTestimonial].content}&rdquo;
                    </p>
                    <div className="flex justify-center mb-4">
                      {[...Array(t.testimonials.items[currentTestimonial].rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-xl" />
                      ))}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {t.testimonials.items[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {t.testimonials.items[currentTestimonial].role}
                    </p>
                    <p className="text-green-600 font-semibold">
                      {t.testimonials.items[currentTestimonial].company}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                >
                  <FaChevronRight />
                </button>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {t.testimonials.items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              {t.successStories.title}
            </h2>
            <div className="space-y-12 max-w-6xl mx-auto">
              {t.successStories.stories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 mr-4">
                          {story.title}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {story.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        <strong>Client:</strong> {story.client}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Challenge:</h4>
                          <p className="text-gray-600">{story.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">Solution:</h4>
                          <p className="text-gray-600">{story.solution}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-green-50 rounded-lg p-6">
                        <h4 className="font-semibold text-green-600 mb-4">Results Achieved:</h4>
                        <ul className="space-y-2">
                          {story.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <FaTrophy className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{result}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <p className="text-sm text-green-600">
                            <strong>Timeframe:</strong> {story.timeframe}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              {t.feedback.title}
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.feedback.categories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {category.title}
                    </h3>
                    <div className="flex justify-center items-center">
                      <span className="text-3xl font-bold text-green-600 mr-2">
                        {category.score}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-lg ${i < Math.floor(category.score) ? 'text-yellow-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.comments.map((comment, commentIndex) => (
                      <div key={commentIndex} className="flex items-center text-gray-600 text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {comment}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

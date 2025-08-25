"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "When Adversity Strikes the Unprepared",
    subtitle: "How a successful investment banker faced her greatest challenge",
    category: "Medical Emergency",
    readTime: "7 min read",

    sections: [
      {
        title: "The Successful Executive",
        content:
          "A high-earning female executive in investment banking, earning HK$200,000 monthly, faced her biggest challenge when her husband was diagnosed with a brain tumor. She was used to handling financial crises at work with a clear mind and unshakeable composure, but personal adversity revealed a completely different side.",
      },
      {
        title: "When Crisis Hits Home",
        content:
          "Investment bankers are the invincibles, at least this has been what people are saying among the financial industry. The fact is, people do not seem to realize how vulnerable they are until disaster strikes. The wife had a mental breakdown when her husband was sent to the hospital. The things that she had to worry about were just too much. She was completely overstretched by the medical procedures, projects back in the office and giving care to her husband.",
      },
      {
        title: "The Breakdown",
        content:
          "At one point, she did not seem like an investment banker, but simply a wife who was so panicked and relentlessly called Wendy to ask for insurance claims. In fact, when it comes to claiming medical expenses at hospital, insurance companies usually need a certain period of time to pass all required documents to the underwriting department before the claim can be granted.",
      },
      {
        title: "Professional Support",
        content:
          "With years of experience working in this industry, Wendy understood what the wife was going through and she was sympathetic to her situation. The wife was not the first client, nor she would be the last client who went out of her mind in case of critical circumstances. Wendy knew that all they needed was more care and professional service. She didn't argue with the wife regarding the claiming procedures because it would not be very helpful considering the circumstances back then.",
      },
      {
        title: "The Resolution",
        content:
          "A few weeks later, a one million HKD cheque was handed to the couple, the case was settled. This substantial claim allowed the family to focus entirely on the husband's recovery without the additional stress of mounting medical bills.",
      },
    ],

    keyOutcome:
      "Received HK$1,000,000 in medical insurance claims, allowing focus on recovery rather than finances",

    tags: [
      "Medical Emergency",
      "Critical Illness",
      "Professional Support",
      "Family Crisis",
    ],
  },
  "zh-HK": {
    backToStories: "返回案例研究",
    title: "意外來臨的無助",
    subtitle: "成功的投資銀行家如何面對她最大的挑戰",
    category: "醫療緊急情況",
    readTime: "7分鐘閱讀",

    sections: [
      {
        title: "成功的女高管",
        content:
          "月薪20萬的女強人在投行裡面呼風喚雨，擔當起多少金融才俊夢寐以求的職業，她同時是一名妻子，與丈夫幸福地過著平靜的都市生活。當一個金融業精英可不容易，清晰的頭腦固然是不可或缺，更重要的是臨危不懼、處變不驚的能力。",
      },
      {
        title: "危機降臨",
        content:
          "她在投資團隊有著舉足輕重的地位，平時穿著行政套裝，舉手投足都能讓人感覺到一份沈實與穩定，彷彿再大的風浪都不能擱倒這個女人。以為一切事物都在掌握之中，可是世事無常，腦腫瘤疾病在無聲無息中襲向這對夫婦，患病的是丈夫。",
      },
      {
        title: "生活的徹底改變",
        content:
          "夫婦的平靜生活一夜間被徹底打破，兩人滿腦子都在想如何對抗病魔？醫藥費怎麼辦？手頭上的工作怎辦？唯一可幸的是他們都買了至尊醫療保險，算是在漆黑中讓他們堅持下去的一點微光。Wendy得知事情後很是替妻子擔心，知道她需要兼顧日常繁忙工作，並且要獨自承擔起照顧丈夫的責任，當中要承受的壓力非同小可。",
      },
      {
        title: "情緒的崩潰",
        content:
          "專業人士給人的感覺一般是沉着冷靜，處事態度理性。不過，人脆弱的一面往往在人生低谷中展現，在丈夫需要住院的那一天，妻子徹底崩潰了。她自從那天起每分每秒都要擔心丈夫的身體狀況，既要照顧丈夫，又要兼顧繁重的工作，住院費賬單成為了她情緒崩潰的導火線。",
      },
      {
        title: "專業的關懷",
        content:
          "這位別人眼中女強人一夜之間變得歇斯底里，幾天之間打了數十通電話給Wendy，只求保險公司盡快賠償住院費醫藥費等款項。一般而言客人入院後保險公司核對費用需時，但是在此時此刻，她沒有要理會正常的索償程序、也沒有要查詢甚麼醫療費用可獲賠償，她感到徬徨、無助和擔憂，在這一刻她不再是什麼金融大鱷，她只是一個平凡而會為丈夫感到憂心的妻子。",
      },
      {
        title: "最終的解決",
        content:
          "多年的經驗讓Wendy理解並同情妻子的行為，她不是第一個；亦不會是最後一個客人因為憂心身邊至愛而抓狂。Wendy並沒有跟她作過多的理論，因為她知道妻子在此時此刻最需要的是關懷和安慰，而不是與保險公司糾纏。這對夫婦最終得到了所有賠償，共賠了100萬，在遞上支票之後，Wendy暗暗地為夫婦二人感到慶幸，慶幸他們二人都有購買至尊醫療保險，在身患危疾的生死時刻， 尚可以抓緊最後一根稻草，令自己不至墮入財務失算、工作和健康雙失的困境。",
      },
      {
        title: "人生的啟示",
        content:
          "很多人以為自己能夠妥善處理逆境，但是我們往往太過高估自己，當災難來臨，其實很多人都會變得不知所措、求助無門。",
      },
    ],

    keyOutcome: "獲得100萬港元醫療保險理賠，讓家庭專注於康復而非財務壓力",

    tags: ["醫療緊急情況", "危疾保險", "專業支援", "家庭危機"],
  },
};

export default function ExecutiveBrainTumorPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/case-studies/client-stories"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              {t.backToStories}
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <FaHeartbeat className="text-3xl text-gray-700" />
              <div>
                <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                  {t.category}
                </span>
                <span className="text-gray-500 text-sm ml-4">{t.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Key Outcome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaHeart className="text-2xl text-gray-700" />
                <h3 className="text-xl font-bold text-gray-800">
                  {language === "en" ? "Key Outcome" : "關鍵結果"}
                </h3>
              </div>
              <p className="text-gray-600 text-lg">{t.keyOutcome}</p>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-3"
            >
              {t.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

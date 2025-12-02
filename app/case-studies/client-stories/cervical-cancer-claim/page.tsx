"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaHospital,
  FaFileAlt,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    title: "Navigating Critical Illness Claims",
    subtitle: "How Different Insurers Respond When Medical Reports Conflict",
    backToStories: "Back to Case Studies",
    overview: "Case Overview",
    challenge: "The Challenge",
    solution: "Our Approach",
    outcome: "The Outcome",
    keyLearnings: "Key Learnings",
    caseDetails: "Case Details",
    client: "Client",
    industry: "Industry",
    duration: "Duration",
    services: "Services",

    caseDetailsInfo: {
      client: "Cancer Patient",
      industry: "Healthcare & Insurance",
      duration: "6 months",
      services: "Critical Illness Insurance Claims",
    },

    story: {
      background: {
        title: "The Diagnosis",
        content:
          "Our client received a cervical cancer diagnosis—a condition affecting hundreds of thousands globally each year. While the news was naturally concerning, she maintained hope in modern medical treatment and the expertise of her healthcare team.",
      },

      firstExamination: {
        title: "Initial Medical Assessment",
        content:
          "The medical team conducted an in-vivo cell extraction at a private hospital. The results indicated aggressive cancer cells, suggesting a more serious form of the disease. Based on this assessment, her physicians recommended surgical intervention to remove the affected tissue.",
      },

      surgery: {
        title: "Post-Surgery Findings",
        content:
          "The surgery was successful, providing initial relief. However, a subsequent cell extraction at a public hospital revealed surprising results—no signs of aggressive cancer cells. This contradictory finding suggested the initial assessment may have been inaccurate, raising questions about the necessity of the procedure she had undergone.",
      },

      insuranceDilemma: {
        title: "The Insurance Challenge",
        content:
          "The conflicting medical reports created a complex insurance situation. Both her critical illness policies—one with AIA and one with another major insurer—required medical evidence of aggressive cancer for claim approval. With two contradictory reports, the outcome would depend entirely on each company's approach to such ambiguous situations.",
      },

      unexpectedOutcome: {
        title: "Contrasting Responses",
        content:
          "Despite being a customer of the other insurer for over two decades compared to only a few years with AIA, the results were unexpected. AIA approved the claim, while the long-standing insurer declined it.",
      },

      explanation: {
        title: "Understanding the Difference",
        content:
          "The difference came down to corporate philosophy. The declining insurer relied solely on the second report showing no aggressive cells. AIA, however, took a customer-centric approach: if any valid medical report indicated aggressive cancer cells, the claim would be honoured. This reflects AIA's commitment to serving and protecting clients rather than using policy technicalities to deny legitimate claims.",
      },
    },

    outcomes: [
      "AIA approved the claim based on customer-first principles",
      "Client received full financial support during her treatment",
      "The case reinforced trust in AIA's commitment to client protection",
      "Demonstrated that corporate philosophy directly impacts claim outcomes",
    ],

    learnings: [
      "A customer-centric approach is more valuable than relationship tenure",
      "Transparent claim policies build stronger client trust",
      "Corporate philosophy directly influences customer experience",
      "Client protection should take priority over policy technicalities",
    ],

    caseConclusion:
      "This case illustrates how different corporate philosophies lead to vastly different outcomes. When faced with ambiguous medical evidence, the approach an insurer takes—whether customer-centric or strictly technical—can make all the difference in a client's time of need.",
  },

  "zh-HK": {
    title: "危疾保險理賠案例分析",
    subtitle: "當醫療報告出現分歧時，不同保險公司如何應對",
    backToStories: "返回案例研究",
    overview: "案例概覽",
    challenge: "挑戰",
    solution: "我們的方法",
    outcome: "結果",
    keyLearnings: "重要啟示",
    caseDetails: "案例詳情",
    client: "客戶",
    industry: "行業",
    duration: "持續時間",
    services: "服務",

    caseDetailsInfo: {
      client: "癌症患者",
      industry: "醫療保健與保險",
      duration: "6個月",
      services: "危疾保險理賠",
    },

    story: {
      background: {
        title: "診斷",
        content:
          "我們的客戶被診斷患有子宮頸癌——這是一種每年影響全球數十萬人的疾病。雖然這個消息令人擔憂，但她對現代醫療技術和醫療團隊的專業能力保持信心。",
      },

      firstExamination: {
        title: "初步醫學評估",
        content:
          "醫療團隊在私家醫院進行了活體細胞提取。結果顯示癌細胞具有侵襲性，表明這是一種較嚴重的疾病形式。根據這項評估，醫生建議進行手術切除受影響的組織。",
      },

      surgery: {
        title: "術後發現",
        content:
          "手術成功，讓人初步鬆了一口氣。然而，在公立醫院進行的後續細胞提取卻顯示了令人意外的結果——沒有侵襲性癌細胞的跡象。這一矛盾的發現表明初始評估可能不準確，對她所接受手術的必要性提出了疑問。",
      },

      insuranceDilemma: {
        title: "保險挑戰",
        content:
          "相互矛盾的醫療報告造成了複雜的保險情況。她的兩份危疾保險——一份來自友邦保險，一份來自另一家主要保險公司——都需要侵襲性癌症的醫療證明才能批准理賠。面對兩份相互矛盾的報告，結果將完全取決於每家公司處理此類模糊情況的方式。",
      },

      unexpectedOutcome: {
        title: "截然不同的回應",
        content:
          "儘管她是另一家保險公司二十多年的客戶，而只是友邦保險幾年的客戶，結果卻出人意料。友邦保險批准了理賠，而那家長期合作的保險公司卻拒絕了。",
      },

      explanation: {
        title: "理解差異",
        content:
          "差異歸結於企業理念。拒絕理賠的保險公司僅依據第二份顯示無侵襲性細胞的報告。然而，友邦保險採取了以客戶為中心的方法：只要有任何有效的醫療報告顯示癌細胞具有侵襲性，理賠就會獲得批准。這反映了友邦保險致力於服務和保護客戶的承諾，而不是利用保單技術細節來拒絕合理的理賠。",
      },
    },

    outcomes: [
      "友邦保險基於客戶至上原則批准理賠",
      "客戶在治療期間獲得全面財務支持",
      "此案例加強了對友邦保險客戶保護承諾的信任",
      "證明企業理念直接影響理賠結果",
    ],

    learnings: [
      "以客戶為中心的方法比關係年限更有價值",
      "透明的理賠政策建立更強的客戶信任",
      "企業理念直接影響客戶體驗",
      "客戶保護應優先於保單技術細節",
    ],

    caseConclusion:
      "此案例說明不同的企業理念如何導致截然不同的結果。當面對模糊的醫療證據時，保險公司採取的方法——無論是以客戶為中心還是嚴格按技術處理——在客戶最需要幫助的時候會產生天壤之別。",
  },
};

export default function CervicalCancerClaimPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Clean Professional Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/case-studies/client-stories"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {t.backToStories}
            </Link>

            <div className="text-center">
              <FaHeartbeat className="text-4xl text-gray-700 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Case Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center font-serif">
                <FaFileAlt className="text-gray-700 mr-3" />
                {t.overview}
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed">{t.caseConclusion}</p>
              </div>
            </motion.section>

            {/* The Story */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {Object.entries(t.story).map(([key, section]) => (
                <div
                  key={key}
                  className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-serif">
                    {key === "background" && (
                      <FaHospital className="text-gray-700 mr-3" />
                    )}
                    {key === "firstExamination" && (
                      <FaFileAlt className="text-gray-700 mr-3" />
                    )}
                    {key === "surgery" && (
                      <FaExclamationTriangle className="text-gray-700 mr-3" />
                    )}
                    {key === "insuranceDilemma" && (
                      <FaShieldAlt className="text-gray-700 mr-3" />
                    )}
                    {key === "unexpectedOutcome" && (
                      <FaTimesCircle className="text-gray-700 mr-3" />
                    )}
                    {key === "explanation" && (
                      <FaCheckCircle className="text-gray-700 mr-3" />
                    )}
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </motion.section>

            {/* Outcomes */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 rounded-lg p-8 mt-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center font-serif">
                <FaCheckCircle className="text-gray-700 mr-3" />
                {t.outcome}
              </h2>
              <ul className="space-y-3">
                {t.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-gray-700 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Key Learnings */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-50 rounded-lg p-8 mt-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t.keyLearnings}
              </h2>
              <ul className="space-y-3">
                {t.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{learning}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 font-serif">
                {t.caseDetails}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t.client}</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetailsInfo.client}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.industry}</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetailsInfo.industry}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.duration}</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetailsInfo.duration}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.services}</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetailsInfo.services}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    title: "Critical Illness Insurance Claim Resolution",
    subtitle: "How AIA's Customer-Centric Approach Made the Difference",
    backToStories: "Back to Client Stories",
    overview: "Case Overview",
    challenge: "The Challenge",
    solution: "Our Approach",
    outcome: "The Outcome",
    keyLearnings: "Key Learnings",

    caseDetails: {
      client: "Cervical Cancer Patient",
      industry: "Healthcare & Insurance",
      duration: "6 months",
      services: "Critical Illness Insurance Claims",
    },

    story: {
      background: {
        title: "The Diagnosis",
        content:
          "Wendy has a client who is a cervical cancer patient. This type of cancer kills thousands of people in the world every year, with more than 570k new cases over the past year. She was worried when she was told that she had cancer. Having that said, having faith in modern medical technology, she knew that doctors could help her. She needed to have faith.",
      },

      firstExamination: {
        title: "Initial Medical Examination",
        content:
          "The first thing that doctors could do was to examine the cancer cells in her body. They conducted an in-vivo cell extraction, in a private hospital. When the medical report was out, she was devastated as the cancer cells were showing aggressiveness, which indicates a more severe type of cancer. Doctor's advice was to conduct a medical surgery and remove the tissue.",
      },

      surgery: {
        title: "The Surgery and Shocking Discovery",
        content:
          "The operation was a success. She could finally be a bit relieved. After the removal, a second cell extraction was conducted in a public hospital, and the result was dramatic. Medical report showed no aggressiveness from the cancer cells, which means the removal surgery was superfluous. She was stunned when she heard that. All the pain that she suffered, all the worrying from her family, all the medical expenses were induced by a medical error. She was furious as she felt like being tricked by all the medical staff in the hospital.",
      },

      insuranceDilemma: {
        title: "The Insurance Coverage Challenge",
        content:
          "Another issue came, medical insurance coverage. At that time she was holding two critical illness insurance policies from AIA and M company respectively. When it comes to claiming the sum insured in a policy, both companies require aggressive cancer with medical proof. The issue is that she had got two conflicting medical reports, so which one would insurance companies rely on when she makes her claims? There is a hidden rule in the industry that companies would treat their old customers more leniently when it comes to claiming.",
      },

      unexpectedOutcome: {
        title: "Unexpected Results",
        content:
          "She had been a customer of M company for over two decades, while she had purchased a critical illness policy from AIA for no more than a few years. Therefore, she went to M Company first. The thing did not turn out as she had expected. AIA granted the claim, while M Company rejected.",
      },

      explanation: {
        title: "The Corporate Philosophy Difference",
        content:
          "She called on M Company's service agent and asked for an explanation. She was then told that M Company had relied on the second medical report which showed a negative result on the aggressiveness of the cancer cells thus rejected the claim. AIA, to the contrary, allowed the claim once there was a single medical report, whatever and whenever it had been made, which showed aggressiveness of cancer cells. The corporate objective of AIA is to serve and to protect. Despite all the complexities in the terms and conditions of the insurance policy, AIA does not want to use them as a tool to reject claims. It is the trust and confidence from our customers that keep AIA thriving and achieving in this industry throughout all these years.",
      },
    },

    outcomes: [
      "AIA granted the claim despite being the newer insurance relationship",
      "Customer received full financial support during medical treatment",
      "Trust and confidence in AIA's commitment to customer protection reinforced",
      "Demonstrated AIA's principle of not using policy complexities to reject claims",
    ],

    learnings: [
      "Customer-centric approach trumps relationship tenure in insurance claims",
      "Clear, transparent claim policies build stronger customer trust",
      "Corporate philosophy directly impacts customer experience and satisfaction",
      "Serving and protecting customers should be the priority over policy technicalities",
    ],
  },

  "zh-HK": {
    title: "危疾保險理賠解決方案",
    subtitle: "友邦保險以客戶為中心的方法如何發揮作用",
    backToStories: "返回客戶故事",
    overview: "案例概覽",
    challenge: "挑戰",
    solution: "我們的方法",
    outcome: "結果",
    keyLearnings: "重要學習",

    caseDetails: {
      client: "子宮頸癌患者",
      industry: "醫療保健與保險",
      duration: "6個月",
      services: "危疾保險理賠",
    },

    story: {
      background: {
        title: "診斷",
        content:
          "Wendy有一位客戶是子宮頸癌患者。這種癌症每年在世界各地奪去數千人的生命，過去一年有超過57萬新病例。當她被告知患有癌症時，她很擔心。話雖如此，對現代醫療技術有信心，她知道醫生可以幫助她。她需要有信心。",
      },

      firstExamination: {
        title: "初步醫學檢查",
        content:
          "醫生能做的第一件事就是檢查她體內的癌細胞。他們在私家醫院進行了活體細胞提取。當醫療報告出來時，她感到沮喪，因為癌細胞顯示出侵襲性，這表明是一種更嚴重的癌症類型。醫生的建議是進行醫療手術並切除組織。",
      },

      surgery: {
        title: "手術和驚人發現",
        content:
          "手術成功了。她終於可以稍微安心了。手術後，在公立醫院進行了第二次細胞提取，結果很戲劇性。醫療報告顯示癌細胞沒有侵襲性，這意味著切除手術是多餘的。當她聽到這個消息時，她感到震驚。她所遭受的所有痛苦，家人的所有擔憂，所有醫療費用都是由醫療錯誤引起的。她很憤怒，因為她覺得被醫院的所有醫務人員欺騙了。",
      },

      insuranceDilemma: {
        title: "保險覆蓋挑戰",
        content:
          "另一個問題出現了，醫療保險覆蓋。當時她分別持有友邦保險和M公司的兩份危疾保險單。在申請保單中的保額時，兩家公司都要求提供侵襲性癌症的醫療證明。問題是她得到了兩份相互矛盾的醫療報告，那麼當她申請理賠時，保險公司會依賴哪一份？業內有一個潛規則，公司在理賠時會對老客戶更寬鬆。",
      },

      unexpectedOutcome: {
        title: "意外結果",
        content:
          "她已經是M公司二十多年的客戶，而她從友邦保險購買危疾保險單不到幾年。因此，她首先去了M公司。事情沒有按她預期的發展。友邦保險批准了理賠，而M公司拒絕了。",
      },

      explanation: {
        title: "企業理念的差異",
        content:
          "她致電M公司的服務代理並要求解釋。她被告知M公司依據的是第二份醫療報告，該報告顯示癌細胞侵襲性呈陰性結果，因此拒絕了理賠。相反，友邦保險允許理賠，只要有一份醫療報告，無論何時製作，顯示癌細胞的侵襲性。友邦保險的企業目標是服務和保護。儘管保險單條款和條件複雜，友邦保險不想將其用作拒絕理賠的工具。正是客戶的信任和信心讓友邦保險在這個行業中多年來蓬勃發展並取得成就。",
      },
    },

    outcomes: [
      "友邦保險批准了理賠，儘管是較新的保險關係",
      "客戶在醫療治療期間獲得全面財務支持",
      "對友邦保險客戶保護承諾的信任和信心得到加強",
      "展示了友邦保險不使用保單複雜性拒絕理賠的原則",
    ],

    learnings: [
      "以客戶為中心的方法在保險理賠中勝過關係任期",
      "清晰、透明的理賠政策建立更強的客戶信任",
      "企業理念直接影響客戶體驗和滿意度",
      "服務和保護客戶應該優先於保單技術細節",
    ],
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
                <p className="text-lg leading-relaxed">
                  This case demonstrates how corporate philosophy and
                  customer-centric approaches can make a significant difference
                  in critical moments. When conflicting medical reports created
                  uncertainty, two insurance companies with different
                  philosophies responded very differently, showcasing the
                  importance of putting customer protection first.
                </p>
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
                Case Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetails.client}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetails.industry}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetails.duration}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Services</p>
                  <p className="font-semibold text-gray-800">
                    {t.caseDetails.services}
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

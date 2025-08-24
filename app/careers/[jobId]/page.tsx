"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaFileAlt,
  FaHandshake,
  FaLanguage,
  FaHeart,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Job data - this would typically come from a database or API
const jobData = {
  en: {
    "wealth-manager": {
      id: "wealth-manager",
      title: "Wealth Management Manager",
      chineseTitle:
        "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "Hong Kong, Macau and China Region",
      type: "Full-time",
      department: "Wealth Management",
      description: [
        "With wealth management continuing to be a fast-growing industry in Hong Kong and China, we are looking for an ambitious individual to be part of our dynamic team.",
        "In this role, you will oversee and guide client asset management, crafting and implementing tailored investment strategies that ensure sustainable long-term growth.",
        "We provide comprehensive and continuous training to ensure you grasp the skill and knowledge.",
        "We are always happy to work with smart people who are ambitious and passionate.",
      ],
      responsibilities: [
        "Develop and implement customized financial and investment strategies for HK and Mainland exclusive clients",
        "Monitor and manage client portfolios, regularly assessing and adjusting investment allocations to meet financial goals",
        "Maintain close communication with existing clients, understanding their needs, and providing expert guidance",
        "Stay informed about market trends and economic indicators, offering forward-looking investment insights and risk management strategies",
      ],
      benefits: [
        "Local and overseas conventions",
        "Fast-tracked career progressions",
        "Ongoing professional development and training opportunities",
        "Flexibility to help you enjoy a work-life balance",
        "Attractive package, performance-based bonus and commission",
      ],
      requirements: [
        "A degree holder",
        "Fluent in reading and writing Cantonese and Mandarin. (English is a plus)",
        "Looking for a challenging career",
        "Have great interpersonal skills",
        "Have a great understanding of financial markets",
        "A valid working visa",
        "Passionate about life and building a brighter future",
      ],
      notes: [
        "Candidates who are transitioning and looking for a career change from a different industry are welcome",
        "Applicants with less experience will be considered for manager/executive positions",
        "Our company is an Equal Employment Opportunity employer that adheres to policies that are based on merit and business needs",
        "Candidates without an appropriate visa to work in Hong Kong will not be entertained",
      ],
      email: "hr@actiondoitnow.com",
    },
    "wealth-intern": {
      id: "wealth-intern",
      title: "Wealth Management Intern (Hong Kong, Macau and China Region)",
      chineseTitle:
        "見習財富策劃經理(歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "Hong Kong, Macau and China Region",
      type: "Internship",
      department: "Wealth Management",
      description: [
        "Are you passionate about finance and eager to kickstart your career in wealth management? We're looking for motivated and talented interns to join our dynamic team.",
        "As a Wealth Management Intern, you'll gain hands-on experience in financial analysis, asset allocation, and client advisory services. You'll work closely with seasoned professionals, learning the ins and outs of portfolio management, risk assessment, and strategic planning.",
      ],
      responsibilities: [
        "Assist in the analysis and management of client portfolios",
        "Support the development of customized financial strategies",
        "Conduct market research and financial data analysis",
        "Collaborate with our team on client presentations",
        "Learn best practices in risk management and investment planning",
      ],
      benefits: [
        "Comprehensive and continuous training, allowing you to grasp the skill and knowledge",
        "Mentorship from experienced wealth management professionals",
        "Real-world experience in financial planning and advisory",
        "Opportunities to contribute to impactful client projects",
        "Potential for full-time employment upon successful completion of the internship",
        "Performance/ commission bonus, life and medical insurance",
      ],
      requirements: [
        "A degree holder, or currently pursuing a degree in Finance, Economics, Business, or a related field",
        "A keen interest in financial markets and investment strategies",
        "Eagerness to learn and adapt in a fast-paced environment",
        "Strong analytical and problem-solving skills",
      ],
      notes: [
        "We aim to develop young people to be a Future Leader",
        "Apply now if you are looking for a challenging career, are passionate about life, have great interpersonal skills and are looking to build your future",
        "Our company is an Equal Employment Opportunity employer that adheres to policies that are based on merit and business needs when it comes to hiring, recruitment, compensation, benefits, terminations and all other terms of conditions of employment",
        "Please accept our utmost appreciation for your interest and while we may contact you to request further information, please note that only applicants under consideration will be invited for a follow-up interview",
        "Candidates without an appropriate visa to work in Hong Kong will not be entertained",
      ],
      email: "hr@actiondoitnow.com",
    },
  },
  "zh-HK": {
    "wealth-manager": {
      id: "wealth-manager",
      title: "財富管理經理",
      chineseTitle:
        "財富策劃經理 (歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "香港、澳門及中國地區",
      type: "全職",
      department: "財富管理",
      description: [
        "隨著財富管理在香港和中國繼續成為快速增長的行業，我們正在尋找一位有抱負的個人加入我們充滿活力的團隊。",
        "在這個職位上，您將監督和指導客戶資產管理，制定和實施量身定制的投資策略，確保可持續的長期增長。",
        "我們提供全面和持續的培訓，確保您掌握所需的技能和知識。",
        "我們始終樂於與聰明、有抱負和充滿熱情的人合作。",
      ],
      responsibilities: [
        "為香港和內地專屬客戶制定和實施定制的財務和投資策略",
        "監控和管理客戶投資組合，定期評估和調整投資配置以實現財務目標",
        "與現有客戶保持密切溝通，了解他們的需求，並提供專業指導",
        "及時了解市場趨勢和經濟指標，提供前瞻性的投資見解和風險管理策略",
      ],
      benefits: [
        "本地和海外會議",
        "快速職業發展軌道",
        "持續的專業發展和培訓機會",
        "靈活性幫助您享受工作與生活的平衡",
        "有吸引力的薪酬、績效獎金和佣金",
      ],
      requirements: [
        "學位持有者",
        "流利的粵語和普通話讀寫能力（英語是加分項）",
        "尋求具挑戰性的職業",
        "具有出色的人際交往技能",
        "對金融市場有很好的理解",
        "有效的工作簽證",
        "對生活充滿熱情，致力於建設更美好的未來",
      ],
      notes: [
        "歡迎正在轉型並尋求從不同行業轉換職業的候選人",
        "經驗較少的申請者將被考慮擔任經理/行政職位",
        "我們公司是平等就業機會雇主，在招聘、薪酬、福利、終止和所有其他就業條款方面堅持基於績效和業務需要的政策",
        "沒有在香港工作適當簽證的候選人將不予考慮",
      ],
      email: "hr@actiondoitnow.com",
    },
    "wealth-intern": {
      id: "wealth-intern",
      title: "財富管理實習生 (香港、澳門及中國地區)",
      chineseTitle:
        "見習財富策劃經理(歡迎應屆畢業生/海外畢業回流/IANG/受養人簽證)",
      location: "香港、澳門及中國地區",
      type: "實習",
      department: "財富管理",
      description: [
        "您對金融充滿熱情並渴望開始財富管理職業生涯嗎？我們正在尋找積極進取、才華橫溢的實習生加入我們充滿活力的團隊。",
        "作為財富管理實習生，您將在財務分析、資產配置和客戶諮詢服務方面獲得實踐經驗。您將與經驗豐富的專業人士密切合作，學習投資組合管理、風險評估和戰略規劃的來龍去脈。",
      ],
      responsibilities: [
        "協助分析和管理客戶投資組合",
        "支持定制財務策略的開發",
        "進行市場研究和財務數據分析",
        "與我們的團隊合作進行客戶演示",
        "學習風險管理和投資規劃的最佳實踐",
      ],
      benefits: [
        "全面和持續的培訓，讓您掌握技能和知識",
        "經驗豐富的財富管理專業人士的指導",
        "財務規劃和諮詢的實際經驗",
        "有機會參與有影響力的客戶項目",
        "實習成功完成後有可能轉為全職",
        "績效/佣金獎金，壽險和醫療保險",
      ],
      requirements: [
        "學位持有者，或目前正在攻讀金融、經濟、商業或相關領域的學位",
        "對金融市場和投資策略有濃厚興趣",
        "渴望在快節奏的環境中學習和適應",
        "較強的分析和解決問題的能力",
      ],
      notes: [
        "我們旨在培養年輕人成為未來的領袖",
        "如果您正在尋找具有挑戰性的職業，對生活充滿熱情，具有出色的人際交往能力並希望建立自己的未來，請立即申請",
        "我們公司是平等就業機會雇主，在招聘、薪酬、福利、終止和所有其他就業條款方面堅持基於績效和業務需要的政策",
        "請接受我們對您的興趣的最大感謝，雖然我們可能會聯繫您以要求進一步信息，但請注意，只有被考慮的申請者才會被邀請參加後續面試",
        "沒有在香港工作適當簽證的候選人將不予考慮",
      ],
      email: "hr@actiondoitnow.com",
    },
  },
};

const translations = {
  en: {
    backToCareers: "Back to Careers",
    keyResponsibilities: "Key Responsibilities",
    whatWeProvide: "Our Company Will Provide",
    requirements: "You Must Be",
    additionalNotes: "Additional Information",
    applyNow: "Apply Now",
    applyDescription:
      "Interested applicants may send their resumes directly to:",
    applicationNote:
      "Please accept our utmost appreciation for your interest and while we may contact you to request further information, please note that only applicants under consideration will be invited for a follow-up interview.",
    jobNotFound: "Job not found",
    jobNotFoundDesc:
      "The position you're looking for doesn't exist or has been removed.",
  },
  "zh-HK": {
    backToCareers: "返回職業發展",
    keyResponsibilities: "主要職責",
    whatWeProvide: "我們公司將提供",
    requirements: "您必須是",
    additionalNotes: "附加信息",
    applyNow: "立即申請",
    applyDescription: "有興趣的申請者可將簡歷直接發送至：",
    applicationNote:
      "請接受我們對您的興趣的最大感謝，雖然我們可能會聯繫您以要求進一步信息，但請注意，只有被考慮的申請者才會被邀請參加後續面試。",
    jobNotFound: "找不到職位",
    jobNotFoundDesc: "您正在尋找的職位不存在或已被移除。",
  },
};

export default function JobDetailsPage() {
  const { language } = useLanguage();
  const params = useParams();
  const jobId = params.jobId as string;

  const t = translations[language];
  const job =
    jobData[language][jobId as keyof (typeof jobData)[typeof language]];

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t.jobNotFound}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{t.jobNotFoundDesc}</p>
            <Link href="/careers">
              <span className="btn-primary inline-flex items-center">
                <FaArrowLeft className="mr-2" />
                {t.backToCareers}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/careers">
              <span className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                <FaArrowLeft className="mr-2" />
                {t.backToCareers}
              </span>
            </Link>
          </motion.div>

          {/* Position Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h1>
                <h2 className="text-xl md:text-2xl text-teal-600 mb-4">
                  {job.chineseTitle}
                </h2>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-teal-600" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <FaBriefcase className="mr-2 text-teal-600" />
                  {job.department} • {job.type}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {job.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Job Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Key Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFileAlt className="text-teal-600 mr-3" />
                {t.keyResponsibilities}
              </h3>
              <ul className="space-y-4">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What We Provide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaHandshake className="text-green-600 mr-3" />
                {t.whatWeProvide}
              </h3>
              <ul className="space-y-4">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaLanguage className="text-purple-600 mr-3" />
                {t.requirements}
              </h3>
              <ul className="space-y-4">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Additional Notes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaHeart className="text-red-600 mr-3" />
                {t.additionalNotes}
              </h3>
              <ul className="space-y-4">
                {job.notes.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Application Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8 mt-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t.applyNow}
            </h3>
            <p className="text-gray-700 mb-6">{t.applyDescription}</p>
            <div className="flex items-center justify-center mb-6">
              <FaEnvelope className="text-teal-600 mr-3 text-xl" />
              <a
                href={`mailto:${job.email}`}
                className="text-xl font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                {job.email}
              </a>
            </div>
            <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 italic">
                {t.applicationNote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

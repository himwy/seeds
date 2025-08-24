"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGolfBall, FaHeartbeat, FaDna, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";

const translations = {
  en: {
    title: "Academic Case Studies",
    subtitle:
      "In-depth analysis and insights from our wealth management expertise",
    backToStories: "← Back to Case Studies",
    readMore: "Read More",
    keyInsights: "Key Insights",
  },
  "zh-HK": {
    title: "學術案例研究",
    subtitle: "來自我們財富管理專業知識的深入分析和見解",
    backToStories: "← 返回案例研究",
    readMore: "閱讀更多",
    keyInsights: "重要見解",
  },
};

export default function AcademicCaseStudies() {
  const { language } = useLanguage();
  const t =
    translations[language as keyof typeof translations] || translations.en;

  const caseStudies = [
    {
      id: 1,
      title: "Family Office",
      subtitle: "Understanding High-End Customer Needs",
      icon: <FaGolfBall className="w-8 h-8" />,
      sections: [
        {
          title: "What is a High-End Customer?",
          content:
            "What is a high-end customer? Does it mean professionals? Clients of family offices typically have family assets in excess of $100 million.\n\nWhen the accumulation of wealth reaches a certain level, high-end customers have huge financial needs, and they need professional advice and related wealth inheritance plans.\n\nThe family office business allows high-end clients to properly arrange their assets, and it is also a strong backing for the client's family wealth, which can make them feel at ease and effectively pass on the family wealth across generations.\n\nHong Kong is a place where capitalists are concentrated. With the rapid development of the Greater Bay Area, the family office market has a huge space for development.",
        },
        {
          title: "Introduction to Family Office",
          content:
            "The business goal of the family office is to allow high-end clients to handle wealth inheritance, succession of family businesses, family spiritual wealth and philanthropy, and can make appropriate recommendations according to the family's own wishes.\n\nTraditional businesses include setting up family trusts and family charitable funds, helping high-end clients' assets build firewalls, protecting clients' assets, and avoiding claims from creditors and marital risks.\n\nMoreover, professionals in the family office business will also help clients manage and arrange suitable overseas asset allocation or alternative investment plans, such as private equity or green investment.\n\nApart from the business of wealth, the family office will also work on the formulation of a family charter. The family constitution refers to the arrangement of family rules, family traditions and property distribution rights within the family, so that the core values ​​and family spirit of the family can be passed on from generation to generation.\n\nIn addition to paying attention to wealth appreciation, the families of high-end customers also attach great importance to the family culture, so there will be various professionals in the market to provide corresponding services.",
        },
        {
          title: "Financial Planners and High-End Clients",
          content:
            "The financial-related services provided by general financial planners revolve around insurance/savings/funds, and will not provide other more complex services, such as the establishment of family trusts mentioned above. However, in the huge capital market of Hong Kong, clients around financial planners also need family trusts.\n\nSince financial planners are restricted by their own business, they must rely on a good network of professional relationships to meet the needs of high-end clients.\n\nWendy Lee and Mansfield Lai of Seeds Financial Group have served in the insurance industry for many years and have accumulated and established a mature and reliable relationship network to meet the needs of team clients.\n\nSeeds Financial Group sees the development potential of the Greater Bay Area and knows that the wealth management needs of high-end customers will only increase in the next 10 years. Therefore, we have made adequate preparations to meet the opportunities in the financial market.\n\nFriends who are interested in joining the wealth management industry, are you ready to learn more about this?",
        },
      ],
    },
    {
      id: 2,
      title: "Unexpected Situation",
      subtitle: "When Crisis Strikes High Achievers",
      icon: <FaHeartbeat className="w-8 h-8" />,
      sections: [
        {
          title: "The Investment Banker's Story",
          content:
            "She is a Hongkonger, a wife, and also an investment banker storming through the market in the financial industry. With a monthly income of 200k HKD, she is not the normal housewife that you may think she is. Earning yourself a position in the investment banking department is easier said than done. Bankers have a clear mind which supports the problem solving skills they need in the unpredictable money games. She is such a tough and reliable woman that it could hardly be imagined that any obstacle can beat her.",
        },
        {
          title: "When Illness Knocked on the Door",
          content:
            "Her story became totally different when illness knocked on the door. It was a brain tumor. Her husband got it, and it was devastating to the couple. All of a sudden, the peaceful middle-class life has come to an abrupt halt. Her mind was full of questions like how can she help her husband to fight the battle? What about the medical expenses? What about the ongoing projects back in the office? The only good news back then was that they both purchased the AIA CEO medical plan and the medical expenses could be covered. Once Wendy heard of the situation, she made a quick call to her customer and asked if she could do anything to help. She was worried. The only thing that Wendy could do was to check on the claiming procedures and make sure that the couple could know what is happening in the course of claiming the medical expenses. When it comes to critical illnesses, it is not only the patient who suffers. Caregivers are often put under tremendous pressure as they have to take good care of their loved ones and at the same time keep everything else in normal order.",
        },
        {
          title: "The Reality Behind Success",
          content:
            "Investment bankers are the invincibles, at least this has been what people are saying among the financial industry. The fact is, people do not seem to realize how vulnerable they are until disaster strikes. The wife had a mental breakdown when her husband was sent to the hospital. The things that she had to worry about were just too much. She was completely overstretched by the medical procedures, projects back in the office and giving care to her husband. At one point, she did not seem like an investment banker, but simply a wife who was so panicked and relentlessly called Wendy to ask for insurance claims. In fact, when it comes to claiming medical expenses at hospital, insurance companies usually need a certain period of time to pass all required documents to the underwriting department before the claim can be granted.",
        },
        {
          title: "Professional Care and Resolution",
          content:
            "With years of experience working in this industry, Wendy understood what the wife was going through and she was sympathetic to her situation. The wife was not the first client, nor she would be the last client who went out of her mind in case of critical circumstances. Wendy knew that all they needed was more care and professional service. She didn't argue with the wife regarding the claiming procedures because it would not be very helpful considering the circumstances back then. A few weeks later, a one million HKD cheque was handed to the couple, the case was settled.",
        },
      ],
    },
    {
      id: 3,
      title: "Special Health Disease",
      subtitle: "Rare Conditions and Insurance Claims",
      icon: <FaDna className="w-8 h-8" />,
      sections: [
        {
          title: "The Rare Disease Discovery",
          content:
            "Steve Jobs once said that when he was told that he got pancreatic cancer, he didn't even know what a pancreas is. Believe it or not, critical illnesses are far more complicated than we have ever imagined. Until this day, scientists are still discovering new illnesses that people are suffering from. XX cancer is an extremely rare illness. The chance of getting this sickness is nearly one of a hundred thousand. Wendy has a friend, and he was one of the people that wasn't fortunate enough to avoid this rare disease.",
        },
        {
          title: "Early Discovery and Recovery",
          content:
            "He was lucky, an early discovery of the cancer has bought him time for effective medical treatments. Thanks to the medical technology and doctor's effort, he defeated the cancer and recovered after receiving medical care. 10 years later after his victorious battle against the illness, he had an afternoon tea appointment with Wendy, and he shared his experience with her fighting cancer. When Wendy asked him about his medical expenditure, it struck him a little bit odd as he finally realized that he forgot about the medical claims! Years ago he purchased a medical insurance policy from P Company, a claim should not be available anymore theoretically due to the contractual restrictions of the policy. Wendy recommended him to give it a try. No loss, afterall. She accompanied him to P Company's office and filled in all the required documents for the claiming procedures. The paperwork was not too complicated, whether he can make the delayed claim successfully did not depend on how good was his reasons for the delay, but on the leniency and the attitude that an insurance company had when serving their customers.",
        },
        {
          title: "Unexpected Success",
          content:
            "A few weeks later Wendy received a phone call. Her friend got the claim approved and received an amount of 800k HKD. He said he never expected such an amount of money after all these years. He thanked Wendy for his advice and expressed his excitement after getting the money. This amount later became his education fund and he used that to pay off tuition fees for his master degree.",
        },
        {
          title: "Debunking Insurance Myths",
          content:
            "City dwellers often have different kinds of misconceptions and misbeliefs over insurance companies, seeing them as companies only maximize their profits and always exploiting customer's interest.\n\nMany of these beliefs are merely myths in the industry, yet not many people would have a chance to know more about the truth. We need protection, insurance companies provide us a medium, a method to transfer some of the risk from ourselves to the insurance companies.\n\nDespite being a commercial institution, the mission of an insurance company is not exploiting customers, but to offer them quality service and protection, such that the business can thrive in a sustainable and healthy manner.",
        },
      ],
    },
  ];

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
              href="/case-studies"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {t.backToStories}
            </Link>

            <div className="text-center">
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
        <div className="max-w-5xl mx-auto space-y-16">
          {caseStudies.map((study, studyIndex) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: studyIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
            >
              {/* Case Study Header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-700">{study.icon}</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {study.title}
                  </h2>
                  <p className="text-gray-600">{study.subtitle}</p>
                </div>
              </div>

              {/* Case Study Content */}
              <div className="space-y-8">
                {study.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`${
                      index !== study.sections.length - 1
                        ? "pb-6 border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {section.title}
                    </h3>

                    <div className="space-y-4">
                      {section.content
                        .split("\n\n")
                        .map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-gray-700 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

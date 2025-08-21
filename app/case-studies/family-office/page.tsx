"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../components/LanguageContext";
import { FaGolfBall, FaHeartbeat, FaDna } from "react-icons/fa";
import Image from "next/image";

export default function AcademicCaseStudies() {
  const {} = useLanguage();
  const [activeCase, setActiveCase] = useState(1);

  const caseStudies = [
    {
      id: 1,
      title: "Family Office",
      subtitle: "Understanding High-End Customer Needs",
      icon: <FaGolfBall className="w-6 h-6" />,
      sections: [
        {
          title: "What is a High-End Customer?",
          content:
            "What is a high-end customer? Does it mean professionals? Clients of family offices typically have family assets in excess of $100 million.\n\nWhen the accumulation of wealth reaches a certain level, high-end customers have huge financial needs, and they need professional advice and related wealth inheritance plans.\n\nThe family office business allows high-end clients to properly arrange their assets, and it is also a strong backing for the client's family wealth, which can make them feel at ease and effectively pass on the family wealth across generations.\n\nHong Kong is a place where capitalists are concentrated. With the rapid development of the Greater Bay Area, the family office market has a huge space for development.",
          image: "/assets/golf.png",
        },
        {
          title: "Introduction to Family Office",
          content:
            "The business goal of the family office is to allow high-end clients to handle wealth inheritance, succession of family businesses, family spiritual wealth and philanthropy, and can make appropriate recommendations according to the family's own wishes.\n\nTraditional businesses include setting up family trusts and family charitable funds, helping high-end clients' assets build firewalls, protecting clients' assets, and avoiding claims from creditors and marital risks.\n\nMoreover, professionals in the family office business will also help clients manage and arrange suitable overseas asset allocation or alternative investment plans, such as private equity or green investment.\n\nApart from the business of wealth, the family office will also work on the formulation of a family charter. The family constitution refers to the arrangement of family rules, family traditions and property distribution rights within the family, so that the core values ​​and family spirit of the family can be passed on from generation to generation.\n\nIn addition to paying attention to wealth appreciation, the families of high-end customers also attach great importance to the family culture, so there will be various professionals in the market to provide corresponding services.",
          image: "/assets/familyoffice.png",
        },
        {
          title: "Financial Planners and High-End Clients",
          content:
            "The financial-related services provided by general financial planners revolve around insurance/savings/funds, and will not provide other more complex services, such as the establishment of family trusts mentioned above. However, in the huge capital market of Hong Kong, clients around financial planners also need family trusts.\n\nSince financial planners are restricted by their own business, they must rely on a good network of professional relationships to meet the needs of high-end clients.\n\nWendy Lee and Mansfield Lai of Seeds Financial Group have served in the insurance industry for many years and have accumulated and established a mature and reliable relationship network to meet the needs of team clients.\n\nSeeds Financial Group sees the development potential of the Greater Bay Area and knows that the wealth management needs of high-end customers will only increase in the next 10 years. Therefore, we have made adequate preparations to meet the opportunities in the financial market.\n\nFriends who are interested in joining the wealth management industry, are you ready to learn more about this?",
          image: "/assets/big-bay-district.png",
        },
      ],
    },
    {
      id: 2,
      title: "Unexpected Situation",
      subtitle: "When Crisis Strikes High Achievers",
      icon: <FaHeartbeat className="w-6 h-6" />,
      sections: [
        {
          title: "The Investment Banker's Story",
          content:
            "She is a Hongkonger, a wife, and also an investment banker storming through the market in the financial industry. With a monthly income of 200k HKD, she is not the normal housewife that you may think she is. Earning yourself a position in the investment banking department is easier said than done. Bankers have a clear mind which supports the problem solving skills they need in the unpredictable money games. She is such a tough and reliable woman that it could hardly be imagined that any obstacle can beat her.",
          image: "/assets/1.png",
        },
        {
          title: "When Illness Knocked on the Door",
          content:
            "Her story became totally different when illness knocked on the door. It was a brain tumor. Her husband got it, and it was devastating to the couple. All of a sudden, the peaceful middle-class life has come to an abrupt halt. Her mind was full of questions like how can she help her husband to fight the battle? What about the medical expenses? What about the ongoing projects back in the office? The only good news back then was that they both purchased the AIA CEO medical plan and the medical expenses could be covered. Once Wendy heard of the situation, she made a quick call to her customer and asked if she could do anything to help. She was worried. The only thing that Wendy could do was to check on the claiming procedures and make sure that the couple could know what is happening in the course of claiming the medical expenses. When it comes to critical illnesses, it is not only the patient who suffers. Caregivers are often put under tremendous pressure as they have to take good care of their loved ones and at the same time keep everything else in normal order.",
          image: "/assets/2.png",
        },
        {
          title: "The Reality Behind Success",
          content:
            "Investment bankers are the invincibles, at least this has been what people are saying among the financial industry. The fact is, people do not seem to realize how vulnerable they are until disaster strikes. The wife had a mental breakdown when her husband was sent to the hospital. The things that she had to worry about were just too much. She was completely overstretched by the medical procedures, projects back in the office and giving care to her husband. At one point, she did not seem like an investment banker, but simply a wife who was so panicked and relentlessly called Wendy to ask for insurance claims. In fact, when it comes to claiming medical expenses at hospital, insurance companies usually need a certain period of time to pass all required documents to the underwriting department before the claim can be granted.",
          image: "/assets/3.png",
        },
        {
          title: "Professional Care and Resolution",
          content:
            "With years of experience working in this industry, Wendy understood what the wife was going through and she was sympathetic to her situation. The wife was not the first client, nor she would be the last client who went out of her mind in case of critical circumstances. Wendy knew that all they needed was more care and professional service. She didn't argue with the wife regarding the claiming procedures because it would not be very helpful considering the circumstances back then. A few weeks later, a one million HKD cheque was handed to the couple, the case was settled.",
          image: "/assets/4.png",
        },
      ],
    },
    {
      id: 3,
      title: "Special Health Disease",
      subtitle: "Rare Conditions and Insurance Claims",
      icon: <FaDna className="w-6 h-6" />,
      sections: [
        {
          title: "The Rare Disease Discovery",
          content:
            "Steve Jobs once said that when he was told that he got pancreatic cancer, he didn't even know what a pancreas is. Believe it or not, critical illnesses are far more complicated than we have ever imagined. Until this day, scientists are still discovering new illnesses that people are suffering from. XX cancer is an extremely rare illness. The chance of getting this sickness is nearly one of a hundred thousand. Wendy has a friend, and he was one of the people that wasn't fortunate enough to avoid this rare disease.",
          image: "/assets/5.png",
        },
        {
          title: "Early Discovery and Recovery",
          content:
            "He was lucky, an early discovery of the cancer has bought him time for effective medical treatments. Thanks to the medical technology and doctor's effort, he defeated the cancer and recovered after receiving medical care. 10 years later after his victorious battle against the illness, he had an afternoon tea appointment with Wendy, and he shared his experience with her fighting cancer. When Wendy asked him about his medical expenditure, it struck him a little bit odd as he finally realized that he forgot about the medical claims! Years ago he purchased a medical insurance policy from P Company, a claim should not be available anymore theoretically due to the contractual restrictions of the policy. Wendy recommended him to give it a try. No loss, afterall. She accompanied him to P Company's office and filled in all the required documents for the claiming procedures. The paperwork was not too complicated, whether he can make the delayed claim successfully did not depend on how good was his reasons for the delay, but on the leniency and the attitude that an insurance company had when serving their customers.",
          image: "/assets/6.png",
        },
        {
          title: "Unexpected Success",
          content:
            "A few weeks later Wendy received a phone call. Her friend got the claim approved and received an amount of 800k HKD. He said he never expected such an amount of money after all these years. He thanked Wendy for his advice and expressed his excitement after getting the money. This amount later became his education fund and he used that to pay off tuition fees for his master degree.",
          image: "/assets/7.png",
        },
        {
          title: "Debunking Insurance Myths",
          content:
            "City dwellers often have different kinds of misconceptions and misbeliefs over insurance companies, seeing them as companies only maximize their profits and always exploiting customer's interest.\n\nMany of these beliefs are merely myths in the industry, yet not many people would have a chance to know more about the truth. We need protection, insurance companies provide us a medium, a method to transfer some of the risk from ourselves to the insurance companies.\n\nDespite being a commercial institution, the mission of an insurance company is not exploiting customers, but to offer them quality service and protection, such that the business can thrive in a sustainable and healthy manner.",
          image: "/assets/8.png",
        },
      ],
    },
  ];

  const currentCase = caseStudies.find((study) => study.id === activeCase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Academic Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore comprehensive educational case studies covering family
            office structures, crisis management, and specialized insurance
            scenarios.
          </p>
        </motion.div>

        {/* Case Study Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((study) => (
            <motion.button
              key={study.id}
              onClick={() => setActiveCase(study.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCase === study.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {study.icon}
              <span>{study.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Case Study Content */}
        {currentCase && (
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  {currentCase.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{currentCase.title}</h2>
                  <p className="text-xl opacity-90">{currentCase.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8">
              {currentCase.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${
                    index !== currentCase.sections.length - 1
                      ? "mb-12 pb-12 border-b border-gray-200"
                      : "mb-0"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {section.title}
                  </h3>

                  <div
                    className={`grid gap-8 ${
                      section.image ? "md:grid-cols-2" : "grid-cols-1"
                    } items-start`}
                  >
                    <div className="space-y-4">
                      {section.content
                        .split("\n\n")
                        .map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-gray-600 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>

                    {section.image && (
                      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
            <p className="text-xl opacity-90 mb-6">
              These case studies represent real-world scenarios adapted for
              educational purposes. Contact us to discuss how these strategies
              might apply to your specific situation.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
              Contact Our Team
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

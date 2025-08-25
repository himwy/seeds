"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../components/LanguageContext";
import Link from "next/link";

const translations = {
  en: {
    backToStories: "Back to Case Studies",
    title: "Special Health Disease Case - Lacrimal Gland Cancer",
    subtitle:
      "A rare cancer case and the importance of remembering insurance claims",
    category: "Rare Disease Claims",
    readTime: "8 min read",

    sections: [
      {
        title: "The Rarity of the Disease",
        content:
          "Steve Jobs once said that when he was told that he got pancreatic cancer, he didn't even know what a pancreas is. Believe it or not, critical illnesses are far more complicated than we have ever imagined. Until this day, scientists are still discovering new illnesses that people are suffering from. Lacrimal gland cancer is an extremely rare illness. The chance of getting this sickness is nearly one of a hundred thousand. Wendy has a friend, and he was one of the people that wasn't fortunate enough to avoid this rare disease.",
      },
      {
        title: "Early Detection and Recovery",
        content:
          "He was lucky, an early discovery of the cancer has bought him time for effective medical treatments. Thanks to the medical technology and doctor's effort, he defeated the cancer and recovered after receiving medical care. 10 years later after his victorious battle against the illness, he had an afternoon tea appointment with Wendy, and he shared his experience with her fighting cancer.",
      },
      {
        title: "The Forgotten Claim",
        content:
          "When Wendy asked him about his medical expenditure, it struck him a little bit odd as he finally realized that he forgot about the medical claims! Years ago he purchased a medical insurance policy from P Company, a claim should not be available anymore theoretically due to the contractual restrictions of the policy. Wendy recommended him to give it a try. No loss, afterall. She accompanied him to P Company's office and filled in all the required documents for the claiming procedures.",
      },
      {
        title: "The Successful Outcome",
        content:
          "The paperwork was not too complicated, whether he can make the delayed claim successfully did not depend on how good was his reasons for the delay, but on the leniency and the attitude that an insurance company had when serving their customers. A few weeks later Wendy received a phone call. Her friend got the claim approved and received an amount of 800k HKD. He said he never expected such an amount of money after all these years. He thanked Wendy for her advice and expressed his excitement after getting the money. This amount later became his education fund and he used that to pay off tuition fees for his master degree.",
      },
      {
        title: "Industry Insights",
        content:
          "City dwellers often have different kinds of misconceptions and misbeliefs over insurance companies, seeing them as companies only maximize their profits and always exploiting customer's interest. Many of these beliefs are merely myths in the industry, yet not many people would have a chance to know more about the truth. We need protection, insurance companies provide us a medium, a method to transfer some of the risk from ourselves to the insurance companies. Despite being a commercial institution, the mission of an insurance company is not exploiting customers, but to offer them quality service and protection, such that the business can thrive in a sustainable and healthy manner.",
      },
    ],

    keyOutcome:
      "Successfully recovered HK$800,000+ claim after 10 years, funding master's degree studies",

    tags: [
      "Critical Illness",
      "Insurance Claims",
      "Medical Recovery",
      "Education Funding",
    ],
  },
  "zh-HK": {
    backToStories: "返回案例研究",
    title: "特殊健康疾病案例",
    subtitle: "罕見癌症案例及記住保險理賠的重要性",
    category: "罕見疾病理賠",
    readTime: "8分鐘閱讀",

    sections: [
      {
        title: "疾病的罕見性",
        content:
          "特殊健康疾病淚管癌，一種罕見的癌症，大概每十萬人才有三個人確診。喬布斯曾經講過，當醫生告訴他他患有胰臟癌的時候，他連胰臟在哪裏也不知道。是的，這個世界有太多疾病，太多可能性， 但偏偏有些人就是會患上這一些你連聽都沒有聽過的疾病。",
      },
      {
        title: "早期發現與康復",
        content:
          "故事的主角很幸運，十年前他的淚管癌發現得早，經過治療後康復出院。近日與Wendy的一次閒談中，Wendy問起他的健康狀況，他說上天保佑，幸好現在醫療發達，之前連癌症也能醫治得好。",
      },
      {
        title: "被遺忘的理賠",
        content:
          "問他醫療費用事項，才發現他沒有就危疾保險向公司申請賠償，當年前在保X公司買了保險，中介人沒有再管保單，也不知道他到哪裏去了，沒有人提醒他，就忘記了申請賠償。Wendy建議他照樣去保險公司索償，雖然有機會被拒絕賠償， 但是該總要去碰一碰運氣的，於是說要陪伴他去填表格、查詢相關程序。",
      },
      {
        title: "成功的結果",
        content:
          "朋友初時拒絕，怕會麻煩到Wendy。Wendy知道他不懂程序，當初連申請賠償也能忘記，生怕他又會出什麼岔子，堅持陪他一起去。很多時保險公司在保單條款上設有時限申報，一般為1-3個月。當時也沒有說要非得要拿到賠償的，始終已經過了十年，被保險公司拒絕也是有相當大的可能性的，因此他們二人都沒有抱著過大的期望。索償程序並不複雜，能否追回賠償就在於保險公司是否願意幫這個客人一把。",
      },
      {
        title: "意外的收穫",
        content:
          "幾星期後Wendy收到了一通電話，朋友打過來告訴她保險賠償獲得批准了，80多萬，連番感謝的說話過後，說他從來都沒有想過患病多年後還可以獲得賠償，不知道該說是保險公司佛心，還是說上天要獎賞他努力治好危疾。這一筆錢後來成為了他修讀碩士的資金，當初的以小博大，在十年之後為他創造了一筆讓他可以繼續進修的財富。",
      },
      {
        title: "行業啟示",
        content:
          "很多都市人對保險有着各種迷思、誤解，視保險公司為洪水猛獸，以為他們只管收取保費，並盡可能避免一切賠償。事實上我們每一個人都有自己的保障需要，而保險公司作為提供保障的媒介，很多時候盡可能都會讓受保人獲得幫助。雖然是一個商業營運機構，但是始終為客人帶來保障才是保險公司的真正使命，正因為秉持着使命和理念，保險行業才能夠在這一百多年來發展成現今金融產業的其中一個支柱，行業增長率更一直以指數增長。",
      },
    ],

    keyOutcome: "成功追回十年後80多萬港元理賠，成為修讀碩士的資金",

    tags: ["危疾保險", "保險理賠", "醫療康復", "教育資助"],
  },
};

export default function SpecialHealthDiseasePage() {
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
              <FaStethoscope className="text-3xl text-gray-700" />
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

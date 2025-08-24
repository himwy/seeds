"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Mansfield Lai",
    subtitle: "Co-Founder of Seeds Financial Group",
    achievements: [
      "MDRT Member",
      "Certified Financial Planner (CFP)",
      "2022 Executive Diploma in Wealth Management",
      "Registered Trust Practitioner, RTP 2022",
      "GAMAHK FLA Silver 2020",
      "The Good Citizen Award 2015",
      "HKCECES Fundraising Committee Chairman 2012",
      "South China Morning Post Financial Planning Award 2007",
    ],
    openingQuestions: [
      "What drives a man to dedicate over 20 years to the financial planning industry?",
    ],
    openingText: "",

    educationTitle: "The Pursuit of Excellence",
    cfpStory:
      "Mansfield Lai is a high achiever in his academic studies. Many may not be familiar with the weight and value of a CFP certification. Out of 100,000 licensed financial planners in Hong Kong, only around 6,000 financial planners have earned this certification. This certification is considered top-tier and highly recognized worldwide. It covers insurance, investment, taxation, company benefits and other important areas of study.",
    cfpContinued:
      "With the desire to receive such a top-tier certification, Lai spent three years studying for it while working simultaneously. Moreover, this certification does not last for a lifetime. To account for changes in the market, upon earning the certification, members still need to continue to educate themselves. They are expected to earn ten academic credits per year, and constantly learn about new career-related information and current events, to make sure one will not fall behind with the market's expectations and needs.",
    cfpAward: "",

    clientStoryTitle: "A Story That Transcends Business",
    clientStory1:
      "Mansfield Lai's story is rather unique. He was there for his client during his childhood and upbringing. This story began more than ten years ago. At the time, a client wanted to invest a few million dollars. The beneficiary was his son. But he stipulated that the investments could only be received once he became an adult. The origin of this amount of money began with a sad story. It was awarded to Lai's client after his wife passed away in a car accident. Once he signed the insurance contract, he resigned from his job and brought his son with him to study in the UK.",

    clientStory2:
      "Nevertheless, perhaps due to the loss or lack of motherly love, the child and his father never got along.",
    clientStory3:
      "Arguments, silent treatments, and even physical fights occur regularly. Lai was too kind not to intervene, so he decided to offer some help to the father and son. He began communicating with his young client to give him some advice and insights. He taught him about the importance of building a good relationship with his father. He also told him about his mother's wishes and expectations for him as she rests in peace: to become a self-motivated and ambitious individual, to do good deeds, and to be a positive contributor to our society.",

    clientStory4:
      "Unexpectedly, this child who loves to argue with his father, actually always listens to Lai, even treating him as his elder brother. As a result, Lai not only continued to help him invest his money. He even stepped up and became a role model to him. This loving relationship continued for fifteen years, until this very day.",

    clientStory5:
      "Lai himself is also a father of two children. They are ten and thirteen years old respectively. Lai also spreads his love for his children and shares a part of his heart with the young client who has a deceased mother. He hopes he can see him grow up and become a successful person in the future.",

    clientStory6:
      "Although stories as sweet and loving as this are not uncommon, after all, Lai and Lee have been involved in this industry for more than twenty years, but stories such as this are more important and carry more weight than any certification or qualification. The love that this couple share to others are not just limited to their own clients.",

    goodCitizenTitle: "A Hero in Children's Eyes",
    goodCitizenText:
      "In 2015, Mansfield received the Good Citizen Award and became a 'Justice' hero in the eyes of children. This prestigious recognition highlights his commitment to serving the community and making a positive impact beyond his professional achievements.",

    proustTitle: "Proust Questionnaire",
    proustQuestions: [
      {
        q: "What do you think is the most supreme form of happiness?",
        a: "Getting satisfactory results after hard work",
      },
      {
        q: "Who do you admire the most among the living people?",
        a: "My parents / Su Huawei's mother / Michael J. Sandel / Oksana Chusovitina / Barack Obama / Elon Musk / JK Rowling",
      },
      {
        q: "What do you consider to be your greatest achievement?",
        a: "In 2015, I received the Good Citizen Award and became a 'Justice' hero in the eyes of children.",
      },
      {
        q: "What was your favourite trip?",
        a: "Take a self-drive tour with your family, from New Jersey, via Boston, to New York",
      },
      {
        q: "What is your most treasured possession?",
        a: "Family and Health",
      },
      {
        q: "What is your most luxurious thing?",
        a: "Arguing with others is a waste of your most precious time",
      },
      {
        q: "What is your most used word or phrase?",
        a: "Everything is possible",
      },
      {
        q: "What characteristics do you value most in your friends?",
        a: "Personality",
      },
      {
        q: "What is the most loved person or thing in your life?",
        a: "My wife and children, family",
      },
      {
        q: "When and where do you feel happiest?",
        a: "Receive public exam transcripts / Receive a college acceptance letter / My own child standing on the podium / Received the customer's first 3 million check / Receive a thank you letter from a client",
      },
      {
        q: "Why did you join this industry?",
        a: "I hate being stagnant, so I join the industry to broaden my network. Each person has only 24 hours, and this industry can allow me to make the most out of my time to achieve the most income.",
      },
      {
        q: "What is your motto?",
        a: "We cannot decide the outcomes, but we can decide on our own actions.",
      },
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "黎紹忠",
    subtitle: "Seeds Financial Group 聯合創辦人",
    achievements: [
      "MDRT會員",
      "認證財務規劃師 (CFP)",
      "2022年財富管理行政文憑",
      "註冊信託從業員 RTP 2022",
      "GAMAHK FLA 銀獎 2020",
      "好市民獎 2015",
      "HKCECES籌款委員會主席 2012",
      "南華早報財務規劃獎 2007",
    ],
    openingQuestions: ["是什麼驅使一個人在財務策劃行業奉獻超過20年？"],
    openingText: "",

    educationTitle: "追求卓越",
    cfpStory:
      "黎紹忠很擅長學習。許多人可能不熟悉 CFP 認證的重要性和價值。在香港 100,000 名持牌理財規劃師中，只有約 6,000 名理財規劃師獲得此認證。該認證在全球範圍內被認為是頂級和高度認可的。它涵蓋保險、投資、稅收、公司福利和其他重要的研究領域。",
    cfpContinued:
      "為了獲得這樣的頂級認證，黎紹忠花了三年時間學習它，同時也在工作。此外，此認證不會持續一生。為了適應市場的變化，在獲得認證後，會員仍然需要繼續自我教育。他們預計每年將獲得十個學分，並不斷了解新的職業相關信息和時事，以確保不會落後於市場的期望和需求。",
    cfpAward: "",

    clientStoryTitle: "超越商業的故事",
    clientStory1:
      "Mansfield 的故事相當獨特，在這位小客戶的童年和成長過程中為他提供服務。這個故事開始於十多年前。當時，一位客戶想投資幾百萬美元。受益人是他的兒子。但他規定，只有成年後才能收到人賠償金。這筆錢的由來始於一個悲傷的故事。事實上，這是在委托人的妻子因車禍去世後，才授予Mansfield的委託人的。簽訂保險合同後，他辭去了工作，帶著兒子一起去英國留學。",

    clientStory2:
      "然而，也許是因為失去或缺乏母愛，孩子和他的父親一直沒有和睦相處。",
    clientStory3:
      "爭吵、沉默，甚至是身體上的爭鬥經常發生。Mansfield於心不忍唯有插手，決定給這對父子提供一些幫助。他開始與他的年輕客戶溝通，給他一些建議和見解。他教他與父親建立良好關係的重要性。他還告訴他母親在安息時對他的願望和期望：成為一個有上進心和雄心勃勃的人，做好事，為我們的社會做出積極的貢獻。",

    clientStory4:
      "沒想到，這個愛和父親吵架的孩子，居然一直聽Mansfield的話，甚至把他當成自己的大哥。結果，Mansfield不僅繼續幫助他進行財務策劃。他甚至挺身而出，成為他的榜樣。這種愛的關係持續了十五年，直到今天。",

    clientStory5:
      "事實上，Mansfield本人也是兩個孩子的父親。他們分別是十歲和十三歲。Mansfield也將他對自己孩子的愛傳遞給有已故母親的年輕客戶。他希望他能看到他長大，將來成為一個成功的人。",

    clientStory6:
      "雖然像這樣的甜蜜和有愛的故事並不少見，畢竟Mansfield和Wendy在這個行業已經從事了二十多年，但這樣的故事實際上比任何證書或資格都更重要、更重要。這對夫婦與他人分享的愛不僅限於他們自己的客戶。",

    goodCitizenTitle: "孩子心目中的英雄",
    goodCitizenText:
      "2015年，Mansfield接受好市民獎，成為孩子心目中的「正義」英雄。這項殊榮彰顯了他對服務社區的承諾，並在專業成就之外產生積極影響。",

    proustTitle: "普魯斯特問卷",
    proustQuestions: [
      {
        q: "你認為最完美的快樂是怎樣的？",
        a: "經過努力後取得成果",
      },
      {
        q: "還在世的人中你最欽佩的是誰？",
        a: "自己父母/蘇樺偉 媽媽/Michael J sandel / Oksana Chusovitina / Barack Obama / Elon Musk /JK Rowling",
      },
      {
        q: "你認為自己最偉大的成就是什麼？",
        a: "2015年接受好市民獎，成為孩子心目中的「正義」英雄。",
      },
      {
        q: "你最喜歡的旅行是哪一次？",
        a: "與家人一起自駕遊，從New Jersey出發，經 Boston ，再到終點New York",
      },
      {
        q: "你最珍惜的財產是什麼？",
        a: "家人及健康",
      },
      {
        q: "你最奢侈的是什麼？",
        a: "跟別人爭辯等同浪費自己最寶貴時間",
      },
      {
        q: "你使用過的最多的單詞或者是詞語是什麼？",
        a: "恭喜，加油",
      },
      {
        q: "你最看重朋友的什麼特點？",
        a: "人品",
      },
      {
        q: "你這一生中最愛的人或東西是什麼？",
        a: "太太與孩子，家人",
      },
      {
        q: "何時何地讓你感覺到最快樂？",
        a: "收到公開考試成績單 / 收到大學取錄信 / 孩子企上頒獎台 / 收到客戶第一張300萬支票 / 收到客戶的感謝信",
      },
      {
        q: "你為什麼加入這個行業?",
        a: "我討厭停滯不前, 我加入這個行業讓擴闊人脈。每人只有24小時，這行業可以複製時間，複製收入 。",
      },
      {
        q: "你的座右銘是什麼？",
        a: "我們無法選擇結果，卻可以選擇行動。",
      },
    ],
  },
};

export default function MansfieldLaiPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-8">
          <Link
            href="/team"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            {t.backToTeam}
          </Link>
        </div>
      </header>

      {/* Main Article */}
      <article className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="relative w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/assets/mansfield/mansfield pfp.jpeg"
              alt="Mansfield Lai - Co-Founder"
              fill
              className="object-cover object-top"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Opening Questions */}
        <section className="mb-16">
          <div className="text-center mb-8">
            {t.openingQuestions.map((question, index) => (
              <p
                key={index}
                className="text-xl text-gray-700 leading-relaxed mb-4"
              >
                {question}
              </p>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            {t.openingText}
          </p>
        </section>

        {/* Awards Section */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-gray-800 leading-relaxed text-base">
              {t.achievements.map((achievement, index) => (
                <p
                  key={index}
                  className={`mb-2 font-medium ${
                    achievement.includes("Good Citizen Award") ||
                    achievement.includes("好市民獎")
                      ? "text-blue-700 font-bold text-lg"
                      : ""
                  }`}
                >
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Education Background */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.educationTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-6">{t.cfpStory}</p>

          <p className="text-gray-700 leading-relaxed mb-8">{t.cfpContinued}</p>

          {/* Certificates side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/mansfield/WhatsApp Image 2022-04-04 at 4.59.17 PM.jpeg"
                alt="Mansfield Lai Certificate 1"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/mansfield/WhatsApp Image 2022-04-04 at 5.00.15 PM.jpeg"
                alt="Mansfield Lai Certificate 2"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{t.cfpAward}</p>
        </section>

        {/* Good Citizen Award - Highlighted Section */}
        <section className="mb-16">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              {t.goodCitizenTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.goodCitizenText}
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                controls
                className="w-full h-full"
                poster="/assets/mansfield/mansfield pfp.jpeg"
              >
                <source
                  src="/assets/mansfield/VIDEO-2022-12-28-23-19-39.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">
              The Good Citizen Award 2015 Recognition Video
            </p>
          </div>
        </section>

        {/* Client Service Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.clientStoryTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-6">{t.clientStory1}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.clientStory2}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.clientStory3}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.clientStory4}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.clientStory5}</p>

          <p className="text-gray-700 leading-relaxed">{t.clientStory6}</p>
        </section>

        {/* Proust Questionnaire */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.proustTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <div className="space-y-6">
            {t.proustQuestions.map((item, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-6">
                <p className="font-semibold text-gray-900 mb-2">
                  {index + 1}. {item.q}
                </p>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Andy Yiu",
    subtitle: "Business Partner",
    chineseName: "姚承彦",

    intro:
      "Andy officially joined AIA in January 2022 and came to the Seeds Financial Group family. As the new blood of the team, he has little experience but is still filled with enthusiasm. He therefore wishes to share his experience of joining AIA.",

    returningTitle: "Returning to Hong Kong",
    returningText:
      "Andy grew up in Hong Kong and went to Switzerland for college after sitting in the HKDSE exams. He majored in hospitality and event management at university, then he earned a master's degree in hospitality management. After completing his studies, Andy went to Canada for a short period, only to find that there were more opportunities in Hong Kong, so he decided to return to Hong Kong for better career prospects.",

    hospitalityTitle: "Working landscape in the hospitality industry",
    hospitalityText1:
      "Andy, a hospitality and management student, came back to Hong Kong to work as a customer service provider in a serviced residence, this was his first full-time job after graduation. At the beginning of his work, he found it very interesting. He had the opportunity to meet different customers, and interact and communicate with them. He believed that a serious service attitude was very important to his work and his relationship with customers. He also enjoyed it very much. A job nature that communicates with people.",

    hospitalityText2:
      "Gradually, however, he realized that there were several fundamental problems with his work at the time, which made him doubt whether he should continue to develop in the industry. First, the company's promotion ladder is very traditional. Generally, employees are required to have certain seniority and experience to be promoted. For example, a newly recruited college graduate needs at least 7-8 years of seniority to be promoted to the management level. I feel that it is difficult to rely on my efforts to gain more room for improvement. Second, the work content is too repetitive, and Andy gradually feels that his work is not too challenging, and there are not many practical things to learn. Once he was familiar with the general process and work content of the hotel industry, he did the same thing afterwards, which made Andy lose his interest in the hotel industry at the beginning, and also began to ask himself whether he would like to continue to work like this in the future. Third, the working hours in the hotel industry are very long, and it is often necessary to work in shifts. Many times, I have to go to work on weekends, so that I have no personal time and no control over my life rhythm. Moreover, there is a serious shortage of manpower in the industry. Andy often has to do the work of two or three people by himself. The disproportionate workload makes him start to seek more challenging and flexible work.",

    opportunityTitle: "Seeing opportunities in Hong Kong's financial industry",
    opportunityText:
      "After leaving the hotel industry, Andy actively looked for his future development direction. The opportunity made him aware of financial planning and AIA, a leader in the insurance industry in Hong Kong, as well as successful examples in the industry: Wendy and Mansfield. During an interview with Wendy, Wendy saw Andy's hard work and also noticed the young man's determination to work hard for himself, so he said to him: Even Maxima needs Bole, in Wendy's eyes, Andy is a proper Maxima, and she is confident that she can train him to be an excellent and professional financial planner.",

    aiaTitle: "About AIA",
    aiaText:
      "Before joining the company, Andy spent a lot of time searching for information about AIA. He believes that if you want to enter the financial planning industry, you must join the strongest company. Therefore, AIA is his absolute first choice. Andy himself has friends who work at AIA. Knowing that AIA's products are of high quality, he has a great competitive advantage. He also knows that the company has a lot of resources, which gives him enough confidence to choose AIA.",

    futureTitle: "Looking into the future",
    futureText:
      "As a newcomer to the industry, Andy has already made up his mind to succeed in this industry. This year he aims to reach the level of MDRT* and COT. He believes that to succeed in this industry, he must be motivated. He further promises himself that he will not let himself down or regret it. In the next five-year plan, Andy also hopes to have his team and become a Leader, so that he can rely on his hands to develop long-term and stable development in the industry.",

    footnote: "*MDRT ranks among the top 1% of global financial advisors",

    achievements: [
      "AIA Member since January 2022",
      "Switzerland Hospitality Management Graduate",
      "Master's in Hospitality Management",
      "Targeting MDRT & COT",
    ],
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Andy Yiu",
    subtitle: "業務夥伴",
    chineseName: "姚承彦",

    intro:
      "Andy 在2022年一月正式加入AIA，來到Seeds Financial Group這一個大家庭。作為一個新進團隊的年輕人，經驗不多，卻滿腔熱情，希望分享一下自己入職AIA的經歷。",

    returningTitle: "回流香港",
    returningText:
      "Andy 在香港長大，在DSE畢業以後才遠赴瑞士讀書，大學時期主修款客服務業與活動管理，學士畢業後再攻讀款客服務業管理的碩士學位。完成學業後，Andy短暫的去了加拿大發展，唯發現香港有更多的機遇，於是決定回流香港。",

    hospitalityTitle: "酒店業的就業環境",
    hospitalityText1:
      "讀酒店的Andy 回來香港就去了當一家服務式住宅的服務員，那時他畢業後第一份全職工作。起初的工作他都覺得很有趣，有機會面對到不同的客人，和他們作互動以及交流，他認為認真的服務態度對他的工作以及與客人的關係都非常重要，他也是特別的享受這一種與人交流的工作性質。",

    hospitalityText2:
      "然而，漸漸的他察覺到他當時工作有幾個根本性的問題，讓他懷疑自己是否應該繼續留在該行業發展。第一，公司的晉升階梯非常的傳統，一般都要求員工有一定的年資和經驗才能晉升，比如說一個新入職的大學畢業生，要晉升到管理階級起碼要7-8年的年資，讓Andy覺得難以靠自己的努力爭取更多的上升空間。第二，工作內容過於重複，Andy漸漸覺得自己的工作沒有太大的挑戰性，能夠學到的實際東西也不多。一旦熟悉了酒店行業的一般流程以及工作內容，其實之後做的都是一樣的東西，這讓Andy開始失去當初對酒店業的興趣，也開始問自己是否願意未來就一直這樣的工作。第三，酒店業的工時很長，也經常需要輪班工作，很多時候週末也要去上班，令自己沒有了私人時間，對自己的生活節奏沒有掌控。而且行內嚴重的缺乏人手，Andy經常要一個人做兩到三個人的工作，工作量之不成正比讓他開始尋求更具挑戰性和彈性的工作。",

    opportunityTitle: "看到香港金融業的機會",
    opportunityText:
      "離開酒店業後，Andy積極的尋找他未來的發展方向，機緣使他認識到財務策劃以及AIA這一家香港保險業龍頭，以及行內成功的例子：Wendy和Mansfield。在一次與Wendy的面試之中，Wendy看到了Andy的滿腔拼勁，也察覺到了這位年輕人有發奮向上，為自己打拼的決心，於是跟他說：即時是千里馬也需要伯樂，在Wendy的眼中Andy就是一匹妥妥的千里馬，她有信心能夠把他培訓為一位出色、專業的財務策劃師。",

    aiaTitle: "關於AIA",
    aiaText:
      "入職以前Andy花了很多時間搜尋關於AIA的資料。他認為要進入財務策劃行業，就一定要加入最強的公司，因此AIA是他的絕對首選。Andy自己也有朋友在AIA工作，知道AIA的產品優質，本來就有很大的競爭優勢，也知道公司的資源很多，能讓他有足夠的把握選擇AIA。",

    futureTitle: "展望未來",
    futureText:
      "雖然是一個業界新人，但是Andy早已經下定決心要在這個行業取得成功。這一年劍指MDRT*和COT，他認為在這個行業要取得成功就必須有衝勁，他承諾不會讓自己失望或後悔。在未來的5年計畫裡面，Andy也希望能擁有自己的團隊，成為Leader，好讓自己能靠一雙手在行業裡面長期以及穩定的發展。",

    footnote: "*MDRT為全球理財顧問中排名前1%",

    achievements: [
      "2022年1月加入AIA",
      "瑞士款客服務業管理畢業",
      "款客服務業管理碩士學位",
      "目標MDRT及COT",
    ],
  },
};

export default function AndyYiuPage() {
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
              src="/assets/andy/andy pfp.jpeg"
              alt="Andy Yiu - Business Partner"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-2xl text-gray-700 mb-2">{t.chineseName}</p>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {t.intro}
          </p>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-gray-800 leading-relaxed text-base">
              {t.achievements.map((achievement, index) => (
                <p key={index} className="mb-2 font-medium">
                  {achievement}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Returning to Hong Kong */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.returningTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.returningText}
          </p>
        </section>

        {/* Hospitality Industry */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.hospitalityTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.hospitalityText1}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.hospitalityText2}
          </p>
        </section>

        {/* Financial Industry Opportunity */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.opportunityTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {t.opportunityText}
          </p>
        </section>

        {/* About AIA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.aiaTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.aiaText}</p>
        </section>

        {/* Future Goals */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.futureTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.futureText}</p>

          {/* Footnote */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-gray-700 text-sm">{t.footnote}</p>
          </div>
        </section>
      </article>
    </div>
  );
}

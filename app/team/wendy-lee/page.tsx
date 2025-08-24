"use client";

import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaEnvelope, FaPhone } from "react-icons/fa";

const translations = {
  en: {
    backToTeam: "Back to Team",
    title: "Wendy Lee - District Manager",
    subtitle: "Co-Founder of Seeds Financial Group",
    gamaAwards:
      "Awards presented by General Agents & Managers Association of Hong Kong (GAMA):",
    awards: [
      "2021 Frontline Leader (FLA) Bronze Award",
      "2019 Frontline Leader (FLA) Gold Award",
      "2019 International Management Award (IMA) Bronze Award",
      "2018 Frontline Leader (FLA) Silver Award",
      "2017 Frontline Leader (FLA) Silver Award",
    ],
    otherAwards: [
      "Quality Advisor Award 2021",
      "IDA Bronze Dragon Award",
      "FLMI certification as a Life Insurance Manager",
      "16 years of Million Dollar Round Table (MDRT), Honor Roll and Life Member",
    ],
    openingQuestions: [
      "What made her persist in the insurance business for 20 years?",
      "How did she transform from an agent to a professional financial planner?",
    ],
    openingText:
      "These are the primary questions every insurance newcomer needs to consider. In Hong Kong AIA's SY region, at the senior district manager level, Ms. Lee's team achieved the #1 ranking across all Hong Kong regions in 2017! Good mentors are hard to find, and exceptional talents are even rarer. What kind of life aspirations and experiences have made this insurance industry 'veteran' persist through 20 years of ups and downs without hesitation?",

    educationTitle: "Educational Background",
    educationText1:
      "Ms. Lee graduated from the University of California, Irvine - the most comprehensive and strongest branch of the California school system, where she studied and successively obtained bachelor's degrees in Psychology and Business Management.",
    educationText2:
      "After graduation, she returned to Hong Kong and joined Swiss Fintech Hong Kong as a Senior Financial Advisor, undergoing comprehensive and systematic financial company position training. By chance, she joined AXA Hong Kong, one of the world's largest insurance groups, as a Senior Manager, mainly responsible for asset management and training new financial planners. It was at AXA that she truly discovered her passion for the insurance business.",
    educationText3:
      "Seeing that the insurance industry abroad was becoming mature and sophisticated while domestically there was little knowledge about it, Ms. Lee felt deeply troubled. So she made a monumentally significant decision - to extend her business to mainland China. This decision redefined the second half of her life!",
    educationText4:
      "In early 2006, Ms. Lee began working at AIA Hong Kong as a Senior District Manager, responsible for client asset management, asset inheritance, and training new financial planners.",
    educationText5:
      "Don't forget the original intention, Fang De is always. 20 years in the insurance business and 20 years of sticking to her original aspirations, Lee has won many honors and qualifications to participate in the Hong Kong AIA and SY regional summits.",
    educationText6:
      "During this period, Lee has successively won the Frontline Leader Award (FLA) Silver Award, the Management Development Award Silver Award, and the IDA Dragon Award.",
    educationText7:
      "At the same time, she also obtained multiple high-value industry qualifications including FLMI Life Insurance Manager from the American College of Life Underwriters and Registered Financial Consultant (RFC) from the International Association of Registered Financial Consultants. These top professional recognitions and multiple honors have become glorious footprints behind Lee.",

    clientServiceTitle:
      "Be responsible to your clients. Serve them with your heart.",
    clientServiceText1:
      "Sometimes, doing your job is one thing, but being patient and thorough in the way you serve your clients is a different thing. Let's look at an interesting story. Lee once had a client that gave her many headaches. This particular client bought an insurance plan from her twelve years ago. Once a year thereafter whenever the client's insurance plans are reviewed, the client was never courteous to Lee. When Lee would go see the client, the client would always show some form of dissatisfaction and a stern face. But this was never intended to be against Lee, it seems that this is how he treats many people.",
    clientServiceText2:
      "The same situation continued until Lee's client was unfortunately diagnosed with cancer. After this life changing event, Lee's client began to proactively contact her on a regular basis. Within these conversations, Lee could tell that her client had two main worries: one was the worry of not being able to obtain insured compensation, and second was the client's worry of worsening health conditions. Understandably, Lee became physically tired due to the extra work load and phone calls. Making things more difficult is the fact that she does not have all the answers to her client's questions, such as the client's health conditions back then. However, none of her client's pickiness and high expectations swayed Lee away, she even made a promise to her client at the end during a phone call: \"Listen, sir, let's divide up the work load. You focus on getting well and improving your health while I will do everything I can to help you receive your compensation. In areas where the end result could go both ways, I will still strive to do my best to fight in your favor\".",
    clientServiceText3:
      "With Lee's hard work and persistence, the client eventually received his compensation. With this money and personal savings, the client went to the USA and luckily recovered his health over time. Once his health improved, his attitude towards Lee also changed significantly. He became very respectful to Lee and also began to be much nicer to those around him. Her client would regularly tell those around him that Lee gave him a lot of confidence when he was ill, and this confidence was as precious as anything that money can buy.",
    clientServiceText4:
      'After joining AIA, she also naturally became a frequent visitor to AIA magazines and newspapers in Hong Kong, and she herself obtained a lifetime membership of the world\'s top MDRT, known as the "Hermes of the Insurance Industry".',
    clientServiceText5:
      "Many years of insurance business have cultivated Lee superb speaking skills. At the annual meeting of the Million Dollar Round Table (MDRT) in the United States, Lee delivered a speech full of experience sharing.",
    clientServiceText6:
      "In addition, she has been invited many times to give speeches at world-class universities in Hong Kong such as Chinese University.",

    familyText1:
      "If love is the driving force behind Lee's 20-year dedication to the insurance business, then her husband and family are the spiritual pillars of Lee's self-satisfaction.",
    familyText2:
      "Both of them are engaged in insurance business in AIA, Lee's husband also received a FPSB (Financial Planning Standards Board) International Financial Planning Standards Board certified international financial planner professional qualifications, and won the 2007 Hong Kong Financial Planner Award.",
    familyText3:
      "Under the influence of the couple, the two sons showed a keen interest in the insurance industry since childhood. Therefore, the couple hopes to turn the insurance business into a business and pass the business on to their two children.",
    familyText4:
      'A successful career and a happy family are the portrayal of Lee in the first half of her life. She has devoted herself to volunteer activities without hesitation, which has enriched her spiritual world! In the past few years, she has traveled to the mainland many times to encourage and help those left-behind children in the mountainous areas, participate in the "Mentorship Program", raise funds for the church, and serve as a volunteer consultant for eight world-class universities in Hong Kong.',
    familyText5:
      'The most important thing is that Lee hopes that through her 20 years of working experience and social influence, she can divert more social resources to help the "Hong Kong drift" mainland students, so that they can use their professional skills in Hong Kong to spread the word. the road to future success.',
    familyText6:
      "Today, 90% of Lee's team have university degrees and master's degrees, they all graduated from top universities in Hong Kong, and more than 90% of the members majored in finance.",
    familyText7:
      "The insurance industry in Hong Kong is booming, and more elite talents will be needed in the future. The team formed by Lee has 20 years of experience in the insurance industry and rich social resources in Hong Kong, which many domestic managers and their teams do not have. Advantage.",
    familyText8:
      "If you are looking for an elite team for asset management, then Lee's team will be your best choice!",

    philanthropyTitle: "Constantly giving back to society",
    philanthropyText1:
      "During their busiest times last year, Lai and Lee hosted a group of children from Africa. Amongst them, three of them came from Kenya. Since they were orphans, the elder child took care of the two younger children. They came to Hong Kong in hopes of seeking donations. Therefore, they lived in Lai and Lee's home during this period of time.",
    philanthropyText2:
      "It was a very busy period of time for this couple. Not only are they expected to perform exemplary at work, they also just moved into another flat and have not yet settled in. Nonetheless, they still decided to become a host family. It was an interesting experience, filled with hard work and complications. But it also made them feel warm and sympathetic.",
    philanthropyText3:
      "With an effort and desire to raise funds for their charity, these children had to visit various secondary schools to perform; singing and dancing. After a day's hard work, they went back to their host family. As they took off their shoes, even Lai and Lee's housekeeper raised her eyebrows. The condition and odor of their socks were poor and horrendous. Off course, none of them said anything or made a comment. The next day, without any hesitation, they took out many pairs of new socks and placed them next to their shoes.",
    philanthropyText4:
      "Later on, they found out every child is only entitled to two pairs of socks. Without the proper clothing, it must be very easy to get ill and feel chilly. The winter season in Hong Kong is rather chilly this year. None of these children from Africa had never experienced such cold weather before. Therefore, one of them caught a fever. Lee went out to seek for medication, and got out of her way to get more clothing for them. Surprisingly, none of them took the cloths. The reason is very simple. It is because they only have one bag pack per person. Thus, they were worried the new items would not fit inside their bag. Lee suspected it might have something to do with airline's luggage weight restrictions. Lee had the privilege to experience poverty in such simplicity, yet it is still filled with lots of happiness. The children's down to earth living standards and positive attitudes made Lee feel very warm in her heart.",
    philanthropyText5:
      "During this period of time, Lee assisted in the needs of these children as much as she could. Apart from making donations, she would also call in favors from friends to drive the kids to where they need to go, as well as giving the children better food.",
    philanthropyQuote:
      "\"Many people in the world live in pain. What you can do is try your best to make some change in their lives. Subsequently, your heart will also be filled with joy and happiness. Some people may lead a busy life and become very successful, but they may not live their lives to its fullest. Contributing towards making our world a better place should serve as part of our life's purpose. The feeling of knowing that you were able to make someone else's life better and easier because of what you did. The happiness and satisfaction you feel in your heart is priceless\", says Lai.",
    philanthropyText6:
      "Lai and Lee pay very close attention to the wellbeing of teenagers. On top of acting as a home stay family, they also invest a lot of their time into helping others. Some of them include visiting underprivileged children living in rural areas of China, and volunteering in secondary schools and universities in Hong Kong as financial consultants and speech givers. In the world of financial planning, questions and uncertainties toward future career paths, even uncertainties or problems with their life in general, Lai and Lee strive to give these young adults their most honest opinions.",
    philanthropyText7:
      "Outside of school, Lee is always more than happy to share her past experiences to young individuals entering the financial sector. As a life member of the Million Dollar Round Table (MDRT) meeting, she had the honor of being delivering speeches at various settings and locations. Furthermore, while attending an MDRT meeting in the USA, she had the honor of delivering a speech in front of 300 attendees.",
    philanthropyText8:
      "Lee does a lot more than delivering speeches. She shows her thoughts and positive values through action, not just words.",

    mentoringTitle: "Exemplary mentoring",
    mentoringText1:
      "Mansfield and Wendy are excellent mentors to their young team members.",
    mentoringText2:
      'Two years ago, a young woman wanted to join her team. At that time, she wanted to give it a try. But when Wendy asked her if she had told her relatives, friends and family, she said: "No". For the future, she didn\'t think much about it. All she had was compassion and excellent work ethic.',
    mentoringText3:
      "Wendy thought she had potential in this line of work and decided to welcome her to her team with open arms. At first, no one was willing to buy insurance plans from her. In her frustration and countless disappointments, Wendy decided to accompany her back to her hometown to meet her friends and family and show her the ropes. More importantly, Wendy wanted to guide her to become a better financial planner. The trip lasted four to five days. Their first day was very productive and they met a lot of people. Near the second day, Wendy asked her if she had any plans. She answered \"no\". Wendy tried to further push her to come up with a plan. However, she still didn't know who else to meet or turn to. Finally, she thought: \"Why don't we make a 'cold call'? Let's go to the street and talk to people who are willing to talk to us.\" Hearing her desperation, Wendy didn't know how to answer her. After all, what's the point of traveling thousands of miles to her hometown just to make a 'cold call'?",
    mentoringText4:
      "It was a beautiful day. The beginning of spring. In this tightly connected small community, maple leaves swirled and danced in the air.",
    mentoringText5:
      "In the end, Wendy still decided to drag her along with the neighbors and other residents of this small community. Wendy even met with her family to express her sincerity. She wanted to educate them more about Hong Kong's work culture, but most importantly, to start building trust with them.",
    mentoringText6:
      "What happened next was a surprise. The young woman had an epiphany and began to surpass many of her peers. At the end of the first year, she achieved very impressive results, ranking in the top 0.1% globally. From July to September 2018, her results entered the top 60 of AIA Insurance. Remember, AIA Insurance is a company with more than 15,000 financial planners. As a form of encouragement, the company placed her advertisement in Central and Hong Kong Railway Station to promote the CEO Club competition at the time.",
    mentoringText7:
      "Like many others, Wendy also thought what happened was unimaginable. But in educating and nurturing young people, she really expressed a lot of sincerity. She understands that everyone has a different work pace. Some are naturally faster than others, and some are slower. But she thinks that a slower work pace is not a problem. She thinks what's important is whether you have someone to accompany you along the way. Just like the young woman we've been talking about, she did well in school and exams, and she was also very hardworking. She knows how to face difficulties and cope with adversity. At first, all she lacked was confidence in her own abilities. However, as long as she has the right attitude and confidence, her future will definitely be bright.",
    mentoringText8:
      "Nowadays, in the first seven to eight months of the year, Wendy always devotes most of her time and energy to recruiting and developing talent. She is very good at recognizing everyone's strengths and strives to educate that person in a way that fully develops their potential. If a person has talent in computers, then he or she can do more work in data analysis. If a person has a very wise personality, then he or she may be able to focus on serving more mature elderly clients. People who think like millennials and have a relatively young mindset should enter the market with the younger generation. What never changes is our professionalism and dedication to work, which is what Mansfield and Wendy often stipulate.",
    mentoringText9:
      "Mansfield and Wendy consider themselves professionals at work. They have a long-term vision for the future and always put hard work, persistence and sincerity first. Therefore, they expect all members of the team to have the same positive attitude. In their view, what they do is not just a profession, but making the right commitments and being responsible to clients.",
    mentoringText10:
      "At home, Mansfield and Wendy have their lovely children. At work, they have hardworking team members. They hope that as the industry continues to develop in the future, more and more people will enter the market and shoulder the responsibility of serving customers with integrity and trust. It is worth noting that although their two sons are still young, they have gradually developed an interest in the insurance industry. Mansfield and Wendy are grateful for this because they have always wanted to turn their careers into a business and hope to one day pass the business on to their two children and pass on the responsibility to future generations.",
  },
  "zh-HK": {
    backToTeam: "返回團隊",
    title: "Wendy Lee - 地區經理",
    subtitle: "Seeds Financial Group 聯合創辦人",
    gamaAwards: "由香港總代理及經理協會 (GAMA) 頒發的獎項：",
    awards: [
      "2021 FLA 前線領袖銅獎",
      "2019 FLA 前線領袖金獎",
      "2019 IMA 管理卓越獎銅獎",
      "2018 FLA 管理發展獎銀獎",
      "2017 FLA 管理發展獎銀獎",
    ],
    otherAwards: [
      "2021 優質顧問大獎",
      "IDA 銅龍獎",
      "FLMI 專業資格認證",
      "百萬圓桌會議 (MDRT) Honor Roll 榮譽及終身會員資格",
    ],
    openingQuestions: [
      "是甚麼讓她堅持從業保險事業20年？",
      "如何從一個代理人蛻變成一個專業的理財策劃師？",
    ],
    openingText:
      '這是每位保險新人需要思考的首要問題。在香港友邦SY區域、資深分區經理級別中李春雷女士所帶領的團隊斬獲2017年度香港全區域排名第一！伯樂難尋，千里馬更難尋，究竟是怎樣的人生抱負與經歷，讓這位保險行業的"老司機"20年風雨無阻、義無反顧的呢？',

    educationTitle: "教育程度",
    educationText1:
      "李春雷女士畢業於美國加州大學爾灣分校——這間加利福利亞學校系統中、綜合實力最為強勁的分校，研修並先後獲得心理學和商業管理學士學位。",
    educationText2:
      "畢業後她回到香港，進入瑞士豐泰香港分公司擔任高級財務顧問，進行全面、系統的財務公司崗位學習。在偶然機遇，她加入全球最大的保險集團之一——法國安盛（AXA）香港分公司，擔任高級經理，主要負責資產管理以及新入行的理財策劃師工作，也正是在安盛，她真正發現了自己對於保險事業的激情。",
    educationText3:
      "眼看著國外的保險行業趨於成熟完善，國內卻對其所知甚少，李春雷女士痛心不已，於是她做了一個意義非凡的決定——將業務延伸至國內，也正是這個決定，重新定義了她的後半生！",
    educationText4:
      "於2006年年初，李春雷女士開始在香港友邦（AIA）擔任資深分區經理，負責客戶資產管理、資產傳承的工作以及培養新入行理財策劃師等工作。",
    educationText5:
      "不忘初心，方得始終。20年的保險事業，20年的堅守初心，讓李春雷女士獲得了諸多榮譽以及參與香港友邦公司和SY區域高峰會議的資格。",
    educationText6:
      "在此期間，李春雷女士先後獲得前線領袖獎（FLA）銀獎、管理發展獎銀獎、IDA龍獎。",
    educationText7:
      "與此同時，她還獲得了美國壽險管理學會頒發的FLMI壽險管理師、由國際認證財務顧問師協會頒發的認證財務顧問師（RFC）等多項含金量超高的行業資格認可。這些頂尖專業認可和多項榮譽，成為李春雷身後一個個光輝的足跡。",

    clientServiceTitle: "對你的客戶負責。全心全意為他們服務。",
    clientServiceText1:
      "有時，做你的工作是一回事，但在為客戶服務的方式上保持耐心和徹底是另一回事。我們來看一個有趣的故事。 Wendy曾經有一個讓她頭疼的客戶。這個特定的客戶在十二年前從她那裡購買了一份保險計劃。此後一年一次，每當客戶的保險計劃被審查時，該客戶對Wendy從不客氣。 Wendy去見客戶的時候，客戶總會露出某種不滿意和嚴肅的表情。但這絕不是為了反對Wendy，似乎他就是這樣對待很多人的。",
    clientServiceText2:
      '同樣的情況一直持續到Wendy的客戶不幸被診斷出患有癌症。在這一改變人生的事件之後，Wendy的客戶開始定期主動聯繫她。在這些談話中，Wendy可以看出她的客戶有兩個主要的擔憂：一是擔心無法獲得保險賠償，二是客戶擔心健康狀況惡化。可以理解的是，Wendy因為額外的工作量和電話而感到身體疲倦。使事情變得更困難的事實是，她無法回答客戶的問題，例如客戶當時的健康狀況。然而，她客戶的挑剔和高期望並沒有動搖Wendy，她甚至在最後通過電話向客戶承諾："聽著，先生，讓我們分擔工作量。您專注於康復和改善健康，而我將盡我所能幫助您獲得賠償。在最終結果可能雙向的領域，我仍會努力盡我最大的努力為您爭取。"',
    clientServiceText3:
      "在Wendy的努力和堅持下，客戶最終得到了賠償。有了這筆錢和個人積蓄，客戶去了美國，幸運的是，隨著時間的推移，他的健康得到了恢復。一旦他的健康狀況有所好轉，他對Wendy的態度也發生了明顯的變化。他對Wendy非常尊重，也開始對周圍的人好得多。她的客戶經常告訴身邊的人，Wendy在生病時給了他很大的信心，而這種信心與金錢可以買到的任何東西一樣寶貴。",
    clientServiceText4:
      '進入AIA後，她也自然而然地成為香港友邦雜誌和報紙的常客，她本人也獲得被譽為"保險業的愛馬仕"之稱的全球最頂尖的百萬圓桌會議的終身會員資格。',
    clientServiceText5:
      "多年的保險事業練就了李春雷女士高超的演講技能，在美國百萬圓桌會議（MDRT）年會上，李春雷女士發表了一場乾貨滿滿的心得分享演講。",
    clientServiceText6:
      "此外，她還曾多次受邀到中文大學等香港世界級頂尖大學進行演講。",

    familyText1:
      "如果說熱愛是李春雷女士20年傾注身心投身保險事業的驅動力，那麼，丈夫和家庭，則是李春雷女士躊躇滿志的精神支柱。",
    familyText2:
      "二人都在AIA從事保險事業，琴瑟和鳴，李春雷女士的丈夫還獲得由FPSB( Financial Plannjng Standards Board ) 國際理財標準委員會認證的國際金融理財師專業資格，並榮獲2007年香港理財規劃師大獎。",
    familyText3:
      "在夫婦二人的耳濡目染下，兩個兒子從小便表現出對保險行業濃厚興趣。於是，夫婦二人希望把保險事業變成企業，並把企業傳承給兩個孩子。",
    familyText4:
      '事業有成、家庭幸福是李春雷女士的前半生寫照，義無反顧從事志願活動，更加充實了她的精神世界！這幾年間，她多次前往大陸，去鼓勵和幫助那些山區留守兒童、參與"師友計畫"、為教會募捐、為香港八所世界級頂尖大學做義務顧問。',
    familyText5:
      '最重要的是李春雷女士希望通過自己20年的從業經驗與社會影響力，引流更多的社會資源投入到幫助"港漂"大陸學生的事業中，使他們得以在香港發揮自己的專業技能，鋪就未來成功之路。',
    familyText6:
      "如今，在李春雷女士的團隊中，有90%的人擁有大學學位和碩士學位，他們都畢業於香港的頂尖大學，有超過90%的成員主修金融。",
    familyText7:
      "香港的保險行業正在蓬勃發展，未來將需要更多的精英人才，李春雷女士組建的團隊，擁有20年保險事業從業經驗和豐富的香港社會資源，這是國內很多經理人及其團隊所不具備的優勢。",
    familyText8:
      "如果您正在尋找一支精英團隊來進行資產管理，那麼李春雷女士的團隊將會是您的最佳選擇！",

    philanthropyTitle: "不斷回饋社會",
    philanthropyText1:
      "在去年最忙碌的時候，Mansfield和Wendy接待了一群來自非洲的孩子。其中，三人來自肯尼亞。由於他們是孤兒，大孩子照顧兩個年幼的孩子。他們來到香港尋求捐款。因此，他們在這段時間住在Mansfield和Wendy的家裡。",
    philanthropyText2:
      "對於這對夫婦來說，這是一段非常忙碌的時期。他們不僅被期望在工作中表現出色，而且還剛剛搬進另一個公寓，還沒有安頓下來。 儘管如此，他們仍然決定成為一個寄宿家庭。這是一次有趣的經歷，充滿了艱苦的工作和複雜的情況。但這也讓他們感到溫暖和很同情。",
    philanthropyText3:
      "由於努力和渴望為慈善事業籌集資金，這些孩子不得不訪問各間中學表演唱歌跳舞。經過一天的辛苦勞碌，他們回到了寄宿家庭，脫掉鞋子，他們襪子的狀況和氣味都很糟糕而且很可怕。當然，他們沒有人說任何話或發表評論。第二天，他們毫不猶豫地拿出多雙新襪子，放在鞋子旁邊。",
    philanthropyText4:
      "後來，他們發現每個孩子只有兩雙襪子。沒有合適的衣服，一定很容易生病和感到寒冷。今年香港的冬季相當寒冷。這些來自非洲的孩子以前從未經歷過如此寒冷的天氣。因此，其中一人發燒了。Wendy出去尋找藥物，並特意為他們準備了更多衣服。出人意料的是，沒有一個人敢拿。原因很簡單。因為他們每人只有一個包包。因此，他們擔心新物品無法放入他們的包中。Wendy懷疑這可能與航空公司的行李重量限制有關。Wendy在如此簡單的情況下經歷了貧困，但仍然充滿了許多幸福。孩子們腳踏實地的生活水準和積極向上的態度，讓Wendy心生感到很溫暖。",
    philanthropyText5:
      "在這段時間裡，Wendy盡可能地幫助這些孩子們的需要。除了捐款，她還會請朋友幫忙開車送孩子去他們想去的地方，並給孩子們更好的食物。",
    philanthropyQuote:
      '"世界上有很多人生活在痛苦中。你能做的就是盡你最大的努力改變他們的生活。隨後，你的心也會充滿喜悅和幸福。有些人可能過著忙碌的生活並變得非常成功，但他們可能不會過上充實的生活。為讓我們的世界變得更美好做出貢獻應該成為我們人生目標的一部分。知道自己能夠讓別人的生活變得更好、更輕鬆的感覺是因為你所做的。你心中的幸福和滿足是無價的"，Mansfield說。',
    philanthropyText6:
      "Mansfield和Wendy非常關注青少年的福祉。除了充當寄宿家庭之外，他們還投入大量時間幫助他人。其中一些包括訪問生活在中國農村地區的貧困兒童，以及在香港的中學和大學擔任財務顧問和演講者的志願服務。在財務策劃、未來職業道路的問題和不確定性，甚至生活中的問題上，Mansfield和Wendy努力向這些年輕人提供最誠實的意見。",
    philanthropyText7:
      "在校外，Wendy總是樂於與進入金融行業的年輕人分享她過去的經歷。作為百萬圓桌會議 (MDRT) 會議的終身會員，她有幸在不同場合和地點發表演講。此外，在美國參加百萬圓桌會議期間，她有幸在 300 名與會者面前發表演講。",
    philanthropyText8:
      "Wendy所做的不僅僅是發表演講。她通過行動來展示自己的想法和積極的價值觀，而不僅僅是言語。",

    mentoringTitle: "以身作則，培育年青新血",
    mentoringText1: "Mansfield和Wendy是他們年輕團隊成員的優秀導師。",
    mentoringText2:
      '兩年前，一位年輕女性想加入她的團隊。那個時候，她想試一試。但當Wendy問她是否已經告訴她的親戚、朋友和家人時，她說："沒有"。對於未來，她沒有想太多。她所擁有的只是同情心和出色的職業道德。',
    mentoringText3:
      "Wendy認為她在這行工作中很有潛力，並決定張開雙臂歡迎她加入她的團隊。一開始，沒有人願意向她購買保險計劃。在她的沮喪和無數的失望中，Wendy決定陪她一起飛回家鄉，見見她的朋友和家人，向她展示繩索。更重要的是，Wendy想引導她成為一名更好的理財規劃師。這次旅行持續了四到五天。他們的第一天非常富有成效，他們會見了很多人。臨近第二天，Wendy問她是否有計劃。她回答\"沒有\"。Wendy試圖進一步推動她提出一個計劃。但是，她仍然不知道還能見到誰或求助於誰。最後，她想：\"我們為什麼不打個'cold call'呢？讓我們走到街上，與願意與我們交談的人交談。\"聽到她的絕望，Wendy不知道該怎麼回答她。畢竟，為了打個'cold call'，千里奔波到她的家鄉還有甚麼意義呢？",
    mentoringText4:
      "那是美好的一天。春天的開始日子。在這個緊密相連的小社區中，楓葉在空中旋轉舞動。",
    mentoringText5:
      "最後，Wendy還是決定把她和這個小社區的鄰居和其他居民一起拖走。Wendy甚至會見了她的家人，以表達她的誠意。她想更多地教育他們了解香港的工作文化，但最重要的是，開始與他們建立信任。",
    mentoringText6:
      "後來發生的事情是一個驚喜。這位年輕女子有了啟示，開始超越許多同齡人。第一年年底，她取得了非常可觀的成績，在全球排名前 0.1%。 2018年7月至9月，她的成績進入友邦保險的前60名。請記住，友邦保險是一家擁有超過 15,000 名財務規劃師的公司。作為一種鼓勵方式，公司在中環和香港火車站投放了她的廣告，以宣傳當時的CEO俱樂部比賽。",
    mentoringText7:
      "和許多其他人一樣，Wendy也認為發生的事情是不可想像的。但在教育和培養年輕人方面，她確實表達了很多誠意。她明白每個人的工作節奏都不一樣。有些天生比其他人快，有些則慢。但她認為工作節奏較慢不是問題。她認為重要的是你是否有人陪伴你一路走來。就像我們一直在談論的那位年輕女性一樣，她在學校和考試中表現很好，也非常努力。她懂得如何面對困難和應對逆境。一開始，她所缺乏的只是對自己能力的自信。不過，只要有正確的態度和信心，她的未來一定會很美好。",
    mentoringText8:
      "如今，在一年的前七到八個月，Wendy總是將大部分時間和精力花在招聘和培養人才上。她非常擅長承認每個人的長處，並努力以充分發揮其潛力的方式教育該人。如果一個人在計算機方面有天賦，那麼他或她可以在數據分析方面做更多的工作。如果一個人有一個非常明智的個性，那麼他或她也許可以專注於為更成熟的老年客戶服務。像千禧一代那樣思考並擁有相對年輕心態的人應該與年輕一代一起進入市場。永遠不變的是我們對工作的專業和敬業精神，這是Mansfield和Wendy經常規定的。",
    mentoringText9:
      "Mansfield和Wendy認為自己是工作的專業人士。他們對未來有著長遠的眼光，總是把努力、堅持和真誠放在首位。因此，他們期望團隊中的所有成員都具有同樣積極的態度。在他們看來，他們所做的不僅僅是一種職業，而是要做出正確的承諾並對客戶負責。",
    mentoringText10:
      "在家裡，Mansfield和Wendy有他們可愛的孩子。在工作中，他們有勤奮的團隊成員。他們希望隨著行業未來的不斷發展，越來越多的人將進入市場並肩負起以誠信和信任為客戶服務的責任。值得注意的是，雖然他們的兩個兒子還很年輕，但他們已經逐漸對保險行業產生了興趣。Mansfield和Wendy對此心存感激，因為他們一直想把自己的職業變成生意，希望有一天能把生意交給兩個孩子，把責任傳給子孫後代。",
  },
};

export default function WendyLeePage() {
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
              src="/assets/wendy/Wendy lee.jpg"
              alt="Wendy Lee"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{t.subtitle}</h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </header>

        {/* Awards Section */}
        <section className="mb-16">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg shadow-md">
            <div className="text-gray-800 leading-relaxed text-base">
              <p className="mb-3 font-semibold">{t.gamaAwards}</p>
              {t.awards.map((award, index) => (
                <p key={index} className="mb-1 pl-2">
                  - {award}
                </p>
              ))}
              <div className="mb-4"></div>
              {t.otherAwards.map((award, index) => (
                <p key={index} className="mb-1 font-medium">
                  {award}
                </p>
              ))}
            </div>
          </div>
        </section>

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

          <p className="text-gray-700 leading-relaxed mb-6">{t.openingText}</p>
        </section>

        {/* Education Background */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.educationTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.educationText1}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t.educationText2}
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/wendy/AIA_WendyLee李春雷.jpg"
                alt="Wendy Lee at AIA"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.educationText3}
          </p>

          <div className="float-right ml-6 mb-4 w-96 h-96 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/assets/wendy/李春雷保險AIA - Wendy Lee.jpg"
              alt="Wendy Lee Insurance Professional"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.educationText4}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.educationText5}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.educationText6}
          </p>

          <p className="text-gray-700 leading-relaxed">{t.educationText7}</p>
        </section>

        {/* Client Service Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.clientServiceTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.clientServiceText1}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.clientServiceText2}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.clientServiceText3}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.clientServiceText4}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.clientServiceText5}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {t.clientServiceText6}
          </p>
        </section>

        {/* Family Section */}
        <section className="mb-16">
          <p className="text-gray-700 leading-relaxed mb-6">{t.familyText1}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.familyText2}</p>

          <p className="text-gray-700 leading-relaxed mb-8">{t.familyText3}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.familyText4}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.familyText5}</p>

          <p className="text-gray-700 leading-relaxed mb-6">{t.familyText6}</p>

          <p className="text-gray-700 leading-relaxed mb-8">{t.familyText7}</p>

          <p className="text-gray-700 leading-relaxed mb-8">{t.familyText8}</p>
        </section>

        {/* Philanthropy Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.philanthropyTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText1}
          </p>

          <div className="float-left mr-6 mb-4 w-80 h-60 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/assets/wendy/WendyLee李春雷團隊.jpg"
              alt="Wendy Lee Team"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText2}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText3}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText4}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText5}
          </p>

          <blockquote className="border-l-4 border-gray-900 pl-6 italic text-lg text-gray-800 mb-6">
            {t.philanthropyQuote}
          </blockquote>

          <div className="float-right ml-6 mb-4 w-96 h-80 relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/assets/wendy/李春雷女士.jpg"
              alt="Wendy Lee Professional"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText6}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.philanthropyText7}
          </p>

          <p className="text-gray-700 leading-relaxed">{t.philanthropyText8}</p>
        </section>

        {/* Mentoring Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.mentoringTitle}
          </h2>
          <div className="w-16 h-1 bg-gray-900 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText1}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText2}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText3}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText4}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText5}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText6}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText7}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText8}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText9}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {t.mentoringText10}
          </p>
        </section>
      </article>
    </div>
  );
}

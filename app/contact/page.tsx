"use client";

import React, { useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { contactService, ContactFormData } from "../lib/contactService";

const ContactPage = () => {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-12%" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-12%" });
  const isFormInView = useInView(formRef, { once: true, margin: "-12%" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      };

      const result = await contactService.submitContactForm(contactData);

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      pageTitle: "Get In Touch",
      heroSubtitle: "Professional guidance for your financial goals",
      heroDescription:
        "Connect with our team for wealth planning, protection, and long-term strategy. We respond thoughtfully to every inquiry.",
      contactIntro: "How to reach us",
      contactDescription:
        "Visit our Causeway Bay office, call during business hours, or send a message — whichever suits you best.",
      contactForm: "Send a message",
      formDescription:
        "Share your goals or questions. Submissions are stored securely and reviewed by our team.",
      formNote:
        "We use secure systems to handle your inquiry and never share your details without consent.",
      fullName: "Full name",
      emailAddress: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder:
        "Briefly describe how we can help (goals, timeline, preferred contact method)…",
      sendMessage: "Send message",
      sending: "Sending…",
      messageSent: "Message received",
      messageError: "Something went wrong. Please try again or call us.",
      thankYou:
        "Thank you. A team member will review your note and reply as soon as possible.",
      sendAnother: "Send another message",
      phoneTitle: "Phone",
      emailTitle: "Email",
      addressTitle: "Office",
      phoneDisplay: "(852) 5530-4114",
      emailValue: "wendylee@actiondoitnow.com",
      addressValue:
        "17/F, Caroline Centre, Lee Gardens Two, 28 Yun Ping Road, Causeway Bay, Hong Kong",
      businessHours: "Business hours",
      weekdays: "Monday – Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      weekdayHours: "9:00 AM – 6:00 PM",
      saturdayHours: "9:00 AM – 1:00 PM",
      sundayHours: "Closed",
      callNow: "Call",
      sendEmail: "Email us",
      getDirections: "Open map",
    },
    "zh-HK": {
      pageTitle: "聯繫我們",
      heroSubtitle: "為您的財務目標提供專業支援",
      heroDescription:
        "歡迎與我們聯絡，諮詢財富規劃、保障安排與長遠策略。我們會認真回覆每一則查詢。",
      contactIntro: "聯絡方式",
      contactDescription:
        "可親臨銅鑼灣辦公室、於辦公時間致電，或留下訊息，選擇最方便您的途徑。",
      contactForm: "發送訊息",
      formDescription:
        "請簡述您的目標或疑問。訊息會以安全方式保存並由團隊跟進。",
      formNote: "我們妥善處理您的資料，不會在未經同意的情況下轉交第三方。",
      fullName: "姓名",
      emailAddress: "電郵",
      message: "訊息內容",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "請簡述我們可以如何協助（目標、時間、偏好聯絡方式）…",
      sendMessage: "發送訊息",
      sending: "發送中…",
      messageSent: "已收到您的訊息",
      messageError: "發送失敗，請稍後再試或直接致電我們。",
      thankYou: "謝謝您。我們會盡快審閱並回覆。",
      sendAnother: "再發一則訊息",
      phoneTitle: "電話",
      emailTitle: "電郵",
      addressTitle: "辦公室",
      phoneDisplay: "(852) 5530-4114",
      emailValue: "wendylee@actiondoitnow.com",
      addressValue: "香港銅鑼灣雲平道28號利園二期嘉蘭中心17樓",
      businessHours: "辦公時間",
      weekdays: "星期一至五",
      saturday: "星期六",
      sunday: "星期日",
      weekdayHours: "上午9:00 – 下午6:00",
      saturdayHours: "上午9:00 – 下午1:00",
      sundayHours: "休息",
      callNow: "致電",
      sendEmail: "發送電郵",
      getDirections: "地圖路線",
    },
  };

  const t = translations[language];

  const contactCardBase =
    "flex h-full flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Hero — aligned with home */}
      <section
        ref={heroRef}
        className="relative flex min-h-[48vh] items-center overflow-hidden pt-28 pb-16 md:min-h-[52vh] md:pt-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)), url('/assets/Home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center md:text-left"
          >
            <p className="mb-4 font-medium tracking-[0.2em] text-white/80 uppercase">
              Seeds Financial Group
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {t.pageTitle}
            </h1>
            <div className="mx-auto mb-6 h-px w-16 bg-white/40 md:mx-0" />
            <p className="mb-4 max-w-2xl text-white md:mx-0">
              {t.heroDescription}
            </p>
            <p className="font-semibold text-white/90">{t.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact channels */}
      <section
        ref={contactRef}
        className="relative border-b border-gray-100 bg-light-gray py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.65 }}
            className="mb-12 text-center md:mb-14"
          >
            <h2 className="mb-3 text-2xl font-bold text-[var(--primary)] md:text-3xl">
              {t.contactIntro}
            </h2>
            <p className="mx-auto max-w-2xl text-dark-gray">{t.contactDescription}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.a
              href="tel:85255304114"
              initial={{ opacity: 0, y: 24 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.55, delay: 0.05 }}
              className={`${contactCardBase} md:text-left`}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                aria-hidden
              >
                <Phone className="lucide-accent h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-dark-gray">
                {t.phoneTitle}
              </h3>
              <p className="mb-6 flex-1 font-semibold text-dark-gray">
                {t.phoneDisplay}
              </p>
              <span className="btn-primary inline-flex w-full items-center justify-center py-3 text-center">
                {t.callNow}
              </span>
            </motion.a>

            <motion.a
              href={`mailto:${t.emailValue}`}
              initial={{ opacity: 0, y: 24 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.55, delay: 0.1 }}
              className={`${contactCardBase} md:text-left`}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                aria-hidden
              >
                <Mail className="lucide-accent h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-dark-gray">
                {t.emailTitle}
              </h3>
              <p className="mb-6 flex-1 break-all text-dark-gray leading-relaxed">
                {t.emailValue}
              </p>
              <span className="inline-flex w-full items-center justify-center rounded-md border-2 border-gray-800 bg-transparent py-3 font-semibold text-gray-800 transition-colors duration-300 hover:bg-gray-800 hover:text-white">
                {t.sendEmail}
              </span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.55, delay: 0.15 }}
              className={contactCardBase}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                aria-hidden
              >
                <MapPin className="lucide-accent h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-dark-gray">
                {t.addressTitle}
              </h3>
              <p className="mb-6 flex-1 text-left text-dark-gray leading-relaxed">
                {t.addressValue}
              </p>
              <a
                href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center py-3 text-center"
              >
                {t.getDirections}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mx-auto mt-12 max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
          >
            <div className="mb-8 flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]"
                aria-hidden
              >
                <Clock className="lucide-accent h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)]">
                {t.businessHours}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-light-gray px-4 py-5 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-dark-gray opacity-80">
                  {t.weekdays}
                </p>
                <p className="font-bold text-dark-gray">{t.weekdayHours}</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-light-gray px-4 py-5 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-dark-gray opacity-80">
                  {t.saturday}
                </p>
                <p className="font-bold text-dark-gray">{t.saturdayHours}</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-light-gray px-4 py-5 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-dark-gray opacity-80">
                  {t.sunday}
                </p>
                <p className="font-bold text-dark-gray opacity-90">
                  {t.sundayHours}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form — matches home CTA styling */}
      <section ref={formRef} className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-3 text-2xl font-bold text-[var(--primary)] md:text-3xl">
              {t.contactForm}
            </h2>
            <p className="text-dark-gray">{t.formDescription}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-xl border border-gray-200 bg-white p-8 shadow-md md:p-10"
          >
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_14%,transparent)]">
                  <CheckCircle
                    className="lucide-accent h-9 w-9"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[var(--primary)]">
                  {t.messageSent}
                </h3>
                <p className="mb-8 text-dark-gray">{t.thankYou}</p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="btn-primary px-8 py-3"
                >
                  {t.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid gap-7 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold text-dark-gray">
                      {t.fullName}{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <User
                        className="lucide-muted pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                        strokeWidth={1.5}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        placeholder={t.namePlaceholder}
                        className="w-full rounded-md border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-dark-gray placeholder:text-gray-500 shadow-sm outline-none transition-[box-shadow,border-color] focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block font-semibold text-dark-gray">
                      {t.emailAddress}{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <div className="relative">
                      <Mail
                        className="lucide-muted pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                        strokeWidth={1.5}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        className="w-full rounded-md border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-dark-gray placeholder:text-gray-500 shadow-sm outline-none transition-[box-shadow,border-color] focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-dark-gray">
                    {t.message}{" "}
                    <span className="text-red-600" aria-hidden>
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="lucide-muted pointer-events-none absolute left-3 top-4 h-5 w-5"
                      strokeWidth={1.5}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={t.messagePlaceholder}
                      className="w-full resize-y rounded-md border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-dark-gray placeholder:text-gray-500 shadow-sm outline-none transition-[box-shadow,border-color] focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex min-w-[220px] items-center justify-center gap-2 px-8 py-3.5 disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.sendMessage}
                        <Send className="h-5 w-5 text-white" strokeWidth={2} />
                      </>
                    )}
                  </button>
                  <p className="flex max-w-md items-start gap-2 text-center text-dark-gray opacity-80">
                    <CheckCircle
                      className="lucide-accent mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={2}
                    />
                    <span>{t.formNote}</span>
                  </p>
                </div>

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="flex items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="font-medium">{t.messageError}</p>
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

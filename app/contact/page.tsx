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
  Building2,
} from "lucide-react";
import { contactService, ContactFormData } from "../lib/contactService";

const ContactPage = () => {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-20%" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-20%" });
  const isFormInView = useInView(formRef, { once: true, margin: "-20%" });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare the contact form data
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
      };

      // Submit to Appwrite database
      const result = await contactService.submitContactForm(contactData);
      
      if (result.success) {
        console.log("Contact form submitted successfully:", contactData);
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      pageTitle: "Get In Touch",
      heroSubtitle: "Professional Financial Guidance Awaits",
      heroDescription:
        "Connect with our expert financial advisors and take the first step towards securing your financial future. We're here to provide personalized solutions tailored to your unique goals.",
      contactInfo: "Contact Information",
      contactDescription:
        "Our team of experienced professionals is ready to assist you with comprehensive financial planning and wealth management solutions.",
      contactForm: "Send Us a Message",
      formDescription: "Complete the form below and our team will review your inquiry.",
      formNote: "Form submissions are securely stored in our database and reviewed by our team.",
      fullName: "Full Name",
      emailAddress: "Email Address",
      message: "Your Message",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "your.email@example.com",
      messagePlaceholder: "Describe your financial goals and how we can assist you...",
      sendMessage: "Send Message",
      sending: "Sending...",
      messageSent: "Message Sent Successfully!",
      messageError: "Failed to send message. Please try again.",
      thankYou: "Thank you for reaching out. Our team will review your message.",
      sendAnother: "Send Another Message",
      phoneTitle: "Phone",
      emailTitle: "Email",
      addressTitle: "Office Address",
      phoneNumber: "(852) 5530-4114",
      emailValue: "wendylee@actiondoitnow.com",
      addressValue: "17/F, Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway Bay, Hong Kong",
      businessHours: "Business Hours",
      weekdays: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      weekdayHours: "9:00 AM - 6:00 PM",
      saturdayHours: "9:00 AM - 1:00 PM",
      sundayHours: "Closed",
      callNow: "Call Now",
      sendEmail: "Send Email",
      getDirections: "Get Directions",
    },
    "zh-HK": {
      pageTitle: "聯繫我們",
      heroSubtitle: "專業財務指導等著您",
      heroDescription:
        "與我們的專業財務顧問聯繫，邁出保障您財務未來的第一步。我們在這裡提供針對您獨特目標量身定制的個人化解決方案。",
      contactInfo: "聯絡資訊",
      contactDescription:
        "我們經驗豐富的專業團隊準備為您提供全面的財務規劃和財富管理解決方案。",
      contactForm: "發送訊息給我們",
      formDescription: "填寫下面的表格，我們的團隊將審查您的查詢。",
      formNote: "表格提交會安全地儲存在我們的數據庫中，並由我們的團隊進行審查。",
      fullName: "全名",
      emailAddress: "電子郵箱",
      message: "您的訊息",
      namePlaceholder: "請輸入您的全名",
      emailPlaceholder: "your.email@example.com",
      messagePlaceholder: "描述您的財務目標以及我們如何協助您...",
      sendMessage: "發送訊息",
      sending: "發送中...",
      messageSent: "訊息發送成功！",
      messageError: "發送訊息失敗，請重試。",
      thankYou: "感謝您的聯繫。我們的團隊將審查您的訊息。",
      sendAnother: "發送另一條訊息",
      phoneTitle: "電話",
      emailTitle: "電子郵件",
      addressTitle: "辦公地址",
      phoneNumber: "(852) 5530-4114",
      emailValue: "wendylee@actiondoitnow.com",
      addressValue: "香港銅鑼灣雲平道28號利園二期嘉蘭中心17樓",
      businessHours: "營業時間",
      weekdays: "星期一至五",
      saturday: "星期六",
      sunday: "星期日",
      weekdayHours: "上午9:00 - 下午6:00",
      saturdayHours: "上午9:00 - 下午1:00",
      sundayHours: "休息",
      callNow: "立即致電",
      sendEmail: "發送電郵",
      getDirections: "獲取路線",
    },
  };

  const t = translations[language];

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-slate-900 py-28 pt-36 overflow-hidden">
        {/* Subtle background pattern/gradient */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-slate-900 to-slate-900"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                <Building2 className="w-12 h-12 text-amber-500" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {t.pageTitle}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 font-light">
              {t.heroDescription}
            </p>
            
            <p className="text-lg text-amber-400 font-medium tracking-wide uppercase text-sm">{t.heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section ref={contactRef} className="py-20 bg-slate-50 relative -mt-10">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-20">
            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xl shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
                <Phone className="w-8 h-8 text-slate-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-wide">
                {t.phoneTitle}
              </h3>
              <p className="text-2xl font-bold text-slate-700 mb-6 tracking-wide">
                {t.phoneNumber}
              </p>
              <a
                href={`tel:${t.phoneNumber}`}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                {t.callNow}
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center shadow-xl shadow-slate-900/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700 shadow-inner">
                <Mail className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
                {t.emailTitle}
              </h3>
              <p className="text-lg font-medium text-slate-300 mb-6 break-all">
                {t.emailValue}
              </p>
              <a
                href={`mailto:${t.emailValue}`}
                className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center"
              >
                <Mail className="w-4 h-4" />
                {t.sendEmail}
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xl shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
                <MapPin className="w-8 h-8 text-slate-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-wide">
                {t.addressTitle}
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed h-10 flex items-center justify-center">
                {t.addressValue}
              </p>
              <a
                href="https://maps.google.com/?q=17F+Caroline+Centre+Lee+Gardens+Two+28+Yun+Ping+Road+Causeway+Bay+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center mt-2"
              >
                <MapPin className="w-4 h-4" />
                {t.getDirections}
              </a>
            </motion.div>
          </div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-slate-200"
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {t.businessHours}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
                <div className="text-slate-500 font-bold mb-2 text-xs uppercase tracking-widest">
                  {t.weekdays}
                </div>
                <div className="text-slate-900 font-semibold text-lg">{t.weekdayHours}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
                <div className="text-slate-500 font-bold mb-2 text-xs uppercase tracking-widest">
                  {t.saturday}
                </div>
                <div className="text-slate-900 font-semibold text-lg">{t.saturdayHours}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
                <div className="text-slate-500 font-bold mb-2 text-xs uppercase tracking-widest">
                  {t.sunday}
                </div>
                <div className="text-slate-400 font-semibold text-lg">{t.sundayHours}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {t.contactForm}
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4">
              {t.formDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {t.messageSent}
                </h3>
                <p className="text-slate-600 mb-8 text-lg">{t.thankYou}</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {t.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                      {t.fullName} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 w-5 h-5 transition-colors" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t.namePlaceholder}
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 placeholder-slate-400 bg-white shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                      {t.emailAddress} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 w-5 h-5 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={t.emailPlaceholder}
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 placeholder-slate-400 bg-white shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-5 text-slate-400 group-focus-within:text-amber-600 w-5 h-5 transition-colors" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={t.messagePlaceholder}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-900 placeholder-slate-400 resize-none bg-white shadow-sm"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[250px] bg-slate-900 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        {t.sendMessage}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {t.formNote}
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 font-medium">{t.messageError}</p>
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

"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh-HK" : "en");
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm ${
          language === "en" ? "font-semibold text-primary" : "text-gray-500"
        }`}
      >
        EN
      </span>
      <div
        className="relative inline-block w-10 h-5 cursor-pointer"
        onClick={toggleLanguage}
      >
        <div
          className={`absolute w-10 h-5 rounded-full transition-colors ${
            language === "zh-HK" ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
            language === "zh-HK" ? "translate-x-5" : "translate-x-1"
          } top-0.5`}
        ></div>
      </div>
      <span
        className={`text-sm ${
          language === "zh-HK" ? "font-semibold text-primary" : "text-gray-500"
        }`}
      >
        繁
      </span>
    </div>
  );
}

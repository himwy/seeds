"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "zh-HK";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Helper function to get initial language state to avoid flash of default language
const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (
      savedLanguage &&
      (savedLanguage === "en" || savedLanguage === "zh-HK")
    ) {
      return savedLanguage;
    }
  }
  return "en";
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize with a function to check localStorage immediately if available
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Ensure the language is properly loaded from localStorage and mark as loaded
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (
      savedLanguage &&
      (savedLanguage === "en" || savedLanguage === "zh-HK")
    ) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

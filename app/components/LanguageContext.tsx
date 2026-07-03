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

// Deterministic default so the server-rendered HTML and the client's first
// paint always match (avoids a hydration mismatch). The persisted language is
// applied right after mount in the useEffect below.
const DEFAULT_LANGUAGE: Language = "en";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start from the same default on server and first client render.
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
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

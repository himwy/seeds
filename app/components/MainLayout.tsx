"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {} = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    setMounted(true);

    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();

    window.addEventListener("resize", updateViewportHeight);

    const fixMobileViewport = () => {
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }, 100);
    };

    fixMobileViewport();
    window.addEventListener("resize", fixMobileViewport);
    window.addEventListener("orientationchange", fixMobileViewport);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("resize", fixMobileViewport);
      window.removeEventListener("orientationchange", fixMobileViewport);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        minHeight: viewportHeight > 0 ? `${viewportHeight}px` : "100vh",
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      <Navbar />
      <div className="flex flex-grow w-full">
        <main className="flex-grow transition-all duration-300 mt-16 md:mt-20 w-full px-4 md:px-6 overflow-x-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

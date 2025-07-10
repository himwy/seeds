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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Function to set the viewport height CSS variable
    const setVHVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Function to check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set them initially
    setVHVariable();
    checkMobile();

    // Update on resize and orientation change
    window.addEventListener("resize", setVHVariable);
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", setVHVariable);
    window.addEventListener("orientationchange", checkMobile);

    return () => {
      window.removeEventListener("resize", setVHVariable);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", setVHVariable);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="flex flex-col w-full relative max-w-full overflow-x-hidden bg-white"
      style={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
        paddingBottom: isMobile ? "env(safe-area-inset-bottom, 0px)" : "0",
      }}
    >
      <Navbar />
      <div className="flex-grow w-full max-w-full relative z-10">
        <main className="w-full max-w-full overflow-x-hidden pt-14 md:pt-16 relative">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

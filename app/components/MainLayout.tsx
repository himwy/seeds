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

  useEffect(() => {
    setMounted(true);

    // Function to set the viewport height CSS variable
    const setVHVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set it initially
    setVHVariable();

    // Update on resize and orientation change
    window.addEventListener("resize", setVHVariable);
    window.addEventListener("orientationchange", setVHVariable);

    return () => {
      window.removeEventListener("resize", setVHVariable);
      window.removeEventListener("orientationchange", setVHVariable);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="flex flex-col w-full relative max-w-full overflow-x-hidden"
      style={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      <Navbar />
      <div className="flex-grow w-full max-w-full">
        <main className="w-full max-w-full overflow-x-hidden pt-16 md:pt-20">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

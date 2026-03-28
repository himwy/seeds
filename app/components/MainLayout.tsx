"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Combined function for viewport height and mobile check
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set initial viewport
    updateViewport();

    // Throttled resize handler for performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateViewport, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}

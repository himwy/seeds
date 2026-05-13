"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Admin gets its own chrome — no public navbar/footer
  const hideChrome = pathname?.startsWith("/admin") ?? false;

  // Track viewport height in a CSS variable (used by hero sections on mobile
  // to dodge the 100vh problem with browser chrome). Runs client-only, no
  // need to gate the render — the variable just isn't set until hydration.
  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    updateViewport();
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

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      {!hideChrome && <Navbar />}
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>
      {!hideChrome && <Footer />}
    </div>
  );
}

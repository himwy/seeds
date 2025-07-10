"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, isLoaded } = useLanguage();

  // This prevents the hydration error with Next.js when using localStorage
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Shows a minimal layout until language preferences are loaded
  if (!mounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <main className="flex-grow transition-all duration-300 mt-20 w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

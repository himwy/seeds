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
  // Remove unused variables and only keep what's needed for the component
  const {} = useLanguage();

  // This prevents the hydration error with Next.js when using localStorage
  const [mounted, setMounted] = React.useState(false);
  
  // State for managing mobile viewport adjustments
  const [viewportHeight, setViewportHeight] = useState(0);
  
  React.useEffect(() => {
    setMounted(true);
    
    // Handle mobile viewport height adjustments
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Set initial viewport height
    updateViewportHeight();
    
    // Update viewport height on resize
    window.addEventListener('resize', updateViewportHeight);
    
    // Fix for mobile browsers' viewport issues
    const fixMobileViewport = () => {
      // Use a small timeout to ensure the browser has finished any UI adjustments
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 100);
    };
    
    fixMobileViewport();
    window.addEventListener('resize', fixMobileViewport);
    window.addEventListener('orientationchange', fixMobileViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('resize', fixMobileViewport);
      window.removeEventListener('orientationchange', fixMobileViewport);
    };
  }, []);

  // Shows a minimal layout until language preferences are loaded
  if (!mounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <div 
      className="flex flex-col min-h-screen" 
      style={{ 
        minHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        height: 'calc(var(--vh, 1vh) * 100)'
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

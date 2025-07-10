"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure we import the CSS

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 400, // Even shorter duration for subtle animations
      once: true, // Elements will only animate once
      mirror: false, // Don't mirror animations when scrolling back up
      offset: 20, // Reduced offset to minimize gaps, especially on mobile
      easing: "ease-out",
      // Enable animations on mobile but use mobile-specific settings
      disable: false,
      // Responsive settings to make mobile animations more subtle
      startEvent: "DOMContentLoaded",
    });

    // Refresh AOS when window is resized
    window.addEventListener("resize", () => {
      AOS.refresh();
    });

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", () => {
        AOS.refresh();
      });
    };
  }, []);

  return <>{children}</>;
}

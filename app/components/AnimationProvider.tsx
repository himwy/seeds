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
      duration: 800, // Slightly longer for smoother animations
      once: true, // Elements will only animate once
      mirror: false, // Don't mirror animations when scrolling back up
      offset: 0, // Removed offset to eliminate gaps
      easing: "ease-out",
      // Enable animations on mobile but use mobile-specific settings
      disable: false,
      // Improved animation behavior
      anchorPlacement: "top-bottom", // Animate when the top of the element reaches the bottom of the viewport
      // Make animations feel more natural and coordinated
      delay: 0,
    });

    // Refresh AOS when window is resized
    const refreshAOS = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", refreshAOS);
    window.addEventListener("orientationchange", refreshAOS);

    // Add a small delay to refresh AOS after load to ensure all elements are properly sized
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", refreshAOS);
      window.removeEventListener("orientationchange", refreshAOS);
    };
  }, []);

  return <>{children}</>;
}

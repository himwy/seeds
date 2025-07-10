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
      duration: 500, // Reduced duration for more subtle animations
      once: true, // Elements will only animate once
      mirror: false, // Don't mirror animations when scrolling back up
      offset: 50,
      easing: "ease-out",
      disable: "mobile", // Disable animations on mobile for better performance
    });

    // Refresh AOS when window is resized
    window.addEventListener("resize", () => {
      AOS.refresh();
    });
  }, []);

  return <>{children}</>;
}

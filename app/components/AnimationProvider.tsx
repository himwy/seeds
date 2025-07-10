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
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: "ease-out-cubic",
      // Remove the "disable: mobile" to enable animations on all devices
    });

    // Refresh AOS when window is resized
    window.addEventListener("resize", () => {
      AOS.refresh();
    });
  }, []);

  return <>{children}</>;
}

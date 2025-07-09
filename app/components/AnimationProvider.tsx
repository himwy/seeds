"use client";

import { useEffect } from "react";
import AOS from "aos";

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
      offset: 100,
      easing: "ease-out-cubic",
      disable: "mobile",
    });
  }, []);

  return <>{children}</>;
}

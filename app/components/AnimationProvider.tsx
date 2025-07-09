"use client";

import { useEffect, useState } from "react";
import AOS from "aos";

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: "ease-out-cubic",
      disable: "mobile",
    });
  }, []);

  // Only initialize AOS after component has mounted on the client
  return <>{children}</>;
}

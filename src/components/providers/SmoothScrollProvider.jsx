"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export default function SmoothScrollProvider({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        anchors: { offset: -112 },
        autoRaf: true,
        autoToggle: true,
        duration: 1.05,
        smoothWheel: !shouldReduceMotion,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
      }}
    >
      {children}
    </ReactLenis>
  );
}
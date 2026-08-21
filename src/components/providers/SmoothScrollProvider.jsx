"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScrollProvider({ children }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // No offset object here on purpose: Lenis already reads each target's
        // CSS scroll-margin-top (see scroll-mt-* classes on anchor targets
        // sitewide) when resolving an anchor click. Adding a second global
        // offset here stacked on top of that scroll-margin, landing anchor
        // jumps 100-150px past where they should — verified against
        // node_modules/lenis/dist/lenis.mjs's scrollTo() implementation.
        anchors: true,
        autoRaf: true,
        autoToggle: true,
        duration: reduceMotion ? 0 : 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !reduceMotion,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}

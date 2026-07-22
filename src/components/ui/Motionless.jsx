"use client";

import React, { forwardRef, useEffect, useState } from "react";

const strippedProps = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "whileInView",
  "viewport",
  "transition",
  "layout",
  "layoutId",
  "whileHover",
  "whileTap",
  "drag",
  "dragConstraints",
]);

function createMotionlessElement(tag) {
  const Component = forwardRef(function MotionlessElement(props, ref) {
    const domProps = {};
    for (const [key, value] of Object.entries(props)) {
      if (!strippedProps.has(key)) domProps[key] = value;
    }
    return React.createElement(tag, { ...domProps, ref });
  });
  Component.displayName = `Motionless(${tag})`;
  return Component;
}

// Keep existing editorial markup while GSAP is used only for selected interactions.
// Motion-only props are intentionally removed instead of being forwarded to the DOM.

export const m = {
  div: createMotionlessElement("div"),
  span: createMotionlessElement("span"),
  p: createMotionlessElement("p"),
  figure: createMotionlessElement("figure"),
  article: createMotionlessElement("article"),
  aside: createMotionlessElement("aside"),
  section: createMotionlessElement("section"),
};

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

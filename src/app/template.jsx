"use client";

import { m, useReducedMotion } from "motion/react";

export default function Template({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(10px 0 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0px 0 0 0)" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

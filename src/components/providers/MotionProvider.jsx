"use client";

import {
  domAnimation,
  LazyMotion,
  MotionConfig,
} from "motion/react";

const premiumTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={premiumTransition}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
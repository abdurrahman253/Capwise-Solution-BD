"use client";

// Compatibility bridge: older components import `m` and `useReducedMotion`
// from this file. The previous implementation stripped animation props. This
// now delegates to Motion so those props actually animate while preserving the
// existing component API.
export { m, useReducedMotion } from "motion/react";

"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Module-scoped, not state: template.jsx remounts on every route change, so
// this needs to survive across those remounts within the same page session.
// A hard reload re-evaluates this module, resetting it to false, so it also
// correctly treats every fresh navigation (not just the very first ever) as
// "first mount." Written only from an effect, after render, to stay a pure
// read during render itself.
let hasMountedOnce = false;

export default function Template({ children }) {
  const reduceMotion = useReducedMotion();
  const [isFirstMount] = useState(() => !hasMountedOnce);

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  // Opacity only, deliberately - no clip-path/transform/filter here. Any of
  // those create a NEW CONTAINING BLOCK for position:fixed descendants (the
  // header lives inside {children}, so it's one), and Framer Motion keeps
  // re-syncing the DOM to match `animate` on later re-renders, so a one-time
  // manual clear of a stray inline style doesn't reliably stick. Opacity
  // never creates a containing block, so there's nothing to clean up.
  return (
    <m.div
      initial={reduceMotion || isFirstMount ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

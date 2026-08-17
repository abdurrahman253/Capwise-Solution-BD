"use client";

import useMounted from "@/hooks/useMounted";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const baseClasses =
    "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-strong hover:shadow-[0_8px_20px_rgba(212,175,55,.18)] focus-visible:outline-none";

  if (!mounted) {
    return <span aria-hidden="true" className={baseClasses} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isDark ? "sun" : "moon"}
          initial={reduceMotion ? false : { opacity: 0, rotate: -50, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 50, scale: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? (
            <Sun aria-hidden="true" size={19} strokeWidth={1.8} />
          ) : (
            <Moon aria-hidden="true" size={19} strokeWidth={1.8} />
          )}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

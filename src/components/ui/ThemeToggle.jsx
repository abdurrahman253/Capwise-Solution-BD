"use client";

import useMounted from "@/hooks/useMounted";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();


  const baseClasses =
    "inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-strong focus-visible:outline-none";

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
      {isDark ? (
        <Sun aria-hidden="true" size={19} strokeWidth={1.8} />
      ) : (
        <Moon aria-hidden="true" size={19} strokeWidth={1.8} />
      )}
    </button>
  );
}
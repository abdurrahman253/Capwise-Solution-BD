"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

export function BrandMark({ className = "h-12 w-auto" }) {
  return (
    <Image
      src="/brand/capwise-official.png"
      alt=""
      aria-hidden="true"
      width={820}
      height={371}
      priority
      className={className}
    />
  );
}

export default function BrandLogo({ className = "", compact = false, light = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      <m.span
        initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { y: -1 }}
        className="relative block overflow-hidden"
      >
        <Image
          src="/brand/capwise-official.png"
          alt="Capwise Solution BD — Accounting & Finance, Tax & Compliance, HR & Payroll"
          width={820}
          height={371}
          priority
          className={`${compact ? "h-[2.55rem] sm:h-[2.8rem]" : "h-[3rem] sm:h-[3.25rem]"} w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
        />
        {!reduceMotion && (
          <m.span
            aria-hidden="true"
            initial={{ x: "-130%" }}
            animate={{ x: "160%" }}
            transition={{ delay: 0.55, duration: 0.75, ease: "easeOut" }}
            className="pointer-events-none absolute inset-y-0 w-8 skew-x-[-18deg] bg-white/20 blur-sm"
          />
        )}
      </m.span>
    </Link>
  );
}

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

const taglineSegments = ["Accounting & Finance", "Tax & Compliance", "HR & Payroll"];

export default function BrandLogo({ className = "", compact = false, light = false, tagline = false }) {
  const reduceMotion = useReducedMotion();
  const stacked = tagline === "stacked";

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${stacked ? "flex-col items-start gap-2" : "items-center gap-3"} ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      <m.span
        initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { y: -1, scale: 1.015, filter: "drop-shadow(0 0 10px rgba(212,175,55,0.4))" }}
        className="relative block shrink-0 overflow-hidden"
      >
        <Image
          src="/brand/capwise-official.png"
          alt="Capwise Solution BD — Accounting & Finance, Tax & Compliance, HR & Payroll"
          width={820}
          height={371}
          priority
          className={`${compact ? "h-[3.1rem] sm:h-[3.35rem]" : "h-[3.6rem] sm:h-[3.9rem]"} w-auto object-contain ${light ? "brightness-0 invert sepia-[25%] saturate-[1.8] hue-rotate-[3deg]" : ""}`}
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

      {tagline && (
        <span
          className={
            stacked
              ? "flex flex-wrap items-center gap-x-2 gap-y-1"
              : `hidden shrink-0 items-center gap-2 border-l pl-3 md:inline-flex ${light ? "border-white/20" : "border-border"}`
          }
        >
          {taglineSegments.map((segment, index) => (
            <span key={segment} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className={`h-2.5 w-px shrink-0 ${light ? "bg-white/20" : "bg-border"}`} />
              )}
              <span
                className={`text-[0.56rem] font-bold uppercase leading-[1.15] tracking-[0.05em] ${light ? "text-white/68" : "text-muted"}`}
              >
                {segment}
              </span>
            </span>
          ))}
        </span>
      )}
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

export function BrandMark({ className = "h-12 w-auto" }) {
  return (
    <Image
      src="/brand/CAPWISE_logo_clean_notagline.png"
      alt=""
      aria-hidden="true"
      width={1012}
      height={358}
      priority
      className={className}
    />
  );
}

const taglineSegments = ["Accounting & Finance", "Tax & Compliance", "HR & Payroll"];

export default function BrandLogo({ className = "", compact = false, light = false, tagline = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/"
      className={`group inline-flex min-w-0 flex-col items-start gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
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
          src="/brand/CAPWISE_logo_clean_notagline.png"
          alt="Capwise Solution BD — Accounting & Finance, Tax & Compliance, HR & Payroll"
          width={1012}
          height={358}
          priority
          className={`${compact ? "h-[3.3rem] sm:h-[3.55rem]" : "h-[3.8rem] sm:h-[4.1rem]"} w-auto object-contain ${light ? "brightness-0 invert sepia-[25%] saturate-[1.8] hue-rotate-[3deg]" : ""}`}
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
        <span className="flex w-full min-w-0 flex-col gap-[3px] sm:gap-1">
          <span
            aria-hidden="true"
            className={`h-px w-full bg-gradient-to-r ${light ? "from-brand-gold/70 via-brand-gold/25 to-transparent" : "from-brand-gold via-brand-gold/30 to-transparent"}`}
          />
          <span className="flex items-center gap-[3px] whitespace-nowrap sm:gap-[5px] lg:gap-[7px]">
            {taglineSegments.map((segment, index) => (
              <span key={segment} className="flex items-center gap-[3px] sm:gap-[5px] lg:gap-[7px]">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`size-[2px] shrink-0 rounded-full sm:size-[3px] ${light ? "bg-brand-gold-soft/70" : "bg-brand-gold"}`}
                  />
                )}
                <span
                  className={`text-[0.34rem] font-extrabold uppercase leading-none tracking-[0.01em] sm:text-[0.46rem] sm:tracking-[0.04em] lg:text-[0.6rem] lg:tracking-[0.09em] ${light ? "text-brand-gold-soft" : "text-brand-blue"}`}
                >
                  {segment}
                </span>
              </span>
            ))}
          </span>
        </span>
      )}
    </Link>
  );
}

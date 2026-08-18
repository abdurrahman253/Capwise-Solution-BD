"use client";

import { Phone } from "lucide-react";
import { useLenis } from "lenis/react";
import { useState } from "react";

import { primaryContact } from "@/config/contacts";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function FloatingContact() {
  const [progress, setProgress] = useState(0);

  useLenis((lenis) => {
    setProgress(Number.isFinite(lenis.progress) ? lenis.progress : 0);
  });

  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <a
      href={`tel:${primaryContact.tel}`}
      aria-label={`Call Capwise, ${primaryContact.phone}. Page ${Math.round(progress * 100)} percent read.`}
      className="capwise-float-contact group fixed right-3 top-[6.25rem] z-40 flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-1.5 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 sm:right-4 lg:top-[7.25rem] lg:pr-4"
    >
      <span className="relative inline-flex size-9 shrink-0 items-center justify-center">
        <svg viewBox="0 0 36 36" className="pointer-events-none absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r={RADIUS} fill="none" strokeWidth="2.25" className="stroke-border" />
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            strokeWidth="2.25"
            strokeLinecap="round"
            className="stroke-accent-strong"
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 120ms linear",
            }}
          />
        </svg>
        <span className="relative inline-flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-[#1b1464] shadow-[0_4px_10px_rgba(212,175,55,.35)]">
          <Phone aria-hidden="true" size={12} strokeWidth={2.3} />
        </span>
      </span>
      <span className="hidden flex-col leading-tight lg:flex">
        <span className="text-[0.54rem] font-bold uppercase tracking-[0.14em] text-muted">Call Capwise</span>
        <span className="text-[0.78rem] font-extrabold tracking-[-0.01em] text-foreground">{primaryContact.phone}</span>
      </span>
    </a>
  );
}

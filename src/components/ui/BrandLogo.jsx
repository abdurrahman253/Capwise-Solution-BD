import Image from "next/image";
import Link from "next/link";

import { brandLogo } from "@/config/brand";

export function BrandMark({ className = "h-12 w-auto" }) {
  return (
    <Image
      src={brandLogo.light.src}
      alt=""
      aria-hidden="true"
      width={brandLogo.light.width}
      height={brandLogo.light.height}
      priority
      className={className}
    />
  );
}

const taglineSegments = ["Accounting & Finance", "Tax & Compliance", "HR & Payroll"];

export default function BrandLogo({ className = "", compact = false, surface = "light", tagline = false }) {
  // Variant is chosen by the surface the logo renders on, not by site theme —
  // the footer is always a dark surface regardless of theme, so it always
  // gets the dark variant. The header pill's surface does track the theme, so
  // callers pass surface="dark" there only when resolvedTheme is "dark".
  const onDark = surface === "dark";
  const variant = onDark ? brandLogo.dark : brandLogo.light;

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 flex-col items-start gap-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      <span className="relative block shrink-0">
        <Image
          src={variant.src}
          alt="Capwise Solution BD"
          width={variant.width}
          height={variant.height}
          priority
          className={`capwise-logo-mark w-auto object-contain transition-transform duration-150 ease-out group-hover:-translate-y-px group-hover:scale-[1.015] group-focus-visible:-translate-y-px group-focus-visible:scale-[1.015] group-active:translate-y-0 group-active:scale-[0.97] group-active:duration-75 ${
            compact
              ? "h-[clamp(2.25rem,2rem+0.8vw,2.75rem)]"
              : "h-[clamp(2.75rem,2.5rem+0.8vw,3.25rem)]"
          }`}
        />
      </span>

      {tagline && (
        <span
          className={`w-full min-w-0 flex-col gap-[3px] pl-[28%] lg:gap-1 sr-only min-[481px]:not-sr-only min-[481px]:flex`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-full bg-gradient-to-r ${onDark ? "from-brand-gold/70 via-brand-gold/25 to-transparent" : "from-brand-gold via-brand-gold/30 to-transparent"}`}
          />
          <span className="flex flex-wrap items-center gap-x-[7px] gap-y-1 text-micro">
            {taglineSegments.map((segment, index) => (
              <span key={segment} className="flex items-center gap-[7px]">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`size-[3px] shrink-0 rounded-full ${onDark ? "bg-brand-gold-soft/70" : "bg-brand-gold"}`}
                  />
                )}
                <span className={`font-extrabold uppercase leading-none ${onDark ? "text-brand-gold-soft" : "text-brand-blue"}`}>
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

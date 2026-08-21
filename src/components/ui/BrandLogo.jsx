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

// Three groups, each two lines, matching docs/reference/logo-lockup-target.png.
const taglineGroups = [
  ["Accounting", "& Finance"],
  ["Tax &", "Compliance"],
  ["HR &", "Payroll"],
];
const taglineSrText = "Accounting & Finance, Tax & Compliance, HR & Payroll";

export default function BrandLogo({ className = "", compact = false, surface = "light", tagline = false }) {
  // Variant is chosen by the surface the logo renders on, not by site theme —
  // the footer is always a dark surface regardless of theme, so it always
  // gets the dark variant. The header pill's surface does track the theme, so
  // callers pass surface="dark" there only when resolvedTheme is "dark".
  const onDark = surface === "dark";
  const variant = onDark ? brandLogo.dark : brandLogo.light;
  // These are the literal --muted token values, applied directly rather than
  // via the text-muted utility. text-muted follows the THEME; this needs to
  // follow the SURFACE, and the footer is a dark surface in light theme too —
  // using the theme-driven token there would put light-theme's dark-gray
  // text on the footer's permanently-dark background and fail contrast.
  const taglineColor = onDark ? "text-[#9fb1bf]" : "text-[#667085]";

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 flex-col items-start gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
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
        <>
          {/* Visible from 1024px up only — see COPY_CHANGE_LOG.md for why: at
              this component's actual header/footer scale the wordmark itself
              renders far narrower than the reference image implies, so three
              two-line groups need more room than tablet widths reliably give
              without dropping under the text-micro floor. */}
          <span className="hidden pl-[26%] lg:flex lg:items-end lg:gap-x-2.5">
            {taglineGroups.map(([line1, line2]) => (
              <span key={line1} className={`text-[0.75rem] font-normal leading-tight ${taglineColor}`}>
                <span className="block whitespace-nowrap">{line1}</span>
                <span className="block whitespace-nowrap">{line2}</span>
              </span>
            ))}
            <span
              aria-hidden="true"
              className={`mb-[3px] h-px w-8 shrink-0 ${onDark ? "bg-[#9fb1bf]" : "bg-[#667085]"}`}
            />
          </span>
          <span className="sr-only lg:hidden">{taglineSrText}</span>
        </>
      )}
    </Link>
  );
}

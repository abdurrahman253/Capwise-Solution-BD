import Image from "next/image";
import Link from "next/link";

import { BRAND_LOGO } from "@/config/brand";

export function BrandMark({ className = "h-12 w-auto" }) {
  return (
    <Image
      src={BRAND_LOGO.light.src}
      alt=""
      aria-hidden="true"
      width={BRAND_LOGO.light.width}
      height={BRAND_LOGO.light.height}
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

// Measured directly against capwise-light.svg's own viewBox (1021.42 x
// 318.95), not against any wrapper — .lockup below has no other sizing
// influence, so these resolve correctly against the logo's own box.
const WORDMARK_LEFT_PCT = 22.9;
const WORDMARK_RIGHT_INSET_PCT = 100 - 98.5; // 1.5
const WORDMARK_BASELINE_TOP_PCT = 76;

const ASPECT_RATIO = "1021.42 / 318.95";

export default function BrandLogo({ className = "", compact = false, surface = "light", tagline = false }) {
  // Variant is chosen by the surface the logo renders on, not by site theme —
  // the footer is always a dark surface regardless of theme, so it always
  // gets the dark variant. The header pill's surface does track the theme, so
  // callers pass surface="dark" there only when resolvedTheme is "dark".
  const onDark = surface === "dark";
  const variant = onDark ? BRAND_LOGO.dark : BRAND_LOGO.light;
  // Literal --muted token values, applied directly rather than via the
  // text-muted utility. text-muted follows the THEME; this needs to follow
  // the SURFACE, and the footer is a dark surface in light theme too — the
  // theme-driven token would apply light theme's dark-gray value there and
  // fail contrast in exactly the case this exists to fix.
  const taglineColor = onDark ? "text-[#9fb1bf]" : "text-[#667085]";
  const ruleColor = onDark ? "bg-[#9fb1bf]" : "bg-[#667085]";

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 items-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      {/* .lockup — sized ONLY by width + aspect-ratio. Nothing else may size
          it: not the image, not the tagline, not padding. To scale the whole
          lockup, change the width below; height follows from aspect-ratio.
          The tagline is absolutely positioned INSIDE this fixed box, so its
          percentages always resolve against the logo's own geometry, never
          against a wrapper the tagline itself could stretch. */}
      <span
        className={`capwise-lockup relative block shrink-0 ${
          compact
            ? "w-[clamp(11.6rem,10.4rem+2.2vw,13.6rem)]"
            : "w-[clamp(13.2rem,11.9rem+2.5vw,15.6rem)]"
        }`}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        <Image
          src={variant.src}
          alt="Capwise Solution BD"
          width={variant.width}
          height={variant.height}
          priority
          className="capwise-lockup-logo absolute inset-0 size-full object-contain transition-transform duration-150 ease-out group-hover:-translate-y-px group-hover:scale-[1.015] group-focus-visible:-translate-y-px group-focus-visible:scale-[1.015] group-active:translate-y-0 group-active:scale-[0.97] group-active:duration-75"
        />

        {tagline && (
          <span
            className="capwise-lockup-tagline pointer-events-none absolute hidden lg:flex lg:items-center lg:gap-x-2.5"
            style={{
              left: `${WORDMARK_LEFT_PCT}%`,
              right: `${WORDMARK_RIGHT_INSET_PCT}%`,
              top: `${WORDMARK_BASELINE_TOP_PCT}%`,
            }}
          >
            {taglineGroups.map(([line1, line2]) => (
              <span key={line1} className={`text-[0.75rem] font-normal leading-none ${taglineColor}`}>
                <span className="block whitespace-nowrap">{line1}</span>
                <span className="mt-[3px] block whitespace-nowrap">{line2}</span>
              </span>
            ))}
            <span aria-hidden="true" className={`h-px flex-1 ${ruleColor}`} />
          </span>
        )}
      </span>

      {tagline && <span className="sr-only lg:hidden">{taglineSrText}</span>}
    </Link>
  );
}

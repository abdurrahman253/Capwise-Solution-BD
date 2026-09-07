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

const taglineGroups = [
  ["Accounting", "& Finance"],
  ["Tax &", "Compliance"],
  ["HR &", "Payroll"],
];
const taglineSrText = "Accounting & Finance, Tax & Compliance, HR & Payroll";

/**
 * GEOMETRY — measured against the shared viewBox (1021.42 x 318.95). The
 * tagline sits BESIDE the brain and BENEATH the wordmark, inside the logo's
 * own bounding box — it is not "inside the brain icon".
 *
 *   brain      : x 11.6%-60.6%, narrowing to 27.6% below y 74%
 *   wordmark   : x 29.09%-98.43%, baseline at y 73.67%
 *   clear zone : x 29.09%-98.43% (69.3% wide), y 74%-100% (26.0% tall)
 *
 * CONTAINMENT, not a fixed pixel size, is the actual requirement: the
 * tagline must never extend past the bottom edge of the logo box, and must
 * never overlap the brain or the wordmark. Two lines at line-height 1.15
 * need ~2.3x the font size, and the clear zone is 26% of a box whose height
 * is width/3.202, which works out to:
 *
 *   maximum font size = logo width x 0.0353   (3.53cqw)
 *
 * That is a CEILING, not a target - it scales with the box, so it is the
 * ONLY sizing method that can guarantee containment at every width. A fixed
 * px value cannot: at a 190px logo the ceiling is 6.7px, so an 8px fixed
 * value overflows the box - which is exactly the defect a fixed-px mobile
 * override previously caused here. There is no fixed-px font size for this
 * element anywhere in this file.
 *
 * Below the width where the ceiling drops under 8px, the tagline is not
 * drawn at all (mark only, sr-only text carries the description) rather
 * than shown smaller and risking illegibility or overflow.
 */
const WORDMARK_LEFT_PCT = 29.09;
const WORDMARK_RIGHT_INSET_PCT = 100 - 98.43;
const CLEAR_ZONE_TOP_PCT = 74;
const ASPECT_RATIO = "1021.42 / 318.95";

// Header: 96px mobile (6rem), 256-272px desktop (lg+). Tagline ceiling:
// mobile 3.39px (hidden), lg+ 9.04-9.60px (shown).
const HEADER_RESPONSIVE_WIDTH =
  "w-[6rem] lg:w-[clamp(16rem,14.5rem+1.5vw,17rem)]";

// Footer: 230px mobile (14.4rem), 256-272px desktop (lg+). Tagline ceiling:
// mobile 8.13px (shown), lg+ 9.04-9.60px (shown). Visible at all sizes.
const FOOTER_RESPONSIVE_WIDTH =
  "w-[14.4rem] lg:w-[clamp(16rem,14.25rem+1.75vw,17rem)]";

export default function BrandLogo({ className = "", surface = "light", tagline = false, footer = false }) {
  const onDark = surface === "dark";
  const variant = onDark ? BRAND_LOGO.dark : BRAND_LOGO.light;

  // Chosen by SURFACE, not theme: the footer is a dark surface even in light
  // theme, so a theme-driven utility would pick the wrong value there.
  const taglineColor = onDark ? "text-[#c3cfdb]" : "text-[#3d4653]";
  const ruleColor = onDark ? "bg-[#c3cfdb]/50" : "bg-[#3d4653]/45";

  const logoWidth = footer ? FOOTER_RESPONSIVE_WIDTH : HEADER_RESPONSIVE_WIDTH;

  const taglineVisibleClass = footer ? "flex" : "hidden lg:flex";
  const srFallbackClass = !tagline ? "sr-only" : footer ? "hidden" : "sr-only lg:hidden";

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      {/* Sized ONLY by width + aspect-ratio, and declared as a query
          container so the tagline sizes itself in cqw against THIS box's
          own width. The tagline is absolutely positioned inside it, so it
          can never stretch the container, and — because cqw is always a
          fraction of the box — can never extend past its edges either. */}
      <span
        className={`capwise-lockup relative block shrink-0 ${logoWidth}`}
        style={{ aspectRatio: ASPECT_RATIO, containerType: "inline-size" }}
      >
        <Image
          src={variant.src}
          alt="Capwise Solution BD"
          width={variant.width}
          height={variant.height}
          priority
          className="absolute inset-0 size-full object-contain transition-transform duration-150 ease-out group-hover:-translate-y-px group-hover:scale-[1.015] group-focus-visible:-translate-y-px group-focus-visible:scale-[1.015] group-active:translate-y-0 group-active:scale-[0.97] group-active:duration-75"
        />

        {tagline && (
          <span
            className={`capwise-lockup-tagline pointer-events-none absolute items-center text-[3.53cqw] ${taglineVisibleClass}`}
            style={{
              left: `${WORDMARK_LEFT_PCT}%`,
              right: `${WORDMARK_RIGHT_INSET_PCT}%`,
              top: `${CLEAR_ZONE_TOP_PCT}%`,
              columnGap: "0.6em",
            }}
          >
            {taglineGroups.map(([line1, line2]) => (
              <span key={line1} className={`font-medium leading-[1.15] tracking-[0.01em] ${taglineColor}`}>
                <span className="block whitespace-nowrap">{line1}</span>
                <span className="block whitespace-nowrap">{line2}</span>
              </span>
            ))}
            <span aria-hidden="true" className={`h-px flex-1 ${ruleColor}`} />
          </span>
        )}
      </span>

      {/* The descriptor is never lost, even where the real tagline is not drawn. */}
      <span className={srFallbackClass}>{taglineSrText}</span>
    </Link>
  );
}

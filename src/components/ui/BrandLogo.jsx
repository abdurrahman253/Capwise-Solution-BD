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
 * GEOMETRY — measured by rendering capwise-light.svg at its own viewBox
 * (1021 x 319) and sampling ink coverage row by row. Both variants now share
 * this viewBox, so these resolve identically for light and dark.
 *
 *   wordmark left  ("C" of CAP)  : 29.09%
 *   wordmark right ("E" of WISE) : 98.43%
 *   wordmark baseline            : 73.67%
 *
 * The brain reaches x 60.6% only at the baseline itself; from y 74% down it
 * narrows to 27.6%, leaving a genuinely clear band:
 *
 *   CLEAR ZONE = x 29.09%-98.43% (69.3% wide) x y 74%-100% (26.0% tall)
 *
 * SIZING — the constraint is proportional, so it is expressed proportionally.
 * Two lines at line-height 1.15 need about 2.3x the font size, and the zone is
 * 26% of a box whose height is width/3.202. That works out to:
 *
 *   font size = logo width x 0.0353
 *
 * which is 3.53cqw against the lockup container. Using container query units
 * means the tagline auto-fits at ANY logo size — header and footer need no
 * separate tuning, and it can never overflow the clear zone.
 *
 *   logo 200px -> tagline  7.1px      logo 300px -> tagline 10.6px
 *   logo 260px -> tagline  9.2px      logo 340px -> tagline 12.0px
 *
 * TUNE THE HEADER by changing HEADER_LOGO_WIDTH below — the tagline follows.
 */
const WORDMARK_LEFT_PCT = 29.09;
const WORDMARK_RIGHT_INSET_PCT = 100 - 98.43;
const CLEAR_ZONE_TOP_PCT = 74;
const ASPECT_RATIO = "1021.42 / 318.95";

// Header: 16.25rem = 260px at the top of the clamp -> ~9.2px tagline,
// ~90px pill. Raise toward 21rem for a 12px tagline and a ~116px pill.
const HEADER_LOGO_WIDTH = "w-[clamp(13rem,11rem+3vw,16.25rem)]";
const HEADER_LOGO_WIDTH_COMPACT = "w-[clamp(11.5rem,10rem+2.6vw,14.5rem)]";
const FOOTER_LOGO_WIDTH = "w-[clamp(17.5rem,15rem+4vw,20rem)]";

export default function BrandLogo({
  className = "",
  compact = false,
  surface = "light",
  tagline = false,
  footer = false,
}) {
  const onDark = surface === "dark";
  const variant = onDark ? BRAND_LOGO.dark : BRAND_LOGO.light;

  // Chosen by SURFACE, not theme: the footer is a dark surface even in light
  // theme, so a theme-driven utility would pick the wrong value there.
  // Strengthened for legibility — see BrandLogo contrast measurements in the
  // conversation/commit log for the actual measured ratios per surface.
  const taglineColor = onDark ? "text-[#c3cfdb]" : "text-[#3d4653]";
  const ruleColor = onDark ? "bg-[#c3cfdb]/50" : "bg-[#3d4653]/45";

  // Below md the tagline is not drawn (hidden md:flex, below), so the header
  // logo can run smaller there — HEADER_LOGO_WIDTH only takes over from md up.
  const logoWidth = footer
    ? FOOTER_LOGO_WIDTH
    : compact
      ? HEADER_LOGO_WIDTH_COMPACT
      : `${HEADER_LOGO_WIDTH_COMPACT} md:${HEADER_LOGO_WIDTH}`;

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      {/* Sized ONLY by width + aspect-ratio, and declared as a query container
          so the tagline can size itself in cqw. The tagline is absolutely
          positioned inside this fixed box, so it can never stretch the
          container — which is what keeps the header pill height predictable. */}
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
            className="capwise-lockup-tagline pointer-events-none absolute hidden md:flex md:items-center"
            style={{
              left: `${WORDMARK_LEFT_PCT}%`,
              right: `${WORDMARK_RIGHT_INSET_PCT}%`,
              top: `${CLEAR_ZONE_TOP_PCT}%`,
              fontSize: "3.53cqw",
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

      {/* The descriptor is never lost, even where it is not drawn. */}
      <span className={tagline ? "sr-only md:hidden" : "sr-only"}>{taglineSrText}</span>
    </Link>
  );
}
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

// Header floor raised 13rem->16rem: at the OLD 13rem(208px) floor the tagline
// computed to 7.34px, already below the 8px hard floor for ANY in-box tagline
// - a pre-existing defect, not something the ceiling alone could fix. 16rem
// (256px) clears the stricter 9px desktop floor (9.04px) with a small margin.
// Ceiling stays 16.25rem (260px, 9.18px) rather than a smaller value some
// measurements suggested (15.5rem/248px -> 8.8px, below 9px) - a legible
// tagline was prioritised over a smaller logo. Because 11rem+3vw only clears
// 256px above a ~2666px viewport, this clamp renders FLAT at 256px across
// virtually every real desktop width - the header pill is taller than before
// (~88px vs ~73-76px) as a direct, accepted consequence of the 9px floor.
const HEADER_LOGO_WIDTH = "w-[clamp(16rem,11rem+3vw,16.25rem)]";
const HEADER_LOGO_WIDTH_COMPACT = "w-[clamp(11.5rem,10rem+2.6vw,14.5rem)]";
// Footer mobile tier: fixed (not clamped) at 240px - gives an 8.47px tagline,
// clears the universal 8px floor with margin. Full width is available below
// md (footer is a single block column, no competing icons like the header),
// so a fixed value is simplest and carries no overflow risk down to 320px.
const FOOTER_LOGO_WIDTH_MOBILE = "w-[15rem]";
// Footer desktop tier: ceiling lowered 20rem->18.5rem (296px, 10.45px) per
// the "reduce it somewhat" request - floor (17.5rem/280px, 9.88px) already
// clears the 9px desktop floor, so it did not need raising like the header's.
const FOOTER_LOGO_WIDTH = "w-[clamp(17.5rem,15rem+4vw,18.5rem)]";

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

  // Below md the HEADER tagline is not drawn (see taglineVisible below), so
  // the header logo can run smaller there - HEADER_LOGO_WIDTH only takes over
  // from md up. The FOOTER tagline is always drawn (mobile has full width and
  // a dedicated fixed mobile size), so its logo just gets a matching two-tier
  // width instead.
  const logoWidth = footer
    ? `${FOOTER_LOGO_WIDTH_MOBILE} md:${FOOTER_LOGO_WIDTH}`
    : compact
      ? HEADER_LOGO_WIDTH_COMPACT
      : `${HEADER_LOGO_WIDTH_COMPACT} md:${HEADER_LOGO_WIDTH}`;

  // Header: hidden below md (mark-only + sr-only text there - the compact
  // logo can't reach 8px). Footer: always drawn - the mobile tier above was
  // sized specifically so it never needs to hide.
  const taglineVisibleClass = footer ? "flex" : "hidden md:flex";
  // sr-only fallback: only needed where the real tagline is NOT drawn. For
  // the footer that's never, so it stays fully hidden rather than reappearing
  // below any breakpoint.
  const srFallbackClass = !tagline ? "sr-only" : footer ? "hidden" : "sr-only md:hidden";

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
            className={`capwise-lockup-tagline pointer-events-none absolute items-center ${taglineVisibleClass}`}
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
      <span className={srFallbackClass}>{taglineSrText}</span>
    </Link>
  );
}
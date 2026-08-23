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
const taglineInlineText = "Accounting & Finance · Tax & Compliance · HR & Payroll";

/**
 * GEOMETRY — measured by rendering capwise-light.svg at its own viewBox
 * (1021 x 319) and sampling ink coverage row by row. Both variants share this
 * viewBox, so these resolve identically for light and dark.
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
 * FOOTER uses this clear zone for an IN-BOX tagline sized proportionally to
 * the box (3.53cqw against the lockup container) — see FOOTER_LOGO_WIDTH
 * below. HEADER does NOT: a legible in-box tagline needs a ~256px+ box
 * (9px floor), which conflicted with keeping the header small, so the header
 * instead runs a small logo with a fixed-size tagline line BELOW the box
 * (see taglineInlineText below) rather than inside it.
 */
const WORDMARK_LEFT_PCT = 29.09;
const WORDMARK_RIGHT_INSET_PCT = 100 - 98.43;
const CLEAR_ZONE_TOP_PCT = 74;
const ASPECT_RATIO = "1021.42 / 318.95";

// Header logo: small, single tier — no longer split by breakpoint, because
// the header tagline is a fixed-size line below the box now, not an in-box
// one sized off the box's own width. Nothing here needs the box to be big.
const HEADER_LOGO_WIDTH = "w-[clamp(8.5rem,7.5rem+1.6vw,10.5rem)]";
const HEADER_LOGO_WIDTH_COMPACT = "w-[clamp(7.5rem,6.5rem+1.4vw,9rem)]";
// Footer mobile tier: fixed (not clamped) at 240px - gives an 8.47px in-box
// tagline, clears the universal 8px floor with margin. Full width is
// available below md (footer is a single block column, no competing icons
// like the header), so a fixed value is simplest and carries no overflow
// risk down to 320px.
const FOOTER_LOGO_WIDTH_MOBILE = "w-[15rem]";
// Footer desktop tier: 296px ceiling -> 10.45px in-box tagline; 280px floor
// -> 9.88px. Both comfortably clear the 9px desktop floor.
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
  const taglineColor = onDark ? "text-[#c3cfdb]" : "text-[#3d4653]";
  const ruleColor = onDark ? "bg-[#c3cfdb]/50" : "bg-[#3d4653]/45";

  const logoWidth = footer
    ? `${FOOTER_LOGO_WIDTH_MOBILE} md:${FOOTER_LOGO_WIDTH}`
    : compact
      ? HEADER_LOGO_WIDTH_COMPACT
      : HEADER_LOGO_WIDTH;

  // Header stacks the small below-box tagline line under the mark; footer
  // keeps the mark and its in-box tagline side by side on one row.
  const headerStacked = tagline && !footer;

  // Footer's in-box tagline is always drawn (its mobile tier above was sized
  // specifically so it never needs to hide). Header's below-box line is
  // hidden below sm (640px): at 7.5px the full string needs ~235px in the
  // worst-case character-width estimate, and the header row only clears that
  // once the theme toggle/menu button have enough space alongside it, which
  // happens well before 640px with real margin - verified, not assumed.
  const srFallbackClass = !tagline ? "sr-only" : footer ? "hidden" : "sr-only sm:hidden";

  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${headerStacked ? "flex-col items-start gap-1" : "items-center"} ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      {/* Sized ONLY by width + aspect-ratio, and declared as a query container
          so the footer's in-box tagline can size itself in cqw. The tagline
          is absolutely positioned inside this fixed box, so it can never
          stretch the container. */}
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

        {tagline && footer && (
          <span
            className="capwise-lockup-tagline pointer-events-none absolute flex items-center"
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

      {headerStacked && (
        <span className={`hidden whitespace-nowrap text-[7.5px] font-medium tracking-[0.01em] sm:block ${taglineColor}`}>
          {taglineInlineText}
        </span>
      )}

      {/* The descriptor is never lost, even where it is not drawn. */}
      <span className={srFallbackClass}>{taglineSrText}</span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

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

export default function BrandLogo({ className = "", compact = false, light = false, tagline = false, alwaysShowTagline = false }) {
  return (
    <Link
      href="/"
      className={`group inline-flex min-w-0 flex-col items-start gap-0.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      <span className="relative block shrink-0">
        <Image
          src="/brand/CAPWISE_logo_clean_notagline.png"
          alt="Capwise Solution BD — Accounting & Finance, Tax & Compliance, HR & Payroll"
          width={1012}
          height={358}
          priority
          className={`capwise-logo-mark ${compact ? "h-9 sm:h-10 lg:h-11" : "h-11 sm:h-12 lg:h-[3.25rem]"} w-auto object-contain transition-transform duration-150 ease-out group-hover:-translate-y-px group-hover:scale-[1.015] group-focus-visible:-translate-y-px group-focus-visible:scale-[1.015] group-active:translate-y-0 group-active:scale-[0.97] group-active:duration-75 ${light ? "brightness-0 invert sepia-[25%] saturate-[1.8] hue-rotate-[3deg]" : ""}`}
        />
      </span>

      {tagline && (
        <span className={`w-full min-w-0 flex-col gap-[3px] lg:gap-1 ${alwaysShowTagline ? "flex" : "hidden lg:flex"}`}>
          <span
            aria-hidden="true"
            className={`h-px w-full bg-gradient-to-r ${light ? "from-brand-gold/70 via-brand-gold/25 to-transparent" : "from-brand-gold via-brand-gold/30 to-transparent"}`}
          />
          <span className={`flex flex-wrap items-center gap-x-[7px] gap-y-1 ${alwaysShowTagline ? "" : "whitespace-nowrap"}`}>
            {taglineSegments.map((segment, index) => (
              <span key={segment} className="flex items-center gap-[7px]">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className={`size-[3px] shrink-0 rounded-full ${light ? "bg-brand-gold-soft/70" : "bg-brand-gold"}`}
                  />
                )}
                <span
                  className={`font-extrabold uppercase leading-none tracking-[0.1em] ${alwaysShowTagline ? "text-[0.5rem] sm:text-[0.56rem]" : "text-[0.72rem]"} ${light ? "text-brand-gold-soft" : "text-brand-blue"}`}
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

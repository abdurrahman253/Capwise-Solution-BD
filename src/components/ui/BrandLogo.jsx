import Link from "next/link";

export function BrandMark({ className = "size-11" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 96 100"
      fill="none"
    >
      <path
        d="M70 18A34 34 0 1 0 70 82"
        className="stroke-foreground"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M29 51L42 64L73 32"
        className="stroke-accent-strong"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandLogo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-3 rounded-sm ${className}`}
      aria-label="Capwise Solution BD — Home"
    >
      <BrandMark />

      <span className="leading-none">
        <span className="block font-display text-[1.08rem] font-extrabold tracking-[-0.045em] text-foreground sm:text-[1.18rem]">
          CAPWISE
        </span>
        <span className="mt-1.5 block text-[0.58rem] font-bold uppercase tracking-[0.24em] text-accent-strong sm:text-[0.62rem]">
          Solution BD
        </span>
      </span>
    </Link>
  );
}

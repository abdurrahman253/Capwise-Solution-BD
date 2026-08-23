// Single source of truth for the logo asset paths. Every consumer (header,
// footer, anywhere else) reads from this — nothing else hardcodes a filename.
//
// BOTH variants are now SVGs generated from the same designer source, so they
// share an IDENTICAL viewBox (1021.42 x 318.95). That matters more than it
// looks: BrandLogo positions the tagline using percentages measured against
// that viewBox. The previous dark variant was a 793x302 PNG (aspect 2.626 vs
// the SVG's 3.202), so object-contain letterboxed it to 82% of the container
// with a 9% inset on each side — and every measured percentage landed ~9% off,
// which is why the footer tagline sat on top of the brain.
//
// RULE: if either variant is ever replaced, the replacement MUST keep this
// exact viewBox, or the tagline geometry breaks again.
const LOGO_BOX = { width: 1021.42, height: 318.95 };

export const BRAND_LOGO = {
  // Light-toned surfaces: the header pill in light theme.
  light: {
    src: "/brand/capwise-light.svg",
    ...LOGO_BOX,
  },
  // Dark-toned surfaces: the header pill in dark theme, AND the footer at all
  // times (the footer background is a hardcoded dark hex that does not follow
  // the theme toggle).
  //
  // Derived from capwise-light.svg: the embedded cap raster's gradient is
  // lifted into a visible band, and the tassel/wordmark navy is raised to
  // #7aa8dc / #5fa3e0. Measured against the footer background #090d23:
  // cap 7.6:1, tassel 7.9:1, CAP wordmark 7.3:1 — all well clear of the 3:1
  // minimum for graphical elements. Geometry is untouched.
  dark: {
    src: "/brand/capwise-dark.svg",
    ...LOGO_BOX,
  },
};
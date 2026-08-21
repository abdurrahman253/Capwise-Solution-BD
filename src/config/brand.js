// Single source of truth for the logo asset paths. Every consumer (header,
// footer, anywhere else) reads from this — nothing else hardcodes a filename.
// Swapping a variant later is a one-line edit here.
//
// The two variants are intentionally different formats (SVG vs PNG) — width
// and height below are each variant's own intrinsic size (SVG viewBox for
// capwise-light.svg, pixel dimensions for the raster), used to size the
// <Image> and reserve layout space correctly regardless of format.
export const BRAND_LOGO = {
  // For light-toned surfaces: header pill in light theme. Real vector asset
  // from the designer — clean, no baked shadow (verified in this
  // conversation). One caveat: the graduation-cap graphic is an embedded
  // raster inside the SVG (823x433, expected and accepted, not something to
  // vectorise), and that raster's dark navy fails contrast (~1.07-1.19:1) on
  // dark surfaces. That's fine — this variant is never used on a dark
  // surface; see the dark variant below.
  light: {
    src: "/brand/capwise-light.svg",
    width: 1021.42,
    height: 318.95,
  },
  // For dark-toned surfaces: header pill in dark theme, AND the footer at all
  // times (the footer background is a hardcoded dark hex that does not
  // change with the site theme — see CLAUDE.md/COPY_CHANGE_LOG.md).
  // INTERIM raster, pending the designer's dark-surface SVG.
  dark: {
    src: "/brand/capwise-dark.png",
    width: 793,
    height: 302,
  },
};

// Single source of truth for the logo asset paths. Both are interim assets
// (baked-in shadow programmatically removed, brain detail lines flattened on
// the light variant) pending a clean designer file — see docs/COPY_CHANGE_LOG.md.
// Swapping either file later is a one-line edit here; nothing else references
// these paths directly.
export const brandLogo = {
  // For light-toned surfaces: header pill in light theme.
  light: {
    src: "/brand/capwise-logo-interim.png",
    width: 793,
    height: 302,
  },
  // For dark-toned surfaces: header pill in dark theme, AND the footer at all
  // times (the footer background is a hardcoded dark hex that does not change
  // with the site theme — see CLAUDE.md/COPY_CHANGE_LOG.md).
  dark: {
    src: "/brand/capwise-logo-dark.png",
    width: 793,
    height: 302,
  },
};

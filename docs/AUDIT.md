# CAPWISE Codebase Audit

Audit-only. No files were modified to produce this document. Generated against the current working tree (post page-transition and navbar-glass changes, pre-mobile-audit). File paths are repo-relative; line numbers are correct as of this commit but will drift — treat them as pointers, not guarantees.

---

## 1. Route map

| Route | File | Sections rendered (top to bottom) |
|---|---|---|
| `/` | `src/app/page.jsx` | `HomeHero` (7-slide swiper) → `TrustStrip` (stat strip) → `WhyCapwise` → `ServiceOverview` (7 services) → `PickYourIndustry` (6) → `TeamPreview` (2 featured + 4 supporting) → `InsightsPreview` (4 cards) → `FirmIntro` → `BangladeshPreview` → `ClientEvidencePreview` → `ResourcesPreview` → `FaqPreview` → `ConsultationCTA` |
| `/about` | `src/app/about/page.jsx` | Hero H1 → mission/vision 2-up → values grid (`sm:grid-cols-2`) → advisors CTA panel |
| `/services` | `src/app/services/page.jsx` | Hero H1 → services grid (`lg:grid-cols-3`) → detail band |
| `/services/[slug]` | `src/app/services/[slug]/page.jsx` → `src/components/services/ServiceDetailPage.jsx` | Hero H1 → multiple H2 sub-sections → H3 sub-items → related-services CTA |
| `/industries` | `src/app/industries/page.jsx` | Hero H1 → industries grid (`lg:grid-cols-3`, 5 items) → sub-sections |
| `/industries/[slug]` | `src/app/industries/[slug]/page.jsx` | Hero H1 → priority workstreams (`sm:grid-cols-3`) → related-services aside |
| `/business-in-bangladesh` | `src/app/business-in-bangladesh/page.jsx` | Hero H1 → topics grid (`lg:grid-cols-12`, 5 items, mixed col-span) → CTA panel |
| `/business-in-bangladesh/[slug]` | `src/app/business-in-bangladesh/[slug]/page.jsx` | Hero H1 → sections grid (`sm:grid-cols-2`) → checklist CTA aside |
| `/team` | `src/app/team/page.jsx` | Hero H1 → featured (`lg:grid-cols-2`, 2) → supporting (`md:grid-cols-2 xl:grid-cols-4`, 4) → CTA band |
| `/contact` | `src/app/contact/page.jsx` | Hero H1 → `ConsultationForm` (2-step) + contact-channels aside |
| `/faq` | `src/app/faq/page.jsx` | Hero H1 → sticky category sidebar + `FaqAccordion` list → CTA band |
| `/careers` | `src/app/careers/page.jsx` | Hero H1 → openings panel + "how we work" panel |
| `/case-studies` | `src/app/case-studies/page.jsx` | Hero H1 → case list (`lg:grid-cols-2`) or empty-state panel (`caseStudies` data array is currently `[]`) |
| `/case-studies/[slug]` | `src/app/case-studies/[slug]/page.jsx` | Hero H1 + summary only (narrow article layout) |
| `/testimonials` | `src/app/testimonials/page.jsx` | Hero H1 → testimonial list or empty-state |
| `/insights` | `src/app/insights/page.jsx` | Hero H1 → `InsightsExplorer` (search/filter + grid, 15 items from `src/data/insights.js`) |
| `/insights/[slug]` | `src/app/insights/[slug]/page.jsx` | Hero H1 + article image → markdown body → CTA panel → related (3) |
| `/resources` | `src/app/resources/page.jsx` | Hero H1 → guides grid (`sm:grid-cols-2`, 7 items) → regulatory-updates teaser → newsletter |
| `/resources/guides` | `src/app/resources/guides/page.jsx` | Hero H1 → guide list → `GuideRequestButton` modal |
| `/resources/regulatory-updates` | `src/app/resources/regulatory-updates/page.jsx` | Hero H1 → updates list → CTA |
| `/thank-you` | `src/app/thank-you/page.jsx` | Confirmation H1 only |
| `/privacy-policy`, `/terms-of-use`, `/professional-disclaimer` | via `src/components/legal/LegalDocumentPage.jsx` | Hero H1 + prose sections |
| `/blog` | `src/app/blog/page.jsx` | **Redirect only** — `permanentRedirect("/insights")`, no UI |
| `/blog/[slug]` | `src/app/blog/[slug]/page.jsx` | **Redirect only** — resolves to `/insights/[slug]` or `/insights` |
| `/email-preview` | `src/app/email-preview/page.jsx` | Internal dev tool for previewing transactional emails — not part of the public IA, not linked from nav |
| `/not-found` | `src/app/not-found.jsx` | Decorative "404" watermark + H1 + useful-links list |
| `/error` (global) | `src/app/error.jsx` | Error boundary card |
| Every route | `src/app/layout.jsx` → `AppProviders` | `SiteHeader` (per-page, not in layout) + `SiteFooter` (in layout) + `FloatingContact` + `SupportAssistant` + `ToastProvider`, all wrapped by `src/app/template.jsx` (page-transition remount) |

**Note on `SiteHeader` placement**: it is NOT in `layout.jsx`. Every single `page.jsx` imports and renders `<SiteHeader />` itself at the top of its own JSX. This means the mobile nav drawer (`position: fixed`) is inside `{children}`, which was the exact reason the page-transition wrapper (`template.jsx`) had to avoid `transform`-based animation (see §7).

---

## 2. Component inventory

### Shared (used across ≥3 routes)
`SiteHeader.jsx`, `SiteFooter.jsx`, `BrandLogo.jsx`, `FloatingContact.jsx`, `SupportAssistant.jsx`, `ConsultationForm.jsx`, `ThemeToggle.jsx`, `JsonLd.jsx`, `LegalDocumentPage.jsx` (3 legal pages), `ServiceDetailPage.jsx` (7 service pages via `[slug]`).

### One-off (single page each)
All 13 files in `src/components/home/*` (each is a single homepage section, by design — not a problem, just noting none are reused elsewhere). `InsightsExplorer.jsx` (insights listing only), `FaqAccordion.jsx` (FAQ page only), `NewsletterForm.jsx` + `GuideRequestButton.jsx` (resources only).

### Duplicate / consolidation candidates

1. **`src/components/ui/Motionless.jsx`** — a "compatibility bridge" that does nothing but re-export `{ m, useReducedMotion }` from `motion/react` (its own file comment admits this: "delegates to Motion... preserving the existing component API"). Only 4 files still import from it (`WhyCapwise.jsx`, `ResourcesPreview.jsx`, `FaqPreview.jsx`, `BangladeshPreview.jsx`); the other 10 motion-using files (`template.jsx`, `BrandLogo.jsx`, `TeamPreview.jsx`, `ServiceOverview.jsx`, `PickYourIndustry.jsx`, `FirmIntro.jsx`, `ThemeToggle.jsx`, `SupportAssistant.jsx`, `SiteHeader.jsx`) already import `motion/react` directly. This is a genuine, harmless-but-pointless inconsistency — a leftover indirection layer from an earlier implementation. Consolidation: repoint those 4 imports to `motion/react` directly and delete `Motionless.jsx`.
2. **`ServiceIcon.jsx`** (`src/components/services/ServiceIcon.jsx`) and **`IndustryIcon.jsx`** (`src/components/industries/IndustryIcon.jsx`) are structurally identical — a `name → lucide-react icon` lookup map with an `aria-hidden` passthrough, differing only in the icon set. Not broken, but a textbook case for a single generic `<IconMap map={...} name={...} />` if a third one ever gets added.
3. **`ProfileCard`** is defined inline inside `src/app/team/page.jsx:9-18` (not extracted to `src/components`), while every other repeated card pattern (service cards, industry cards, insight cards) is either extracted to a component or at least a `.map()` inside a shared section component. Not wrong, just inconsistent with the rest of the codebase's pattern.

### Confirmed already removed (do not re-search for these)
`CustomCursor.jsx` and `RouteTransitionLoader.jsx` no longer exist. Zero references to either remain anywhere in `src/` (verified via grep — the only `cursor` hits left are Tailwind's `cursor-pointer`/`cursor-wait` utility classes, unrelated to a custom cursor effect).

---

## 3. Typography audit

Every major heading in the codebase already runs on one shared 5-tier `clamp()` scale (see `CLAUDE.md` → Frozen Tokens for the full table). Full instance list, file:line, current tier:

**Tier: Homepage hero `clamp(2.2rem,4vw,3.6rem)`** — mobile floor 35.2px
- `src/components/home/HomeHero.jsx:130`, `:132`

**Tier: Inner-page H1 `clamp(2rem,3.5vw,3.2rem)`** — mobile floor 32px
- `ServiceDetailPage.jsx:168`, `LegalDocumentPage.jsx:14`, `thank-you/page.jsx:27`, `testimonials/page.jsx:29`, `team/page.jsx` (H1, line 21 — long minified line), `services/page.jsx:94`, `resources/regulatory-updates/page.jsx:60`, `resources/page.jsx:54`, `resources/guides/page.jsx:49`, `not-found.jsx:26`, `insights/[slug]/page.jsx:69`, `insights/page.jsx:19`, `industries/[slug]/page.jsx:45`, `industries/page.jsx:115`, `faq/page.jsx:41`, `error.jsx:16`, `email-preview/page.jsx:53`, `contact/page.jsx:35`, `case-studies/[slug]/page.jsx:30`, `case-studies/page.jsx:32`, `careers/page.jsx` (H1, line 9 — long minified line), `business-in-bangladesh/[slug]/page.jsx:39`, `business-in-bangladesh/page.jsx:32`, `about/page.jsx:30`

**Tier: Section H2 `clamp(1.75rem,2.6vw,2.5rem)`** — mobile floor 28px
- `ServiceDetailPage.jsx:251,282,338,377,399,425,462,545`, `SiteFooter.jsx:17`, `WhyCapwise.jsx:82`, `TeamPreview.jsx:18`, `ServiceOverview.jsx:25`, `ResourcesPreview.jsx:71`, `PickYourIndustry.jsx:20`, `InsightsPreview.jsx:13`, `FirmIntro.jsx:14`, `FaqPreview.jsx:33`, `ConsultationCTA.jsx:19,41`, `ClientEvidencePreview.jsx:18`, `BangladeshPreview.jsx:109,197`, `testimonials/page.jsx:57`, `services/page.jsx:191,251`, `resources/regulatory-updates/page.jsx:131,200,220`, `resources/page.jsx:113,157,193,237`, `insights/[slug]/page.jsx:30` (markdown `h2` component), `insights/[slug]/page.jsx:85` ("Related insights"), `industries/[slug]/page.jsx:57`, `industries/page.jsx:171,224,293`, `faq/page.jsx:92`, `contact/page.jsx:48`, `business-in-bangladesh/page.jsx:59`, `about/page.jsx:43,48,59,77`

**Tier: H3/service/CTA `clamp(1.35rem,1.8vw,1.8rem)`** — mobile floor 21.6px
- `ServiceDetailPage.jsx:310,500`, `services/page.jsx:210`, `resources/guides/page.jsx:131`, `insights/[slug]/page.jsx:31` (markdown `h3`), `industries/page.jsx:182`, `faq/page.jsx:61`, `contact/page.jsx:55`, `business-in-bangladesh/[slug]/page.jsx:64`, `careers/page.jsx` (line 10, CTA heading)

**Tier: Large card title `clamp(1.2rem,1.5vw,1.55rem)`** — mobile floor 19.2px
- `WhyCapwise.jsx:145`, `ResourcesPreview.jsx:177`, `resources/regulatory-updates/page.jsx:104`, `resources/guides/page.jsx:190`, `case-studies/page.jsx:47`, `business-in-bangladesh/page.jsx:48`, `about/page.jsx:66`, `team/page.jsx:13` (featured branch only — supporting-member branch uses static `text-lg`, i.e. 18px, not in the clamp system, correctly small already)

**Flagged as oversized on mobile: none.** Every instance above resolves to a mobile floor between 19.2px and 35.2px — all within a defensible range for their hierarchy level. This was a live problem earlier in this project's history (some headings previously used unbounded `text-4xl`/`text-5xl` with no responsive step, and the homepage hero previously ran as large as `clamp(2.4rem,4.4vw,4.6rem)` before being reduced) — current state has no known regressions of that kind.

**Not on the clamp system, and correctly so:**
- `not-found.jsx:25` — the "404" watermark numeral, `clamp(5.5rem,15vw,12rem)`, `text-foreground/8` (8% opacity decorative background element, not a real heading, excluded by design).
- `GuideRequestButton.jsx:114` (Headless UI `DialogTitle`, `text-2xl sm:text-3xl`) — a modal dialog title, functional UI chrome rather than marketing typography; not covered by the marketing-heading scale.
- Small eyebrow/kicker labels (`text-[0.6rem]`–`text-[0.68rem]` uppercase, wide tracking) are intentionally outside this system — see CLAUDE.md.

---

## 4. Image inventory

### Local files (`public/`)

| Path | Format | Bytes | Used via |
|---|---|---|---|
| `public/brand/CAPWISE_logo_clean_notagline.png` | PNG | 49,340 | `next/image`, `BrandLogo.jsx:9,39` (intrinsic `1012×358`), `PageLoadingFallback.jsx` does **not** use this one |
| `public/brand/capwise-icon.png` | PNG | 26,127 | `next/image`, `PageLoadingFallback.jsx:9` (rendered at `26×26`) |
| `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | SVG | 128–1,375 | **Unused** — these are the default Next.js scaffold SVGs from `create-next-app`. No component references any of them (not caught in any `<Image>`/`<img>` grep). Dead weight in `public/`, safe to delete but out of scope for an audit-only pass. |

Neither PNG is large by web standards (49KB/26KB), no oversized local assets.

### Remote images (all via `next/image`, all Pexels, all through `remotePatterns` in `next.config.mjs`)

15 entries in `src/data/insights.js`, each `?auto=compress&cs=tinysrgb&w=1600` (Pexels' own compression, not Next's) — full list at `src/data/insights.js:9,18,27,36,45,54,63,72,81,90,99,108,117,126,135`. All are `next/image` with `fill` + explicit `sizes`, confirmed via `src/app/insights/[slug]/page.jsx:70`, `src/components/insights/InsightsExplorer.jsx:40`, `src/components/home/InsightsPreview.jsx:15`.

`next.config.mjs` `remotePatterns` is scoped to exactly two hostnames: `images.unsplash.com` and `images.pexels.com` — not a broad wildcard. `images.qualities: [75, 88]` is declared; the only explicit `quality={88}` in code is `HomeHero.jsx:113`.

`HomeHero.jsx` swiper slides use 7 more Pexels URLs at `?w=1920`, lines 19,28,37,46,55,64,73.

### Raw `<img>` usage

Exactly one, and it is structurally required: `src/app/opengraph-image.jsx:28`, inside `ImageResponse` (edge runtime, `next/image` cannot run there). Already documented as an accepted exception in `CLAUDE.md` rule 5.

### Above vs. below the fold

- **Above fold, `priority` set correctly**: `HomeHero.jsx:112` (`priority={index===0}` — only slide 1), `BrandLogo.jsx:15,44` (header logo, every page), `insights/[slug]/page.jsx:70` (article hero image).
- **Below fold, no `priority`, correct**: `InsightsPreview.jsx` cards (homepage, well below hero), `InsightsExplorer.jsx` grid (insights listing, standalone page below its own H1).
- **`PageLoadingFallback.jsx:9`** — no `priority` (this was corrected during an earlier session pass; the 26×26 loading-spinner icon is not an LCP candidate and should not preload).

No oversized or mis-prioritized image assets found.

---

## 5. Banner/slider inventory

**Only one carousel in the codebase**: `src/components/home/HomeHero.jsx` (Swiper, homepage only). No other page has a slider/carousel.

- Container: `SwiperSlide > div` at `HomeHero.jsx:107`, height via `min-h-[36rem] sm:min-h-[44rem] lg:min-h-[46rem] xl:min-h-[48rem]` — **identical across all 7 slides** (single `.map()`, one template, not per-slide variance).
- Image: `next/image` with `fill` (line 108), `object-cover` (line 115), `sizes="100vw"` (line 114) — same for every slide.
- Two overlay gradients applied uniformly to every slide (lines 117–118), plus a subtle grid-pattern overlay (line 119) — all `absolute inset-0`, not per-slide.
- The historical "blue strip at bottom" bug is **not currently reproducible**. Root-caused earlier this session: the negative top-margin on the outer `<section>` (`-mt-[5.125rem] sm:-mt-[5.5rem] lg:-mt-[5.625rem]`, line 88) is precisely calibrated to the header's rendered height to close the gap between the sticky header and hero. If the header's height ever changes again (logo resize, nav item added/removed, padding change), this margin must be re-measured — it is not derived from a shared variable, it's a hand-tuned magic number. **This is the single highest-risk spot for the bug to silently return.**
- Verified via live screenshot sweep (7 slides × 2 widths, 390px and 1440px, captured this session) — zero gap, zero strip, full-bleed on every slide at both breakpoints.

No other banner/slider exists to audit (no testimonial carousel, no logo strip, no image gallery slider anywhere else in the site).

---

## 6. Odd-number grid inventory

Every data-driven grid in the codebase, with item count and mobile column behavior:

| Component | Data source | Count | Mobile grid | Orphan risk? |
|---|---|---|---|---|
| `ServiceOverview.jsx:29` | `services.js` | **7** | `grid-cols-2` (base) → `xl:grid-cols-4` | **This is the flagged 7-service section.** Already fixed: last card gets `col-span-2 xl:col-span-1` (`line 33`, ternary on `index === services.length - 1`), first card gets `xl:col-span-2` (`index === 0`). Result: 2-col mobile = 3 clean full rows (2+2+2+1-full-width); 4-col desktop = 2 clean rows (2+1+1, then 1+1+1+1). No orphan. |
| `TeamPreview.jsx` (supporting) `:33` | `team.js` (`supportingTeamMembers`) | **4** | `grid-cols-2` → `lg:grid-cols-4` | None — 4 is even at 2-col. |
| `TeamPreview.jsx` (featured) `:23` | `team.js` (`featuredTeamMembers`) | **2** | `lg:grid-cols-2` (single column below `lg`) | None. |
| `team/page.jsx:22` (supporting) | `team.js` | **4** | `md:grid-cols-2 xl:grid-cols-4` (1-col below `md`) | None. |
| `PickYourIndustry.jsx:31` | `pickYourIndustry.js` | **6** | `grid-cols-2` → `xl:grid-cols-3` | None — 6 is even at both 2-col and 3-col. |
| `industries/page.jsx:176` | `industries.js` | **5** | 1-col until `lg:grid-cols-3` (no intermediate 2-col step) | None on mobile (1-col never orphans); at `lg:` a 5-in-3-col grid leaves a natural 2-card last row (3+2) — a normal uneven-last-row, not a broken grid, and not a mobile-width issue. |
| `resources/page.jsx:203` | `resources.js` | **7** | 1-col below `sm:`, then `sm:grid-cols-2 lg:col-span-8` (**stays 2-col**, no 3+ step) | **Flag**: at `sm:`–`lg:` widths (640px–1024px, i.e. small tablets/large phones in landscape) a 7-item 2-col grid produces 3 full rows + 1 orphan card, same failure mode as the original ServiceOverview bug, just not yet fixed here. Does not affect true phone widths (360–430px, which are 1-col), so it's a tablet-range issue specifically, not a 360–430px one. |
| `business-in-bangladesh/page.jsx:43` | `businessBangladesh.js` | **5** | 1-col until `lg:grid-cols-12`, items individually assigned `lg:col-span-6` (first 2) or `lg:col-span-4` (last 3) | None — hand-authored spans, not an auto-grid, so no orphan possible by construction. |
| `industries/[slug]/page.jsx:58` | `industry.supportAreas` (per-industry array, length varies) | Variable | `sm:grid-cols-3` | Not auditable generically — depends on each industry's array length in `industries.js`; worth a follow-up read of that data file if this becomes a real complaint. |

**Summary**: the specifically-requested 7-service section (`ServiceOverview.jsx`) is confirmed fixed and clean. One other odd-count grid (`resources/page.jsx`, 7 guides) has the same latent bug pattern but only manifests at tablet widths, not the 360–430px range this task's parent brief prioritizes.

---

## 7. Animation & effect inventory

### Motion libraries in use
- **`motion/react`** (Framer Motion, npm package `"motion": "^13.1.0"`) — used directly in 10 files, via the `Motionless.jsx` shim in 4 files (see §2 for the list).
- **GSAP** (`"gsap": "^3.15.0"` + `"@gsap/react": "^2.1.2"`) — used in exactly one place: `src/components/support/SupportAssistant.jsx:3,5,27` (`useGSAP`, `gsap.registerPlugin`). This is the "Ask Capwise" chat widget, rendered on every page via `AppProviders.jsx`. **Performance note carried over from an earlier audit this session**: GSAP + `@gsap/react` ship in the initial bundle for every page load even though the widget is closed by default and most visitors never open it — a candidate for `next/dynamic(() => import(...), { ssr: false })`.
- **Swiper** (`"swiper": "^14.1.0"`) — `HomeHero.jsx` only, homepage.
- **Lenis** (`"lenis": "^1.3.25"`) — `src/components/providers/SmoothScrollProvider.jsx`, root-mode smooth scroll wrapping the whole app; also consumed by `FloatingContact.jsx` for its scroll-progress ring.

### Page transition
`src/app/template.jsx` — remounts on every route change (Next.js App Router built-in `template.jsx` behavior), animates `opacity` (0→1) + `clipPath` (`inset(10px 0 0 0)` → `inset(0px 0 0 0)`), 320ms, easing `[0.22,1,0.36,1]`, respects `useReducedMotion`. Replaced the old `RouteTransitionLoader.jsx` top-progress-bar (deleted this session — see §2). Deliberately does **not** use `transform`/`y`-slide: a transform on this wrapper would make it a new CSS containing block for any `position: fixed` descendant inside page content — and the mobile nav drawer (`SiteHeader.jsx`, rendered per-page, not in layout) is exactly such a descendant. Verified live: zero console errors on navigation, mobile drawer still renders full-height and correctly positioned after a route change.

### Custom cursor effect
**Fully removed, nothing left to inventory.** `CustomCursor.jsx` does not exist. No import of it anywhere. No dedicated CSS class for it in `globals.css`. No package in `package.json` was ever cursor-specific (it was hand-rolled DOM/mouse-tracking, not a library). This item can be considered closed.

### Other motion-heavy spots worth knowing about for future performance/restraint review
- `HomeHero.jsx` — Ken Burns-style slow zoom on the active slide image (`globals.css:1398-1399`, `.capwise-hero-slide-image { transform: scale(1.045) }` → `scale(1)` on `.swiper-slide-active`, 7s transition) plus staggered copy fade-in (`globals.css:1400-1404`, 4 children staggered 0/.08s/.15s/.22s).
- `BrandLogo.jsx:32-56` — logo entrance animation (fade/scale/y on mount) plus a hover "light sweep" (`m.span` sliding a skewed white gradient across the logo on hover, lines 47-55) plus a `whileHover` glow filter — three separate motion effects stacked on one small header element. Not necessarily wrong, but the densest concentration of decorative (non-hierarchy) motion in the codebase, worth weighing against CLAUDE.md rule 7 ("motion supports hierarchy, never the main attraction") on a future pass.
- `SiteHeader.jsx` desktop dropdowns — `AnimatePresence` + `m.div` open/close (opacity/y/scale), 200ms.
- Section reveal pattern (`whileInView` + `viewport:{once:true}`) is used consistently across all `home/*` components — this is the dominant, restrained, appropriate use of motion in the codebase.

---

## 8. Header/navbar audit

Current live values (`src/app/globals.css:833-861`, `.capwise-floating-nav`), as of the navbar-glass task completed earlier this session:

```
Light:
  border: 1px solid color-mix(in srgb, var(--border) 90%, transparent)
  background: linear-gradient(165deg,
      color-mix(in srgb, var(--surface) 82%, transparent) 0%,
      color-mix(in srgb, var(--surface) 74%, transparent) 100%)
  backdrop-filter: blur(52px) saturate(1.9)
  box-shadow: 0 20px 55px rgba(11,27,61,.18), 0 2px 14px rgba(11,27,61,.09),
      inset 0 1px 0 0 rgba(255,255,255,.55)

Dark [data-theme="dark"]:
  background: linear-gradient(165deg,
      color-mix(in srgb, var(--surface) 78%, transparent) 0%,
      color-mix(in srgb, var(--surface) 68%, transparent) 100%)
  box-shadow: 0 20px 55px rgba(2,12,23,.5), 0 2px 14px rgba(2,12,23,.26),
      inset 0 1px 0 0 rgba(255,255,255,.12)
```

This is the **third iteration** of these values in this session (originally 88%/86% opacity flat → pushed to 96%/94% flat → reverted to the current 74–82%/68–78% gradient with much stronger blur, per explicit user direction: too transparent → too flat/opaque → this "deep glass" version). Applied via a single shared class (`SiteHeader.jsx:195`), so it is automatically identical across mobile/tablet/desktop — there is no per-breakpoint override to audit separately.

**Where readability could still fail**: the gradient's *second* stop (74%/68% opacity) is meaningfully more transparent than the first (82%/78%). Over a hero image with a very bright, high-contrast region positioned under the *right side or bottom* of the pill (nav links live in the horizontal-center-to-right area of the pill, `SiteHeader.jsx:198-306`), the lower-opacity end of the gradient combined with strong blur could still soften contrast slightly more than the left edge does. Not confirmed as a live bug — no visual regression was observed in this session's own screenshots — but it is the one deliberate asymmetry in the current recipe and the first place to check if a future contrast complaint comes in over a specific hero slide.

Mobile drawer (`SiteHeader.jsx:338`, `.capwise-mobile-drawer`) and `FloatingContact.jsx:25` (`backdrop-blur-xl`) use separate, unaudited glass values — out of scope for this section unless requested.

---

## 9. Mobile overflow list

A scripted sweep (Playwright, `document.documentElement.scrollWidth - clientWidth`) was run earlier this session across **5 widths (360/375/390/412/430) × 22 routes = 110 checks**, covering every static route plus one sample of each dynamic route type.

**Result: zero genuine horizontal-overflow or edge-touching bugs found.** The only 2 non-clean results were `page.goto` timeouts (`/business-in-bangladesh` and `/industries/smes-startups` at 360px, both on cold Turbopack compilation, both loaded fine on retry/at other widths) — not layout bugs.

This sweep predates the page-transition and navbar-glass changes made later in this session; neither of those touches width, position, or margin properties (transition uses `opacity`/`clip-path` only; navbar-glass only changed `background`/`backdrop-filter`/`box-shadow`), so the result should still hold. Re-running the sweep after any future layout-affecting change is still the correct verification step — do not assume this list stays valid indefinitely.

No per-element overflow list exists because none was found. If this task's later phases turn up a specific overflow, re-run the sweep's "culprit" branch (it walks the DOM for elements whose `getBoundingClientRect().right` exceeds viewport width) to get exact selectors.

---

## 10. Performance notes

1. **`SupportAssistant.jsx` ships GSAP on every page, unconditionally.** Rendered via `AppProviders.jsx` (not lazy), imports `gsap` + `@gsap/react` + Headless UI `Dialog` directly. The widget is closed by default; most page loads never open it. Candidate: `next/dynamic(() => import("@/components/support/SupportAssistant"), { ssr: false })`.
2. **`Motionless.jsx` indirection** (§2) — not a performance cost (same underlying `motion/react` import either way, no extra bundle), but a maintenance/consistency cost worth cleaning up in the same pass as anything else touching those 4 files.
3. **Unused scaffold SVGs in `public/`** (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) — zero bytes served (nothing references them), but dead files in the repo. Safe, trivial cleanup whenever a "chore" pass happens.
4. **Hand-tuned magic-number hero margin** (§5) — `HomeHero.jsx:88`'s negative margin is not derived from the header's actual rendered height; it's a manually recalibrated constant. Every time header height changes (logo size, nav padding, breakpoint tweak), this needs re-measurement or the white-gap bug returns. This is a **process risk**, not a current bug — flagging so future header changes remember to check it.
5. **No duplicate CSS rules found** in `globals.css` for the same selector (checked the `.capwise-*` component-layer block for repeated selector blocks — none).
6. **No obvious layout-shift sources** beyond the general image `fill`+`sizes` pattern, which is already correctly implemented everywhere (aspect-ratio containers wrap every `fill` image — confirmed in `insights/[slug]/page.jsx:70`, `InsightsExplorer.jsx:39`, `InsightsPreview.jsx`). `next/font` is used with `display: "swap"` for both typefaces (`layout.jsx:11-21`), which avoids invisible-text-on-load but can cause a font-swap reflow — standard, acceptable tradeoff, not flagging as a defect.
7. **All 6 `"use client"` root providers** (`ThemeProvider`, `MotionProvider`, `SmoothScrollProvider`, `ToastProvider`, plus `FloatingContact` and `SupportAssistant`) are legitimately client-only (theme state, scroll physics, toast portal, GSAP, scroll-linked SVG) — none looks like an unnecessary client-component conversion of something that could be server-rendered.

---

## Not covered in this pass

Per the task's scope (10 numbered sections only): no code was changed, no new screenshots were taken beyond what this session had already captured earlier, and item-level data files with variable-length arrays (e.g. `industries.js` per-industry `supportAreas`) were not individually enumerated — flagged in §6 as a follow-up if needed.

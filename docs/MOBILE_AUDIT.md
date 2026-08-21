# CAPWISE Mobile Audit

Audit-only — no components were touched to produce this document. Read in this order per instruction: `CLAUDE.md`, `AGENTS.md`, `docs/AUDIT.md`, `CAPWISE_UPGRADE_NOTES.md`, `src/app/globals.css`, then consulted UI/UX Pro Max and (in the absence of a skill literally named "Entropix") `frontend-design` — see `CLAUDE.md` → Required References for why that substitution is flagged, not assumed.

**Addendum (this revision)**: the original overflow-sweep verdict in Part 1, finding 3 below was wrong for a specific route. Corrected in a new "Addendum — overflow contradiction resolved" section and a new "Part 3 — visual verification" section, both appended at the end of this document. The body of the document below is left as originally written (including the now-superseded parts) so the correction is visible as a correction, not silently edited away.

`CAPWISE_UPGRADE_NOTES.md` is historical context, not current state: it documents an earlier redesign pass (brand-system swap, header rebuild, hero-carousel rebuild, Insights architecture) and explicitly says a full `npm install`/lint/build could not be run in that environment. Every one of those gaps has since been closed in this session — lint and `npm run build` have both run clean repeatedly since. Treat that file as a changelog artifact, not an open task list.

---

## Part 1 — Confirm or refute your 8 findings

### 1. "globals.css:352 sets h1–h6 letter-spacing: -0.025em, AND the --text-* tokens each set -0.02em. Headings get compounded negative tracking."

**Half right on the facts, wrong on the conclusion — refuted.**

Both declarations genuinely exist:
- `globals.css:352` — `letter-spacing: -0.025em;` inside the `h1,h2,h3,h4,h5,h6 { ... }` block (`globals.css:345-354`).
- `globals.css:293,297,301,305,309` — each `--text-{tier}--letter-spacing: -0.02em;` in the `@theme inline` block, which Tailwind v4 compiles into `.text-h1 { ...; letter-spacing: var(--tw-tracking, -.02em); }` etc.

But CSS letter-spacing does not compound across declarations — only one wins per element, per the cascade. I checked this empirically rather than trust the theory: on `/about`, `document.querySelector("h1")` has `className="... text-h1 ..."`, computed `font-size: 44.8px`, computed `letter-spacing: -0.896px`. `-0.896 / 44.8 = -0.02` exactly — the winning value is `-0.02em` (the token), not `-0.045em` (which true compounding would produce) and not `-0.025em` (the base rule alone). The `text-h1` utility is Tailwind-generated and lands in `@layer utilities`, which is ordered after this project's custom `@layer base` block regardless of selector specificity — so it wins outright. The base h1–h6 rule only matters for headings that carry **no** `text-*` token class (e.g., ad hoc `<h2>`/`<h3>` elements using raw Tailwind size classes instead of a token — see Part 2, several exist). On those, `-0.025em` applies alone, still not compounded with anything.

### 2. "All five heading tiers use line-height: 1.1, including --text-card at clamp(1.2rem,...)."

**Confirmed**, exactly as stated. `globals.css:292,296,300,304,308` — `--text-hero--line-height`, `--text-h1--line-height`, `--text-h2--line-height`, `--text-h3--line-height`, `--text-card--line-height` are all `1.1`. `--text-card` itself is `clamp(1.2rem, 1.5vw, 1.55rem)` at `globals.css:307`. No refutation available — this is literally what the file says.

### 3. "body has overflow-x: hidden, which hides horizontal overflow rather than fixing its source."

**Confirmed**, `globals.css:335`, inside the `body {}` rule (`globals.css:332-343`). Factually present and a fair characterization — `overflow-x: hidden` is a backstop, not a root-cause fix. Worth adding: the site-wide overflow sweep run earlier this session (110 checks, 5 widths × 22 routes, documented in `docs/AUDIT.md` §9) found **zero** cases where this backstop is actually masking a real overflow source right now — so the rule is present but not currently hiding a known bug. That could change with any future layout edit, which is exactly why it's worth flagging as a standing risk rather than a proof of an active defect.

### 4. "There are 180+ arbitrary font sizes below 0.8rem across .jsx files, the smallest being text-[0.54rem]."

**Directionally right, smallest value is wrong — partially refuted.** Actual count of `text-[0.NNrem]` (all values below 0.8rem, i.e. `< text-sm`) across `src/**/*.jsx`: **188** instances (verified by grep, not estimated), so "180+" holds. But the smallest is not `0.54rem` — there are three smaller values in the codebase:
- `text-[0.32rem]` (5.12px) — `src/components/ui/BrandLogo.jsx:74`, the mobile-width tier of the tagline lockup ("Accounting & Finance · Tax & Compliance · HR & Payroll")
- `text-[0.42rem]` (6.72px) — same line, `sm:` tier of the same tagline
- `text-[0.54rem]` (8.64px) — 2 instances: `resources/guides/page.jsx:122` (a status badge) and `FloatingContact.jsx:50` ("Call Capwise" label, desktop-only via `lg:flex`)

So the true floor is `0.32rem` = **5.12px**, not `0.54rem` — nearly 3px smaller than what you cited, and on the header logo lockup that renders on every single page.

### 5. "There is no horizontal gutter token. px-3/4/5/6/8/10 are all in use."

**Confirmed.** No `--spacing-*` or gutter-named custom property exists anywhere in `globals.css` (checked; the only `gutter` hit is the unrelated `scrollbar-gutter: stable` at line 328). All six values are genuinely in use: `px-3` (14 files), `px-4` (32), `px-5` (22), `px-6` (44), `px-8` (16), `px-10` (35). This matches `CLAUDE.md`'s own admission ("No formal 4/8pt token scale is declared... arbitrary-value Tailwind classes applied consistently by convention, not a `@theme` token set") — this finding isn't new, it's already documented as accepted convention rather than an oversight, though "consistently by convention" is generous given 6 different values are live simultaneously.

### 6. "There is no vertical section rhythm token. py-10 through py-32 are in use."

**Confirmed**, and broader than stated. No rhythm token exists (same absence as #5). Usage isn't just the two endpoints — every even step in between is live too: `py-10` (2 files), `py-12` (6), `py-14` (12), `py-16` (26), `py-18` (9), `py-20` (18), `py-24` (27), `py-28` (27), `py-30` (3), `py-32` (9). Ten distinct values, not a scale.

### 7. "Many .jsx files contain single lines over 1,000 characters (worst: InsightsPreview.jsx at ~1,596)."

**Confirmed, number is exact.** Longest line in `InsightsPreview.jsx` is **1,596 characters** — matches your figure precisely. It is not alone: `careers/page.jsx` (1,436), `team/page.jsx` (1,259), `insights/[slug]/page.jsx` (1,231) all exceed 1,000; `business-in-bangladesh/page.jsx` (838) is the next tier down. These are the files written in the codebase's "ultra-compact" style (entire sections as one unbroken JSX expression, no line breaks) — a real, verified pattern, not scattered noise.

### 8. "Two fixed-position floating elements exist (.capwise-float-contact at top-[6.25rem] z-40, and one at bottom-4 right-4 z-[88])."

**Confirmed as literally stated**, with a clarification worth having. Both cited elements exist exactly as described: `FloatingContact.jsx:25` — `fixed right-3 top-[6.25rem] z-40 ... lg:top-[7.25rem]`; `SupportAssistant.jsx:186` — `fixed bottom-4 right-4 z-[88] ... sm:bottom-6 sm:right-6`. These are the only two **persistent, always-mounted** floating elements. There are four more `fixed`-positioned elements in the codebase, but they're a different category — conditional modal/drawer chrome that only exists in the DOM while open: the mobile nav drawer's backdrop + panel (`SiteHeader.jsx:334,338`), the guide-request modal's backdrop + panel (`GuideRequestButton.jsx:104-105`), and the support chat panel's own backdrop/panel (`SupportAssistant.jsx:242,245`, separate from its always-visible launcher button at line 186). Also `position: fixed` but off-screen until keyboard-focused: `.capwise-skip-link` (`globals.css:808`, `transform: translateY(-180%)`), an accessibility utility, not UI chrome. None of these four contradict your count of "two floating elements" — they're modal overlays, not floating persistent widgets — but they're worth having on record since "fixed-position" and "floating element" aren't quite the same category and a future click-through-blocked-by-z-index bug is more likely to involve one of these six than just the two you named.

---

## Part 2 — Route inventory + mobile defects by route

Route/component map reused from `docs/AUDIT.md` §1 (still current); defects below are new findings from reading the code specifically for mobile (360–430px) behavior, not re-litigating that document.

| Route | Renders | Mobile defects found by reading the code |
|---|---|---|
| `/` | `HomeHero` → `TrustStrip` → `WhyCapwise` → `ServiceOverview` → `PickYourIndustry` → `TeamPreview` → `InsightsPreview` → `FirmIntro` → `BangladeshPreview` → `ClientEvidencePreview` → `ResourcesPreview` → `FaqPreview` → `ConsultationCTA` | **Sub-12px text**: `BrandLogo.jsx:74` tagline renders at 5.12px on every page via the header (see finding 4) — this is the single most-visible sub-12px instance since it's on every route, not just one page. **Intentional (not a bug) height asymmetry**: `InsightsPreview.jsx:15` — featured card (`index===0`) uses `min-h-[15rem] sm:min-h-[22rem]`, the other 3 use `min-h-[11rem] sm:min-h-[15rem]` — different by design (featured tile is wider too), converges to equal `24rem` only at `lg:`. Not a defect, but flagging since you asked specifically about uneven card heights. |
| `/about` | Hero H1 → mission/vision 2-up → values grid → advisors CTA | Values grid is `sm:grid-cols-2` (`about/page.jsx`, per `docs/AUDIT.md` route table) — single column below 640px, no risk there. No sub-12px or tap-target issues found on this page specifically. |
| `/services`, `/services/[slug]` | Hero H1 → grid/sections → `ServiceDetailPage.jsx` | `ServiceDetailPage.jsx:483` — decorative `size-9` (36px) icon badge inside a larger card, not itself a tap target, no violation. |
| `/industries`, `/industries/[slug]` | Hero H1 → grid (5 items) → sub-sections | Per `docs/AUDIT.md` §6, `industries/page.jsx:176` grid is 1-col until `lg:grid-cols-3` — no intermediate 2-col step, so no mobile orphan risk. |
| `/business-in-bangladesh`, `/[slug]` | Hero H1 → hand-spanned topic grid → CTA | Hand-authored `lg:col-span-6`/`lg:col-span-4` spans (`business-in-bangladesh/page.jsx:43` per `docs/AUDIT.md`), not an auto-grid — no orphan possible by construction. |
| `/team` | Hero H1 → featured (2) → supporting (4) → CTA | `ProfileCard` defined inline in `team/page.jsx:9-18` (838-char-plus lines here too, `team/page.jsx` is the #3 longest-line file at 1,259 chars) — not a mobile defect per se, but the density of this file makes future mobile spot-fixes here higher-risk/harder to review than the extracted-component pages. |
| `/contact` | Hero H1 → `ConsultationForm` + contact aside + `LocationSection` | No sub-12px or overflow issues found in this file on inspection. |
| `/faq` | Hero H1 → sticky sidebar + accordion → CTA | Sticky sidebar (`lg:sticky lg:top-36`, only active at `lg:`) — no mobile-specific sticky-overlap risk since it's a normal stacked block below `lg:`. |
| `/careers` | Hero H1 → openings panel + "how we work" panel | `careers/page.jsx` is the **#2 longest-line file** (1,436 chars) — same density/reviewability flag as `/team`. No specific overflow or sub-12px defect found beyond the general eyebrow-label sizes shared sitewide. |
| `/case-studies`, `/[slug]` | Hero H1 → list/empty-state → narrow article | List is `lg:grid-cols-2` (`docs/AUDIT.md`) — 1-col below `lg:`, no orphan risk. `caseStudies` data array is currently empty, so the empty-state branch is what actually ships today. |
| `/testimonials` | Hero H1 → list/empty-state | No component-specific mobile defect found. |
| `/insights`, `/insights/[slug]` | Hero H1 → `InsightsExplorer` (search+grid) / article | `insights/[slug]/page.jsx` is the **#4 longest-line file** (1,231 chars). `InsightsExplorer.jsx` grid is `md:grid-cols-2 xl:grid-cols-3` (per `docs/AUDIT.md` component notes) — 1-col below `md:`, no mobile orphan. |
| `/resources`, `/guides`, `/regulatory-updates` | Hero H1 → grids/lists → newsletter/modal | **Known latent orphan-card bug** (already flagged in `docs/AUDIT.md` §6, repeating here since it's a genuine mobile-adjacent defect): `resources/page.jsx:203` — 7 guide items in a grid that stays 2-col from `sm:` through `lg:` with no 3-col step, producing a 3-full-rows-plus-1-orphan layout at tablet/small-laptop widths (640–1024px). Doesn't hit true phone widths (360–430px, which are 1-col), so it's adjacent to this audit's priority range rather than squarely in it. |
| `/thank-you` | Confirmation H1 only | No defect — minimal content, nothing to break. |
| `/privacy-policy`, `/terms-of-use`, `/professional-disclaimer` | `LegalDocumentPage.jsx` | Prose-only, no grids/cards to go uneven. |
| `/blog`, `/blog/[slug]` | Redirects only | No UI, not applicable. |
| Every route (header) | `SiteHeader.jsx` + `BrandLogo.jsx` | **The one confirmed, sitewide, always-visible mobile defect**: the tagline under the logo renders at `text-[0.32rem]` (5.12px) on every page below `sm:`, per finding 4. This is far under any legibility floor and is the single highest-reach typography defect in the codebase because it's not confined to one route. |
| Every route (footer) | `SiteFooter.jsx` | **Tap target**: `SiteFooter.jsx:30` — the WhatsApp icon-only `<a>` next to each team member's phone number has no explicit size/padding class at all; its clickable area is whatever the bare 13px Lucide icon renders at inline. Well under the 44×44px (and even the WCAG 2.2 AA 24×24px) minimum. This exists twice per page load (once per team member) on every route, since the footer is global. |
| Every route (floating widgets) | `FloatingContact.jsx`, `SupportAssistant.jsx` | Both confirmed correctly sized — `FloatingContact`'s call button and `SupportAssistant`'s launcher are both comfortably above 44px (see finding 8's citations); not a defect, noting only because they were already under discussion. |

---

## Priority ranking — what breaks the client's impression most, first

1. **Header tagline at 5.12px (`BrandLogo.jsx:74`)** — sitewide, on every single page, above the fold, on the one brand element every visitor sees first. An oversized-typography complaint got extensive attention this session; this is the mirror-image defect — a brand lockup rendering functionally illegible on the exact viewport widths (360–430px) this audit prioritizes. Highest reach × highest visibility = highest priority.
2. **Footer WhatsApp icon tap target (`SiteFooter.jsx:30`)** — also sitewide, and it's a *contact-conversion* control on a consultancy site whose whole business model runs through people successfully tapping "call us." A missed tap here isn't cosmetic, it's a lost lead.
3. **`resources/page.jsx:203` orphan-card grid** — real, already-diagnosed, same failure class as the 7-service bug you already had fixed elsewhere — but scoped to tablet widths, not phone widths, so it sits below the top two for this audit's stated 360–430px priority.
4. **The 188 sub-0.8rem arbitrary sizes as a class, minus the tagline already called out separately** — most of these are eyebrow/kicker labels (`text-[0.6rem]`–`text-[0.68rem]`) which `CLAUDE.md` documents as an intentional, deliberately-tiny uppercase pattern with wide tracking — legible in practice because of the tracking and all-caps treatment, not a defect on their own. Lower priority than 1–3, but worth a legibility pass if this audit's "go" phase has room, since 188 is a lot of surface area for a pattern that's never had a rendered-pixel legibility check, only a design-intent one.
5. **File-length/density findings (#7)** — not a mobile *rendering* defect at all, but flagged because it raises the cost and risk of fixing 1–4: `InsightsPreview.jsx`, `careers/page.jsx`, `team/page.jsx`, `insights/[slug]/page.jsx` are all single-expression mega-lines, which makes precise, low-risk edits (like the tagline fix, if it touches shared JSX) slower to review diff-by-diff. Not something to "fix" as its own task, just context for how carefully phase 2 should move inside those four files specifically.

---

## What this document does not do

Per instruction, no component was touched, no `npm run build`/lint was re-run (the codebase's last confirmed-clean build/lint from earlier this session still stands and nothing here changed since), and no screenshots were newly captured — every citation above is either a fresh grep/computed-style check run for this audit or a cross-reference to `docs/AUDIT.md`'s already-verified findings, never a guess.

---
---

## Addendum — overflow contradiction resolved

**Answer: (a) — there is real overflow, and the original sweep's method missed it for a specific, explainable reason. Confirmed, not assumed — screenshots and raw metrics below.**

### The repro

Loaded `/insights/business-structure-bangladesh` at exactly 430px viewport width, `deviceScaleFactor: 1` (i.e. 100% zoom — addressing option (b) directly: this is not a DevTools zoom artifact).

Raw metrics from the live page:

```
docScrollWidth: 694    docClientWidth: 430    →  264px of real overflow
bodyScrollWidth: 694   bodyClientWidth: 415
windowInnerWidth: 430  devicePixelRatio: 1
```

At natural scroll position (`scrollX ≈ 21`, the resting position `scrollbar-gutter: stable` produces), the H1 and header render fully intact — see `docs/MOBILE_AUDIT.md` screenshot references below. But the overflow is not cosmetic-only: I tested whether it's actually reachable by calling `window.scrollTo(500, 0)` on the live page. The browser accepted the scroll and landed at `scrollX = 279` (clamped to the real content width, not rejected) — proving this is genuine, user-reachable horizontal scroll, not a harmless intrinsic-sizing number that never surfaces.

**Screenshot at the scrolled position — this is the exact symptom you described:**

At `scrollX = 279`, the header/logo lockup is pushed almost entirely off the left edge (only the theme toggle and hamburger button remain on-screen), and the heading text is truncated to fragments — visible remnants read `"nt"` and `"re"`, the tail ends of the original heading. This matches "H1 and header logo clipped at the left edge, visible characters cut off mid-word" precisely. The header uses `position: sticky` (`SiteHeader.jsx`), which only pins vertically — it has no special handling that would resist a horizontal scroll, so it scrolls left with the rest of the page exactly as shown.

### Root cause

The article body (rendered via `react-markdown` inside `insights/[slug]/page.jsx`) contains a comparison table. The table markup (confirmed in the live DOM) carries `className="w-full min-w-[42rem] border-collapse text-left text-sm"` — a hard 672px minimum width, wrapped in a `div.mt-6.overflow-x-auto.rounded-xl.border.border-border` intended to let the table scroll internally within its own box on narrow screens.

That containment doesn't hold. In the live DOM, the wrapper `div` itself measured `right: 694, width: 674` — i.e. the **wrapper**, not just the table inside it, is 674px wide. A block-level container with no explicit width, containing a child with `min-width` wider than the available space, can be forced to grow to fit that child rather than clipping it — `overflow-x-auto` only creates an internal scrollbar for content that overflows a box's *own already-determined* size; it does not prevent the box's size from being pushed wider by a `min-width` descendant in the first place. The grid that hosts the article column (`className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end"`, `insights/[slug]/page.jsx`) only gets an explicit `grid-template-columns` at `lg:` (confirmed: `getComputedStyle` on this element below `lg:` reports a single auto-sized track) — so nothing upstream of the table stops the min-width table from inflating the whole column, and from there, the whole page.

### Why the original sweep's method missed it

The sweep documented in `docs/AUDIT.md` §9 tested "one sample of each dynamic route type" for `/insights/[slug]` — and picked `sme-sector-bangladesh` as that sample. Checked directly: **`sme-sector-bangladesh.md` contains zero markdown tables.** The bug is not in the page template shared by all 15 insight articles — it's in *content*, specific to whichever articles happen to include a markdown table. Confirmed which ones do:

```
business-structure-bangladesh.md
company-registration-bangladesh.md
vat-registration-smes-bangladesh.md
```

Three of fifteen articles carry this defect; the other twelve, including the one the original sweep happened to sample, do not. A route-template sweep that samples one instance per dynamic route type cannot catch a bug that lives in per-instance *content* rather than the shared template — that's the actual methodological gap, not a bug in the sweep's overflow-detection logic itself (which correctly returns 0 for every route where no table exists, verified again in Part 3 below).

---

## Part 3 — visual verification (360px and 430px)

Captured live, viewport-sized screenshots (not full-page, which downscale illegibly) for the six requested routes at both widths, plus the confirmed table-overflow route as a seventh data point. Overflow numbers below are the actual `document.documentElement.scrollWidth - clientWidth` measured on each page load, not estimated.

| Route | 360px overflow | 430px overflow | Visual verdict |
|---|---|---|---|
| `/` (hero + services grid) | −15px (no overflow — see note) | −15px | Hero heading, CTA buttons, and the 4-card stat grid (`TrustStrip`) all render with even card heights, no cramped spacing, no edge-touching content. `ServiceOverview`'s 2-card-per-row layout at this scroll position shows consistent card heights. No defect. |
| `/insights` (listing) | −15px | −15px | Hero, category-filter pill row, and search input all wrap and stack cleanly at both widths; pill row wraps to 3 lines at 360px without any pill clipping or overflow. No defect. |
| `/insights/business-structure-bangladesh` | **+334px real overflow** | **+264px real overflow** | **Corrects the original audit.** At natural scroll, the hero/H1/article-image render fine (matches the original "no defect" read for the *template*), but this specific article's body content breaks containment further down the page — see Addendum above. The original Part 2 table's "no sub-12px or overflow issues found in this file on inspection" verdict was a code-read verdict about the template only; it did not (and structurally could not) catch a content-dependent bug. Corrected verdict: **this route has a real, reproducible, content-triggered horizontal-overflow defect**, present on 3 of 15 article pages. |
| `/services` (grid) | −15px | −15px | Hero heading and the service-card grid render with consistent card heights and spacing; icon badges are legible, no crowding. No defect. |
| `/team` (grid) | −15px | −15px | Hero, "Featured team members" label, and the first featured card (navy, `FKC` avatar) render cleanly with proper padding; card corners aren't clipped by the viewport edge. No defect. |
| `/contact` (form + aside) | −15px | −15px | Hero CTA panel and the "Enquiry details" form card stack cleanly, single column, no overlap with the floating support/call widgets beyond expected z-order layering. No defect. |

**Note on the −15px figure**: this appears on every clean route at every width tested and is not overflow — it's `scrollbar-gutter: stable` (`globals.css:328`) reserving space for a vertical scrollbar track even when Playwright's headless viewport doesn't render one, making `clientWidth` measure 15px narrower than `scrollWidth` would otherwise match. This is the same benign artifact `docs/AUDIT.md` §9's sweep would have seen too; it does not indicate a defect and was correctly not flagged as one there.

**Corrected standing verdict**: `docs/AUDIT.md` §9 ("zero genuine horizontal-overflow bugs found") and this document's Part 2 entry for `/insights, /insights/[slug]` are both **superseded** by the finding above. The correct statement is: *zero template-level overflow bugs across all sampled routes, but at least one content-level overflow bug affecting 3 of 15 insight articles specifically, caused by an unconstrained markdown table.* No other route checked in Part 3 shows any discrepancy between the original code-read verdict and the rendered result — the six requested routes all confirm clean.

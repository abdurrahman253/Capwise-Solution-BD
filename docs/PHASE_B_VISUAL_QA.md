# Phase B — Visual QA (360px / 430px)

Per the client's Phase B brief: chunked, full-page screenshots captured at 360px for every route (production build, real browser, no DevTools emulation), reviewed section-by-section against the question "would a client paying for a professional advisory site be happy with how this looks on a phone?" 430px was used as a confirmation pass rather than a fully separate review — both widths sit below the `sm:` (640px) breakpoint and the site's fluid clamp()-based tokens rarely produce a different verdict between them; any place they *do* diverge is called out explicitly below. Two items were also checked at 768px/1440px where the underlying code made clear the issue (if real) would only manifest above 430px.

One fix was applied during this pass, not held for approval, because the client named it directly and separately from the Phase B brief itself (see below).

---

## Applied during this pass (client's direct request, not a Phase B finding)

**Homepage — "Who we work with" section (`FirmIntro.jsx`)** — client flagged this by name as looking unprofessional on both mobile and large devices. Diagnosis: the left column had only an eyebrow and heading, no supporting copy or CTA, leaving a large unbalanced empty gap under the heading at desktop widths (next to a taller 4-card grid) and an abrupt jump straight into the cards on mobile. Fixed by adding the eyebrow rule marker, a supporting paragraph, and a "Get in touch" CTA — matching the established pattern already used by the sibling `WhyCapwise`/`LocationSection` sections. Verified visually at 375px and 1440px (screenshots taken, not attached here). **Committed** as `1d36bbf polish(home): balance the "Who we work with" section on all widths`.

---

## Verdict table

| Route | Section | Verdict | Note |
|---|---|---|---|
| `/` | Hero (Swiper) | OK | Clean, legible over image, CTA pair reads well. |
| `/` | Trust strip (3 stat cards) | OK | Even card heights, good spacing. |
| `/` | Who we work with | **Fixed this pass** | See above. |
| `/` | Services (7-card grid) | OK | 2-col mobile grid — confirmed no orphan (last card spans full width by design). |
| `/` | Why Capwise (4 principles + workflow strip) | OK | Best-composed section on the page; rule marker + paragraph + CTA pattern this whole report leans on. |
| `/` | Pick Your Industry (6 cards) | OK | Even 2-col grid, no orphan (6 is even). |
| `/` | Latest Insights | needs work (minor) | See finding 3 below — latent, not glaringly visible today. |
| `/` | Consultation CTA + form | OK | Clean two-step form, good spacing. |
| `/about` | Hero, Mission/Vision, Principles, Team roles, CTA | OK | Every sub-section clean; well-composed throughout. |
| `/services` | Hero, 7-service grid, stage-based grouping, CTA | OK | Clean; last card of the 7-grid already handled correctly (confirmed earlier audit). |
| `/services/[slug]` (shared template, all 7 pages) | Hero, checklist, "what to expect", process, FAQ, related insight, CTA | OK | Sampled 4 of 8 chunks — consistent, no defects found. |
| `/industries` | Hero + sector pill nav, operating-lens cards | OK | Horizontal pill row is intentional snap-scroll, not a bug. |
| `/industries/[slug]` (shared template) | Hero, workstream checklist, related-service pills, CTA | OK | Clean. |
| `/business-in-bangladesh` | Hero eyebrow | **needs work** | See finding 1 below — real overlap with the floating call widget. |
| `/business-in-bangladesh` | Workstream cards, CTA, footer | OK | Clean otherwise. |
| `/business-in-bangladesh/[slug]` (shared template) | Hero, structure cards, related services, footer | OK | Verified against the correct slug (`legal-structures`) after an initial sampling miss. |
| `/team` | Hero, featured cards, supporting-member grid, "wider team" block, CTA | OK | One content placeholder ("Details to be confirmed") on a supporting card — a content gap, not a layout defect, out of scope for this pass. |
| `/contact` | Hero, form, location/map section | OK | Confirms the earlier address fix renders correctly. |
| `/faq` | Hero, category grouping, accordion | OK | Clean, well-organized by decision stage. |
| `/careers` | Hero, empty-state openings panel, "how we work" | OK | Empty state handled gracefully, not a bug. |
| `/case-studies` | Hero, evidence-intake empty state | OK | Same graceful empty-state pattern. |
| `/testimonials` | Hero | **needs work** | See finding 2 below — real, visible excess empty space. |
| `/testimonials` | Standards grid | OK | Clean. |
| `/insights` | Hero, filter chips, search, card grid | OK | Chips wrap cleanly at 360px; cards consistent. |
| `/insights/[slug]` (shared template, checked against 2 table-containing and 2 clean articles) | Hero, article body incl. markdown table, CTA, related insights | OK | The previously-known table-overflow bug (`MOBILE_AUDIT.md` addendum) stays fixed — no horizontal scroll on any sampled article. |
| `/resources` | Hero, publication-principles grid (4 items) | OK | Not the flagged grid — see finding 4. |
| `/resources/guides` | Hero, guide cards (currently 3, `xl:grid-cols-3`) | OK — issue resolved | See finding 4: the named "7-in-2-col orphan" no longer exists in the current codebase. |
| `/resources/regulatory-updates` | Hero, monitoring-area cards | OK | Clean. |
| `/thank-you` | Confirmation panel | OK | Renders correctly on the token-based spacing applied in Phase A. |
| `/privacy-policy` (shared `LegalDocumentPage.jsx`, also covers `/terms-of-use`, `/professional-disclaimer`) | Hero, numbered prose sections | OK | Clean, readable prose layout. |

---

## Findings in detail

### 1. `/business-in-bangladesh` hero eyebrow collides with the floating call widget (needs work)

At 360–430px, the eyebrow label "DOING BUSINESS IN BANGLADESH" is long enough to run under the fixed call-widget circle (`FloatingContact.jsx`), visibly clipping to "…BANGLADESI" behind it. This is page-specific — every other hero eyebrow sampled (`ABOUT CAPWISE`, `ADVISORY SERVICES`, `INDUSTRIES WE SERVE`, `CHOOSE THE STRUCTURE`, etc.) is short enough to clear the widget; this is the one case where the label text is long enough to reach it. Likely fix: right-padding or `max-w` on the eyebrow row scoped to this page, or a small sitewide safety margin on hero eyebrows below `sm:` — a design call, not made here.

### 2. `/testimonials` hero has excessive empty vertical space on mobile (needs work)

`src/app/testimonials/page.jsx:26` — the hero's outer grid carries `min-h-[70vh]` unconditionally, but `items-end` (which anchors content to the bottom of that tall box) is scoped `lg:items-end`, only active at 1024px+. Below `lg:`, the grid has no alignment override, so the heading and supporting paragraph render with a large gap between them inside the still-70vh-tall box instead of sitting together. Root cause confirmed by reading the source, not guessed. Likely fix: scope `min-h-[70vh]` to `lg:` as well (`lg:min-h-[70vh]`), matching `lg:items-end`'s own scoping — this would let the hero size to its content below `lg:`, matching how every other hero section behaves.

### 3. Homepage "Latest Insights" secondary cards carry a latent forced-height risk (needs work, minor)

`src/components/home/InsightsPreview.jsx:64` — the three secondary-card links use `sm:min-h-[12rem] sm:flex-col` (a forced 192px minimum in a vertical layout) specifically between 640px and 1023px (`sm:` but not yet `lg:`, where it switches to `lg:min-h-0 lg:flex-row` and stops forcing a height). Checked visually at 768px: the cards do not show a glaring empty void today — natural title-wrapping (2 vs 3 lines) accounts for the height variance instead — but the underlying mechanism is a magic-number min-height, not content-driven, so it's a standing risk if copy gets shorter rather than a currently-visible defect. Lower priority than findings 1–2.

### 4. `/resources` 7-item orphan grid — confirmed resolved, not reproducible

`docs/AUDIT.md` and this task's brief both named a "7 guides in a 2-col grid" orphan-card risk at tablet widths. Checked the current source directly: `src/data/resources.js`'s `guideResources` array now holds **3** items (not 7), and the grid at `src/app/resources/guides/page.jsx:66` is `xl:grid-cols-3` (not the `sm:grid-cols-2` the older audit cited). Three items in a 3-column grid is one clean row at every width — no orphan is possible. Verified visually at 768px and 1440px. This appears to have been resolved by an unrelated content/data change since the original audit; no code change was needed or made here.

---

## What this pass does not include

Per the brief's own scope, screenshots were captured but are working files in the local scratchpad, not committed to the repo — cite by route/section above rather than by filename. Desktop (1440px) was spot-checked only where a finding's root cause pointed there (findings 2 and 4); a full desktop pass was not requested for Phase B. `npm run lint` and `npm run build` both passed clean on the one change actually made this pass (the FirmIntro fix); no other code was touched.

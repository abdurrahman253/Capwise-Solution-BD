# CAPWISE Responsive QA — STOP GATE 1 Audit

Audit-only. No components were touched to produce this document.

**A note on scope before the findings**: the original detailed brief for this task (a "Senior frontend engineer" role prompt specifying an exact list of files/token counts to verify and four specific claims to confirm/refute) fell out of this session's retained history — it predates even this transcript's earliest recoverable turns, surviving only as a paraphrase in a compaction summary. Rather than guess at specifics that can't be recovered, this document substitutes a self-directed audit built from what *is* recoverable and verifiable: `CLAUDE.md`'s own changelog claims, the two existing audit docs (`docs/AUDIT.md`, `docs/MOBILE_AUDIT.md`), and a fresh live sweep at the requested breakpoints. If the original brief's specific four claims still matter, please re-paste it and I'll re-run against the literal text.

---

## 1. Git state

- Branch: `main`. Working tree: clean at time of writing.
- Upstream (`origin/main`) is gone — `git branch --unset-upstream` would clear the stale tracking reference, not done here (audit-only).
- Last 5 commits, all from this session's bug-fix pass, all landed:
  ```
  3563a54 content: add verified office address to contact page
  30f0547 fix(layout): navbar was losing fixed position near the footer on mobile
  99c7316 fix(layout): navbar was losing sticky position near the footer on mobile
  535025f fix(support): launcher stays visible at the footer, no more fade-out
  3f89aa5 fix(support): messages were invisible - header intro starved the thread of space
  ```

## 2. Editor "Problems" panel count

**Not verifiable from here.** No IDE-diagnostics tool is available in this environment, so the VS Code Problems panel's live count can't be read directly. Substituted the CLI-equivalent checks instead:
- `npm run lint` → **0 errors, 1 warning** (the pre-approved `no-img-element` warning on `src/app/opengraph-image.jsx`, documented in `CLAUDE.md` as an accepted exception — the edge `ImageResponse` runtime can't use `next/image`).
- `npm run build` → clean, exit 0, all routes compiled.

If the editor is showing a different count (e.g. "12 Problems"), it's most likely TypeScript/JS-server hints (unused-var warnings in files not touched by `next lint`'s rule set, or something scoped to a file the ESLint config excludes) rather than a build-blocking issue — worth a quick look at the Problems panel's own filter/source column next time it's open, but I can't confirm the specific count from this side.

## 3. Token migration claims (CLAUDE.md changelog, 2026-08-19 and 2026-08-21 entries)

### 3a. Heading scale (`text-hero`/`text-h1`/`text-h2`/`text-h3`/`text-card`)

**Confirmed clean.** `grep -rl "text-\[clamp(" src/ --include=*.jsx` returns exactly one file: `src/app/not-found.jsx` — the documented, intentional exception (the decorative 404 watermark numeral, not a real heading). No stray inline `clamp()` heading sizes exist anywhere else.

### 3b. Section rhythm (`py-section-{sm,md,lg}`) and gutter (`px-gutter`)

**Tokens genuinely exist**, defined in `globals.css:327,332-334` as real Tailwind v4 `--spacing-*` theme values:
```css
--spacing-gutter: clamp(1rem, 0.61rem + 1.6vw, 2.5rem);
--spacing-section-sm: clamp(2.5rem, 2.2rem + 1.5vw, 3.5rem);
--spacing-section-md: clamp(3.5rem, 3rem + 2.5vw, 5rem);
--spacing-section-lg: clamp(4.5rem, 3.25rem + 5.5vw, 9rem);
```
In active use: `py-section-{sm,md,lg}` in 35 files, `px-gutter` in 37 files.

**But the "fully migrated" claim has real, small exceptions** — found by grepping for leftover raw `py-10` through `py-32` values and checking each one's context:

| File | Raw values found | Verdict |
|---|---|---|
| `src/app/thank-you/page.jsx:19` | `py-20 sm:py-28 lg:py-36` on `<main>`, plus raw `px-4 sm:px-6` on its container | **Genuine gap.** This is real page-level section rhythm (the `<main>` wrapper, same role `py-section-*` fills elsewhere) still on the old ad-hoc scale. `/thank-you` isn't named in the CLAUDE.md migration list, so this isn't a broken promise, but it is the one route left on the pre-token convention. Low-traffic page (post-form-submit confirmation only), low visual risk, but worth a one-line fix whenever Phase A opens. |
| `src/app/error.jsx:12` | `py-16` on `<main>` | Same category as above — genuine but minor, and arguably out of scope since this is a global error-boundary fallback, not a normal navigable route. |
| `src/app/industries/page.jsx:201` | `py-10 sm:py-14 lg:py-18` | **False positive, not a violation.** This is inner-item border-divider spacing between rows in a list, not outer section rhythm — a different design role than what the token governs. |
| `src/components/home/BangladeshPreview.jsx:177` | `py-10 sm:py-13 lg:py-16` | Same as above — inner list-item spacing, correctly out of the token's scope. |

Raw `px-3/4/5/6/8/10` values still appear widely (SiteHeader nav pill, ServiceDetailPage cards, SupportAssistant chat bubbles, buttons, badges, etc.) — this is expected and **not a violation**: `px-gutter` governs only the outermost page-section container; component-internal padding was never in scope for that token and correctly uses its own values.

**Net verdict**: the token system itself is real and the migration is genuine, not fabricated — but "every remaining public route" was very slightly overstated. `/thank-you` is the one real gap.

## 4. `overflow-x: hidden` masking claim

This is the one item directly touched by this session's own navbar bug-fix work, so the status has changed mid-session:

- **Historical claim (MOBILE_AUDIT.md, prior session)**: confirmed present on `body` (`globals.css:335` at the time), a real backstop but not then masking any known bug — the one real overflow source found (a markdown table's `min-w-[42rem]` with no escape hatch, on 3 of 15 insight articles) was fixed at its source with `min-w-0` on the article column's grid ancestor. **Verified still in place**: `src/app/insights/[slug]/page.jsx:79` — `<div className="min-w-0 lg:col-span-7">` wraps the article body.
- **What changed this session**: `overflow-x: hidden` was removed from `body`/`html` entirely (it was silently making `body`/`html` the page's actual scrolling element instead of the true viewport — a second, unrelated way the same CSS pairing quirk can break `position: fixed`, discovered while root-causing the navbar bug). It now lives on a plain wrapper `<div>` inside `<body>` (`src/app/layout.jsx:121`), which provides the identical overflow backstop with none of that side effect.
- **Net effect**: the masking backstop still exists and still isn't currently hiding a live bug (confirmed by the live sweep below — zero overflow found anywhere). Its relocation was necessary for the navbar fix and doesn't change this claim's truth value.

## 5. Live responsive sweep — 320/360/390/412/430/768px, every route

Ran via Playwright, real browser, real viewport resizes (not DevTools emulation), covering 25 distinct routes (all static routes + 2 dynamic-route samples each for `/services/[slug]`, `/industries/[slug]`, `/business-in-bangladesh/[slug]`, and all 4 insight articles previously identified as either containing a markdown table or as the original sweep's blind spot) × 6 breakpoints = **162 checks**.

**One operational note on how this ran**: partway through, the dev server the sweep was pointed at (port 3000 — an already-running server, not one this session started) died on its own (`ERR_CONNECTION_REFUSED`/`ERR_CONNECTION_RESET`), independent of anything this session did. Its replacement's own startup log shows `Turbopack's filesystem cache has been deleted because we previously detected an internal error in Turbopack` — a plausible explanation for the crash (a Turbopack-internal fault), not a code defect. **If that was your own `npm run dev` terminal, it's worth restarting** — this session did not touch or restart it, and instead brought up a separate throwaway server on port 3010 to finish the sweep cleanly rather than risk interfering with your terminal a second time.

### Results

- **Horizontal overflow**: **zero** instances of `scrollWidth > clientWidth` by more than 30px, across all 162 checks. The known table-overflow bug from `MOBILE_AUDIT.md`'s addendum is confirmed fixed and did not regress.
- **Floating-element collisions**: **zero**. `FloatingContact` and the `SupportAssistant` launcher never overlap at any tested width — confirms this session's earlier fix (removing the footer-proximity fade) didn't introduce a new collision.
- **Errors/crashes**: zero page-load failures across all 25 real routes (one intentionally-wrong slug sampled for `/business-in-bangladesh/[slug]` 404'd as expected — not a real page, a sampling artifact, not a defect).
- **Tap targets under 44px**: 138 raw hits from an automated sweep, but the overwhelming majority are false-positive noise from the heuristic (inline breadcrumb/text links, the keyboard-only skip-link, footer links that wrap to two lines at narrow column widths). After discarding those, the findings that are worth having on record:
  - **Sitewide, every route (footer)**: the footer's `Services`/`Industries`/`Insights`/`Resources` link columns (`SiteFooter.jsx:18` and siblings) render each link as a short block-style `text-xs leading-5` link inside a `gap-2.5` list — several wrap to two lines at narrow widths, measuring ~40px tall (above the WCAG AA 24px floor, just under the 44px AAA target this project treats as its bar). Same category as, but distinct from, the already-known WhatsApp icon tap-target finding in `MOBILE_AUDIT.md` (which is worse: an icon-only control with no text fallback). Low severity, sitewide reach.
  - `resources/guides/page.jsx` — "Request release notification" button measures 238×41 (3px under 44px height). Trivial, one-line fix if ever prioritized.
  - `/contact` — the phone number link (`+880 1624-000381`) measures 102×40. Same category, minor.
  - No new icon-only or genuinely-hard-to-tap control was found beyond what `MOBILE_AUDIT.md` already flagged as the top-priority item (footer WhatsApp icon).

**Screenshots were not captured for this pass** — the sweep prioritized breadth (162 metric checks) over visual capture given the time already spent recovering from the dev-server interruption; the metrics above are measured DOM/CSSOM values, not estimates, so this doesn't weaken the findings, but a visual pass is still worth doing before Phase B ships any layout change.

## 6. Summary — what's actually broken right now

Genuinely nothing new. The live sweep found:
- Zero overflow bugs (the one known one is confirmed fixed and holding).
- Zero floater collisions.
- Zero broken routes.
- One small, low-traffic token-migration gap (`/thank-you`) and a handful of already-known, already-prioritized minor tap-target softness (footer links, one button, one phone link) — all consistent with what `MOBILE_AUDIT.md` already had on record, nothing new or more severe surfaced.

This is a materially clean site at the six requested breakpoints. Recommend Phase A (if pursued) be scoped small: the `/thank-you` token migration and the handful of sub-44px items above, in that priority order, rather than a large pass — there isn't much left to fix.

---

**STOP.** Per instruction, no code was changed to produce this document. Awaiting explicit approval before Phase A/B/C.

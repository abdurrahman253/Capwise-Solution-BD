@AGENTS.md

# CAPWISE — Design Contract

This file is the permanent design contract for every future task on this project. Read it before making any UI/UX change. It was generated from the actual codebase, not invented — every value below is traceable to a real file.

## PROJECT

CAPWISE Solution BD — a Bangladesh-based Business Advisory, Accounting, Finance, Tax & Compliance, and HR/Payroll consulting firm. Audience: Bangladeshi corporate clients (SMEs, startups, NGOs, RMG/manufacturing, importers/exporters, foreign market entrants). Stack: Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + Framer Motion (`motion/react`) + Swiper + Lenis smooth scroll.

## DESIGN GOAL

Trust, expertise, clarity, corporate professionalism, Bangladesh market understanding, premium financial advisory. It must read as manually refined by a human designer — NOT as an accepted first-pass AI website.

## REQUIRED REFERENCES

Two design skills are installed globally and must be consulted for every UI task:

- **UI/UX Pro Max** — `C:\Users\USER\.claude\skills\ui-ux-pro-max` (`SKILL.md` + `scripts/search.py`, a searchable dataset of styles, product palettes, typography pairings, UX guidelines, GSAP presets, and stack-specific implementation rules)
- **Entropix Frontend Design Skill** — no skill installed under this exact name. The closest and only real match is **`frontend-design`** at `C:\Users\USER\.claude\skills\frontend-design` (a `SKILL.md` covering distinctive visual design judgment: palette/type/layout tokens, avoiding templated AI defaults, restraint/self-critique). Flagging this honestly per instruction rather than silently treating the two names as the same skill — if "Entropix" refers to something else, it is not present on this machine and needs to be installed or clarified.

## FROZEN TOKENS

All values below are extracted from `src/app/globals.css` and de-facto usage across `src/`. Nothing here is invented.

### Brand colors (locked — only touch for genuine contrast/readability fixes, and log the change below)

| Token | Light | Dark |
|---|---|---|
| `--brand-navy` | `#1b1464` | `#1b1464` |
| `--brand-blue` | `#1b64aa` | `#69aee8` |
| `--brand-gold` | `#d4af37` | `#d4af37` |
| `--brand-gold-soft` | `#e5c95f` | `#e5c95f` |
| `--background` | `#f8fafc` | `#090d23` |
| `--foreground` | `#0f172a` | `#eaf2f7` |
| `--surface` | `#ffffff` | `#12183a` |
| `--surface-muted` | `#f1f4f9` | `#19224b` |
| `--accent` / `--gold` | `#d4af37` | `#d4af37` / `#d6b15a` |
| `--accent-strong` | `#1b64aa` | `#69aee8` |
| `--action` | `#1b1464` | `#d4af37` |
| `--action-hover` | `#1b64aa` | `#e5c95f` |
| `--action-foreground` | `#ffffff` | `#17145f` |
| `--muted` | `#667085` | `#9fb1bf` |
| `--border` | `#dbe1eb` | `#2b3568` |
| `--danger` | `#dc2626` | `#f87171` |
| `--focus` | `#1b64aa` | `#69aee8` |

Full theme includes further scoped tokens per section (`--hero-*`, `--industries-*`, `--assistant-*`, `--resources-*`, `--gateway-*`, `--proof-*`) — see `src/app/globals.css:1-247` for the complete set. Light/dark are switched via `[data-theme="light"|"dark"]` on the root, driven by `next-themes`.

### Type scale

Two typefaces via `next/font/google`: `Inter` (`--font-inter`, body/`font-sans`) and `Manrope` (`--font-manrope`, headings/`font-display`). All `h1`–`h6` get `font-family: Manrope`, `letter-spacing: -0.025em`, `text-wrap: balance` from the global reset (`globals.css:319-328`).

Major headings use a **5-tier fluid type scale, implemented as real Tailwind utilities** (not hand-tuned per component). Defined once in `src/app/globals.css` inside `@theme inline`, each token bundles font-size + line-height + letter-spacing so a single class does the whole job:

```css
--text-hero: clamp(2.2rem, 4vw, 3.6rem);   --text-hero--line-height: 1.1;  --text-hero--letter-spacing: -0.02em;
--text-h1:   clamp(2rem, 3.5vw, 3.2rem);   --text-h1--line-height: 1.1;    --text-h1--letter-spacing: -0.02em;
--text-h2:   clamp(1.75rem, 2.6vw, 2.5rem); --text-h2--line-height: 1.1;   --text-h2--letter-spacing: -0.02em;
--text-h3:   clamp(1.35rem, 1.8vw, 1.8rem); --text-h3--line-height: 1.1;   --text-h3--letter-spacing: -0.02em;
--text-card: clamp(1.2rem, 1.5vw, 1.55rem); --text-card--line-height: 1.1; --text-card--letter-spacing: -0.02em;
```

| Utility | Used for |
|---|---|
| `text-hero` | `HomeHero.jsx` swiper slides only |
| `text-h1` | Every other page's top hero heading |
| `text-h2` | Homepage section intros, inner-page sub-sections |
| `text-h3` | Service sub-titles, compact CTA panels |
| `text-card` | Team/case-study/insight/resource card titles |

**Usage**: `className="font-display text-h1 font-semibold text-foreground"` — never write `text-[clamp(...)]` inline again. If a heading needs a new size, add a tier here first; do not invent a one-off arbitrary value in a component. Applied globally in the 2026-08-19 pass below (96 instances across 37 files, zero stray `clamp()` left outside the intentionally-excluded decorative 404 watermark in `not-found.jsx`).

Small eyebrow/kicker labels (category tags, section labels) are a separate, deliberately tiny uppercase pattern — typically `text-[0.6rem]`–`text-[0.68rem]`, `font-extrabold`, `uppercase`, wide positive tracking (`tracking-[0.14em]`–`tracking-[0.22em]`). Do not apply the `-0.02em` heading tracking to these — they are intentionally the opposite (wide, not tight).

Body text: `text-sm`/`text-base` with `leading-7`/`leading-8`/`leading-9`, not the `clamp()` system.

### Spacing scale

Section vertical rhythm: `py-16 sm:py-24 lg:py-28|32` (homepage sections mostly `py-18 sm:py-24 lg:py-28`). Container horizontal padding: `px-5 sm:px-6 lg:px-8 2xl:px-10` (most common) or `px-4 sm:px-6 lg:px-10` (inner pages using the `capwise-*` gateway/industries pattern). No formal 4/8pt token scale is declared in Tailwind config — spacing is arbitrary-value Tailwind classes applied consistently by convention, not a `@theme` token set.

### Border-radius scale (de facto, from usage frequency)

- Pills / buttons / avatars: `rounded-full` (dominant — 148 uses)
- Small badges/inputs: `rounded-xl` / `rounded-2xl`
- Cards: `rounded-[1.2rem]` → `rounded-[1.8rem]`, most commonly `rounded-[1.35rem]`, `rounded-[1.5rem]`, `rounded-[1.6rem]`
- No custom `--radius-*` tokens declared — all via Tailwind arbitrary values

### Shadow scale (de facto)

Soft, colored, brand-tinted shadows — never flat black. Two families:
- Navy-tinted (`rgba(27,20,100,…)`) for most cards/panels/CTAs, e.g. `shadow-[0_30px_90px_rgba(27,20,100,0.2)]`
- Gold-tinted (`rgba(212,175,55,…)`) for gold CTA buttons, e.g. `shadow-[0_10px_28px_rgba(212,175,55,.2)]`

Blur radius scales with prominence: `10px`–`18px` for small buttons, `24px`–`40px` for cards, up to `90px`–`120px` for hero-level panels. `--card-shadow` token exists (`0 24px 70px rgba(27,20,100,.12)` light / `0 30px 90px rgba(0,0,0,.32)` dark) as the general default.

### Breakpoints

Tailwind v4 defaults (no override found — no `tailwind.config.*` file exists; this is a CSS-first v4 setup and no `--breakpoint-*` token is redefined in `globals.css`): `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

### Container max-widths

- `max-w-[90rem]` (1440px) — dominant, used on inner pages (`capwise-gateway`/`capwise-industries`-style sections)
- `max-w-[94rem]` (1504px) — homepage sections, header, footer
- Narrower one-offs exist for prose/article columns (`max-w-[48rem]`, `max-w-[49rem]`, `max-w-[42rem]`)

## HARD RULES FOR ALL FUTURE WORK

1. Improve and polish the existing site. Never randomly redesign or rebuild.
2. Every change must have a stated UI/UX purpose. No effects added because they look fancy.
3. Do not break working links, buttons, routes, forms, navigation, service pages, CTAs, theme switching, responsive navigation, or business logic.
4. Do not remove sections or change copy unless explicitly instructed.
5. All images go through Next.js `next/image` — never plain `<img>` (the one structural exception is `src/app/opengraph-image.jsx`, which runs in the edge `ImageResponse` runtime and cannot use `next/image` — this is expected and correct, not a violation).
6. Avoid AI/template tells: oversized typography, gradients everywhere, excessive glass cards, glow effects, repetitive sections, over-rounded containers, random decorative shapes, excessive animation, inconsistent spacing.
7. Motion supports hierarchy. It is never the main attraction.
8. Target viewports for QA: 320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440+. Prioritise 360–430px.
9. Never introduce horizontal overflow.
10. Run `npm run build` and lint at the end of every task.

## CHANGE LOG

- 2026-08-19 — Created this file. No feature code touched. Extracted all tokens above from the live codebase (`globals.css`, component usage frequency via grep). Confirmed no `tailwind.config.*` exists (Tailwind v4 CSS-first). Confirmed `ui-ux-pro-max` skill path; confirmed no skill literally named "Entropix Frontend Design Skill" exists — `frontend-design` is the closest real match and is what should be consulted under that name going forward, pending clarification.
- 2026-08-19 — Converted the 5-tier heading scale from inline `text-[clamp(...)]` (hand-copied into ~96 individual `className` strings) into real Tailwind theme tokens (`--text-hero/h1/h2/h3/card` in `@theme inline`, `globals.css`), each bundling font-size + line-height (1.1) + letter-spacing (-0.02em). Mechanically replaced all 96 instances across 37 files (94 direct `text-[clamp(...)] font-semibold leading-[1.1] tracking-[-0.02em]` → `text-{tier} font-semibold`, plus 2 ternary-embedded cases in `team/page.jsx` and `InsightsPreview.jsx` where only the bracket token was swapped). Verified the compiled CSS actually contains the expected `clamp()` rules (not just that the build didn't error). Verified visually at 320/360/390/430/768/1024/1440px on the homepage hero and the `/about` page (all 5 tiers appear together there). Lint and build clean. Values unchanged from the prior pass — this was a delivery-mechanism change (inline arbitrary values → reusable tokens), not a resize.

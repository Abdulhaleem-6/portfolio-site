# abdulhaleem.dev

This portfolio presents four production case studies. The original blueprint lives in [`plan/blueprint.html`](plan/blueprint.html).

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static prerender of all 11 routes
pnpm typecheck
```

## Technical choices

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js 15, App Router | Next.js prerenders every route to static HTML, so the deployed site needs no application runtime. |
| Content | Typed TypeScript modules under `src/content` | The types require a source for every metric and a rejected option for every decision. |
| Styling | Tailwind v4 + CSS custom properties | Tailwind v4 reads its configuration from CSS. Theme tokens in `globals.css` drive both color schemes. |
| Evidence | Typed before-and-after callouts | Each case turns implementation detail into a problem, change, and practical result. |
| Diagrams | Plain-English inline SVG | Inline SVG keeps each flow readable in both themes without exposing internal identifiers. |
| Route motion | Framer Motion | A persistent layout wrapper crossfades route content while the site chrome stays fixed. |

### Why the content uses TypeScript instead of MDX

The blueprint recommended MDX, but typed content enforces an important rule: every number needs a source. `Metric.basis` makes that source mandatory in `src/content/types.ts`. `Decision.over` also requires each case study to name the option I rejected. TypeScript catches either omission during the build.

The case pages also combine simplified SVG flows, before-and-after evidence, and decision tables. TSX handles those structures directly.

## Design system

The site uses the Engineered Precision system. [DESIGN.md](DESIGN.md) explains the decisions, and `src/app/globals.css` contains the tokens.

| Decision | Value |
| --- | --- |
| Strategy | Layered neutral surfaces with warm, blue, teal, and amber semantic accents |
| Ground | `oklch(14% 0.009 265)` dark / `oklch(96.4% 0.005 250)` light |
| Signal | Vermillion for actions and primary emphasis |
| Display | Archivo 800/900, tracking to `-0.055em`, hero up to 124px at `leading-[0.86]` |
| Mono | Geist Mono for labels, figures, paths, and metadata |
| Radius | The base reset sets every radius to `0` |
| Structure | Full-bleed 1px rules and `.frame` vertical hairlines, with no card shadows |
| Texture | Fixed `feTurbulence` grain at roughly 3.5% in light mode |
| Motion | A staggered page load, 220ms route transitions, and 120ms hover feedback |
| Hover | Rows move from `--surface` to a tinted `--surface-2` elevation |

The layout avoids generic cards and pill tags. It uses `.spec-row` for key-value data, square semantic badges for technology metadata, and large index numerals for case-study navigation.

## Project structure

```text
src/
  app/
    page.tsx                 home: hero, 4 case rows, shelf, writing, about
    about/page.tsx
    work/[slug]/page.tsx     one layout, four case studies
    globals.css              palette tokens, long-form styling, and motion
  components/
    BusinessCallout.tsx      before-and-after case-study evidence
    Diagram.tsx              4 simplified system-flow SVGs
    RouteTransition.tsx      global route enter and exit motion
    StampedeDemo.tsx         the one interactive island
    RichText.tsx             inline bold, italic, and code formatting
  content/
    types.ts                 schema for case-study evidence
    site.ts                  hero, about, shelf, and writing copy
    cases/*.ts               the four case studies
```

## Accuracy checks

I calculated every figure from the source repositories rather than copying numbers from my CV. That review corrected three CV figures upward: 57 provider adapters instead of 49, 44 endpoints instead of 43, and 12 notification event types instead of 11.

The same review corrected one claim downward. SmartFetch calls KMS `Encrypt` and `Decrypt` directly instead of using envelope encryption. The case study states that limitation in its retrospective.

I also built and later removed the dedicated NAT gateway and Elastic IP described in the SmartFetch case study. The page explains both decisions.

## Before deploying

- Confirm with Codygo which SmartFetch and Worknet details can be public. The case studies avoid customer names, proprietary source, and internal identifiers.
- Update `site.url` in `src/content/site.ts` if the domain changes. The sitemap, robots file, and Open Graph metadata read from that value.

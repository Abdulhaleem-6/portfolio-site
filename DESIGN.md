# DESIGN.md — "Engineered Precision"

Tokens live in `src/app/globals.css`. This file is the reasoning behind them.

## Color and elevation

**Strategy: layered surfaces with three semantic accents.** References: Linear's
surface stack, Raycast's calibrated accents, over a Klim-style type specimen.
Declared in OKLCH.

### Elevation

The page is not one flat colour. Four levels, all used at rest, measured in dark:

| Level | Dark | Role |
|---|---|---|
| `--inset` | `rgb(4,5,7)` | Recessed well: code and diagram interiors |
| `--bg` | `rgb(7,9,13)` | Canvas: page ground, section heads, prose |
| `--surface` | `rgb(14,17,22)` | Subdued: grid cells, panels, work rows at rest |
| `--surface-2` | `rgb(22,25,32)` | Elevated: hover and active states |

Light inverts the relationship rather than the values: the canvas is grey
(`oklch(96.4%)`) and panels are paper (`oklch(99.3%)`), so cells sit *above* the
ground the way paper sits on a desk.

Depth comes from those levels, a fixed atmospheric wash, a localised hero glow, and
a grain overlay. Never from drop shadows. The single shadow in the stylesheet is the
`inset` on embedded code panels.

### Grid lines

Section rules are drawn as **masked pseudo-elements**, not borders:

```css
.rule::after {
  background: var(--line);
  mask-image: linear-gradient(to right, transparent, #000 14%, #000 86%, transparent);
}
```

The line fades out toward the viewport edges instead of stopping dead against them,
which is what stopped the grid reading as a spreadsheet. Because the mask does the
fading, `--line` itself can be stronger than a raw border would dare to be.

The vertical rails stay real borders at `--line-soft`. A per-section mask would chop
them into fading segments at every section boundary, which reads as broken rather
than soft.

### Accents

Three, each used only for its meaning: `--signal` (vermillion: actions, eyebrows,
live figures, hover), `--tech` (azure: code, inline code, storage and transport in
diagrams), `--warn` (amber: constraints and retrospectives). Green-on-black was
rejected as the category reflex for developer tooling.

Accent integration is a fill, not a text colour. A hovered row takes a ~7% wash of
`--signal` mixed into the elevated surface and its border shifts to `signal/40`, so
the whole cell tints together.

### Text hierarchy

Strict three tiers: `--fg` primary, `--fg-2` secondary (descriptions, body),
`--fg-3` tertiary (metadata, labels, numerals).

### Contrast, measured

Every token rasterised to a canvas and checked against **both** the canvas and the
surface it can sit on, since cells are no longer transparent.

| | dark canvas / surface | light canvas / surface |
|---|---|---|
| `--fg` | 17.77 / 16.86 | 15.98 / 17.44 |
| `--fg-2` | 8.95 / 8.49 | 6.73 / 7.35 |
| `--fg-3` | 5.68 / 5.39 | 4.83 / 5.26 |
| `--signal` | 7.53 / 7.15 | 4.79 / 5.23 |
| `--tech` | 9.19 / 8.73 | 5.21 / 5.69 |
| `--warn` | 10.56 / 10.02 | 5.49 / 5.99 |

All clear WCAG AA. Darkening the light canvas cost `--fg-3` contrast and dropped it
to 4.36 against the canvas; it was corrected rather than shipped.

### Case-study evidence

Flat before-and-after rows replace source-code windows. Each row names the previous
problem, the new behavior, and why the change matters. A compact metric can anchor
the result without turning the component into a promotional statistic card.

System diagrams use the same square geometry and theme tokens, but their labels stay
at the product level. Internal functions, variables, and infrastructure names do not
appear in the visual flow.

## Typography

Voice words: machined, measured, unsentimental. Reflex picks (Inter, Space Grotesk, IBM Plex) were
rejected as training-data defaults; Plus Jakarta Sans, used in the previous revision, is on the
same list.

**Two families, both committed.**

- **Archivo** — Omnibus-Type's neo-grotesque, in the Akzidenz/Univers lineage that the Swiss
  manual reference demands. Used at 800 and 900 with tracking pulled to `-0.055em` at display
  sizes, and at 400/500 for body. A single family across display and body is deliberate: Swiss
  practice, and stronger than a timid display-plus-body pair.
- **Geist Mono** — every label, figure, path, tag, and caption. Metadata is never set in the
  grotesque; the split between the two families *is* the information hierarchy.

Scale is fluid `clamp()` at a 1.33 ratio. The hero runs to 124px with `leading-[0.86]`; metadata
sits at 11px. That 11× spread is the hierarchy, not weight alone.

## Layout

**A visible engineered grid.** Full-bleed 1px rules mark every section boundary edge-to-edge.
Inside them, `.frame` sets a max width with left and right hairlines, so the container reads as a
drawn structure rather than an invisible centering device.

Case studies are asymmetric: a 40% column carrying the index numeral and title, a 60% column
carrying the summary and data. Never a 2-up card grid.

No rounded corners anywhere (`--radius: 0`). No drop shadows. Structure comes from rules and
inversion only.

## Responsive rules

The drawn grid has to survive the collapse. Every asymmetric split carries its
divider on the axis that is currently doing the separating:

```
border-t border-hair  md:border-t-0 md:border-l
```

Below the breakpoint the columns stack and a horizontal rule separates them; above
it the rule becomes vertical and the top border is removed. A split that only ever
declared `md:border-l` loses all structure on a phone, which is the failure this
pattern exists to prevent. The same applies to the case-study prev/next pair, which
stacks at `sm` with a bottom rule on the first cell.

`body` sets `overflow-wrap: break-word` so a long unbreakable token (an email, a
URL) wraps instead of widening the document. Code keeps `white-space: pre` inside
its own `.scroll-x` container and is unaffected.

## Components

Cards were removed. The replacements:

- **`.spec-row`** — a hairline-separated key/value row. Carries metadata, decisions, outcomes.
- **`.stack-list`** — comma-separated monospace, replacing pill tags.
- **Business callout** — a flat before-and-after evidence row with an optional measured result.
- **Index numerals** — `01`–`04` at display scale in mono, acting as art direction.

## Motion

One orchestrated page load, then nothing ambient. Lines rise 10px and fade in on
`--ease-snap` (`cubic-bezier(0.2, 0.85, 0.3, 1)`), 340ms each, 40ms apart: rapid and
mechanical, closer to a boot sequence than a reveal. No overshoot, no settle, no
bounce. No scroll-triggered animation at all, so content is readable at rest for
anyone landing mid-page.

Route changes use the same curve over 220ms. The outgoing page fades and moves 8px
up, then the incoming page fades in from 12px below. The header and theme control do
not move. Reduced-motion preferences disable both translation and transition time.

Hover is tactile and instant, 120ms on the same curve. A work row lifts to `--bg-1`,
its rule illuminates to `--hair-lit`, its index numeral snaps to `--signal`, and the
title shifts 2px. Only `background-color`, `border-color`, `color` and `transform`
animate; nothing here touches layout.

Border illumination is applied with a `hover:border-hair-lit` utility at the call
site rather than inside `.row-tap`: these elements already carry a `border-hair`
utility, and utilities outrank the components layer, so a components-layer
`border-color` would silently lose.

`prefers-reduced-motion: reduce` collapses all of it to the end state.

## Texture

A fixed SVG `feTurbulence` grain at 3.5% opacity over the whole viewport, `pointer-events: none`.
It exists to stop large black fields reading as dead screen.

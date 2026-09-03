# Lower-page atmosphere design

## Intent

Carry the existing Engineered Precision atmosphere through the homepage’s lower sections without changing copy, section structure, grid dimensions, or server rendering.

## Approved direction

Use CSS-only tinted elevation rather than pointer tracking. The lower rows retain their square grid construction and gain the same fast, restrained surface response already used by selected-work rows. This keeps the homepage a React Server Component and avoids a client-side pointer adapter.

## Visual treatment

- Anchor a pair of deeply diffused radial washes around the lower About section so they extend upward through “In progress” and downward toward the footer.
- Use teal and peach at very low alpha in light mode, then deep blue and warm orange in dark mode.
- Render technology metadata as square, 1px-bordered badges. Cloud and backend metadata use the warm signal hue, frontend metadata uses blue, data systems use teal, and unmatched metadata stays neutral.
- Render “In draft” with a quiet amber tint and amber text.
- Apply tinted surface elevation to every shelf and writing row without changing cursor behavior or implying new navigation.

## Accessibility and performance

The treatment adds no JavaScript, DOM measurement, or continuous animation. Existing `prefers-reduced-motion` handling continues to collapse transitions. Text colors use the design system’s contrast-checked semantic tokens; translucent fills and borders remain decorative.

## Verification

Run TypeScript checks and a production build, then inspect the affected source against the current Vercel Web Interface Guidelines. Confirm that no client directive, text change, rounded badge, or layout change entered the diff.

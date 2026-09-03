# Theme Toggle Motion Design

## Goal

Make the existing three-state theme control feel immediate and mechanical without changing its typographic role, square geometry, or theme behavior.

## Interaction

- Keep the `SYS`, `LGT`, and `DRK` labels and the current system, light, and dark cycle.
- On activation, fade the current label out first. Then fade the next label in while it moves upward from 4px.
- Complete the full out-in sequence in 200ms. Use the existing sharp easing curve and no bounce or overshoot.
- Keep the 62px header cell as the complete hit target.
- Apply the hover surface immediately. Use `active:scale-95` for direct press feedback.
- Disable the swap motion when the user requests reduced motion.

## Theme Surfaces

- Interpolate the page canvas and principal surface, text, and rule colors over 300ms when the theme changes.
- Scope those transitions so they do not override the existing 120ms row hover interactions.
- Do not animate layout properties.

## Architecture

- Keep `ThemeToggle` as the existing client component.
- Track the visible label separately from the selected theme while a swap runs.
- Use a short two-phase React state machine for leave and enter states.
- Clear pending timers on unmount and before a new activation.
- Keep the theme attribute and local-storage behavior unchanged.

## Verification

- Confirm all three states still cycle and expose the correct accessible label.
- Confirm rapid repeated activation cannot leave the displayed label out of sync.
- Confirm reduced motion removes the swap animation.
- Run type checking and a production build.

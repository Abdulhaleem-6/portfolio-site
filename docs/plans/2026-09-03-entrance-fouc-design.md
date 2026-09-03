# Entrance animation FOUC design

## Cause

The entrance sequence uses CSS animations. The `.rise` and `.wipe` classes start the animations but do not define their pre-animation visual state. The browser can briefly paint the underlying final styles before it applies the first keyframe.

The theme initializer already runs in the document head before the body, and the root element already uses `suppressHydrationWarning`. The theme path does not need another provider or client-side mount check.

## Fix

- Give `.rise` an explicit base state of `opacity: 0` and `translate3d(0, 10px, 0)`.
- Give `.wipe` an explicit base state of `scaleX(0)`.
- Keep the current keyframes, duration, stagger delays, and `--ease-snap` curve.
- Under `prefers-reduced-motion`, disable these entrance animations and reveal the content immediately.

This keeps the server-rendered markup and CSS in agreement before hydration and does not add JavaScript to the animation path.

## Verification

Build the site, inspect the generated CSS for the hidden base states and reduced-motion override, inspect the server-rendered HTML for the animation classes, and run the TypeScript check.

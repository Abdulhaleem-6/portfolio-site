# Theme Toggle Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 200ms text-only out-in theme-label swap, immediate button feedback, and 300ms page-theme interpolation without changing the existing three-state theme behavior.

**Architecture:** Keep theme persistence and DOM attribute updates inside the existing `ThemeToggle` client component. Add a small leave/enter state machine for the visible label, then animate registered inherited color tokens at the document root so theme changes interpolate without overriding component-level hover durations.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, CSS animations and registered custom properties.

---

### Task 1: Implement the text-label swap state machine

**Files:**
- Modify: `src/components/ThemeToggle.tsx`

- [x] **Step 1: Separate selected and visible theme state**

Add a `SwapPhase` type, a `visibleChoice` state, and a ref that stores the most recent requested choice. When local storage restores a saved theme, update both selected and visible state without animation.

- [x] **Step 2: Start a leave phase when the user changes themes**

Keep the current root-attribute and local-storage behavior. Update the selected theme immediately, point the target ref at it, and set the swap phase to `leave`.

- [x] **Step 3: Advance the sequence from animation events**

When the leave animation ends, replace the visible label with the latest requested choice and enter it. When the enter animation ends, return to idle unless another click changed the target during the sequence.

- [x] **Step 4: Apply the interaction classes**

Keep the 62px width and stretched 52px header cell. Add the dedicated `theme-toggle` class and Tailwind's `active:scale-95`. Keep the visible label `aria-hidden` because the button's full accessible label already announces current and next states.

### Task 2: Add mechanical motion and theme interpolation

**Files:**
- Modify: `src/app/globals.css`

- [x] **Step 1: Register inherited theme color tokens**

Register the canvas, surface, text, rule, accent, and atmospheric color custom properties with `@property`. Set `inherits: true` and valid light-theme initial values.

- [x] **Step 2: Transition registered tokens for 300ms**

Add the registered properties to the root transition with the existing `--ease-snap` curve. This lets every consumer receive interpolated colors while leaving `.row-tap` and `.row-tap-surface` at 120ms.

- [x] **Step 3: Add the 200ms out-in label animation**

Create 100ms leave and enter keyframes. Fade the old label out first. Fade the incoming label in from `translateY(4px)` during the second half. Animate only opacity and transform.

- [x] **Step 4: Add immediate hover and press behavior**

Give `.theme-toggle` no background-color transition so its tint appears on hover immediately. Keep border and text feedback sharp. Let `active:scale-95` apply without a transform transition delay.

- [x] **Step 5: Preserve reduced-motion behavior**

Rely on the existing reduced-motion rule to collapse animation and transition durations while preserving the end state and animation events.

### Task 3: Verify behavior and build integrity

**Files:**
- Review: `src/components/ThemeToggle.tsx`
- Review: `src/app/globals.css`

- [x] **Step 1: Inspect the final diff**

Confirm that labels, the three-state cycle, the 62px width, storage keys, and theme attributes remain unchanged. Confirm that no SVG or Vue dependency appears.

- [x] **Step 2: Run type checking**

Run `pnpm typecheck`. Expect exit code 0.

- [x] **Step 3: Run a production build**

Run `pnpm build` in an isolated copy so an active development server cannot conflict with `.next`. Expect exit code 0 and 11 generated routes.

- [x] **Step 4: Check CSS duration isolation**

Confirm the theme token transition uses 300ms, the label sequence totals 200ms, and `.row-tap` plus `.row-tap-surface` still use 120ms.

This workspace has no Git metadata, so the plan omits commit commands.

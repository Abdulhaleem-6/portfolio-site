# Entrance Animation FOUC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent animated text and rules from appearing in their final state before the entrance animation begins.

**Architecture:** Keep the entrance sequence CSS-only. Define the pre-animation styles directly on the animation utility classes and reveal them without animation for users who prefer reduced motion.

**Tech Stack:** Next.js, Tailwind CSS, CSS keyframe animations

---

### Task 1: Define stable initial animation states

**Files:**
- Modify: `src/app/globals.css`

- [ ] Add `opacity: 0` and `transform: translate3d(0, 10px, 0)` to `.rise` before its existing animation declaration.
- [ ] Add `transform: scaleX(0)` to `.wipe` while preserving its left transform origin and existing animation declaration.
- [ ] Add a reduced-motion rule that sets `.rise` to `opacity: 1` and `transform: none`, and `.wipe` to `transform: none`, with both animations disabled.

### Task 2: Verify the server-first behavior

**Files:**
- Check: `src/app/globals.css`
- Check: `src/app/page.tsx`
- Check: `src/app/about/page.tsx`
- Check: `src/app/work/[slug]/page.tsx`

- [ ] Run `pnpm exec tsc --noEmit` and expect exit code 0.
- [ ] Run `pnpm build` and expect exit code 0.
- [ ] Inspect the generated CSS and confirm the base state exists independently of the first keyframe.
- [ ] Inspect the rendered HTML and confirm animated elements carry `.rise` or `.wipe` during server rendering.

# Lower-page Atmosphere Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the homepage’s premium atmosphere through its lower sections with subtle semantic badges and CSS-only row elevation.

**Architecture:** Keep visual behavior behind the existing `src/app/globals.css` styling seam and render technology categories through the existing `TechBadges` module. The homepage remains a Server Component, with no pointer state or new runtime adapter.

**Tech Stack:** Next.js 15, React 19 Server Components, Tailwind CSS 4, CSS custom properties and `color-mix()`.

---

### Task 1: Add lower-page atmosphere and semantic badge styles

**Files:**
- Modify: `src/app/globals.css`

- [x] **Step 1: Add semantic tokens**

Add light and dark `--data`, `--lower-glow-a`, and `--lower-glow-b` tokens next to the existing semantic color and atmosphere tokens. Expose `--data` as `--color-data` in `@theme inline`.

- [x] **Step 2: Add the lower glow**

Define `.lower-glow` as an isolated stacking context and use its `::before` pseudo-element for two oversized, low-alpha radial gradients. Extend the pseudo-element above and below its owning section so the wash reaches the writing rows and footer without affecting layout.

- [x] **Step 3: Add square badge variants**

Define a shared `.badge` with `border-radius: 0`, a 1px border, monospace type, and compact padding. Add `.badge-signal`, `.badge-tech`, `.badge-data`, `.badge-warn`, and `.badge-mute` variants whose fills remain below 10% semantic color and whose borders remain below 30%.

### Task 2: Apply semantic rendering and hover elevation

**Files:**
- Modify: `src/app/page.tsx`
- Reuse: `src/components/TechBadges.tsx`
- Reuse: `src/lib/tech.ts`

- [x] **Step 1: Render shelf tags through `TechBadges`**

Import `TechBadges` and replace only the comma-joined shelf tag node with `<TechBadges items={item.tags} />`. Preserve all metadata strings and grid wrappers.

- [x] **Step 2: Elevate all lower rows**

Apply `row-tap-surface` and a semantic hover-border color to linked and unlinked shelf rows and to writing rows. Preserve their element types and navigation behavior.

- [x] **Step 3: Tint writing status**

Keep the existing grid paragraph and wrap `post.status` in `<span className="badge badge-warn">` so the badge cannot alter the grid item’s placement.

- [x] **Step 4: Anchor the homepage-only glow**

Add `lower-glow` to the existing About section, which sits between the writing rows and global footer. Do not add a wrapper or change section order.

### Task 3: Verify behavior and constraints

**Files:**
- Review: `src/app/page.tsx`
- Review: `src/app/globals.css`

- [x] **Step 1: Run static verification**

Run `pnpm typecheck` and expect exit code 0. Run `pnpm build` and expect exit code 0 with the homepage and existing routes generated successfully.

- [x] **Step 2: Review the focused diff**

Confirm all badges explicitly remain square, semantic fills remain low-opacity, no text or grid structure changed, and no `'use client'` directive or event handler was added.

- [x] **Step 3: Apply the current web-interface checklist**

Review the two modified source files against the latest Vercel Web Interface Guidelines. Expect no new accessibility, focus, animation, hydration, or interaction violations.

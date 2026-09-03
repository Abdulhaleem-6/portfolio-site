# Recruiter Visuals and Route Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace code-heavy case-study visuals with business evidence and add a fast global route transition.

**Architecture:** Introduce a typed before-and-after callout rendered by a reusable server component. Simplify the existing inline SVG diagrams and wrap route content with a small Framer Motion client boundary in the persistent root layout.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Framer Motion, CSS

---

### Task 1: Replace the excerpt model

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/cases/agent-runtime.ts`
- Modify: `src/content/cases/smartfetch.ts`
- Modify: `src/content/cases/vascan.ts`
- Modify: `src/content/cases/debt-tracker.ts`

- [ ] Replace `Excerpt` with a `BusinessCallout` type containing `title`, `before`, `after`, `impact`, and `afterParagraph`.
- [ ] Remove every raw code template, source path, language tag, and line reference from the four case files.
- [ ] Add two or three concise callouts to each case.

### Task 2: Replace the code-block renderer

**Files:**
- Create: `src/components/BusinessCallout.tsx`
- Modify: `src/app/work/[slug]/page.tsx`
- Delete: `src/components/CodeBlock.tsx`
- Delete: `src/lib/code.ts`

- [ ] Render each callout as a square bordered comparison row with Before, After, and Why it matters sections.
- [ ] Remove syntax highlighting and all code-block imports and rendering.

### Task 3: Simplify diagrams

**Files:**
- Modify: `src/components/Diagram.tsx`

- [ ] Reduce every diagram to plain-English steps and outcomes.
- [ ] Remove internal function names, variables, framework terms, infrastructure acronyms, and database terminology from visible labels.

### Task 4: Add route transitions

**Files:**
- Create: `src/components/RouteTransition.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] Add Framer Motion.
- [ ] Add a persistent `AnimatePresence` wrapper keyed by pathname.
- [ ] Animate opacity and vertical translation over 220 ms with `[0.2, 0.85, 0.3, 1]` easing.
- [ ] Respect reduced-motion preferences.

### Task 5: Remove obsolete styling and verify

**Files:**
- Modify: `src/app/globals.css`

- [ ] Remove syntax-highlighting styles.
- [ ] Run searches proving no code excerpts or technical diagram labels remain.
- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `pnpm build` and inspect all generated routes.

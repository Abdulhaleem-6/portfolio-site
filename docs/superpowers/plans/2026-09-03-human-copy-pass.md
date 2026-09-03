# Human Copy Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all rendered portfolio copy and README prose in a direct senior-engineer voice without changing technical facts.

**Architecture:** Keep every existing data structure and rendering path. Change only string content in the typed case-study modules, shared site content, rendered labels, diagram text, interactive-demo text, metadata, and README.

**Tech Stack:** Next.js 15, React 19, TypeScript content modules, Markdown.

---

### Task 1: Rewrite shared site and page copy

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/work/[slug]/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/ThemeToggle.tsx`
- Modify: `src/components/StampedeDemo.tsx`

- [x] **Step 1: Rewrite the hero, About, shelf, and writing summaries**

Use first-person active voice for career and implementation work. Keep the hero’s “behave the same way twice” thesis, every technology name, and every metric.

- [x] **Step 2: Tighten shared labels and explanatory notes**

Replace promotional labels such as “Four systems, in depth” with direct descriptions where needed. Keep route names and navigation meaning stable.

- [x] **Step 3: Rewrite interactive-demo explanations**

Keep `500` requests, three keys, call counts, and coalescing behavior unchanged. Use direct statements for the result and failure state.

### Task 2: Rewrite all four case studies

**Files:**
- Modify: `src/content/cases/agent-runtime.ts`
- Modify: `src/content/cases/smartfetch.ts`
- Modify: `src/content/cases/vascan.ts`
- Modify: `src/content/cases/debt-tracker.ts`

- [x] **Step 1: Rewrite hooks, summaries, context, and constraints**

Lead with the concrete system behavior. Preserve roles, periods, statuses, stack arrays, repository URLs, and compact metrics verbatim except for em-dash punctuation.

- [x] **Step 2: Rewrite architecture and hard-part prose**

State each causal chain in active voice. Preserve timing thresholds, limits, entity relationships, retry behavior, and code identifiers exactly.

- [x] **Step 3: Rewrite decisions and retrospectives**

Keep every selected and rejected option. State why the selected option won, then state each remaining defect and proposed fix directly.

- [x] **Step 4: Rewrite excerpt annotations**

Keep source code, file paths, line ranges, and public links unchanged. Shorten only the prose notes around each excerpt.

### Task 3: Rewrite diagram and README copy

**Files:**
- Modify: `src/components/Diagram.tsx`
- Modify: `README.md`

- [x] **Step 1: Rewrite rendered diagram labels**

Remove every em dash from visible SVG labels and accessible titles. Keep system names, arrows, counts, timeouts, and topology unchanged.

- [x] **Step 2: Rewrite README prose**

Keep install commands, file paths, stack choices, design tokens, corrected metrics, and deployment cautions. Replace passive constructions and promotional explanations with short active sentences.

### Task 4: Verify language and build integrity

**Files:**
- Review: `README.md`
- Review: `src/content/**/*.ts`
- Review: `src/app/**/*.tsx`
- Review: `src/components/**/*.tsx`

- [x] **Step 1: Run the language scan**

Run `rg -n "—|seamlessly|robust|meticulously|delve|testament to|merely|unglamorous" README.md src/content src/app src/components`. Any match in a rendered string or README prose fails the pass. Matches limited to non-rendered implementation comments may remain only when changing them would exceed scope.

- [x] **Step 2: Run type checking**

Run `pnpm typecheck`. Expect exit code 0.

- [x] **Step 3: Run the production build**

Run `pnpm build`. Expect exit code 0 and all 11 routes generated.

- [x] **Step 4: Review protected facts**

Confirm the preserved figures include 135 commits, 232 commits, 541 commits, 106 commits, 57 adapters, 44 endpoints, 12 modules, 120/1,200 ms, 1,500 tokens, 512 KB, 4 KB, 500 requests, and all stack arrays and source paths.

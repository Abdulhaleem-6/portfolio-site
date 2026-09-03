# Recruiter-friendly Case-study Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all four case studies so recruiters, product managers, and hiring managers can quickly understand the problem, contribution, and impact.

**Architecture:** Keep the existing `CaseStudy` schema and rendering components unchanged. Replace only reader-facing prose in the four case content modules while preserving verified facts, metrics, source evidence, stack entries, links, and code excerpts.

**Tech Stack:** Next.js, TypeScript, static content modules

---

### Task 1: Rewrite Worknet AI

**Files:**
- Modify: `src/content/cases/agent-runtime.ts`

- [ ] Rewrite the title, hook, summary, role, context, constraints, diagram caption, narrative paragraphs, excerpt notes, decisions, outcome labels, and retrospective notes in active, plain English.
- [ ] Keep the existing metrics, metric evidence, stack entries, architecture facts, and code excerpts unchanged.
- [ ] Confirm the story explains how waiting for the page and checking the result reduced false success reports.

### Task 2: Rewrite SmartFetch

**Files:**
- Modify: `src/content/cases/smartfetch.ts`

- [ ] Rewrite the reader-facing prose around the problem of collecting invoices from 57 portals, handling emailed login codes, and delivering documents to restricted systems.
- [ ] Keep the shared contributor role explicit and preserve all verified figures and code excerpts.
- [ ] Explain the removed network infrastructure as a pragmatic simplification, not as a technical showcase.

### Task 3: Rewrite Vascan

**Files:**
- Modify: `src/content/cases/vascan.ts`

- [ ] Rewrite the reader-facing prose around accurate gallery payouts, duplicate payment events, and protecting the database during traffic spikes.
- [ ] Keep the shared ownership language, operating scale, metrics, evidence, and code excerpts unchanged.
- [ ] Translate the caching and payment mechanisms into their business effects.

### Task 4: Rewrite Debt Tracker

**Files:**
- Modify: `src/content/cases/debt-tracker.ts`

- [ ] Rewrite the reader-facing prose around splitting shared bills correctly, notifying participants, and preserving financial history.
- [ ] Keep the public-repository link, verified metrics, evidence, and code excerpts unchanged.
- [ ] Replace the inflated role label with a factual first-person description of the end-to-end backend contribution.

### Task 5: Verify the rewrite

**Files:**
- Check: `src/content/cases/agent-runtime.ts`
- Check: `src/content/cases/smartfetch.ts`
- Check: `src/content/cases/vascan.ts`
- Check: `src/content/cases/debt-tracker.ts`

- [ ] Run `rg -n "—|seamlessly|robust|meticulously|delve|testament to|merely|revolutionary|cutting-edge" src/content/cases` and expect no matches.
- [ ] Run `pnpm exec tsc --noEmit` and expect exit code 0.
- [ ] Run `pnpm build` and expect exit code 0.
- [ ] Review the final diff and confirm that only case-study copy and planning documents changed.

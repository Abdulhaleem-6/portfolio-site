# Abdulhaleem Sanuth Portfolio

A personal portfolio built to show how I approach production engineering problems. It presents the business context, the decisions I made, and the practical results without turning every case study into a code walkthrough.

## Selected work

| Case study | Problem | Result |
| --- | --- | --- |
| Worknet AI | An AI agent could report success before a webpage finished changing. | I helped the agent wait for the page, verify the result, and give users a more accurate answer. |
| SmartFetch | Accounting teams needed invoices collected from 57 utility portals with different login flows. | I led much of the backend and infrastructure work that handles collection, emailed login codes, and document delivery. |
| Vascan | A marketplace needed to split payments safely while handling duplicate events and traffic spikes. | I helped protect payment processing and reduced 500 repeated database queries to one query per app instance. |
| Debt Tracker | Shared bills could leave incorrect balances if only part of an update succeeded. | I built the backend so every person's share saves together or not at all. |

## Built with

- Next.js 15 and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Typed content modules for the case studies

The App Router prerenders the portfolio pages, while a small client-side layer handles theme controls, route transitions, and focused interactions.

## Run locally

Use Node.js 20 or newer and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Project structure

```text
src/
  app/          Routes, metadata, and global styles
  components/   Shared interface and motion components
  content/      Portfolio copy and typed case-study data
  lib/          Shared utilities
```

## Contact

- [LinkedIn](https://linkedin.com/in/abdulhaleem-sanuth)
- [GitHub](https://github.com/Abdulhaleem-6)
- [Email](mailto:abdulhaleemsanuth@gmail.com)

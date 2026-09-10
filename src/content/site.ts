import { agentRuntime } from "./cases/agent-runtime";
import { smartfetch } from "./cases/smartfetch";
import { vascan } from "./cases/vascan";
import { debtTracker } from "./cases/debt-tracker";
import type { CaseStudy } from "./types";

export const cases: CaseStudy[] = [agentRuntime, smartfetch, vascan, debtTracker].sort(
  (a, b) => a.index - b.index,
);

export function caseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function neighbours(slug: string) {
  const i = cases.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? cases[i - 1] : undefined,
    next: i >= 0 && i < cases.length - 1 ? cases[i + 1] : undefined,
  };
}

export const site = {
  name: "Abdulhaleem Sanuth",
  role: "AI Infrastructure & Distributed Systems",
  location: "Lagos, Nigeria · remote",
  url: "https://abdulhaleem-6.github.io/portfolio-site",
  email: "abdulhaleemsanuth@gmail.com",
  github: "https://github.com/Abdulhaleem-6",
  linkedin: "https://linkedin.com/in/abdulhaleem-sanuth",

  /** The thesis. Everything else on the site is evidence for this sentence. */
  hero: "I build the infrastructure between AI agents and production systems. I make nondeterministic systems behave the same way twice.",
  heroSub:
    "At Codygo, I work on context budgets, isolated sub-agent loops, and browser automation that waits for the page to settle before reporting success. I spent the previous four years on payment settlement, cache stampedes, webhook idempotency, and AWS deployments. That backend work shapes how I build agent infrastructure.",

  aboutShort: [
    "I studied Statistics at the University of Lagos, then spent four years building backends for marketplaces, payments, and queues. I now work on agent infrastructure at Codygo.",
    "The problems are similar. An agent can report a change it never made. A webhook can settle the same payment twice. Both systems can produce several answers when only one is correct.",
  ],

  about: [
    "I'm an infrastructure engineer in Lagos, working remotely. I build the runtime under LLM agents: what the model can see, what it can do, and how much context it can keep. I also build the AWS systems that run it.",
    "I graduated from the University of Lagos with a Statistics degree in 2023. I spent most of that time writing backends. Statistics taught me to question a number until I understand how someone produced it. I apply the same rule to agent reports: verify the page, not the agent's intent.",
    "I like small fixes with clear effects. Ten lines in a Redis service collapse 500 concurrent cache misses into one database call. Two commits removed a NAT gateway I had designed. One transaction keeps a group debt from splitting halfway.",
    "I care about idempotency, determinism, and failures people can understand. Those properties separate a demo from a system people can trust. AI systems need them because a successful tool call does not prove the requested change happened.",
    "I read design documents, write commit messages for the next engineer, and like working on systems that must be correct under load.",
  ],

  /** Range and volume, without diluting the four featured cases. */
  shelf: [
    {
      title: "Serverless YouTube File Sync",
      href: "https://github.com/Abdulhaleem-6/youtube-file-sync",
      linkLabel: "github",
      body: "I built an event-driven video sync pipeline with AWS CDK, Lambda, SQS, DynamoDB, and S3. A custom arm64 Graviton image bundles yt-dlp and ffmpeg. S3-cached cookies and multi-client fallback handle YouTube's rate limits.",
      tags: ["AWS CDK", "Lambda", "Docker arm64", "SQS"],
    },
    {
      title: "Datafy fleet console",
      body: "I built a cloud-storage FinOps UI with an account switcher for an AWS Organizations tree and organisation-level autoscale rule views. I also fixed virtualised grids that lost stable row identity on every poll.",
      tags: ["React", "TypeScript", "Data grids"],
      meta: "29 commits · +7,110 / −6,010",
    },
    {
      title: "MongoDB → BigQuery sync",
      body: "I inferred the schema from a 1,000-document sample with semantic type detection. The sync streams data through the BigQuery Write API in packets capped at 8 MB, below its 10 MB request limit, and reuses writer streams across batches.",
      tags: ["BigQuery", "MongoDB", "Node.js"],
    },
    {
      title: "Embeddable widget JWT auth",
      body: "I added multi-key JWKS verification for third-party sites that embed the Worknet chat widget. I also wrote the reference integration and signing sample other teams use.",
      tags: ["JWT / JWKS", "Preact", "Security"],
    },
  ],

  writing: [
    {
      title: "A successful tool call proves nothing",
      standfirst:
        "Why I ground tool reports in page state, and why a call that did not throw still proves nothing changed.",
      status: "In draft",
    },
    {
      title: "A token budget is a cache eviction problem",
      standfirst:
        "How keep-latest and stale-after-N rules control context, and why an image manifest costs more than its token estimate.",
      status: "In draft",
    },
    {
      title: "One NAT gateway, one job",
      standfirst:
        "How I gave one job a static egress IP, then removed the extra infrastructure when the shared VPC was enough.",
      status: "In draft",
    },
  ],
} as const;

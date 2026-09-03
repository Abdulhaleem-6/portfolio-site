import type { Metadata } from "next";
import Link from "next/link";
import { site, cases } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about[0],
};

const FACTS = [
  { k: "Based", v: "Lagos, Nigeria · remote" },
  { k: "Now", v: "AI / Full-Stack Engineer at Codygo" },
  { k: "Since 2022", v: "Backend co-owner at Vascan Arts" },
  { k: "Studied", v: "B.Sc. Statistics, University of Lagos (2023)" },
];

const TOOLS = [
  {
    group: "Agent infrastructure",
    items: ["Mastra", "MCP", "context budgeting", "sub-agent isolation", "Playwright"],
  },
  {
    group: "AWS",
    items: ["CDK", "Lambda", "Batch", "Fargate", "EventBridge", "Cognito", "DynamoDB", "S3", "SES"],
  },
  {
    group: "Backend",
    items: ["TypeScript", "Node", "NestJS", "Express", "Prisma", "Zod", "Bull"],
  },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "BigQuery", "DynamoDB"] },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Preact", "Tailwind", "TanStack Query"],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="rule hero-glow">
        <div className="frame pad pb-14 pt-20 md:pb-20 md:pt-28">
          <p className="label label-signal rise d0">About</p>
          <h1 className="display-l rise d1 mt-7 max-w-[14ch]">
            I build systems that must stay correct.
          </h1>
        </div>
      </section>

      <section className="rule">
        <div className="frame grid grid-cols-12">
          <div className="pad longform col-span-12 py-14 md:col-span-7">
            {site.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="surface col-span-12 border-t border-line-soft md:col-span-5 md:border-l md:border-t-0">
            <p className="pad label border-b border-line-soft py-4">At a glance</p>
            <dl>
              {FACTS.map((f) => (
                <div key={f.k} className="pad border-b border-line-soft py-4">
                  <dt className="label mb-1.5">{f.k}</dt>
                  <dd className="text-[14.5px] leading-snug text-fg-2">{f.v}</dd>
                </div>
              ))}
            </dl>

            <p className="pad label border-b border-line-soft py-4">What I reach for</p>
            <dl>
              {TOOLS.map((t) => (
                <div key={t.group} className="pad border-b border-line-soft py-4 last:border-b-0">
                  <dt className="label mb-2">{t.group}</dt>
                  <dd className="stack-list">{t.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame">
          <p className="pad label border-b border-line-soft py-4">The long version</p>
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="pad group row-tap-surface flex items-baseline justify-between gap-6 border-b border-line-soft py-5 last:border-b-0 hover:border-signal/40 hover:text-signal"
            >
              <span className="flex items-baseline gap-5">
                <span className="mono text-[12px] tabular-nums text-fg-3 group-hover:text-signal">
                  {String(c.index).padStart(2, "0")}
                </span>
                <span className="text-[17px] font-bold tracking-[-0.03em]">{c.title}</span>
              </span>
              <span aria-hidden="true" className="mono text-[13px]">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rule">
        <div className="frame pad flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52ch] text-[17px] leading-[1.7] text-fg-2">
            If you are building a system that must stay correct under load, I&rsquo;d like to hear
            about it.
          </p>
          <a href={`mailto:${site.email}`} className="action action-signal shrink-0">
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases, caseBySlug, neighbours } from "@/content/site";
import { Diagram } from "@/components/Diagram";
import { BusinessCallout } from "@/components/BusinessCallout";
import { RichText } from "@/components/RichText";
import { StampedeDemo } from "@/components/StampedeDemo";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.hook,
    openGraph: { title: study.title, description: study.hook, type: "article" },
  };
}

const SECTIONS = [
  { id: "context", label: "Context" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "How it works" },
  { id: "hard-part", label: "Key challenge" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
  { id: "changes", label: "Retrospective" },
];

function SectionHead({
  index,
  label,
  title,
  note,
  accent = "signal",
}: {
  index: string;
  label: string;
  title: string;
  note?: string;
  /* The eyebrow carries the accent of whatever the section is about. */
  accent?: "signal" | "tech" | "warn";
}) {
  return (
    <div className="mb-9">
      <p className={`label label-${accent}`}>
        {index} / {label}
      </p>
      <h2 className="display-m mt-4 max-w-[20ch]">{title}</h2>
      {note ? (
        <p className="mono mt-5 max-w-[62ch] text-[12px] leading-[1.85] text-fg-3">{note}</p>
      ) : null}
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) notFound();

  const { prev, next } = neighbours(slug);
  const { paragraphs, callouts } = study.hardPart;
  const idx = String(study.index).padStart(2, "0");

  return (
    <>
      {/* ------------------------------------------------------------ crumb */}
      <div className="rule">
        <div className="frame pad flex items-center justify-between py-3.5">
          <Link href="/#work" className="label transition-colors hover:text-signal">
            ← All work
          </Link>
          <span className="label tabular-nums">
            {idx} / {String(cases.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------------- header */}
      <section className="rule hero-glow">
        <div className="frame pad pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="label label-signal rise d0">
            Case study {idx} / {study.repoUrl ? "Public source" : "Source private"}
          </p>
          <h1 className="display-l rise d1 mt-7 max-w-[18ch]">{study.title}</h1>
          <p className="rise d3 mt-9 max-w-[62ch] text-[19px] leading-[1.6] text-fg-2">
            {study.hook}
          </p>
          {study.repoUrl ? (
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="action rise d4 mt-9"
            >
              Read the source ↗
            </a>
          ) : null}
        </div>
      </section>

      {/* ------------------------------------------------------- spec table */}
      <section className="rule">
        <div className="frame surface pad py-4">
          {[
            { k: "Role", v: study.role },
            { k: "Period", v: study.period },
            { k: "Status", v: study.status },
          ].map((row) => (
            <div key={row.k} className="spec-row first:border-t-0">
              <dt className="label">{row.k}</dt>
              <dd className="text-[15px] leading-snug text-fg-2">{row.v}</dd>
            </div>
          ))}
          <div className="spec-row">
            <dt className="label">Stack</dt>
            <dd className="stack-list">{study.stack.join(", ")}</dd>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ body + rail */}
      <section className="rule">
        <div className="frame grid grid-cols-12">
          <nav className="hidden xl:col-span-2 xl:block" aria-label="On this page">
            <div className="pad sticky top-[52px] py-12">
              <p className="label mb-5">Contents</p>
              <ul>
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="mono flex items-baseline gap-3 py-1.5 text-[12px] text-fg-3 transition-colors duration-100 hover:text-signal"
                    >
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="col-span-12 min-w-0 border-line-soft xl:col-span-10 xl:border-l">
            {/* ----------------------------------------------------- context */}
            <section id="context" className="pad scroll-mt-[52px] py-14">
              <SectionHead index="01" label="Context" title="What I worked on" />
              <div className="longform">
                {study.context.map((p, i) => (
                  <p key={i}>
                    <RichText>{p}</RichText>
                  </p>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------- constraints */}
            <section id="constraints" className="scroll-mt-[52px] border-t border-line-soft py-14">
              <div className="pad">
                <SectionHead accent="warn" index="02" label="Constraints" title="What made it hard" />
              </div>
              <div className="border-t border-line-soft">
                {study.constraints.map((c, i) => (
                  <div
                    key={c.title}
                    className="row-tap-surface grid grid-cols-12 gap-y-3 border-b border-line-soft py-7 last:border-b-0 hover:border-signal/40"
                  >
                    <p className="pad mono col-span-12 text-[13px] tabular-nums text-warn md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="pad col-span-12 text-[16px] font-bold leading-snug tracking-[-0.03em] md:col-span-4">
                      {c.title}
                    </h3>
                    <p className="pad col-span-12 max-w-[58ch] text-[15.5px] leading-[1.7] text-fg-2 md:col-span-7">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ------------------------------------------------ architecture */}
            <section id="architecture" className="pad scroll-mt-[52px] border-t border-line-soft py-14">
              <SectionHead accent="tech" index="03" label="How it works" title="How the pieces connect" />
              <figure className="inset-panel">
                <div className="scroll-x border-b border-line-soft p-5 md:p-9">
                  <Diagram id={study.diagram} />
                </div>
                <figcaption className="border-t border-line-soft bg-surface p-5 text-[14.5px] leading-[1.7] text-fg-2">
                  <RichText>{study.diagramCaption}</RichText>
                </figcaption>
              </figure>
            </section>

            {/* --------------------------------------------------- hard part */}
            <section id="hard-part" className="pad scroll-mt-[52px] border-t border-line-soft py-14">
              <SectionHead accent="tech" index="04" label="Key challenge" title={study.hardPart.title} />
              <div className="longform">
                {paragraphs.map((p, i) => (
                  <div key={i}>
                    <p>
                      <RichText>{p}</RichText>
                    </p>
                    {callouts
                      .filter((callout) => callout.afterParagraph === i)
                      .map((callout) => (
                        <BusinessCallout key={callout.title} callout={callout} />
                      ))}
                  </div>
                ))}
              </div>

              {study.slug === "vascan" ? (
                <>
                  <p className="longform mt-10">
                    <RichText>
                      A traffic spike becomes dangerous when hundreds of visitors request the same
                      listing just as its saved result expires. The simulator below sends 500
                      requests for three items. Compare sharing repeated work with making the
                      database repeat every lookup.
                    </RichText>
                  </p>
                  <StampedeDemo />
                </>
              ) : null}
            </section>

            {/* --------------------------------------------------- decisions */}
            <section id="decisions" className="scroll-mt-[52px] border-t border-line-soft py-14">
              <div className="pad">
                <SectionHead
                  index="05"
                  label="Decisions"
                  title="Trade-offs"
                  note="I include the rejected option for each decision, not just the final choice."
                />
              </div>
              <div className="border-t border-line-soft">
                <div className="hidden grid-cols-12 border-b border-line-soft py-3 lg:grid">
                  <p className="pad label col-span-3">Chose</p>
                  <p className="pad label col-span-3">Over</p>
                  <p className="pad label col-span-6">Because</p>
                </div>
                {study.decisions.map((d) => (
                  <div
                    key={d.chose}
                    className="row-tap-surface grid grid-cols-12 gap-y-3 border-b border-line-soft py-7 last:border-b-0 hover:border-signal/40"
                  >
                    <div className="pad col-span-12 lg:col-span-3">
                      <p className="label mb-2 lg:hidden">Chose</p>
                      <p className="text-[15px] font-bold leading-snug tracking-[-0.025em]">
                        {d.chose}
                      </p>
                    </div>
                    <div className="pad col-span-12 lg:col-span-3">
                      <p className="label mb-2 lg:hidden">Over</p>
                      <p className="text-[14.5px] leading-snug text-fg-3">{d.over}</p>
                    </div>
                    <p className="pad col-span-12 max-w-[56ch] text-[15px] leading-[1.7] text-fg-2 lg:col-span-6">
                      {d.because}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ----------------------------------------------------- outcome */}
            <section id="outcome" className="scroll-mt-[52px] border-t border-line-soft py-14">
              <div className="pad">
                <SectionHead
                  index="06"
                  label="Outcome"
                  title="Results and sources"
                  note="Each figure includes the command or file I used to calculate it."
                />
              </div>
              <dl className="border-t border-line-soft">
                {study.outcomes.map((m) => (
                  <div
                    key={m.label}
                    className="row-tap-surface grid grid-cols-12 items-baseline gap-y-2 border-b border-line-soft py-6 last:border-b-0 hover:border-signal/40"
                  >
                    <dt className="pad mono col-span-12 text-[26px] leading-none tracking-[-0.05em] tabular-nums text-signal md:col-span-3">
                      {m.value}
                    </dt>
                    <dd className="pad col-span-12 text-[15px] leading-snug md:col-span-4">
                      {m.label}
                    </dd>
                    <dd className="pad mono col-span-12 text-[11.5px] leading-[1.7] text-fg-3 md:col-span-5">
                      {m.basis}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* ----------------------------------------------------- changes */}
            <section id="changes" className="scroll-mt-[52px] border-t border-line-soft py-14">
              <div className="pad">
                <SectionHead
                  accent="warn"
                  index="07"
                  label="Retrospective"
                  title="What I'd change"
                  note="I found two of these issues while reviewing the code for this page."
                />
              </div>
              <ol className="border-t border-line-soft">
                {study.changes.map((c, i) => (
                  <li
                    key={i}
                    className="row-tap-surface grid grid-cols-12 gap-y-2 border-b border-line-soft py-7 last:border-b-0 hover:border-signal/40"
                  >
                    <span className="pad mono col-span-12 text-[13px] tabular-nums text-warn md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pad col-span-12 max-w-[70ch] text-[15.5px] leading-[1.75] text-fg-2 md:col-span-11">
                      <RichText>{c}</RichText>
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- prev/next */}
      <section className="rule">
        <div className="frame grid grid-cols-1 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="pad group row-tap-surface border-b border-line-soft py-10 hover:border-signal/40 hover:text-signal sm:border-b-0 sm:border-r"
            >
              <span className="label group-hover:text-signal">
                ← {String(prev.index).padStart(2, "0")} Previous
              </span>
              <p className="display-s mt-4 max-w-[16ch]">{prev.title}</p>
            </Link>
          ) : (
            <span className="hidden border-line-soft sm:block sm:border-r" />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="pad group row-tap-surface py-10 hover:border-signal/40 hover:text-signal sm:text-right"
            >
              <span className="label group-hover:text-signal">
                Next {String(next.index).padStart(2, "0")} →
              </span>
              <p className="display-s mt-4 max-w-[16ch] sm:ml-auto">{next.title}</p>
            </Link>
          ) : null}
        </div>
      </section>
    </>
  );
}

import { Fragment } from "react";
import Link from "next/link";
import { TechBadges } from "@/components/TechBadges";
import { cases, site } from "@/content/site";

/**
 * The hero sentence, staggered word by word on load. The string is rendered
 * verbatim: it is only split for animation timing, never rewritten.
 */
function StaggeredHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="display-xl max-w-[15ch]">
      {words.map((word, i) => (
        // The space is a text node *between* the inline-blocks. Nested inside
        // one, it collapses and the headline runs together.
        <Fragment key={`${word}-${i}`}>
          <span className="rise inline-block" style={{ animationDelay: `${60 + i * 26}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

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
  accent?: "signal" | "tech";
}) {
  return (
    <div className="grid grid-cols-12 items-end gap-y-6 py-10">
      <div className="col-span-12 md:col-span-5">
        <p className={`label label-${accent}`}>
          {index} / {label}
        </p>
        <h2 className="display-m mt-4">{title}</h2>
      </div>
      {note ? (
        <p className="mono col-span-12 max-w-[46ch] text-[12px] leading-[1.85] text-fg-3 md:col-span-6 md:col-start-7">
          {note}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="rule hero-glow">
        <div className="frame pad pb-14 pt-20 md:pb-20 md:pt-28">
          <p className="label label-signal rise d0">{site.role}</p>
          <div className="mt-8">
            <StaggeredHeadline text={site.hero} />
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="frame grid grid-cols-12">
          <div className="pad col-span-12 py-10 md:col-span-7">
            <p className="rise d4 max-w-[58ch] text-[17.5px] leading-[1.75] text-fg-2">
              {site.heroSub}
            </p>
            <div className="rise d5 mt-9 flex flex-wrap gap-3">
              <Link href="/#work" className="action action-signal">
                View the work
              </Link>
              <a href={`mailto:${site.email}`} className="action">
                Get in touch
              </a>
            </div>
          </div>

          <dl className="rise d5 surface col-span-12 flex flex-col border-t border-line-soft md:col-span-5 md:border-l md:border-t-0">
            {[
              { k: "Location", v: site.location },
              { k: "Github", v: "Abdulhaleem-6", href: site.github },
              { k: "Email", v: site.email, href: `mailto:${site.email}` },
            ].map((row) => (
              <div
                key={row.k}
                className="pad flex flex-1 items-center justify-between gap-6 border-b border-line-soft py-5 last:border-b-0"
              >
                <dt className="label">{row.k}</dt>
                <dd className="mono text-right text-[12px] text-fg-2">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="ul-link"
                    >
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ----------------------------------------------------- selected work */}
      <section id="work" className="rule scroll-mt-[52px]">
        <div className="frame pad">
          <SectionHead
            index="01"
            label="Selected work"
            title="Four production systems"
            note="Each case explains the problem, what I contributed, the result, and what I would improve."
          />
        </div>
      </section>

      <section className="rule">
        <div className="frame">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group row-tap-surface grid grid-cols-12 border-b border-line-soft last:border-b-0 hover:border-signal/40"
            >
              {/* 40%: index numeral and title as art direction */}
              <div className="pad col-span-12 flex items-start gap-6 py-9 md:col-span-5">
                <span className="numeral group-hover:text-signal">
                  {String(c.index).padStart(2, "0")}
                </span>
                <h3 className="display-s tap-shift max-w-[16ch] pt-1">{c.title}</h3>
              </div>

              {/* 60%: the data */}
              <div className="pad col-span-12 border-t border-line-soft py-9 md:col-span-7 md:border-l md:border-t-0">
                <p className="max-w-[58ch] text-[16px] leading-[1.7] text-fg-2">
                  {c.summary}
                </p>
                <p className="stack-list mt-6">{c.stack.join(", ")}</p>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line-soft pt-5">
                  <span className="mono text-[11px] tabular-nums text-fg-3">
                    {c.cardMetric}
                  </span>
                  <span className="label tap-shift-far transition-colors group-hover:text-signal">
                    {c.repoUrl ? "Public source" : "Source private"}
                    <span aria-hidden="true">&nbsp;→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- also built */}
      <section className="rule">
        <div className="frame pad">
          <SectionHead accent="tech" index="02" label="Also built" title="More systems I built" />
        </div>
      </section>

      <section className="rule">
        <div className="frame">
          {site.shelf.map((item) => {
            const href = "href" in item ? item.href : undefined;
            const Row = href ? "a" : "div";
            return (
              <Row
                key={item.title}
                {...(href ? { href, target: "_blank", rel: "noreferrer noopener" } : {})}
                className="group row-tap-surface grid grid-cols-12 gap-y-3 border-b border-line-soft py-7 last:border-b-0 hover:border-tech/40"
              >
                <div className="pad col-span-12 md:col-span-3">
                  <h3 className="text-[16px] font-bold leading-tight tracking-[-0.03em] transition-colors group-hover:text-signal">
                    {item.title}
                  </h3>
                  {href ? <span className="label mt-2 block">Github ↗</span> : null}
                </div>
                <p className="pad col-span-12 max-w-[62ch] text-[15px] leading-[1.7] text-fg-2 md:col-span-6">
                  {item.body}
                </p>
                <div className="pad col-span-12 md:col-span-3">
                  <TechBadges items={item.tags} />
                  {"meta" in item && item.meta ? (
                    <p className="mono mt-2 text-[11px] tabular-nums text-fg-3">{item.meta}</p>
                  ) : null}
                </div>
              </Row>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------ writing */}
      <section className="rule">
        <div className="frame pad">
          <SectionHead index="03" label="Writing" title="In progress" />
        </div>
      </section>

      <section className="rule">
        <div className="frame">
          {site.writing.map((post) => (
            <article
              key={post.title}
              className="row-tap-surface grid grid-cols-12 gap-y-3 border-b border-line-soft py-7 last:border-b-0 hover:border-warn/40"
            >
              <p className="pad label col-span-12 md:col-span-2">
                <span className="badge badge-warn">{post.status}</span>
              </p>
              <div className="pad col-span-12 md:col-span-10">
                <h3 className="text-[18px] font-bold leading-tight tracking-[-0.032em]">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-[62ch] text-[15.5px] leading-[1.7] text-fg-2">
                  {post.standfirst}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- about */}
      <section className="rule lower-glow">
        <div className="frame grid grid-cols-12">
          <div className="pad col-span-12 py-12 md:col-span-4">
            <p className="label label-signal">04 / About</p>
            <h2 className="display-m mt-4">I build systems that must stay correct.</h2>
            <Link href="/about" className="action mt-8">
              The longer version →
            </Link>
          </div>
          <div className="pad longform col-span-12 border-t border-line-soft py-12 md:col-span-8 md:border-l md:border-t-0">
            {site.aboutShort.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

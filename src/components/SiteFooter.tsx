import Link from "next/link";
import { site, cases } from "@/content/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="rule">
        <div className="frame grid grid-cols-12">
          <div className="pad col-span-12 py-12 md:col-span-5">
            <p className="label label-signal">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="display-s mt-5 block [overflow-wrap:anywhere] transition-colors hover:text-signal"
            >
              {site.email}
            </a>
            <p className="mono mt-6 text-[12px] leading-[1.9] text-fg-3">
              {site.location}
              <br />
              {site.role}
            </p>
          </div>

          <nav
            className="surface col-span-12 border-t border-line-soft md:col-span-4 md:border-l md:border-t-0"
            aria-label="Case studies"
          >
            <p className="pad label border-b border-line-soft py-4">Case studies</p>
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="pad group row-tap flex items-baseline gap-4 border-b border-line-soft py-3.5 last:border-b-0 hover:text-signal"
              >
                <span className="mono text-[11px] tabular-nums text-fg-3 group-hover:text-signal">
                  {String(c.index).padStart(2, "0")}
                </span>
                <span className="text-[14px] tracking-[-0.02em]">{c.title}</span>
              </Link>
            ))}
          </nav>

          <nav
            className="surface col-span-12 border-t border-line-soft md:col-span-3 md:border-l md:border-t-0"
            aria-label="Elsewhere"
          >
            <p className="pad label border-b border-line-soft py-4">Elsewhere</p>
            {[
              { href: site.github, label: "GitHub", ext: true },
              { href: site.linkedin, label: "LinkedIn", ext: true },
              { href: "/about", label: "About", ext: false },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.ext ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="pad flex items-baseline justify-between gap-4 border-b border-line-soft py-3.5 text-[14px] tracking-[-0.02em] row-tap last:border-b-0 hover:text-signal"
              >
                {l.label}
                {l.ext ? <span aria-hidden="true" className="text-[11px]">↗</span> : null}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="frame pad flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label">Next.js · TypeScript · Tailwind · Framer Motion</p>
      </div>
    </footer>
  );
}

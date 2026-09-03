import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="rule sticky top-0 z-50 bg-bg/85 backdrop-blur-[2px]">
      <div className="frame pad flex h-[52px] items-stretch justify-between">
        <Link
          href="/"
          className="mono group flex items-center gap-3 text-[12px] tracking-[-0.01em]"
        >
          <span className="text-fg">Abdulhaleem Sanuth</span>
          <span className="hidden text-fg-3 transition-colors group-hover:text-signal sm:inline">
            / infra
          </span>
        </Link>

        <nav className="flex items-stretch" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label flex items-center border-l border-line-soft px-4 row-tap hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="label hidden items-center border-l border-line-soft px-4 row-tap hover:text-signal sm:flex"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

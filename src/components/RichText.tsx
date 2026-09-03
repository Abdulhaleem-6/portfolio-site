import { Fragment, type ReactNode } from "react";

/**
 * Inline markup for prose written in the content modules: **bold**, *italic*
 * and `code`. Deliberately not a Markdown library and deliberately not
 * dangerouslySetInnerHTML. The content is authored in TypeScript, so the only
 * thing needed is inline emphasis, and returning React nodes keeps it XSS-proof
 * by construction.
 */

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

export function RichText({ children }: { children: string }): ReactNode {
  const parts = children.split(TOKEN).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

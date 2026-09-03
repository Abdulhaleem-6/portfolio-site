import { BADGE_CLASS, techKind } from "@/lib/tech";

/**
 * A stack list rendered as tinted metadata badges rather than a comma-joined
 * string. Square-edged and low-chroma by design: these are data, not pills.
 * The tint comes from the item's semantic category, so a row of them reads as
 * "mostly cloud" or "mostly data" before any single word is read.
 */
export function TechBadges({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <span key={item} className={BADGE_CLASS[techKind(item)]}>
          {item}
        </span>
      ))}
    </p>
  );
}

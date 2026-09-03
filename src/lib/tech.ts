/**
 * Semantic category for a technology name.
 *
 * Metadata on this site is coloured by what a thing *is*, not decoratively:
 * cloud and infrastructure share the signal hue, interface work the tech hue,
 * anything that stores bytes the data hue. Everything unmatched stays neutral,
 * which keeps the badge rows quiet. Most entries are deliberately grey.
 */
export type TechKind = "cloud" | "frontend" | "data" | "neutral";

/** Ordered: the first pattern that matches wins, so specific beats general. */
const RULES: readonly [RegExp, TechKind][] = [
  // Storage first. DynamoDB and Neon are AWS/cloud-adjacent but they are databases.
  [
    /mongo|postgres|redis|bigquery|prisma|mysql|supabase|dynamodb|neon|sql\b/i,
    "data",
  ],
  [
    /aws|cdk|lambda|batch|eventbridge|fargate|cloudfront|cognito|kms|\bs3\b|\bses\b|\bsqs\b|docker|pulumi|render|graviton|arm64|nat|vpc/i,
    "cloud",
  ],
  [
    /react|next\.js|preact|tailwind|chakra|tanstack|vite|expo|chart|data grids?|handlebars|\bui\b/i,
    "frontend",
  ],
];

export function techKind(name: string): TechKind {
  for (const [pattern, kind] of RULES) {
    if (pattern.test(name)) return kind;
  }
  return "neutral";
}

export const BADGE_CLASS: Record<TechKind, string> = {
  cloud: "badge badge-signal",
  frontend: "badge badge-tech",
  data: "badge badge-data",
  neutral: "badge badge-mute",
};

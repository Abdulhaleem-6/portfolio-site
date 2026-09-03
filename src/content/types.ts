/**
 * The case-study schema.
 *
 * The blueprint's governing rule is: "Every number on the site carries its basis
 * in the same sentence, or it comes off." That rule is enforced here rather than
 * in review. `Metric.basis` is required, so a metric without a stated source is
 * a type error, not an oversight. Same for `Decision.over`: naming the rejected
 * option is what separates an engineer from a tutorial, so it cannot be omitted.
 */

export type Metric = {
  /** The figure itself, e.g. "541" or "~65%". */
  value: string;
  /** What it counts, e.g. "commits authored". */
  label: string;
  /** Where the number comes from. Required; see module note. */
  basis: string;
};

export type Decision = {
  chose: string;
  over: string;
  because: string;
};

export type BusinessCallout = {
  title: string;
  before: string;
  after: string;
  impact: string;
  metric?: string;
  /** Index of the hard-part paragraph this callout follows. */
  afterParagraph: number;
};

export type Constraint = {
  title: string;
  body: string;
};

export type DiagramId = "agent-loop" | "smartfetch" | "vascan-settlement" | "debt-splits";

export type CaseStudy = {
  slug: string;
  /** Display order, 1-indexed. Drives the "02 / 04" counter and prev/next. */
  index: number;
  title: string;
  /** The problem in plain language. No stack names. One sentence. */
  hook: string;
  /** Homepage summary: two sentences, distinct from the hook. */
  summary: string;

  role: string;
  period: string;
  status: string;
  stack: string[];
  /** Present only for repositories a reader can actually open. */
  repoUrl?: string;
  /** Shown on the card as a compact credibility signal. */
  cardMetric: string;

  context: string[];
  constraints: Constraint[];

  diagram: DiagramId;
  diagramCaption: string;

  hardPart: {
    title: string;
    paragraphs: string[];
    callouts: BusinessCallout[];
  };

  decisions: Decision[];
  outcomes: Metric[];
  /** Non-negotiable per the blueprint. Minimum two.  */
  changes: string[];
};

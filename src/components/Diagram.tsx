import type { DiagramId } from "@/content/types";

const TITLE = "var(--fg)";
const FAINT = "var(--fg-3)";
const LINE = "var(--line-strong)";
const BOX = "var(--surface)";
const BOX_ALT = "var(--surface-2)";
const ACCENT = "var(--signal)";
const TECH = "var(--tech)";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
  accent?: "signal" | "tech";
};

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE} />
      </marker>
      <marker id={`${id}-signal`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={ACCENT} />
      </marker>
    </defs>
  );
}

function Box({ x, y, w, label, sub, accent }: BoxProps) {
  const stroke = accent === "signal" ? ACCENT : accent === "tech" ? TECH : LINE;

  return (
    <g>
      <rect x={x} y={y} width={w} height="58" fill={accent ? BOX_ALT : BOX} stroke={stroke} />
      <text x={x + w / 2} y={sub ? y + 25 : y + 34} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill={stroke === LINE ? TITLE : stroke}>
        {label}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + 42} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill={FAINT}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Connector({ id, x1, y1, x2, y2, accent = false }: { id: string; x1: number; y1: number; x2: number; y2: number; accent?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={accent ? ACCENT : LINE}
      markerEnd={`url(#${id}${accent ? "-signal" : ""})`}
    />
  );
}

function Frame({ children, viewBox, title }: { children: React.ReactNode; viewBox: string; title: string }) {
  return (
    <div className="overflow-x-auto">
      <svg viewBox={viewBox} role="img" aria-label={title} className="h-auto w-full min-w-[680px]">
        <title>{title}</title>
        {children}
      </svg>
    </div>
  );
}

function AgentLoop() {
  const steps = [
    { label: "User asks for a change", sub: "Clear goal", accent: undefined },
    { label: "Agent takes action", sub: "Click or enter data", accent: undefined },
    { label: "Wait for the page", sub: "Let updates finish", accent: "signal" as const },
    { label: "Check the result", sub: "Read the final page", accent: "tech" as const },
    { label: "Report what happened", sub: "Evidence, not assumption", accent: "signal" as const },
  ];

  return (
    <Frame viewBox="0 0 900 154" title="How the agent verifies a change before reporting success">
      <Arrow id="agent-arrow" />
      {steps.map((step, index) => {
        const x = 12 + index * 178;
        return <Box key={step.label} x={x} y={36} w={148} {...step} />;
      })}
      {steps.slice(0, -1).map((_, index) => (
        <Connector key={index} id="agent-arrow" x1={160 + index * 178} y1={65} x2={187 + index * 178} y2={65} accent={index >= 1} />
      ))}
      <text x="450" y="124" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={FAINT}>
        The agent only reports success after the page confirms the change.
      </text>
    </Frame>
  );
}

function SmartFetch() {
  const steps = [
    { label: "Schedule starts", sub: "No manual reminder" },
    { label: "Sign in", sub: "One of 57 portals" },
    { label: "Handle login code", sub: "Unique task inbox", accent: "signal" as const },
    { label: "Collect new invoice", sub: "Reject duplicates", accent: "tech" as const },
    { label: "Deliver document", sub: "Approved destination" },
  ];

  return (
    <Frame viewBox="0 0 900 154" title="How SmartFetch collects and delivers an invoice without manual help">
      <Arrow id="invoice-arrow" />
      {steps.map((step, index) => {
        const x = 12 + index * 178;
        return <Box key={step.label} x={x} y={36} w={148} {...step} />;
      })}
      {steps.slice(0, -1).map((_, index) => (
        <Connector key={index} id="invoice-arrow" x1={160 + index * 178} y1={65} x2={187 + index * 178} y2={65} accent={index === 1} />
      ))}
      <text x="450" y="124" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={FAINT}>
        A scheduled run can finish at any hour without someone forwarding a code.
      </text>
    </Frame>
  );
}

function VascanSettlement() {
  return (
    <Frame viewBox="0 0 860 250" title="How Vascan handles gallery payments and repeated listing requests">
      <Arrow id="vascan-arrow" />

      <text x="12" y="24" fontSize="10" fontFamily="var(--font-mono)" fill={FAINT}>PAYMENTS</text>
      <Box x={12} y={40} w={160} label="Customer pays once" sub="One checkout" />
      <Box x={238} y={40} w={160} label="Group by gallery" sub="Items, shipping, fees" accent="signal" />
      <Box x={464} y={40} w={160} label="Calculate each share" sub="Correct amount per seller" accent="tech" />
      <Box x={690} y={40} w={158} label="Pay galleries" sub="Funds sent directly" />
      <Connector id="vascan-arrow" x1={172} y1={69} x2={236} y2={69} />
      <Connector id="vascan-arrow" x1={398} y1={69} x2={462} y2={69} accent />
      <Connector id="vascan-arrow" x1={624} y1={69} x2={688} y2={69} />

      <text x="12" y="144" fontSize="10" fontFamily="var(--font-mono)" fill={FAINT}>TRAFFIC SPIKE</text>
      <Box x={12} y={160} w={220} label="500 people request one listing" sub="Saved result has expired" />
      <Box x={320} y={160} w={220} label="Share one refresh" sub="Other requests wait" accent="signal" />
      <Box x={628} y={160} w={220} label="One database query" sub="Then everyone gets the result" accent="tech" />
      <Connector id="vascan-arrow" x1={232} y1={189} x2={318} y2={189} />
      <Connector id="vascan-arrow" x1={540} y1={189} x2={626} y2={189} accent />
    </Frame>
  );
}

function DebtSplits() {
  return (
    <Frame viewBox="0 0 850 224" title="How Debt Tracker keeps a group split complete and consistent">
      <Arrow id="debt-arrow" />
      <Box x={12} y={64} w={170} label="One person pays" sub="Shared group bill" />
      <Box x={238} y={64} w={190} label="Save every share together" sub="One all-or-nothing step" accent="signal" />
      <Box x={494} y={24} w={170} label="Save succeeds" sub="Complete balances" accent="tech" />
      <Box x={494} y={124} w={170} label="Any save fails" sub="Keep no partial debt" accent="signal" />
      <Box x={720} y={24} w={118} label="Notify group" sub="After success" />

      <Connector id="debt-arrow" x1={182} y1={93} x2={236} y2={93} />
      <path d="M 428 93 H 462 V 53 H 492" fill="none" stroke={TECH} markerEnd="url(#debt-arrow)" />
      <path d="M 428 93 H 462 V 153 H 492" fill="none" stroke={ACCENT} markerEnd="url(#debt-arrow-signal)" />
      <Connector id="debt-arrow" x1={664} y1={53} x2={718} y2={53} />
      <text x="579" y="210" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={FAINT}>
        Users never see a group debt with missing members.
      </text>
    </Frame>
  );
}

const DIAGRAMS: Record<DiagramId, () => React.ReactElement> = {
  "agent-loop": AgentLoop,
  smartfetch: SmartFetch,
  "vascan-settlement": VascanSettlement,
  "debt-splits": DebtSplits,
};

export function Diagram({ id }: { id: DiagramId }) {
  const Component = DIAGRAMS[id];
  return <Component />;
}

import type { BusinessCallout as BusinessCalloutData } from "@/content/types";

export function BusinessCallout({ callout }: { callout: BusinessCalloutData }) {
  return (
    <aside className="my-9 border-y border-line-strong bg-surface" aria-label={callout.title}>
      <div className="grid grid-cols-12 items-baseline gap-y-3 px-5 py-4 md:px-6">
        <span className="label label-signal col-span-12 md:col-span-3">Operational change</span>
        <h3 className="col-span-12 text-[17px] font-bold leading-snug tracking-[-0.03em] text-fg md:col-span-6">
          {callout.title}
        </h3>
        {callout.metric ? (
          <span className="mono col-span-12 text-[13px] tabular-nums text-signal md:col-span-3 md:text-right">
            {callout.metric}
          </span>
        ) : null}
      </div>

      <dl className="grid border-t border-line-soft md:grid-cols-2">
        <div className="px-5 py-5 md:border-r md:border-line-soft md:px-6">
          <dt className="label text-warn">Before</dt>
          <dd className="mt-2 text-[15px] leading-[1.7] text-fg-2">{callout.before}</dd>
        </div>
        <div className="border-t border-line-soft px-5 py-5 md:border-t-0 md:px-6">
          <dt className="label text-tech">After</dt>
          <dd className="mt-2 text-[15px] leading-[1.7] text-fg-2">{callout.after}</dd>
        </div>
      </dl>

      <div className="grid grid-cols-12 gap-y-2 border-t border-line-soft px-5 py-4 md:px-6">
        <span className="label col-span-12 md:col-span-3">Why it matters</span>
        <span className="col-span-12 text-[14.5px] leading-[1.7] text-fg-2 md:col-span-9">
          {callout.impact}
        </span>
      </div>
    </aside>
  );
}

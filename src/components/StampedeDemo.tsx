"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ITEMS = [
  { key: "listing:page-1", label: "Listing page 1", repeated: 167 },
  { key: "listing:page-2", label: "Listing page 2", repeated: 167 },
  { key: "artwork:featured", label: "Featured artwork", repeated: 166 },
] as const;
const REQUESTS = 500;
const QUERY_MS = 320;
const STAGE_MS = 420;
const RESULT_STAGE_MS = 560;
const FLOW_CELLS = 30;

type Phase = "idle" | "requests" | "database";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function StampedeDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [shareRepeatedWork, setShareRepeatedWork] = useState(true);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [databaseLookups, setDatabaseLookups] = useState<number>(ITEMS.length);
  const [runId, setRunId] = useState(0);
  const inFlight = useRef(new Map<string, Promise<string>>());

  const selectMode = (share: boolean) => {
    if (running) return;
    setShareRepeatedWork(share);
    setDatabaseLookups(share ? ITEMS.length : REQUESTS);
  };

  const run = useCallback(async () => {
    const reduceMotion = Boolean(prefersReducedMotion);

    setRunning(true);
    setPhase("requests");
    setDatabaseLookups(0);
    setRunId((current) => current + 1);
    inFlight.current.clear();

    await sleep(reduceMotion ? 0 : STAGE_MS);
    setPhase("database");

    let lookupCount = 0;

    const queryDatabase = async (key: string) => {
      lookupCount += 1;
      setDatabaseLookups(lookupCount);
      await sleep(reduceMotion ? 0 : QUERY_MS);
      return `value:${key}`;
    };

    const getListing = (key: string) => {
      if (shareRepeatedWork) {
        const existingRequest = inFlight.current.get(key);
        if (existingRequest) return existingRequest;
      }

      const request = queryDatabase(key).finally(() => {
        inFlight.current.delete(key);
      });

      if (shareRepeatedWork) inFlight.current.set(key, request);
      return request;
    };

    const requests = Promise.all(
      Array.from({ length: REQUESTS }, (_, index) =>
        getListing(ITEMS[index % ITEMS.length].key),
      ),
    );

    await Promise.all([requests, sleep(reduceMotion ? 0 : RESULT_STAGE_MS)]);

    setDatabaseLookups(lookupCount);
    setPhase("idle");
    setRunning(false);
  }, [prefersReducedMotion, shareRepeatedWork]);

  const duplicateLookupsAvoided = Math.max(0, REQUESTS - databaseLookups);
  const resultReady = !running || phase === "database";

  return (
    <div className="inset-panel my-9 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line-soft px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`size-1.5 ${running ? "bg-signal" : "bg-data"}`}
          />
          <p className="label">Traffic spike simulator</p>
        </div>
        <p className="label tabular-nums">
          {REQUESTS} requests · {ITEMS.length} requested items
        </p>
      </div>

      <div className="border-b border-line-soft bg-surface px-5 py-4">
        <p className="label mb-3">How should the service handle matching requests?</p>
        <div className="grid gap-px bg-line-soft sm:grid-cols-2">
          {[
            { share: true, title: "Share repeated work", detail: "One lookup per item" },
            { share: false, title: "Repeat every lookup", detail: "One lookup per request" },
          ].map((mode) => {
            const selected = shareRepeatedWork === mode.share;
            return (
              <button
                key={mode.title}
                type="button"
                aria-pressed={selected}
                disabled={running}
                onClick={() => selectMode(mode.share)}
                className={`group min-h-16 px-4 py-3 text-left transition-colors duration-100 disabled:cursor-wait ${
                  selected
                    ? "bg-signal text-signal-fg"
                    : "bg-inset text-fg hover:bg-surface-2"
                }`}
              >
                <span className="mono block text-[12px] font-bold uppercase tracking-[0.08em]">
                  {selected ? "● " : "○ "}
                  {mode.title}
                </span>
                <span
                  className={`mt-1 block text-[12px] ${
                    selected ? "text-signal-fg/75" : "text-fg-3"
                  }`}
                >
                  {mode.detail}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-line-soft px-5 py-6">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="label">01 · Requests arrive together</span>
          <span className="mono text-[11px] tabular-nums text-fg-2">500 total</span>
        </div>
        <div
          className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(30,minmax(0,1fr))]"
          aria-hidden="true"
        >
          {Array.from({ length: FLOW_CELLS }, (_, index) => (
            <span
              key={`${runId}-${index}`}
              className={`h-3 bg-tech ${running ? "traffic-cell-arrive" : ""}`}
              style={{ animationDelay: `${index * 11}ms` }}
            />
          ))}
        </div>

        <div
          className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px bg-line-soft" />
          <span
            className={`label border px-3 py-1.5 ${
              shareRepeatedWork ? "border-data text-data" : "border-warn text-warn"
            }`}
          >
            02 · {shareRepeatedWork ? "Match and share" : "Send every lookup"}
          </span>
          <span className="h-px bg-line-soft" />
        </div>

        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="label">03 · Database handles the work</span>
          <span
            className={`mono text-[11px] font-bold tabular-nums ${
              shareRepeatedWork ? "text-data" : "text-warn"
            }`}
          >
            {resultReady ? `${databaseLookups} lookups` : "Waiting for requests"}
          </span>
        </div>

        <div className="grid gap-px bg-line-soft sm:grid-cols-3">
          {ITEMS.map((item, itemIndex) => {
            const lookupCount = shareRepeatedWork ? 1 : item.repeated;
            const visible = resultReady;
            return (
              <div key={item.key} className="bg-surface px-4 py-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="mono text-[11px] text-fg-2">{item.label}</span>
                  <span className="mono text-[11px] font-bold tabular-nums text-fg">
                    {visible
                      ? `${lookupCount} ${lookupCount === 1 ? "lookup" : "lookups"}`
                      : "Waiting"}
                  </span>
                </div>
                <div className="flex h-8 items-end gap-1" aria-hidden="true">
                  {Array.from({ length: shareRepeatedWork ? 1 : 12 }, (_, cellIndex) => (
                    <span
                      key={`${shareRepeatedWork}-${item.key}-${cellIndex}`}
                      className={`h-full flex-1 origin-bottom transition-opacity duration-100 ${
                        shareRepeatedWork ? "bg-data" : "bg-warn"
                      } ${
                        visible
                          ? phase === "database"
                            ? "traffic-cell-process"
                            : "opacity-100"
                          : "opacity-10"
                      }`}
                      style={{ animationDelay: `${itemIndex * 55 + cellIndex * 18}ms` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <dl
        className="grid gap-px border-b border-line-soft bg-line-soft sm:grid-cols-3"
        aria-label="Simulation results"
      >
        {[
          { label: "Incoming requests", value: REQUESTS.toString(), accent: "text-fg" },
          {
            label: "Database lookups",
            value: resultReady ? databaseLookups.toString() : "Waiting",
            accent: shareRepeatedWork ? "text-data" : "text-warn",
          },
          {
            label: "Duplicate lookups avoided",
            value: resultReady ? duplicateLookupsAvoided.toString() : "Waiting",
            accent: shareRepeatedWork ? "text-signal" : "text-fg-3",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface px-5 py-5">
            <dt className="label mb-3">{stat.label}</dt>
            <dd
              className={`mono text-[clamp(24px,4vw,38px)] leading-none tracking-[-0.06em] tabular-nums ${stat.accent}`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="bg-surface px-5 py-5">
        <p
          className="max-w-[70ch] text-[15px] leading-[1.7] text-fg-2"
          aria-live="polite"
        >
          {running && phase === "requests" ? (
            "Five hundred requests are arriving for the same three items."
          ) : running ? (
            shareRepeatedWork ? (
              "The service is grouping matching requests so they can reuse the same result."
            ) : (
              "The service is sending every request to the database as a separate lookup."
            )
          ) : shareRepeatedWork ? (
            <>
              The service handled <strong className="font-bold text-fg">500 requests</strong> with
              only <strong className="font-bold text-data">3 database lookups</strong>, one for each
              item. It avoided 497 copies of the same work.
            </>
          ) : (
            <>
              Without request sharing, the same traffic created{" "}
              <strong className="font-bold text-warn">500 database lookups</strong>. The database
              repeated work that three lookups could have handled.
            </>
          )}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
          <p className="label">
            Typical result · <span className="text-data">3 with sharing</span> ·{" "}
            <span className="text-warn">500 without</span>
          </p>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="label min-w-44 bg-fg px-5 py-3 text-center text-bg transition-colors duration-100 hover:bg-signal hover:text-signal-fg disabled:cursor-wait disabled:opacity-50"
          >
            {running ? "Traffic spike running…" : "Run traffic spike"}
          </button>
        </div>
      </div>
    </div>
  );
}

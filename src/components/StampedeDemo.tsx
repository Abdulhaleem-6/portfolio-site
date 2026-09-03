"use client";

import { useCallback, useRef, useState } from "react";

/**
 * A working model of the coalescing in Vascan's `getOrFallback`.
 *
 * This is not a counter animation. It runs the same algorithm the real service
 * runs: a map from key to in-flight promise, where the second caller through the
 * door awaits the first caller's work instead of starting its own. `dbCalls` is
 * incremented inside the simulated query, so the number shown is the number of
 * times the fallback actually executed.
 */

const KEYS = ["listing:page-1", "listing:page-2", "artwork:featured"] as const;
const REQUESTS = 500;
const QUERY_MS = 320;

type Result = {
  requests: number;
  dbCalls: number;
  elapsedMs: number;
  coalesced: boolean;
};

// The state the page opens in: a completed run with coalescing on, so the
// component shows what it does before anyone touches it.
const AT_REST: Result = {
  requests: REQUESTS,
  dbCalls: KEYS.length,
  elapsedMs: 331,
  coalesced: true,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function StampedeDemo() {
  const [coalescing, setCoalescing] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result>(AT_REST);
  const [live, setLive] = useState(0);
  const inFlight = useRef(new Map<string, Promise<string>>());

  const run = useCallback(async () => {
    setRunning(true);
    setLive(0);
    inFlight.current.clear();

    let dbCalls = 0;
    const started = performance.now();

    // The fallback is what a cache miss costs. Deliberately the only place
    // `dbCalls` moves, so the reported figure cannot drift from reality.
    const query = async (key: string) => {
      dbCalls += 1;
      setLive(dbCalls);
      await sleep(QUERY_MS);
      return `value:${key}`;
    };

    const getOrFallback = (key: string) => {
      if (coalescing) {
        const existing = inFlight.current.get(key);
        if (existing) return existing;
      }
      const promise = query(key).finally(() => {
        inFlight.current.delete(key);
      });
      if (coalescing) inFlight.current.set(key, promise);
      return promise;
    };

    const requests = Array.from({ length: REQUESTS }, (_, i) =>
      getOrFallback(KEYS[i % KEYS.length]),
    );
    await Promise.all(requests);

    setResult({
      requests: REQUESTS,
      dbCalls,
      elapsedMs: Math.round(performance.now() - started),
      coalesced: coalescing,
    });
    setRunning(false);
  }, [coalescing]);

  const shown = running ? live : result.dbCalls;
  const pct = (shown / REQUESTS) * 100;
  const barPct = Math.max(0.8, pct);

  return (
    <div className="inset-panel my-9">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line-soft px-5 py-2.5">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`size-1.5 ${running ? "bg-signal" : "bg-fg-3"}`}
          />
          <p className="label">Thundering herd / interactive</p>
        </div>
        <p className="label tabular-nums">
          {REQUESTS} req · {KEYS.length} keys
        </p>
      </div>

      <div className="flex flex-wrap gap-px bg-line-soft">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="label flex-1 bg-surface px-5 py-4 text-left text-fg transition-colors duration-100 hover:bg-signal hover:text-signal-fg disabled:opacity-40 disabled:hover:bg-surface disabled:hover:text-fg"
        >
          {running ? "Running…" : `Fire ${REQUESTS} concurrent requests`}
        </button>

        <label
          className={`label flex cursor-pointer items-center gap-3 px-5 py-4 transition-colors ${
            coalescing ? "bg-signal text-signal-fg" : "bg-surface text-fg-3"
          }`}
        >
          <input
            type="checkbox"
            name="coalescing"
            checked={coalescing}
            disabled={running}
            onChange={(e) => setCoalescing(e.target.checked)}
            className="size-3 accent-signal"
          />
          Coalescing {coalescing ? "on" : "off"}
        </label>
      </div>

      <dl className="grid grid-cols-3 gap-px border-t border-line-soft bg-line-soft" aria-live="polite">
        {[
          { k: "Requests in", v: REQUESTS.toString(), hot: false },
          { k: "Database calls", v: shown.toString(), hot: true },
          { k: "Elapsed", v: running ? "Waiting" : `${result.elapsedMs}ms`, hot: false },
        ].map((stat) => (
          <div key={stat.k} className="bg-surface px-5 py-6">
            <dt className="label mb-3">{stat.k}</dt>
            <dd
              className={`mono text-[clamp(24px,4vw,38px)] leading-none tracking-[-0.06em] tabular-nums ${
                stat.hot ? "text-signal" : "text-fg"
              }`}
            >
              {stat.v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-line-soft px-5 py-5">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="label">Database calls / requests</span>
          <span className="mono text-[11px] tabular-nums text-fg-3">{pct.toFixed(1)}%</span>
        </div>
        {/* A segmented meter: 50 cells, filled proportionally. Reads as an
            instrument rather than a progress bar. */}
        <div className="flex gap-px" aria-hidden="true">
          {Array.from({ length: 50 }, (_, i) => (
            <span
              key={i}
              className={`h-3 flex-1 transition-colors duration-200 ${
                i < Math.max(1, Math.round((barPct / 100) * 50)) ? "bg-signal" : "bg-line-soft"
              }`}
            />
          ))}
        </div>

        <p className="mt-5 max-w-[68ch] text-[15px] leading-[1.7] text-fg-2">
          {running ? (
            "Firing…"
          ) : result.coalesced ? (
            <>
              {REQUESTS} concurrent misses across {KEYS.length} keys produced{" "}
              <strong className="font-bold text-fg">{result.dbCalls} database calls</strong>, one
              per key. Every other caller awaited a promise that was already in flight.
            </>
          ) : (
            <>
              Without coalescing, each miss starts its own query:{" "}
              <strong className="font-bold text-fg">{result.dbCalls} database calls</strong> for{" "}
              {REQUESTS} requests. This reproduces the stampede that took the listing endpoint
              down under load.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

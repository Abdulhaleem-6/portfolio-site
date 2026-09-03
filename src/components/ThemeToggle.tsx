"use client";

import { useEffect, useRef, useState, type AnimationEvent } from "react";

type Choice = "light" | "dark" | "system";
type SwapPhase = "idle" | "leave" | "enter";

const NEXT: Record<Choice, Choice> = { system: "light", light: "dark", dark: "system" };
const LABEL: Record<Choice, string> = { system: "SYS", light: "LGT", dark: "DRK" };
const FULL: Record<Choice, string> = { system: "System", light: "Light", dark: "Dark" };

export function ThemeToggle() {
  // Starts as `system` on both server and client so the first paint matches. The
  // stored choice is read in an effect, and the pre-paint script in the document
  // head has already stamped the element, so nothing flashes.
  const [choice, setChoice] = useState<Choice>("system");
  const [visibleChoice, setVisibleChoice] = useState<Choice>("system");
  const [swapPhase, setSwapPhase] = useState<SwapPhase>("idle");
  const targetChoice = useRef<Choice>("system");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        targetChoice.current = stored;
        setChoice(stored);
        setVisibleChoice(stored);
      }
    } catch {
      /* private mode or blocked storage: the system default is a fine fallback */
    }
  }, []);

  function apply(next: Choice) {
    targetChoice.current = next;
    setChoice(next);
    setSwapPhase("leave");

    const root = document.documentElement;
    if (next === "system") {
      root.removeAttribute("data-theme");
      try {
        localStorage.removeItem("theme");
      } catch {}
    } else {
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
  }

  function handleSwapEnd(event: AnimationEvent<HTMLSpanElement>) {
    if (event.target !== event.currentTarget) return;

    if (swapPhase === "leave") {
      setVisibleChoice(targetChoice.current);
      setSwapPhase("enter");
      return;
    }

    if (swapPhase === "enter") {
      setSwapPhase(visibleChoice === targetChoice.current ? "idle" : "leave");
    }
  }

  const swapClass =
    swapPhase === "idle" ? "" : `theme-swap-${swapPhase}-active`;

  return (
    <button
      type="button"
      onClick={() => apply(NEXT[choice])}
      aria-label={`Theme: ${FULL[choice]}. Switch to ${FULL[NEXT[choice]]}.`}
      className="label theme-toggle flex w-[62px] items-center justify-center border-l border-line-soft hover:text-signal active:scale-95"
    >
      <span className="theme-swap-stage" aria-hidden="true">
        <span
          className={`theme-swap-label ${swapClass}`}
          onAnimationEnd={handleSwapEnd}
        >
          {LABEL[visibleChoice]}
        </span>
      </span>
    </button>
  );
}

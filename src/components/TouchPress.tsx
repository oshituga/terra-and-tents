"use client";

import { useEffect } from "react";

const TARGET = "a, button, [role='button']";
// Long enough for the press to read clearly, short enough to feel instant.
const HOLD_MS = 550;

/**
 * Touch screens have no hover, so a tap marks the pressed link or button
 * with data-pressed for a moment. The CSS plays the hover's swap and
 * underline on it, plus a small press-in.
 */
export function TouchPress() {
  useEffect(() => {
    const timers = new WeakMap<Element, number>();
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest(TARGET);
      if (!el) return;
      el.setAttribute("data-pressed", "");
      const prev = timers.get(el);
      if (prev) window.clearTimeout(prev);
      timers.set(
        el,
        window.setTimeout(() => el.removeAttribute("data-pressed"), HOLD_MS),
      );
    };
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}

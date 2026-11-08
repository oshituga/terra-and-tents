import type { CSSProperties } from "react";

/**
 * Hover label: the letters roll up one after another while a second copy
 * rolls in from below. Screen readers hear the label once.
 */
export function SwapText({ children }: { children: string }) {
  const letters = [...children].map((ch, i) => (
    <span key={i} className="swap-ch" style={{ "--i": i } as CSSProperties}>
      {ch === " " ? " " : ch}
    </span>
  ));
  return (
    <span className="swap">
      <span className="sr-only">{children}</span>
      <span aria-hidden className="swap-out">
        {letters}
      </span>
      <span aria-hidden className="swap-in">
        {letters}
      </span>
    </span>
  );
}

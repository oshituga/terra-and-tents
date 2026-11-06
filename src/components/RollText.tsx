import type { CSSProperties } from "react";

export function RollText({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="roll">
        {[...children].map((char, i) => (
          <span
            key={i}
            className="roll-char"
            style={{ "--i": i } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}

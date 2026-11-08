import type { CSSProperties } from "react";
import { InView } from "./InView";

export function FadeIn({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <InView
      className={`fade-in max-w-full ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </InView>
  );
}

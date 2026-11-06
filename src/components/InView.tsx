"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function InView({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Wait until it is properly on screen, or nearly fully visible for anything at
    // the very end of the page that can never scroll past the bottom tenth.
    const observers = [
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
      { threshold: 0.9 },
    ].map((options) => {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observers.forEach((o) => o.disconnect());
        }
      }, options);
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      ref={ref}
      data-in={shown ? "" : undefined}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
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

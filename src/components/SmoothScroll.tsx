"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function SmoothScroll() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );

  if (reduced) return null;
  return <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }} />;
}

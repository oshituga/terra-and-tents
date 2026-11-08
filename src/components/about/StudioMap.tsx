"use client";

import { useEffect, useRef } from "react";
import type { LocationMap } from "@/lib/location-map";

// Size of the map artwork in map pixels (see public/map/map-data.json).
const ART_W = 2000;
const ART_H = 1407.8;

export function StudioMap({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: LocationMap | undefined;
    let cancelled = false;

    import("@/lib/location-map.js").then(async ({ createLocationMap }) => {
      const el = ref.current;
      if (!el || cancelled) return;
      // Open at the artwork's natural size, as in the Figma frame.
      const fit = Math.max(el.clientWidth / ART_W, el.clientHeight / ART_H);
      map = await createLocationMap(el, {
        svgUrl: "/map/location-map.svg",
        dataUrl: "/map/map-data.json",
        initialZoom: Math.max(1, 1 / fit),
      });
      if (cancelled) map.destroy();
    });

    return () => {
      cancelled = true;
      map?.destroy();
    };
  }, []);

  return <div ref={ref} className={className} />;
}

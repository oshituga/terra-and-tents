"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

export type TickerPhoto = { src: StaticImageData; alt: string } | null;

// Placeholder tiles (null items) take these tones in turn.
const placeholderTones = ["bg-oat", "bg-clay", "bg-tan", "bg-clay/60"];

// Slot sizes from the 1440px design, left to right. The two end slots sit off
// screen. Each photo is drawn at the largest size and moved and scaled, which
// keeps the motion on the compositor instead of re-laying out every frame.
const slots = [
  [27, 222],
  [206, 275],
  [248, 330],
  [289, 386],
  [331, 441],
  [293, 391],
  [252, 336],
  [211, 281],
  [47, 225],
];
const GAP = 8;
const START =
  (1440 - (slots.reduce((sum, [w]) => sum + w, 0) + GAP * (slots.length - 1))) /
  2;
const lefts = slots.map((_, i) =>
  slots.slice(0, i).reduce((x, [w]) => x + w + GAP, START),
);
const widths = slots.map(([w]) => w);
const heights = slots.map(([, h]) => h);
const TILE_W = 331;
const TILE_H = 441;
const LAST = slots.length - 1;
const SLOT_MS = 2600;

// Catmull-Rom curve through the slot values, so size and speed change
// gradually instead of jumping at each slot.
function along(values: number[], f: number) {
  const k = Math.floor(f);
  const t = f - k;
  const at = (i: number) => values[Math.max(0, Math.min(LAST, i))];
  const [p0, p1, p2, p3] = [at(k - 1), at(k), at(k + 1), at(k + 2)];
  return (
    0.5 *
    (2 * p1 +
      (p2 - p0) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
      (3 * p1 - p0 - 3 * p2 + p3) * t * t * t)
  );
}

// Lay the photos out edge to edge from the leftmost one, always GAP apart,
// so they can never overlap. At whole slot positions this is the design.
function layout(t: number, n: number) {
  const order = Array.from({ length: n }, (_, i) => i)
    .map((i) => ({ i, f: (((i - t) % n) + n) % n }))
    .sort((a, b) => a.f - b.f);
  const out: string[] = [];
  let x = along(lefts, order[0].f);
  for (const { i, f } of order) {
    const slot = Math.min(f, LAST);
    const w = along(widths, slot);
    const h = along(heights, slot);
    const left = f > LAST ? lefts[LAST] : x;
    out[i] =
      `translate3d(${(left / 14.4).toFixed(4)}cqw, 0, 0) ` +
      `scale(${(w / TILE_W).toFixed(4)}, ${(h / TILE_H).toFixed(4)})`;
    x += w + GAP;
  }
  return out;
}

/**
 * The edge-to-edge ticker from the Home details section: photos drift left,
 * growing towards the centre slot and shrinking away from it. Hovering eases
 * it down. Pass null items for placeholder tiles.
 */
export function PhotoTicker({
  items,
  align = "bottom",
  aspect = "aspect-[1440/449]",
}: {
  items: TickerPhoto[];
  /** Tiles sit on a shared baseline, or are centred on one line. */
  align?: "bottom" | "center";
  /** Tailwind aspect class for the strip, from the 1440px design. */
  aspect?: string;
}) {
  const count = items.length;
  const initial = layout(0, count);
  const strip = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t = 0;
    let last = 0;
    let raf = 0;
    // Hovering eases the ticker down to a slower pace, and back up on leave.
    let speed = 1;
    let target = 1;
    const slow = () => (target = 0.45);
    const resume = () => (target = 1);
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", resume);

    const frame = (now: number) => {
      speed += (target - speed) * 0.05;
      if (last) t += ((now - last) / SLOT_MS) * speed;
      last = now;
      const transforms = layout(t, count);
      tiles.current.forEach((tile, i) => {
        if (tile) tile.style.transform = transforms[i];
      });
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", resume);
    };
  }, [count]);

  return (
    <>
      {/* On smaller screens the strip is drawn wider than the screen and
          centred, so the photos keep a useful size. */}
      <div className="max-page overflow-hidden">
        <div
          ref={strip}
          className={`relative left-1/2 w-[250vw] ${aspect} -translate-x-1/2 overflow-hidden [container-type:inline-size] md:w-[160vw] lg:w-full`}
        >
          {items.map((item, i) => (
            <div
              key={i}
              ref={(node) => {
                tiles.current[i] = node;
              }}
              className={`absolute left-0 overflow-hidden will-change-transform ${align === "center" ? "top-0 origin-left" : "bottom-2 origin-bottom-left"} ${item ? "bg-clay" : placeholderTones[i % placeholderTones.length]}`}
              style={{
                width: "calc(100cqw * " + TILE_W / 1440 + ")",
                height: "calc(100cqw * " + TILE_H / 1440 + ")",
                transform: initial[i],
              }}
            >
              {item && (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 60vw"
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

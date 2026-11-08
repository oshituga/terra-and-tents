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
// The smallest scale at which the row still spans the full width.
export const MIN_FIT = 0.74;

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
type Frame = { u: number; dx: number; dy: number };

function layout(t: number, n: number, fr?: Frame) {
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
    // Before measuring (server render) positions are in cqw at design scale;
    // after, in pixels at the measured scale.
    const tx = fr
      ? `${(left * fr.u + fr.dx).toFixed(2)}px, ${fr.dy.toFixed(2)}px`
      : `${(left / 14.4).toFixed(4)}cqw, 0`;
    out[i] =
      `translate3d(${tx}, 0) ` +
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
  desktopWidth = "lg:w-full",
  designHeight = 449,
  fit = false,
}: {
  items: TickerPhoto[];
  /** Tiles sit on a shared baseline, or are centred on one line. */
  align?: "bottom" | "center";
  /** Tailwind aspect class for the strip, from the 1440px design. */
  aspect?: string;
  /** Tailwind width class for the strip in the desktop layout. */
  desktopWidth?: string;
  /** Height of the strip in the 1440px design. */
  designHeight?: number;
  /**
   * In the desktop layout, fill the parent's height: tiles scale down to fit
   * it while the row still runs edge to edge.
   */
  fit?: boolean;
}) {
  const count = items.length;
  const initial = layout(0, count);
  const strip = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;

    // Scale so the tiles fit both the strip's width and height, and centre
    // the row (which is wider than the design) on the strip.
    let fr: Frame = { u: 1, dx: 0, dy: 0 };
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      // Never so small that the row stops short of the edges.
      const u = Math.max(
        Math.min(W / 1440, H / designHeight),
        (W / 1440) * MIN_FIT,
      );
      const dx = (W - 1440 * u) / 2;
      const dy = align === "center" ? (H - TILE_H * u) / 2 : 0;
      fr = { u, dx, dy };
      el.style.setProperty("--u", `${u}px`);
    };
    const paint = (t: number) => {
      const transforms = layout(t, count, fr);
      tiles.current.forEach((tile, i) => {
        if (tile) tile.style.transform = transforms[i];
      });
    };
    let t = 0;
    measure();
    paint(0);
    const ro = new ResizeObserver(() => {
      measure();
      paint(t);
    });
    ro.observe(el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return () => ro.disconnect();

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
      paint(t);
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", resume);
    };
  }, [count, designHeight, align]);

  return (
    <>
      {/* On smaller screens the strip is drawn wider than the screen and
          centred, so the photos keep a useful size. */}
      <div className={`max-page overflow-hidden ${fit ? "lg:h-full" : ""}`}>
        <div
          ref={strip}
          className={`relative left-1/2 w-[250vw] ${aspect} -translate-x-1/2 overflow-hidden [container-type:inline-size] md:w-[160vw] ${desktopWidth} ${fit ? "lg:aspect-auto lg:h-full" : ""}`}
        >
          {items.map((item, i) => (
            <div
              key={i}
              ref={(node) => {
                tiles.current[i] = node;
              }}
              className={`absolute top-0 left-0 overflow-hidden will-change-transform ${align === "center" ? "origin-left" : "top-auto bottom-2 origin-bottom-left"} ${item ? "bg-clay" : placeholderTones[i % placeholderTones.length]}`}
              style={{
                width: `calc(var(--u, calc(100cqw / 1440)) * ${TILE_W})`,
                height: `calc(var(--u, calc(100cqw / 1440)) * ${TILE_H})`,
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

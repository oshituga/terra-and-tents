"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import d01 from "@/assets/details/detail-01.webp";
import d02 from "@/assets/details/detail-02.webp";
import d03 from "@/assets/details/detail-03.webp";
import d04 from "@/assets/details/detail-04.webp";
import d05 from "@/assets/details/detail-05.webp";
import d06 from "@/assets/details/detail-06.webp";
import d07 from "@/assets/details/detail-07.webp";
import d08 from "@/assets/details/detail-08.webp";
import d09 from "@/assets/details/detail-09.webp";
import d10 from "@/assets/details/detail-10.webp";
import d11 from "@/assets/details/detail-11.webp";
import d12 from "@/assets/details/detail-12.webp";

const photos: { src: StaticImageData; alt: string }[] = [
  {
    src: d01,
    alt: "A wooden ceremony frame wound with greenery beside lanterns on crates",
  },
  {
    src: d02,
    alt: "A macramé dreamcatcher and peach fabric hung from a tree branch",
  },
  {
    src: d03,
    alt: "A triangle arch with pampas grass against a weathered timber wall",
  },
  {
    src: d04,
    alt: "A round floral arch with pampas on a deck overlooking the sea",
  },
  {
    src: d05,
    alt: "A lakeside lounge under a white canopy with dried flowers and cushions",
  },
  {
    src: d06,
    alt: "Low wooden benches with woven cushions and pampas on dry grass",
  },
  {
    src: d07,
    alt: "A draped post with blue and white flowers beside white chairs in a garden",
  },
  {
    src: d08,
    alt: "A wooden jetty lined with white flowers leading to a flower-covered gazebo",
  },
  { src: d09, alt: "A small table with flowers under a parasol on a beach" },
  {
    src: d10,
    alt: "Woven pendant lanterns hanging from a tree above a garden party",
  },
  {
    src: d11,
    alt: "A tall triangle frame dressed with coral flowers on a hillside",
  },
  {
    src: d12,
    alt: "A macramé ceremony frame and a single chair in a dry meadow",
  },
];

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
function layout(t: number) {
  const n = photos.length;
  const order = photos
    .map((_, i) => ({ i, f: (((i - t) % n) + n) % n }))
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

const initial = layout(0);

export function Details() {
  const strip = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t = 0;
    let last = 0;
    let raf = 0;

    const frame = (now: number) => {
      if (last) t += (now - last) / SLOT_MS;
      last = now;
      const transforms = layout(t);
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
    };
  }, []);

  return (
    <section
      aria-label="Details"
      className="flex min-h-svh flex-col items-center justify-between gap-[130px] bg-cream pt-[70px] text-ink"
    >
      <div className="flex w-full flex-col gap-[14px]">
        <FadeIn className="flex justify-center px-8 py-10">
          <h2 className="w-[506px] text-center font-display text-display-m font-light uppercase">
            The details you only notice when you look twice
          </h2>
        </FadeIn>
        <FadeIn className="flex items-end justify-between px-8 py-5">
          <p className="w-[426px] text-body">
            Hand-tied posies, pressed linen, the candle that lasts until the
            final dance. We plan the small things as carefully as the big ones.
          </p>
          <ButtonLink href="/gallery" variant="underline" compact>
            Check out gallery
          </ButtonLink>
        </FadeIn>
      </div>

      <div
        ref={strip}
        className="relative aspect-[1440/449] w-full overflow-hidden [container-type:inline-size]"
      >
        {photos.map(({ src, alt }, i) => (
          <div
            key={src.src}
            ref={(node) => {
              tiles.current[i] = node;
            }}
            className="absolute bottom-2 left-0 origin-bottom-left overflow-hidden bg-clay will-change-transform"
            style={{
              width: "calc(100cqw * " + TILE_W / 1440 + ")",
              height: "calc(100cqw * " + TILE_H / 1440 + ")",
              transform: initial[i],
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="25vw"
              placeholder="blur"
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

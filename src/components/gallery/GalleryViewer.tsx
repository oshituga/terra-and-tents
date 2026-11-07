"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos } from "./photos";

// Thumbnail sizes from the Figma strip, slot by slot, used as proportions:
// the strip always runs edge to edge and each square takes its share. The
// active slot gets 108; the rest keep their own size so the rhythm stays put.
const SLOT = [
  32, 47, 39, 54, 35, 51, 42, 58, 37, 53, 46, 60, 50, 49, 40, 56, 33, 53, 44,
  61, 37, 51, 40, 56, 35,
];
const ACTIVE = 108;

// Figma fades thumbs from 0.49 next to the active one to 0.36 twelve away.
const opacityAt = (d: number) =>
  d === 0 ? 1 : Math.max(0.36, 0.49 - ((d - 1) * 0.13) / 11);

const START = 12;

export function GalleryViewer() {
  const [active, setActive] = useState(START);
  const [prev, setPrev] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  const strip = useRef<HTMLDivElement>(null);

  // When the strip scrolls (smaller screens), keep the chosen thumb centred.
  useEffect(() => {
    const row = strip.current;
    const thumb = thumbs.current[active];
    if (!row || !thumb || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: thumb.offsetLeft - (row.clientWidth - thumb.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const show = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const to =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? photos.length - 1
          : step
            ? (active + step + photos.length) % photos.length
            : -1;
    if (to < 0) return;
    e.preventDefault();
    show(to);
    thumbs.current[to]?.focus();
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="max-page flex max-h-[715px] min-h-0 lg:flex-1">
        <div
          role="img"
          aria-roledescription="gallery photo"
          aria-label={photos[active].alt}
          className="relative aspect-[1039/715] w-full max-w-full overflow-hidden bg-oat lg:h-full lg:max-h-[715px] lg:min-h-40 lg:w-auto"
        >
          {[prev, active].map((i) =>
            i === null ? null : (
              <div
                key={i}
                aria-hidden
                className={`absolute inset-0 ${i === active ? "gallery-photo" : ""}`}
                onAnimationEnd={() => setPrev(null)}
              >
                <Image
                  src={photos[i].src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  placeholder="blur"
                  quality={90}
                  preload={i === START}
                  className="object-cover"
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* The strip's height is fixed to the selected square's (108 of the
          1217 Figma units across the width), so hovering a thumb never
          changes it and the photo above stays still. */}
      <div className="@container px-page">
        <div
          ref={strip}
          role="group"
          aria-label="Choose a photo"
          className="max-page relative flex h-[108px] items-end gap-[6.625px] overflow-x-auto [scrollbar-width:none] lg:h-[calc((100cqw-159px)*108/1217)] lg:overflow-visible"
          onKeyDown={onKey}
        >
          {photos.map((photo, i) => {
            const size = i === active ? ACTIVE : SLOT[i];
            return (
              <button
                key={photo.src.src}
                ref={(el) => {
                  thumbs.current[i] = el;
                }}
                type="button"
                tabIndex={i === active ? 0 : -1}
                aria-label={`Photo ${i + 1} of ${photos.length}: ${photo.alt}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => show(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") show(i);
                }}
                style={
                  {
                    "--size": size,
                    opacity: opacityAt(Math.abs(i - active)),
                  } as React.CSSProperties
                }
                className="gallery-thumb relative overflow-hidden outline-none"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="108px"
                  quality={90}
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

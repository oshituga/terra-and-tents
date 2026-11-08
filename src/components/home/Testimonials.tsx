"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import { weddings } from "@/lib/weddings";

// One quote per wedding, over that wedding's photo.
const quotes = weddings.map((w) => ({
  quote: w.testimonial.quote,
  by: `${w.couple}, ${w.region}`,
  src: w.testimonial.photo.src,
  alt: w.testimonial.photo.alt,
  position: w.testimonial.photo.position,
}));

const ADVANCE_MS = 8000;

export function Testimonials() {
  const [{ active, prev, dir }, setSlide] = useState({
    active: 0,
    prev: -1,
    dir: 0,
  });
  const [paused, setPaused] = useState(false);

  const go = (step: number) =>
    setSlide((s) => ({
      active: (s.active + step + quotes.length) % quotes.length,
      prev: s.active,
      dir: step,
    }));

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(1), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  const slideState = (i: number) => {
    const way = dir > 0 ? "next" : "prev";
    if (i === active) return dir === 0 ? "still" : `in-${way}`;
    if (i === prev) return `out-${way}`;
    return undefined;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What couples say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate flex min-h-svh flex-col items-end justify-center gap-20 overflow-hidden bg-ink px-page py-8 text-cream"
    >
      <div className="absolute inset-0 -z-20 isolate">
        {quotes.map(({ src, alt, position }, i) => (
          <div
            key={src.src}
            aria-hidden={i !== active}
            className="tslide absolute inset-0"
            data-state={slideState(i)}
          >
            <ParallaxImage
              src={src}
              alt={alt}
              sizes="100vw"
              position={position}
            />
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/40" />

      <FadeIn className="flex items-center gap-10">
        <ArrowButton label="Previous testimonial" onClick={() => go(-1)} />
        <ArrowButton label="Next testimonial" onClick={() => go(1)} flip />
      </FadeIn>

      <FadeIn className="grid w-full grid-cols-1">
        {quotes.map(({ quote, by }, i) => (
          <figure
            key={by}
            aria-hidden={i !== active}
            data-active={i === active ? "" : undefined}
            className="slide-text col-start-1 row-start-1 flex flex-col items-start justify-end gap-8 font-display font-light uppercase lg:flex-row lg:items-end lg:justify-between"
          >
            <blockquote className="w-[553px] max-w-full text-display-m">
              <p>{quote}</p>
            </blockquote>
            <figcaption className="text-display-s lg:whitespace-nowrap">
              - {by}
            </figcaption>
          </figure>
        ))}
      </FadeIn>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group relative flex items-center justify-center px-6 pt-[15px] pb-[16.5px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
    >
      <Image
        src="/brand/arrow-left.svg"
        alt=""
        width={24}
        height={24}
        className={`arrow-nudge ${flip ? "arrow-next -scale-x-100" : ""}`}
      />
      <span aria-hidden className="underline-line" />
    </button>
  );
}

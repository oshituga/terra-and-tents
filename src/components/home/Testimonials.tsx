"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import majaOliver from "@/assets/quote-maja-oliver.webp";
import amaraJames from "@/assets/quote-amara-james.webp";
import islaBen from "@/assets/quote-isla-ben.webp";

const quotes = [
  {
    quote:
      "The moment we walked in, we stopped talking. It looked better than anything we had pictured, and it felt like us.",
    by: "Maja & Oliver, Dalarna, Sweden",
    src: majaOliver,
    alt: "A newly married couple kissing in a long grass meadow below red farm barns and pine trees under a cloudy sky",
  },
  {
    quote:
      "We asked for one long table under the trees. They built it, lit it and somehow made forty guests feel like family.",
    by: "Amara & James, Herefordshire",
    src: amaraJames,
    alt: "A long dinner table with orange chairs, flowers and candles set beneath trees in the evening",
  },
  {
    quote:
      "The arch framed the sea exactly where we stood. Every guest took the same photo, and it is still on our wall.",
    by: "Isla & Ben, Isle of Wight",
    src: islaBen,
    alt: "A flower arch of white blooms and greenery on a stone terrace above the sea",
  },
];

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
      className="relative isolate flex min-h-svh flex-col items-end justify-center gap-20 overflow-hidden bg-ink p-8 text-cream"
    >
      <div className="absolute inset-0 -z-20 isolate">
        {quotes.map(({ src, alt }, i) => (
          <div
            key={src.src}
            aria-hidden={i !== active}
            className="tslide absolute inset-0"
            data-state={slideState(i)}
          >
            <ParallaxImage src={src} alt={alt} sizes="100vw" />
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/40" />

      <FadeIn className="flex items-center gap-10">
        <ArrowButton label="Previous testimonial" onClick={() => go(-1)} />
        <ArrowButton label="Next testimonial" onClick={() => go(1)} flip />
      </FadeIn>

      <FadeIn className="grid w-full">
        {quotes.map(({ quote, by }, i) => (
          <figure
            key={by}
            aria-hidden={i !== active}
            data-active={i === active ? "" : undefined}
            className="slide-text col-start-1 row-start-1 flex items-end justify-between gap-8 font-display font-light uppercase"
          >
            <blockquote className="w-[553px] text-display-m">
              <p>“{quote}”</p>
            </blockquote>
            <figcaption className="text-display-s whitespace-nowrap">
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
      className="group relative flex items-center justify-center px-6 py-[15px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
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

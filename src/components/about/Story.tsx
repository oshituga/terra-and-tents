"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { FadeIn } from "../FadeIn";
import field from "@/assets/about-story-field.webp";
import tent from "@/assets/about-story-tent.webp";
import longTable from "@/assets/about-story-long-table.webp";
import flowers from "@/assets/about-story-flowers.webp";
import candles from "@/assets/about-story-candles.webp";
import feeling from "@/assets/about-story-feeling.webp";

const photos = [
  {
    src: field,
    alt: "A grassy field sloping toward a line of trees in low evening sun",
  },
  {
    src: tent,
    alt: "Canvas bell tents pitched on a grassy field beside a hedge",
  },
  {
    src: longTable,
    alt: "One long dinner table set on a lawn beneath trees and strings of lights",
  },
  {
    src: flowers,
    alt: "A jar of small white flowers tied with twine and lace on a table",
  },
  {
    src: candles,
    alt: "Pillar and taper candles glowing on a table as the sun sets",
  },
  {
    src: feeling,
    alt: "A timber pavilion glowing from inside at dusk, full of guests, with trees behind",
  },
];

const beats = [
  {
    title: "One borrowed field",
    body: "Our first wedding had no venue, only a friend’s family farm and a stretch of grass that sloped toward the trees. It taught us to start with the ground and let the room grow from what was already there.",
  },
  {
    title: "A rented tent",
    body: "We hired the last marquee left in the county and pitched it ourselves, a little crooked, in the wrong corner of the field. It showed us that the frame matters less than where you place it and how the light comes in.",
  },
  {
    title: "One long table",
    body: "There was no room for round tables, so we ran one long table down the middle and sat everyone together. Strangers were passing bread by the second course, and we have set a long table at almost every wedding since.",
  },
  {
    title: "Flowers from the garden",
    body: "The flowers came from the farm’s own borders and the lane outside, cut that morning and put in jam jars. Nothing matched and everything belonged, which is still how we choose: from the season and the place, never a catalogue.",
  },
  {
    title: "A lot of candles",
    body: "There was no power in the field, so we bought every candle we could find. As the sun went down the tent began to glow from the inside, and we learned that the best lighting is often the oldest kind.",
  },
  {
    title: "The way it felt",
    body: "Guests stayed long after the music stopped, and some still talk about that night. A room that grows out of its ground and its people is what we have tried to make at every wedding since.",
  },
];

export function AboutStory() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const el = section.current;
    const stuck = pin.current;
    if (!el || !stuck) return;
    let frame = 0;
    let stickTop = 0;

    // Pin for a screen and a half of scrolling; taller-than-screen content
    // locks with its bottom edge on the screen's bottom edge.
    const measure = () => {
      stickTop = Math.min(0, window.innerHeight - stuck.offsetHeight);
      stuck.style.top = `${stickTop}px`;
      el.style.height = `${stuck.offsetHeight + window.innerHeight * 1.5}px`;
    };

    const update = () => {
      frame = 0;
      const total = el.offsetHeight - stuck.offsetHeight;
      const p = (stickTop - el.getBoundingClientRect().top) / total;
      const next = Math.min(
        beats.length - 1,
        Math.max(0, Math.floor(p * beats.length)),
      );
      setActive(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goTo = (i: number) => {
    const el = section.current;
    const stuck = pin.current;
    if (!el || !stuck) return;
    const stickTop = Math.min(0, window.innerHeight - stuck.offsetHeight);
    const total = el.offsetHeight - stuck.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top - stickTop + ((i + 0.5) / beats.length) * total;
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={section}
      aria-label="How it began"
      className="relative bg-cream text-ink"
    >
      <div
        ref={pin}
        className="sticky top-0 flex min-h-svh flex-col justify-center gap-[14px] pt-[70px]"
      >
        <FadeIn className="flex justify-center px-page py-10">
          <h2 className="w-[539px] text-center font-display text-display-m font-light uppercase">
            It began with one borrowed field and a lot of candles
          </h2>
        </FadeIn>

        <FadeIn className="px-page py-5">
          <p className="w-[574px] text-body">
            Our first wedding was a friend’s, held on her family’s farm in late
            September. We had a rented tent, an armful of garden flowers and no
            idea what we were doing. By evening the candles were lit, the field
            had gone gold, and the whole room felt as if it had grown there. We
            have chased that feeling at every wedding since.
          </p>
        </FadeIn>

        <div className="max-page flex items-stretch gap-[114px]">
          <div className="relative h-[625px] min-w-0 flex-1 overflow-hidden bg-oat">
            {photos.map(({ src, alt }, i) => (
              <div
                key={src.src}
                aria-hidden={i !== active}
                data-active={i === active ? "" : undefined}
                className="story-photo absolute inset-0"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex w-[638px] shrink-0 flex-col justify-between">
            <ol className="flex flex-col">
              {beats.map(({ title }, i) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? "step" : undefined}
                    className="beat flex w-full items-center gap-4 border-b border-ink/20 py-[11px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                  >
                    <span className="beat-num text-[13px] tracking-[-0.03em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="beat-title text-body">{title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="grid pr-8 pb-8">
              {beats.map(({ title, body }, i) => (
                <p
                  key={title}
                  aria-hidden={i !== active}
                  data-active={i === active ? "" : undefined}
                  className="slide-text col-start-1 row-start-1 text-body"
                >
                  {body}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

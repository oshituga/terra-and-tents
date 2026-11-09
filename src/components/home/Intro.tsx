"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import intro1 from "@/assets/intro-1.webp";
import intro2 from "@/assets/intro-2.webp";
import intro3 from "@/assets/intro-3.webp";
import intro4 from "@/assets/intro-4.webp";

const statement =
  "Terra & Tent styles weddings held outdoors. We work under canvas, between trees, and on land that was borrowed for the day. Our flowers are real, our linen is raw, and our lighting is whatever the evening gives us.";

const words = statement.split(" ");

const photos = [
  {
    src: intro1,
    alt: "A stone chapel dressed with pampas grass at the end of a white aisle lined with dried grasses",
  },
  {
    src: intro2,
    alt: "A rustic timber door standing at the end of an orchard lawn set with rows of chairs",
  },
  {
    src: intro3,
    alt: "A tunnel of greenery arches over a stone path between palm trees",
  },
  {
    src: intro4,
    alt: "A timber triangle arch dressed with flowers on a lakeside deck at dusk",
  },
];

export function Intro() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const stuck = pin.current;
    const row = track.current;
    if (!el || !stuck || !row) return;

    let frame = 0;

    // When the pinned content is taller than the screen, lock it with its
    // bottom edge on the screen's bottom edge instead of cutting it off.
    let stickTop = 0;

    const measure = () => {
      stickTop = Math.min(0, window.innerHeight - stuck.offsetHeight);
      stuck.style.top = `${stickTop}px`;
      el.style.height = `${stuck.offsetHeight + window.innerHeight}px`;
      const start = row.getBoundingClientRect().left;
      const centred = (window.innerWidth - row.scrollWidth) / 2;
      el.style.setProperty("--shift", `${Math.max(0, start - centred)}px`);
    };

    const getP = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - stuck.offsetHeight;
      return Math.min(1, Math.max(0, (stickTop - rect.top) / total));
    };

    const update = () => {
      frame = 0;
      el.style.setProperty("--p", getP().toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      el.style.setProperty("--p", "0");
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

  return (
    <section
      ref={section}
      aria-label="About the studio"
      className="relative h-[200svh] bg-cream text-ink"
    >
      <div
        ref={pin}
        className="sticky top-0 flex min-h-svh flex-col items-center justify-center gap-[14px] overflow-hidden pt-4 md:pt-[70px]"
      >
        <div className="max-w-full px-page py-3 md:py-10">
          <p
            className="w-[781px] max-w-full text-center font-display text-display-m font-light uppercase max-md:text-[min(26px,3.6svh)]"
            style={{ "--n": words.length } as CSSProperties}
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="reveal-word"
                style={{ "--i": i } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        <div className="w-full pl-gutter md:pl-[62vw]">
          <div ref={track} className="slide-track flex w-max gap-2">
            {photos.map(({ src, alt }) => (
              <div
                key={src.src}
                className="relative h-[min(96vw,34svh)] w-[calc(min(96vw,34svh)*0.75)] shrink-0 overflow-hidden md:h-[56vw] md:w-[42vw] lg:h-[min(37.986vw,820.5px)] lg:w-[min(28.611vw,618px)]"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 29vw, (min-width: 768px) 42vw, 72vw"
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 md:p-5">
          <ButtonLink href="/about" variant="underline" compact>
            Meet the studio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

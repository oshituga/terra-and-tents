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
    alt: "A ceremony canopy of red roses in a palace courtyard, seen through a carved stone arch",
  },
  {
    src: intro2,
    alt: "White draped chairs and a gold table set beneath a white canvas pergola on a lawn",
  },
  {
    src: intro3,
    alt: "Rows of white and gold chairs on a lawn beside a villa, with flower stands and a welcome sign",
  },
  {
    src: intro4,
    alt: "A couple holding hands beneath a wooden arch dressed in white roses, greenery and draped linen, with desert mountains behind",
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
        className="sticky top-0 flex min-h-svh flex-col items-center justify-center gap-[14px] overflow-hidden pt-[70px]"
      >
        <div className="px-8 py-10">
          <p
            className="w-[781px] text-center font-display text-display-m font-light uppercase"
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

        <div className="w-full pl-[62vw]">
          <div ref={track} className="slide-track flex w-max gap-2">
            {photos.map(({ src, alt }) => (
              <div
                key={src.src}
                className="relative h-[37.986vw] w-[28.611vw] shrink-0 overflow-hidden"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 29vw, 80vw"
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <ButtonLink href="/about" variant="underline" compact>
            Meet the studio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

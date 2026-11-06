"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import intro1 from "@/assets/intro-1.webp";
import intro2 from "@/assets/intro-2.webp";
import intro3 from "@/assets/intro-3.webp";

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
];

export function Intro() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const row = track.current;
    if (!el || !row) return;

    let frame = 0;

    const measure = () => {
      const start = row.getBoundingClientRect().left;
      const centred = (window.innerWidth - row.scrollWidth) / 2;
      el.style.setProperty("--shift", `${Math.max(0, start - centred)}px`);
    };

    const getP = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, -rect.top / total));
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
      <div className="sticky top-0 flex h-svh flex-col items-center gap-[14px] overflow-hidden pt-[70px]">
        <div className="px-8 py-10">
          <p
            className="w-[781px] text-center font-display text-[40px] leading-[0.88] font-light tracking-[-0.05em] uppercase"
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

        <div className="min-h-0 w-full flex-1 pl-[62vw]">
          <div ref={track} className="slide-track flex h-full w-max gap-2">
            {photos.map(({ src, alt }) => (
              <div
                key={src.src}
                className="relative aspect-[412/547] h-full shrink-0 overflow-hidden"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 80vw"
                  placeholder="blur"
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

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import service1 from "@/assets/service-1.webp";
import service2 from "@/assets/service-2.webp";
import service3 from "@/assets/service-3.webp";
import service4 from "@/assets/service-4.webp";

const services = [
  {
    title: "Styling & Design",
    body: "We shape the concept, mood and materials around the light on your site.",
    src: service1,
    alt: "A long wooden table set with glassware, linen napkins and small flowers in a dim room",
  },
  {
    title: "Florals & Botanicals",
    body: "Our flowers are real and seasonal, and we source them as close to the day as we can.",
    src: service2,
    alt: "A hanging installation of pink and white flowers above a woven rattan pendant light",
  },
  {
    title: "Tents & Structures",
    body: "We pitch the canvas, raise the arches and build the frames that hold the room together.",
    src: service3,
    alt: "Rows of white chairs under a clear marquee roof, with trees beyond the open side",
  },
  {
    title: "Tablescapes & Lighting",
    body: "We set the tables, the linen and the candlelight so the evening glows till the last guest.",
    src: service4,
    alt: "A dinner table with a tall taper candle, pink flowers in glass vases and a printed menu",
  },
];

export function Services() {
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const q = Math.min(1, Math.max(0, (vh - top) / (vh * 0.85)));
      el.style.setProperty("--q", q.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      aria-label="What we do"
      className="flex min-h-svh flex-col items-center gap-20 bg-ink pt-[70px] pb-5 text-cream"
    >
      <div className="flex w-full flex-col items-end px-page py-10">
        <FadeIn>
          <h2 className="w-[616px] text-center font-display text-display-m font-light uppercase">
            From an empty field to a room people talk about for years
          </h2>
        </FadeIn>
      </div>

      <div ref={row} className="flex w-full gap-3 px-page">
        {services.map(({ title, body, src, alt }, i) => (
          <article
            key={title}
            className="rise-card flex min-w-0 flex-1 flex-col gap-2"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="flex h-5 items-center">
              <h3 className="font-display text-display-s leading-[47px] font-light whitespace-nowrap uppercase">
                {title}
              </h3>
            </div>
            <div className="relative aspect-[335/547] w-full overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 25vw, 90vw"
                placeholder="blur"
                quality={90}
                className="object-cover"
              />
            </div>
            <p className="text-body">{body}</p>
          </article>
        ))}
      </div>

      <FadeIn className="mt-auto flex w-full items-end justify-between px-page py-5">
        <p className="w-[508px] text-body">
          We design the look, source the flowers, and build everything
          ourselves. That includes the tents, the arches, the tables and the
          lighting. Each wedding is planned around its own site, so the finished
          room feels like it belongs there.
        </p>
        <ButtonLink href="/weddings" variant="underline" compact>
          See our work
        </ButtonLink>
      </FadeIn>
    </section>
  );
}

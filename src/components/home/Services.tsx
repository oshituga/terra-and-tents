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

    const progress = (node: HTMLElement, vh: number) =>
      Math.min(
        1,
        Math.max(0, (vh - node.getBoundingClientRect().top) / (vh * 0.85)),
      );

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const cards = el.querySelectorAll<HTMLElement>(".rise-card");
      if (window.innerWidth >= 1024) {
        // One row: the cards rise in turn as the row comes up the screen.
        el.style.setProperty("--q", progress(el, vh).toFixed(4));
        cards.forEach((card) => card.style.removeProperty("--q"));
        return;
      }
      // Stacked: each card rises on its own as it reaches the screen.
      cards.forEach((card) => {
        const q =
          progress(card, vh) +
          (Number(card.style.getPropertyValue("--i")) || 0) * 0.12;
        card.style.setProperty("--q", Math.min(1.4, q).toFixed(4));
      });
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
          <h2 className="w-[616px] max-w-full text-center font-display text-display-m font-light uppercase">
            From an empty field to a room people talk about for years
          </h2>
        </FadeIn>
      </div>

      <div
        ref={row}
        className="grid w-full grid-cols-1 gap-x-3 gap-y-12 px-page md:grid-cols-2 lg:flex lg:gap-y-0"
      >
        {services.map(({ title, body, src, alt }, i) => (
          <article
            key={title}
            className="rise-card flex min-w-0 flex-1 flex-col gap-2"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="flex min-h-5 items-end min-[90rem]:h-5 min-[90rem]:items-center">
              <h3 className="font-display text-display-s font-light uppercase min-[90rem]:leading-[47px] min-[90rem]:whitespace-nowrap">
                {title}
              </h3>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[3/4] lg:aspect-[335/547]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                placeholder="blur"
                quality={90}
                className="object-cover"
              />
            </div>
            <p className="text-body">{body}</p>
          </article>
        ))}
      </div>

      <FadeIn className="mt-auto flex w-full flex-col items-start gap-8 px-page py-5 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
        <p className="w-[508px] max-w-full text-body">
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

"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import siteFirst from "@/assets/about-principle-site-first.webp";
import madeFromLand from "@/assets/about-principle-made-from-land.webp";
import ownHands from "@/assets/about-principle-own-hands.webp";
import nightEnds from "@/assets/about-principle-night-ends.webp";

const principles = [
  {
    label: "Site first",
    title: "Before anything else",
    body: "We visit your venue before we draw a single idea. We watch where the afternoon sun lands, how the wind moves through the trees and where the ground falls away, then design the room to sit comfortably in that landscape. Nothing is dropped in from a catalogue.",
    caption: "Your land has a story. We start by listening to it.",
    panel: "bg-cream",
    src: siteFirst,
    alt: "A figure in a red jacket walking through long dry meadow grass beneath old trees",
  },
  {
    label: "Real over artificial",
    title: "Made from the land",
    body: "Our flowers are cut in season, our linen is raw and our tables are solid timber. We never use dyed stems, plastic greenery or foam. The result ages beautifully across the evening, and it looks and smells like the place you chose to be married in.",
    caption: "If it didn’t grow, we didn’t use it.",
    panel: "bg-[#fefbe8]",
    src: madeFromLand,
    alt: "A single orange marigold floating on rippling blue water",
  },
  {
    label: "Built by us",
    title: "Our own hands",
    body: "The people who design your wedding are the people who build it. Our crew arrives early, raises the structures, hangs the lighting and styles every table themselves. There are no subcontractors to brief and nothing gets lost between the plan and the day.",
    caption: "The hands that plan your day are the hands that build it.",
    panel: "bg-oat",
    src: ownHands,
    alt: "White chairs and parasols set out on a lawn before a stone chapel as the crew finishes the set-up",
  },
  {
    label: "Nothing left behind",
    title: "When the night ends",
    body: "After the last dance, we stay. We clear every table, take down every light and return the field to how we found it, so your venue is left clean and your family wakes up to calm. The only trace of the night is the memory of it.",
    caption: "You bring the people. We take care of the rest.",
    panel: "bg-clay",
    src: nightEnds,
    alt: "Three crew members in orange overalls carrying folding chairs and kit toward a house",
  },
];

export function AboutPrinciples() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  // As the next card slides up over a stuck card, the stuck one eases back:
  // slightly smaller and dimmer.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      cards.current.forEach((card, i) => {
        const next = cards.current[i + 1];
        if (!card || !next) return;
        // Below the desktop layout the cards simply stack, with no easing back.
        if (getComputedStyle(card).position !== "sticky") {
          card.style.setProperty("--t", "0");
          return;
        }
        const stuckTop = parseFloat(getComputedStyle(card).top) || 0;
        const travel = vh - stuckTop;
        const t = Math.min(
          1,
          Math.max(0, (vh - next.getBoundingClientRect().top) / travel),
        );
        card.style.setProperty("--t", t.toFixed(3));
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
      aria-label="What we never compromise on"
      className="bg-ink pt-[70px] pb-[60px] text-cream"
    >
      <div className="flex flex-col items-end gap-10 px-page py-10 lg:gap-[50px]">
        <FadeIn>
          <h2 className="w-[384px] max-w-full text-right font-display text-display-m font-light uppercase">
            A few things we never compromise on.
          </h2>
        </FadeIn>

        <div className="flex w-full flex-col gap-16 xl:gap-[50px]">
          {principles.map((p, i) => (
            <div
              key={p.label}
              ref={(node) => {
                cards.current[i] = node;
              }}
              className="stack-card relative flex justify-center bg-ink xl:sticky xl:top-[max(0px,calc((100svh-845px)/2))]"
            >
              <article className="stack-card-inner relative flex w-full flex-col xl:block xl:h-[845px] xl:w-[1216px] xl:shrink-0">
                <div
                  className={`flex flex-col p-6 text-ink md:p-8 xl:absolute xl:top-0 xl:left-24 xl:h-[754px] xl:w-[1120px] ${p.panel}`}
                >
                  <FadeIn className="flex flex-1 flex-col justify-between gap-10 xl:gap-0 xl:pl-[743px]">
                    <p className="text-body">{p.label}</p>
                    <div className="flex flex-col gap-5">
                      <h3 className="font-display text-display-s font-light uppercase xl:whitespace-nowrap">
                        {p.title}
                      </h3>
                      <p className="text-body">{p.body}</p>
                    </div>
                  </FadeIn>
                </div>
                <div className="relative order-first h-[100vw] w-full overflow-hidden md:h-[64vw] xl:absolute xl:top-8 xl:left-0 xl:order-none xl:h-[751px] xl:w-[836px]">
                  <ParallaxImage
                    src={p.src}
                    alt={p.alt}
                    sizes="(min-width: 1280px) 836px, 100vw"
                  />
                </div>
                <p className="py-2.5 xl:absolute xl:top-[804px] xl:left-24 xl:w-[1120px] xl:px-8">
                  <span className="block w-[508px] max-w-full text-body">
                    {p.caption}
                  </span>
                </p>
              </article>
              <div
                aria-hidden
                className="stack-card-dim pointer-events-none absolute inset-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

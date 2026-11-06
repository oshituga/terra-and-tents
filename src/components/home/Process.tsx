import type { CSSProperties } from "react";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { InView } from "../InView";

const steps = [
  {
    title: "Discovery call",
    body: "We talk through your day, your venue and the feeling you want the room to have. We also ask about your guest count and the details you have been saving.",
  },
  {
    title: "Design",
    body: "We send you a full concept with a palette, material samples and a layout of the room. You can change anything until the plan feels right.",
  },
  {
    title: "Build",
    body: "We order the flowers, prepare every piece in our studio and visit your venue to plan the setup.",
  },
  {
    title: "The day",
    body: "Our crew installs everything and styles the room, then clears it all away at the end of the night.",
  },
];

export function Process() {
  return (
    <section
      aria-label="How we work"
      className="flex min-h-svh flex-col items-center gap-20 bg-ink pt-[70px] text-cream"
    >
      <FadeIn className="px-page py-10">
        <h2 className="w-[358px] text-center font-display text-display-m font-light uppercase">
          From first hello to the last candle
        </h2>
      </FadeIn>

      <div className="flex w-full justify-end px-page py-5">
        <FadeIn className="flex flex-col items-start gap-10">
          <p className="w-[508px] text-body">
            Every wedding follows the same four steps. They give us room to be
            thorough, and they keep you informed from the first call to the
            final guest.
          </p>
          <ButtonLink href="/contact" variant="underline" compact>
            Start planning
          </ButtonLink>
        </FadeIn>
      </div>

      <InView className="max-page mt-auto flex h-[519px] gap-2">
        {steps.map(({ title, body }, i) => (
          <article
            key={title}
            className="flex min-w-0 flex-1 flex-col gap-[37px]"
            style={{ "--i": i } as CSSProperties}
          >
            <h3 className="step-title pl-5 font-display text-display-s font-light uppercase">
              {title}
            </h3>
            <div
              className={`step-fill flex flex-1 items-end bg-cream pb-8 text-ink ${i === steps.length - 1 ? "px-8" : "px-5"}`}
            >
              <p className="step-text text-body">{body}</p>
            </div>
          </article>
        ))}
      </InView>
    </section>
  );
}

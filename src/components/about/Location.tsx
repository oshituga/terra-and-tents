import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { StudioMap } from "./StudioMap";

export function AboutLocation() {
  return (
    <section
      aria-label="Where we work"
      className="flex flex-col gap-[14px] bg-cream py-10 text-ink"
    >
      <div aria-hidden className="h-[74px]" />

      <div className="max-page flex flex-col gap-8 pl-8">
        <div className="flex items-start justify-between">
          <FadeIn>
            <p className="w-[438px] text-body">
              Our studio and garden sit in the Gloucestershire countryside, a
              short drive from some of England’s loveliest wedding land. From
              here we travel the length of the country and across Europe,
              bringing our own crew and everything the room needs.
            </p>
          </FadeIn>
          <FadeIn
            delay={80}
            className="flex flex-col items-end gap-10 pt-20 pr-8"
          >
            <h2 className="w-[435px] font-display text-display-m font-light uppercase">
              A little studio in the hills, with a tent that travels
            </h2>
            <ButtonLink href="/contact" variant="underline" compact>
              Plan your day
            </ButtonLink>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-8">
          <FadeIn>
            <StudioMap className="h-[688px] w-full" />
          </FadeIn>
          <FadeIn className="flex flex-col items-end gap-[14px] pr-8">
            <address className="w-[350px] font-display text-display-s font-light not-italic uppercase">
              14 Orchard Lane, Chipping Campden, GL55 6AB
            </address>
            <p className="w-full text-body">Address</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

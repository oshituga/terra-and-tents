import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import cta from "@/assets/cta.webp";

export function Cta() {
  return (
    <section
      aria-label="Start planning"
      className="relative isolate flex h-svh min-h-[640px] flex-col items-center justify-between overflow-hidden bg-ink px-page py-10 text-cream"
    >
      <div className="absolute inset-0 -z-20">
        <ParallaxImage
          src={cta}
          alt="A rustic wooden drinks cart with glass dispensers and glasses on a lawn, beside woven lanterns and a patterned rug"
          sizes="100vw"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/40" />

      <FadeIn>
        <h2 className="w-[668px] text-center font-display text-display-m font-light uppercase">
          Somewhere there is a field waiting to become your favourite room
        </h2>
      </FadeIn>

      <FadeIn delay={120}>
        <ButtonLink href="/contact" variant="underline" compact>
          Start planning your day
        </ButtonLink>
      </FadeIn>

      <FadeIn delay={240}>
        <p className="w-[776px] text-center text-body">
          Every wedding we style began with a date, a place and a feeling that
          was hard to put into words. Tell us yours, even if it is only half
          formed. We will listen, sketch the first ideas and show you how that
          empty ground could look by candlelight.
        </p>
      </FadeIn>
    </section>
  );
}

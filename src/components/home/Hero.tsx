import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import { Nav } from "../Nav";

export function Hero() {
  return (
    <section className="relative isolate flex h-[972px] flex-col overflow-hidden text-cream">
      <Image
        src="/images/home-hero.webp"
        alt="Rows of wooden folding chairs tied with white flowers on a lawn under tall trees, set for an outdoor ceremony"
        fill
        sizes="100vw"
        fetchPriority="high"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/30" />

      <Nav />

      <div className="flex flex-1 flex-col items-end justify-between px-8 pt-5 pb-[60px]">
        <div className="flex w-full flex-col gap-5">
          <p className="w-[508px] text-body">Terra &amp; Tent Studio</p>
          <div className="flex flex-col gap-1.5">
            <h1 className="w-[592px] font-display text-display-l font-light uppercase">
              Styled for the day you’ll remember
            </h1>
            <p className="w-[508px] text-body">
              From tablescapes to tents, we design and style weddings that feel
              like you, rooted in natural materials, warm light and real
              flowers.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <ButtonLink href="/contact" variant="solid">
            Begin your enquiry
          </ButtonLink>
          <ButtonLink href="/weddings" variant="underline">
            See our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

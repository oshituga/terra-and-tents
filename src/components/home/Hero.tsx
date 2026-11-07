import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import { Nav } from "../Nav";
import { delay } from "../motion";
import heroImage from "@/assets/home-hero.webp";

export function Hero() {
  return (
    <section className="relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden bg-ink text-cream">
      <Image
        src={heroImage}
        alt="Rows of wooden folding chairs tied with white flowers on a lawn under tall trees, set for an outdoor ceremony"
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        quality={90}
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/30" />

      <Nav />

      <div className="flex flex-1 flex-col items-end justify-between px-page pt-5 pb-[60px]">
        <div className="fade flex w-full flex-col gap-5" style={delay(350)}>
          <p className="w-[508px] max-w-full text-body">
            Terra &amp; Tent Studio
          </p>
          <div className="flex flex-col gap-1.5">
            <h1 className="w-[592px] max-w-full font-display text-display-l font-light uppercase">
              Styled for the day you’ll remember
            </h1>
            <p className="w-[508px] max-w-full text-body">
              From tablescapes to tents, we design and style weddings that feel
              like you, rooted in natural materials, warm light and real
              flowers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <ButtonLink
            href="/contact"
            variant="solid"
            className="fade"
            style={delay(600)}
          >
            Begin your enquiry
          </ButtonLink>
          <ButtonLink
            href="/weddings"
            variant="underline"
            className="fade"
            style={delay(680)}
          >
            See our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

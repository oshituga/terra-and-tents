import Image from "next/image";
import { ButtonLink } from "../ButtonLink";
import { Nav } from "../Nav";
import { delay } from "../motion";
import heroImage from "@/assets/home-hero.webp";

const headline = ["Styled for the day", "you’ll remember"];

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
        className="settle -z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/30" />

      <Nav />

      <div className="flex flex-1 flex-col items-end justify-between px-8 pt-5 pb-[60px]">
        <div className="flex w-full flex-col gap-5">
          <p className="rise w-[508px] text-body" style={delay(140)}>
            Terra &amp; Tent Studio
          </p>
          <div className="flex flex-col gap-1.5">
            <h1 className="w-[592px] font-display text-display-l font-light uppercase">
              {headline.map((line, i) => (
                <span key={line} className="rise-mask">
                  <span className="rise-line" style={delay(190 + i * 60)}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="rise w-[508px] text-body" style={delay(320)}>
              From tablescapes to tents, we design and style weddings that feel
              like you, rooted in natural materials, warm light and real
              flowers.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <ButtonLink
            href="/contact"
            variant="solid"
            className="rise"
            style={delay(420)}
          >
            Begin your enquiry
          </ButtonLink>
          <ButtonLink
            href="/weddings"
            variant="underline"
            className="rise"
            style={delay(480)}
          >
            See our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

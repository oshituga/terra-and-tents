import Image from "next/image";
import { Nav } from "../Nav";
import { delay } from "../motion";
import heroImage from "@/assets/about-hero.webp";

export function AboutHero() {
  return (
    <section className="relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden bg-ink text-cream">
      <Image
        src={heroImage}
        alt="Rows of wooden folding chairs and wild flowers on a lawn facing a small white chapel among trees"
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        quality={90}
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/30" />

      <Nav />

      <div className="flex flex-1 flex-col items-end justify-between gap-10 px-page py-10 lg:py-[60px]">
        <p className="fade w-full text-body" style={delay(350)}>
          <span className="block w-[508px] max-w-full">
            We are a small studio of designers, florists and builders. Every
            wedding we take on is planned around one piece of ground and the
            people standing on it.
          </span>
        </p>

        <div className="fade flex max-w-full flex-col gap-5" style={delay(550)}>
          <p className="w-[508px] max-w-full text-body">The studio</p>
          <h1 className="w-[592px] max-w-full font-display text-display-l font-light uppercase">
            We style the ground you were married on
          </h1>
        </div>
      </div>
    </section>
  );
}

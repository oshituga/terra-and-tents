import type { StaticImageData } from "next/image";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { PhotoTicker } from "../PhotoTicker";
import d01 from "@/assets/details/detail-01.webp";
import d02 from "@/assets/details/detail-02.webp";
import d03 from "@/assets/details/detail-03.webp";
import d04 from "@/assets/details/detail-04.webp";
import d05 from "@/assets/details/detail-05.webp";
import d06 from "@/assets/details/detail-06.webp";
import d07 from "@/assets/details/detail-07.webp";
import d08 from "@/assets/details/detail-08.webp";
import d09 from "@/assets/details/detail-09.webp";
import d10 from "@/assets/details/detail-10.webp";
import d11 from "@/assets/details/detail-11.webp";
import d12 from "@/assets/details/detail-12.webp";

const photos: { src: StaticImageData; alt: string }[] = [
  {
    src: d01,
    alt: "A wooden ceremony frame wound with greenery beside lanterns on crates",
  },
  {
    src: d02,
    alt: "A macramé dreamcatcher and peach fabric hung from a tree branch",
  },
  {
    src: d03,
    alt: "A triangle arch with pampas grass against a weathered timber wall",
  },
  {
    src: d04,
    alt: "A round floral arch with pampas on a deck overlooking the sea",
  },
  {
    src: d05,
    alt: "A lakeside lounge under a white canopy with dried flowers and cushions",
  },
  {
    src: d06,
    alt: "Low wooden benches with woven cushions and pampas on dry grass",
  },
  {
    src: d07,
    alt: "A draped post with blue and white flowers beside white chairs in a garden",
  },
  {
    src: d08,
    alt: "A wooden jetty lined with white flowers leading to a flower-covered gazebo",
  },
  { src: d09, alt: "A small table with flowers under a parasol on a beach" },
  {
    src: d10,
    alt: "Woven pendant lanterns hanging from a tree above a garden party",
  },
  {
    src: d11,
    alt: "A tall triangle frame dressed with coral flowers on a hillside",
  },
  {
    src: d12,
    alt: "A macramé ceremony frame and a single chair in a dry meadow",
  },
];

export function Details() {
  return (
    <section
      aria-label="Details"
      className="flex min-h-svh flex-col items-center justify-between gap-16 bg-cream pt-[70px] text-ink lg:gap-[130px]"
    >
      <div className="flex w-full flex-col gap-[14px]">
        <FadeIn className="flex justify-center px-page py-10">
          <h2 className="w-[506px] max-w-full text-center font-display text-display-m font-light uppercase">
            The details you only notice when you look twice
          </h2>
        </FadeIn>
        <FadeIn className="flex flex-col items-start gap-8 px-page py-5 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <p className="w-[426px] max-w-full text-body">
            Hand-tied posies, pressed linen, the candle that lasts until the
            final dance. We plan the small things as carefully as the big ones.
          </p>
          <ButtonLink href="/gallery" variant="underline" compact>
            Check out gallery
          </ButtonLink>
        </FadeIn>
      </div>

      <PhotoTicker items={photos} />
    </section>
  );
}

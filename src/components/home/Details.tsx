import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { PhotoTicker } from "../PhotoTicker";
import { photos as gallery } from "../gallery/photos";

// Twelve of the gallery photos, so the strip previews the Gallery page.
const photos = [
  gallery[3],
  gallery[8],
  gallery[4],
  gallery[12],
  gallery[0],
  gallery[20],
  gallery[14],
  gallery[24],
  gallery[16],
  gallery[10],
  gallery[18],
  gallery[21],
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
        <FadeIn className="flex flex-col items-center gap-8 px-page py-5 text-center lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:text-left">
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

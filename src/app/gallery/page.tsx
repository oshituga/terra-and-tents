import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Nav } from "@/components/Nav";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { delay } from "@/components/motion";

export const metadata: Metadata = {
  title: "Gallery | Terra & Tent",
  description:
    "The arches, aisles and long tables we have built, from lakeside docks to open lawns at golden hour.",
};

export default function Gallery() {
  return (
    <main className="flex min-h-svh flex-col bg-cream text-ink lg:h-svh lg:overflow-hidden">
      <Nav variant="light" />

      <header className="flex flex-col-reverse items-start gap-8 px-page pt-10 pb-5 lg:flex-row lg:justify-between lg:gap-0 lg:pt-[60px]">
        <div
          className="fade flex max-w-full flex-col items-start gap-2.5 lg:min-w-0 lg:flex-1 lg:pt-10"
          style={delay(450)}
        >
          <p className="w-[643px] max-w-full text-body">
            Every wedding we style begins with a place and ends with a feeling.
            These are the arches, aisles and long tables we have built, from
            lakeside docks to open lawns at golden hour.
          </p>
          <ButtonLink href="/weddings" variant="underline" compact>
            See our weddings
          </ButtonLink>
        </div>
        <div className="fade flex max-w-full flex-col gap-5" style={delay(350)}>
          <p className="text-body lg:text-right">Set and styled</p>
          <h1 className="font-display text-display-l font-light uppercase">
            Gallery
          </h1>
        </div>
      </header>

      <div className="fade flex min-h-0 flex-1 flex-col" style={delay(550)}>
        <GalleryViewer />
      </div>

      <div className="flex justify-end px-page pt-8 pb-5">
        <FadeIn>
          <p className="w-[648px] max-w-full text-body">
            Every photograph here began as a conversation about a lawn, a
            lakeshore or a long table under the trees. Tell us where you are
            dreaming of, and we will start shaping the details around it.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}

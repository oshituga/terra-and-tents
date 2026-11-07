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
    <main className="flex h-svh flex-col overflow-hidden bg-cream text-ink">
      <Nav variant="light" />

      <header className="flex items-start justify-between px-page pt-[60px] pb-5">
        <div
          className="fade flex w-[1026px] flex-col items-start gap-2.5 pt-10"
          style={delay(450)}
        >
          <p className="w-[643px] text-body">
            Every wedding we style begins with a place and ends with a feeling.
            These are the arches, aisles and long tables we have built, from
            lakeside docks to open lawns at golden hour.
          </p>
          <ButtonLink href="/weddings" variant="underline" compact>
            See our weddings
          </ButtonLink>
        </div>
        <div className="fade flex flex-col gap-5" style={delay(350)}>
          <p className="text-right text-body">Set and styled</p>
          <h1 className="font-display text-display-l font-light uppercase">
            Gallery
          </h1>
        </div>
      </header>

      <div className="fade flex min-h-0 flex-1 flex-col" style={delay(550)}>
        <GalleryViewer />
      </div>

      <div className="flex justify-end px-page py-5">
        <FadeIn>
          <p className="w-[648px] text-body">
            Every photograph here began as a conversation about a lawn, a
            lakeshore or a long table under the trees. Tell us where you are
            dreaming of, and we will start shaping the details around it.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}

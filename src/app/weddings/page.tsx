import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ParallaxImage } from "@/components/ParallaxImage";
import { PhotoTicker } from "@/components/PhotoTicker";
import { delay } from "@/components/motion";
import { weddings } from "@/lib/weddings";

export const metadata: Metadata = {
  title: "Weddings | Terra & Tent",
  description:
    "No two days we style look alike. Browse the weddings we have built, from quiet garden lunches to long marquee evenings.",
};

// Twelve placeholder tiles until the hero photos arrive.
const tickerItems = Array.from({ length: 12 }, () => null);

export default function Weddings() {
  return (
    <>
      <main className="bg-cream text-ink">
        {/* On desktop the nav and the opening section fill one screen; the
            ticker takes the height that is left, keeping its proportions. */}
        <div className="lg:flex lg:h-svh lg:min-h-[900px] lg:flex-col">
          <Nav variant="light" />

          <section
            aria-label="Our weddings"
            className="flex flex-col gap-10 py-10 lg:min-h-0 lg:flex-1 lg:gap-[51px] lg:py-[60px]"
          >
            <header className="flex justify-end px-page">
              <div
                className="fade flex w-[568px] max-w-full flex-col gap-5"
                style={delay(350)}
              >
                <p className="text-body">Our weddings</p>
                <h1 className="font-display text-display-l font-light uppercase">
                  Every wedding, a place of its own.
                </h1>
              </div>
            </header>

            <div
              className="fade lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:[container-type:size]"
              style={delay(550)}
            >
              <PhotoTicker
                items={tickerItems}
                align="center"
                aspect="aspect-[1440/499]"
                desktopWidth="lg:w-[min(100cqw,calc(100cqh*1440/499))]"
              />
            </div>

            <div className="flex flex-col-reverse items-start gap-8 px-page lg:flex-row lg:items-end lg:justify-between lg:gap-0">
              <FadeIn>
                <ButtonLink href="/contact" variant="dark">
                  Begin your story
                </ButtonLink>
              </FadeIn>
              <FadeIn delay={80}>
                <p className="w-[508px] max-w-full text-body">
                  No two days we style look alike, because no two couples,
                  fields or families are the same. Browse the weddings we’ve
                  built, from quiet garden lunches to long marquee evenings.
                </p>
              </FadeIn>
            </div>
          </section>
        </div>

        <section
          aria-label="The weddings"
          className="flex flex-col gap-5 py-10 lg:py-20"
        >
          {weddings.map((w, i) => {
            const right = i % 2 === 0;
            return (
              <article
                key={w.slug}
                className={`relative isolate flex flex-col justify-center overflow-hidden px-page pt-[260px] pb-10 md:pt-[360px] lg:px-0 ${right ? "items-end lg:pl-5" : "items-start"}`}
              >
                <div className="absolute inset-0 -z-10">
                  <ParallaxImage
                    src={w.cover.src}
                    alt={w.cover.alt}
                    sizes="100vw"
                    position={w.cover.position}
                  />
                </div>
                <FadeIn className="w-[449px] max-w-full bg-cream p-6 md:p-8">
                  <div className="flex flex-col items-start gap-11">
                    <p className="w-full text-right text-body">{w.location}</p>
                    <div className="flex flex-col gap-5">
                      <h2 className="font-display text-display-s font-light uppercase">
                        {w.couple}
                      </h2>
                      <p className="text-body">{w.summary}</p>
                    </div>
                    <ButtonLink
                      href={`/weddings/${w.slug}`}
                      variant="underline"
                      compact
                    >
                      Read their story
                    </ButtonLink>
                  </div>
                </FadeIn>
              </article>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

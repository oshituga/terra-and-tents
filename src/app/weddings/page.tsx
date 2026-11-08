import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ParallaxImage } from "@/components/ParallaxImage";
import { PhotoTicker } from "@/components/PhotoTicker";
import { delay } from "@/components/motion";
import { weddings } from "@/lib/weddings";
import t01 from "@/assets/weddings/ticker/ticker-01.webp";
import t02 from "@/assets/weddings/ticker/ticker-02.webp";
import t03 from "@/assets/weddings/ticker/ticker-03.webp";
import t04 from "@/assets/weddings/ticker/ticker-04.webp";
import t05 from "@/assets/weddings/ticker/ticker-05.webp";
import t06 from "@/assets/weddings/ticker/ticker-06.webp";
import t07 from "@/assets/weddings/ticker/ticker-07.webp";
import t08 from "@/assets/weddings/ticker/ticker-08.webp";
import t09 from "@/assets/weddings/ticker/ticker-09.webp";
import t10 from "@/assets/weddings/ticker/ticker-10.webp";
import t11 from "@/assets/weddings/ticker/ticker-11.webp";
import t12 from "@/assets/weddings/ticker/ticker-12.webp";

export const metadata: Metadata = {
  title: "Weddings | Terra & Tent",
  description:
    "No two days we style look alike. Browse the weddings we have built, from quiet garden lunches to long marquee evenings.",
};

const tickerItems = [
  {
    src: t01,
    alt: "A bride and groom kissing on a grassy slope, framed by leaves",
  },
  {
    src: t02,
    alt: "A groom lifting his laughing bride on a lawn by the railings",
  },
  {
    src: t03,
    alt: "A couple walking out through old wooden doors with orange smoke",
  },
  {
    src: t04,
    alt: "A bride and her father on a gravel path through golden grasses",
  },
  { src: t05, alt: "A first kiss in black and white as guests clap" },
  {
    src: t06,
    alt: "A couple walking across a lawn with raised glasses under festoon lights",
  },
  { src: t07, alt: "A couple arriving to cheering guests under string lights" },
  { src: t08, alt: "A bride walking out of an arched wooden door past cacti" },
  {
    src: t09,
    alt: "A couple facing each other on stone steps between tall trees",
  },
  { src: t10, alt: "A bride twirling with the groom on a lakeside path" },
  {
    src: t11,
    alt: "A couple kissing on a sunlit lawn, the bride holding white lilies",
  },
  {
    src: t12,
    alt: "A couple on a wooden jetty framed by trees, a lake and mountain behind",
  },
];

export default function Weddings() {
  return (
    <>
      <main className="bg-cream text-ink">
        {/* On desktop the nav and the opening section fill one screen; the
            ticker scales its tiles to the height left, still edge to edge. */}
        <div className="lg:flex lg:h-[max(100svh,calc(100vw*499/1440*0.74+531px))] lg:flex-col">
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

            <div className="fade lg:min-h-0 lg:flex-1" style={delay(550)}>
              <PhotoTicker
                items={tickerItems}
                align="center"
                aspect="aspect-[1440/499]"
                designHeight={499}
                fit
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

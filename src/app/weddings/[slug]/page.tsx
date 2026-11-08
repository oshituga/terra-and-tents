import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { delay } from "@/components/motion";
import { OnThisPage } from "@/components/weddings/OnThisPage";
import { getWedding, weddings, type Photo } from "@/lib/weddings";

export function generateStaticParams() {
  return weddings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/weddings/[slug]">): Promise<Metadata> {
  const w = getWedding((await params).slug);
  if (!w) return {};
  return {
    title: `${w.couple}, ${w.location} | Terra & Tent`,
    description: w.summary,
  };
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "brief", label: "Brief" },
  { id: "approach", label: "Approach" },
  { id: "layout", label: "Layout" },
  { id: "gallery", label: "Gallery" },
  { id: "reflections", label: "Reflections" },
];

function Picture({
  photo,
  sizes,
  className,
  preload = false,
}: {
  photo: Photo;
  sizes: string;
  className: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-oat ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        quality={90}
        preload={preload}
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  );
}

/** A plan drawing inlined so its labels use the site's Outfit font. */
function Plan({ name, label }: { name: string; label: string }) {
  const svg = readFileSync(
    path.join(process.cwd(), "public", "plans", `${name}.svg`),
    "utf8",
  )
    .replace('width="614" height="625"', 'width="100%" height="100%"')
    .replace("<svg ", `<svg aria-label="${label}" `);
  return (
    <div
      className="aspect-[614/625] w-full overflow-hidden bg-oat lg:aspect-auto lg:h-[625px] lg:w-auto lg:flex-1 [&>svg]:block lg:[&>svg]:h-[625px] lg:[&>svg]:w-[614px]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default async function WeddingPage({
  params,
}: PageProps<"/weddings/[slug]">) {
  const w = getWedding((await params).slug);
  if (!w) notFound();
  const { overview, brief, approach, layout, gallery, note } = w;

  return (
    <>
      <main>
        <section className="relative isolate flex h-svh min-h-[640px] flex-col overflow-hidden bg-ink text-cream">
          <Image
            src={w.hero.src}
            alt={w.hero.alt}
            fill
            sizes="100vw"
            preload
            placeholder="blur"
            quality={90}
            className="-z-20 object-cover"
            style={
              w.hero.position ? { objectPosition: w.hero.position } : undefined
            }
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/30" />
          <Nav />
          <div className="flex flex-1 flex-col items-center justify-between px-page py-10 text-center lg:py-[60px]">
            <p className="fade text-body" style={delay(350)}>
              {w.styling}
            </p>
            <div
              className="fade flex max-w-full flex-col items-center gap-5"
              style={delay(550)}
            >
              <p className="text-body">{w.location}</p>
              <h1 className="font-display text-display-l font-light uppercase">
                {w.couple}
              </h1>
            </div>
          </div>
        </section>

        <div className="max-page flex gap-[50px] bg-cream pt-[70px] text-ink">
          <aside className="hidden w-[99px] shrink-0 pt-10 pl-8 lg:block lg:w-[131px]">
            <div className="sticky top-10">
              <OnThisPage sections={sections} />
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-2 pt-10 pb-2">
            {/* Overview */}
            <section
              id="overview"
              aria-label="Overview"
              className="flex scroll-mt-6 flex-col items-end gap-10 pb-20 lg:gap-[60px] lg:pr-6"
            >
              <FadeIn className="px-page lg:px-0">
                <h2 className="text-right font-display text-display-m font-light uppercase lg:whitespace-nowrap">
                  {overview.headline}
                </h2>
              </FadeIn>
              <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:gap-2">
                <div className="flex flex-col gap-4 lg:w-[670px] lg:shrink-0">
                  <FadeIn>
                    <Picture
                      photo={overview.photos[0]}
                      sizes="(min-width: 1024px) 47vw, 100vw"
                      className="h-[80vw] w-full md:h-[60vw] lg:h-[521px]"
                    />
                  </FadeIn>
                  <FadeIn className="flex flex-col gap-8 px-page lg:pr-8 lg:pl-0">
                    <div className="flex flex-col gap-4 text-body">
                      {overview.paragraphs.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                    <dl className="grid grid-cols-2 gap-x-2.5 gap-y-8 text-body md:grid-cols-3">
                      {overview.facts.map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-1.5">
                          <dt className="opacity-50">{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </FadeIn>
                </div>
                <FadeIn className="lg:min-w-0 lg:flex-1">
                  <Picture
                    photo={overview.photos[1]}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-[90vw] w-full md:h-[70vw] lg:h-[625px]"
                  />
                </FadeIn>
              </div>
            </section>

            {/* Brief */}
            <section
              id="brief"
              aria-label="Brief"
              className="scroll-mt-6 py-10 lg:py-20"
            >
              <div className="relative isolate flex h-[110vw] max-h-[879px] flex-col items-center overflow-hidden px-page py-10 text-cream md:h-[80vw] lg:h-[879px] lg:py-[60px]">
                <Image
                  src={brief.photo.src}
                  alt={brief.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 88vw, 100vw"
                  placeholder="blur"
                  quality={90}
                  className="-z-20 object-cover"
                  style={
                    brief.photo.position
                      ? { objectPosition: brief.photo.position }
                      : undefined
                  }
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[#121212]/30"
                />
                <FadeIn className="flex flex-col items-center gap-10 text-center">
                  <p className="text-body">{brief.eyebrow}</p>
                  <p className="w-[920px] max-w-full font-display text-display-m font-light uppercase">
                    {brief.headline}
                  </p>
                </FadeIn>
              </div>
            </section>

            {/* Approach */}
            <section
              id="approach"
              aria-label="Approach"
              className="scroll-mt-6 py-10 lg:py-20"
            >
              <div className="flex flex-col gap-2 px-page lg:h-[519px] lg:flex-row lg:items-stretch lg:justify-between lg:gap-0 lg:px-0">
                <FadeIn className="flex min-h-[360px] flex-col justify-between gap-10 bg-ink px-5 py-8 text-cream lg:w-[421px] lg:shrink-0">
                  <p className="text-body">{approach.left.body}</p>
                  <h3 className="font-display text-display-s font-light uppercase">
                    {approach.left.title}
                  </h3>
                </FadeIn>
                <FadeIn
                  delay={80}
                  className="order-first flex flex-col justify-between gap-8 py-10 text-center lg:order-none lg:min-w-0 lg:flex-1"
                >
                  <h2 className="mx-auto w-[320px] max-w-full font-display text-display-m font-light uppercase">
                    {approach.middle.headline}
                  </h2>
                  <p className="px-8 text-body">{approach.middle.body}</p>
                </FadeIn>
                <FadeIn
                  delay={160}
                  className="flex min-h-[360px] flex-col justify-between gap-10 bg-ink px-5 py-8 text-cream lg:w-[421px] lg:shrink-0"
                >
                  <p className="text-body">{approach.right.body}</p>
                  <h3 className="font-display text-display-s font-light uppercase">
                    {approach.right.title}
                  </h3>
                </FadeIn>
              </div>
            </section>

            {/* Layout */}
            <section
              id="layout"
              aria-label="Layout"
              className="flex scroll-mt-6 flex-col items-center gap-10 py-10 lg:gap-[60px] lg:py-20"
            >
              <FadeIn className="px-page">
                <h2 className="w-[279px] max-w-full font-display text-display-m font-light uppercase">
                  {layout.headline}
                </h2>
              </FadeIn>
              <FadeIn className="flex w-full flex-col gap-2 lg:flex-row">
                <Plan name={layout.site} label={`Site plan for ${w.couple}`} />
                <Plan
                  name={layout.ceremony}
                  label={`Ceremony plan for ${w.couple}`}
                />
              </FadeIn>
              <FadeIn className="px-page">
                <p className="w-[603px] max-w-full text-center text-body">
                  {layout.caption}
                </p>
              </FadeIn>
            </section>

            {/* Gallery */}
            <section
              id="gallery"
              aria-label="Gallery"
              className="flex scroll-mt-6 flex-col gap-2"
            >
              <FadeIn>
                <Picture
                  photo={gallery[0]}
                  sizes="(min-width: 1024px) 88vw, 100vw"
                  className="h-[70vw] w-full lg:h-[762px]"
                />
              </FadeIn>
              <div className="flex gap-2 lg:pr-6">
                <FadeIn className="min-w-0 flex-1">
                  <Picture
                    photo={gallery[1]}
                    sizes="(min-width: 1024px) 43vw, 50vw"
                    className="h-[70vw] w-full lg:h-[550px]"
                  />
                </FadeIn>
                <FadeIn delay={80} className="min-w-0 flex-1">
                  <Picture
                    photo={gallery[2]}
                    sizes="(min-width: 1024px) 43vw, 50vw"
                    className="h-[70vw] w-full lg:h-[550px]"
                  />
                </FadeIn>
              </div>
              <FadeIn>
                <Picture
                  photo={gallery[3]}
                  sizes="(min-width: 1024px) 88vw, 100vw"
                  className="h-[70vw] w-full lg:h-[762px]"
                />
              </FadeIn>
            </section>

            {/* Reflections */}
            <section
              id="reflections"
              aria-label="Reflections"
              className="flex scroll-mt-6 flex-col gap-2 bg-ink p-2 text-ink lg:h-[443px] lg:flex-row lg:items-stretch lg:justify-between lg:pr-0"
            >
              <FadeIn className="flex flex-col justify-between gap-16 bg-cream p-8 lg:w-[449px] lg:shrink-0">
                <p className="text-right text-body">A note from them</p>
                <figure className="flex flex-col gap-10">
                  <blockquote className="text-body">{note.quote}</blockquote>
                  <figcaption className="font-display text-display-s font-light uppercase">
                    - {w.couple}
                  </figcaption>
                </figure>
              </FadeIn>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 lg:pl-2">
                <FadeIn>
                  <Picture
                    photo={note.photo}
                    sizes="(min-width: 1024px) 253px, 60vw"
                    className="h-[80vw] w-full md:h-[337px] md:w-[253px]"
                  />
                </FadeIn>
                <FadeIn className="flex justify-end pb-5">
                  <h2 className="w-[430px] max-w-full font-display text-display-m font-light text-cream uppercase">
                    {note.headline}
                  </h2>
                </FadeIn>
              </div>
            </section>
          </div>
        </div>

        <section
          aria-label="Plan your wedding"
          className="flex flex-col gap-20 bg-ink py-10 text-cream"
        >
          <FadeIn className="flex justify-center px-page py-10">
            <h2 className="w-[358px] max-w-full font-display text-display-m font-light uppercase">
              Let’s build your wedding next
            </h2>
          </FadeIn>
          <div className="flex justify-end px-page py-5">
            <FadeIn className="flex flex-col items-start gap-10">
              <p className="w-[508px] max-w-full text-body">
                Tell us the date, the place and how you want it to feel. We will
                reply within two working days to arrange a call and talk through
                your ideas.
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="/contact" variant="solid">
                  Start your enquiry
                </ButtonLink>
                <ButtonLink href="/weddings" variant="underline">
                  See our work
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

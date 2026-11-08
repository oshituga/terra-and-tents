import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { delay } from "@/components/motion";
import {
  articles,
  getArticle,
  nextArticle,
  type JournalImage,
} from "@/lib/journal";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | Terra & Tent`,
    description: article.summary,
  };
}

function Photo({
  image,
  sizes,
  className,
  preload = false,
}: {
  image: JournalImage;
  sizes: string;
  className: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-tan ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        quality={90}
        preload={preload}
        className="object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </div>
  );
}

export default async function JournalArticle({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const next = nextArticle(slug);

  return (
    <>
      <main>
        <article>
          <div className="bg-cream text-ink">
            <Nav variant="light" />

            <div className="flex flex-col items-end gap-8 py-10 lg:gap-[51px] lg:py-[60px]">
              <header className="flex w-full justify-end px-page lg:pl-0">
                <div
                  className="fade flex max-w-full flex-col gap-5"
                  style={delay(350)}
                >
                  <p className="text-right text-body">
                    <time dateTime={article.date}>{article.dateLabel}</time>
                  </p>
                  <h1 className="max-w-full font-display lg:w-[1000px] lg:[text-wrap:balance] text-display-l font-light uppercase">
                    {article.title}
                  </h1>
                  <p className="text-body">
                    By {article.author}, {article.role}
                  </p>
                </div>
              </header>

              <div className="flex w-full flex-col gap-6 lg:h-[818px] lg:flex-row lg:items-end lg:gap-8 lg:pb-[9px] lg:pl-page">
                <p
                  className="fade order-last w-full shrink-0 px-page text-body lg:order-none lg:w-[413px] lg:px-0"
                  style={delay(550)}
                >
                  {article.summary}
                </p>
                <FadeIn className="h-[72vw] w-full min-w-0 md:h-[60vw] lg:h-full lg:w-auto lg:flex-1">
                  <Photo
                    image={article.cover}
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="h-full w-full"
                    preload
                  />
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-ink pt-[70px] pb-2 text-cream">
            <div className="max-page flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[9px]">
              <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
                <FadeIn className="flex flex-col gap-10 px-gutter py-5 text-body">
                  {article.opening.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </FadeIn>
                <div className="flex gap-2">
                  {article.small.map((image, i) => (
                    <FadeIn
                      key={image.src.src}
                      delay={i * 100}
                      className="min-w-0 flex-1"
                    >
                      <Photo
                        image={image}
                        sizes="(min-width: 768px) 16vw, 33vw"
                        className="h-[40vw] w-full md:h-[221px]"
                      />
                    </FadeIn>
                  ))}
                </div>
                <FadeIn className="px-gutter py-5">
                  <p className="text-body">{article.middle}</p>
                </FadeIn>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-[9px] self-stretch">
                <FadeIn>
                  <Photo
                    image={article.tall}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-[120vw] w-full md:h-[587px]"
                  />
                </FadeIn>
                <FadeIn>
                  <p className="px-gutter pt-6 pb-12 text-body lg:py-0 lg:pl-0">
                    {article.closing}
                  </p>
                </FadeIn>
              </div>
            </div>

            <nav
              aria-label="Next journal"
              className="max-page flex justify-end pl-gutter"
            >
              <FadeIn className="flex w-full flex-col gap-[37px] bg-cream p-4 text-ink md:w-auto">
                <p className="text-body">Next journal</p>
                <div className="flex flex-col items-start gap-4 px-8 md:flex-row md:items-center md:gap-1.5">
                  <p className="w-[365px] max-w-full font-display text-display-s font-light uppercase">
                    {next.title}
                  </p>
                  <ButtonLink
                    href={`/journal/${next.slug}`}
                    variant="underline"
                    compact
                  >
                    Read journal
                  </ButtonLink>
                </div>
              </FadeIn>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

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

            <div className="flex flex-col items-end gap-[51px] py-[60px]">
              <header className="flex w-full justify-end pr-page">
                <div className="fade flex flex-col gap-5" style={delay(350)}>
                  <p className="text-right text-body">
                    <time dateTime={article.date}>{article.dateLabel}</time>
                  </p>
                  <h1 className="w-[618px] font-display text-display-l font-light uppercase">
                    {article.title}
                  </h1>
                  <p className="text-body">
                    By {article.author}, {article.role}
                  </p>
                </div>
              </header>

              <div className="flex h-[818px] w-full items-end gap-8 pb-[9px] pl-page">
                <p className="fade w-[413px] shrink-0 text-body" style={delay(550)}>
                  {article.summary}
                </p>
                <FadeIn className="h-full min-w-0 flex-1">
                  <Photo
                    image={article.cover}
                    sizes="70vw"
                    className="h-full w-full"
                    preload
                  />
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-ink pt-[70px] pb-2 text-cream">
            <div className="max-page flex items-start gap-[9px]">
              <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
                <FadeIn className="flex flex-col gap-10 px-8 py-5 text-body">
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
                        className="h-[221px] w-full"
                      />
                    </FadeIn>
                  ))}
                </div>
                <FadeIn className="px-8 py-5">
                  <p className="text-body">{article.middle}</p>
                </FadeIn>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-[9px] self-stretch">
                <FadeIn>
                  <Photo
                    image={article.tall}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-[587px] w-full"
                  />
                </FadeIn>
                <FadeIn>
                  <p className="pr-8 text-body">{article.closing}</p>
                </FadeIn>
              </div>
            </div>

            <nav
              aria-label="Next journal"
              className="max-page flex justify-end pl-8"
            >
              <FadeIn className="flex flex-col gap-[37px] bg-cream p-4 text-ink">
                <p className="text-body">Next journal</p>
                <div className="flex items-center gap-1.5 px-8">
                  <p className="w-[365px] font-display text-display-s font-light uppercase">
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

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { articles } from "@/lib/journal";

export function JournalTeaser() {
  return (
    <section
      aria-label="From the journal"
      className="flex min-h-svh flex-col items-center justify-center gap-10 bg-ink py-10 text-cream"
    >
      <FadeIn className="flex w-full flex-col-reverse items-start gap-6 px-page py-10 lg:flex-row lg:justify-between lg:gap-0">
        <p className="w-[395px] max-w-full text-body">
          Read about how we plan a room, choose flowers through the year, and
          style outdoor weddings from the ground up.
        </p>
        <h2 className="w-[490px] max-w-full font-display lg:pt-[92.5px] text-display-m font-light uppercase">
          Notes on styling, seasons and the days we love
        </h2>
      </FadeIn>

      <div className="flex w-full flex-col gap-12 px-page py-10 md:grid md:grid-cols-2 md:gap-x-2 lg:flex lg:flex-row lg:items-start lg:gap-2">
        {articles.map((article, i) => (
          <FadeIn
            key={article.slug}
            delay={i * 100}
            className="w-full lg:w-[min(395px,calc((100vw-80px)/3))] lg:shrink-0"
          >
            <Link
              href={`/journal/${article.slug}`}
              className="group flex flex-col gap-6 lg:gap-[59px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <h3 className="w-[365px] max-w-full font-display text-display-s font-light uppercase">
                {article.title}
              </h3>
              <div className="relative h-[100vw] max-h-[455px] w-full overflow-hidden bg-tan md:h-[455px]">
                <Image
                  src={article.cover.src}
                  alt={article.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="card-hover absolute inset-0 flex items-center justify-center bg-[#121212]/40"
                >
                  <span className="border-b-[1.5px] border-cream px-6 py-[15px] text-body">
                    Read article
                  </span>
                </span>
              </div>
              <p className="flex justify-between gap-4 text-body whitespace-nowrap">
                <span>{article.author}</span>
                <time dateTime={article.date}>{article.dateLabel}</time>
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="flex w-full justify-end px-page">
        <FadeIn>
          <ButtonLink href="/journal" variant="underline" compact>
            Read the journal
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}

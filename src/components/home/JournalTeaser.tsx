import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import flowers from "@/assets/journal-flowers-every-season.webp";
import candlelight from "@/assets/journal-candlelight-tables.webp";
import tented from "@/assets/journal-tented-wedding.webp";

const articles = [
  {
    title: "How to Choose Flowers for Every Season",
    slug: "flowers-for-every-season",
    author: "Eleanor Hart",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
    src: flowers,
    alt: "A florist gathering an armful of cut flowers in a meadow garden",
  },
  {
    title: "Candlelight Tables That Glow Until Midnight",
    slug: "candlelight-tables",
    author: "Rowan Ellis",
    date: "2026-09-09",
    dateLabel: "9 September 2026",
    src: candlelight,
    alt: "A long table lit by candles and string lights inside a timber barn draped with fabric",
  },
  {
    title: "Planning a Tented Wedding From the Ground Up",
    slug: "planning-a-tented-wedding",
    author: "Eleanor Hart",
    date: "2026-09-28",
    dateLabel: "28 September 2026",
    src: tented,
    alt: "The peaked white roof of a large marquee against a deep blue sky",
  },
];

export function JournalTeaser() {
  return (
    <section
      aria-label="From the journal"
      className="flex min-h-svh flex-col items-center justify-center gap-10 bg-ink py-10 text-cream"
    >
      <FadeIn className="flex w-full items-start justify-between px-8 py-10">
        <p className="w-[395px] text-body">
          Read about how we plan a room, choose flowers through the year, and
          style outdoor weddings from the ground up.
        </p>
        <h2 className="w-[490px] pt-[92.5px] font-display text-display-m font-light uppercase">
          Notes on styling, seasons and the days we love
        </h2>
      </FadeIn>

      <div className="flex w-full items-start gap-2 px-8 py-10">
        {articles.map((article, i) => (
          <FadeIn key={article.slug} delay={i * 100} className="w-[395px]">
            <Link
              href={`/journal/${article.slug}`}
              className="group flex flex-col gap-[59px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <h3 className="w-[365px] font-display text-display-s font-light uppercase">
                {article.title}
              </h3>
              <div className="relative h-[455px] w-full overflow-hidden bg-tan">
                <Image
                  src={article.src}
                  alt={article.alt}
                  fill
                  sizes="(min-width: 768px) 28vw, 90vw"
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
              <p className="flex justify-between text-body whitespace-nowrap">
                <span>{article.author}</span>
                <time dateTime={article.date}>{article.dateLabel}</time>
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="flex w-full justify-end px-8">
        <FadeIn>
          <ButtonLink href="/journal" variant="underline" compact>
            Read the journal
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}

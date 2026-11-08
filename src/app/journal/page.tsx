import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { delay } from "@/components/motion";
import { articles } from "@/lib/journal";

export const metadata: Metadata = pageMetadata({
  title: "Journal",
  description:
    "Notes from the ground up: short stories on how we build, what each place teaches us and the small decisions behind every setting we style.",
  path: "/journal",
});

export default function Journal() {
  return (
    <>
      <main className="bg-ink text-cream">
        <Nav variant="solid" />

        <header className="flex flex-col items-end gap-8 py-10 pl-page lg:gap-[51px] lg:py-[60px]">
          <div className="fade flex w-full flex-col gap-5" style={delay(350)}>
            <p className="w-[508px] max-w-full text-body">Our journal</p>
            <h1 className="w-[568px] max-w-full font-display text-display-l font-light uppercase">
              Notes from the ground up
            </h1>
          </div>
          <div className="flex w-full justify-end pr-page">
            <p
              className="fade w-[508px] max-w-full text-body"
              style={delay(450)}
            >
              Short stories on how we build, what each place teaches us and the
              small decisions behind every setting we style.
            </p>
          </div>
        </header>

        <section aria-label="Articles" className="py-5">
          <ul className="flex flex-col gap-12 px-page pt-10 pb-8 md:grid md:grid-cols-2 md:gap-x-2 lg:flex lg:flex-row lg:items-start lg:gap-2">
            {articles.map((article, i) => (
              <li
                key={article.slug}
                className="w-full lg:w-[min(429px,calc((100vw-80px)/3))] lg:shrink-0"
              >
                <FadeIn delay={i * 100}>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group flex flex-col gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                  >
                    <div className="flex flex-col gap-2.5">
                      <h2 className="w-full px-8 font-display text-display-s font-light uppercase">
                        {article.title}
                      </h2>
                      <p className="text-body whitespace-nowrap">
                        {article.author}
                      </p>
                    </div>
                    <div className="relative h-[100vw] max-h-[455px] w-full overflow-hidden bg-tan md:h-[455px]">
                      <Image
                        src={article.cover.src}
                        alt={article.cover.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        placeholder="blur"
                        quality={90}
                        className="object-cover"
                        style={
                          article.cardPosition
                            ? { objectPosition: article.cardPosition }
                            : undefined
                        }
                      />
                      <span
                        aria-hidden
                        className="card-hover absolute inset-0 flex items-center justify-center bg-[#121212]/40"
                      >
                        <span className="border-b-[1.5px] border-cream px-6 py-[15px] text-body">
                          Read journal
                        </span>
                      </span>
                    </div>
                    <p className="pr-[30px] text-right text-body">
                      <time dateTime={article.date}>{article.dateLabel}</time>
                    </p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

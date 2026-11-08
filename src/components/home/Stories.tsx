import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import { getWedding } from "@/lib/weddings";

// Two weddings, each shown with its own cover photo and details.
const pick = (slug: string) => {
  const w = getWedding(slug);
  if (!w) throw new Error(`Unknown wedding: ${slug}`);
  return w;
};
const maria = pick("maria-and-israel");
const sofia = pick("sofia-and-henry");

const stories = [
  {
    couple: maria.couple,
    place: maria.location,
    body: maria.summary,
    href: `/weddings/${maria.slug}`,
    src: maria.cover.src,
    alt: maria.cover.alt,
    position: maria.cover.position,
    align: "items-start",
  },
  {
    couple: sofia.couple,
    place: sofia.location,
    body: sofia.summary,
    href: `/weddings/${sofia.slug}`,
    src: sofia.cover.src,
    alt: sofia.cover.alt,
    position: sofia.cover.position,
    align: "items-end",
  },
];

export function Stories() {
  return (
    <section
      aria-label="Recent weddings"
      className="flex min-h-svh flex-col items-center justify-center gap-[14px] bg-cream pt-[70px] text-ink"
    >
      <FadeIn className="flex flex-col items-center gap-8 px-page py-10">
        <h2 className="w-[781px] max-w-full text-center font-display text-display-m font-light uppercase">
          Every wedding starts with a patch of ground and ends as someone’s
          favourite day
        </h2>
        <ButtonLink href="/weddings" variant="underline" compact>
          See all weddings
        </ButtonLink>
      </FadeIn>

      <div className="max-page flex flex-col gap-2 lg:flex-row">
        {stories.map((story, i) => (
          <FadeIn
            key={story.couple}
            delay={i * 100}
            className={`relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden px-page pt-[260px] pb-10 md:pt-[360px] lg:px-0 ${story.align}`}
          >
            <ParallaxImage
              src={story.src}
              alt={story.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              position={story.position}
            />
            <div className="relative w-[449px] max-w-full bg-cream p-6 md:p-8">
              <article className="flex flex-col items-start gap-11">
                <p className="w-full text-right text-body">{story.place}</p>
                <div className="flex flex-col gap-5">
                  <h3 className="font-display text-display-s font-light whitespace-nowrap uppercase">
                    {story.couple}
                  </h3>
                  <p className="text-body">{story.body}</p>
                </div>
                <ButtonLink href={story.href} variant="underline" compact>
                  Read their story
                </ButtonLink>
              </article>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="px-page py-10">
        <p className="w-[574px] max-w-full text-center text-body">
          These are a few of the days we have styled recently, from garden
          marquees to lakeside lawns. Each one began with the site and the
          couple, and the room grew out of both.
        </p>
      </FadeIn>
    </section>
  );
}

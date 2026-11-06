import { ButtonLink } from "../ButtonLink";
import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import elenaTom from "@/assets/story-elena-tom.webp";
import sofiaHenry from "@/assets/story-sofia-henry.webp";

const stories = [
  {
    couple: "Elena & Tom",
    place: "Val d’Orcia, Tuscany",
    body: "A hilltop marquee dressed in olive branches and warm lantern light, with the whole valley as the backdrop. Elena and Tom kept it small, so every guest had a seat at the same long table.",
    href: "/weddings/elena-and-tom",
    src: elenaTom,
    alt: "A large tree shading a lawn set with rattan chairs and a wooden ceremony frame",
    align: "items-start",
  },
  {
    couple: "Sofia & Henry",
    place: "Padstow, Cornwall",
    body: "Vows on a cliff path, then a sea-salt supper in a tent tucked into the dunes. Sofia and Henry wanted the day to taste of the coast, so the table was set with driftwood, shells and wild grasses.",
    href: "/weddings/sofia-and-henry",
    src: sofiaHenry,
    alt: "Round tables with lilac chair sashes and a tall flower arrangement on a lawn outside a cream villa",
    align: "items-end",
  },
];

export function Stories() {
  return (
    <section
      aria-label="Recent weddings"
      className="flex min-h-svh flex-col items-center gap-[14px] bg-cream pt-[70px] text-ink"
    >
      <FadeIn className="flex flex-col items-center gap-8 px-8 py-10">
        <h2 className="w-[781px] text-center font-display text-display-m font-light uppercase">
          Every wedding starts with a patch of ground and ends as someone’s
          favourite day
        </h2>
        <ButtonLink href="/weddings" variant="underline" compact>
          See all weddings
        </ButtonLink>
      </FadeIn>

      <div className="flex w-full gap-2">
        {stories.map((story, i) => (
          <FadeIn
            key={story.couple}
            delay={i * 200}
            className={`relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden pt-[360px] pb-10 ${story.align}`}
          >
            <ParallaxImage
              src={story.src}
              alt={story.alt}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <FadeIn
              delay={i * 200 + 1000}
              className="relative w-[449px] bg-cream p-8"
            >
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
            </FadeIn>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="px-8 py-10">
        <p className="w-[574px] text-center text-body">
          These are a few of the days we have styled recently, from garden
          marquees to lakeside lawns. Each one began with the site and the
          couple, and the room grew out of both.
        </p>
      </FadeIn>
    </section>
  );
}

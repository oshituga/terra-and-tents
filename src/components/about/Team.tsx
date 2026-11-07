import { FadeIn } from "../FadeIn";
import { ParallaxImage } from "../ParallaxImage";
import eleanor from "@/assets/about-team-eleanor.webp";
import rowan from "@/assets/about-team-rowan.webp";

export function AboutTeam() {
  return (
    <section
      aria-label="The studio team"
      className="flex flex-col gap-[14px] bg-cream py-10 text-ink"
    >
      <FadeIn className="flex justify-center px-page py-10">
        <h2 className="w-[539px] max-w-full text-center font-display text-display-m font-light uppercase">
          Two founders, one small crew, and a lot of flowers
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-12 lg:gap-20">
        <FadeIn className="flex justify-center px-page py-5">
          <p className="w-[438px] max-w-full text-center text-body">
            We keep the studio small on purpose, so the people you meet on your
            first call are the people who style your wedding.
          </p>
        </FadeIn>

        <div className="max-page flex flex-col gap-16 px-page md:flex-row md:items-end md:gap-8 xl:px-[146px]">
          <FadeIn className="flex min-w-0 flex-1 flex-col gap-8">
            <p className="text-body md:whitespace-nowrap">
              Founder and Creative Director
            </p>
            <div className="flex flex-col items-end gap-[14px]">
              <h3 className="w-full text-right font-display text-display-s font-light uppercase">
                Eleanor Hart
              </h3>
              <p className="w-[332px] max-w-full text-body">
                Eleanor leads every concept and every site visit, and she is the
                first voice you’ll hear on the phone.
              </p>
            </div>
            <div className="relative h-[120vw] w-full overflow-hidden md:h-[70vw] lg:h-[630px]">
              <ParallaxImage
                src={eleanor}
                alt="Eleanor Hart standing in tall grass at dusk, holding a glass of red wine, with hills behind"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={100} className="flex min-w-0 flex-1 flex-col gap-8">
            <p className="text-body md:self-end md:whitespace-nowrap">
              Founder and Head of Florals
            </p>
            <div className="flex flex-col gap-[14px]">
              <h3 className="w-full text-center font-display text-display-s font-light uppercase">
                Rowan Ellis
              </h3>
              <p className="w-[332px] max-w-full self-end text-body">
                Rowan sources and arranges every stem, and she keeps the
                studio’s garden going all year.
              </p>
            </div>
            <div className="relative h-[120vw] w-full overflow-hidden md:h-[74vw] lg:h-[660px]">
              <ParallaxImage
                src={rowan}
                alt="Rowan Ellis in a greenhouse wearing orange gloves, holding a potted pink flower beneath hanging planters"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

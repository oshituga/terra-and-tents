import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/Hero";
import { AboutLocation } from "@/components/about/Location";
import { Cta } from "@/components/home/Cta";
import { AboutPrinciples } from "@/components/about/Principles";
import { AboutStory } from "@/components/about/Story";
import { AboutTeam } from "@/components/about/Team";

export const metadata: Metadata = pageMetadata({
  title: "About the studio",
  description:
    "Two founders, one small crew and a lot of flowers. Terra & Tent styles outdoor weddings from a studio and garden in Chipping Campden.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <main>
        <AboutHero />
        <AboutStory />
        <AboutPrinciples />
        <AboutTeam />
        <AboutLocation />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/Hero";
import { AboutPrinciples } from "@/components/about/Principles";
import { AboutStory } from "@/components/about/Story";
import { AboutTeam } from "@/components/about/Team";

export const metadata: Metadata = {
  title: "About | Terra & Tent",
  description:
    "Terra & Tent is a wedding styling studio in Chipping Campden. We design, build and style outdoor weddings on the ground they happen on.",
};

export default function About() {
  return (
    <>
      <main>
        <AboutHero />
        <AboutStory />
        <AboutPrinciples />
        <AboutTeam />
      </main>
      <Footer />
    </>
  );
}

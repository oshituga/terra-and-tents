import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/Hero";
import { AboutStory } from "@/components/about/Story";

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
      </main>
      <Footer />
    </>
  );
}

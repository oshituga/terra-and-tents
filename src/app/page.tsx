import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Cta } from "@/components/home/Cta";
import { Details } from "@/components/home/Details";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Stories } from "@/components/home/Stories";
import { Testimonials } from "@/components/home/Testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Terra & Tent | Outdoor wedding styling",
  description:
    "Arches, aisles and long tables, styled on real ground in real light. A small studio in the Cotswolds designing and building outdoor weddings.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <Services />
        <Stories />
        <Process />
        <Testimonials />
        <Details />
        <JournalTeaser />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

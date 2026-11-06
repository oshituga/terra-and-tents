import { Details } from "@/components/home/Details";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Stories } from "@/components/home/Stories";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Stories />
      <Process />
      <Testimonials />
      <Details />
    </main>
  );
}

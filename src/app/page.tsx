import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
    </main>
  );
}

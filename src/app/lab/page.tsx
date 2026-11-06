import Image from "next/image";
import heroImage from "@/assets/home-hero.webp";
import "./lab.css";

const options = [
  {
    kind: "ink",
    name: "A. Ink rise",
    note: "A fill rises from the baseline like ink soaking up through paper, and the label changes colour as it passes.",
  },
  {
    kind: "blur",
    name: "B. Soft focus",
    note: "The label drifts up out of focus while a copy rises in sharp from below. The underline draws in to a short rule.",
  },
  {
    kind: "track",
    name: "C. Tracking",
    note: "The letters open up like a magazine caption and a small dot sets in before the label.",
  },
];

function Label({ text }: { text: string }) {
  return (
    <>
      <span aria-hidden className="hv-fill" />
      <span aria-hidden className="hv-dot" />
      <span className="hv-stack">
        <span className="hv-a">{text}</span>
        <span aria-hidden className="hv-b">
          {text}
        </span>
      </span>
    </>
  );
}

export default function Lab() {
  return (
    <main className="relative isolate min-h-svh bg-ink px-8 py-10 text-cream">
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#121212]/50" />

      <h1 className="font-display text-display-l font-light uppercase">
        Hover lab
      </h1>
      <p className="mt-3 w-[508px] text-body">
        Three hover treatments on the real hero photo. Pick one and it goes on
        every button and nav link.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {options.map(({ kind, name, note }) => (
          <section key={kind} className="flex flex-col gap-5">
            <div>
              <h2 className="text-body font-medium">{name}</h2>
              <p className="mt-1 w-[508px] text-body opacity-80">{note}</p>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <nav className="flex gap-2.5 rounded-[25px] bg-black/20 px-[18px] py-2 backdrop-blur-[8px]">
                {["About", "Weddings", "Journal", "Gallery"].map((l) => (
                  <a key={l} href="#" className={`hv hv-${kind} link`}>
                    <Label text={l} />
                  </a>
                ))}
              </nav>
              <div className="flex gap-2">
                <a href="#" className={`hv hv-${kind} solid`}>
                  <Label text="Begin your enquiry" />
                </a>
                <a href="#" className={`hv hv-${kind} line`}>
                  <Label text="See our work" />
                  <span aria-hidden className="hv-line" />
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

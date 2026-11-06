import { FadeIn } from "./FadeIn";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { delay } from "./motion";

export type LegalSection = {
  title: string;
  body: React.ReactNode;
};

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <main className="bg-cream text-ink">
        <Nav variant="light" />

        <header className="flex items-end justify-between gap-10 px-page pt-20 pb-5">
          <div className="fade flex flex-col gap-5" style={delay(350)}>
            <p className="text-body">Legal</p>
            <h1 className="font-display text-display-l font-light whitespace-nowrap uppercase">
              {title}
            </h1>
            <p className="w-[435px] text-body">{intro}</p>
          </div>
          <p className="fade text-body whitespace-nowrap" style={delay(450)}>
            Last updated {updated}.
          </p>
        </header>

        <div className="max-page py-10 pr-8 pl-[53%]">
          <div className="flex flex-col gap-10 pr-8 pl-8 py-5">
            {sections.map(({ title, body }) => (
              <FadeIn key={title} className="flex flex-col gap-4">
                <h2 className="font-display text-display-s font-light uppercase">
                  {title}
                </h2>
                <div className="text-body">{body}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function EmailLink() {
  return (
    <a
      href="mailto:hello@terraandtent.com"
      className="underline decoration-from-font underline-offset-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      hello@terraandtent.com
    </a>
  );
}

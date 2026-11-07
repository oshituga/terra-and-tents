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

        <header className="flex flex-col items-start gap-8 px-page pt-10 pb-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pt-20">
          <div
            className="fade flex max-w-full flex-col gap-5"
            style={delay(350)}
          >
            <p className="text-body">Legal</p>
            <h1 className="font-display text-display-l font-light uppercase lg:whitespace-nowrap">
              {title}
            </h1>
            <p className="w-[435px] max-w-full text-body">{intro}</p>
          </div>
          <p className="fade text-body lg:whitespace-nowrap" style={delay(450)}>
            Last updated {updated}.
          </p>
        </header>

        <div className="max-page px-page py-10 lg:pr-8 lg:pl-[53%]">
          <div className="flex flex-col gap-10 py-5 lg:px-8">
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

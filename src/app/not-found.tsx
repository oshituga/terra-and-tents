import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Nav } from "@/components/Nav";
import { delay } from "@/components/motion";

export const metadata: Metadata = {
  title: "Page not found | Terra & Tent",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col bg-ink text-cream lg:h-svh lg:min-h-[640px]">
      <Nav variant="solid" />

      <div className="flex flex-1 flex-col justify-between gap-16 py-10 lg:py-[60px]">
        <div
          className="fade flex flex-col gap-5 px-page lg:pr-0"
          style={delay(350)}
        >
          <p className="w-[508px] max-w-full text-body">Lost in the field</p>
          <h1 className="w-[568px] max-w-full font-display text-display-l font-light uppercase">
            This page has wandered off
          </h1>
        </div>

        <div className="flex justify-end px-page lg:pl-0">
          <div className="flex max-w-full flex-col gap-5">
            <p
              className="fade w-[529px] max-w-full text-body lg:h-[43px]"
              style={delay(350)}
            >
              The link may be broken, or the page may have moved on. Head back
              to the weddings, or tell us what you were looking for and we will
              point you the right way.
            </p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink
                href="/"
                variant="solid"
                className="fade"
                style={delay(600)}
              >
                Back to home
              </ButtonLink>
              <ButtonLink
                href="/weddings"
                variant="underline"
                className="fade"
                style={delay(680)}
              >
                See our weddings
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

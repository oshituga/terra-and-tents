import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { Nav } from "@/components/Nav";
import { ContactForm } from "@/components/contact/ContactForm";
import { delay } from "@/components/motion";
import { enquiryHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Terra & Tent",
  description:
    "Tell us about your wedding. Share the place, the date and the feeling you are after, and we will reply within two working days.",
};

const link =
  "sheen-link font-display text-display-s font-light whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-body opacity-50">{label}</p>
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <main className="flex min-h-svh flex-col justify-between bg-ink text-cream">
        <Nav variant="solid" />

        <header className="flex flex-col items-center gap-8 px-page pt-10 pb-5 text-center lg:gap-[50px] lg:pt-[60px]">
          <div
            className="fade flex max-w-full flex-col items-center gap-5"
            style={delay(350)}
          >
            <p className="text-body">Say hello</p>
            <h1 className="font-display text-display-l font-light uppercase">
              Tell us about your day
            </h1>
          </div>
          <p className="fade w-[643px] max-w-full text-body" style={delay(450)}>
            Share the place, the date and the feeling you are after, even if it
            is only a rough idea. We read every message ourselves and reply
            within two working days.
          </p>
        </header>

        <div className="max-page flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-8">
          <FadeIn className="dim-group flex min-w-0 flex-1 flex-col gap-8 px-gutter pt-10 lg:pt-[70px] lg:pr-0">
            <Detail label="Studio">
              <address className="w-[455px] max-w-full font-display text-display-s font-light not-italic uppercase">
                14 Orchard Lane, Chipping Campden, GL55 6AB
              </address>
            </Detail>
            <Detail label="Email">
              <a href={enquiryHref} className={link}>
                <span className="sheen">hello@terraandtent.com</span>
              </a>
            </Detail>
            <Detail label="Phone">
              <a href="tel:+15550142290" className={link}>
                <span className="sheen">+1 (555) 014 2290</span>
              </a>
            </Detail>
            <Detail label="Hours">
              <p className="font-display text-display-s font-light uppercase">
                Monday to Friday, 9am to 5pm
              </p>
            </Detail>
            <Detail label="Weddings">
              <p className="font-display text-display-s font-light uppercase">
                Saturdays, on site with our couples
              </p>
            </Detail>
          </FadeIn>

          <FadeIn
            delay={100}
            className="w-full shrink-0 bg-cream px-6 pt-10 pb-8 text-ink md:px-8 lg:w-[861px] lg:pt-[62px] lg:pr-0"
          >
            <ContactForm />
          </FadeIn>
        </div>

        <FadeIn className="flex justify-end px-page py-[30px]">
          <p className="text-body">
            Studio visits are by appointment, so let us know when you would like
            to come by.
          </p>
        </FadeIn>
      </main>
    </>
  );
}

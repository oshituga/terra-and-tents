import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { enquiryHref, social } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/weddings", label: "Weddings" },
  { href: "/journal", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
const bigLink = `sheen-link font-display text-display-s font-light whitespace-nowrap uppercase ${focus}`;
const smallLink = `sheen-link ${focus}`;

function Label({ children }: { children: string }) {
  return <p className="text-body opacity-65">{children}</p>;
}

export function Footer() {
  return (
    <footer className="flex min-h-svh flex-col justify-between gap-16 bg-cream pt-[70px] text-ink lg:gap-24">
      <div className="flex w-full flex-col gap-12 px-page py-10 lg:gap-10">
        <div className="flex flex-col items-start gap-12 md:flex-row md:justify-between md:gap-10">
          <FadeIn className="flex flex-col gap-[7px]">
            <p className="font-display text-display-s font-light whitespace-nowrap uppercase">
              Terra &amp; Tent
            </p>
            <p className="text-body">Styled on real ground, in real light.</p>
          </FadeIn>

          <FadeIn delay={80}>
            <nav aria-label="Footer" className="flex flex-col gap-8">
              <Label>Explore</Label>
              <ul className="dim-group flex flex-col items-start gap-5">
                {explore.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={bigLink}>
                      <span className="sheen">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>

          <FadeIn delay={160} className="flex flex-col gap-8">
            <Label>Follow</Label>
            <ul className="dim-group flex flex-col items-start gap-5">
              {social.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={bigLink}
                  >
                    <span className="sheen">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="flex flex-col items-start gap-12 md:flex-row md:items-end md:justify-between md:gap-10">
          <FadeIn className="flex flex-col gap-8">
            <Label>Get in touch</Label>
            <div className="dim-group flex flex-col items-start gap-5">
              <a href="tel:+15550142290" className={bigLink}>
                <span className="sheen">+1 (555) 014 2290</span>
              </a>
              <a href={enquiryHref} className={bigLink}>
                <span className="sheen">hello@terraandtent.com</span>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={80} className="flex flex-col gap-8">
            <Label>Studio</Label>
            <address className="w-[359px] max-w-full font-display text-display-s font-light not-italic uppercase">
              14 Orchard Lane, Chipping Campden, GL55 6AB
            </address>
          </FadeIn>
        </div>
      </div>

      <FadeIn className="flex w-full flex-col">
        <div className="px-page">
          <span aria-hidden className="tent-mark block h-[32.8965px] w-9" />
        </div>
        <div className="flex flex-col items-start gap-4 px-page py-5 text-body md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-10 lg:flex-nowrap lg:whitespace-nowrap">
          <p>© 2026 Terra &amp; Tent. All rights reserved.</p>
          <div className="dim-group flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/privacy" className={smallLink}>
              <span className="sheen">Privacy Policy</span>
            </Link>
            <Link href="/terms" className={smallLink}>
              <span className="sheen">Terms &amp; Conditions</span>
            </Link>
          </div>
          <a
            href="https://www.ayomide.website/"
            target="_blank"
            rel="noopener noreferrer"
            className={smallLink}
          >
            <span className="sheen">Designed by: Ayo</span>
          </a>
        </div>
      </FadeIn>
    </footer>
  );
}

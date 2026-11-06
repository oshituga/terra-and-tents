import Link from "next/link";
import { FadeIn } from "./FadeIn";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/weddings", label: "Weddings" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const social = [
  { href: "https://www.instagram.com/terraandtent", label: "Instagram" },
  { href: "https://www.pinterest.com/terraandtent", label: "Pinterest" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
const bigLink = `sheen-link font-display text-display-s font-light whitespace-nowrap uppercase ${focus}`;
const smallLink = `sheen-link ${focus}`;

function Label({ children }: { children: string }) {
  return <p className="text-body opacity-50">{children}</p>;
}

export function Footer() {
  return (
    <footer className="flex min-h-svh flex-col justify-between gap-24 bg-cream pt-[70px] text-ink">
      <div className="flex w-full flex-col gap-10 px-8 py-10">
        <div className="flex items-start justify-between gap-10">
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

        <div className="flex items-end justify-between gap-10">
          <FadeIn className="flex flex-col gap-8">
            <Label>Get in touch</Label>
            <div className="dim-group flex flex-col items-start gap-5">
              <a href="tel:+15550142290" className={bigLink}>
                <span className="sheen">+1 (555) 014 2290</span>
              </a>
              <a href="mailto:hello@terraandtent.com" className={bigLink}>
                <span className="sheen">hello@terraandtent.com</span>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={80} className="flex flex-col gap-8">
            <Label>Studio</Label>
            <address className="w-[359px] font-display text-display-s font-light not-italic uppercase">
              14 Orchard Lane, Chipping Campden, GL55 6AB
            </address>
          </FadeIn>
        </div>
      </div>

      <FadeIn className="flex w-full flex-col">
        <div className="px-8">
          <span aria-hidden className="tent-mark block h-[32.8965px] w-9" />
        </div>
        <div className="flex items-end justify-between gap-10 px-8 py-5 text-body whitespace-nowrap">
          <p>© 2026 Terra &amp; Tent. All rights reserved.</p>
          <div className="dim-group flex gap-10">
            <Link href="/privacy" className={smallLink}>
              <span className="sheen">Privacy Policy</span>
            </Link>
            <Link href="/terms" className={smallLink}>
              <span className="sheen">Terms &amp; Conditions</span>
            </Link>
          </div>
          <p className="flex gap-1">
            <span>Designed by:</span>
            <span>Ayomide Oshituga</span>
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}

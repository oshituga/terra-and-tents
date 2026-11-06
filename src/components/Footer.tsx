import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { SwapText } from "./SwapText";

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

const bigLink =
  "group font-display text-display-s font-light whitespace-nowrap uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
const smallLink =
  "group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

function Label({ children }: { children: string }) {
  return <p className="text-body opacity-50">{children}</p>;
}

export function Footer() {
  return (
    <footer className="flex min-h-svh flex-col justify-between gap-24 bg-cream pt-[70px] text-ink">
      <div className="flex w-full flex-col gap-10 px-8 py-10">
        <div className="flex items-start justify-between">
          <FadeIn className="flex w-[598.5px] shrink-0 flex-col gap-[7px]">
            <p className="font-display text-display-s font-light whitespace-nowrap uppercase">
              Terra &amp; Tent
            </p>
            <p className="text-body">Styled on real ground, in real light.</p>
          </FadeIn>

          <div className="flex min-w-0 flex-1 items-start gap-20">
            <FadeIn delay={80} className="w-[455px] shrink-0">
              <nav aria-label="Footer" className="flex flex-col gap-8">
                <Label>Explore</Label>
                <ul className="flex flex-col gap-5">
                  {explore.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className={bigLink}>
                        <SwapText>{label}</SwapText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FadeIn>
            <FadeIn delay={160} className="flex shrink-0 flex-col gap-8">
              <Label>Explore</Label>
              <ul className="flex flex-col gap-5">
                {social.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={bigLink}
                    >
                      <SwapText>{label}</SwapText>
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <FadeIn className="flex w-[455px] flex-col gap-8">
            <Label>Get in touch</Label>
            <div className="flex flex-col items-start gap-5">
              <a href="tel:+15550142290" className={bigLink}>
                <SwapText>+1 (555) 014 2290</SwapText>
              </a>
              <a href="mailto:hello@terraandtent.com" className={bigLink}>
                <SwapText>hello@terraandtent.com</SwapText>
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
        <div className="relative flex items-end justify-between px-8 py-5 text-body whitespace-nowrap">
          <p>© 2026 Terra &amp; Tent. All rights reserved.</p>
          <div className="absolute top-5 left-[604.5px] flex gap-10">
            <Link href="/privacy" className={smallLink}>
              <SwapText>Privacy Policy</SwapText>
            </Link>
            <Link href="/terms" className={smallLink}>
              <SwapText>Terms &amp; Conditions</SwapText>
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

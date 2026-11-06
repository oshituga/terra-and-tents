import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { delay } from "./motion";
import { SwapText } from "./SwapText";

const links = [
  { href: "/about", label: "About" },
  { href: "/weddings", label: "Weddings" },
  { href: "/journal", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
];

export function Nav() {
  return (
    <header className="relative flex items-center justify-between px-8 py-5 text-cream">
      <nav
        aria-label="Main"
        style={delay(0)}
        className="rise flex gap-2.5 overflow-hidden rounded-[25px] bg-black/20 px-[18px] py-2 backdrop-blur-[8px]"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="group px-[18px] py-2 text-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            <SwapText>{label}</SwapText>
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        aria-label="Terra & Tent home"
        style={delay(50)}
        className="rise absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        <Image src="/brand/tent-mark.svg" alt="" width={36} height={32.8965} />
      </Link>

      <ButtonLink
        href="/contact"
        variant="underline"
        compact
        className="rise"
        style={delay(100)}
      >
        Make enquiries
      </ButtonLink>
    </header>
  );
}

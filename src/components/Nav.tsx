import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { delay } from "./motion";
import { SwapText } from "./SwapText";

const links = [
  { href: "/about", label: "About", width: "w-[78px]" },
  { href: "/weddings", label: "Weddings", width: "w-[103px]" },
  { href: "/journal", label: "Journal", width: "w-[87px]" },
  { href: "/gallery", label: "Gallery", width: "w-[85px]" },
];

// overlay: over a photo. solid: on ink pages. light: on cream pages.
const styles = {
  overlay: { header: "text-cream", pill: "bg-black/20 backdrop-blur-[8px]" },
  solid: { header: "text-cream", pill: "bg-cream text-ink" },
  light: { header: "text-ink", pill: "bg-ink text-cream" },
};

export function Nav({
  variant = "overlay",
}: {
  variant?: keyof typeof styles;
}) {
  const { header, pill } = styles[variant];

  return (
    <header
      className={`relative flex items-center justify-between px-page py-5 ${header}`}
    >
      <nav
        aria-label="Main"
        style={delay(0)}
        className={`fade flex gap-2.5 overflow-hidden rounded-[25px] px-[18px] py-2 ${pill}`}
      >
        {links.map(({ href, label, width }) => (
          <Link
            key={href}
            href={href}
            className={`group flex justify-center py-2 text-body ${width} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current`}
          >
            <SwapText>{label}</SwapText>
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        aria-label="Terra & Tent home"
        style={delay(0)}
        className="fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        <span aria-hidden className="tent-mark block h-[32.8965px] w-9" />
      </Link>

      <ButtonLink
        href="/contact"
        variant="underline"
        compact
        className="fade"
        style={delay(0)}
      >
        Make enquiries
      </ButtonLink>
    </header>
  );
}

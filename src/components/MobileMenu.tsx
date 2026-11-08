"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ButtonLink } from "./ButtonLink";
import { SwapText } from "./SwapText";
import { delay } from "./motion";
import { enquiryHref } from "@/lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/weddings", label: "Weddings" },
  { href: "/journal", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const noop = () => () => {};

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

// Underlined text button, matching the "Make enquiries" link.
function TextButton({
  label,
  className = "",
  style,
  ...props
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      style={style}
      className={`group relative inline-flex items-center justify-center pt-1 pb-[7px] text-body whitespace-nowrap ${focus} ${className}`}
      {...props}
    >
      <SwapText>{label}</SwapText>
      <span aria-hidden className="underline-line" />
    </button>
  );
}

/**
 * Below the desktop layout the nav becomes a "Menu" button that opens a
 * full-screen panel with the pages, the enquiry button and contact details.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();

  // The panel is portalled to <body>, which only exists in the browser.
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  // Lock the page behind the open menu and keep focus inside it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    closeButton.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Close if the screen widens into the desktop layout.
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = previous;
      lenis?.start();
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <TextButton
        ref={trigger}
        label="Menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
        className="fade lg:hidden"
        style={delay(0)}
      />

      {mounted &&
        createPortal(
          <div
            ref={panel}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-open={open ? "" : undefined}
            className="menu-panel fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-cream lg:hidden"
          >
            <div className="flex items-center justify-between px-page py-5">
              <Link
                href="/"
                aria-label="Terra & Tent home"
                onClick={close}
                className={focus}
              >
                <span
                  aria-hidden
                  className="tent-mark block h-[32.8965px] w-9"
                />
              </Link>
              <TextButton
                ref={closeButton}
                label="Close"
                onClick={() => {
                  close();
                  trigger.current?.focus();
                }}
              />
            </div>

            <nav
              aria-label="Main"
              className="flex flex-1 flex-col justify-center px-page py-10"
            >
              <ul className="dim-group flex flex-col items-start gap-4">
                {links.map(({ href, label }, i) => (
                  <li
                    key={href}
                    className="menu-item"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={pathname === href ? "page" : undefined}
                      className={`sheen-link font-display text-display-l font-light uppercase ${focus}`}
                    >
                      <span className="sheen">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="menu-item flex flex-col items-start gap-6 px-page pb-10"
              style={{ "--i": links.length } as CSSProperties}
            >
              <ButtonLink href="/contact" variant="solid">
                Make enquiries
              </ButtonLink>
              <div className="flex flex-col gap-1 text-body opacity-70">
                <a href={enquiryHref} className={focus}>
                  hello@terraandtent.com
                </a>
                <a href="tel:+15550142290" className={focus}>
                  +1 (555) 014 2290
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

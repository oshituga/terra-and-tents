"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export type Section = { id: string; label: string };

/** Sticky contents list; the section in view gets the dash and full ink. */
export function OnThisPage({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    // A section counts as current once its top passes 40% down the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -24 });
    else el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="On this page" className="flex flex-col gap-[35px]">
      <p className="text-body leading-[normal]">On this page</p>
      <ul className="flex flex-col gap-2 pl-5">
        {sections.map(({ id, label }) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={current ? "location" : undefined}
                className="toc-link flex items-start gap-0.5 text-body whitespace-nowrap leading-[normal] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <span aria-hidden className="toc-dash mt-[9px] h-0.5 shrink-0 bg-ink" />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

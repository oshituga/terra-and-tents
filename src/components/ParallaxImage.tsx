"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

export function ParallaxImage({
  src,
  alt,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
}) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centre =
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const offset = Math.max(-1, Math.min(1, centre)) * rect.height * 0.07;
      el.style.setProperty("--py", `${offset.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={frame} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover"
        />
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import { SwapText } from "./SwapText";

type Variant = "solid" | "dark" | "underline";

const variants: Record<Variant, string> = {
  solid: "rounded-[25px] bg-cream text-ink",
  dark: "rounded-[25px] bg-ink text-cream",
  underline: "",
};

export function ButtonLink({
  href,
  variant,
  compact = false,
  className = "",
  style,
  children,
}: {
  href: string;
  variant: Variant;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
  children: string;
}) {
  return (
    <Link
      href={href}
      style={style}
      className={`group relative inline-flex items-center justify-center px-6 text-body whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${variant === "underline" ? (compact ? "pt-[15px] pb-[16.5px]" : "pt-4 pb-[17.5px]") : compact ? "py-[15px]" : "py-4"} ${variants[variant]} ${className}`}
    >
      <SwapText>{children}</SwapText>
      {variant === "underline" && (
        <span aria-hidden className="underline-line" />
      )}
    </Link>
  );
}

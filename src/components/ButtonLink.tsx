import type { CSSProperties } from "react";
import Link from "next/link";
import { SwapText } from "./SwapText";

type Variant = "solid" | "underline";

const variants: Record<Variant, string> = {
  solid: "rounded-[25px] bg-cream text-ink",
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
      className={`group relative inline-flex items-center justify-center px-6 text-body whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${compact ? "py-[15px]" : "py-4"} ${variants[variant]} ${className}`}
    >
      <SwapText>{children}</SwapText>
      {variant === "underline" && (
        <span aria-hidden className="underline-line" />
      )}
    </Link>
  );
}

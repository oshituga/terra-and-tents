import Link from "next/link";

type Variant = "solid" | "underline";

const variants: Record<Variant, string> = {
  solid: "rounded-[25px] bg-cream text-ink",
  underline: "border-b-[1.5px] border-current",
};

export function ButtonLink({
  href,
  variant,
  compact = false,
  children,
}: {
  href: string;
  variant: Variant;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 text-body whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${compact ? "py-[15px]" : "py-4"} ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}

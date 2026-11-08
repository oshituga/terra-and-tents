import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { NoOrphans } from "@/components/NoOrphans";
import { SmoothScroll } from "@/components/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const saphion = localFont({
  src: "../fonts/SaphionLight.otf",
  variable: "--font-saphion",
  weight: "300",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terra & Tent",
  description:
    "Wedding styling and decor studio in Chipping Campden. Tablescapes, tents and ceremonies rooted in natural materials, warm light and real flowers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${outfit.variable} ${saphion.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        <NoOrphans />
        {children}
      </body>
    </html>
  );
}

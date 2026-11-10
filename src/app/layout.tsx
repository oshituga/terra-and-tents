import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { NoOrphans } from "@/components/NoOrphans";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TouchPress } from "@/components/TouchPress";
import { siteUrl } from "@/lib/site";

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

const title = "Terra & Tent | Outdoor wedding styling";
const description =
  "Arches, aisles and long tables, styled on real ground in real light. A small studio in the Cotswolds designing and building outdoor weddings.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Terra & Tent",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
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
        <TouchPress />
        {children}
      </body>
    </html>
  );
}

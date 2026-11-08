import type { Metadata } from "next";

/**
 * Title, description and link-preview copy for one page. The preview image
 * comes from the nearest opengraph-image file (the shared artwork, or a
 * generated one for weddings and journal articles).
 */
// The shared artwork (app/opengraph-image.jpg). Weddings and journal articles
// replace it with a generated card from their own opengraph-image file.
const artwork = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Arches, aisles and long tables, styled outdoors, with the Terra & Tent mark above a row of ceremony photos",
};

// Articles (weddings and journal posts) have their own generated card.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  // Leave the key out for articles: even an empty value hides their card.
  const images = type === "article" ? {} : { images: [artwork] };
  const full = title.includes("Terra & Tent")
    ? title
    : `${title} | Terra & Tent`;
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: "Terra & Tent",
      locale: "en_GB",
      type,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      ...images,
    },
  };
}

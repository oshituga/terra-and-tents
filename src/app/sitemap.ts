import type { MetadataRoute } from "next";
import { articles } from "@/lib/journal";
import { siteUrl } from "@/lib/site";
import { weddings } from "@/lib/weddings";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/weddings",
    ...weddings.map((w) => `/weddings/${w.slug}`),
    "/journal",
    ...articles.map((a) => `/journal/${a.slug}`),
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}

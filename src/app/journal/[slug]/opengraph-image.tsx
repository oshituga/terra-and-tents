import { ogCard, ogSize } from "@/lib/og";
import { getArticle } from "@/lib/journal";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A Terra & Tent journal article";

// Each article's cover file, by slug.
const covers: Record<string, string> = {
  "how-to-choose-flowers-for-every-season": "journal-flowers-every-season.webp",
  "why-we-build-with-what-the-land-gives-us": "journal-land-cover.webp",
  "planning-a-tented-wedding-from-the-ground-up": "journal-tented-wedding.webp",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug)!;
  return ogCard({
    photo: covers[slug],
    eyebrow: `Journal · ${a.author}`,
    title: a.title,
  });
}

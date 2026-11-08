import { ogCard, ogSize } from "@/lib/og";
import { getWedding } from "@/lib/weddings";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A Terra & Tent wedding";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const w = getWedding((await params).slug)!;
  // Cover files are named after the first partner, e.g. maja-cover.webp.
  const prefix = w.slug.split("-")[0];
  return ogCard({
    photo: `weddings/${prefix}-cover.webp`,
    eyebrow: `${w.styling}, ${w.location}`,
    title: w.couple,
  });
}

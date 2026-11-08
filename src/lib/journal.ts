import type { StaticImageData } from "next/image";
import landCover from "@/assets/journal-land-cover.webp";
import landSmall1 from "@/assets/journal-land-small-1.webp";
import landSmall2 from "@/assets/journal-land-small-2.webp";
import landSmall3 from "@/assets/journal-land-small-3.webp";
import landTall from "@/assets/journal-land-tall.webp";
import flowersCover from "@/assets/journal-flowers-every-season.webp";
import flowersSmall1 from "@/assets/journal-flowers-small-1.webp";
import flowersSmall2 from "@/assets/journal-flowers-small-2.webp";
import flowersSmall3 from "@/assets/journal-flowers-small-3.webp";
import flowersTall from "@/assets/journal-flowers-tall.webp";
import tentedCover from "@/assets/journal-tented-wedding.webp";
import tentedSmall1 from "@/assets/journal-tented-small-1.webp";
import tentedSmall2 from "@/assets/journal-tented-small-2.webp";
import tentedSmall3 from "@/assets/journal-tented-small-3.webp";
import tentedTall from "@/assets/journal-tented-tall.webp";

export type JournalImage = {
  src: StaticImageData;
  alt: string;
  position?: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  author: string;
  role: string;
  date: string;
  dateLabel: string;
  summary: string;
  cover: JournalImage;
  /** Card crop on the journal list, when it differs from the cover's. */
  cardPosition?: string;
  /** Three paragraphs above the small photos. */
  opening: [string, string, string];
  small: [JournalImage, JournalImage, JournalImage];
  /** The paragraph under the small photos. */
  middle: string;
  tall: JournalImage;
  /** The paragraph under the tall photo. */
  closing: string;
};

export const articles: JournalArticle[] = [
  {
    slug: "how-to-choose-flowers-for-every-season",
    title: "How to Choose Flowers for Every Season",
    author: "Eleanor Hart",
    role: "Founder and Creative Director",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
    summary:
      "The best flowers for your day are the ones already growing near it. Here is how we choose stems through the year, from the first spring bulbs to the last dahlias of autumn.",
    cover: {
      src: flowersCover,
      alt: "A gardener in a straw hat cutting white flowers among green foliage",
      position: "50% 52%",
    },
    opening: [
      "Every couple asks us for their favourite flower, and we always ask a question back: when is the wedding? A peony in June is generous and cheap and smells of the garden it came from. The same peony in October has crossed an ocean, costs four times as much and droops by the speeches. Choosing by season is not a compromise. It is how you get flowers at their best.",
      "Spring is all lightness. Tulips, narcissi, ranunculus, blossom cut from the orchard and the first sweet peas under glass. We keep spring arrangements loose and airy, with plenty of green, because the season itself still feels a little bare and the flowers look best when they are allowed to lean.",
      "Summer is abundance, and the risk is too much. Roses, peonies, cornflowers, scabious and armfuls of wild carrot all want to be in the jar at once. We choose two or three to lead and let the rest sit back, so that the tables feel full without becoming busy.",
    ],
    small: [
      {
        src: flowersSmall1,
        alt: "A florist in a linen apron building a peach and pink arrangement at a long work table",
      },
      {
        src: flowersSmall2,
        alt: "Rust, blush and plum dahlias packed close together",
      },
      {
        src: flowersSmall3,
        alt: "Coral dahlias growing in a cutting garden",
      },
    ],
    middle:
      "Autumn is our favourite season to style. Dahlias, chrysanthemums, rose hips, crab apples and seed heads bring colour that is warm and a little faded, and the light at that time of year flatters all of it. Winter asks for less: branches, evergreens, hellebores, dried grasses and a lot of candlelight. A winter table with very few flowers can feel more generous than a summer table with hundreds.",
    tall: {
      src: flowersTall,
      alt: "A glass vase of yellow and pink garden flowers on brown paper beside cut stems and secateurs",
    },
    closing:
      "Whatever the month, we begin by walking the site and the lanes around it to see what is already in flower. We grow what we can in the studio garden, buy from British growers wherever possible and only import when nothing local will do. The result is a wedding that looks like its own season and its own place, which is always more beautiful than a catalogue.",
  },
  {
    slug: "why-we-build-with-what-the-land-gives-us",
    title: "Why we build with what the land gives us",
    author: "Clara Whitmore",
    role: "Lead Stylist",
    date: "2026-09-09",
    dateLabel: "9 September 2026",
    summary:
      "No two days we style look alike, because no two couples, fields or families are the same. Browse the weddings we’ve built, from quiet garden lunches to long marquee evenings.",
    cover: {
      src: landCover,
      alt: "Rows of dark chairs and a flower-lined aisle beneath a broad old tree, set for a ceremony",
    },
    opening: [
      "Before we place a single flower, we spend a day doing almost nothing. We walk the site in the morning and again in the evening, and we sit in the places where guests will sit. We watch where the light falls and where the wind comes from, and we notice what the ground already does well. It sounds slow, but every good decision we have made started on that walk.",
      "The first time we understood this properly was at a lake in Dalarna. Maja and Oliver had sent us a single photograph and a short note, and when we arrived, the water was so still that the forest appeared twice, once on the shore and once upside down in the lake. Our first instinct was to build something impressive. Within an hour we had given that up, because anything large would have broken the reflection. We built a light arch from birch poles gathered from the woods behind us, tied it with cord and hung it with greenery, and the lake did the rest.",
      "On a hilltop in the Val d’Orcia, the problem was the opposite. The view was so wide that a normal marquee would have closed it off. We kept the walls low and the lines plain, turned the open side toward the valley and dressed the whole room with olive branches from the farm next door. By the evening, the tent no longer looked like something placed on the hill. It looked like part of it.",
    ],
    small: [
      {
        src: landSmall1,
        alt: "Rows of golden wheat in a field under a hazy sky",
      },
      {
        src: landSmall2,
        alt: "Small bales and scattered flowers laid out in rows across a mown field",
      },
      {
        src: landSmall3,
        alt: "A grassy meadow edged by dense green trees",
      },
    ],
    middle:
      "In an orchard in Chipping Campden, the land gave us shade, old trees and a slope that nobody had thought to use. We laid one long table along the slope, strung light between the branches and brought almost nothing else. People often ask what we added. The truthful answer is that we mostly took things away until the orchard could speak for itself.",
    tall: {
      src: landTall,
      alt: "A ring of straw bales draped in white cloth around a rug and a small table in a field below a mountain",
    },
    closing:
      "None of this means we build less work. A setting that looks effortless is usually the most carefully built one, because every piece has been chosen for a reason. It simply means the starting point is different. We do not begin with a mood board and force it onto a field. We begin with the field and ask what it would like to become for their very special day.",
  },
  {
    slug: "planning-a-tented-wedding-from-the-ground-up",
    title: "Planning a Tented Wedding From the Ground Up",
    author: "Eleanor Hart",
    role: "Founder and Creative Director",
    date: "2026-09-28",
    dateLabel: "28 September 2026",
    summary:
      "A tent turns any field into a room, but only if you plan it from the ground up. These are the questions we answer long before the canvas goes up.",
    cover: {
      src: tentedCover,
      alt: "An aerial view of a white stretch tent between vineyard rows and trees",
    },
    opening: [
      "A tent can turn almost any field into a room, which is exactly why it needs more planning than a venue. A venue arrives with floors, power, toilets and a kitchen. A field arrives with grass. Everything else, from the first tent peg to the last light switch, is something we choose, carry in and take away again.",
      "We always start with the ground itself. Is it level, and does it drain after rain? Can a lorry reach it without churning up the lane? Where does the sun set, and which way does the wind usually blow? The answers decide where the tent sits long before they decide how it looks, and a tent in the right spot needs far less dressing.",
      "Then we choose the shape. A stretch tent suits a relaxed afternoon and a sloping site. A clear span marquee gives a straight, formal room with plenty of height. Bell tents and sailcloth peaks feel softer and work beautifully for smaller numbers. We match the frame to the guest count, the season and the view, and we always leave room for a dance floor that nobody plans for until the band starts.",
    ],
    small: [
      {
        src: tentedSmall1,
        alt: "A long dressed table on a lawn under strings of festoon lights at dusk",
      },
      {
        src: tentedSmall2,
        alt: "A canvas bell tent pitched on grass beneath a blue sky with soft cloud",
      },
      {
        src: tentedSmall3,
        alt: "Long tables set with white linen and flowers in a courtyard strung with lights",
      },
    ],
    middle:
      "The practical parts are what make the evening feel effortless. Flooring that sits level on uneven ground, heating for an English September, power that will not trip during the first dance, lighting that works from late afternoon into the dark, and a plan for rain that everyone already knows. We would rather spend an hour on drainage than a minute apologising for wet shoes.",
    tall: {
      src: tentedTall,
      alt: "A white tented aisle lined with rows of folding chairs leading to a floral arch",
    },
    closing:
      "Only once the ground and the frame are settled do we start to style. Linen on the ceiling to soften the canvas, long tables that follow the line of the tent, flowers that echo the hedgerows outside and candles everywhere they are safe. A tented wedding planned this way never feels like a temporary room. It feels as if the field always had a party waiting in it.",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** The article that follows, looping back to the first. */
export function nextArticle(slug: string) {
  const i = articles.findIndex((a) => a.slug === slug);
  return articles[(i + 1) % articles.length];
}

import type { StaticImageData } from "next/image";
import majaHero from "@/assets/weddings/maja-hero.webp";
import majaCover from "@/assets/weddings/maja-cover.webp";
import majaOverview1 from "@/assets/weddings/maja-overview-1.webp";
import majaOverview2 from "@/assets/weddings/maja-overview-2.webp";
import majaBrief from "@/assets/weddings/maja-brief.webp";
import majaGallery1 from "@/assets/weddings/maja-gallery-1.webp";
import majaGallery2 from "@/assets/weddings/maja-gallery-2.webp";
import majaGallery3 from "@/assets/weddings/maja-gallery-3.webp";
import majaGallery4 from "@/assets/weddings/maja-gallery-4.webp";
import majaNote from "@/assets/weddings/maja-note.webp";
import majaQuote from "@/assets/quote-maja-oliver.webp";
import mariaHero from "@/assets/weddings/maria-hero.webp";
import mariaCover from "@/assets/weddings/maria-cover.webp";
import mariaOverview1 from "@/assets/weddings/maria-overview-1.webp";
import mariaOverview2 from "@/assets/weddings/maria-overview-2.webp";
import mariaBrief from "@/assets/weddings/maria-brief.webp";
import mariaGallery1 from "@/assets/weddings/maria-gallery-1.webp";
import mariaGallery2 from "@/assets/weddings/maria-gallery-2.webp";
import mariaGallery3 from "@/assets/weddings/maria-gallery-3.webp";
import mariaGallery4 from "@/assets/weddings/maria-gallery-4.webp";
import mariaNote from "@/assets/weddings/maria-note.webp";
import mariaQuote from "@/assets/quote-maria.webp";
import amaraHero from "@/assets/weddings/amara-hero.webp";
import amaraCover from "@/assets/weddings/amara-cover.webp";
import amaraOverview1 from "@/assets/weddings/amara-overview-1.webp";
import amaraOverview2 from "@/assets/weddings/amara-overview-2.webp";
import amaraBrief from "@/assets/weddings/amara-brief.webp";
import amaraGallery1 from "@/assets/weddings/amara-gallery-1.webp";
import amaraGallery2 from "@/assets/weddings/amara-gallery-2.webp";
import amaraGallery3 from "@/assets/weddings/amara-gallery-3.webp";
import amaraGallery4 from "@/assets/weddings/amara-gallery-4.webp";
import amaraNote from "@/assets/weddings/amara-note.webp";
import amaraQuote from "@/assets/quote-amara.webp";
import sofiaHero from "@/assets/weddings/sofia-hero.webp";
import sofiaCover from "@/assets/weddings/sofia-cover.webp";
import sofiaOverview1 from "@/assets/weddings/sofia-overview-1.webp";
import sofiaOverview2 from "@/assets/weddings/sofia-overview-2.webp";
import sofiaBrief from "@/assets/weddings/sofia-brief.webp";
import sofiaGallery1 from "@/assets/weddings/sofia-gallery-1.webp";
import sofiaGallery2 from "@/assets/weddings/sofia-gallery-2.webp";
import sofiaGallery3 from "@/assets/weddings/sofia-gallery-3.webp";
import sofiaGallery4 from "@/assets/weddings/sofia-gallery-4.webp";
import sofiaNote from "@/assets/weddings/sofia-note.webp";
import sofiaQuote from "@/assets/quote-sofia.webp";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, for crops set in Figma. */
  position?: string;
};

export type Wedding = {
  slug: string;
  couple: string;
  /** Short place for quotes, e.g. "Dalarna". */
  region: string;
  location: string;
  /** Hero eyebrow, e.g. "Lakeside styling". */
  styling: string;
  /** One-paragraph summary for the wedding cards. */
  summary: string;
  cover: Photo;
  hero: Photo;
  overview: {
    headline: string;
    paragraphs: [string, string];
    facts: [string, string][];
    photos: [Photo, Photo];
  };
  brief: { eyebrow: string; headline: string; photo: Photo };
  approach: {
    left: { title: string; body: string };
    middle: { headline: string; body: string };
    right: { title: string; body: string };
  };
  layout: { headline: string; caption: string; site: string; ceremony: string };
  gallery: [Photo, Photo, Photo, Photo];
  note: { quote: string; headline: string; photo: Photo };
  /** The Home page testimonial. */
  testimonial: { quote: string; photo: Photo };
};

const scope = "Design, build, florals, lighting";

export const weddings: Wedding[] = [
  {
    slug: "maja-and-oliver",
    couple: "Maja & Oliver",
    region: "Dalarna",
    location: "Dalarna, Sweden",
    styling: "Lakeside styling",
    summary:
      "A birch-branch arch hung with dried flowers and trailing greenery, set at the edge of a still forest lake. Maja and Oliver wanted a ceremony that felt quiet and unhurried, so we dressed it with lace, candlelight and nothing more.",
    cover: {
      src: majaCover,
      alt: "A birch-pole arch and a lace-dressed table at the edge of a still forest lake",
    },
    hero: {
      src: majaHero,
      alt: "Maja and Oliver walking hand in hand through long meadow grass below red farm barns and hills",
    },
    overview: {
      headline: "Quiet enough to hear the water",
      paragraphs: [
        "Maja and Oliver wanted a ceremony that felt as still as the lake. They had no interest in a showpiece, only a quiet place at the water’s edge where the people closest to them could stand together and listen.",
        "We kept the structure light, the palette natural and the dressing close to the forest, so nothing in the scene competed with the landscape. Birch branches, trailing greenery and candlelight did the work, and the lake did the rest.",
      ],
      facts: [
        ["Location", "Dalarna, Sweden"],
        ["Style", "Lakeside"],
        ["Scope", scope],
        ["Season", "Early autumn"],
        ["Build time", "3 days"],
        ["Crew", "Eight people"],
      ],
      photos: [
        {
          src: majaOverview1,
          alt: "Turf-roofed timber cabins on a rocky green hillside",
        },
        {
          src: majaOverview2,
          alt: "A river running fast over smooth rocks below a rope bridge and birch trees",
        },
      ],
    },
    brief: {
      eyebrow: "Nothing that wasn’t already there",
      headline:
        "Maja and Oliver asked for a ceremony that looked as though we had simply found it that way.",
      photo: {
        src: majaBrief,
        alt: "Maja and Oliver holding each other in a meadow with a red farmhouse and hills behind",
      },
    },
    approach: {
      left: {
        title: "Build from the forest",
        body: "We placed the arch where the lake mirrored the trees, so the reflection would frame the ceremony without any help from us. The birch poles, trailing greenery and wild grasses all came from the surrounding woodland. Every piece was lashed and tied, with no digging and no fixings, so the structure looked grown there and could come down completely without a mark on the shore.",
      },
      middle: {
        headline: "We worked with the shoreline",
        body: "The lake was already the centrepiece, so we spent the first day walking the shore and watching the light before we built anything. Every decision came from what the land offered.",
      },
      right: {
        title: "Finish with candlelight",
        body: "Pillar candles on lace and a gold paisley runner gave the scene its only warmth, set against the cool greens and greys of the water and the spruce. We tested them at dusk and again in the morning light, and kept the arrangement simple so the candles stayed the quiet focal point, never the loudest thing in view.",
      },
    },
    layout: {
      headline: "The shore, mapped out",
      caption:
        "A grass path led down to four low benches facing the water, with the birch arch and a candle-lit table at the far end. Everything sat within a few steps of the shore, so the whole ceremony could be seen at once and nothing was built that the lake didn’t already frame.",
      site: "maja-and-oliver-site",
      ceremony: "maja-and-oliver-ceremony",
    },
    gallery: [
      {
        src: majaGallery1,
        alt: "An aerial view of a dark forest lake with guests and tables gathered on the grassy shore",
      },
      {
        src: majaGallery2,
        alt: "Maja reading her vows from a card, holding a bouquet of white flowers and greenery",
      },
      {
        src: majaGallery3,
        alt: "Dining tables and chairs set on the lakeshore lawn, with the forest reflected in the water",
      },
      {
        src: majaGallery4,
        alt: "Maja and Oliver sitting by lamplight in a dark timber room",
      },
    ],
    note: {
      quote:
        "“We asked for a ceremony that felt like it had always been there, and that is exactly what we got. Standing by the water with everyone we love, we forgot anything had been built at all.”",
      headline: "Words from the couple standing under the arch",
      photo: {
        src: majaNote,
        alt: "Maja and Oliver kissing under the birch arch by the lake",
      },
    },
    testimonial: {
      quote:
        "“The moment we walked in, we stopped talking. It looked better than anything we had pictured, and it felt like us.”",
      photo: {
        src: majaQuote,
        alt: "Maja and Oliver kissing in a long grass meadow below red farm barns and pine trees under a cloudy sky",
      },
    },
  },
  {
    slug: "maria-and-israel",
    couple: "Maria & Israel",
    region: "Alsace",
    location: "Alsace, France",
    styling: "Farmhouse styling",
    summary:
      "A half-timbered farmhouse, an old pear tree hung with lanterns and a barn swept clean for dancing. Maria and Israel wanted their families at home in the garden, so we built the day around the house they had always loved.",
    cover: {
      src: mariaCover,
      alt: "A half-timbered brick farmhouse beside a garden lawn set with a wooden ceremony table",
    },
    hero: {
      src: mariaHero,
      alt: "Maria and Israel reflected in a tall mirror sign on the farmhouse lawn",
    },
    overview: {
      headline: "A garden that felt like home",
      paragraphs: [
        "Maria and Israel wanted to be married in the garden of the farmhouse where Maria spent every childhood summer. They asked for nothing grand, only the feeling of a long Sunday lunch that happened to include their vows.",
        "We worked with what the farm already had. The old pear tree became the ceremony canopy, the orchard gave us shade for the drinks, and the timber barn, swept and strung with lights, held the supper and the dancing late into the night.",
      ],
      facts: [
        ["Location", "Alsace, France"],
        ["Style", "Farmhouse"],
        ["Scope", scope],
        ["Season", "Late spring"],
        ["Build time", "4 days"],
        ["Crew", "Ten people"],
      ],
      photos: [
        {
          src: mariaOverview1,
          alt: "The half-timbered farmhouse framed by a flowering climbing rose",
        },
        {
          src: mariaOverview2,
          alt: "Woven rattan lanterns hanging from the branches of an old tree",
        },
      ],
    },
    brief: {
      eyebrow: "A family garden, opened up",
      headline:
        "Maria and Israel asked for a wedding that felt like coming home, only with everyone they love in one place.",
      photo: {
        src: mariaBrief,
        alt: "Maria and Israel looking out through an open window in the farmhouse’s brick and timber wall",
      },
    },
    approach: {
      left: {
        title: "Start under the pear tree",
        body: "We set the ceremony beneath the old pear tree so its branches formed the roof. Lanterns hung at different heights through the crown, the table took a simple linen runner and two stone urns of garden roses, and the guests sat on rows of timber chairs facing the farmhouse wall.",
      },
      middle: {
        headline: "We worked with the farm",
        body: "The house, the orchard and the barn were already the right size for the day, so we moved between them rather than building anything new. Each part of the evening had its own room.",
      },
      right: {
        title: "Finish in the barn",
        body: "Inside the barn we laid rugs on the boards, hung festoon lights from the beams and set long tables for supper. When the plates were cleared the tables moved to the walls, and the barn became the dance floor until the last guest went home.",
      },
    },
    layout: {
      headline: "The farm, mapped out",
      caption:
        "Guests arrived along the gravel drive, gathered on the garden lawn under the pear tree for the vows, then drifted past the orchard to supper tables by the barn. Every part of the day sat within a short walk of the farmhouse door.",
      site: "maria-and-israel-site",
      ceremony: "maria-and-israel-ceremony",
    },
    gallery: [
      {
        src: mariaGallery1,
        alt: "Maria and Israel at the ceremony table under the trees, with guests seated on the lawn",
      },
      {
        src: mariaGallery2,
        alt: "Maria and Israel walking back down the aisle as guests cheer",
      },
      {
        src: mariaGallery3,
        alt: "Rows of carved wooden chairs and potted white flowers set in the shade of the garden",
      },
      {
        src: mariaGallery4,
        alt: "Maria twirling under Israel’s arm on a rug inside the lit timber barn",
      },
    ],
    note: {
      quote:
        "“It felt like the garden on its very best day. Our families sat under the tree we used to climb as children, and the barn was full until the sun came up.”",
      headline: "Words from the couple under the old pear tree",
      photo: {
        src: mariaNote,
        alt: "Maria and Israel holding hands under the tree during the ceremony",
      },
    },
    testimonial: {
      quote:
        "“They took the garden we grew up in and made it the best version of itself. Nobody wanted to leave the barn.”",
      photo: {
        src: mariaQuote,
        alt: "Maria and Israel kissing beneath her veil, seen through a farmhouse window",
      },
    },
  },
  {
    slug: "amara-and-james",
    couple: "Amara & James",
    region: "Madeira",
    location: "Madeira, Portugal",
    styling: "Hillside styling",
    summary:
      "A palm-lined lawn on a hillside above the valley, with timber benches, white flowers and long tables under festoon lights. Amara and James wanted the view to do the talking, so we kept every piece low and pale.",
    cover: {
      src: amaraCover,
      alt: "Wooden benches on a green lawn between tall palms, with hills rising behind",
      position: "50% 67.5%",
    },
    hero: {
      src: amaraHero,
      alt: "Guests seated on benches on a hillside lawn facing Amara and James, with palms and green hills behind",
      position: "50% 97.6%",
    },
    overview: {
      headline: "Room enough for the view",
      paragraphs: [
        "Amara and James chose a quinta on a green hillside, with an avenue of palms leading up to a lawn that seems to stop at the sky. They wanted their guests to look out, not at the decoration, and to feel the warmth of the island all day.",
        "We kept the palette pale and the furniture low. Plain timber benches, a simple cross arch tied with white ribbon and clusters of white flowers along the aisle left the valley as the backdrop, while long tables under festoon lights carried the evening.",
      ],
      facts: [
        ["Location", "Madeira, Portugal"],
        ["Style", "Hillside"],
        ["Scope", scope],
        ["Season", "Early summer"],
        ["Build time", "3 days"],
        ["Crew", "Nine people"],
      ],
      photos: [
        {
          src: amaraOverview1,
          alt: "A broad tree on a dry hillside under a pale sky",
        },
        {
          src: amaraOverview2,
          alt: "Rows of wooden benches on the lawn beneath tall palms",
        },
      ],
    },
    brief: {
      eyebrow: "Low, pale and open",
      headline:
        "Amara and James asked us to build a ceremony that let the whole valley sit in the front row.",
      photo: {
        src: amaraBrief,
        alt: "Amara and James laughing with their guests on the hillside lawn after the vows",
      },
    },
    approach: {
      left: {
        title: "Build for the view",
        body: "We set the benches in straight rows facing the drop of the hill, so every guest looked over the couple and out across the valley. The timber arch was two crossed beams tied with white ribbon, light enough that it framed the view rather than blocking it.",
      },
      middle: {
        headline: "We worked with the slope",
        body: "The lawn falls gently towards the valley, so we used the fall to lift the back rows and placed the aisle along the line of the palms. Nothing was levelled or dug.",
      },
      right: {
        title: "Finish under the festoons",
        body: "Supper moved to long tables beside the paddock, set with pale linen, white flowers and glass. As the light went, festoon lights strung between the palms took over, warm enough to see faces and low enough to keep the stars.",
      },
    },
    layout: {
      headline: "The hillside, mapped out",
      caption:
        "The palm avenue led guests up from the track to the ceremony lawn, where ten benches faced the open valley. Supper sat a short walk away by the paddock, close enough to keep the view and far enough to feel like a new room.",
      site: "amara-and-james-site",
      ceremony: "amara-and-james-ceremony",
    },
    gallery: [
      {
        src: amaraGallery1,
        alt: "James lifting Amara’s hand to his face during the ceremony",
        position: "50% 33%",
      },
      {
        src: amaraGallery2,
        alt: "Crossed timber beams of the arch tied with white ribbon against the sky",
      },
      {
        src: amaraGallery3,
        alt: "White flowers along the aisle between benches, with palms beyond",
      },
      {
        src: amaraGallery4,
        alt: "Guests on benches across the hillside lawn below the palms",
        position: "50% 91%",
      },
    ],
    note: {
      quote:
        "“Every photo has the valley behind us, and every guest remembers the light. It looked effortless, which we now know took a great deal of work.”",
      headline: "Words from the couple with the valley behind them",
      photo: {
        src: amaraNote,
        alt: "Amara and James kneeling at the ceremony table on the lawn",
      },
    },
    testimonial: {
      quote:
        "“We asked for the view and nothing in the way of it. Every bench, every flower and every light was there to help us look out.”",
      photo: {
        src: amaraQuote,
        alt: "Amara and James standing before the celebrant under a grey sky and bare branches",
        position: "50% 69.7%",
      },
    },
  },
  {
    slug: "sofia-and-henry",
    couple: "Sofia & Henry",
    region: "Asturias",
    location: "Asturias, Spain",
    styling: "Woodland styling",
    summary:
      "Vows in a forest glade beside a waterfall pool, with cross-back chairs, potted white flowers and a wooden altar. Sofia and Henry wanted the sound of the falls behind every word, so we carried the whole day in on foot.",
    cover: {
      src: sofiaCover,
      alt: "Cross-back chairs and potted white flowers in a forest glade beside a waterfall",
      position: "50% 88%",
    },
    hero: {
      src: sofiaHero,
      alt: "Sofia and Henry at the altar in a forest glade, with guests standing beside the falls",
      position: "50% 69%",
    },
    overview: {
      headline: "Married within earshot of the falls",
      paragraphs: [
        "Sofia and Henry found a glade in a river valley, a short walk through the woods from the road, where a waterfall drops into a clear pool. They wanted a ceremony small enough to feel private and close enough to the water to hear it.",
        "We carried everything in by hand along the woodland path. Dark cross-back chairs, a simple wooden altar and pots of white flowers sat lightly on the grass, ferns lined the aisle, and the supper canopy waited by the cabin for when the light began to go.",
      ],
      facts: [
        ["Location", "Asturias, Spain"],
        ["Style", "Woodland"],
        ["Scope", scope],
        ["Season", "Late summer"],
        ["Build time", "4 days"],
        ["Crew", "Ten people"],
      ],
      photos: [
        {
          src: sofiaOverview1,
          alt: "A waterfall pouring over dark rocks in black and white",
        },
        {
          src: sofiaOverview2,
          alt: "The waterfall pool seen through ferns, with a wooden bench in the foreground",
        },
      ],
    },
    brief: {
      eyebrow: "Carried in, carried out",
      headline:
        "Sofia and Henry asked for a ceremony that felt like a clearing we had stumbled on in the woods.",
      photo: {
        src: sofiaBrief,
        alt: "Sofia and Henry smiling at the wooden altar in the glade",
        position: "50% 18%",
      },
    },
    approach: {
      left: {
        title: "Build by hand",
        body: "There was no road to the glade, so every chair, post and pot came in along the path on foot. We chose pieces that were light, dark and simple, so they settled into the shade of the trees instead of standing out against it.",
      },
      middle: {
        headline: "We worked with the water",
        body: "We placed the altar with its back to the pool so the falls framed the couple, and set the rows on the flattest part of the glade. The water stayed the loudest thing in the room.",
      },
      right: {
        title: "Finish under canvas",
        body: "After the vows, guests followed the path back to a canopy by the cabin, where two long tables waited with candles and woodland greenery. The canopy kept off the evening damp and held the warmth of the meal well into the night.",
      },
    },
    layout: {
      headline: "The glade, mapped out",
      caption:
        "A woodland path led guests from the car park past the cabin to a glade beside the pool, where sixty chairs faced a wooden altar with the falls behind. Supper sat under a canopy a short walk away, close to the cabin and the path home.",
      site: "sofia-and-henry-site",
      ceremony: "sofia-and-henry-ceremony",
    },
    gallery: [
      {
        src: sofiaGallery1,
        alt: "Henry leading their dog down the aisle beside Sofia",
        position: "50% 27%",
      },
      {
        src: sofiaGallery2,
        alt: "Sofia walking down the grass aisle holding a long ribbon",
        position: "50% 23%",
      },
      {
        src: sofiaGallery3,
        alt: "Dark cross-back chairs and pots of white flowers lining the aisle",
      },
      {
        src: sofiaGallery4,
        alt: "Guests in pastel dresses standing among the trees for the ceremony",
      },
    ],
    note: {
      quote:
        "“We could hear the waterfall through every word of our vows. It felt as if the forest had been waiting for us, and nothing looked out of place.”",
      headline: "Words from the couple married beside the falls",
      photo: {
        src: sofiaNote,
        alt: "Sofia and Henry facing each other at the altar with guests watching",
      },
    },
    testimonial: {
      quote:
        "“We could hear the falls through every word. Somehow they carried a whole wedding into the woods and made it look as if it had always been there.”",
      photo: {
        src: sofiaQuote,
        alt: "Sofia and Henry smiling at the celebrant in the forest, with guests behind",
        position: "50% 40.4%",
      },
    },
  },
];

export function getWedding(slug: string) {
  return weddings.find((w) => w.slug === slug);
}

export function nextWedding(slug: string) {
  const i = weddings.findIndex((w) => w.slug === slug);
  return weddings[(i + 1) % weddings.length];
}

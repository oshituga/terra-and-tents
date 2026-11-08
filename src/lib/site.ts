/** The public address of the site, for the sitemap and metadata. */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://terra-and-tents.vercel.app";

// Terra & Tent is fictional. Its email links open a design enquiry to the
// site's designer instead.
const subject = "Design enquiry from Terra & Tent";
const body =
  "Hi Ayo,\n\nI saw the Terra & Tent site and I'm looking for a designer.\n\nWhat I need:\n\nTimeline:\n\nBudget:\n";
export const enquiryHref = `mailto:ayomideraphael609@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const social = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://x.com/theay_o", label: "Pinterest" },
];

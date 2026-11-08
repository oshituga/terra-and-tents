/** The public address of the site, for the sitemap and metadata. */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://terra-and-tents.vercel.app";

// Ask the deployed site for every optimised image once, in AVIF and WebP, so
// the first real visitor gets cached files instead of waiting for encoding.
//
// Usage: node scripts/warm-images.mjs https://your-deployment.vercel.app
// Reads the page list from /sitemap.xml on that deployment.

const base = (process.argv[2] || process.env.WARM_URL || "").replace(/\/$/, "");
if (!base) {
  console.error(
    "Pass the deployment URL, e.g. node scripts/warm-images.mjs https://example.vercel.app",
  );
  process.exit(1);
}
const headers = {};
// Preview deployments can be protected; Vercel's bypass header gets through.
if (process.env.VERCEL_BYPASS)
  headers["x-vercel-protection-bypass"] = process.env.VERCEL_BYPASS;

const get = async (url, extra = {}) => {
  const res = await fetch(url, { headers: { ...headers, ...extra } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
};

const sitemap = await (await get(`${base}/sitemap.xml`)).text();
// The sitemap holds production URLs; warm the same paths on this deployment.
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => base + new URL(m[1]).pathname,
);

const images = new Set();
for (const page of pages) {
  const html = await (await get(page)).text();
  for (const [, set] of html.matchAll(/(?:srcSet|srcset)="([^"]+)"/g)) {
    for (const part of set.split(",")) {
      const url = part.trim().split(/\s+/)[0].replaceAll("&amp;", "&");
      if (url.startsWith("/_next/image")) images.add(url);
    }
  }
}

const formats = ["image/avif,image/webp,*/*", "image/webp,*/*"];
const jobs = [...images].flatMap((url) =>
  formats.map((accept) => ({ url, accept })),
);
let done = 0;
let failed = 0;
const started = Date.now();

async function worker() {
  while (jobs.length) {
    const { url, accept } = jobs.shift();
    try {
      const res = await get(base + url, { Accept: accept });
      await res.arrayBuffer();
    } catch {
      failed++;
    }
    done++;
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

console.log(
  `Warmed ${done - failed} of ${done} image variants from ${pages.length} pages in ${Math.round((Date.now() - started) / 1000)}s.`,
);
if (failed) process.exitCode = 1;

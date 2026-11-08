import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };

const INK = "#2D211C";
const CREAM = "#FAF7F2";

/**
 * A link-preview card: the page's cover photo, darkened at the foot, with the
 * tent mark, a small eyebrow and the title set in Saphion.
 */
export async function ogCard({
  photo,
  eyebrow,
  title,
}: {
  /** Path under src/assets. */
  photo: string;
  eyebrow: string;
  title: string;
}) {
  const [saphion, outfit, jpeg] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/SaphionLight.otf")),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff",
      ),
    ),
    sharp(join(process.cwd(), "src/assets", photo))
      .resize(ogSize.width, ogSize.height, { fit: "cover" })
      .jpeg({ quality: 82 })
      .toBuffer(),
  ]);
  const src = `data:image/jpeg;base64,${jpeg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        background: INK,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={ogSize.width}
        height={ogSize.height}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.4) 0%, rgba(18,18,18,0.35) 45%, rgba(18,18,18,0.78) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          color: CREAM,
        }}
      >
        <svg width="54" height="49" viewBox="0 0 36 32.8965">
          <path
            fill={CREAM}
            fillRule="evenodd"
            d="M18 2.86057L33.12 30.036H2.87995L18 2.86057ZM19.08 9.65442L23.4 30.036H14.76L19.08 9.65442Z"
          />
          <path fill={CREAM} d="M36 30.0359H0V31.4662H36V30.0359Z" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{ fontFamily: "Outfit", fontSize: 26, letterSpacing: -0.6 }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Saphion",
              fontSize: 84,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Saphion", data: saphion, style: "normal", weight: 300 },
        { name: "Outfit", data: outfit, style: "normal", weight: 400 },
      ],
    },
  );
}

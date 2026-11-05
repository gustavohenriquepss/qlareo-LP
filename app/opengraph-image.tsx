import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_COLOR, MARK_PATHS, MARK_VIEWBOX } from "@/components/ui/logo";
import { PRICING } from "@/lib/content";

/**
 * Imagem de compartilhamento (WhatsApp, Instagram, LinkedIn, X), 1200×630.
 *
 * Gerada no build com o mockup da sacola (o mesmo `public/sacola-qlareo.png`
 * do hero), o símbolo da marca (a MESMA geometria de `components/ui/logo.tsx`,
 * como o apple-icon) e a promessa da página. No preview do WhatsApp a imagem
 * aparece pequena, então o texto é curto e grande. As cores são os valores
 * literais dos tokens: aqui não existe CSS para resolver variável.
 */
export const alt = "Qlareo — Sua marca na sacola de delivery do bairro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0f172a"; // --ink
const INK_MUTED = "#58687d"; // --ink-muted
const BACKGROUND = "#f8fafc"; // --background
const SURFACE = "#ffffff"; // --surface

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}" fill="${BRAND_COLOR}">${MARK_PATHS.map(
  (d) => `<path d="${d}"/>`,
).join("")}</svg>`;

/** Proporção do mockup em `public/` (880×1025). */
const BAG_HEIGHT = 560;
const BAG_WIDTH = Math.round((BAG_HEIGHT * 880) / 1025);

export default async function OpengraphImage() {
  const bag = await readFile(join(process.cwd(), "public", "sacola-qlareo.png"));
  const bagSrc = `data:image/png;base64,${bag.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: BACKGROUND,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "72px 0 72px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK_SVG)}`}
              alt=""
              width={64}
              height={64}
            />
            <div style={{ display: "flex", fontSize: 44, letterSpacing: -1 }}>Qlareo</div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 620,
            }}
          >
            Sua marca na sacola de delivery do bairro.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "12px 22px",
                borderRadius: 16,
                background: SURFACE,
                fontSize: 28,
                boxShadow: "0 1px 3px rgba(15,23,42,0.08)",
              }}
            >
              {`${PRICING.sacola} por sacola, só a sua marca`}
            </div>
            <div style={{ display: "flex", fontSize: 28, color: INK_MUTED }}>
              Itaboraí e Icaraí, Niterói · RJ
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: BAG_WIDTH + 120,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bagSrc} alt="" width={BAG_WIDTH} height={BAG_HEIGHT} />
        </div>
      </div>
    ),
    size,
  );
}

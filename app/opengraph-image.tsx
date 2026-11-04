import { ImageResponse } from "next/og";
import { BRAND_COLOR, MARK_PATHS, MARK_VIEWBOX } from "@/components/ui/logo";

/**
 * PLACEHOLDER: imagem de compartilhamento (WhatsApp, Instagram, LinkedIn, X).
 * Troque pela arte final quando existir. Basta apagar este arquivo e colocar
 * `app/opengraph-image.png` (1200×630) no lugar.
 *
 * Enquanto isso, é gerada em código com o símbolo da marca (a MESMA geometria
 * de `components/ui/logo.tsx`, como o apple-icon) e a promessa da página. As
 * cores são os valores literais dos tokens: aqui não existe CSS para resolver
 * variável.
 */
export const alt = "Qlareo — Sua marca na sacola de delivery do bairro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0f172a"; // --ink
const INK_MUTED = "#58687d"; // --ink-muted
const BACKGROUND = "#f8fafc"; // --background

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}" fill="${BRAND_COLOR}">${MARK_PATHS.map(
  (d) => `<path d="${d}"/>`,
).join("")}</svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: BACKGROUND,
          color: INK,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(MARK_SVG)}`}
          alt=""
          width={96}
          height={96}
        />
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, letterSpacing: -3 }}>
          Sua marca na sacola de delivery do bairro.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: INK_MUTED }}>
          Itaboraí e Icaraí, Niterói · RJ
        </div>
      </div>
    ),
    size,
  );
}

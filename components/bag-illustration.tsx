import { Logo } from "@/components/ui/logo";
import { bag } from "@/lib/content";

/**
 * Tom do papel kraft. ÚNICA cor fora do design system, e só vale dentro desta
 * ilustração: é a cor do objeto que a página vende, não uma cor de interface.
 * Sobre ela só entra `--ink` (6.9:1). `--ink-muted` daria 2.2:1 e reprova.
 */
const KRAFT = "#C49A6C";

/**
 * A sacola do hero, em HTML + SVG (não imagem): o texto continua nítido em
 * qualquer tela, e a logo é o mesmo componente do cabeçalho.
 *
 * Para leitor de tela é UMA imagem (`role="img"` + descrição); o texto impresso
 * dentro dela é parte do desenho e sai da árvore de acessibilidade.
 */
export function BagIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={bag.alt}
      className={`relative mx-auto w-full max-w-[340px] pt-7 pr-4 ${className}`}
    >
      <div aria-hidden className="drop-shadow-[0_24px_40px_rgba(15,23,42,0.16)]">
        <SerratedEdge />

        <div className="relative overflow-hidden rounded-b-2xl" style={{ background: KRAFT }}>
          {/* Dobras laterais do saco: só uma linha de sombra, no tom da tinta. */}
          <span className="absolute inset-y-0 left-4 w-px bg-ink/10" />
          <span className="absolute inset-y-0 right-4 w-px bg-ink/10" />

          <div className="flex flex-col gap-5 px-8 pt-7 pb-6">
            <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-ink/45 px-4 py-9 text-center">
              <span className="text-[20px] leading-tight font-bold tracking-[0.04em] text-ink">
                {bag.brand}
              </span>
              <span className="text-[14px] leading-[1.3] text-ink">{bag.offer}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="shrink-0 rounded-lg bg-surface p-1.5">
                <QrMark className="size-16 text-ink" />
              </span>
              <span className="text-[13px] leading-[1.3] font-medium text-ink">{bag.qr}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-ink px-5 py-3">
            {/* Variante para fundo escuro: o nome herda `currentColor`. */}
            <Logo className="h-5 w-auto shrink-0 text-on-ink" decorative />
            <span className="text-right text-[12px] leading-tight text-on-ink">{bag.band}</span>
          </div>
        </div>
      </div>

      {/* Lacre do restaurante, colado torto sobre o canto da boca do saco. */}
      <span
        aria-hidden
        className="absolute top-0 right-0 flex size-24 rotate-[-14deg] flex-col items-center justify-center rounded-full bg-primary text-center text-[10px] leading-[1.2] font-bold tracking-[0.06em] text-on-primary shadow-[0_6px_16px_rgba(15,23,42,0.22)] outline-2 outline-offset-[-6px] outline-on-primary/45 outline-dashed"
      >
        <span>{bag.seal[0]}</span>
        <span>{bag.seal[1]}</span>
      </span>
    </div>
  );
}

/** Borda serrilhada da boca do saco de papel. */
function SerratedEdge() {
  const teeth = 28;
  const width = teeth * 10;
  const points = [`0,10`];
  for (let i = 0; i < teeth; i++) points.push(`${i * 10 + 5},0`, `${i * 10 + 10},10`);

  return (
    <svg
      viewBox={`0 0 ${width} 10`}
      preserveAspectRatio="none"
      className="-mb-px block h-2.5 w-full"
      style={{ fill: KRAFT }}
    >
      <polygon points={points.join(" ")} />
    </svg>
  );
}

/* QR estilizado: três marcadores de canto de verdade e um miolo fixo,
   gerado uma vez por uma sequência determinística (o desenho é igual no
   servidor e no navegador, sem erro de hidratação). Não é um QR legível. */
const QR_SIZE = 21;
const QR_CELLS = (() => {
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= QR_SIZE - 8 && y < 8) || (x < 8 && y >= QR_SIZE - 8);
  const finder = (x: number, y: number) => {
    const fx = x >= QR_SIZE - 7 ? x - (QR_SIZE - 7) : x;
    const fy = y >= QR_SIZE - 7 ? y - (QR_SIZE - 7) : y;
    if (fx > 6 || fy > 6) return false;
    const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6;
    const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
    return ring || core;
  };

  let seed = 20251104;
  const next = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed >> 16) & 1;
  };

  const cells: [number, number][] = [];
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (inFinder(x, y) ? finder(x, y) : next() === 1) cells.push([x, y]);
    }
  }
  return cells;
})();

function QrMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
      shapeRendering="crispEdges"
      fill="currentColor"
      className={className}
    >
      {QR_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  );
}

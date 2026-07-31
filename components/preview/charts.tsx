import { moneyCompact } from "@/lib/preview/format";

/**
 * Os três gráficos da prévia, desenhados à mão.
 *
 * SEM BIBLIOTECA DE GRÁFICO, de propósito: o produto usa recharts, que custa
 * algumas centenas de KB de JavaScript. Numa landing isso sai do orçamento de
 * carregamento — e aqui não há nada para uma biblioteca fazer, porque a série é
 * fixa e não tem tooltip, zoom nem redraw. SVG e CSS resolvem, e o resultado
 * renderiza no servidor, sem um byte de JS no cliente.
 */

const GRID_LINES = 4;

/**
 * Faturamento ao longo do tempo — linha, porque o eixo é contínuo e a pergunta
 * é "subiu ou caiu".
 *
 * O SVG cobre só a área de plotagem, sem texto dentro. Os rótulos são HTML em
 * volta. Isso deixa usar `preserveAspectRatio="none"`, que faz o desenho
 * preencher qualquer caixa — de 320px no celular a 1000px no desktop — sem
 * cálculo de largura no cliente. `vector-effect="non-scaling-stroke"` impede
 * que o esticão engrosse a linha.
 */
export function TrendChart({
  rows,
  height = 200,
}: {
  rows: { dia: string; faturamento: number }[];
  height?: number;
}) {
  const max = Math.max(...rows.map((row) => row.faturamento));
  /* Teto arredondado para cima: o pico encostando na borda parece corte. */
  const ceiling = Math.ceil((max * 1.1) / 10000) * 10000;

  const points = rows.map((row, index) => {
    const x = rows.length === 1 ? 50 : (index / (rows.length - 1)) * 100;
    const y = 100 - (row.faturamento / ceiling) * 100;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  /* A área é a mesma linha fechada contra a base. */
  const area = `0,100 ${points.join(" ")} 100,100`;

  const ticks = Array.from({ length: GRID_LINES + 1 }, (_, index) => {
    const fraction = 1 - index / GRID_LINES;
    return { top: `${(index / GRID_LINES) * 100}%`, value: ceiling * fraction };
  });

  return (
    <div className="flex gap-3">
      {/* Eixo Y: os rótulos alinham pelo topo de cada linha da grade. */}
      <div className="relative w-14 shrink-0" style={{ height }}>
        {ticks.map((tick) => (
          <span
            key={tick.top}
            style={{ top: tick.top }}
            className="tnum absolute right-0 -translate-y-1/2 text-[11px] text-ink-muted"
          >
            {moneyCompact(tick.value)}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          {ticks.map((tick) => (
            <span
              key={tick.top}
              style={{ top: tick.top }}
              className="absolute inset-x-0 border-t border-[var(--grid)]"
            />
          ))}

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <polygon points={area} fill="var(--series-1)" fillOpacity={0.08} />
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke="var(--series-1)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Eixo X: só primeiro, meio e último. Catorze rótulos viram ruído. */}
        <div className="mt-2 flex justify-between text-[11px] text-ink-muted">
          <span>{rows[0]?.dia}</span>
          <span>{rows[Math.floor(rows.length / 2)]?.dia}</span>
          <span>{rows[rows.length - 1]?.dia}</span>
        </div>
      </div>
    </div>
  );
}

const ABC_COLOR = {
  A: "var(--abc-a)",
  B: "var(--abc-b)",
  C: "var(--abc-c)",
} as const;

export type AbcClass = keyof typeof ABC_COLOR;

/**
 * Curva ABC — barra por produto, ordenada da maior receita para a menor, com a
 * cor dizendo a classe. A escada de azul é sequencial (magnitude), não
 * categórica: A é o mais escuro porque é o que pesa mais.
 *
 * A classe aparece na legenda E na altura da barra — nunca só na cor.
 */
export function AbcBars({
  rows,
  height = 160,
}: {
  rows: { nome: string; receita: number; classe: AbcClass }[];
  height?: number;
}) {
  const max = Math.max(...rows.map((row) => row.receita));

  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {rows.map((row) => (
          <div
            key={row.nome}
            style={{
              height: `${(row.receita / max) * 100}%`,
              background: ABC_COLOR[row.classe],
            }}
            className="min-w-0 flex-1 rounded-t-sm"
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {(Object.keys(ABC_COLOR) as AbcClass[]).map((classe) => (
          <li key={classe} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: ABC_COLOR[classe] }}
            />
            <span className="text-xs text-ink-secondary">
              Classe {classe}
              <span className="text-ink-muted">
                {classe === "A" && " — até 80% da receita"}
                {classe === "B" && " — até 95%"}
                {classe === "C" && " — a cauda"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Duas partes de um todo. Não é rosca nem pizza: com DUAS fatias o donut gasta
 * muito espaço para dizer pouco, e comparar ângulos é pior que comparar
 * comprimentos.
 *
 * O gap de 2px entre os segmentos sai na cor do fundo — sem ele, duas cores
 * encostadas criam uma terceira borda visual que não é dado.
 */
export function SplitBar({
  segments,
}: {
  segments: { label: string; value: number; color: string; display: string }[];
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (total === 0) return null;

  return (
    <div>
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {segments
          .filter((segment) => segment.value > 0)
          .map((segment) => (
            <div
              key={segment.label}
              style={{
                width: `${(segment.value / total) * 100}%`,
                background: segment.color,
              }}
              className="h-full first:rounded-l-full last:rounded-r-full"
            />
          ))}
      </div>

      {/* Rótulo direto: a identidade do segmento nunca depende só da cor. */}
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ background: segment.color }}
            />
            <span className="text-sm text-ink-secondary">{segment.label}</span>
            <span className="tnum text-sm font-semibold text-ink">
              {segment.display}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

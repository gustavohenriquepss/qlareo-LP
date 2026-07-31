import type { ReactNode } from "react";
import { demoPeriod } from "@/lib/preview/data";

/**
 * Peças da prévia do produto. São SIMULAÇÕES: moram na landing, são suas para
 * editar, e não importam nada de `qlareo/web`.
 *
 * O que elas copiam do produto é a APARÊNCIA — raio de canto, densidade,
 * hierarquia de tipo, os mesmos tokens de cor. O que elas não copiam é o
 * comportamento: nada aqui tem estado, hover, filtro ou link. Uma prévia com
 * botão que não faz nada é pior que uma imagem estática, porque promete uma
 * interação que não existe.
 *
 * Por isso também nada aqui é `<button>` ou `<a>`: um controle de verdade
 * entraria na ordem de tabulação e o teclado pararia num elemento morto. O
 * conjunto inteiro vai `aria-hidden` (ver `ProductPreview`), com um resumo em
 * texto no lugar — o mesmo papel que o `alt` tinha na captura de tela.
 */

/**
 * Casca de toda tela simulada.
 *
 * O mock inteiro vai `aria-hidden` e no lugar dele entra uma frase que descreve
 * a tela — exatamente o papel que o `alt` cumpria quando isto era uma captura
 * de imagem. Fazer um leitor de tela varrer célula por célula de uma tabela de
 * dados inventados seria trocar uma descrição útil por um labirinto.
 */
export function PreviewShell({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <>
      <p className="sr-only">{summary}</p>
      <div aria-hidden className="flex flex-col gap-4">
        {children}
      </div>
    </>
  );
}

export function PreviewCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-border-subtle bg-surface ${className ?? ""}`}
    >
      <header className="border-b border-border-subtle px-4 py-3">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

/**
 * O número-herói, igual ao produto: `emphasis` marca O número da tela com DOIS
 * sinais — tamanho e cor. Cor sozinha some em escala de cinza e para quem não
 * distingue o azul; o tamanho sobrevive aos dois casos.
 */
export function PreviewStat({
  label,
  value,
  context,
  emphasis,
}: {
  label: string;
  value: string;
  context?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface px-4 py-3">
      <dt className="text-xs font-medium text-ink-muted">{label}</dt>
      {/* Um degrau menor que o produto (lá é 3xl/2xl). A prévia mora numa coluna
          de ~750px, e no tamanho original "R$ 487.320,00" estourava o cartão. O
          que precisa sobreviver é a RELAÇÃO entre os dois tamanhos, não o valor
          absoluto — é ela que diz qual é o número da tela. */}
      <dd
        className={`tnum mt-1 font-semibold tracking-tight ${
          emphasis ? "text-2xl text-primary" : "text-xl text-ink"
        }`}
      >
        {value}
      </dd>
      {context && <p className="mt-1 text-xs text-ink-muted">{context}</p>}
    </div>
  );
}

export function PreviewTable({
  columns,
  rows,
  footer,
}: {
  /** `numeric` alinha à direita — número comparado entre linhas alinha pela direita. */
  columns: { key: string; header: string; numeric?: boolean }[];
  rows: { key: string; cells: ReactNode[] }[];
  footer?: ReactNode[];
}) {
  const align = (numeric?: boolean) =>
    numeric ? "tnum px-3 py-2 text-right" : "px-3 py-2 text-left";

  /* `min-w` para a tabela ser CORTADA no celular em vez de espremida. Numa
     coluna de 340px, quatro colunas viram quatro palavras quebradas em três
     linhas cada — o que lê como quebrado, não como denso. Cortada, ela lê como o
     resto do mock: uma janela para dentro da aplicação, que continua ali. */
  return (
    <table className="w-full min-w-[460px] border-collapse text-sm">
      <thead>
        <tr className="border-b border-border-subtle">
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={`${align(column.numeric)} text-xs font-medium text-ink-muted`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.key} className="border-b border-border-subtle last:border-b-0">
            {row.cells.map((cell, index) => (
              <td key={columns[index].key} className={`${align(columns[index].numeric)} text-ink`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot className="border-t-2 border-border-strong font-medium text-ink">
          <tr>
            {footer.map((cell, index) => (
              <td key={columns[index].key} className={align(columns[index].numeric)}>
                {cell}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
}

/**
 * Barra de filtros do produto, reduzida ao que ela comunica: o recorte que
 * gerou aqueles números. Sem os controles funcionando, ela existe para o
 * visitante entender que aquilo é uma tela filtrável — e para o selo de
 * demonstração ter onde morar.
 */
export function PreviewToolbar({ scope }: { scope: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-md border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-ink">
        {demoPeriod}
      </span>
      <span className="rounded-md border border-border-subtle bg-surface px-2.5 py-1.5 text-xs text-ink-muted">
        {scope}
      </span>
    </div>
  );
}

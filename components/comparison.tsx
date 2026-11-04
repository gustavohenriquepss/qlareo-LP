import { useId } from "react";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { comparison } from "@/lib/content";

/**
 * Tabela de verdade (`<table>`, `<th scope>`), com texto em toda célula.
 *
 * No celular a tabela é mais larga que a tela e rola DENTRO da caixa, nunca a
 * página. A caixa rolável recebe foco (`tabIndex=0`) e nome, para quem usa
 * teclado conseguir rolar com as setas. A primeira coluna fica presa à
 * esquerda: ao arrastar, a pergunta continua visível ao lado da resposta.
 *
 * A coluna "Sacola Qlareo" leva o destaque: cabeçalho em `--primary` e
 * células num véu do azul da marca, só tokens do sistema.
 */
export function Comparison() {
  const captionId = useId();

  return (
    <Section id={comparison.id}>
      <Frame className={`flex flex-col gap-8 ${framePadding}`}>
        <SectionHeading heading={comparison.heading} subhead={comparison.subhead} />

        <div
          role="region"
          aria-labelledby={captionId}
          tabIndex={0}
          className="overflow-x-auto rounded-3xl border border-border-strong bg-surface"
        >
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-[1.35]">
            <caption id={captionId} className="sr-only">
              {comparison.caption}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-[160px] bg-surface p-4 sm:w-[34%] lg:p-5"
                >
                  <span className="sr-only">{comparison.criterionLabel}</span>
                </th>
                {comparison.columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={[
                      "p-4 align-bottom font-semibold lg:p-5",
                      index === 0 ? "bg-primary text-on-primary" : "text-ink",
                    ].join(" ")}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-t border-border-strong">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-surface p-4 align-top font-medium text-ink lg:p-5"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={index}
                      className={[
                        "p-4 align-top lg:p-5",
                        index === 0 ? "bg-brand/5 font-semibold text-ink" : "text-ink-muted",
                      ].join(" ")}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Frame>
    </Section>
  );
}

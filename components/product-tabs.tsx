"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { product } from "@/lib/content";

/**
 * Os quatro recursos viram abas: clicar num retângulo troca a tela mostrada à
 * direita.
 *
 * As telas chegam PRONTAS por prop, renderizadas no servidor pelo pai. Se elas
 * fossem importadas aqui dentro, virariam Client Components junto com este
 * arquivo e os quatro dashboards inteiros entrariam no bundle do navegador —
 * para marcação que nunca muda. Do jeito que está, o único JavaScript desta
 * seção é a troca de aba.
 */
export function ProductTabs({ panels }: { panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /*
    Padrão ARIA Tabs com ativação automática: a seta já troca o painel, sem
    exigir Enter. É o certo aqui porque o painel é uma imagem que aparece na
    hora — a confirmação em dois tempos só se justifica quando ativar custa
    caro (carrega dado, perde estado de formulário).

    O tablist é vertical nos dois layouts (coluna no mobile, coluna ao lado da
    imagem no desktop), então quem manda são as setas cima/baixo.
  */
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = product.features.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col items-start lg:flex-row">
      {/*
        `div role="tablist"` e não `ul`: a role de lista some quando vira
        tablist, e aí `li` sem role fica órfão. Menos marcação brigando com a
        semântica do que `ul` + `li role="presentation"`.
      */}
      <div
        role="tablist"
        aria-label={product.tablistLabel}
        aria-orientation="vertical"
        className="flex w-full shrink-0 flex-col lg:w-[440px]"
      >
        {product.features.map((feature, index) => {
          const selected = index === active;
          return (
            <button
              key={feature.label}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${product.id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${product.id}-panel`}
              /* Roving tabindex: o Tab entra e sai do grupo de abas de uma vez;
                 dentro dele, quem navega são as setas. */
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={[
                // `lg:last:border-b-0` e não `last:border-b-0`: em telas largas
                // a lista fica AO LADO da imagem, então a borda do último item
                // cai sobre a linha de fecho do `Section` e engrossa.
                // Empilhado, ela ainda é a divisória entre a lista e o bloco da
                // imagem — ali precisa ficar.
                "flex cursor-pointer flex-col items-center border-b border-border-strong p-6 text-left lg:border-r lg:last:border-b-0",
                // Offset negativo no foco: o botão ocupa a largura toda da
                // coluna, então um anel para fora seria cortado pelo vizinho.
                "transition-colors duration-150 focus-visible:-outline-offset-2",
                // A barra de 3px é o sinal de seleção; o fundo branco é só o
                // reforço. No Figma o item ativo se distinguia SÓ pelo branco
                // sobre --background, que é 1,5% de diferença de luminância —
                // suficiente para um estado desenhado uma vez, invisível para
                // um estado que muda ao clique. A barra usa --primary, a mesma
                // cor que já significa "ação" no resto da página.
                //
                // `shadow` e não `border-l`: o item já tem `border-b` com
                // `border-border-strong`, que pinta os quatro lados, e a ordem
                // que o Tailwind emite faz essa cor ganhar de `border-l-primary`
                // — a barra simplesmente não aparecia. A sombra interna não
                // disputa cascata com ninguém e não ocupa espaço, então nada se
                // desloca ao trocar de aba.
                selected
                  ? "bg-surface shadow-[inset_3px_0_0_var(--primary)]"
                  : "hover:bg-surface-2",
              ].join(" ")}
            >
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Image
                    src={feature.icon}
                    alt=""
                    aria-hidden
                    width={20}
                    height={20}
                    className="size-5 shrink-0"
                  />
                  {/*
                    Era `h3`. Virou `span` porque `button` só aceita conteúdo de
                    frase — cabeçalho dentro dele é HTML inválido. A navegação
                    que o `h3` dava aqui o próprio tablist entrega, e com mais
                    informação: diz quantas abas são e qual está selecionada.
                  */}
                  <span className="text-[16px] font-medium text-ink">
                    {feature.label}
                  </span>
                </div>
                <span className="text-[14px] leading-[1.35] text-ink">
                  {feature.lead}
                </span>
                <span className="text-[14px] leading-[1.35] text-ink-muted">
                  {feature.body}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sem `border-b`: este bloco encosta na base da seção nos dois layouts,
          então a linha de fecho do `Section` já é a dele. */}
      <div
        role="tabpanel"
        id={`${product.id}-panel`}
        aria-labelledby={`${product.id}-tab-${active}`}
        /* O painel não tem nada focável dentro, então ele mesmo precisa ser
           alcançável pelo teclado — senão o conteúdo que a aba controla fica
           fora da ordem de tabulação. */
        tabIndex={0}
        className="flex min-w-0 flex-1 flex-col items-start self-stretch overflow-hidden p-6 lg:border-r-0 lg:pt-[30px] lg:pr-0 lg:pb-0 lg:pl-[30px]"
      >
        {/*
          A tela sangra para fora do quadro, como no Figma — mas MENOS do que
          sangrava com a captura. Ali o corte comia pixel de imagem; aqui ele
          comeria número. O sangramento à direita ficou em 40px, o suficiente
          para a borda sumir e o bloco ler como "a aplicação continua ali", e o
          resto do corte foi para baixo (654px de conteúdo numa janela de 534),
          onde o que se perde é a próxima linha da tabela, não o indicador.
        */}
        <div className="relative w-full lg:h-[534px]">
          <div
            /* `key` força remontagem, e é o que faz o fade tocar de novo a cada
               troca de aba. */
            key={active}
            className="animate-panel-in overflow-hidden rounded-xl border border-border-strong bg-background p-4 lg:absolute lg:top-[14.55px] lg:right-[-40px] lg:left-[15px] lg:h-[654px] lg:rounded-2xl lg:p-6"
          >
            {panels[active]}
          </div>
        </div>
      </div>
    </div>
  );
}

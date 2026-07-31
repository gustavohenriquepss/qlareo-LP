import { Frame, Section, framePadding } from "@/components/ui/frame";
import { differentiators } from "@/lib/content";

export function DifferentiatorsSection() {
  return (
    <Section id={differentiators.id} bordered={false}>
      <Frame className={`relative overflow-hidden ${framePadding}`}>
        {/* Máscara — ver a nota em product-section.tsx. */}
        <span
          aria-hidden
          style={{
            top: -231.45,
            left: -162,
            maskImage: 'url("/figma/deco-lines-diff.svg")',
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskImage: 'url("/figma/deco-lines-diff.svg")',
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
          }}
          className="pointer-events-none absolute hidden h-[950px] w-[1473px] bg-border-strong select-none lg:block"
        />

        <div className="relative flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-2">
            <h2 className="flex-1 text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
              {differentiators.heading[0]}
              <br className="hidden lg:inline" /> {differentiators.heading[1]}
            </h2>
            <div className="flex w-full flex-col text-[16px] leading-[1.35] text-ink-muted lg:w-[473px]">
              {differentiators.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/*
            A grade tem UM sistema de borda, não dois. Antes o `ul` e cada `li`
            desenhavam borda própria: nas retas as duas se somavam e a linha saía
            com 2px, mas nos quatro cantos o `overflow-hidden` recortava o canto
            quadrado do `li` e sobrava só o arco de 1px do `ul` — as pontas
            pareciam mais finas que o resto do contorno.

            Agora o perímetro vem só do `ul`, e as divisórias internas são o
            fundo do `ul` aparecendo por um vão de 1px (`gap-px`). Uma linha de
            1px em todo lugar, e o raio do canto continua sendo desenhado por uma
            borda só.
          */}
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.cards.map((card) => (
              <li
                key={card.title}
                className="flex min-w-0 flex-col items-start justify-end gap-6 bg-background p-6"
              >
                <h3 className="w-full text-[16px] font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="w-full text-[16px] text-ink-muted">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </Section>
  );
}

import { Frame, Section, framePadding } from "@/components/ui/frame";
import { problem } from "@/lib/content";

export function ProblemSection() {
  return (
    <Section id={problem.id} bordered={false}>
      <Frame className={`flex flex-col gap-10 border-b border-border-strong lg:gap-12 ${framePadding}`}>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-2">
          <h2 className="flex-1 text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
            {problem.heading[0]}
            <br className="hidden lg:inline" /> {problem.heading[1]}
          </h2>
          <div className="flex w-full flex-col gap-4 text-[16px] leading-[1.35] text-ink-muted lg:w-[473px]">
            {problem.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/*
          The five-step chain. Each card carries an oversized outline icon that
          bleeds past the card edge — the overflow is the point, so it is
          absolutely positioned and clipped exactly as designed.
        */}
        <ol className="flex flex-col gap-2 lg:flex-row lg:items-center">
          {problem.steps.map((step, index) => (
            <li key={step.label} className="flex min-w-0 flex-1 items-center gap-2">
              <div className="relative flex h-[111px] min-w-0 flex-1 flex-col items-start justify-end overflow-hidden rounded-2xl border border-border-strong p-4">
                {/*
                  O ícone é pintado por MÁSCARA, não servido como imagem: o
                  desenho vem do arquivo, a cor vem de `--border-strong`. Os SVGs
                  traziam `stroke="#D1D1D1"` cravado — a cor de borda antiga — e
                  por isso ficaram fora de sintonia quando as linhas da página
                  mudaram; hoje declaram `currentColor` e não decidem mais cor
                  nenhuma.

                  NÃO troque `stroke` por `none` nesses arquivos achando que a
                  cor virou inerte: a máscara usa o canal ALPHA, e sem traço
                  desenhado o alpha vira zero e o ícone SOME. `currentColor` num
                  documento SVG carregado como máscara resolve para o valor
                  inicial de `color`, que é opaco — é isso que mantém o alpha em 1.

                  `mask-size: 100% 100%` reproduz o `preserveAspectRatio="none"`
                  do arquivo, que é o que o `<Image>` esticado fazia.
                */}
                <span
                  aria-hidden
                  style={{
                    width: step.w,
                    height: step.h,
                    top: step.top,
                    right: step.right,
                    maskImage: `url("${step.icon}")`,
                    maskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: `url("${step.icon}")`,
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                  className="pointer-events-none absolute bg-border-strong"
                />
                <p className="relative w-full text-[16px] font-semibold text-ink">
                  <span className="tabular-nums">{index + 1}.</span> {step.label}
                </p>
              </div>
              {index < problem.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden shrink-0 text-[20px] font-semibold text-border-strong lg:inline"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* RCD: name the recurring cost of the chain, not just its shape. */}
        <p className="text-[16px] leading-[1.35] text-ink-muted">{problem.cost}</p>
      </Frame>
    </Section>
  );
}

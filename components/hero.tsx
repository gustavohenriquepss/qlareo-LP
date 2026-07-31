import Image from "next/image";
import { Frame, Section } from "@/components/ui/frame";
import { TypingWords } from "@/components/typing-words";
import { WaitlistButton } from "@/components/waitlist";
import { cta, hero, spots, trustPoints } from "@/lib/content";

export function Hero() {
  return (
    <Section id="top" className="overflow-hidden">
      <Frame className="px-6 py-12 md:px-10 md:py-16 lg:p-[60px]">
        <div className="mx-auto flex w-full max-w-[989px] flex-col items-start justify-center gap-6">
          <div className="flex w-full flex-col items-start justify-center gap-2">
            {spots.total > 0 && (
              <p className="flex items-center rounded-lg border border-border-strong px-2 py-1 text-[12px] text-brand">
                <span className="text-ink">{hero.badge.prefix}</span>
                <span>&nbsp;{hero.badge.highlight}&nbsp;</span>
                <span className="text-ink">{hero.badge.suffix}</span>
              </p>
            )}

            <h1 className="text-[34px] leading-[1.04] font-medium tracking-[-0.05em] text-ink-muted sm:text-[40px] lg:text-[48px] lg:leading-[50px]">
              {hero.headline.lead}
              {/*
                No mobile a palavra que se alterna ganha a linha inteira, então
                a manchete fica em três linhas. Isso não é estética: as palavras
                têm larguras bem diferentes ("Promoções" contra "Vendas"), e sem
                a quebra fixa o ponto de wrap oscilaria a cada letra digitada,
                empurrando a página inteira para cima e para baixo. Com a linha
                só dela, a palavra cresce e encolhe sem mexer em nada.
              */}
              <br className="sm:hidden" />
              <TypingWords words={hero.headline.emphasis} className="text-ink" />
              {hero.headline.afterEmphasis}
              <br />
              {hero.headline.secondLine}
            </h1>

            <p className="max-w-[616px] text-[17px] leading-[1.4] text-ink-muted lg:text-[20px]">
              {hero.subhead}
              <br className="hidden lg:inline" /> {hero.subheadSecondLine}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <WaitlistButton source="hero" label={cta.primary} size="lg" />

            {/*
              Click trigger: answers the cost / commitment / effort questions the
              button label alone cannot.
            */}
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-muted">
              {hero.clickTrigger.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {item}
                  {/* Separator trails its item so a wrap never starts a line with a dot. */}
                  {index < hero.clickTrigger.length - 1 && (
                    <span aria-hidden className="text-border-strong">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[989/469] w-full overflow-hidden rounded-2xl">
            <Image
              src="/figma/hero-dashboard.png"
              alt={hero.dashboardAlt}
              fill
              sizes="(max-width: 1200px) 100vw, 989px"
              priority
              className="object-cover object-top"
            />
          </div>

          {/*
            Trust layer. Pre-launch, so these are verifiable statements about the
            mechanism rather than social proof we have not earned yet.
          */}
          <ul className="grid w-full gap-x-8 gap-y-4 pt-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <li key={point.title} className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                  <CheckMark />
                  {point.title}
                </span>
                <span className="text-[14px] leading-[1.35] text-ink-muted">
                  {point.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </Section>
  );
}

function CheckMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="size-[18px] shrink-0 text-brand"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
      />
    </svg>
  );
}

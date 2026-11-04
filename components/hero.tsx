"use client";

import Image from "next/image";
import { FounderNote } from "@/components/founder-note";
import { usePerfil } from "@/components/perfil";
import { ButtonLink } from "@/components/ui/button";
import { Frame, Section } from "@/components/ui/frame";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { bag, hero, heroSupport, perfilToggle } from "@/lib/content";

export function Hero() {
  const { perfil, setPerfil, switched } = usePerfil();
  const copy = hero[perfil];

  return (
    <Section id="topo" className="overflow-hidden">
      {/* Embaixo, menos que em cima: a faixa de destaques logo abaixo é parte
          do hero, não uma seção nova. */}
      <Frame className="px-6 pt-12 pb-10 md:px-10 md:pt-20 md:pb-14 lg:px-[60px] lg:pt-24 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-8">
            {/* O seletor fica FORA do bloco que remonta na troca: ele mantém o
                foco do teclado depois do clique. */}
            <SegmentedToggle
              label={perfilToggle.label}
              options={perfilToggle.options}
              value={perfil}
              onChange={setPerfil}
              className="w-full sm:w-auto"
            />

            <div
              key={perfil}
              className={`flex flex-col gap-5 ${switched ? "animate-panel-in" : ""}`}
            >
              <h1 className="text-balance text-[36px] leading-[1.05] font-medium tracking-[-0.05em] text-ink sm:text-[44px] lg:text-[56px] lg:leading-[1.02]">
                {copy.headline}
              </h1>
              <p className="max-w-[560px] text-[17px] leading-[1.5] text-ink-muted lg:text-[20px]">
                {copy.subhead}
              </p>
            </div>

            {/* CTA e a nota do fundador formam um bloco: a nota responde, antes
                do clique, o que acontece e com quem a pessoa vai falar. */}
            <div className="flex w-full flex-col gap-5">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <WhatsAppButton posicao="hero" label={copy.primaryCta} size="lg" />
                <ButtonLink href={copy.secondaryCta.href} variant="secondary" size="lg">
                  {copy.secondaryCta.label}
                </ButtonLink>
              </div>

              <FounderNote />
            </div>

            <p className="max-w-[560px] text-[14px] leading-[1.5] text-ink-muted">
              {heroSupport[perfil]}
            </p>
          </div>

          {/* A arte já traz o próprio fundo (o bloco azul com o símbolo) e o
              corte do tronco resolvido nele, então entra solta, sem cartão.
              `priority`: é a maior imagem acima da dobra (LCP). */}
          <Image
            src="/hero-qlareo.png"
            alt={bag.alt}
            width={1120}
            height={1055}
            priority
            sizes="(min-width: 1200px) 560px, (min-width: 1024px) 48vw, 100vw"
            className="mx-auto h-auto w-full max-w-[560px]"
          />
        </div>
      </Frame>
    </Section>
  );
}

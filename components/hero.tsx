"use client";

import { BagIllustration } from "@/components/bag-illustration";
import { usePerfil } from "@/components/perfil";
import { ButtonLink } from "@/components/ui/button";
import { Frame, Section } from "@/components/ui/frame";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { hero, heroSupport, perfilToggle } from "@/lib/content";

export function Hero() {
  const { perfil, setPerfil, switched } = usePerfil();
  const copy = hero[perfil];

  return (
    <Section id="topo" className="overflow-hidden">
      <Frame className="px-6 py-12 md:px-10 md:py-16 lg:p-[60px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-6">
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
              className={`flex flex-col gap-4 ${switched ? "animate-panel-in" : ""}`}
            >
              <h1 className="text-[34px] leading-[1.04] font-medium tracking-[-0.05em] text-ink sm:text-[40px] lg:text-[48px] lg:leading-[50px]">
                {copy.headline}
              </h1>
              <p className="max-w-[560px] text-[17px] leading-[1.4] text-ink-muted lg:text-[20px]">
                {copy.subhead}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <WhatsAppButton posicao="hero" label={copy.primaryCta} size="lg" />
              <ButtonLink href={copy.secondaryCta.href} variant="secondary" size="lg">
                {copy.secondaryCta.label}
              </ButtonLink>
            </div>

            <p className="text-[14px] leading-[1.4] text-ink-muted">{heroSupport}</p>
          </div>

          <BagIllustration />
        </div>
      </Frame>
    </Section>
  );
}

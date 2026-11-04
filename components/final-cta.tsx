import { FounderNote } from "@/components/founder-note";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { finalCta } from "@/lib/content";
import type { Perfil } from "@/lib/site";

export function FinalCta({ perfil }: { perfil: Perfil }) {
  return (
    <Section>
      <Frame className={framePadding}>
        <div className="flex flex-col items-center gap-8 rounded-2xl bg-ink px-6 py-16 text-center md:px-10 lg:py-24">
          <h2 className="max-w-[680px] text-balance text-[28px] leading-[1.15] tracking-[-0.04em] text-on-ink lg:text-[40px]">
            {finalCta.heading[perfil]}
          </h2>
          <div className="flex flex-col items-center gap-5">
            <WhatsAppButton posicao="cta_final" label={finalCta.cta} size="lg" />
            <FounderNote tone="dark" />
          </div>
        </div>
      </Frame>
    </Section>
  );
}

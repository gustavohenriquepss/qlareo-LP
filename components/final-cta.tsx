import { Frame, Section, framePadding } from "@/components/ui/frame";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { finalCta } from "@/lib/content";
import type { Perfil } from "@/lib/site";

export function FinalCta({ perfil }: { perfil: Perfil }) {
  return (
    <Section bordered={false}>
      <Frame className={framePadding}>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-ink px-6 py-12 text-center lg:py-16">
          <h2 className="max-w-[640px] text-[26px] leading-[1.1] tracking-[-0.05em] text-on-ink lg:text-[32px]">
            {finalCta.heading[perfil]}
          </h2>
          <WhatsAppButton posicao="cta_final" label={finalCta.cta} size="lg" />
        </div>
      </Frame>
    </Section>
  );
}

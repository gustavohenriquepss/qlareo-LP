import Image from "next/image";
import { Frame, Section, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/lib/content";
import type { Perfil } from "@/lib/site";

/**
 * Acordeão nativo com `<details>`: funciona antes da hidratação e já é correto
 * para teclado e leitor de tela, sem widget próprio. `name` faz os itens se
 * comportarem como grupo (abrir um fecha o outro). A primeira pergunta abre
 * aberta.
 */
export function FaqSection({ perfil }: { perfil: Perfil }) {
  return (
    <Section id={faq.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={faq.heading} />

        <div className="flex flex-col gap-4">
          {faq.items[perfil].map((item, index) => (
            <details
              key={item.q}
              name="faq"
              open={index === 0}
              className="group rounded-2xl bg-surface transition-shadow open:shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-2xl p-6 focus-visible:-outline-offset-2 lg:px-8 [&::-webkit-details-marker]:hidden">
                <ToggleIcon />
                <h3 className="text-[17px] font-medium text-ink">{item.q}</h3>
              </summary>
              {/* Recuo = padding (24/32) + ícone (24) + vão (12): alinha com a pergunta. */}
              <p className="max-w-[760px] pr-6 pb-6 pl-[60px] text-[15px] leading-[1.6] text-ink-muted lg:pr-8 lg:pb-8 lg:pl-[68px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Frame>
    </Section>
  );
}

/** Troca mais/menos, com os glifos exportados do Figma. */
function ToggleIcon() {
  return (
    <span aria-hidden className="relative inline-block size-6 shrink-0">
      {/* `eager`: o glifo inativo é `display: none` e nunca dispararia o lazy
          loading, então piscaria vazio no primeiro clique. */}
      <Image
        src="/figma/icon-plus.svg"
        alt=""
        width={17}
        height={17}
        loading="eager"
        className="absolute top-[3.75px] left-[3.75px] h-[16.5px] w-[16.5px] group-open:hidden"
      />
      <Image
        src="/figma/icon-minus.svg"
        alt=""
        width={16}
        height={2}
        loading="eager"
        className="absolute top-[11.25px] left-[4.25px] hidden h-[1.5px] w-[15.5px] group-open:block"
      />
    </span>
  );
}

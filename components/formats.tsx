import { CheckMark } from "@/components/ui/check-mark";
import { Frame, Section, cardGrid, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { formats } from "@/lib/content";

/**
 * Os dois formatos do anunciante e, abaixo, a exclusividade na rede.
 *
 * O primeiro cartão ganha a superfície escura do sistema (`bg-ink`), a mesma do
 * CTA final: é o formato que a página empurra. Sobre ela, o texto secundário é
 * `on-ink` a 80% (12:1) e o check usa o azul da marca (3.45:1, objeto gráfico).
 *
 * Cada formato tem o próprio botão de WhatsApp, com a mensagem já dizendo qual
 * formato a pessoa quer (e o `formato` vai junto no evento de analytics).
 */
export function Formats() {
  const { network } = formats;

  return (
    <Section id={formats.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={formats.heading} subhead={formats.subhead} />

        <div className="flex flex-col gap-4 md:gap-6">
          <ul className={`${cardGrid} lg:grid-cols-2`}>
            {formats.cards.map((card) => {
              const dark = card.featured;

              return (
                <li
                  key={card.title}
                  className={[
                    "flex flex-col gap-6 rounded-2xl p-6 lg:gap-8 lg:p-10",
                    dark ? "bg-ink text-on-ink" : "bg-surface text-ink",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "self-start rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.08em]",
                      dark ? "bg-on-ink/10 text-on-ink" : "bg-brand/10 text-primary",
                    ].join(" ")}
                  >
                    {card.tag}
                  </span>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.03em]">
                      {card.title}
                    </h3>
                    <p
                      className={`text-[16px] leading-[1.5] ${dark ? "text-on-ink/80" : "text-ink-muted"}`}
                    >
                      {card.body}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] leading-[1.35]">
                        <CheckMark />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Preço e ação no pé do cartão: o botão vem logo depois do
                      número que a pessoa precisava ver para decidir. */}
                  <div className="mt-auto flex flex-col gap-5">
                    <p
                      className={[
                        "flex flex-col gap-1 rounded-2xl px-5 py-4",
                        dark ? "bg-on-ink/10" : "bg-surface-2",
                      ].join(" ")}
                    >
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <strong className="tnum text-[28px] leading-none font-semibold tracking-[-0.03em]">
                          {card.unitPrice}
                        </strong>
                        <span className="text-[15px]">{card.unitLabel}</span>
                      </span>
                      <span
                        className={`tnum text-[14px] ${dark ? "text-on-ink/80" : "text-ink-muted"}`}
                      >
                        {formats.monthly}
                      </span>
                    </p>

                    <WhatsAppButton
                      posicao="formatos"
                      formato={card.formato}
                      label={card.cta}
                      size="lg"
                      className="w-full"
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Âncora alta: a terceira opção, mais cara, à vista em vez de
              escondida numa nota. Fundo `surface-2` e botão secundário (branco)
              para ela ser lida como opção, sem disputar com os dois formatos. */}
          <div className="flex flex-col gap-5 rounded-2xl bg-surface-2 p-6 md:flex-row md:items-center md:justify-between lg:px-10 lg:py-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-semibold text-ink">{network.title}</h3>
              <p className="text-[15px] leading-[1.5] text-ink-muted">{network.body}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:shrink-0">
              <span className="text-[15px] font-semibold text-ink">{network.price}</span>
              <WhatsAppButton
                posicao="formatos"
                formato={network.formato}
                label={network.cta}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </Frame>
    </Section>
  );
}

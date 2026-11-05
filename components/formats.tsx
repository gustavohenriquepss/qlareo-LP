"use client";

import { useId, useState } from "react";
import { CheckMark } from "@/components/ui/check-mark";
import { Frame, Section, cardGrid, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PRICING, formats } from "@/lib/content";
import {
  cotar,
  formatQuantidade,
  formatTotal,
  parseQuantidade,
  sanitizeQuantidade,
} from "@/lib/pricing";

/**
 * O produto do anunciante: a exclusividade da sacola, a preço único por
 * sacola, com a quantidade por mês escolhida ao lado. Abaixo, a exclusividade
 * da categoria na rede.
 *
 * O seletor fica num cartão branco e o resumo (preço, total e ação) na
 * superfície escura do sistema (`bg-ink`), a mesma do CTA final. Sobre ela, o
 * texto secundário é `on-ink` a 80% (12:1) e o check usa o azul da marca
 * (3.45:1, objeto gráfico).
 *
 * O botão de WhatsApp leva a quantidade escolhida na mensagem e no evento.
 */
export function Formats() {
  const { quantidade: copy, card, network } = formats;
  const [raw, setRaw] = useState(formatQuantidade(copy.inicial));
  const labelId = useId();
  const inputId = useId();
  const hintId = useId();

  const quantidade = parseQuantidade(raw);
  const cotacao = quantidade === null ? null : cotar(quantidade);
  /* Fora do mínimo, o total dá lugar ao aviso: nenhum total errado aparece. */
  const aviso = cotacao ? null : quantidade === null ? copy.vazio : copy.abaixoDoMinimo;

  return (
    <Section id={formats.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={formats.heading} subhead={formats.subhead} />

        <div className="flex flex-col gap-4 md:gap-6">
          <div className={`${cardGrid} lg:grid-cols-2`}>
            <div className="flex flex-col gap-4 rounded-2xl bg-surface p-6 lg:p-10">
              <p id={labelId} className="text-[18px] font-semibold text-ink">
                {copy.label}
              </p>

              <div
                role="group"
                aria-labelledby={labelId}
                className="grid grid-cols-4 gap-1 rounded-2xl bg-surface-2 p-1"
              >
                {copy.presets.map((preset) => {
                  const pressed = quantidade === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setRaw(formatQuantidade(preset))}
                      className={[
                        "tnum inline-flex min-h-10 items-center justify-center rounded-xl px-2 text-[15px] leading-5 font-medium pointer-coarse:min-h-11",
                        "transition-colors duration-150",
                        pressed
                          ? "bg-ink text-on-ink"
                          : "text-ink-muted hover:bg-surface hover:text-ink",
                      ].join(" ")}
                    >
                      {formatQuantidade(preset)}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor={inputId} className="text-[14px] font-medium text-ink">
                  {copy.outraLabel}
                </label>
                <input
                  id={inputId}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={copy.placeholder}
                  value={raw}
                  onChange={(event) => setRaw(sanitizeQuantidade(event.target.value))}
                  onBlur={() => {
                    if (quantidade !== null) setRaw(formatQuantidade(quantidade));
                  }}
                  aria-invalid={aviso !== null}
                  aria-describedby={aviso ? hintId : undefined}
                  className="tnum h-11 rounded-2xl border border-border-strong bg-surface px-4 text-[16px] text-ink placeholder:text-ink-muted focus-visible:border-brand"
                />
                {aviso && (
                  <p id={hintId} className="text-[14px] text-ink-muted">
                    {aviso}
                  </p>
                )}
              </div>

              <p className="mt-auto pt-2 text-[14px] leading-[1.5] text-ink-muted">{copy.nota}</p>
            </div>

            <div className="flex flex-col gap-6 rounded-2xl bg-ink p-6 text-on-ink lg:gap-8 lg:p-10">
              <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.03em]">
                {card.title}
              </h3>

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
                <div className="flex flex-col gap-1 rounded-2xl bg-on-ink/10 px-5 py-4">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <strong className="tnum text-[28px] leading-none font-semibold tracking-[-0.03em]">
                      {cotacao ? formatTotal(cotacao.total) : "—"}
                    </strong>
                    {cotacao && <span className="text-[15px]">{card.totalLabel}</span>}
                  </p>
                  {/* O único ponto que o leitor de tela anuncia quando a
                      quantidade muda. */}
                  <p
                    aria-live="polite"
                    aria-atomic="true"
                    className="tnum text-[14px] text-on-ink/80"
                  >
                    {cotacao
                      ? formats.total(PRICING.sacola, formatQuantidade(cotacao.quantidade))
                      : aviso}
                  </p>
                </div>

                <WhatsAppButton
                  posicao="formatos"
                  formato={card.formato}
                  quantidade={cotacao?.quantidade}
                  label={card.cta}
                  size="lg"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Âncora alta: a segunda opção, mais cara, à vista em vez de
              escondida numa nota. Fundo `surface-2` e botão secundário (branco)
              para ela ser lida como opção, sem disputar com a sacola. */}
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

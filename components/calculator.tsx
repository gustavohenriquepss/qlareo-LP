"use client";

import { useEffect, useId, useState } from "react";
import { usePerfil } from "@/components/perfil";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { track } from "@/lib/analytics";
import { calcularEconomia, formatBRL, sanitizePedidos, sanitizePreco } from "@/lib/calculator";
import { calculator } from "@/lib/content";

const USED_KEY = "qlareo:calculadora_usada";

/** Reserva para quando o sessionStorage não está disponível. */
let usedThisTab = false;

/**
 * Calculadora do restaurante. Roda inteira no navegador: nenhum número sai da
 * página. A conta (em centavos) e a validação vivem em `lib/calculator.ts`,
 * com testes.
 *
 * `type="text"` com `inputMode`, e não `type="number"`: o campo numérico do
 * navegador recusa "0,60" em vários locais e aceita "e" e "-". Aqui o filtro
 * de digitação só deixa entrar dígito, ponto e vírgula.
 */
export function Calculator() {
  const { perfil } = usePerfil();
  const [pedidos, setPedidos] = useState("");
  const [preco, setPreco] = useState("");
  const pedidosId = useId();
  const precoId = useId();

  const economia = calcularEconomia(pedidos, preco);

  // `calculadora_usada` uma vez por sessão: na primeira vez que os dois campos
  // têm valor válido. Storage pode falhar (aba privada); aí vale a memória da aba.
  useEffect(() => {
    if (!economia.completo) return;
    try {
      if (sessionStorage.getItem(USED_KEY)) return;
      sessionStorage.setItem(USED_KEY, "1");
    } catch {
      if (usedThisTab) return;
    }
    usedThisTab = true;
    track("calculadora_usada", { perfil });
  }, [economia.completo, perfil]);

  return (
    <Section id={calculator.id}>
      <Frame className={framePadding}>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading heading={calculator.heading} subhead={calculator.subhead} />

            <div className="flex flex-col gap-5">
              <Field
                id={pedidosId}
                label={calculator.pedidos.label}
                placeholder={calculator.pedidos.placeholder}
                inputMode="numeric"
                value={pedidos}
                onChange={(value) => setPedidos(sanitizePedidos(value))}
              />
              <Field
                id={precoId}
                label={calculator.preco.label}
                placeholder={calculator.preco.placeholder}
                inputMode="decimal"
                value={preco}
                onChange={(value) => setPreco(sanitizePreco(value))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl bg-ink p-6 text-on-ink lg:p-8">
            <div aria-live="polite" aria-atomic="true" className="flex flex-col gap-5">
              <p className="flex flex-col gap-1">
                <span className="text-[15px] text-on-ink/80">{calculator.monthlyLabel}</span>
                <span className="tnum text-[36px] leading-none font-semibold tracking-[-0.04em] lg:text-[44px]">
                  {formatBRL(economia.mensal)}
                </span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-[15px] text-on-ink/80">{calculator.yearlyLabel}</span>
                <span className="tnum text-[24px] leading-none font-semibold tracking-[-0.03em]">
                  {formatBRL(economia.anual)}
                </span>
              </p>
            </div>

            <p className="text-[14px] leading-[1.4] text-on-ink/80">
              {calculator.note}
            </p>

            <WhatsAppButton
              posicao="calculadora"
              label={calculator.cta}
              size="lg"
              className="self-start"
            />
          </div>
        </div>
      </Frame>
    </Section>
  );
}

/** Campo de texto do sistema: mesmo desenho do formulário do produto. */
function Field({
  id,
  label,
  placeholder,
  inputMode,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  inputMode: "numeric" | "decimal";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="tnum h-11 rounded-2xl border border-border-strong bg-surface px-4 text-[16px] text-ink placeholder:text-ink-muted focus-visible:border-brand"
      />
    </div>
  );
}

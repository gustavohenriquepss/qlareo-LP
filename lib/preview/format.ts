/**
 * Formatação pt-BR da prévia. Reescrita curta do que o produto faz em
 * `lib/format.ts`: locale FIXO, nunca o do browser — servidor e cliente
 * precisam gerar o mesmo texto, senão a hidratação acusa diferença.
 */
const LOCALE = "pt-BR";

const brl = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Compacto para eixo, onde "R$ 1.234.567,89" não cabe. */
const brlCompact = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const int = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

const pct = new Intl.NumberFormat(LOCALE, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const money = (value: number) => brl.format(value);
export const moneyCompact = (value: number) => brlCompact.format(value);
export const count = (value: number) => int.format(value);
/** Recebe pontos percentuais (42.5 → "42,5%"), como no produto. */
export const percent = (value: number) => `${pct.format(value)}%`;

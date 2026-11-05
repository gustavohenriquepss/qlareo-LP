/**
 * Preço da sacola para o anunciante. Fonte única dos números de preço da
 * página: `PRICING` em `lib/content.ts` e a seção de formatos leem daqui.
 * Preço só muda quando o dono pedir.
 *
 * Regras do dono (2026-11-05):
 * - O anunciante compra a EXCLUSIVIDADE da sacola, não a área impressa: cada
 *   sacola tem uma marca só. A arte fica num lado; o outro lado ainda não foi
 *   decidido (logo do restaurante ou da Qlareo), então a página não fala dele.
 * - Preço único de `PRECO_SACOLA` por sacola, sem faixa por quantidade.
 * - Quantidade livre, a partir de `MINIMO_SACOLAS` por mês (o ciclo é mensal).
 *   Um restaurante parceiro passa de 800 pedidos por mês, então menos que isso
 *   não dura o ciclo.
 *
 * Tudo em CENTAVOS inteiros, como em `lib/calculator.ts`. Este arquivo roda
 * direto no Node (`npm test`, sem build): nada de alias de import nem de
 * sintaxe de TypeScript que precise de compilação.
 */

export const MINIMO_SACOLAS = 1000;

/** R$ 2,00 por sacola, em centavos. */
export const PRECO_SACOLA = 200;

export type Cotacao = {
  quantidade: number;
  /** Centavos do mês: quantidade × preço da sacola. */
  total: number;
};

/** Cotação do mês, ou `null` abaixo do mínimo ou com quantidade inválida. */
export function cotar(quantidade: number): Cotacao | null {
  if (!Number.isSafeInteger(quantidade) || quantidade < MINIMO_SACOLAS) return null;
  return { quantidade, total: quantidade * PRECO_SACOLA };
}

/** Quantidade digitada: inteiro, aceitando ponto de milhar ("2.500"). */
export function parseQuantidade(raw: string): number | null {
  const digits = raw.replace(/[\s.]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  const value = Number(digits);
  return Number.isSafeInteger(value) ? value : null;
}

/** O que o campo aceita enquanto a pessoa digita: só dígito e ponto, até 7 caracteres. */
export function sanitizeQuantidade(raw: string): string {
  return raw.replace(/[^\d.]/g, "").slice(0, 7);
}

const inteiro = new Intl.NumberFormat("pt-BR");
const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const reaisRedondos = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** "2.500" */
export function formatQuantidade(quantidade: number): string {
  return inteiro.format(quantidade);
}

/** Total do mês: "R$ 2.000" quando fecha em reais, "R$ 2.000,50" quando não. */
export function formatTotal(centavos: number): string {
  return (centavos % 100 === 0 ? reaisRedondos : reais).format(centavos / 100);
}

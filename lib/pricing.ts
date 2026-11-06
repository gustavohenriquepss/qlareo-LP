/**
 * Preço da sacola para o anunciante. Fonte única dos números de preço da
 * página: `PRICING` em `lib/content.ts` e a seção de formatos leem daqui.
 * Preço só muda quando o dono pedir.
 *
 * Regras do dono (2026-11-05):
 * - (2026-11-06) `PRECO_SACOLA` por sacola com a arte num lado. Os dois lados
 *   custam `ADICIONAL_DOIS_LADOS`% a mais e dão a sacola só para o anunciante.
 *   Um lado já paga a sacola inteira; o outro lado pode ir para outro
 *   anunciante de um lado só, nunca do mesmo ramo, ou levar um "anuncie aqui" da Qlareo.
 * - Sem faixa por quantidade.
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

/** Adicional, em %, para a arte ir nos dois lados da sacola. */
export const ADICIONAL_DOIS_LADOS = 25;

/** Lados da sacola com a arte do anunciante. */
export type Lados = 1 | 2;

/** Preço por sacola em centavos: R$ 2,00 com um lado, R$ 2,50 com os dois. */
export function precoSacola(lados: Lados): number {
  return lados === 2 ? (PRECO_SACOLA * (100 + ADICIONAL_DOIS_LADOS)) / 100 : PRECO_SACOLA;
}

export type Cotacao = {
  quantidade: number;
  lados: Lados;
  /** Centavos por sacola. */
  sacola: number;
  /** Centavos do mês: quantidade × preço da sacola. */
  total: number;
};

/** Cotação do mês, ou `null` abaixo do mínimo ou com quantidade inválida. */
export function cotar(quantidade: number, lados: Lados = 1): Cotacao | null {
  if (!Number.isSafeInteger(quantidade) || quantidade < MINIMO_SACOLAS) return null;
  const sacola = precoSacola(lados);
  return { quantidade, lados, sacola, total: quantidade * sacola };
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

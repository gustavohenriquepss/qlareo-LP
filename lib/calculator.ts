/**
 * Conta da calculadora do restaurante: quanto ele deixa de gastar com sacola.
 *
 * Tudo em CENTAVOS inteiros. 1500 × 0.6 em ponto flutuante dá
 * 900.0000000000001; 1500 × 60 centavos dá 90000, exato.
 *
 * Este arquivo roda direto no Node (`npm test`, sem build), então não usa
 * alias de import nem sintaxe de TypeScript que precise de compilação.
 */

/** Pedidos por mês: inteiro, aceitando ponto de milhar ("1.500"). */
export function parsePedidos(raw: string): number | null {
  const digits = raw.replace(/[\s.]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  const value = Number(digits);
  return Number.isSafeInteger(value) ? value : null;
}

/**
 * Preço da sacola em centavos. Aceita "0,60", "0.60", ",6" e "1.234,56".
 * Sinal de menos, letras ou mais de uma vírgula tornam o valor inválido.
 */
export function parsePrecoCentavos(raw: string): number | null {
  let value = raw.replace(/\s/g, "");
  if (value.includes(",")) value = value.replace(/\./g, "").replace(",", ".");
  if (!/^\d*\.?\d*$/.test(value) || !/\d/.test(value)) return null;
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number * 100) : null;
}

/** O que o campo aceita enquanto a pessoa digita: o "-" nem entra. */
export function sanitizePedidos(raw: string): string {
  return raw.replace(/[^\d.]/g, "");
}

export function sanitizePreco(raw: string): string {
  return raw.replace(/[^\d.,]/g, "");
}

export type Economia = {
  /** Centavos economizados por mês. */
  mensal: number;
  /** Centavos economizados por ano. */
  anual: number;
  /** Os dois campos têm valor válido. */
  completo: boolean;
};

/** Campo vazio ou inválido conta como zero: a tela mostra R$ 0,00, nunca erro. */
export function calcularEconomia(pedidosRaw: string, precoRaw: string): Economia {
  const pedidos = parsePedidos(pedidosRaw);
  const centavos = parsePrecoCentavos(precoRaw);
  const mensal = (pedidos ?? 0) * (centavos ?? 0);
  return { mensal, anual: mensal * 12, completo: pedidos !== null && centavos !== null };
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(centavos: number): string {
  return brl.format(centavos / 100);
}

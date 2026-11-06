import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBRL } from "./calculator.ts";
import {
  ADICIONAL_FRENTE_E_VERSO,
  MINIMO_SACOLAS,
  PRECO_POR_LADOS,
  PRECO_SACOLA,
  cotar,
  formatQuantidade,
  formatTotal,
  parseQuantidade,
  sanitizeQuantidade,
} from "./pricing.ts";

// Intl separa "R$" do número com espaço não separável.
const plain = (value) => value.replace(/\s/g, " ");

test("preço do dono: R$ 2,00 por sacola, mínimo de 1.000 por mês", () => {
  assert.equal(plain(formatBRL(PRECO_SACOLA)), "R$ 2,00");
  assert.equal(MINIMO_SACOLAS, 1000);
  assert.equal(plain(formatTotal(cotar(MINIMO_SACOLAS).total)), "R$ 2.000");
});

test("o preço por sacola não muda com a quantidade", () => {
  for (const quantidade of [1000, 1800, 2499, 2500, 12345]) {
    assert.equal(cotar(quantidade).total, quantidade * PRECO_SACOLA);
  }
  assert.equal(plain(formatTotal(cotar(2500).total)), "R$ 5.000");
});

test("frente e verso: 25% a mais, R$ 2.500 nas 1.000 sacolas", () => {
  assert.equal(ADICIONAL_FRENTE_E_VERSO, 25);
  assert.equal(plain(formatBRL(PRECO_POR_LADOS.frente_e_verso)), "R$ 2,50");
  assert.equal(plain(formatTotal(cotar(1000, "frente_e_verso").total)), "R$ 2.500");
  assert.equal(plain(formatTotal(cotar(1000, "um_lado").total)), "R$ 2.000");
  assert.equal(cotar(1000).lados, "um_lado", "sem escolha, a arte vai num lado");
  for (const quantidade of [1000, 1801, 2500, 12345]) {
    const frenteEVerso = cotar(quantidade, "frente_e_verso").total;
    assert.equal(frenteEVerso, cotar(quantidade).total * 1.25);
    assert.ok(Number.isInteger(frenteEVerso), "centavo quebrado");
  }
});

test("abaixo do mínimo não há cotação", () => {
  assert.equal(cotar(999), null);
  assert.equal(cotar(999, "frente_e_verso"), null);
  assert.equal(cotar(0), null);
  assert.equal(cotar(1.5), null);
});

test("quantidade aceita ponto de milhar e recusa o resto", () => {
  assert.equal(parseQuantidade("2.500"), 2500);
  assert.equal(parseQuantidade("1000"), 1000);
  assert.equal(parseQuantidade(""), null);
  assert.equal(parseQuantidade("3,5"), null);
  assert.equal(sanitizeQuantidade("-1.000abc"), "1.000");
  assert.equal(sanitizeQuantidade("123456789"), "1234567");
  assert.equal(formatQuantidade(2500), "2.500");
});

test("total redondo sai sem centavos", () => {
  assert.equal(plain(formatTotal(200000)), "R$ 2.000");
  assert.equal(plain(formatTotal(200050)), "R$ 2.000,50");
});

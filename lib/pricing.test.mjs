import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBRL } from "./calculator.ts";
import {
  MINIMO_SACOLAS,
  PRECO_SACOLA,
  precoSacola,
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

test("abaixo do mínimo não há cotação", () => {
  assert.equal(cotar(999), null);
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

test("dois lados: 25% a mais, R$ 2,50 por sacola", () => {
  assert.equal(precoSacola(1), 200);
  assert.equal(precoSacola(2), 250);
  assert.equal(cotar(1000, 2).total, 250000);
  assert.equal(plain(formatTotal(cotar(1000, 2).total)), "R$ 2.500");
  assert.equal(cotar(1000).lados, 1);
});

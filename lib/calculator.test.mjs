import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calcularEconomia,
  formatBRL,
  parsePrecoCentavos,
  sanitizePedidos,
  sanitizePreco,
} from "./calculator.ts";

// Intl separa "R$" do número com espaço não separável.
const plain = (value) => value.replace(/\s/g, " ");

test("1500 pedidos a R$ 0,60 economizam R$ 900,00 por mês e R$ 10.800,00 por ano", () => {
  const result = calcularEconomia("1500", "0,60");
  assert.equal(plain(formatBRL(result.mensal)), "R$ 900,00");
  assert.equal(plain(formatBRL(result.anual)), "R$ 10.800,00");
  assert.equal(result.completo, true);
});

test("aceita ponto como separador decimal", () => {
  assert.deepEqual(calcularEconomia("1500", "0.60"), calcularEconomia("1500", "0,60"));
});

test("aceita ponto de milhar nos pedidos e no preço", () => {
  assert.equal(calcularEconomia("1.500", "0,60").mensal, 90000);
  assert.equal(parsePrecoCentavos("1.234,56"), 123456);
});

test("campos vazios ou inválidos mostram R$ 0,00", () => {
  for (const [pedidos, preco] of [
    ["", ""],
    ["1500", ""],
    ["", "0,60"],
    ["abc", "0,60"],
    ["1500", "1,2,3"],
  ]) {
    const result = calcularEconomia(pedidos, preco);
    assert.equal(plain(formatBRL(result.mensal)), "R$ 0,00");
    assert.equal(result.completo, false);
  }
});

test("valor negativo não é aceito", () => {
  assert.equal(parsePrecoCentavos("-0,60"), null);
  assert.equal(calcularEconomia("-1500", "0,60").mensal, 0);
  assert.equal(sanitizePedidos("-1500"), "1500");
  assert.equal(sanitizePreco("-0,60"), "0,60");
});

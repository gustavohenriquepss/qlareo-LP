/**
 * Os números da loja fictícia que aparece na prévia da seção "O Produto".
 *
 * ESTE É O ARQUIVO PARA EDITAR quando quiser mudar o que a prévia mostra. Ele é
 * dado puro: mexer aqui não quebra layout nenhum, os componentes se viram.
 *
 * Duas regras que valem a pena manter:
 *
 * 1. NÚMEROS COERENTES ENTRE SI. Faturamento ÷ pedidos tem que dar o ticket
 *    médio; classe A + B + C tem que fechar a receita. O visitante que é dono de
 *    loja faz essa conta de cabeça — e se não fechar, ele conclui que o produto
 *    também não fecha.
 * 2. NÚMEROS PLAUSÍVEIS. Uma loja de R$ 4 milhões por semana com ticket de R$ 12
 *    não existe. A prévia vende credibilidade; número irreal faz o contrário.
 *
 * Nada aqui é dado de cliente real — é uma loja inventada.
 */

/** Período que aparece na barra de filtro decorativa das quatro telas. */
export const demoPeriod = "1 – 14 de julho de 2026";

export const vendas = {
  /** Descrição da tela para quem usa leitor de tela — o mock visual fica oculto. */
  summary:
    "Prévia da tela de Vendas: R$ 487.320,00 de faturamento em 1.284 pedidos, ticket médio de R$ 379,53, com o gráfico de faturamento por dia e a tabela do período.",
  faturamento: 487320,
  pedidos: 1284,
  get ticketMedio() {
    return this.faturamento / this.pedidos;
  },
  /** Uma linha por dia do período. É esta série que desenha o gráfico. */
  serie: [
    { dia: "01/07", faturamento: 28450, pedidos: 76 },
    { dia: "02/07", faturamento: 31200, pedidos: 84 },
    { dia: "03/07", faturamento: 26800, pedidos: 71 },
    { dia: "04/07", faturamento: 38900, pedidos: 103 },
    { dia: "05/07", faturamento: 44100, pedidos: 118 },
    { dia: "06/07", faturamento: 39750, pedidos: 105 },
    { dia: "07/07", faturamento: 24300, pedidos: 64 },
    { dia: "08/07", faturamento: 29870, pedidos: 79 },
    { dia: "09/07", faturamento: 33420, pedidos: 88 },
    { dia: "10/07", faturamento: 35600, pedidos: 94 },
    { dia: "11/07", faturamento: 41280, pedidos: 109 },
    { dia: "12/07", faturamento: 47950, pedidos: 126 },
    { dia: "13/07", faturamento: 36700, pedidos: 97 },
    { dia: "14/07", faturamento: 29000, pedidos: 70 },
  ],
};

export const clientes = {
  summary:
    "Prévia da tela de Clientes: taxa de recompra de 31,4%, 892 clientes novos e 408 recorrentes, com a composição da base no período.",
  taxaRecompra: 31.4,
  novos: 892,
  recorrentes: 408,
};

export const produtos = {
  summary:
    "Prévia da tela de Produtos: R$ 487.320,00 de receita em 214 produtos distintos, com a Curva ABC e a tabela ordenada por receita.",
  receita: 487320,
  distintos: 214,
  classeA: 18,
  /**
   * Receita dos 18 produtos da classe A. Não sai da soma da tabela: a tabela
   * mostra só a cabeça da curva, e somar as cinco linhas visíveis daria um
   * número que contradiz o "18 produtos" logo ao lado. Este valor é ~80% da
   * receita, que é a definição da classe A.
   */
  receitaClasseA: 389870,
  /**
   * Curva ABC. `classe` A/B/C sai da regra do produto: A concentra até 80% da
   * receita acumulada, B vai até 95%, C é a cauda. Os itens abaixo são a
   * cabeça da curva — os que aparecem no gráfico e na tabela.
   */
  linhas: [
    { nome: "Tênis Runner Pro Preto", receita: 68420, quantidade: 214, classe: "A" as const },
    { nome: "Jaqueta Corta-Vento Azul", receita: 51900, quantidade: 173, classe: "A" as const },
    { nome: "Camiseta Dry-Fit Branca", receita: 43750, quantidade: 486, classe: "A" as const },
    { nome: "Mochila Trail 28L", receita: 37200, quantidade: 124, classe: "A" as const },
    { nome: "Legging Compressão Preta", receita: 31480, quantidade: 262, classe: "A" as const },
    { nome: "Boné Performance", receita: 22640, quantidade: 377, classe: "B" as const },
    { nome: "Meia Cano Alto (kit 3)", receita: 18300, quantidade: 610, classe: "B" as const },
    { nome: "Garrafa Térmica 750ml", receita: 14950, quantidade: 199, classe: "B" as const },
    { nome: "Faixa de Cabeça", receita: 8120, quantidade: 406, classe: "C" as const },
    { nome: "Cadarço Refletivo", receita: 4310, quantidade: 431, classe: "C" as const },
  ],
};

export const promocoes = {
  summary:
    "Prévia da tela de Promoções: R$ 62.940,00 de desconto concedido, 11,4% de desconto médio, R$ 487.320,00 de receita líquida e 412 pedidos com desconto de 1.284 analisados.",
  descontoTotal: 62940,
  descontoMedio: 11.4,
  receitaLiquida: 487320,
  get receitaBruta() {
    return this.receitaLiquida + this.descontoTotal;
  },
  pedidosComDesconto: 412,
  pedidosAnalisados: 1284,
};

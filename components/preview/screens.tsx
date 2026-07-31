import { AbcBars, SplitBar, TrendChart } from "@/components/preview/charts";
import {
  PreviewCard,
  PreviewShell,
  PreviewStat,
  PreviewTable,
  PreviewToolbar,
} from "@/components/preview/ui";
import { clientes, produtos, promocoes, vendas } from "@/lib/preview/data";
import { count, money, percent } from "@/lib/preview/format";

/**
 * As quatro telas do produto, simuladas. Cada uma monta a mesma composição da
 * tela real: barra de recorte, os números-herói, e os blocos que respondem a
 * pergunta daquela tela.
 *
 * São Server Components — entram na página como marcação pronta, sem custar JS
 * no cliente. Quem faz a troca de aba é `ProductTabs`, que recebe as quatro
 * prontas e só decide qual mostrar.
 */

export function VendasScreen() {
  return (
    <PreviewShell summary={vendas.summary}>
      <PreviewToolbar scope="Por dia" />

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PreviewStat label="Faturamento" value={money(vendas.faturamento)} emphasis />
        <PreviewStat label="Pedidos" value={count(vendas.pedidos)} />
        <PreviewStat label="Ticket médio" value={money(vendas.ticketMedio)} />
      </dl>

      <PreviewCard title="Faturamento por dia">
        <TrendChart rows={vendas.serie} />
      </PreviewCard>

      {/* Gráfico e tabela respondem perguntas diferentes — "qual é a forma" e
          "quanto exatamente" — então cada um leva seu título, e o olho pula
          direto para o que interessa em vez de varrer um cartão comprido. */}
      <PreviewCard title="Valores por dia">
        <PreviewTable
          columns={[
            { key: "dia", header: "Dia" },
            { key: "faturamento", header: "Faturamento", numeric: true },
            { key: "pedidos", header: "Pedidos", numeric: true },
            { key: "ticket", header: "Ticket médio", numeric: true },
          ]}
          rows={vendas.serie.slice(-5).map((row) => ({
            key: row.dia,
            cells: [
              row.dia,
              money(row.faturamento),
              count(row.pedidos),
              money(row.faturamento / row.pedidos),
            ],
          }))}
          footer={[
            "Total",
            money(vendas.faturamento),
            count(vendas.pedidos),
            money(vendas.ticketMedio),
          ]}
        />
      </PreviewCard>
    </PreviewShell>
  );
}

export function ClientesScreen() {
  const total = clientes.novos + clientes.recorrentes;

  return (
    <PreviewShell summary={clientes.summary}>
      <PreviewToolbar scope="Base do período" />

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PreviewStat
          label="Taxa de recompra"
          value={percent(clientes.taxaRecompra)}
          context="Clientes que compraram mais de uma vez"
          emphasis
        />
        <PreviewStat
          label="Clientes novos"
          value={count(clientes.novos)}
          context="Um único pedido na janela"
        />
        <PreviewStat
          label="Clientes recorrentes"
          value={count(clientes.recorrentes)}
          context="Dois ou mais pedidos na janela"
        />
      </dl>

      <PreviewCard title="Composição da base no período">
        <SplitBar
          segments={[
            {
              label: "Novos",
              value: clientes.novos,
              color: "var(--series-1)",
              display: `${count(clientes.novos)} (${percent((clientes.novos / total) * 100)})`,
            },
            {
              label: "Recorrentes",
              value: clientes.recorrentes,
              color: "var(--series-2)",
              display: `${count(clientes.recorrentes)} (${percent((clientes.recorrentes / total) * 100)})`,
            },
          ]}
        />
      </PreviewCard>

      <PreviewCard title="Quem voltou a comprar">
        <PreviewTable
          columns={[
            { key: "faixa", header: "Faixa" },
            { key: "clientes", header: "Clientes", numeric: true },
            { key: "share", header: "% da base", numeric: true },
          ]}
          rows={[
            { key: "1", cells: ["1 pedido", count(clientes.novos), percent((clientes.novos / total) * 100)] },
            { key: "2", cells: ["2 pedidos", count(281), percent((281 / total) * 100)] },
            { key: "3", cells: ["3 ou mais", count(127), percent((127 / total) * 100)] },
          ]}
          footer={["Total", count(total), percent(100)]}
        />
      </PreviewCard>
    </PreviewShell>
  );
}

export function ProdutosScreen() {
  return (
    <PreviewShell summary={produtos.summary}>
      <PreviewToolbar scope="Por receita" />

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PreviewStat
          label="Receita em produtos"
          value={money(produtos.receita)}
          context={`${count(1284)} pedidos analisados`}
          emphasis
        />
        <PreviewStat
          label="Produtos distintos"
          value={count(produtos.distintos)}
          context="Agrupados por produto, não por SKU"
        />
        <PreviewStat
          label="Concentração (classe A)"
          value={count(produtos.classeA)}
          context={`${count(produtos.classeA)} produtos = ${money(produtos.receitaClasseA)} de receita`}
        />
      </dl>

      <PreviewCard title="Curva ABC por receita">
        <AbcBars rows={produtos.linhas} />
      </PreviewCard>

      <PreviewCard title="Produtos do período">
        <PreviewTable
          columns={[
            { key: "produto", header: "Produto" },
            { key: "classe", header: "Classe" },
            { key: "receita", header: "Receita", numeric: true },
            { key: "quantidade", header: "Qtd.", numeric: true },
          ]}
          rows={produtos.linhas.slice(0, 5).map((linha) => ({
            key: linha.nome,
            cells: [linha.nome, linha.classe, money(linha.receita), count(linha.quantidade)],
          }))}
        />
      </PreviewCard>
    </PreviewShell>
  );
}

export function PromocoesScreen() {
  const semDesconto = promocoes.pedidosAnalisados - promocoes.pedidosComDesconto;
  const alcance = (promocoes.pedidosComDesconto / promocoes.pedidosAnalisados) * 100;

  return (
    <PreviewShell summary={promocoes.summary}>
      <PreviewToolbar scope="Campanhas do período" />

      {/* Duas colunas, não quatro: a prévia tem a largura de um notebook
          estreito, e é exatamente aí que a tela real também quebra para 2. */}
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PreviewStat
          label="Desconto concedido"
          value={money(promocoes.descontoTotal)}
          context="Preço de lista menos preço pago"
          emphasis
        />
        <PreviewStat
          label="Desconto médio"
          value={percent(promocoes.descontoMedio)}
          context="Sobre a receita bruta"
        />
        <PreviewStat
          label="Receita líquida"
          value={money(promocoes.receitaLiquida)}
          context={`Bruta: ${money(promocoes.receitaBruta)}`}
        />
        <PreviewStat
          label="Pedidos com desconto"
          value={count(promocoes.pedidosComDesconto)}
          context={`de ${count(promocoes.pedidosAnalisados)} analisados`}
        />
      </dl>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviewCard title="Onde foi a receita bruta">
          <SplitBar
            segments={[
              {
                label: "Receita líquida",
                value: promocoes.receitaLiquida,
                color: "var(--series-1)",
                display: money(promocoes.receitaLiquida),
              },
              {
                label: "Desconto",
                value: promocoes.descontoTotal,
                color: "var(--series-2)",
                display: money(promocoes.descontoTotal),
              },
            ]}
          />
        </PreviewCard>

        <PreviewCard title="Alcance da promoção">
          <SplitBar
            segments={[
              {
                label: "Com desconto",
                value: promocoes.pedidosComDesconto,
                color: "var(--series-2)",
                display: `${count(promocoes.pedidosComDesconto)} (${percent(alcance)})`,
              },
              {
                label: "Sem desconto",
                value: semDesconto,
                color: "var(--series-1)",
                display: `${count(semDesconto)} (${percent(100 - alcance)})`,
              },
            ]}
          />
        </PreviewCard>
      </div>

      <PreviewCard title="Desempenho por campanha">
        <PreviewTable
          columns={[
            { key: "campanha", header: "Campanha" },
            { key: "pedidos", header: "Pedidos", numeric: true },
            { key: "desconto", header: "Desconto", numeric: true },
            { key: "receita", header: "Receita líquida", numeric: true },
          ]}
          rows={[
            { key: "a", cells: ["Frete grátis acima de R$ 299", count(186), money(28400), money(214300)] },
            { key: "b", cells: ["Cupom PRIMEIRA10", count(134), money(19870), money(158600)] },
            { key: "c", cells: ["Leve 3 pague 2 — meias", count(92), money(14670), money(114420)] },
          ]}
        />
      </PreviewCard>
    </PreviewShell>
  );
}

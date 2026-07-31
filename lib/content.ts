/**
 * Every user-facing string on the landing page.
 *
 * Copy marked `RCD:` diverges from the Figma file on purpose — see AUDIT.md for
 * the principle behind each change and the original wording it replaced.
 */

/**
 * Number of free early-access spots still open.
 *
 * This drives the hero badge and the CTA click-trigger. Scarcity only converts
 * while it is TRUE — if you stop honouring the cap, set `total` to 0 and both
 * the badge and the trigger line disappear rather than lying to visitors.
 */
export const spots: { total: number; remaining: number } = {
  total: 10,
  remaining: 10,
};

/**
 * First focusable element on the page. Lets a keyboard or screen-reader user
 * jump the sticky header and its nav instead of tabbing through them on the
 * way to the hero CTA.
 */
export const skipToContent = "Pular para o conteúdo";

export const nav = [
  { label: "O Problema", href: "#problema" },
  { label: "A Virada", href: "#virada" },
  { label: "O Produto", href: "#produto" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "FAQ", href: "#faq" },
] as const;

/**
 * RCD: the Figma label is "Solicitar Acesso", which answers none of the three
 * questions the brain asks before clicking (what happens, how long, what it
 * costs). These answer two of the three; the click-trigger answers the rest.
 */
export const cta = {
  primary: "Garantir vaga gratuita",
  compact: "Garantir vaga",
} as const;

export const hero = {
  badge: {
    prefix: "Apenas",
    highlight: `${spots.remaining} ${spots.remaining === 1 ? "vaga gratuita" : "vagas gratuitas"}`,
    suffix: "disponíveis",
  },
  headline: {
    lead: "Seus dados de ",
    /**
     * A palavra em destaque alterna, digitada. As quatro cobrem exatamente as
     * quatro perguntas do subhead — quanto vendeu, quais produtos, quem voltou,
     * se a promoção deu lucro. A PRIMEIRA entrada é a que sai no HTML do
     * servidor: é ela que o Google, o leitor de tela e quem está sem JS leem,
     * então ela tem que sustentar a manchete sozinha.
     */
    emphasis: ["Vendas", "Clientes", "Produtos", "Promoções"],
    /** The comma stays on the first line; the break is designed, not incidental. */
    afterEmphasis: ",",
    secondLine: "finalmente claros",
  },
  subhead:
    "Quanto você vendeu, quais produtos puxam seu faturamento, quem comprou de novo e se sua promoção deu lucro.",
  subheadSecondLine: "Sem precisar de um time de dados",
  /**
   * RCD: replaces the Figma line "Grátis para as 10 primeiras lojas". A click
   * trigger has to break the objection standing between the visitor and the
   * click — here: price, commitment, and effort.
   */
  clickTrigger: [
    `Grátis para as ${spots.total} primeiras lojas`,
    "Sem cartão de crédito",
    "Conecta em minutos",
  ],
  dashboardAlt:
    "Painel do Qlareo mostrando faturamento, pedidos, ticket médio e o gráfico de faturamento por dia de uma loja VTEX",
} as const;

/**
 * RCD: the Figma has no trust layer at all above the fold. Qlareo is pre-launch,
 * so inventing testimonials or logos would be dishonest — and unanimous praise
 * reads as fake anyway. These are verifiable statements about the mechanism,
 * which is the trust layer a pre-revenue product can actually earn.
 *
 * Replace with real customer proof (case study > video testimonial > logos) the
 * moment you have it — see `testimonials` below.
 */
export const trustPoints = [
  {
    title: "API oficial da VTEX",
    body: "Conexão por AppKey e AppToken, do jeito que a VTEX documenta.",
  },
  {
    title: "Acesso somente leitura",
    body: "O Qlareo nunca cria, altera ou apaga nada dentro da sua loja.",
  },
  {
    title: "Você revoga quando quiser",
    body: "O acesso sai pelo próprio Admin da VTEX, sem depender da gente.",
  },
] as const;

/**
 * Intentionally empty. Ship real proof here — a case study with a quantified
 * result converts hardest, then a video testimonial, then logos. Do not fill
 * this with placeholder quotes: generic five-star cards read as fabricated and
 * cost more trust than showing nothing.
 */
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  company: string;
  source?: string;
}[] = [];

export const vtexStrip = {
  before: "Conecte sua loja",
  after: "em minutos e tome decisões melhores",
} as const;

export const problem = {
  id: "problema",
  heading: ["Você vende todo dia", "e decide no escuro"],
  body: [
    "Sua operação já gera todos os dados que você precisa. O problema é que eles estão espalhados.",
    "Você entra no Admin da VTEX. Exporta um CSV. Abre o Excel. Filtra. Cruza dados. Monta uma planilha.",
    "Quando finalmente consegue enxergar o que aconteceu, já perdeu muitas horas e talvez até o timing de agir.",
  ],
  /**
   * Each card carries an oversized outline icon that bleeds past its top-right
   * corner. Figma positions them from the left inside a 192.8px card; anchoring
   * from the right instead reproduces the same bleed at any card width, which
   * is what keeps the composition intact once the row stacks on mobile.
   */
  steps: [
    { label: "VTEX Admin", icon: "/figma/icon-cube.svg", w: 121, h: 121, top: -36.35, right: -26.2 },
    { label: "Excel", icon: "/figma/icon-table-cells.svg", w: 120, h: 120, top: 14.65, right: -26 },
    { label: "Filtros", icon: "/figma/icon-adjustments.svg", w: 107, h: 107, top: -22.35, right: -29.8 },
    { label: "Fórmulas", icon: "/figma/icon-calculator.svg", w: 107, h: 107, top: -17.35, right: -22.6 },
    { label: "Planilha", icon: "/figma/icon-document-text.svg", w: 107, h: 107, top: 30.65, right: -19.4 },
  ],
  /**
   * RCD: a problem-aware visitor needs the cost named, not just the situation
   * described. This states the recurring cost of the chain above without
   * inventing a statistic we cannot defend.
   */
  cost: "Cinco passos, toda semana, só para responder “como foi meu mês?”",
} as const;

export const turn = {
  id: "virada",
  heading: "E se você pudesse simplesmente abrir e saber?",
  subhead:
    "A QLAREO coloca os principais indicadores da sua operação em um único lugar.",
  pills: [
    { label: "Vendas", icon: "/figma/icon-currency.svg" },
    { label: "Clientes", icon: "/figma/icon-user-group.svg" },
    { label: "Produtos", icon: "/figma/icon-archive-box.svg" },
    { label: "Promoções", icon: "/figma/icon-percent-badge.svg" },
  ],
  caption:
    "Sem montar dashboards do zero. Sem depender de analistas. Sem passar a tarde no Excel.",
  card: {
    headline: ["Você abre. ", "Enxerga. ", "Decide."],
    body: "A informação que você precisa para direcionar sua equipe e proteger sua margem, acessível em segundos.",
  },
} as const;

export const product = {
  id: "produto",
  heading: "Tudo que você precisa para entender sua operação",
  subhead:
    "Uma visão simples dos dados que realmente importam para quem toma decisões no e-commerce.",
  /** Rótulo do `tablist` — o leitor de tela precisa saber de que é a lista. */
  tablistLabel: "Recursos do Qlareo",
  /**
   * Cada item é uma aba: clicar troca a tela mostrada à direita. As telas não
   * são capturas — são simulações vivas, em `components/preview/`, com os
   * números em `lib/preview/data.ts`.
   */
  features: [
    {
      label: "Vendas",
      icon: "/figma/icon-currency.svg",
      lead: "Saiba como sua operação está performando.",
      body: "Acompanhe suas vendas por período e entenda a evolução do faturamento e dos pedidos.",
    },
    {
      label: "Clientes",
      icon: "/figma/icon-user-group.svg",
      lead: "Descubra quem está comprando.",
      body: "Veja a relação entre novos e clientes recorrentes e entenda como sua base está contribuindo para o crescimento.",
    },
    {
      label: "Produtos",
      icon: "/figma/icon-archive-box.svg",
      lead: "Saiba o que realmente move seu negócio.",
      body: "Identifique seus produtos mais importantes e visualize a distribuição da sua receita com a Curva ABC.",
    },
    {
      label: "Promoções",
      icon: "/figma/icon-percent-badge.svg",
      lead: "Entenda o que suas promoções entregam.",
      body: "Analise o desempenho das suas campanhas e descubra quais ações estão gerando resultado.",
    },
  ],
} as const;

export const differentiators = {
  id: "diferenciais",
  heading: ["BI sem precisar", "montar um time de BI"],
  body: [
    "Você não precisa contratar um analista de dados.",
    "Não precisa construir um dashboard do zero.",
    "Não precisa aprender uma ferramenta complexa.",
    "Não precisa transformar cada pergunta sobre sua operação em uma nova planilha.",
  ],
  cards: [
    {
      title: "Plug and Play",
      body: "Comece a visualizar seus dados sem projetos intermináveis de BI.",
    },
    {
      title: "Pronto para VTEX",
      body: "Construído pensando na realidade das operações que vendem pela plataforma.",
    },
    {
      title: "Simples de entender",
      body: "Seus indicadores mais importantes, organizados em uma visão clara.",
    },
    {
      title: "Feito para PMEs",
      body: "Inteligência comercial sem o custo de uma estrutura de dados própria.",
    },
  ],
} as const;

/**
 * The Figma only carries the answer to the first question. The remaining five
 * are written here: an FAQ block is objection-handling, and a question with no
 * answer leaves the objection standing.
 */
export const faq = {
  id: "faq",
  heading: "Perguntas Frequentes",
  subhead:
    "Tudo o que você precisa saber sobre a integração do QLAREO com a sua operação VTEX.",
  items: [
    {
      q: "Preciso ter um time de dados para usar o QLAREO?",
      a: "Não. O QLAREO foi pensado para gestores de e-commerce que não têm um time de dados dedicado. A plataforma organiza os dados da sua VTEX em uma visão clara, pronta para usar.",
    },
    {
      q: "Quais dados da VTEX o QLAREO acessa?",
      a: "Pedidos, produtos, clientes e promoções — o suficiente para montar seus indicadores de vendas. O acesso é somente leitura: o QLAREO nunca cria, altera ou apaga nada dentro da sua loja.",
    },
    {
      q: "É seguro conectar minha conta VTEX?",
      a: "Sim. A conexão usa as chaves de aplicação oficiais da VTEX (AppKey e AppToken), com permissão apenas de leitura. Você revoga o acesso quando quiser pelo próprio Admin da VTEX, sem precisar falar com a gente.",
    },
    {
      q: "O QLAREO substitui um BI tradicional?",
      a: "Para a maioria das operações, sim: ele entrega no primeiro dia os indicadores que um projeto de BI levaria semanas para montar. Se sua operação já tem data warehouse e time dedicado, o QLAREO funciona como a camada rápida de leitura do dia a dia.",
    },
    {
      q: "Minha agência parceira pode acompanhar os dados da minha loja?",
      a: "Pode. Você convida a agência como usuária da sua conta e ela passa a ver os mesmos relatórios que você, sem precisar de acesso ao Admin da VTEX.",
    },
    {
      q: "E se eu tiver mais de uma conta ou loja na VTEX?",
      a: "Você conecta quantas contas quiser e alterna entre elas no topo do painel. Cada loja mantém seus próprios relatórios e seu próprio histórico.",
    },
  ],
} as const;

export const finalCta = {
  heading: "Sua operação já tem as respostas.",
  /** RCD: fixes the typo "par encontrá-las" present in the Figma copy. */
  subhead: "O QLAREO te dá a clareza que você precisa para encontrá-las.",
} as const;

export const footer = {
  tagline: "Inteligência Comercial",
  copyright: `© ${new Date().getFullYear()} Qlareo. Todos os direitos reservados`,
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/qlareo" },
    { label: "Instagram", href: "https://www.instagram.com/qlareo" },
    { label: "Twitter", href: "https://x.com/qlareo" },
  ],
} as const;

export const waitlistModal = {
  title: "Garanta sua vaga gratuita",
  subtitle: `Três informações e a gente cuida do resto. Grátis para as ${spots.total} primeiras lojas, sem cartão de crédito.`,
  nameLabel: "Nome",
  namePlaceholder: "Seu nome",
  emailLabel: "E-mail corporativo",
  emailPlaceholder: "voce@sualoja.com.br",
  companyLabel: "Nome da empresa",
  companyPlaceholder: "Sua Loja Ltda",
  submit: "Garantir minha vaga",
  submitting: "Enviando…",
  /** RCD: reinforce the decision the visitor just made (choice-supportive bias). */
  successTitle: "Vaga garantida.",
  successBody:
    "Chegou. Vamos responder no mesmo e-mail com o passo a passo para conectar sua VTEX — leva menos de 5 minutos e você não precisa instalar nada.",
  close: "Fechar",
  errorGeneric: "Não conseguimos registrar agora. Tente de novo em instantes.",
} as const;

import { formatBRL } from "@/lib/calculator";
import {
  MINIMO_SACOLAS,
  PRECO_SACOLA,
  formatQuantidade,
  formatTotal,
  precoSacola,
} from "@/lib/pricing";
import type { Perfil } from "@/lib/site";

/**
 * Toda a copy visível da página. Onde o texto muda com o perfil, o valor é um
 * `PorPerfil` com as duas versões. Seções que só existem num perfil (ex.:
 * comparativo, calculadora) estão aqui com copy única; a ordem de cada perfil
 * vive em `components/landing.tsx`.
 *
 * Regra da casa: nenhum número de alcance, recall ou conversão. Preço só muda
 * quando o dono pedir (ver `PRICING`).
 */

type PorPerfil<T> = Record<Perfil, T>;

/**
 * Preço definido pelo dono, já em texto. Os números vivem em `lib/pricing.ts`;
 * aqui só se formata. O anunciante compra um lado da sacola, ou os dois: preço
 * único por sacola, com um mínimo por mês.
 */
export const PRICING = {
  /** "R$ 2,00" */
  sacola: formatBRL(PRECO_SACOLA),
  /** "R$ 2,50": arte nos dois lados. */
  sacolaDoisLados: formatBRL(precoSacola(2)),
  /** "1.000" */
  minimo: formatQuantidade(MINIMO_SACOLAS),
  /** Menor mês possível: o mínimo de sacolas. "R$ 2.000" */
  menorMensal: formatTotal(MINIMO_SACOLAS * PRECO_SACOLA),
} as const;

/** Quem atende no WhatsApp. Rosto e nome reais: é a prova que a página tem hoje. */
export const founder = {
  name: "Gustavo Padeiro",
  role: "Fundador",
  photoAlt: "Gustavo Padeiro, fundador da Qlareo",
  /** Linha sob o CTA: convite direto, na voz do fundador. */
  ctaNote: "Me chama no Whats!",
} as const;

/**
 * Primeiro elemento focável da página. Permite que quem usa teclado ou leitor
 * de tela pule o cabeçalho fixo e a navegação.
 */
export const skipToContent = "Pular para o conteúdo";

export const header = {
  homeLabel: "Qlareo — início",
  navLabel: "Seções da página",
  nav: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Formatos", href: "#formatos" },
    { label: "Dúvidas", href: "#duvidas" },
  ],
  cta: "Chamar no WhatsApp",
} as const;

export const perfilToggle = {
  label: "Escolha seu perfil",
  /* O padrão (anunciante) vem primeiro. */
  options: [
    { value: "anunciante", label: "Sou anunciante" },
    { value: "restaurante", label: "Tenho restaurante" },
  ],
} as const satisfies { label: string; options: readonly { value: Perfil; label: string }[] };

export const hero: PorPerfil<{
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: { label: string; href: string };
}> = {
  anunciante: {
    headline: "Entre na casa do seu cliente.",
    subhead:
      "Sua marca na sacola de delivery dos restaurantes do bairro. Ela chega na mesa, na hora em que o pedido é aberto.",
    primaryCta: "Garantir minha vaga",
    secondaryCta: { label: "Ver preços", href: "#formatos" },
  },
  restaurante: {
    headline: "Ganhe sacolas de delivery. Todo mês.",
    subhead:
      "A Qlareo entrega sacolas de papel kraft impressas na sua cozinha, sem custo. Quem paga são os anunciantes do bairro.",
    primaryCta: "Quero sacolas grátis",
    secondaryCta: { label: "Como funciona", href: "#como-funciona" },
  },
};

/**
 * Linha de apoio do hero. A escassez do anunciante é a REAL: cada sacola tem
 * duas faces, então cada ciclo comporta um número fixo de marcas.
 */
export const heroSupport: PorPerfil<string> = {
  anunciante:
    "Rodando em Itaboraí e Icaraí, Niterói. Uma marca por sacola, só a sua, então as vagas de cada ciclo são contadas.",
  restaurante: "Rodando em Itaboraí e Icaraí, Niterói.",
};

/** Foto do hero (`public/hero-qlareo.png`). */
export const bag = {
  alt: "Entregador de uniforme Qlareo segurando uma sacola de delivery em papel kraft, com o espaço da sua marca e da sua oferta, um QR code de cupom e o lacre do restaurante.",
} as const;

export const highlights: PorPerfil<readonly string[]> = {
  anunciante: [
    "Dentro de casa",
    "Resultado no QR",
    "Só a sua marca",
    "A gente faz a arte",
  ],
  restaurante: [
    "Sacola grátis",
    "Entrega na cozinha",
    "Você aprova a arte",
    "Sai quando quiser",
  ],
};

type Step = { title: string; body: string };

export const howItWorks: { id: string; heading: string; steps: PorPerfil<readonly Step[]> } = {
  id: "como-funciona",
  heading: "Como funciona",
  steps: {
    anunciante: [
      {
        title: "Escolha quantas sacolas",
        body: `A partir de ${PRICING.minimo} por mês. Um lado ou os dois. Com um lado, o outro nunca vai para um concorrente seu.`,
      },
      {
        title: "Mande logo e oferta",
        body: "A gente monta a arte no nosso modelo e você aprova antes de imprimir.",
      },
      {
        title: "Sua marca chega com o pedido",
        body: "Os restaurantes da rede usam a sacola em todos os pedidos do mês.",
      },
      {
        title: "Acompanhe o resultado",
        body: "QR exclusivo e cupom próprio mostram quantas pessoas responderam.",
      },
    ],
    restaurante: [
      {
        title: "Chame a gente",
        body: "Conta quantos pedidos você faz por mês e o tamanho de sacola que usa.",
      },
      {
        title: "Receba as sacolas",
        body: "Entregamos na sua cozinha, sem custo, antes de cada ciclo.",
      },
      {
        title: "Feche com o seu lacre",
        body: "Use a sacola em todo pedido. Seu lacre deixa a sua marca na entrega.",
      },
      {
        title: "Reposição com a gente",
        body: "Contamos o estoque toda semana e repomos antes de acabar.",
      },
    ],
  },
};

/** Só anunciante. */
export const comparison = {
  id: "comparativo",
  heading: "Sua marca aonde o feed não chega.",
  subhead: "O único anúncio que entra na casa do cliente em 100% das entregas.",
  caption: "Comparativo entre a sacola Qlareo, o anúncio no Instagram e o outdoor",
  criterionLabel: "Critério",
  columns: ["Sacola Qlareo", "Anúncio no Instagram", "Outdoor"],
  rows: [
    { label: "Chega dentro da casa do cliente", values: ["Sim, em toda entrega", "Não", "Não"] },
    {
      label: "Aparece quando a pessoa tem tempo para ver",
      values: [
        "Sim, na hora de abrir o pedido",
        "Não, some no scroll",
        "Não, é visto de passagem",
      ],
    },
    { label: "Bloqueador de anúncio não alcança", values: ["Sim", "Não", "Sim"] },
    {
      label: "Fala com quem mora no bairro",
      values: ["Sim", "Depende da segmentação", "Depende do ponto"],
    },
    { label: "Resultado medido", values: ["Sim, QR e cupom", "Sim", "Não"] },
    {
      label: "Custo para começar",
      values: [
        `${PRICING.menorMensal} por mês, com arte`,
        "Você define a verba",
        "Alto, com lona e instalação",
      ],
    },
  ],
} as const;

/** Só anunciante. */
export const audience = {
  id: "para-quem-e",
  heading: "Coloque seu negócio na mesa do bairro.",
  subhead: "Exemplos de oferta que funcionam bem na sacola.",
  /* `image`: ilustração 3D em `public/categorias/`, decorativa (o nome da
     categoria já diz o que ela mostra). */
  items: [
    {
      category: "Academia",
      offer: "Primeira semana grátis para quem escanear.",
      image: "/categorias/academia.png",
    },
    {
      category: "Clínica estética ou odontológica",
      offer: "Avaliação gratuita com o cupom da sacola.",
      image: "/categorias/dentista.png",
    },
    {
      category: "Imobiliária",
      offer: "Avaliação do seu imóvel sem custo.",
      image: "/categorias/imobiliaria.png",
    },
    {
      category: "Escola de idiomas",
      offer: "Aula experimental grátis.",
      image: "/categorias/escola.png",
    },
    {
      category: "Pet shop",
      offer: "Desconto no primeiro banho.",
      image: "/categorias/petshop.png",
    },
    {
      category: "Salão e barbearia",
      offer: "Primeiro corte com desconto.",
      image: "/categorias/barbearia.png",
    },
  ],
  note: "Comida, bebida e app de delivery não anunciam na rede, para proteger os restaurantes parceiros.",
} as const;

/** Só anunciante. Mesmo âncora (`#formatos`) que "O que você ganha" do restaurante. */
export const formats = {
  id: "formatos",
  heading: "Sua marca na sacola.",
  subhead: `${PRICING.sacola} por sacola (${PRICING.sacolaDoisLados} com os dois lados), a partir de ${PRICING.minimo} por mês. Com um lado, nenhum concorrente seu fica no outro. Com os dois, a sacola é só sua.`,
  quantidade: {
    label: "Quantas sacolas por mês?",
    /* Atalhos. O primeiro é o mínimo e o padrão da página: a entrada mais
       barata fica à vista. */
    presets: [MINIMO_SACOLAS, 1500, 2500, 5000],
    inicial: MINIMO_SACOLAS,
    outraLabel: "Outra quantidade",
    placeholder: "Ex.: 1.800",
    vazio: "Escolha quantas sacolas por mês.",
    abaixoDoMinimo: `O mínimo é ${PRICING.minimo} sacolas por mês.`,
    nota: `Mesmo preço em qualquer quantidade, com a arte inclusa.`,
  },
  lados: {
    label: "Em quantos lados da sacola?",
    opcoes: [
      { value: 1, label: "Um lado", preco: PRICING.sacola },
      { value: 2, label: "Dois lados", preco: PRICING.sacolaDoisLados },
    ],
  },
  /* Um produto só: o anúncio na sacola, em um ou dois lados. `formato:
     "exclusiva"` é o id interno, mantido para não quebrar a série do evento
     `click_whatsapp`. Só os dois lados garantem a sacola sem outro anunciante.
     Com um lado só, o outro pode ir para outro anunciante, nunca do mesmo ramo. */
  card: {
    formato: "exclusiva",
    /** Título do cartão segue os lados escolhidos no seletor. */
    title: { 1: "Um lado", 2: "Dois lados" },
    items: [
      "Nenhum concorrente seu na mesma sacola",
      "Arte feita pela gente, com a sua aprovação",
      "QR exclusivo e cupom próprio",
      "Analytics da campanha, com custo por resultado",
    ],
    totalLabel: "por mês",
    cta: "Garantir minha vaga",
  },
  /** Linha sob o total: de onde ele vem. */
  total: (sacola: string, sacolas: string) => `${sacola} por sacola × ${sacolas} sacolas`,
  /* A exclusividade por rede é a âncora alta: aparece como uma segunda opção,
     e não escondida numa nota, para a sacola exclusiva ser lida ao lado dela. */
  network: {
    formato: "rede",
    title: "Exclusividade na rede",
    body: "Sua categoria só com você, em todos os restaurantes da rede.",
    price: "Sob consulta",
    cta: "Consultar exclusividade",
  },
} as const;

/** Só restaurante. Ocupa o lugar de "Formatos", com a mesma âncora. */
export const gains = {
  id: "formatos",
  heading: "O que você ganha",
  subhead: "Seu delivery continua igual. Só a sacola muda, e para de pesar no custo.",
  cards: [
    {
      title: "Sacola sem custo",
      body: "Papel kraft impresso, entregue na sua cozinha. Uma despesa a menos todo mês.",
      image: "/ganhos/sacola.png",
    },
    {
      title: "Sua marca no lacre",
      body: "Feche a sacola com o lacre que você já usa. Seu nome continua na entrega.",
      image: "/ganhos/adesivo.png",
    },
    {
      title: "Nada de concorrente",
      body: "Sem anúncio de comida, bebida ou app de delivery. Você vê cada arte antes.",
      image: "/ganhos/check-concorrentes.png",
    },
  ],
} as const;

/**
 * Só anunciante. O que a campanha entrega e o que é medido em cada sacola.
 * Sem número de resultado: a página diz O QUE se mede, nunca quanto dá.
 */
export const deliverables = {
  id: "o-que-voce-recebe",
  heading: "Acompanhe os resultados do seu anúncio.",
  subhead: "Cada sacola é rastreada. Você acompanha a campanha do começo ao fim, com números de verdade em vez de achismo.",
  items: [
    {
      title: "QR exclusivo da sua campanha",
      body: "Leva para o seu site, WhatsApp ou Instagram. Dá para trocar o destino durante a campanha sem reimprimir.",
    },
    {
      title: "Sacolas distribuídas",
      body: "Quantas sacolas da sua campanha saíram com pedidos.",
    },
    {
      title: "Taxa de leitura do QR",
      body: "Quantas pessoas escanearam o QR em relação às sacolas distribuídas.",
    },
    {
      title: "Painel de controle",
      body: "Acompanhe leituras do QR, cupons usados e custo por resultado no seu painel de controle.",
    },
    {
      title: "Uso de cupom",
      body: "Cada sacola tem um cupom próprio, para contar quem comprou no balcão ou no WhatsApp.",
    },
    {
      title: "Custo por resultado",
      body: "O valor pago dividido pelas leituras do QR ou pelos cupons usados.",
    },
  ],
} as const;

/** Só restaurante. */
export const calculator = {
  id: "a-conta",
  heading: "Faça a conta da sua sacola.",
  subhead: "Coloque seus números e veja quanto deixa de gastar por mês.",
  pedidos: { label: "Pedidos por mês", placeholder: "1500" },
  preco: { label: "Quanto você paga por sacola (R$)", placeholder: "0,60" },
  monthlyLabel: "Você economiza por mês:",
  yearlyLabel: "Por ano:",
  note: "A sacola Qlareo é grátis enquanto o seu delivery estiver na rede.",
  cta: "Quero sacolas grátis",
} as const;

type FaqItem = { q: string; a: string };

export const faq: { id: string; heading: string; items: PorPerfil<readonly FaqItem[]> } = {
  id: "duvidas",
  heading: "Dúvidas",
  items: {
    anunciante: [
      {
        q: "Quanto custa?",
        a: `${PRICING.sacola} por sacola, a partir de ${PRICING.minimo} sacolas por mês (${PRICING.menorMensal}). Com os dois lados (${PRICING.sacolaDoisLados} por sacola), a sacola é só sua. Com um lado, o outro nunca vai para um concorrente do seu ramo.`,
      },
      {
        q: "Qual a quantidade mínima?",
        a: `${PRICING.minimo} sacolas por mês. Acima disso, você escolhe quantas quiser, sempre a ${PRICING.sacola} cada.`,
      },
      {
        q: "Como sei se deu resultado?",
        a: "Cada anunciante tem um QR e um cupom próprios. No seu painel de controle você vê o número de leituras e de cupons usados.",
      },
      {
        q: "Quem cria a arte?",
        a: "A gente. Você manda logo, oferta e link, e montamos no nosso modelo, com uma rodada de ajuste.",
      },
      {
        q: "Em quais restaurantes minha marca aparece?",
        a: "Você recebe a lista de restaurantes da rede antes de fechar.",
      },
      {
        q: "Como é o pagamento?",
        a: "Na assinatura. A impressão começa logo depois, no próximo ciclo.",
      },
    ],
    restaurante: [
      {
        q: "É grátis mesmo?",
        a: "Sim. Quem paga a sacola são os anunciantes. Você não paga nada.",
      },
      {
        q: "Que anúncios vão na sacola?",
        a: "Comércio e serviços do bairro. Nada de comida, bebida ou app de delivery, e você vê cada arte antes.",
      },
      {
        q: "O que eu preciso fazer?",
        a: "Usar a sacola em todo pedido e fechar com o seu lacre. O resto é com a gente.",
      },
      {
        q: "E se eu quiser sair?",
        a: "É só avisar com 30 dias. Sem multa.",
      },
    ],
  },
};

export const finalCta: { heading: PorPerfil<string>; cta: string } = {
  heading: {
    anunciante: "Garanta sua vaga no próximo ciclo de impressão.",
    restaurante: "Coloque seu delivery na rede Qlareo.",
  },
  cta: "Chamar no WhatsApp",
};

export const footer = {
  location: "Itaboraí e Icaraí, Niterói · RJ",
  instagramLabel: "Instagram da Qlareo",
  copyright: `© ${new Date().getFullYear()} Qlareo`,
} as const;

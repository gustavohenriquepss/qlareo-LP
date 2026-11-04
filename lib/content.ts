import type { Perfil } from "@/lib/site";

/**
 * Toda a copy visível da página. Onde o texto muda com o perfil, o valor é um
 * `PorPerfil` com as duas versões. Seções que só existem num perfil (ex.:
 * comparativo, calculadora) estão aqui com copy única; a ordem de cada perfil
 * vive em `components/landing.tsx`.
 *
 * Regra da casa: nenhum número de alcance, recall ou conversão. Preço fica em
 * `PRICE_PLACEHOLDER` até o dono definir.
 */

type PorPerfil<T> = Record<Perfil, T>;

/** PLACEHOLDER: preço dos formatos. */
export const PRICE_PLACEHOLDER = "[SEU PREÇO]";

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
    secondaryCta: { label: "Ver formatos", href: "#formatos" },
  },
  restaurante: {
    headline: "Ganhe sacolas de delivery. Todo mês.",
    subhead:
      "A Qlareo entrega sacolas de papel kraft impressas na sua cozinha, sem custo. Quem paga são os anunciantes do bairro.",
    primaryCta: "Quero sacolas grátis",
    secondaryCta: { label: "Como funciona", href: "#como-funciona" },
  },
};

export const heroSupport =
  "Rodando em Itaboraí e Icaraí, Niterói. Vagas de cliente fundador abertas.";

/** Textos impressos na ilustração da sacola do hero. */
export const bag = {
  alt: "Ilustração de uma sacola de delivery de papel kraft com o espaço da sua marca e da sua oferta, um QR code de cupom, a faixa da rede Qlareo e o lacre do restaurante.",
  brand: "SUA MARCA AQUI",
  offer: "Sua oferta em uma frase curta",
  qr: "Aponte a câmera e ganhe o cupom",
  band: "rede de delivery do bairro",
  seal: ["LACRE DO", "RESTAURANTE"],
} as const;

export const highlights: PorPerfil<readonly string[]> = {
  anunciante: [
    "Dentro de casa, não no feed",
    "Leituras do QR medidas",
    "Sem concorrente na mesma sacola",
    "Arte montada pela gente",
  ],
  restaurante: [
    "Sacola grátis todo mês",
    "Reposição na sua cozinha",
    "Você aprova os anúncios",
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
        title: "Escolha o formato",
        body: "Sacola inteira só sua ou uma face dividida com outro anunciante.",
      },
      {
        title: "Mande logo e oferta",
        body: "A gente monta a arte no nosso modelo e você aprova antes de imprimir.",
      },
      {
        title: "Sua marca sai em cada entrega",
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
  heading: "Saia do feed. Entre na mesa.",
  subhead: "Compare a sacola com o que você já usa para anunciar no bairro.",
  caption: "Comparativo entre a sacola Qlareo, o anúncio no Instagram e o panfleto",
  criterionLabel: "Critério",
  columns: ["Sacola Qlareo", "Anúncio no Instagram", "Panfleto"],
  rows: [
    { label: "Chega dentro da casa do cliente", values: ["Sim", "Não", "Às vezes"] },
    {
      label: "Aparece quando a pessoa tem tempo para ver",
      values: ["Sim, na hora de abrir o pedido", "Não, some no scroll", "Não"],
    },
    { label: "Bloqueador de anúncio não alcança", values: ["Sim", "Não", "Sim"] },
    { label: "Fala com quem mora no bairro", values: ["Sim", "Depende da segmentação", "Sim"] },
    { label: "Resultado medido", values: ["Sim, QR e cupom", "Sim", "Não"] },
  ],
} as const;

/** Só anunciante. */
export const audience = {
  id: "para-quem-e",
  heading: "Coloque seu negócio na mesa do bairro.",
  subhead: "Exemplos de oferta que funcionam bem na sacola.",
  items: [
    { category: "Academia", offer: "Primeira semana grátis para quem escanear." },
    {
      category: "Clínica estética ou odontológica",
      offer: "Avaliação gratuita com o cupom da sacola.",
    },
    { category: "Imobiliária", offer: "Avaliação do seu imóvel sem custo." },
    { category: "Escola de idiomas", offer: "Aula experimental grátis." },
    { category: "Pet shop", offer: "Desconto no primeiro banho." },
    { category: "Salão e barbearia", offer: "Primeiro corte com desconto." },
  ],
  note: "Comida, bebida e app de delivery não anunciam na rede, para proteger os restaurantes parceiros.",
} as const;

/** Só anunciante. Mesmo âncora (`#formatos`) que "O que você ganha" do restaurante. */
export const formats = {
  id: "formatos",
  heading: "Escolha seu formato",
  subhead:
    "Os dois formatos têm o mesmo investimento mensal. Um entrega mais impacto, o outro mais alcance.",
  cards: [
    {
      tag: "MAIS IMPACTO",
      title: "Sacola exclusiva",
      body: "Frente e verso só seus. Ninguém divide a sacola com a sua marca.",
      items: [
        "2.500 sacolas por mês",
        "Frente e verso com a sua arte",
        "QR exclusivo e cupom próprio",
      ],
      featured: true,
    },
    {
      tag: "MAIS ALCANCE",
      title: "Meia sacola",
      body: "Uma face sua, a outra de um anunciante que não concorre com você.",
      items: ["5.000 entregas por mês", "Uma face com a sua arte", "QR exclusivo e cupom próprio"],
      featured: false,
    },
  ],
  price: { before: "Investimento: ", value: PRICE_PLACEHOLDER, after: " por mês" },
  note: "Quer ser a única marca da sua categoria em toda a rede? Pergunte pela exclusividade por rede.",
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
    },
    {
      title: "Sua marca no lacre",
      body: "Feche a sacola com o lacre que você já usa. Seu nome continua na entrega.",
    },
    {
      title: "Nada de concorrente",
      body: "Sem anúncio de comida, bebida ou app de delivery. Você vê cada arte antes.",
    },
  ],
} as const;

/** Só anunciante. */
export const deliverables = {
  id: "o-que-voce-recebe",
  heading: "Veja o que a sua sacola trouxe.",
  items: [
    {
      title: "QR exclusivo da sua campanha",
      body: "Leva para o seu site, WhatsApp ou Instagram. Dá para trocar o destino durante a campanha sem reimprimir.",
    },
    {
      title: "Cupom próprio",
      body: "Para contar quem comprou no balcão ou no seu WhatsApp.",
    },
    {
      title: "Relatório da campanha",
      body: "Sacolas distribuídas, restaurantes da rede, leituras do QR por dia e cupons usados.",
    },
  ],
  footnote: "Em breve, um painel para acompanhar os resultados em tempo real.",
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
        a: "Depende do formato e do volume. Chame no WhatsApp e mandamos a tabela do próximo ciclo.",
      },
      {
        q: "Como sei se deu resultado?",
        a: "Cada anunciante tem um QR e um cupom próprios. Você recebe o número de leituras e de cupons usados.",
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

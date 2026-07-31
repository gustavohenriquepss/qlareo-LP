import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { skipToContent } from "@/lib/content";
import "./globals.css";

/**
 * Inter, uma família só com variação de peso ("Minimal Swiss"): é a escolha
 * padrão de painel/admin porque foi desenhada para texto de interface em
 * tamanho pequeno, e porque uma família só remove uma decisão de cada
 * componente. Mesma fonte do produto, pelo mesmo motivo.
 *
 * A Geist saiu junto com o wordmark em texto vivo: ela existia só para
 * desenhar "Qlareo" no cabeçalho, e a logo agora é SVG vetorizado (ver
 * components/ui/logo.tsx). Era uma família inteira baixada para seis letras.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Qlareo — Seus dados de vendas na VTEX, finalmente claros";
const description =
  "Quanto você vendeu, quais produtos puxam seu faturamento, quem comprou de novo e se sua promoção deu lucro. Conecte sua loja VTEX em minutos, sem precisar de um time de dados.";

export const metadata: Metadata = {
  /* O apex é o endereço canônico da LP. Sem isto, `www.qlareo.com` e
     `qlareo.com` seriam duas páginas idênticas aos olhos do Google, e as
     URLs de og:image sairiam relativas — o que quebra o preview em
     WhatsApp e LinkedIn, que não resolvem caminho relativo.
     O redirect 308 do www vive em next.config.ts. */
  metadataBase: new URL("https://qlareo.com"),
  alternates: { canonical: "/" },
  title,
  description,
  applicationName: "Qlareo",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "Qlareo",
    url: "https://qlareo.com",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Igual a --background. Literal porque a barra do navegador é pintada antes
     de existir CSS para resolver a variável. */
  themeColor: "#f8fafc",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `suppressHydrationWarning` SÓ aqui, no <html>, e por um motivo específico:
    // extensões de navegador escrevem atributos na tag raiz antes do React
    // hidratar (crosspilot, Grammarly, gerenciadores de tema…), e o React trata
    // isso como mismatch — erro que aparece na máquina do usuário e não tem
    // correspondente no nosso código. A supressão é RASA: vale para os
    // atributos deste elemento, não para a árvore abaixo. Um mismatch de
    // verdade, em qualquer componente nosso, continua sendo reportado.
    // (Mesma decisão, e mesmo motivo, do layout do produto.)
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body>
        {/* Fora da tela até receber foco, depois fixo sobre o cabeçalho. */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-primary focus:px-4 focus:text-[14px] focus:font-semibold focus:text-on-primary"
        >
          {skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}

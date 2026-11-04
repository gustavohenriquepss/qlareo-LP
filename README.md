# Qlareo — Landing Page

Landing page da Qlareo em `qlareo.com`. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · pt-BR.

## O produto

A Qlareo é uma **rede de mídia em sacolas de delivery**.

- Restaurantes recebem sacolas de papel kraft impressas **de graça**.
- Anunciantes locais pagam para aparecer nelas, **100% antecipado**.
- Dois formatos: **sacola exclusiva** (um anunciante, frente e verso) e **meia sacola**
  (um anunciante por face).
- Piloto em **Itaboraí** e **Icaraí, Niterói** (RJ).

A página fala com os dois públicos. Um seletor no topo troca o conteúdo inteiro entre
"Sou anunciante" (padrão) e "Tenho restaurante". O link `?perfil=restaurante` já abre do
lado do restaurante. O CTA de todas as seções é o WhatsApp.

O painel do anunciante e o redirect dos QR codes (`/r/:slug`, com contagem de leituras)
**não** moram aqui: ficam no app, em `app.qlareo.com` (repositório `gustavohenriquepss/qlareo`).

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de produção
npm run typecheck    # tsc --noEmit
npm test             # testes da calculadora (node --test)
```

## Onde fica cada coisa

| Caminho | O que é |
| --- | --- |
| `lib/content.ts` | **Toda a copy da página**, separada por perfil. Mude texto aqui, não nos componentes. |
| `lib/site.ts` | Constantes de contato: `WHATSAPP_NUMBER`, `INSTAGRAM_URL` e as mensagens do WhatsApp. |
| `lib/analytics.ts` | `track()` e os eventos da página. Ainda sem provider. |
| `lib/calculator.ts` | Conta da calculadora do restaurante (função pura, com testes). |
| `components/perfil.tsx` | Estado do perfil, leitura e escrita de `?perfil=`. |
| `components/landing.tsx` | Ordem das seções de cada perfil. |
| `components/` | Uma seção por arquivo. `components/ui/` tem os componentes base. |
| `app/globals.css` | Tokens de design, **copiados do produto** (ver abaixo). |

## Placeholders a trocar antes de divulgar

| O quê | Onde |
| --- | --- |
| Número do WhatsApp (`5521000000000`) | `WHATSAPP_NUMBER` em `lib/site.ts` |
| Instagram (`https://instagram.com/`) | `INSTAGRAM_URL` em `lib/site.ts` |
| Preço dos formatos (`[SEU PREÇO]`) | `PRICE_PLACEHOLDER` em `lib/content.ts` |
| Imagem de compartilhamento (OG) | `app/opengraph-image.tsx` |
| Provider de analytics | `send()` em `lib/analytics.ts` |

## Analytics

Os eventos já disparam, mas ainda não vão para lugar nenhum: `send()` em `lib/analytics.ts`
é o único ponto para ligar um provider (GA4, Plausible, PostHog…).

| Evento | Quando | Propriedades |
| --- | --- | --- |
| `click_whatsapp` | Clique em qualquer botão de WhatsApp | `perfil`, `posicao` (`header`, `hero`, `calculadora`, `cta_final`) |
| `toggle_perfil` | Troca no seletor do hero | `perfil` |
| `calculadora_usada` | Os dois campos da calculadora preenchidos (uma vez por sessão) | `perfil` |

## Design system

Os tokens em `app/globals.css` são **cópia de `qlareo/web/app/globals.css`**, o design
system do app. A landing é a porta de entrada do app: quem sai daqui e entra no painel
não pode sentir que mudou de marca.

**Não edite valor de token aqui.** A fonte da verdade é o app, e mudanças descem de lá
para cá. O que existe só neste arquivo são tokens sem sentido num painel, isolados no
bloco `Extensões da landing` no fim (`--spacing-frame`, `--on-ink`).

A única cor fora do sistema é o kraft da ilustração da sacola (`#C49A6C`). Ela vive como
constante em `components/bag-illustration.tsx` e não é usada em mais nenhum lugar.

Três convenções valem para qualquer UI nova:

- **`--primary` pinta ação, `--brand` é identidade.** O CTA é `bg-primary` (`#1e40af`),
  não `bg-brand`. O azul da marca fica no símbolo da logo e em destaques.
- **`.control` dimensiona tudo que é clicável**: 36px para ponteiro fino e 44px quando o
  ponteiro é grosso (dedo).
- **A página quase não tem linha.** Nada de coluna riscada nem divisória entre seções:
  conteúdo se agrupa em cartões brancos com canto de 16px (`rounded-2xl`) sobre o
  `--background`, e seção se separa por respiro. O público é pequeno negócio, e o visual
  de grade lia como software corporativo. As bordas que sobraram (campos de formulário)
  usam `--border-strong`.

`components/ui/logo.tsx` é cópia literal do `Logo.tsx` do app. Mantenha os dois iguais:
copie de novo em vez de editar. No fundo escuro, use `<Logo className="text-on-ink" />`. O
nome herda `currentColor` e o símbolo continua no azul da marca.

## Arquivo

A landing anterior (do SaaS de relatórios de vendas para lojas VTEX, com a waitlist
em planilha) está preservada fora do `main`. Ela não fica publicada como rota do site.

| Onde | O que é |
| --- | --- |
| tag `legacy/relatorios-v1` | Snapshot imutável do último estado (commit `2437826`). |
| branch `archive/relatorios` | Mesmo commit, para abrir preview na Vercel ou continuar dali. |

Para recuperar:

```bash
git checkout legacy/relatorios-v1                         # só olhar (HEAD destacado)
git switch -c minha-branch legacy/relatorios-v1           # trabalhar a partir dele
git checkout legacy/relatorios-v1 -- components/preview   # trazer uma pasta para o main
```

**Preview:** o projeto é implantado pela integração Git da Vercel, que gera um preview para
cada branch enviada ao GitHub. O da `archive/relatorios` fica em Vercel › projeto ›
**Deployments**, filtrando pela branch. A URL estável da branch segue o padrão
`<projeto>-git-archive-relatorios-<time>.vercel.app`. Se o projeto tiver Deployment
Protection ligada, o preview pede login na Vercel.

O produto de relatórios em si (painel, adapters VTEX, banco) vive no repositório
`gustavohenriquepss/qlareo` e não foi alterado aqui.

## Deploy

A integração Git da Vercel publica o `main` em produção (`qlareo.com`). O `www.qlareo.com`
redireciona com 308 para o apex (`next.config.ts`). A página não precisa de nenhuma
variável de ambiente.

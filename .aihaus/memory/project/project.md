# Project

## Purpose

- Verified: landing page de pré-lançamento do Qlareo, produto de relatórios de vendas para lojas VTEX ("quanto vendeu, quais produtos, quem comprou de novo, se a promoção deu lucro"), cujo objetivo é captar leads para uma waitlist de acesso antecipado gratuito. Source: `README.md`, `app/layout.tsx`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: a LP é a "porta de entrada" do app `qlareo/web` (repositório separado); quem clica no CTA não pode sentir que mudou de marca. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Users and outcomes

- Verified: público são lojistas VTEX (B2B) sem time de dados; a promessa é conectar a loja em minutos, sem cartão de crédito, grátis para as primeiras lojas. Source: `lib/content.ts`, `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: o resultado medido é o lead gravado na planilha, com a origem do CTA (`source`). Source: `app/api/waitlist/route.ts`, `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## In scope

- Verified: página única em pt-BR (Next.js 16 App Router, TypeScript, Tailwind v4) com seções em ordem: header, hero, problema, virada, produto, diferenciais, FAQ, CTA final, rodapé. Source: `README.md`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: endpoint `POST /api/waitlist` que grava leads numa planilha Google (Apps Script) e avisa por e-mail via Resend. Source: `app/api/waitlist/route.ts`, `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Out of scope

- Verified: não há analytics instrumentado; o campo `source` é o único sinal de conversão. Source: `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: não há menu de navegação mobile abaixo de `lg` (trade-off deliberado, não bug). Source: `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: tokens de design não são definidos aqui; a fonte da verdade é o produto. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Definition of Done

- Inferred candidate: `npm run typecheck` e `npm run build` passam (únicos checks documentados; não há testes nem CI no repositório). Source: `README.md`, `package.json` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Unresolved: não existe Definition of Done explícita escrita pelo dono.

## Current constraints

- Verified: toda string visível ao usuário vive em `lib/content.ts`; não editar copy nos componentes. Source: `README.md`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: não editar valores de tokens em `app/globals.css`, que são cópia de `qlareo/web/app/globals.css`; só o bloco "Extensões da landing" é local. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: `components/ui/logo.tsx` é cópia verbatim do `Logo.tsx` do produto; re-copiar em vez de editar. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: o domínio canônico é `https://qlareo.com`; `www.qlareo.com` redireciona com 308. Source: `next.config.ts`, `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

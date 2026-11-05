# Project

## Purpose

- Verified: landing page (`qlareo.com`) da Qlareo, rede de mídia em sacolas de delivery: restaurantes recebem sacolas de papel kraft impressas de graça e anunciantes locais pagam para aparecer nelas. Source: `README.md`, `AGENTS.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: a página converte pelo WhatsApp; não há formulário nem backend neste repositório. Source: `lib/site.ts`, `components/whatsapp-button.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Users and outcomes

- Verified: dois públicos na mesma página, alternados por um seletor no hero: anunciante (padrão desde 2026-11-05, gera o faturamento) e restaurante; `?perfil=restaurante` abre direto do lado do restaurante. Source: `components/perfil.tsx`, `app/page.tsx`, `lib/site.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: dois planos para o anunciante: Impacto (1 anunciante, frente e verso) e Alcance (1 anunciante por lado), renomeados pelo dono em 2026-11-04; pagamento 100% antecipado. Source: `AGENTS.md`, `lib/content.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: piloto em Itaboraí e Icaraí, Niterói (RJ). Source: `AGENTS.md`, `lib/content.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## In scope

- Verified: só a landing. A ordem das seções de cada perfil vive em `components/landing.tsx`; a copy, em `lib/content.ts`. Source: `components/landing.tsx`, `lib/content.ts`, `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Out of scope

- Verified: o painel do anunciante e o redirect dos QR codes (`/r/:slug`) ficam no app, em `app.qlareo.com` (repositório `gustavohenriquepss/qlareo`). Source: `README.md`, `AGENTS.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: a landing anterior (SaaS de relatórios) está só na tag `legacy/relatorios-v1` e na branch `archive/relatorios`. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Definition of Done

- Inferred candidate: `npm run typecheck`, `npm test` e `npm run build` passam; página sem rolagem horizontal em 360 px. Source: `README.md`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Current constraints

- Verified: nenhum número de alcance, recall ou conversão na página; preço definido pelo dono em `PRICING` (`lib/content.ts`) e não muda sem ele pedir. Source: `lib/content.ts`, `AGENTS.md` (working tree 2026-11-04, sobre e60a70e).
- Verified: tokens de `app/globals.css` são cópia do app e não se editam aqui; nenhuma cor fora do sistema na interface (a ilustração com o kraft `#C49A6C` saiu; o hero usa a foto do entregador em PNG). Source: `README.md` (working tree 2026-11-04, sobre e60a70e).
- Verified: `components/ui/logo.tsx`, `app/icon.svg` e `app/apple-icon.tsx` são da marca e não mudam; no fundo escuro usa-se `<Logo className="text-on-ink" />`. Source: `README.md`, `components/ui/logo.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

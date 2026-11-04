# Environment

## Local

- Verified: Node.js + npm; `npm install` e `npm run dev` (Next dev com Turbopack) em http://localhost:3000. Sem env vars a waitlist funciona e só loga os leads. Source: `README.md`, `package.json`, `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: variáveis locais ficam em `.env.local` (ignorado pelo git). Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## CI

- Unresolved: nenhuma configuração de CI no repositório.

## Staging or homolog

- Unresolved: nenhum ambiente de staging documentado.

## Production

- Verified: hospedado na Vercel; `qlareo.com` (canônico) e `www.qlareo.com` (redireciona com 308) apontam para o projeto. Source: `next.config.ts`, `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: as env vars de produção ficam nas Environment Variables do projeto Vercel. Source: `README.md`, `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## External dependencies

- Verified: Google Apps Script (Web app) gravando na planilha: `WAITLIST_WEBHOOK_URL` e `WAITLIST_WEBHOOK_TOKEN` (o mesmo valor fica na propriedade de script `WAITLIST_TOKEN`). Source: `app/api/waitlist/route.ts`, `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: Resend para o e-mail de aviso: `RESEND_API_KEY`, `WAITLIST_NOTIFY_TO` e `WAITLIST_NOTIFY_FROM` (opcional; padrão `onboarding@resend.dev`). Source: `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: Google Fonts (Inter via `next/font`). Source: `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

Describe topology and access expectations. Never store credentials or secret
values in this file.

# Environment

## Local

- Verified: Node.js + npm; `npm install` e `npm run dev` (Next dev com Turbopack) em http://localhost:3000. Nenhuma variável de ambiente é necessária. Source: `README.md`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## CI

- Unresolved: nenhuma configuração de CI no repositório.

## Staging or homolog

- Verified: cada branch enviada ao GitHub ganha um preview automático da integração Git da Vercel. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Production

- Verified: Vercel; `qlareo.com` é o canônico e `www.qlareo.com` redireciona com 308. Source: `next.config.ts`, `app/layout.tsx`, `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## External dependencies

- Verified: WhatsApp (`wa.me`) com o número em `lib/site.ts`; Google Fonts (Inter via `next/font`). Source: `lib/site.ts`, `app/layout.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: o app do anunciante fica em `app.qlareo.com`, em outro repositório. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

Describe topology and access expectations. Never store credentials or secret
values in this file.

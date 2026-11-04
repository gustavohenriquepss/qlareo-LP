# Deployment

## Environments

- Verified: produção na Vercel em `https://qlareo.com`. Source: `next.config.ts`, `app/layout.tsx`, `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Preconditions

- Verified: `WAITLIST_WEBHOOK_URL` (e `WAITLIST_WEBHOOK_TOKEN`) configurados no projeto Vercel antes do deploy de produção, senão os leads só chegam aos logs. Source: `README.md`, `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Release procedure

- Verified: `npx vercel` é o comando documentado. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Unresolved: não está documentado se a produção sai pela integração Git da Vercel (push na `main`) ou pela CLI.

## Smoke checks

- Inferred candidate: enviar um lead de teste pela LP em produção e confirmar a linha na planilha (adaptação de `scripts/README.md` §5). Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Rollback

- Unresolved: nenhum procedimento de rollback documentado.

## Approval policy

- Unresolved: nenhuma política de aprovação documentada.

Instructions are not containment. Name the external controls and credential
scope required for each environment.

# Procedures

## Development closeout

1. Run affected checks.
2. Run broader repository checks required by the Definition of Done.
3. Record commands, exit codes, and degraded checks.
4. Review the diff and update durable memory only when warranted.

- Verified: os checks são `npm run typecheck`, `npm test` (calculadora, `node --test`) e `npm run build`. Source: `README.md`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Operational procedures

- Verified: **Antes de divulgar**, trocar os placeholders: `WHATSAPP_NUMBER` e `INSTAGRAM_URL` em `lib/site.ts`, `PRICE_PLACEHOLDER` em `lib/content.ts` e a imagem em `app/opengraph-image.tsx`. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: **Recuperar a versão antiga**: `git checkout legacy/relatorios-v1` (ou `-- <caminho>` para trazer um arquivo). Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

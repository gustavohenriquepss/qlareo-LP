# Procedures

## Development closeout

1. Run affected checks.
2. Run broader repository checks required by the Definition of Done.
3. Record commands, exit codes, and degraded checks.
4. Review the diff and update durable memory only when warranted.

- Verified: os checks são `npm run typecheck`, `npm test` (calculadora, `node --test`) e `npm run build`. Source: `README.md`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Operational procedures

- Verified: **Antes de divulgar**, trocar o placeholder que resta: `INSTAGRAM_URL` em `lib/site.ts`. WhatsApp, preço, imagem de compartilhamento e analytics (Vercel) já estão definidos. Source: `README.md` (working tree 2026-11-04, sobre 7ebb5f9).
- Verified: **Recuperar a versão antiga**: `git checkout legacy/relatorios-v1` (ou `-- <caminho>` para trazer um arquivo). Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

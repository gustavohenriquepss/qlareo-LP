# Procedures

## Development closeout

1. Run affected checks.
2. Run broader repository checks required by the Definition of Done.
3. Record commands, exit codes, and degraded checks.
4. Review the diff and update durable memory only when warranted.

- Verified: os checks disponíveis são `npm run typecheck` (`tsc --noEmit`) e `npm run build`; não há suíte de testes. Source: `README.md`, `package.json` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Operational procedures

- Verified: **Configurar o destino dos leads**: criar a planilha, colar `scripts/waitlist-sheet.gs` no Apps Script, definir `WAITLIST_TOKEN`, publicar como App da Web (Executar como: Eu; acesso: Qualquer pessoa) e setar `WAITLIST_WEBHOOK_URL`/`WAITLIST_WEBHOOK_TOKEN` em `.env.local` e na Vercel. Passo a passo completo em `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: **Testar a waitlist**: POST em `http://localhost:3000/api/waitlist` com `name`, `email`, `company` e `source`; esperado `ok: true` e uma linha nova na planilha. Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: **Atualizar o Apps Script**: Implantar › Gerenciar implantações › editar › Nova versão. Nunca "Nova implantação" (gera outra URL). Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: **Encerrar a escassez**: `spots.total = 0` em `lib/content.ts`. Source: `README.md`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

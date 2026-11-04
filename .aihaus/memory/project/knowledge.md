# Knowledge

## Verified facts

- Verified: a copy é centralizada em `lib/content.ts`; há uma seção por arquivo em `components/`, na ordem da página; `components/waitlist.tsx` contém o modal e o contexto que todo CTA usa. Source: `README.md`, `components/waitlist.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: `hero.headline.emphasis` alterna palavras digitadas; a primeira entrada ("Vendas") é a que sai no HTML do servidor e precisa sustentar a manchete sozinha. Source: `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: as perguntas da FAQ emitem dados estruturados `FAQPage`. Source: `AUDIT.md` §5 (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: `suppressHydrationWarning` existe só no `<html>`, por causa de extensões de navegador; não espalhar para outros elementos. Source: `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: `.control` dimensiona elementos clicáveis: 36px com ponteiro fino, 44px com ponteiro grosso. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Recurring gotchas

- Verified: SVGs de cor única são pintados com CSS mask e declaram `stroke`/`fill="currentColor"`; trocar por `none` faz a arte sumir (a mask lê o canal alfa). Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: `hatch-left/right.svg` carregam a cor literal; se `--border-strong` mudar, são os únicos assets a atualizar (`grep -rl D1D1D1 public/`). Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: testar a waitlist pela rota da LP, não com `curl` direto no `/exec`: o curl reenvia o POST sem `Content-Length` após o redirect do Google e leva 411. Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Verified: o Web app do Apps Script precisa de acesso "Qualquer pessoa"; senão o Google devolve a tela de login e a LP falha igual com token certo ou errado. Source: `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Inferred candidate: `AUDIT.md` diz que o repositório "is not under git"; isso está desatualizado (o repo tem git e remote `origin`). Source: `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## Useful code analogs

- Verified: `app/api/waitlist/route.ts` é o modelo de rota com destino principal obrigatório + destino secundário best-effort, ambos degradando para log quando falta a env var. Source: `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

Each entry should name its evidence and last review date. Transient research
belongs in the task that used it, not here.

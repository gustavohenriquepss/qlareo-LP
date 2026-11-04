# Decisions

## ADR-001 — Copy diverge do Figma sob o playbook Revenue-Centric Design

**Status:** accepted
**Date:** unresolved (documentado em `AUDIT.md`, reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
**Milestone:** none
**Amends:** none

Related rules: BR-001, BR-002, BR-004

### Context

O layout segue fielmente `Qlareo / Home` (Figma node `29:1042`), mas a copy original não respondia às objeções de clique. Source: `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Decision

Mudanças de copy e interação (rótulo do CTA, click trigger, camada de confiança, custo no problema, FAQ completa, escassez honesta, modal in-page), todas reversíveis só por `lib/content.ts`. Source: `AUDIT.md` §1–8 (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Consequences

Strings marcadas `RCD:` em `lib/content.ts` divergem do Figma de propósito; consultar `AUDIT.md` antes de "corrigir" para o Figma. Source: `lib/content.ts`, `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Reversal or migration

Reverter editando `lib/content.ts`; nenhum componente precisa mudar. Source: `AUDIT.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## ADR-002 — Cores, tipografia e logo vêm do produto, não do Figma

**Status:** accepted
**Date:** unresolved (documentado em `AUDIT.md` §9, reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
**Milestone:** none
**Amends:** nota "colour untouched" em `AUDIT.md` (superseded)

Related rules: none

### Context

A paleta do Figma tinha cinzas que falhavam WCAG AA e um CTA a 5.17:1; o design system de `qlareo/web` já resolvia isso, e a LP precisa parecer a mesma empresa que o app. Source: `AUDIT.md` §9, `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Decision

`app/globals.css` é cópia dos tokens do produto (mudanças só descem, nunca sobem); `--primary` pinta ações e `--brand` é identidade; o logo é SVG copiado de `Logo.tsx`; Inter é a única família. Source: `README.md`, `AUDIT.md` §9, `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Consequences

Não editar tokens nem o logo localmente. Divergência intencional: toda borda usa `--border-strong` (o produto usa `--border`). Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Reversal or migration

Re-copiar do produto quando ele mudar. Source: `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

## ADR-003 — Planilha Google como fonte da verdade dos leads

**Status:** accepted
**Date:** unresolved (introduzido no commit `7a9af31`, reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
**Milestone:** none
**Amends:** desenho "webhook genérico, só loga" descrito em `README.md`

Related rules: BR-003

### Context

A rota precisava persistir leads sem banco de dados. Source: `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Decision

Um Apps Script publicado como Web app grava cada lead numa aba `leads`, autenticado por token compartilhado; o Resend envia um aviso best-effort. Source: `app/api/waitlist/route.ts`, `scripts/README.md`, `scripts/waitlist-sheet.gs` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Consequences

O Apps Script responde 200 até em erro, então a rota decide pelo `ok` do corpo. Atualizar o script exige "Nova versão" na implantação existente, senão a URL muda. Source: `app/api/waitlist/route.ts`, `scripts/README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

### Reversal or migration

Sem `WAITLIST_WEBHOOK_URL` a rota volta a só logar. Source: `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

# Decisions

## ADR-001 — Arquivar a landing de relatórios em tag e branch, não em rota

**Status:** accepted
**Date:** 2026-11-04
**Milestone:** none
**Amends:** none

Related rules: none

### Context

A Qlareo trocou de produto (de SaaS de relatórios para rede de mídia em sacolas). O dono quer preservar a UI antiga sem publicá-la. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Decision

Tag anotada `legacy/relatorios-v1` e branch `archive/relatorios` no último commit da versão antiga; nada da versão antiga fica no `main`. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Consequences

Rota "secreta" não vaza nem é indexada, e o `main` fica sem código morto. Para reaproveitar algo: `git checkout legacy/relatorios-v1 -- <caminho>`. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Reversal or migration

Restaurar arquivos a partir da tag.

## ADR-002 — Uma página, dois perfis, perfil lido no servidor

**Status:** accepted
**Date:** 2026-11-04
**Milestone:** none
**Amends:** none

Related rules: BR-003, BR-004

### Context

Anunciante e restaurante precisam de copy e ordem de seções diferentes, e o dono manda links por perfil. Source: `components/landing.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Decision

`app/page.tsx` lê `?perfil=` no servidor e passa para `PerfilProvider`; a ordem por perfil fica em `components/landing.tsx`. A página deixa de ser estática (render dinâmico). Source: `app/page.tsx`, `components/perfil.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Consequences

O link do restaurante chega sem piscar o lado do anunciante. O canonical continua `/`, então `?perfil=` não duplica a página no Google. Source: `app/page.tsx`, `app/layout.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Reversal or migration

Para voltar a estático, ler o parâmetro no cliente (aceitando a troca visível após a hidratação).

## ADR-003 — Backend do produto fica no app, não na landing

**Status:** accepted
**Date:** 2026-11-04
**Milestone:** none
**Amends:** none

Related rules: none

### Context

O dono vai precisar do redirect `/r/:slug` com contagem de leituras e de um painel por anunciante. Source: `README.md`, `AGENTS.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Decision

Os dois ficam em `app.qlareo.com` (repositório `gustavohenriquepss/qlareo`). Este repositório não tem rotas de API. Source: `README.md`, `AGENTS.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Consequences

A landing não guarda dados nem segredos; não há variáveis de ambiente. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

### Reversal or migration

Nenhuma.

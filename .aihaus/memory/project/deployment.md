# Deployment

## Environments

- Verified: produção na Vercel em `https://qlareo.com`, publicada a partir do `main` pela integração Git; cada branch ganha preview. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Preconditions

- Verified: nenhuma variável de ambiente é necessária. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Release procedure

- Verified: merge no `main` dispara o deploy de produção. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Smoke checks

- Inferred candidate: abrir `/` (restaurante) e `/?perfil=anunciante`, conferir o H1 de cada perfil e o texto do link `wa.me`. Source: `components/hero.tsx`, `lib/site.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Rollback

- Inferred candidate: promover o deploy anterior na Vercel (Instant Rollback). Nenhum procedimento documentado.

## Approval policy

- Unresolved: nenhuma política de aprovação documentada.

Instructions are not containment. Name the external controls and credential
scope required for each environment.

# Knowledge

## Verified facts

- Verified: a conta da calculadora é feita em centavos inteiros (1500 × 0.6 em ponto flutuante não dá 900 exato); aceita "0,60", "0.60" e "1.234,56"; vazio ou inválido vira R$ 0,00. Source: `lib/calculator.ts`, `lib/calculator.test.mjs` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: `lib/calculator.ts` roda direto no Node pelos testes, então não pode usar alias `@/` nem sintaxe TS que exija compilação. Source: `lib/calculator.ts`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: o seletor de perfil fica fora do bloco que remonta na troca, para manter o foco do teclado; a animação só roda depois de uma troca. Source: `components/hero.tsx`, `components/landing.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: eventos `click_whatsapp`, `toggle_perfil` e `calculadora_usada` vão para o Vercel Web Analytics via `send()` em `lib/analytics.ts`; page views via `<Analytics />` em `app/layout.tsx`. Eventos personalizados exigem plano Pro/Enterprise na Vercel. Source: `lib/analytics.ts`, `app/layout.tsx` (working tree 2026-11-04, sobre 7ebb5f9).

## Recurring gotchas

- Verified: o hero usa `public/hero-qlareo.png` via `next/image` (`priority`, é o LCP); a imagem de compartilhamento lê `public/sacola-qlareo.png`. Trocar a imagem sem trocar o NOME do arquivo não aparece em dev: o otimizador do Next serve a versão em cache pelo caminho. Source: `components/hero.tsx`, `app/opengraph-image.tsx` (working tree 2026-11-04, sobre e60a70e).
- Verified: os ícones de mais/menos do FAQ são `public/figma/icon-plus.svg` e `icon-minus.svg`; não apagar junto com os outros assets do Figma. Source: `components/faq-section.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Useful code analogs

- Verified: `components/ui/segmented-toggle.tsx` é o modelo de controle de alternância (botões reais com `aria-pressed`, 40px por opção / 44px no toque, 48px no total). Botões usam 48/44/40px (`components/ui/button.tsx`), acima do `.control` de 36px do produto, de propósito. Source: `components/ui/segmented-toggle.tsx`, `components/ui/button.tsx` (working tree 2026-11-04, sobre e60a70e).
- Verified: listas em cartão usam cartões soltos (`grid gap-4`, cada item `rounded-2xl bg-surface`), sem divisórias; a página não usa coluna riscada nem linha entre seções. Source: `components/audience.tsx`, `components/highlights.tsx`, `components/ui/frame.tsx` (reviewed 2026-11-04, sobre b2ce499).

Each entry should name its evidence and last review date. Transient research
belongs in the task that used it, not here.

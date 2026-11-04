# Knowledge

## Verified facts

- Verified: a conta da calculadora é feita em centavos inteiros (1500 × 0.6 em ponto flutuante não dá 900 exato); aceita "0,60", "0.60" e "1.234,56"; vazio ou inválido vira R$ 0,00. Source: `lib/calculator.ts`, `lib/calculator.test.mjs` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: `lib/calculator.ts` roda direto no Node pelos testes, então não pode usar alias `@/` nem sintaxe TS que exija compilação. Source: `lib/calculator.ts`, `package.json` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: o seletor de perfil fica fora do bloco que remonta na troca, para manter o foco do teclado; a animação só roda depois de uma troca. Source: `components/hero.tsx`, `components/landing.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: eventos `click_whatsapp`, `toggle_perfil` e `calculadora_usada` já disparam; `send()` em `lib/analytics.ts` é o único ponto para ligar um provider. Source: `lib/analytics.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Recurring gotchas

- Verified: a ilustração da sacola é `role="img"`; texto novo dentro dela precisa usar `text-ink` sobre o kraft (`--ink-muted` reprova em contraste). Source: `components/bag-illustration.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: os ícones de mais/menos do FAQ são `public/figma/icon-plus.svg` e `icon-minus.svg`; não apagar junto com os outros assets do Figma. Source: `components/faq-section.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

## Useful code analogs

- Verified: `components/ui/segmented-toggle.tsx` é o modelo de controle de alternância (botões reais com `aria-pressed`, `.control` para alvo de toque). Source: `components/ui/segmented-toggle.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).
- Verified: listas em cartão usam o padrão `gap-px` + `bg-border-strong` para divisórias de 1px. Source: `components/audience.tsx`, `components/highlights.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

Each entry should name its evidence and last review date. Transient research
belongs in the task that used it, not here.

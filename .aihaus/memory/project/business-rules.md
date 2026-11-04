# Business rules

Markdown is authoritative; indexes only retrieve it.

## Accepted rules

### BR-001 — Sem números inventados

- **status:** accepted
- **domain:** marketing
- **statement:** A página não mostra estatística de recall, alcance ou conversão. Preço aparece como `[SEU PREÇO]` até o dono definir.
- **source**: `AGENTS.md`, `lib/content.ts` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a)
- **rationale:** produto em piloto; número sem fonte custa confiança.
- **last-reviewed:** 615cf5230cb0b6af4070831432c035383d6c3d5a
- **links:** implements: [`lib/content.ts`], relates: [], decided-by: [owner, 2026-11-04]

- Given o dono ainda não definiu o preço When a seção de formatos é renderizada Then o investimento aparece como "[SEU PREÇO] por mês"

### BR-002 — Restaurante não divide sacola com concorrente

- **status:** accepted
- **domain:** rede / anunciantes
- **statement:** Comida, bebida e app de delivery não anunciam na rede, e o restaurante vê cada arte antes.
- **source**: `lib/content.ts` (audience.note, gains, faq) (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a)
- **rationale:** proteger os restaurantes parceiros.
- **last-reviewed:** 615cf5230cb0b6af4070831432c035383d6c3d5a
- **links:** implements: [`lib/content.ts`], relates: [], decided-by: [owner, 2026-11-04]

- Given um anunciante de comida, bebida ou app de delivery When ele pede para entrar na rede Then a vaga não é oferecida

### BR-003 — Todo CTA vai para o WhatsApp com a mensagem do perfil

- **status:** accepted
- **domain:** conversão
- **statement:** Todo botão de contato usa `WHATSAPP_NUMBER` e a mensagem do perfil ativo, montados só por `whatsappHref()`.
- **source**: `lib/site.ts`, `components/whatsapp-button.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a)
- **rationale:** um único número e uma mensagem que já diz quem está chamando.
- **last-reviewed:** 615cf5230cb0b6af4070831432c035383d6c3d5a
- **links:** implements: [`lib/site.ts`], relates: [BR-004], decided-by: [owner, 2026-11-04]

- Given o perfil restaurante está ativo When o visitante clica em qualquer CTA Then o WhatsApp abre com "Oi! Tenho um restaurante e quero receber as sacolas da Qlareo."

### BR-004 — Perfil pela URL

- **status:** accepted
- **domain:** conversão
- **statement:** `?perfil=restaurante` abre a página do lado do restaurante; trocar no seletor atualiza a query sem recarregar, e o anunciante (padrão) não aparece na URL.
- **source**: `components/perfil.tsx`, `lib/site.ts`, `app/page.tsx` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a)
- **rationale:** o dono manda o link certo para cada restaurante.
- **last-reviewed:** 615cf5230cb0b6af4070831432c035383d6c3d5a
- **links:** implements: [`components/perfil.tsx`], relates: [BR-003], decided-by: [owner, 2026-11-04]

- Given o link `qlareo.com/?perfil=restaurante` When a página carrega Then o H1 é "Ganhe sacolas de delivery. Todo mês."

## Conflicts and gaps

- Unresolved: preço dos formatos, número real do WhatsApp, Instagram e arte final de OG são placeholders. Source: `README.md` (reviewed 615cf5230cb0b6af4070831432c035383d6c3d5a).

# Business rules

Markdown is authoritative; indexes only retrieve it.

## Accepted rules

### BR-001 — Sem números inventados

- **status:** accepted
- **domain:** marketing
- **statement:** A página não mostra estatística de recall, alcance ou conversão. Preço definido pelo dono em 2026-11-05 (`lib/pricing.ts`, substitui os anteriores): o anunciante compra a exclusividade da sacola (uma marca por sacola, arte num lado; o outro lado ainda indefinido e fora da página), R$ 2,00 por sacola em qualquer quantidade, mínimo de 1.000 sacolas/mês. Sem planos Impacto/Alcance nem faixas. Só muda quando o dono pedir.
- **source**: `AGENTS.md`, `lib/pricing.ts`, `lib/content.ts` (working tree 2026-11-05, sobre 657f943)
- **rationale:** produto em piloto; número sem fonte custa confiança.
- **last-reviewed:** 657f943389f58e793b29c0f56e9451cb85493ee7
- **links:** implements: [`lib/pricing.ts`, `lib/content.ts`], relates: [], decided-by: [owner, 2026-11-04; owner, 2026-11-05]

- Given a seção de formatos com 1.000 sacolas When a página carrega Then mostra R$ 2,00 por sacola e R$ 2.000 por mês
- Given 999 sacolas digitadas When a seção recalcula Then nenhum total aparece e a página avisa o mínimo de 1.000

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
- **statement:** o anunciante é o perfil padrão (é quem gera o faturamento; restaurante é secundário, decisão do dono em 2026-11-05). `?perfil=restaurante` abre a página do lado do restaurante; `?perfil=anunciante` segue aceito. Trocar no seletor atualiza a query sem recarregar, e o perfil padrão não aparece na URL.
- **source**: `components/perfil.tsx`, `lib/site.ts`, `app/page.tsx` (working tree 2026-11-04, sobre 667e800)
- **rationale:** o dono manda o link certo para cada público; o público principal é o anunciante.
- **last-reviewed:** 667e800acca67ada4c6360bafe163c7875e521ca
- **links:** implements: [`components/perfil.tsx`], relates: [BR-003], decided-by: [owner, 2026-11-04]

- Given o link `qlareo.com/` When a página carrega Then o H1 é "Ganhe sacolas de delivery. Todo mês."
- Given o link `qlareo.com/?perfil=anunciante` When a página carrega Then o H1 é "Entre na casa do seu cliente."

## Conflicts and gaps

- Resolved 2026-11-05: preço, WhatsApp e Instagram já são os definitivos (`README.md`).

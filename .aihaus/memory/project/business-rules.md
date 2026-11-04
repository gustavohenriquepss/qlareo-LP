# Business rules

Markdown is authoritative; indexes only retrieve it.

## Accepted rules

### BR-001 — Escassez só enquanto for verdadeira

- **status:** accepted
- **domain:** marketing / conversão
- **statement:** O badge de vagas e a linha de click trigger são derivados de `spots` em `lib/content.ts`; com `total: 0` ambos somem, e `remaining` deve refletir o número exato de vagas.
- **source**: `README.md` ("The free-spots counter"), `AUDIT.md` §6, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
- **rationale:** escassez só converte enquanto é real; uma afirmação que deixou de ser honrada destrói confiança.
- **last-reviewed:** 24378261073c8f52c9f30537a2ee610f5cba4230
- **links:** implements: [`lib/content.ts`], relates: [BR-002], decided-by: [`AUDIT.md` §6]

- Given o limite de vagas deixou de ser honrado When `spots.total` vira 0 Then badge e click trigger não aparecem na página

### BR-002 — Sem prova social fabricada

- **status:** accepted
- **domain:** marketing / confiança
- **statement:** `testimonials` em `lib/content.ts` fica vazio até existir cliente real; nada de depoimentos ou logos placeholder.
- **source**: `AUDIT.md` §3, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
- **rationale:** produto pré-lançamento; depoimento genérico custa mais confiança do que não mostrar nada.
- **last-reviewed:** 24378261073c8f52c9f30537a2ee610f5cba4230
- **links:** implements: [`lib/content.ts`], relates: [BR-001], decided-by: [`AUDIT.md` §3]

- Given não há cliente real com resultado When a página é renderizada Then nenhum depoimento ou logo de cliente aparece

### BR-003 — Lead nunca se perde em silêncio

- **status:** accepted
- **domain:** waitlist
- **statement:** Se a planilha (`WAITLIST_WEBHOOK_URL`) falha ou recusa, a rota responde 502 com mensagem de retry e loga o lead inteiro; o e-mail de aviso (Resend) é best-effort e nunca vira erro para o visitante.
- **source**: `app/api/waitlist/route.ts`, `README.md` ("Collecting leads") (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
- **rationale:** lead perdido em silêncio é clique pago no lixo.
- **last-reviewed:** 24378261073c8f52c9f30537a2ee610f5cba4230
- **links:** implements: [`app/api/waitlist/route.ts`], relates: [BR-004], decided-by: []

- Given a planilha está inacessível When um visitante envia o formulário Then ele vê "Não conseguimos registrar agora. Tente de novo em instantes." e o lead fica no log de erro
- Given a planilha gravou mas o Resend falhou When o visitante envia Then ele recebe sucesso e a falha só aparece no log

### BR-004 — Cada lead registra o CTA de origem

- **status:** accepted
- **domain:** waitlist / medição
- **statement:** Toda submissão carrega `source` com o CTA que abriu o modal (`header`, `hero`, `turn-card`, `final`).
- **source**: `AUDIT.md` §7, `README.md`, `components/waitlist.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230)
- **rationale:** é o único sinal de conversão por posição na página.
- **last-reviewed:** 24378261073c8f52c9f30537a2ee610f5cba4230
- **links:** implements: [`components/waitlist.tsx`, `app/api/waitlist/route.ts`], relates: [BR-003], decided-by: [`AUDIT.md` §7]

- Given o visitante clica no CTA do hero When envia o formulário Then a linha na planilha tem `source = hero`

## Conflicts and gaps

- Unresolved (conflito de documentação): `README.md` ("Collecting leads") e `AUDIT.md` §7 descrevem um modal de **dois campos** (e-mail + conta VTEX) com payload `{email, account, source, receivedAt}` e só `WAITLIST_WEBHOOK_URL`. O código atual e `scripts/README.md` usam **três campos** (`name`, `email`, `company`) e exigem também `WAITLIST_WEBHOOK_TOKEN`. O código é o comportamento verificado; os dois docs parecem desatualizados. O dono deve confirmar e atualizar os docs. Source: `README.md`, `AUDIT.md`, `scripts/README.md`, `app/api/waitlist/route.ts`, `components/waitlist.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).
- Unresolved: `AUDIT.md` §1 cita o rótulo "Garantir minha vaga gratuita"; `lib/content.ts` usa "Garantir vaga gratuita". Source: `AUDIT.md`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230).

# Glossary

| Term | Meaning | Source or owner |
|---|---|---|
| Qlareo | Produto de relatórios de vendas para lojas VTEX; esta LP é a porta de entrada dele. | `README.md`, `app/layout.tsx` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| VTEX | Plataforma de e-commerce dos lojistas-alvo; o Qlareo usa a API oficial com acesso só-leitura. | `AUDIT.md` §3, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| RCD | Revenue-Centric Design: playbook que justifica as divergências de copy em relação ao Figma, marcadas `RCD:` no código. | `AUDIT.md`, `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| click trigger | Linha sob o CTA que quebra objeções (preço, compromisso, esforço). | `AUDIT.md` §2 (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| spots | Contador de vagas gratuitas (`total`, `remaining`) que alimenta o badge e o click trigger. | `lib/content.ts`, `README.md` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| source | Identificador do CTA que abriu o modal da waitlist (`header`, `hero`, `turn-card`, `final`). | `README.md`, `AUDIT.md` §7 (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| waitlist | Lista de espera do acesso antecipado; cada lead vira uma linha na aba `leads` da planilha. | `scripts/README.md`, `app/api/waitlist/route.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |
| A Virada | Seção `#virada` da página (componente `turn-section`). | `lib/content.ts` (reviewed 24378261073c8f52c9f30537a2ee610f5cba4230) |

# RCD audit — what diverges from the Figma, and why

The build is faithful to `Qlareo / Home` (node `29:1042`) in layout, type, colour and
assets. The changes below are **copy and interaction** changes made under the
[Revenue-Centric Design](https://x.com/richardrx) playbook. Every one is reversible from
`lib/content.ts` alone — no component edits needed.

---

## 1. CTA label — "Solicitar Acesso" → "Garantir minha vaga gratuita"

**Principle.** _Write the CTA microcopy, not the button color._ The label is the last thing
read before deciding, so it has to reduce the effort of simulating what happens next. The
brain asks three questions: what happens when I click, how long it takes, what it costs.

"Solicitar Acesso" answers **none** of them. "Garantir minha vaga gratuita" answers what
and what-it-costs; the click trigger below it answers the rest.

The header uses a compact "Garantir vaga" so the nav bar keeps its proportions.

## 2. Click trigger under every primary CTA

**Principle.** _The click trigger breaks the objection standing between the visitor and
the click._

The Figma has a single grey line, "Grátis para as 10 primeiras lojas". Replaced with three:

> Grátis para as 10 primeiras lojas · Sem cartão de crédito · Conecta em minutos

Price, commitment, and effort — the three objections a pre-launch B2B tool actually faces.
Repeated under the final CTA, where the decision is usually made.

## 3. A trust layer above the fold

**Principle.** _Fix contrast, layout and trust before rewriting copy_ — trust is built from
four reinforcing layers, one of which is a mechanism logically coherent with the promise.

The Figma has **zero** trust elements anywhere on the page. Qlareo is pre-launch, so
fabricating testimonials or customer logos was not an option — and unanimous praise reads
as fake anyway (_purchase probability peaks at 4.2–4.5 stars, not 5_ — Northwestern).

Added instead: three verifiable statements about the mechanism, directly under the hero
screenshot — official VTEX API, read-only access, revoke at any time. These are the trust
claims a pre-revenue product can actually earn.

> **Next action for you:** `lib/content.ts` exports an intentionally empty `testimonials`
> array. The moment you have a real customer, a case study with a quantified result
> converts hardest, then a video testimonial, then logos. Do not fill it with placeholder
> quotes — generic five-star cards cost more trust than showing nothing.

## 4. The problem section names its cost

**Principle.** For a **problem-aware** visitor (Schwartz), the angle is _cost & urgency_ —
"if you have X, you're losing Y" — not a description of the situation.

The five-step chain (VTEX Admin → Excel → Filtros → Fórmulas → Planilha) shows the shape
of the problem but never prices it. Added one line under the chain:

> Cinco passos, toda semana, só para responder "como foi meu mês?"

No invented statistic — just the recurrence made explicit.

## 5. Every FAQ answer written

The Figma carries six questions and **one** answer. An FAQ block is objection-handling; a
question with no answer leaves the objection standing. The five missing answers are in
`lib/content.ts` and cover the real blockers: data scope, security, BI replacement, agency
access, multi-store.

They also emit `FAQPage` structured data, so the questions you already wrote earn search
real estate for free.

## 6. Scarcity that stays honest

**Principle.** _Compress the decision window_ — real scarcity works because loss aversion
makes "1 left" register as "I'll lose this". The word doing the work there is **real**.

The badge and click trigger are both driven by a single `spots` object:

```ts
export const spots = { total: 10, remaining: 10 };
```

Set `total: 0` and the badge and the trigger line **disappear** rather than making a claim
you have stopped honouring. Keep `remaining` accurate; if you update it, use the precise
number, not a rounded one (_"47%" is judged ~10% more accurate than "50%"_ — Schindler &
Yalch, 2006).

## 7. Two-field modal instead of an unwired button

**Principle.** _Cut cognitive load_ — removing a single checkout field has lifted
conversion 10%. And _no clicks out_: every clickable element leading off-page is lost
conversion.

The CTA opens an in-page modal asking for e-mail and VTEX account name — nothing else.
No redirect to a form service, so nothing leaks out of the page and every drop-off is
measurable. Each submission records which CTA opened it (`source: "hero" | "header" |
"turn-card" | "final"`), so you can see which position actually converts.

The success state reinforces the decision just made (choice-supportive bias) and states
the next step concretely.

## 8. Typo fix

"O QLAREO te dá a clareza que você precisa **par** encontrá-las" → **para**.

---

## Not changed, and why

- **The H1.** "Seus dados de Vendas, finalmente claros" leads with the visitor's state,
  not the product category — it already passes the 5-second test. Left alone.
- **The hero subhead.** Already specific (what you sold, which products, who repurchased,
  whether the promo was profitable). Specificity is the whole job here; nothing to add.
- **Layout, type scale, spacing.** Untouched. The icons, screenshots and decorative
  vectors are still the exported Figma assets, in `public/figma/`.

---

## 9. Colour and the logo now come from the product, not the Figma

This supersedes the old "colour untouched" note above.

**Principle.** _Trust is built from reinforcing layers_ — and the loudest trust signal a
pre-launch tool has is that the page and the product look like the same company. A
visitor who clicks the CTA lands in `qlareo/web`; a palette that shifts on the way in
reads as two different vendors.

The Figma palette also had three near-identical greys for one role, two of which failed
WCAG AA as body copy (`#757575` at 4.26:1, `#71717a` at 4.47:1), and a placeholder at
**1.53:1**. The product's design system had already solved exactly this, with the audit
written into the file. Copying it was cheaper and better than re-deriving it.

| Was (Figma) | Now (product) | |
| --- | --- | --- |
| `#f6f6f6` page | `--background #f8fafc` | |
| `#181818` text | `--ink #0f172a` | 17.06:1 |
| 3 greys | `--ink-muted #58687d` | 5.19–5.69:1 on all three surfaces |
| `#d1d1d1` rules | `--border #e2e8f0` / `--border-strong #cbd5e1` | |
| `#02143c` card | `--ink #0f172a` | |
| CTA `#2563eb` | `--primary #1e40af` | **5.17 → 8.72:1** |

The CTA change is the substantive one: the product distinguishes `--brand` (identity)
from `--primary` (action), and adopting that distinction lifted the button past the 7:1
bar a primary CTA should clear, without inventing a colour.

**The logo stopped being live text.** It was rendering "Qlareo" in Geist; the product
ships a vectorised wordmark specifically so the brand does not depend on a font having
loaded. `components/ui/logo.tsx` is now a copy of the product's component, and Geist is
gone — it was an entire family downloaded for six letters.

> **Next action for you:** `public/figma/logo-mark.svg` and `footer-logo-mark.svg` are
> now unreferenced. Left in place rather than deleted, since this repo is not under git.

## Still open

- **No mobile nav menu.** Below `lg` the section links are hidden and only the CTA remains.
  For a single-scroll landing page that is a defensible trade (fewer competing targets),
  but if you want jump links on mobile, that is a deliberate addition, not an oversight.
- **The hero screenshot is illegible on small phones.** Inherent to a dashboard image at
  342px. It works as a credibility cue, not as something to read. A mobile-specific crop
  showing just the KPI row would read better if you want to invest there.
- **No analytics.** Nothing is instrumented. The `source` field on each waitlist
  submission is the only conversion signal wired up today.

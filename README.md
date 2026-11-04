# Qlareo — Landing Page

Landing page for Qlareo, built from the Figma file
[`Qlareo / Home`](https://www.figma.com/design/BszHtpgTZb1mAcyIiCvTP2/Qlareo?node-id=29-1042).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · pt-BR.

## Arquivo

A landing anterior (do SaaS de relatórios de vendas para lojas VTEX, com a waitlist
em planilha) está preservada fora do `main`. Ela não fica publicada como rota do site.

| Onde | O que é |
| --- | --- |
| tag `legacy/relatorios-v1` | Snapshot imutável do último estado (commit `2437826`). |
| branch `archive/relatorios` | Mesmo commit, para abrir preview na Vercel ou continuar dali. |

Para recuperar:

```bash
git checkout legacy/relatorios-v1          # só olhar (HEAD destacado)
git switch -c minha-branch legacy/relatorios-v1   # trabalhar a partir dele
git checkout legacy/relatorios-v1 -- components/preview   # trazer um arquivo/pasta para o main
```

**Preview:** o projeto é implantado pela integração Git da Vercel, que gera um preview para
cada branch enviada ao GitHub. O da `archive/relatorios` fica em Vercel › projeto ›
**Deployments**, filtrando pela branch. A URL estável da branch segue o padrão
`<projeto>-git-archive-relatorios-<time>.vercel.app`. Se o projeto tiver Deployment
Protection ligada, o preview pede login na Vercel.

O produto de relatórios em si (painel, adapters VTEX, banco) vive em outro repositório,
`gustavohenriquepss/qlareo`, e não foi alterado aqui.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
```

## Where things live

| Path                    | What                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `lib/content.ts`        | **Every user-facing string.** Change copy here, not in components. |
| `app/globals.css`       | Design tokens — **copied from the product**, see below.            |
| `components/`           | One file per page section, in page order.                          |
| `components/waitlist.tsx` | CTA modal + the context every CTA on the page hangs off.         |
| `app/api/waitlist/`     | Lead intake endpoint.                                              |
| `public/figma/`         | The 23 assets exported from Figma (SVG + PNG).                     |
| `AUDIT.md`              | Where the copy diverges from the Figma, and the reasoning.          |

## Design system

The tokens in `app/globals.css` are a **copy of `qlareo/web/app/globals.css`**, the
product's design system. This page is the front door to the app: someone who clicks the
CTA and lands inside must not feel they changed brand.

**Do not edit a token value here.** The source of truth is the product — changes flow
down, never up. The one thing that legitimately lives only in this file is a token with
no meaning in a dashboard; those are isolated in the `Extensões da landing` block at the
end (`--spacing-frame`, `--on-ink`) and none of them redefines a product token.

Two conventions come with it and are worth knowing before you add UI:

- **`--primary` paints actions, `--brand` is identity.** The CTA is `bg-primary`
  (`#1e40af`), not `bg-brand`. The brand blue is for the logo mark and accents.
- **`.control` sizes anything clickable**: 36px for a fine pointer, 44px when the
  pointer is coarse. The 44×44 rule exists for the finger, so it applies to the finger.

One thing **diverges from the product on purpose**: every border on this page is
`--border-strong`, where the product defaults to the lighter `--border`. A dense
dashboard stacks a lot of rules and needs the hairline; here the line is a compositional
element — the Figma draws the whole page inside a ruled column, which disappears against
`#f8fafc` at the subtle weight. The default is set once in `globals.css`, so a border
with no colour class still comes out right.

### Line artwork

Every Figma asset shipped with the old border grey (`#D1D1D1`) written inside the file,
so the artwork silently fell out of step the moment the page's lines changed colour. All
of it is now aligned, by one of two mechanisms:

- **Single-colour artwork is painted with a CSS mask**, not served as an image — the five
  step icons in the problem section and both `deco-lines`. The shape comes from the file,
  the colour comes from `--border-strong`, so the two cannot diverge again. Those files
  declare `stroke`/`fill="currentColor"`: they no longer decide a colour.
  **Do not "clean up" that attribute to `none`** — a mask reads the *alpha* channel, and
  an undrawn path has zero alpha, so the artwork would vanish entirely.
- **`hatch-left/right.svg` carry the value literally**, because they are genuinely
  multi-colour (hatching, an edge rule, and clip/mask internals) and a mask would flatten
  them. Their panel background used to be a hard `#F6F6F6` — the *old* page colour, a
  visible seam against `#f8fafc` — and is now transparent, so the page shows through and
  it cannot drift again either.

If `--border-strong` ever changes, those two hatch files are the only assets to update:
`grep -rl D1D1D1 public/`.

`components/ui/logo.tsx` is likewise a verbatim copy of the product's `Logo.tsx`. Keep
them identical; re-copy rather than edit.

## Collecting leads

Out of the box, `POST /api/waitlist` validates the submission and **logs it to the server
console**. Nothing is persisted.

To send leads somewhere real, set one environment variable:

```bash
WAITLIST_WEBHOOK_URL=https://...
```

The route then forwards this JSON to that URL:

```json
{
  "email": "voce@sualoja.com.br",
  "account": "sualoja",
  "source": "hero",
  "receivedAt": "2026-07-30T21:01:06.724Z"
}
```

Any endpoint that accepts a JSON POST works — a Zapier/Make hook, a Google Apps Script
bound to a Sheet, a Supabase edge function, or your own handler. `source` tells you which
CTA converted (`header`, `hero`, `turn-card`, `final`).

If the webhook is unreachable or rejects, the lead is written to the error log so it stays
recoverable, and the visitor sees a retry message rather than a silent success.

## The free-spots counter

`lib/content.ts` exports:

```ts
export const spots = { total: 10, remaining: 10 };
```

This drives the hero badge and the click-trigger line under every CTA. Scarcity only works
while it is true — set `total: 0` and both disappear rather than making a claim you have
stopped honouring.

## Deploy

```bash
npx vercel
```

Set `WAITLIST_WEBHOOK_URL` in the project's environment variables before the production
deploy, or leads will only reach the runtime logs.

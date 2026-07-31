import { NextResponse } from "next/server";

/**
 * Waitlist intake.
 *
 * Dois destinos, com pesos diferentes:
 *
 * 1. A planilha (`WAITLIST_WEBHOOK_URL`, um Apps Script — ver scripts/) é a
 *    fonte da verdade. Se ela falhar, devolvemos erro e o visitante tenta de
 *    novo: um lead perdido em silêncio é clique pago no lixo.
 * 2. O e-mail de aviso (Resend) é best-effort. O lead já está salvo quando ele
 *    dispara, então uma falha aqui vira log, nunca erro pro visitante.
 *
 * Sem env var configurada, cada destino apenas loga — a página funciona em dev
 * sem nenhum setup.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  source?: unknown;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : "unknown";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }
  if (company.length < 2 || company.length > 100) {
    return NextResponse.json(
      { error: "Informe o nome da sua empresa." },
      { status: 400 },
    );
  }

  const lead = { name, email, company, source, receivedAt: new Date().toISOString() };

  const stored = await store(lead);
  if (!stored) {
    return NextResponse.json(
      { error: "Não conseguimos registrar agora. Tente de novo em instantes." },
      { status: 502 },
    );
  }

  await notify(lead);

  return NextResponse.json({ ok: true });
}

type Lead = {
  name: string;
  email: string;
  company: string;
  source: string;
  receivedAt: string;
};

/**
 * Grava na planilha. O Apps Script responde 200 mesmo quando recusa, então
 * quem manda é o `ok` do corpo — não o status.
 */
async function store(lead: Lead): Promise<boolean> {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhook) {
    console.info("[waitlist] WAITLIST_WEBHOOK_URL ausente — lead só logado", lead);
    return true;
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, token: process.env.WAITLIST_WEBHOOK_TOKEN }),
    });

    const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

    if (!response.ok || !result?.ok) {
      // Loga o lead inteiro: dá pra recuperar do log mesmo com a planilha fora.
      console.error("[waitlist] planilha recusou", response.status, result, lead);
      return false;
    }

    return true;
  } catch (cause) {
    console.error("[waitlist] planilha inacessível", cause, lead);
    return false;
  }
}

/** Avisa por e-mail. Best-effort: o lead já está salvo quando isto roda. */
async function notify(lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_TO;

  if (!key || !to) {
    console.info("[waitlist] aviso por e-mail desligado", { lead: lead.email });
    return;
  }

  const rows = [
    ["Nome", lead.name],
    ["E-mail", lead.email],
    ["Empresa", lead.company],
    ["Origem", lead.source],
  ]
    .map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`)
    .join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.WAITLIST_NOTIFY_FROM ?? "Qlareo <onboarding@resend.dev>",
        to: [to],
        reply_to: lead.email,
        subject: `Waitlist: ${lead.name} — ${lead.company}`,
        html: `<h2>Novo lead na waitlist</h2><table>${rows}</table>`,
      }),
    });

    if (!response.ok) {
      console.error("[waitlist] Resend recusou", response.status, await response.text());
    }
  } catch (cause) {
    console.error("[waitlist] Resend inacessível", cause);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

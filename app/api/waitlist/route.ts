import { NextResponse } from "next/server";

/**
 * Waitlist intake.
 *
 * Validates and logs by default so the page is usable out of the box. Set
 * `WAITLIST_WEBHOOK_URL` to forward submissions to wherever you actually keep
 * them (Resend, a Google Apps Script, Supabase, Zapier, …) — no other change
 * needed. Keep the failure path loud: a silently dropped lead is a paid click
 * thrown away.
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
  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhook) {
    console.info("[waitlist] no WAITLIST_WEBHOOK_URL set — lead logged only", lead);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const forward = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!forward.ok) {
      // Log the lead so it is recoverable from the logs even when the sink is down.
      console.error("[waitlist] webhook rejected", forward.status, lead);
      return NextResponse.json(
        { error: "Não conseguimos registrar agora. Tente de novo em instantes." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[waitlist] webhook unreachable", cause, lead);
    return NextResponse.json(
      { error: "Não conseguimos registrar agora. Tente de novo em instantes." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}

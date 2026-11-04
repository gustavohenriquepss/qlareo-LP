import { track as vercelTrack } from "@vercel/analytics";
import type { Formato, Perfil } from "@/lib/site";

/**
 * Eventos da página. Os componentes chamam `track()`; `send()` é o único lugar
 * que conhece o provider (hoje o Vercel Web Analytics).
 */

export type WhatsappPosicao = "header" | "hero" | "formatos" | "calculadora" | "cta_final";

type EventMap = {
  /** `formato` só vem dos botões da seção de formatos. */
  click_whatsapp: { perfil: Perfil; posicao: WhatsappPosicao; formato?: Formato };
  toggle_perfil: { perfil: Perfil };
  calculadora_usada: { perfil: Perfil };
};

export type AnalyticsEvent = keyof EventMap;

export function track<E extends AnalyticsEvent>(event: E, props: EventMap[E]): void {
  // Medição nunca pode quebrar um clique.
  try {
    send(event, props);
  } catch {}
}

/**
 * Ponto de integração do provider: Vercel Web Analytics. O `<Analytics />` em
 * `app/layout.tsx` conta as page views; aqui saem os eventos personalizados.
 * Em dev o pacote não envia nada, só registra no console.
 */
function send(event: string, props: EventMap[AnalyticsEvent]): void {
  vercelTrack(event, props);
}

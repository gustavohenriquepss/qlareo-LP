import type { Formato, Perfil } from "@/lib/site";

/**
 * Eventos da página. O projeto ainda não tem provider de analytics: `track()`
 * já é chamado nos pontos certos, e `send()` é o único lugar a mudar quando um
 * provider entrar (GA4, Plausible, PostHog…).
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

/** Ponto de integração do provider. Hoje só registra no console em dev. */
function send(event: string, props: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props);
  }
}

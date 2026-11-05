import { track as vercelTrack } from "@vercel/analytics";
import type { Formato, Perfil } from "@/lib/site";

/**
 * Eventos da página. Os componentes chamam `track()`; `send()` é o único lugar
 * que conhece o provider (hoje o Vercel Web Analytics).
 */

export type WhatsappPosicao = "header" | "hero" | "formatos" | "calculadora" | "cta_final";

type EventMap = {
  /** `formato` e `quantidade` (sacolas por mês) só vêm dos botões da seção de formatos. */
  click_whatsapp: {
    perfil: Perfil;
    posicao: WhatsappPosicao;
    formato?: Formato;
    quantidade?: number;
  };
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

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Ponto de integração dos providers. O `<Analytics />` e o `<Clarity />` em
 * `app/layout.tsx` contam as page views e as sessões; aqui saem os eventos.
 *
 * - Vercel Web Analytics recebe o evento com as propriedades. Em dev o pacote
 *   não envia nada, só registra no console.
 * - Clarity recebe só o nome (a API de eventos dele não aceita propriedades),
 *   o que basta para filtrar gravações e mapas de calor por "quem clicou no
 *   WhatsApp". Fora de produção o script não carrega e `window.clarity` não
 *   existe, então a chamada é pulada.
 */
function send(event: string, props: EventMap[AnalyticsEvent]): void {
  vercelTrack(event, props);
  window.clarity?.("event", event);
}

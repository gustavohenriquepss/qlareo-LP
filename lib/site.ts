/**
 * Constantes de contato e de perfil. Tudo que é PLACEHOLDER está aqui ou em
 * `PRICE_PLACEHOLDER` (lib/content.ts); troque antes de divulgar a página.
 */

/** Os dois públicos da página. "anunciante" é o padrão. */
export type Perfil = "anunciante" | "restaurante";

export const DEFAULT_PERFIL: Perfil = "anunciante";

/** `?perfil=restaurante` abre a página direto do lado do restaurante. */
export const PERFIL_PARAM = "perfil";

/** Aceita o valor cru da query string (string, lista ou nada). */
export function parsePerfil(value: string | string[] | null | undefined): Perfil {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "restaurante" ? "restaurante" : DEFAULT_PERFIL;
}

/** PLACEHOLDER: número do WhatsApp, só dígitos, com DDI e DDD. */
export const WHATSAPP_NUMBER = "5521000000000";

/** PLACEHOLDER: perfil do Instagram da Qlareo. */
export const INSTAGRAM_URL = "https://instagram.com/";

export const WHATSAPP_MESSAGES: Record<Perfil, string> = {
  anunciante: "Oi! Quero anunciar nas sacolas da Qlareo.",
  restaurante: "Oi! Tenho um restaurante e quero receber as sacolas da Qlareo.",
};

/** Único construtor de link de WhatsApp da página. */
export function whatsappHref(perfil: Perfil): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[perfil]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

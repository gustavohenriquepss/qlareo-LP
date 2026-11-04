/**
 * Constantes de contato e de perfil. O que ainda é PLACEHOLDER está marcado
 * aqui; troque antes de divulgar a página.
 */

/**
 * Os dois públicos da página. "restaurante" é o padrão: a prioridade agora é
 * montar a rede de restaurantes, antes de vender espaço nas sacolas.
 */
export type Perfil = "anunciante" | "restaurante";

export const DEFAULT_PERFIL: Perfil = "restaurante";

/**
 * `?perfil=anunciante` abre a página direto do lado do anunciante.
 * `?perfil=restaurante` continua valendo (links já enviados) e cai no padrão.
 */
export const PERFIL_PARAM = "perfil";

const PERFIS: readonly Perfil[] = ["anunciante", "restaurante"];

/** Aceita o valor cru da query string (string, lista ou nada). */
export function parsePerfil(value: string | string[] | null | undefined): Perfil {
  const raw = Array.isArray(value) ? value[0] : value;
  return PERFIS.find((p) => p === raw) ?? DEFAULT_PERFIL;
}

/** WhatsApp do Gustavo Padeiro (fundador), só dígitos, com DDI e DDD. */
export const WHATSAPP_NUMBER = "5521976173324";

/** PLACEHOLDER: perfil do Instagram da Qlareo. */
export const INSTAGRAM_URL = "https://instagram.com/";

export const WHATSAPP_MESSAGES: Record<Perfil, string> = {
  anunciante: "Oi! Quero anunciar nas sacolas da Qlareo.",
  restaurante: "Oi! Tenho um restaurante e quero receber as sacolas da Qlareo.",
};

/** Formatos que têm botão próprio na seção de formatos. */
export type Formato = "exclusiva" | "meia" | "rede";

/**
 * Mensagem de quem clica no botão de um formato. Chega no WhatsApp já dizendo
 * o que a pessoa quer, e a conversa começa um passo à frente.
 */
export const WHATSAPP_FORMAT_MESSAGES: Record<Formato, string> = {
  exclusiva: "Oi! Quero anunciar no plano Impacto da Qlareo.",
  meia: "Oi! Quero anunciar no plano Alcance da Qlareo.",
  rede: "Oi! Quero saber da exclusividade da minha categoria na rede Qlareo.",
};

/** Único construtor de link de WhatsApp da página. */
export function whatsappHref(perfil: Perfil, formato?: Formato): string {
  const message = formato ? WHATSAPP_FORMAT_MESSAGES[formato] : WHATSAPP_MESSAGES[perfil];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

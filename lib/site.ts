/** Constantes de contato e de perfil. */

import { formatQuantidade, type Lados } from "@/lib/pricing";

/**
 * Os dois públicos da página. "anunciante" é o padrão: é quem paga e traz o
 * faturamento. O restaurante é o público secundário.
 */
export type Perfil = "anunciante" | "restaurante";

export const DEFAULT_PERFIL: Perfil = "anunciante";

/**
 * `?perfil=restaurante` abre a página direto do lado do restaurante.
 * `?perfil=anunciante` continua valendo (links já enviados) e cai no padrão.
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

/** Perfil do Instagram da Qlareo. */
export const INSTAGRAM_URL = "https://instagram.com/qlareobr";

export const WHATSAPP_MESSAGES: Record<Perfil, string> = {
  anunciante: "Oi! Quero anunciar nas sacolas da Qlareo.",
  restaurante: "Oi! Tenho um restaurante e quero receber as sacolas da Qlareo.",
};

/** Formatos que têm botão próprio na seção de formatos. */
export type Formato = "exclusiva" | "rede";

/**
 * Mensagem de quem clica no botão de um formato. Chega no WhatsApp já dizendo
 * o que a pessoa quer, e a conversa começa um passo à frente. Sem ponto final:
 * `whatsappHref` fecha a frase, com a quantidade quando ela vem.
 */
export const WHATSAPP_FORMAT_MESSAGES: Record<Formato, string> = {
  exclusiva: "Oi! Quero anunciar nas sacolas da Qlareo",
  rede: "Oi! Quero saber da exclusividade da minha categoria na rede Qlareo",
};

/** Fim da mensagem do cartão da sacola, conforme a escolha de lados. */
const WHATSAPP_LADOS: Record<Lados, string> = {
  um_lado: "com a arte num lado",
  frente_e_verso: "com a arte frente e verso",
};

/**
 * Único construtor de link de WhatsApp da página. `quantidade` (sacolas por
 * mês) e `lados` só vêm dos cartões de formato, com o que foi escolhido no
 * seletor.
 */
export function whatsappHref(
  perfil: Perfil,
  formato?: Formato,
  quantidade?: number,
  lados?: Lados,
): string {
  const detalhes = [
    quantidade ? `com ${formatQuantidade(quantidade)} sacolas por mês` : null,
    lados ? WHATSAPP_LADOS[lados] : null,
  ].filter(Boolean);
  const message = formato
    ? `${WHATSAPP_FORMAT_MESSAGES[formato]}${detalhes.length ? `, ${detalhes.join(", ")}` : ""}.`
    : WHATSAPP_MESSAGES[perfil];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

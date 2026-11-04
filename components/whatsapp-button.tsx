"use client";

import { usePerfil } from "@/components/perfil";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { track, type WhatsappPosicao } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";

/**
 * Todo CTA da página. O número e a mensagem vêm de `lib/site.ts`, e a
 * mensagem segue o perfil ativo, então nenhum botão monta link próprio.
 */
export function WhatsAppButton({
  posicao,
  label,
  size = "md",
  className = "",
}: {
  posicao: WhatsappPosicao;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { perfil } = usePerfil();

  return (
    <ButtonLink
      href={whatsappHref(perfil)}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      className={className}
      onClick={() => track("click_whatsapp", { perfil, posicao })}
    >
      <WhatsAppIcon className="size-[18px]" />
      {label}
    </ButtonLink>
  );
}

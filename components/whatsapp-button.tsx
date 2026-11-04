"use client";

import { usePerfil } from "@/components/perfil";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { track, type WhatsappPosicao } from "@/lib/analytics";
import { type Formato, whatsappHref } from "@/lib/site";

/**
 * Todo CTA da página. O número e a mensagem vêm de `lib/site.ts`, e a
 * mensagem segue o perfil ativo (ou o formato, quando o botão é de um), então
 * nenhum botão monta link próprio.
 */
export function WhatsAppButton({
  posicao,
  label,
  formato,
  size = "md",
  variant = "primary",
  className = "",
}: {
  posicao: WhatsappPosicao;
  label: string;
  formato?: Formato;
  size?: "sm" | "md" | "lg";
  /** `secondary` só ao lado de um primário, para não competir com ele. */
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { perfil } = usePerfil();

  return (
    <ButtonLink
      href={whatsappHref(perfil, formato)}
      target="_blank"
      rel="noopener noreferrer"
      size={size}
      variant={variant}
      className={className}
      onClick={() =>
        track("click_whatsapp", formato ? { perfil, posicao, formato } : { perfil, posicao })
      }
    >
      <WhatsAppIcon className="size-[18px]" />
      {label}
    </ButtonLink>
  );
}

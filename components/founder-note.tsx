import Image from "next/image";
import { founder } from "@/lib/content";

/**
 * Linha sob o CTA: diz o que acontece no clique (abre o WhatsApp), com quem a
 * pessoa vai falar e que não há compromisso. Rosto e nome reais do fundador
 * são a prova de confiança que a página tem enquanto o piloto não tem cases.
 *
 * `tone="dark"` é para a superfície `bg-ink` (CTA final): o texto vira `on-ink`.
 */
export function FounderNote({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`flex items-center gap-3 text-left ${className}`}>
      <Image
        src="/gustavo-padeiro.jpg"
        alt={founder.photoAlt}
        width={44}
        height={44}
        className={`size-11 shrink-0 rounded-full object-cover ${dark ? "ring-2 ring-on-ink/20" : ""}`}
      />
      <p className="flex flex-col text-[14px] leading-[1.4]">
        <span className={`font-semibold ${dark ? "text-on-ink" : "text-ink"}`}>
          {founder.name} · {founder.role}
        </span>
        <span className={dark ? "text-on-ink/80" : "text-ink-muted"}>{founder.ctaNote}</span>
      </p>
    </div>
  );
}

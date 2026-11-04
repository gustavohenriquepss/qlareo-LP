"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { header } from "@/lib/content";

/**
 * No celular o menu fica compacto: só a logo e o WhatsApp. Os links de seção
 * entram a partir de `lg`. Numa página de rolagem única, três links a menos
 * no topo são três alvos a menos competindo com o único CTA.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-40 flex h-[83px] w-full items-center justify-center",
        "border-b border-border-strong bg-background/90 backdrop-blur-md",
        "transition-shadow duration-200",
        scrolled ? "shadow-[0_1px_12px_rgba(15,23,42,0.06)]" : "",
      ].join(" ")}
    >
      <div className="flex w-full max-w-frame items-center justify-between gap-3 px-4 sm:px-6 lg:px-0">
        {/* `decorative`: o link já se anuncia, o SVG repetiria o nome. */}
        <a href="#topo" className="control shrink-0 rounded-lg" aria-label={header.homeLabel}>
          <Logo className="h-7 w-auto text-ink sm:h-9" decorative />
        </a>

        <nav aria-label={header.navLabel} className="hidden items-center gap-6 lg:flex">
          {header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="control rounded-lg text-[14px] leading-5 text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton posicao="header" label={header.cta} size="sm" />
      </div>
    </header>
  );
}

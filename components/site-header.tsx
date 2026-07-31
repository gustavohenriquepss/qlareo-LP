"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { WaitlistButton } from "@/components/waitlist";
import { cta, nav } from "@/lib/content";

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
      <div className="flex w-full max-w-frame items-center justify-between px-6 lg:px-0">
        {/* `decorative`: o link já se anuncia, o SVG repetiria o nome. */}
        <a href="#top" className="control rounded-lg" aria-label="Qlareo — início">
          <Logo className="h-9 w-auto text-ink" decorative />
        </a>

        <nav aria-label="Seções da página" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="control rounded-lg text-[14px] leading-5 text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <WaitlistButton source="header" label={cta.compact} size="sm" />
      </div>
    </header>
  );
}

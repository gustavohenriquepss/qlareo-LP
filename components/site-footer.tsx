import { Logo } from "@/components/ui/logo";
import { footer, nav } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t border-border-strong bg-background px-6 py-[30px] lg:px-[120px]">
      <div className="flex w-full max-w-frame flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-6 py-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto text-ink" />
            <span aria-hidden className="h-[21px] w-px bg-border-strong" />
            <span className="text-[16px] leading-[1.35] text-ink-muted">
              {footer.tagline}
            </span>
          </div>

          <nav aria-label="Rodapé" className="flex flex-wrap items-center gap-6">
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
        </div>

        <div className="flex flex-col items-start justify-between gap-4 text-[16px] sm:flex-row sm:items-center">
          <p className="text-ink-muted">{footer.copyright}</p>
          <ul className="flex items-center gap-4">
            {footer.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="control rounded-lg text-ink transition-colors hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

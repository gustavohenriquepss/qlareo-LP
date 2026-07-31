import { Logo } from "@/components/ui/logo";
import { socialIcons } from "@/components/ui/social-icons";
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
          {/* `-mx-2` cancela a folga do alvo de toque nas pontas, para os ícones
              alinharem com a régua da coluna e não flutuarem 8px para dentro.
              `gap-2` mantém 8px entre alvos vizinhos — o dedo precisa disso para
              não acertar o link errado. */}
          <ul className="-mx-2 flex items-center gap-2">
            {footer.social.map((item) => {
              const Icon = socialIcons[item.icon];

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    /* O ícone é `aria-hidden`, então sem isto o link não teria
                       nome nenhum — um leitor de tela leria só "link". */
                    aria-label={item.label}
                    /* Dica no ponteiro: quem vê o desenho reconhece a rede, mas
                       o título confirma que é perfil pessoal, não conta da marca. */
                    title={item.label}
                    className="control-icon rounded-lg text-ink-muted transition-colors hover:text-brand"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

import { Logo } from "@/components/ui/logo";
import { socialIcons } from "@/components/ui/social-icons";
import { footer } from "@/lib/content";
import { INSTAGRAM_URL } from "@/lib/site";

export function SiteFooter() {
  const Instagram = socialIcons.instagram;

  return (
    <footer className="flex w-full justify-center border-t border-border-strong bg-background px-6 py-[30px] lg:px-0">
      <div className="flex w-full max-w-frame flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Logo className="h-8 w-auto text-ink" />
          <span aria-hidden className="h-[21px] w-px bg-border-strong" />
          <span className="text-[15px] leading-[1.35] text-ink-muted">{footer.location}</span>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[14px] text-ink-muted">{footer.copyright}</p>
          {/* `-mr-2` cancela a folga do alvo de toque para o ícone alinhar com a
              régua da coluna. O ícone é `aria-hidden`: o nome vem do link. */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={footer.instagramLabel}
            title={footer.instagramLabel}
            className="control-icon -mr-2 rounded-lg text-ink-muted transition-colors hover:text-brand"
          >
            <Instagram className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

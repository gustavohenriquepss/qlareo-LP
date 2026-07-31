import type { ReactNode } from "react";

/**
 * O Figma risca uma coluna de 1200px por toda a página, com 1px de cada lado;
 * cada seção é uma faixa full-bleed que hospeda essa coluna. `Section` é a
 * faixa, `Frame` é a coluna riscada dentro dela.
 *
 * Como toda linha da página, estas usam `--border-strong` — ver a nota sobre a
 * cor de borda padrão em `app/globals.css`.
 */
export function Section({
  id,
  children,
  className = "",
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "flex w-full scroll-mt-[83px] flex-col items-center bg-background",
        bordered ? "border-b border-border-strong" : "",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-frame border-x border-border-strong ${className}`}>
      {children}
    </div>
  );
}

/** The 60px inset used by every content column in the design. */
export const framePadding = "px-6 py-10 md:px-10 md:py-12 lg:p-[60px]";

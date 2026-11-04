import type { ReactNode } from "react";

/**
 * `Section` é a faixa full-bleed; `Frame` é a coluna de 1200px dentro dela.
 *
 * Sem linhas de propósito: o layout antigo riscava a coluna dos dois lados e
 * fechava cada seção com uma régua, o que deixava a página com cara de software
 * corporativo — e o público aqui é dono de restaurante e de comércio de bairro.
 * Quem separa seção agora é o respiro (o `framePadding`), e quem agrupa
 * conteúdo são cartões de fundo branco com canto de 16px (`rounded-2xl`).
 */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`flex w-full scroll-mt-[83px] flex-col items-center bg-background ${className}`}
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
  return <div className={`w-full max-w-frame ${className}`}>{children}</div>;
}

/** The 60px inset used by every content column in the design. */
export const framePadding = "px-6 py-10 md:px-10 md:py-12 lg:p-[60px]";

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

/**
 * Recuo de toda coluna de conteúdo. Lateral de 24/40/60px; vertical em escala
 * de 8 (64 → 80 → 96px). Como nenhuma linha separa uma seção da outra, o
 * respiro É o separador: entre o conteúdo de duas seções vizinhas sobram
 * 128/160/192px, o bastante para cada bloco ser lido como um assunto à parte.
 */
export const framePadding = "px-6 py-16 md:px-10 md:py-20 lg:px-[60px] lg:py-24";

/**
 * Pilha vertical de uma seção: título → conteúdo → nota. O vão (40/48px) é
 * menor que o da seção, para o título continuar preso ao que ele anuncia.
 */
export const sectionStack = "flex flex-col gap-10 lg:gap-12";

/** Grade de cartões: 16px no celular, 24px a partir do tablet. */
export const cardGrid = "grid gap-4 md:gap-6";

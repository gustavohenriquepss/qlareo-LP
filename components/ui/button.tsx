import type { ComponentProps } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary";

/*
  `size` escala PADDING e TIPO, nunca altura. A altura é uma só, a mesma do CTA
  do cabeçalho: `.control` do design system do produto — 36px para ponteiro
  fino, 44px quando o ponteiro é grosso. A régua de 44×44 existe para o dedo,
  então é no dedo que ela entra.

  Um CTA que muda de altura entre seções deixa de ser lido como o mesmo
  compromisso — é a mesma razão pela qual a cor não varia. O que ainda separa um
  CTA de herói de um do cabeçalho é a largura e o corpo do texto.
*/
const sizes: Record<Size, string> = {
  sm: "control px-3 text-[14px] leading-5",
  md: "control px-5 text-[15px] leading-5",
  lg: "control px-6 text-[16px] leading-6",
};

/*
  `primary` é a única ação de alto contraste da página. Toda instância tem a
  mesma cor e forma de propósito — uma ação primária que muda de aparência entre
  seções deixa de ser lida como o mesmo compromisso. Pinta com `--primary`, não
  com `--brand`: no design system do produto a marca é identidade e `--primary`
  é ação.

  `secondary` é a ação de apoio ao lado de um primário (ex.: "Ver formatos" no
  hero). Mesma forma e altura, sem cor: superfície e régua da página, para não
  competir com o primário.
*/
const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border-strong bg-surface text-ink hover:bg-surface-2",
};

export function buttonClasses({
  size = "md",
  variant = "primary",
  className = "",
}: {
  size?: Size;
  variant?: Variant;
  className?: string;
} = {}) {
  return [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-[background-color,transform,box-shadow] duration-150 active:translate-y-px",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0",
    "focus-visible:outline-offset-3",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");
}

export function Button({
  size,
  variant,
  className,
  ...props
}: ComponentProps<"button"> & { size?: Size; variant?: Variant }) {
  return <button {...props} className={buttonClasses({ size, variant, className })} />;
}

/** Mesma aparência do `Button`, para quando a ação é navegar (âncora, WhatsApp). */
export function ButtonLink({
  size,
  variant,
  className,
  ...props
}: ComponentProps<"a"> & { size?: Size; variant?: Variant }) {
  return <a {...props} className={buttonClasses({ size, variant, className })} />;
}

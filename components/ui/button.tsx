import type { ComponentProps } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary";

/*
  Altura por tamanho, em escala de 4: 40 / 44 / 48px.

  DIVERGE DO `.control` DO PRODUTO DE PROPÓSITO. Lá, 36px servem a um painel
  denso, usado com mouse. Aqui o botão é o CTA de uma página de venda, aberta
  sobretudo no celular: 44px é o mínimo de alvo de toque (Apple HIG), 48px o
  recomendado (Material) e a faixa usual de CTA principal em landing page.

  - `lg` (48px): toda ação principal de seção (hero, formatos, CTA final).
  - `md` (44px): ações dentro de conteúdo.
  - `sm` (40px → 44px no toque): o CTA do cabeçalho, que divide 83px de altura
    com a logo. No dedo ele sobe para 44px, o piso de alvo de toque.
*/
const sizes: Record<Size, string> = {
  sm: "min-h-10 pointer-coarse:min-h-11 px-4 text-[14px] leading-5",
  md: "min-h-11 px-5 text-[15px] leading-5",
  lg: "min-h-12 px-7 text-[16px] leading-6",
};

/*
  `primary` é a única ação de alto contraste da página. Toda instância tem a
  mesma cor e forma de propósito — uma ação primária que muda de aparência entre
  seções deixa de ser lida como o mesmo compromisso. Pinta com `--primary`, não
  com `--brand`: no design system do produto a marca é identidade e `--primary`
  é ação.

  `secondary` é a ação de apoio ao lado de um primário (ex.: "Ver formatos" no
  hero). Mesma forma e altura, sem cor: cartão branco com sombra leve, para não
  competir com o primário.
*/
const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "bg-surface text-ink shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:bg-surface-2",
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
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl font-semibold",
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

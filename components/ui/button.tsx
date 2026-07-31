import type { ComponentProps } from "react";

type Size = "sm" | "md" | "lg";

/*
  `size` escala PADDING e TIPO, nunca altura. A altura é uma só, a mesma do CTA
  do cabeçalho: `.control` do design system do produto — 36px para ponteiro
  fino, 44px quando o ponteiro é grosso. A régua de 44×44 existe para o dedo,
  então é no dedo que ela entra. (O Figma desenha o botão do header com 35px,
  abaixo do mínimo de alvo de toque; `.control` resolve isso sem inflar o
  desktop.)

  Um CTA que muda de altura entre seções deixa de ser lido como o mesmo
  compromisso — é a mesma razão pela qual a cor não varia. O que ainda separa um
  CTA de herói de um do cabeçalho é a largura e o corpo do texto.
*/
const sizes: Record<Size, string> = {
  sm: "control px-3 text-[14px] leading-5",
  md: "control px-5 text-[15px] leading-5",
  lg: "control px-6 text-[16px] leading-6",
};

/**
 * A única ação de alto contraste da página. Toda instância tem a mesma cor e
 * forma de propósito — uma ação primária que muda de aparência entre seções
 * deixa de ser lida como o mesmo compromisso.
 *
 * Pinta com `--primary`, não com `--brand`: no design system do produto a marca
 * é identidade e `--primary` é ação, e o botão que promete acesso aqui é a mesma
 * promessa que o botão de dentro do app.
 */
export function Button({
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { size?: Size }) {
  return (
    <button
      {...props}
      className={[
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg",
        "bg-primary font-semibold text-on-primary",
        "transition-[background-color,transform,box-shadow] duration-150",
        "hover:bg-primary-hover active:translate-y-px",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0",
        "focus-visible:outline-offset-3",
        sizes[size],
        className,
      ].join(" ")}
    />
  );
}

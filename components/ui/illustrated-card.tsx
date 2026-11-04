import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Cartão com ilustração 3D vazando pela borda de cima. As medidas andam juntas:
 *
 * - imagem de 120px (144px no desktop), subindo 40px (56px) acima do cartão;
 * - o cartão reserva o resto da imagem no `padding-top` (96px / 112px), para o
 *   título começar abaixo dela;
 * - a grade (`illustratedGrid`) tem vão vertical (56px / 80px) e margem de cima
 *   maiores que o vazamento, para a imagem nunca encostar no cartão de cima nem
 *   no subtítulo da seção.
 *
 * A imagem é decorativa (`alt=""`): o título do cartão já diz o que ela mostra.
 * Os arquivos são PNG 400×400 com fundo transparente e margem recortada.
 */
export const illustratedGrid = "mt-10 grid gap-x-4 gap-y-14 md:gap-x-6 lg:mt-14 lg:gap-y-20";

export function IllustratedCard({ image, children }: { image: string; children: ReactNode }) {
  return (
    <li className="group relative flex min-w-0 flex-col gap-3 rounded-2xl bg-surface px-6 pt-24 pb-6 lg:px-8 lg:pt-28 lg:pb-8">
      <Image
        src={image}
        alt=""
        width={400}
        height={400}
        sizes="(min-width: 1024px) 144px, 120px"
        className="pointer-events-none absolute -top-10 right-4 size-30 select-none object-contain transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:-rotate-3 lg:-top-14 lg:right-6 lg:size-36"
      />
      {children}
    </li>
  );
}

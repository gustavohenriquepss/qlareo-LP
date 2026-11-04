import { CheckMark } from "@/components/ui/check-mark";
import { Frame, Section } from "@/components/ui/frame";
import { highlights } from "@/lib/content";
import type { Perfil } from "@/lib/site";

/**
 * Faixa de quatro destaques logo abaixo do hero, em cartões soltos. Sem padding
 * vertical: o hero acima e a seção seguinte já trazem o respiro.
 */
export function Highlights({ perfil }: { perfil: Perfil }) {
  return (
    <Section>
      <Frame className="px-6 md:px-10 lg:px-[60px]">
        <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {highlights[perfil].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-surface px-5 py-5 text-[15px] leading-[1.35] font-medium text-ink"
            >
              <CheckMark />
              {item}
            </li>
          ))}
        </ul>
      </Frame>
    </Section>
  );
}

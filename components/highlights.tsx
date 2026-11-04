import { CheckMark } from "@/components/ui/check-mark";
import { Frame, Section } from "@/components/ui/frame";
import { highlights } from "@/lib/content";
import type { Perfil } from "@/lib/site";

/**
 * Faixa de quatro destaques logo abaixo do hero. As divisórias são o fundo da
 * lista aparecendo por um vão de 1px (`gap-px`): uma linha só em todo lugar,
 * sem bordas de vizinhos somando 2px.
 */
export function Highlights({ perfil }: { perfil: Perfil }) {
  return (
    <Section>
      <Frame>
        <ul className="grid gap-px bg-border-strong sm:grid-cols-2 lg:grid-cols-4">
          {highlights[perfil].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 bg-background px-6 py-5 text-[15px] leading-[1.35] font-medium text-ink"
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

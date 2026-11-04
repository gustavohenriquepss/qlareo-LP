import { Frame, Section, cardGrid, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { gains } from "@/lib/content";

/** "O que você ganha", do restaurante. Ocupa a âncora `#formatos`. */
export function Gains() {
  return (
    <Section id={gains.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={gains.heading} subhead={gains.subhead} />

        <ul className={`${cardGrid} lg:grid-cols-3`}>
          {gains.cards.map((card) => (
            <li key={card.title} className="flex min-w-0 flex-col gap-3 rounded-2xl bg-surface p-6 lg:p-8">
              <h3 className="text-[18px] font-semibold text-ink">{card.title}</h3>
              <p className="text-[15px] leading-[1.5] text-ink-muted">{card.body}</p>
            </li>
          ))}
        </ul>
      </Frame>
    </Section>
  );
}

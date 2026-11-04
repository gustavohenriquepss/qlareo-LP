import { Frame, Section, framePadding, sectionStack } from "@/components/ui/frame";
import { IllustratedCard, illustratedGrid } from "@/components/ui/illustrated-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { gains } from "@/lib/content";

/** "O que você ganha", do restaurante. Ocupa a âncora `#formatos`. */
export function Gains() {
  return (
    <Section id={gains.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={gains.heading} subhead={gains.subhead} />

        <ul className={`${illustratedGrid} lg:grid-cols-3`}>
          {gains.cards.map((card) => (
            <IllustratedCard key={card.title} image={card.image}>
              <h3 className="text-[18px] font-semibold text-ink">{card.title}</h3>
              <p className="text-[15px] leading-[1.5] text-ink-muted">{card.body}</p>
            </IllustratedCard>
          ))}
        </ul>
      </Frame>
    </Section>
  );
}

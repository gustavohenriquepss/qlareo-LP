import { Frame, Section, framePadding, sectionStack } from "@/components/ui/frame";
import { IllustratedCard, illustratedGrid } from "@/components/ui/illustrated-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { audience } from "@/lib/content";

export function Audience() {
  return (
    <Section id={audience.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={audience.heading} subhead={audience.subhead} />

        {/* A nota comenta a grade: fica colada nela, não no vão da seção. */}
        <div className="flex flex-col gap-6">
          <ul className={`${illustratedGrid} sm:grid-cols-2 lg:grid-cols-3`}>
            {audience.items.map((item) => (
              <IllustratedCard key={item.category} image={item.image}>
                <h3 className="text-[17px] font-semibold text-ink">{item.category}</h3>
                <p className="text-[15px] leading-[1.5] text-ink-muted">{item.offer}</p>
              </IllustratedCard>
            ))}
          </ul>

          <p className="text-[15px] leading-[1.5] text-ink-muted">{audience.note}</p>
        </div>
      </Frame>
    </Section>
  );
}

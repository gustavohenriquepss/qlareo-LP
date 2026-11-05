import { Frame, Section, cardGrid, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { deliverables } from "@/lib/content";

export function Deliverables() {
  return (
    <Section id={deliverables.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={deliverables.heading} subhead={deliverables.subhead} />

        <ul className={`${cardGrid} lg:grid-cols-3`}>
          {deliverables.items.map((item) => (
            <li
              key={item.title}
              className="flex min-w-0 flex-col gap-3 rounded-2xl bg-surface p-6 lg:p-8"
            >
              <h3 className="text-[18px] font-semibold text-ink">{item.title}</h3>
              <p className="text-[15px] leading-[1.5] text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Frame>
    </Section>
  );
}

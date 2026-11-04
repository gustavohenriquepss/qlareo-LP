import { Frame, Section, framePadding } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { audience } from "@/lib/content";

export function Audience() {
  return (
    <Section id={audience.id}>
      <Frame className={`flex flex-col gap-8 ${framePadding}`}>
        <SectionHeading heading={audience.heading} subhead={audience.subhead} />

        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border-strong bg-border-strong sm:grid-cols-2 lg:grid-cols-3">
          {audience.items.map((item) => (
            <li key={item.category} className="flex min-w-0 flex-col gap-2 bg-background p-6">
              <h3 className="text-[16px] font-semibold text-ink">{item.category}</h3>
              <p className="text-[15px] leading-[1.4] text-ink-muted">{item.offer}</p>
            </li>
          ))}
        </ul>

        <p className="text-[15px] leading-[1.4] text-ink-muted">{audience.note}</p>
      </Frame>
    </Section>
  );
}

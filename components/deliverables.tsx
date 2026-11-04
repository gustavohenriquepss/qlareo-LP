import { Frame, Section, framePadding } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { deliverables } from "@/lib/content";

export function Deliverables() {
  return (
    <Section id={deliverables.id}>
      <Frame className={`flex flex-col gap-8 ${framePadding}`}>
        <SectionHeading heading={deliverables.heading} />

        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border-strong bg-border-strong lg:grid-cols-3">
          {deliverables.items.map((item) => (
            <li key={item.title} className="flex min-w-0 flex-col gap-2 bg-background p-6 lg:p-8">
              <h3 className="text-[18px] font-semibold text-ink">{item.title}</h3>
              <p className="text-[15px] leading-[1.4] text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="text-[15px] leading-[1.4] text-ink-muted">{deliverables.footnote}</p>
      </Frame>
    </Section>
  );
}

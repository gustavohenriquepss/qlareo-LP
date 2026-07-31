import { Frame, Section, framePadding } from "@/components/ui/frame";
import { WaitlistButton } from "@/components/waitlist";
import { cta, finalCta, hero, spots } from "@/lib/content";

export function FinalCta() {
  return (
    <Section bordered={false}>
      <Frame className={framePadding}>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
            {finalCta.heading}
          </h2>
          <p className="text-[16px] leading-[1.35] text-ink-muted">
            {finalCta.subhead}
          </p>
          <WaitlistButton
            source="final"
            label={cta.primary}
            size="lg"
            className="mt-2"
          />
          {spots.total > 0 && (
            <p className="text-[14px] text-ink-muted">
              {hero.clickTrigger.join(" · ")}
            </p>
          )}
        </div>
      </Frame>
    </Section>
  );
}

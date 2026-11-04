import { Frame, Section, cardGrid, framePadding, sectionStack } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { howItWorks } from "@/lib/content";
import type { Perfil } from "@/lib/site";

export function HowItWorks({ perfil }: { perfil: Perfil }) {
  return (
    <Section id={howItWorks.id}>
      <Frame className={`${sectionStack} ${framePadding}`}>
        <SectionHeading heading={howItWorks.heading} />

        {/* `<ol>`: a ordem é a informação. O número grande é só desenho; a
            posição na lista já é anunciada pelo leitor de tela. */}
        <ol className={`${cardGrid} sm:grid-cols-2 lg:grid-cols-4`}>
          {howItWorks.steps[perfil].map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-2xl bg-surface p-6 lg:p-8">
              <span
                aria-hidden
                className="tnum mb-2 text-[32px] leading-none font-medium tracking-[-0.05em] text-brand"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[17px] leading-[1.3] font-semibold text-ink">{step.title}</h3>
              <p className="text-[15px] leading-[1.5] text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Frame>
    </Section>
  );
}

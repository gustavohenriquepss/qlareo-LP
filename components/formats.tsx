import { CheckMark } from "@/components/ui/check-mark";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { formats } from "@/lib/content";

/**
 * Os dois formatos do anunciante. O primeiro ganha a superfície escura do
 * sistema (`bg-ink`), a mesma do CTA final. Sobre ela, o texto secundário é
 * `on-ink` a 80% (12:1) e o check usa o azul da marca (3.45:1, objeto gráfico).
 */
export function Formats() {
  return (
    <Section id={formats.id}>
      <Frame className={`flex flex-col gap-8 ${framePadding}`}>
        <SectionHeading heading={formats.heading} subhead={formats.subhead} />

        <ul className="grid gap-6 lg:grid-cols-2">
          {formats.cards.map((card) => {
            const dark = card.featured;

            return (
              <li
                key={card.title}
                className={[
                  "flex flex-col gap-6 rounded-2xl p-6 lg:p-8",
                  dark ? "bg-ink text-on-ink" : "bg-surface text-ink",
                ].join(" ")}
              >
                <span
                  className={[
                    "self-start rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.08em]",
                    dark ? "bg-on-ink/10 text-on-ink" : "bg-brand/10 text-primary",
                  ].join(" ")}
                >
                  {card.tag}
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.03em]">
                    {card.title}
                  </h3>
                  <p
                    className={`text-[16px] leading-[1.4] ${dark ? "text-on-ink/80" : "text-ink-muted"}`}
                  >
                    {card.body}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] leading-[1.35]">
                      <CheckMark />
                      {item}
                    </li>
                  ))}
                </ul>

                <p
                  className={[
                    "mt-auto rounded-2xl px-4 py-3 text-[15px]",
                    dark ? "bg-on-ink/10" : "bg-surface-2",
                  ].join(" ")}
                >
                  {formats.price.before}
                  <strong className="font-semibold">{formats.price.value}</strong>
                  {formats.price.after}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="text-[15px] leading-[1.4] text-ink-muted">{formats.note}</p>
      </Frame>
    </Section>
  );
}

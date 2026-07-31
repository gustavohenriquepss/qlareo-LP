import Image from "next/image";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { WaitlistButton } from "@/components/waitlist";
import { cta, turn } from "@/lib/content";

/** Blurred brand-blue blobs behind the navy card, exactly as placed in Figma. */
const glows = [
  { src: "/figma/glow-a.svg", size: 441, left: 869, top: -306.45, height: 441 },
  { src: "/figma/glow-b.svg", size: 441, left: -187, top: 154.55, height: 441 },
  { src: "/figma/glow-a.svg", size: 441, left: -9, top: 134.55, height: 441 },
  { src: "/figma/glow-c.svg", size: 441, left: 248, top: 216.55, height: 402 },
] as const;

export function TurnSection() {
  return (
    <Section id={turn.id} bordered={false}>
      <Frame className={framePadding}>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="max-w-[760px] text-center text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
              {turn.heading}
            </h2>
            <p className="text-center text-[16px] leading-[1.35] text-ink">
              {turn.subhead}
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
              {turn.pills.map((pill) => (
                <li
                  key={pill.label}
                  className="flex items-center gap-1 rounded-full border border-border-strong px-3 py-2"
                >
                  <Image
                    src={pill.icon}
                    alt=""
                    aria-hidden
                    width={20}
                    height={20}
                    className="size-5 shrink-0"
                  />
                  <span className="text-[16px] font-medium text-ink">
                    {pill.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-[16px] leading-[1.35] text-ink-muted">
            {turn.caption}
          </p>

          <div className="relative flex w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-ink px-6 py-10 lg:h-[230px] lg:gap-0 lg:px-[24px]">
            {glows.map((glow, index) => (
              <Image
                key={index}
                src={glow.src}
                alt=""
                aria-hidden
                width={glow.size}
                height={glow.height}
                style={{
                  width: glow.size,
                  height: glow.height,
                  left: glow.left,
                  top: glow.top,
                }}
                className="pointer-events-none absolute max-w-none select-none"
              />
            ))}

            <p className="relative text-center text-[26px] leading-[1.1] tracking-[-0.05em] text-on-ink lg:text-[32px]">
              {turn.card.headline[0]}
              <span className="text-brand">{turn.card.headline[1]}</span>
              {turn.card.headline[2]}
            </p>
            <p className="relative max-w-[560px] text-center text-[15px] leading-[1.35] text-on-ink lg:text-[16px]">
              {turn.card.body}
            </p>
            <WaitlistButton source="turn-card" label={cta.primary} size="md" className="relative" />
          </div>
        </div>
      </Frame>
    </Section>
  );
}

import Image from "next/image";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { faq } from "@/lib/content";

/**
 * Native `<details>` accordion: it works before hydration and is keyboard- and
 * screen-reader-correct without a custom widget. The first item ships open —
 * the default is the answer most visitors would have picked anyway.
 */
export function FaqSection() {
  return (
    <Section id={faq.id} className="border-t border-border-strong">
      <Frame className="flex flex-col">
        <div className={`overflow-hidden border-b border-border-strong ${framePadding}`}>
          <div className="flex flex-col gap-2">
            <h2 className="text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
              {faq.heading}
            </h2>
            <p className="text-[16px] leading-[1.35] text-ink-muted">{faq.subhead}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {faq.items.map((item, index) => (
            <details
              key={item.q}
              name="faq"
              open={index === 0}
              /*
                `last:border-b-0`: quem fecha a seção é o `border-b` do próprio
                `Section`. Sem isso, a borda da última pergunta cai exatamente
                em cima dela e a linha final sai com o dobro da espessura das
                divisórias de dentro do acordeão.
              */
              className="group border-b border-border-strong last:border-b-0 open:bg-surface-2"
            >
              <summary className="flex cursor-pointer list-none items-center gap-1 p-6 [&::-webkit-details-marker]:hidden">
                <ToggleIcon />
                <h3 className="text-[16px] font-medium text-ink">{item.q}</h3>
              </summary>
              <p className="px-6 pb-6 text-[14px] leading-[1.35] text-ink-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Frame>
    </Section>
  );
}

/**
 * Plus/minus swap. Both glyphs come from the exported Figma assets and keep
 * their designed 24px outer box with the original inset leaf geometry.
 */
function ToggleIcon() {
  return (
    <span aria-hidden className="relative inline-block size-6 shrink-0">
      {/*
        Eager on purpose: the inactive glyph is `display: none`, which never
        trips the lazy-loading observer, so it would flash empty on first toggle.
      */}
      <Image
        src="/figma/icon-plus.svg"
        alt=""
        width={17}
        height={17}
        loading="eager"
        className="absolute top-[3.75px] left-[3.75px] h-[16.5px] w-[16.5px] group-open:hidden"
      />
      <Image
        src="/figma/icon-minus.svg"
        alt=""
        width={16}
        height={2}
        loading="eager"
        className="absolute top-[11.25px] left-[4.25px] hidden h-[1.5px] w-[15.5px] group-open:block"
      />
    </span>
  );
}

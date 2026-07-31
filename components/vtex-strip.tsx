import Image from "next/image";
import { Section } from "@/components/ui/frame";
import { vtexStrip } from "@/lib/content";

/**
 * Integration band. The 60x106 hatched panels are the Figma's ruled edge
 * treatment; the left one is `hatch-left` mirrored horizontally, matching the
 * `rotate-180 + scale-y-[-1]` transform on the source frame.
 */
export function VtexStrip() {
  return (
    <Section>
      <div className="flex w-full max-w-frame items-stretch">
        <Image
          src="/figma/hatch-left.svg"
          alt=""
          width={60}
          height={106}
          aria-hidden
          className="hidden h-[106px] w-[60px] shrink-0 -scale-x-100 lg:block"
        />
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center border-x border-border-strong px-6 py-6 lg:h-[106px] lg:px-[60px] lg:py-[30px]">
          <p className="flex flex-wrap items-center justify-center gap-x-[7px] gap-y-1 text-center text-[15px] font-medium text-ink lg:text-[16px]">
            <span>{vtexStrip.before}</span>
            <Image
              src="/figma/vtex-logo.png"
              alt="VTEX"
              width={87}
              height={31}
              className="h-[31.288px] w-[87px] object-contain"
            />
            <span>{vtexStrip.after}</span>
          </p>
        </div>
        <Image
          src="/figma/hatch-right.svg"
          alt=""
          width={60}
          height={106}
          aria-hidden
          className="hidden h-[106px] w-[60px] shrink-0 lg:block"
        />
      </div>
    </Section>
  );
}

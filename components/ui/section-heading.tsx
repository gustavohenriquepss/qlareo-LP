/** H2 + linha de apoio, na escala que todas as seções usam. */
export function SectionHeading({
  heading,
  subhead,
  className = "",
}: {
  heading: string;
  subhead?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 lg:gap-4 ${className}`}>
      <h2 className="text-balance text-[28px] leading-[1.1] tracking-[-0.04em] text-ink lg:text-[36px]">
        {heading}
      </h2>
      {subhead && (
        <p className="max-w-[640px] text-[16px] leading-[1.5] text-ink-muted lg:text-[18px]">
          {subhead}
        </p>
      )}
    </div>
  );
}

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
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
        {heading}
      </h2>
      {subhead && (
        <p className="max-w-[640px] text-[16px] leading-[1.35] text-ink-muted">{subhead}</p>
      )}
    </div>
  );
}

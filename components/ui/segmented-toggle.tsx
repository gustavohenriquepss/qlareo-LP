/**
 * Seletor segmentado: um grupo de `<button>` reais, cada um com `aria-pressed`.
 *
 * Não é `role="tablist"`: o seletor troca o conteúdo da PÁGINA INTEIRA, não um
 * painel ao lado dele, e não há `tabpanel` para apontar. Botões de alternância
 * dentro de um grupo nomeado são o padrão certo para isso, e funcionam com Tab
 * e Enter/Espaço sem nenhum teclado customizado.
 *
 * Mesma régua de alvo de toque do `Button` (`.control`). O item ativo usa a
 * superfície escura do sistema (`bg-ink` + `text-on-ink`, 17.85:1).
 */
export function SegmentedToggle<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-surface p-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] ${className}`}
    >
      {options.map((option) => {
        const pressed = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.value)}
            className={[
              "control justify-center rounded-xl px-4 text-[14px] leading-5 font-medium whitespace-nowrap",
              "transition-colors duration-150",
              pressed ? "bg-ink text-on-ink" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

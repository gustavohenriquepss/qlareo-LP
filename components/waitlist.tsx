"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { waitlistModal as copy } from "@/lib/content";

type WaitlistContextValue = {
  /** `source` records which CTA opened the modal, so you can see what converts. */
  open: (source: string) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const isOpen = source !== null;

  const open = useCallback((from: string) => setSource(from), []);
  const close = useCallback(() => setSource(null), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      {isOpen && <WaitlistDialog source={source} onClose={close} />}
    </WaitlistContext.Provider>
  );
}

function WaitlistDialog({
  source,
  onClose,
}: {
  source: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();

  useEffect(() => {
    // Whatever opened the dialog gets keyboard focus back when it closes,
    // so a keyboard user resumes at the CTA instead of the top of the page.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    nameRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep keyboard focus inside the dialog while it is open.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  /*
    The success state replaces the form in place. Without moving focus, a
    screen-reader user is left on a submit button that no longer exists and
    never hears that the submission worked.
  */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          company: String(form.get("company") ?? "").trim(),
          source,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? copy.errorGeneric);
      }

      setStatus("success");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : copy.errorGeneric);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[440px] rounded-2xl border border-border-strong bg-surface p-6 shadow-2xl sm:p-8"
      >
        {/*
          Escape and a backdrop tap both close the dialog, but neither is
          discoverable on a phone — this is the only visible way out.
        */}
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none">
            <path
              d="m5 5 10 10M15 5 5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          // pr-10 on both states keeps the heading clear of the close button.
          <div className="flex flex-col gap-3 pr-10">
            <h2
              id={titleId}
              ref={successRef}
              tabIndex={-1}
              className="text-[24px] leading-tight font-medium tracking-[-0.03em] text-ink outline-none"
            >
              {copy.successTitle}
            </h2>
            <p className="text-[15px] leading-[1.45] text-ink-muted">
              {copy.successBody}
            </p>
            <Button type="button" onClick={onClose} className="mt-2 self-start">
              {copy.close}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate={false}>
            <div className="flex flex-col gap-1.5 pr-10">
              <h2
                id={titleId}
                className="text-[24px] leading-tight font-medium tracking-[-0.03em] text-ink"
              >
                {copy.title}
              </h2>
              <p className="text-[14px] leading-[1.45] text-ink-muted">
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={nameId}
                className="text-[14px] font-medium text-ink"
              >
                {copy.nameLabel}
              </label>
              <input
                ref={nameRef}
                id={nameId}
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={copy.namePlaceholder}
                className="h-11 rounded-lg border border-border-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-muted focus-visible:border-brand"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={emailId}
                className="text-[14px] font-medium text-ink"
              >
                {copy.emailLabel}
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder={copy.emailPlaceholder}
                className="h-11 rounded-lg border border-border-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-muted focus-visible:border-brand"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={companyId}
                className="text-[14px] font-medium text-ink"
              >
                {copy.companyLabel}
              </label>
              <input
                id={companyId}
                name="company"
                type="text"
                required
                autoComplete="organization"
                placeholder={copy.companyPlaceholder}
                className="h-11 rounded-lg border border-border-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-muted focus-visible:border-brand"
              />
            </div>

            {error && (
              <p role="alert" className="text-[14px] text-negative">
                {error}
              </p>
            )}

            {/*
              Única exceção à altura única dos CTAs: este não é um CTA da página,
              é o submit de um formulário, e fica logo abaixo de dois campos de
              44px. Um botão 8px mais baixo que os campos que ele conclui quebra
              o ritmo da coluna — aqui a referência certa é o campo, não o header.
            */}
            <Button
              type="submit"
              size="md"
              className="h-11"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? copy.submitting : copy.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/** Any CTA on the page. Keeps every entry point wired to the same modal. */
export function WaitlistButton({
  source,
  label,
  size = "sm",
  className = "",
}: {
  source: string;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { open } = useWaitlist();
  return (
    <Button type="button" size={size} className={className} onClick={() => open(source)}>
      {label}
    </Button>
  );
}

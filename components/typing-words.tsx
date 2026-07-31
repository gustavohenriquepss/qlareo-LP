"use client";

import { useEffect, useState } from "react";

/**
 * Palavra digitada que alterna dentro do H1.
 *
 * Duas regras não negociáveis, porque isto vive no H1:
 *
 * 1. O HTML do servidor sai com a PRIMEIRA palavra inteira. Crawler, leitor de
 *    tela e quem tem JS desligado leem a manchete completa — a animação é
 *    enfeite que acontece depois da hidratação, nunca o que carrega o sentido.
 * 2. `prefers-reduced-motion` desliga tudo e trava na palavra inteira. O bloco
 *    global de `globals.css` zera `animation-duration`, mas isto aqui é
 *    animação por `setTimeout`: CSS não alcança, tem que ser no componente.
 */

/** Digitar é mais lento que apagar — é assim que a mão de gente se comporta. */
const TYPE_MS = 70;
const DELETE_MS = 35;
/** Tempo com a palavra inteira na tela. Precisa dar para ler sem esforço. */
const HOLD_MS = 1900;
/** Respiro com o campo vazio, antes da próxima palavra começar. */
const RESTART_MS = 380;

type Phase = "holding" | "deleting" | "typing";

export function TypingWords({
  words,
  className,
}: {
  words: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<Phase>("holding");
  /** Falso no servidor e no primeiro render — só liga depois de checar a mídia. */
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Se a preferência mudar no meio do ciclo, completa a palavra em vez de
     deixar o visitante com "Promoç" congelado na manchete. */
  useEffect(() => {
    if (animate) return;
    setText(words[index]);
    setPhase("holding");
  }, [animate, index, words]);

  useEffect(() => {
    if (!animate) return;

    if (phase === "holding") {
      const id = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(id);
    }

    if (phase === "deleting") {
      if (text === "") {
        const id = setTimeout(() => {
          setIndex((current) => (current + 1) % words.length);
          setPhase("typing");
        }, RESTART_MS);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      return () => clearTimeout(id);
    }

    const word = words[index];
    if (text === word) {
      setPhase("holding");
      return;
    }
    const id = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
    return () => clearTimeout(id);
  }, [animate, index, phase, text, words]);

  return (
    <span className={className}>
      {/* `whitespace-nowrap` para a palavra nunca quebrar no meio enquanto cresce. */}
      <span className="whitespace-nowrap">{text}</span>
      {animate && (
        <span
          aria-hidden
          /* Pisca só parado; enquanto digita ou apaga fica sólido, que é como
             cursor de verdade se comporta. */
          className={`ml-[0.06em] inline-block h-[0.78em] w-[0.07em] translate-y-[0.06em] bg-current ${
            phase === "holding" ? "animate-caret" : ""
          }`}
        />
      )}
    </span>
  );
}

"use client";

import { Fragment, type ReactNode } from "react";
import { Audience } from "@/components/audience";
import { Calculator } from "@/components/calculator";
import { Comparison } from "@/components/comparison";
import { Deliverables } from "@/components/deliverables";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { Formats } from "@/components/formats";
import { Gains } from "@/components/gains";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { HowItWorks } from "@/components/how-it-works";
import { usePerfil } from "@/components/perfil";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Perfil } from "@/lib/site";

type SectionKey =
  | "destaques"
  | "como-funciona"
  | "comparativo"
  | "para-quem-e"
  | "formatos"
  | "o-que-voce-recebe"
  | "o-que-voce-ganha"
  | "a-conta"
  | "duvidas"
  | "cta-final";

/**
 * Ordem das seções de cada perfil, depois do hero. Uma seção que não está na
 * lista de um perfil simplesmente não existe para ele.
 */
const ORDER: Record<Perfil, readonly SectionKey[]> = {
  anunciante: [
    "destaques",
    "como-funciona",
    "comparativo",
    "para-quem-e",
    "formatos",
    "o-que-voce-recebe",
    "duvidas",
    "cta-final",
  ],
  restaurante: [
    "destaques",
    "como-funciona",
    "o-que-voce-ganha",
    "a-conta",
    "duvidas",
    "cta-final",
  ],
};

const SECTIONS: Record<SectionKey, (perfil: Perfil) => ReactNode> = {
  destaques: (perfil) => <Highlights perfil={perfil} />,
  "como-funciona": (perfil) => <HowItWorks perfil={perfil} />,
  comparativo: () => <Comparison />,
  "para-quem-e": () => <Audience />,
  formatos: () => <Formats />,
  "o-que-voce-recebe": () => <Deliverables />,
  "o-que-voce-ganha": () => <Gains />,
  "a-conta": () => <Calculator />,
  duvidas: (perfil) => <FaqSection perfil={perfil} />,
  "cta-final": (perfil) => <FinalCta perfil={perfil} />,
};

export function Landing() {
  const { perfil, switched } = usePerfil();

  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        {/* `key` remonta o resto da página na troca de perfil: o FAQ volta para
            a primeira pergunta aberta e a calculadora volta zerada. A animação
            só roda depois de uma troca, nunca no primeiro carregamento. */}
        <div key={perfil} className={switched ? "animate-panel-in" : ""}>
          {ORDER[perfil].map((key) => (
            <Fragment key={key}>{SECTIONS[key](perfil)}</Fragment>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

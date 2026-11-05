"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { DEFAULT_PERFIL, PERFIL_PARAM, type Perfil } from "@/lib/site";

type PerfilState = {
  perfil: Perfil;
  setPerfil: (next: Perfil) => void;
  /** Se a pessoa já trocou de perfil nesta visita. Só então a troca anima. */
  switched: boolean;
};

const PerfilContext = createContext<PerfilState | null>(null);

/**
 * O perfil inicial vem do servidor (`?perfil=` lido em app/page.tsx), então o
 * link mandado para um restaurante já chega renderizado do lado certo, sem
 * piscar o lado do anunciante (o padrão) antes.
 */
export function PerfilProvider({ initial, children }: { initial: Perfil; children: ReactNode }) {
  const [perfil, setState] = useState(initial);
  const [switched, setSwitched] = useState(false);

  const setPerfil = useCallback(
    (next: Perfil) => {
      if (next === perfil) return;

      setState(next);
      setSwitched(true);

      // Atualiza a URL sem recarregar. `replaceState`, não `pushState`: trocar de
      // perfil não é navegar, e o "voltar" deve sair da página, não desfazer o
      // seletor. O perfil padrão não aparece na URL.
      const url = new URL(window.location.href);
      if (next === DEFAULT_PERFIL) url.searchParams.delete(PERFIL_PARAM);
      else url.searchParams.set(PERFIL_PARAM, next);
      window.history.replaceState(null, "", url);

      track("toggle_perfil", { perfil: next });
    },
    [perfil],
  );

  return (
    <PerfilContext.Provider value={{ perfil, setPerfil, switched }}>
      {children}
    </PerfilContext.Provider>
  );
}

export function usePerfil(): PerfilState {
  const state = useContext(PerfilContext);
  if (!state) throw new Error("usePerfil precisa estar dentro de <PerfilProvider>");
  return state;
}

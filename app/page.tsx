import { Landing } from "@/components/landing";
import { PerfilProvider } from "@/components/perfil";
import { PERFIL_PARAM, parsePerfil } from "@/lib/site";

/**
 * Lê `?perfil=` no servidor para que o link mandado a um restaurante já chegue
 * renderizado do lado dele. Isso torna a página dinâmica (renderizada a cada
 * requisição), um custo pequeno para uma página só, e evita que o lado errado
 * pisque antes da hidratação.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PerfilProvider initial={parsePerfil(params[PERFIL_PARAM])}>
      <Landing />
    </PerfilProvider>
  );
}

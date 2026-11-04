import Script from "next/script";

/** Projeto "qlareo.com" no Microsoft Clarity. */
const CLARITY_PROJECT_ID = "z8li80oz9r";

/**
 * Microsoft Clarity: mapas de calor e gravação de sessão, ao lado do Vercel Web
 * Analytics (que segue contando page views e eventos). É o snippet oficial,
 * carregado com `afterInteractive` para não disputar o carregamento da página.
 *
 * Só sobe no deploy de produção da Vercel. Dev e previews ficam de fora para
 * não misturar sessões de teste com as de visitantes reais.
 */
export function Clarity() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * `qlareo.com` e `www.qlareo.com` apontam para este projeto na Vercel, e sem
   * isto os dois respondem 200 com a mesma página — conteúdo duplicado, com o
   * link juice do tráfego pago se dividindo entre dois endereços.
   *
   * O apex é o canônico (ver `metadataBase` em app/layout.tsx); o www só
   * redireciona. 308 e não 302: é permanente, e preserva a query string
   * (`?perfil=restaurante` chega inteiro do outro lado) e o método HTTP.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.qlareo.com" }],
        destination: "https://qlareo.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

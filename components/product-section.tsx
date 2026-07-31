import { Fragment, type ReactNode } from "react";
import { ProductTabs } from "@/components/product-tabs";
import {
  ClientesScreen,
  ProdutosScreen,
  PromocoesScreen,
  VendasScreen,
} from "@/components/preview/screens";
import { Frame, Section, framePadding } from "@/components/ui/frame";
import { product } from "@/lib/content";

/**
 * Cada recurso e a tela que ele mostra. O tipo da chave sai do próprio
 * `content.ts`, então adicionar um recurso lá sem escrever a tela aqui não
 * compila — é o que impede a aba nova de abrir num painel vazio.
 */
const screens: Record<(typeof product.features)[number]["label"], ReactNode> = {
  Vendas: <VendasScreen />,
  Clientes: <ClientesScreen />,
  Produtos: <ProdutosScreen />,
  Promoções: <PromocoesScreen />,
};

export function ProductSection() {
  return (
    <Section id={product.id} className="border-t border-border-strong">
      <Frame className="flex flex-col">
        <div className={`relative overflow-hidden border-b border-border-strong ${framePadding}`}>
          {/* Máscara, pelo mesmo motivo dos ícones da seção do problema: a cor
              sai de `--border-strong`, não de um hex dentro do arquivo. */}
          <span
            aria-hidden
            style={{
              top: -93.45,
              left: 891,
              maskImage: 'url("/figma/deco-lines-product.svg")',
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskImage: 'url("/figma/deco-lines-product.svg")',
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
            }}
            className="pointer-events-none absolute hidden h-[371px] w-[323px] bg-border-strong lg:block"
          />
          <div className="relative flex flex-col gap-2">
            <h2 className="max-w-[760px] text-[26px] leading-[1.1] tracking-[-0.05em] text-ink lg:text-[32px]">
              {product.heading}
            </h2>
            <p className="text-[16px] leading-[1.35] text-ink-muted">
              {product.subhead}
            </p>
          </div>
        </div>

        {/*
          O `Fragment` com key não é decoração: `panels` é um ARRAY de elementos
          que atravessa a fronteira servidor→cliente, e sem key o React avisa no
          console a cada render. As telas do `screens` acima são criadas soltas,
          então a key só pode entrar aqui, onde o array se forma.
        */}
        <ProductTabs
          panels={product.features.map((feature) => (
            <Fragment key={feature.label}>{screens[feature.label]}</Fragment>
          ))}
        />
      </Frame>
    </Section>
  );
}

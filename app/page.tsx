import { DifferentiatorsSection } from "@/components/differentiators-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { ProductSection } from "@/components/product-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TurnSection } from "@/components/turn-section";
import { VtexStrip } from "@/components/vtex-strip";
import { WaitlistProvider } from "@/components/waitlist";
import { faq } from "@/lib/content";

export default function Home() {
  return (
    <WaitlistProvider>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <VtexStrip />
        <ProblemSection />
        <TurnSection />
        <ProductSection />
        <DifferentiatorsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <FaqStructuredData />
    </WaitlistProvider>
  );
}

/** FAQ rich result — the questions already exist, so the markup is free reach. */
function FaqStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

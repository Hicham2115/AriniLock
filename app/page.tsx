import type { Metadata } from "next";
import { AccessoriesGrid } from "@/components/accessories-grid";
import { CartDrawer } from "@/components/cart-drawer";
import { Faq } from "@/components/faq";
import { FeaturesGrid } from "@/components/features-grid";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { OfferNewsletter } from "@/components/offer-newsletter";
import { ProductShowcase } from "@/components/product-showcase";
import { Reviews } from "@/components/reviews";
import { StatsSection } from "@/components/stats-section";
import { StickyBuyBar } from "@/components/sticky-buy-bar";

export const metadata: Metadata = {
  title: "Arini Lock — La porte qui vous reconnaît",
  description:
    "Poignée connectée premium : empreinte digitale, code PIN, app mobile et carte RFID. Installation sans perçage, livraison partout au Maroc.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Feature marquee band — separator between hero and content */}
        <Marquee
          text="Empreinte digitale ✦ Application mobile ✦ Alertes en temps réel ✦ Installation sans perçage ✦ Garantie 2 ans ✦"
          className="border-y border-line bg-surface py-4"
          trackClassName="text-sm uppercase tracking-[0.25em] text-muted-foreground"
        />
        <StatsSection />
        <AccessoriesGrid />

        <FeaturesGrid />
        {/* <ProductShowcase /> */}
        <HowItWorks />
        <Reviews />
        <Faq />
        <OfferNewsletter />
      </main>
      <Footer />
      <StickyBuyBar />
      <CartDrawer />
    </>
  );
}

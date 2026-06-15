import type { Metadata } from "next";
import { AccessoriesGrid } from "@/components/accessories-grid";
import { CartDrawer } from "@/components/cart-drawer";
import { ChatWidget } from "@/components/chat-widget";
import { Faq } from "@/components/faq";
import { FeaturesGrid } from "@/components/features-grid";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { OfferNewsletter } from "@/components/offer-newsletter";
import { Reviews } from "@/components/reviews";
import { StatsSection } from "@/components/stats-section";
import { StickyBuyBar } from "@/components/sticky-buy-bar";

export const metadata: Metadata = {
  title: "Arini Lock — La porte qui vous reconnaît",
  description:
    "Poignée connectée premium : empreinte digitale, code PIN, app mobile et carte RFID. Installation sans perçage, livraison partout au Maroc.",
  alternates: { canonical: "https://arinilock.ma" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arini Lock",
  url: "https://arinilock.ma",
  logo: "https://arinilock.ma/og-image.jpg",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Arini Lock — Poignée Connectée Smart Door Lock",
  description:
    "La poignée connectée qui s'ouvre par empreinte digitale, code secret ou smartphone — sans perçage, sans clé qui traîne, sans compromis sur le style.",
  brand: { "@type": "Brand", name: "Arini Lock" },
  image: "https://arinilock.ma/og-image.jpg",
  url: "https://arinilock.ma/produits/poignee-connectee-smart-door-lock",
  offers: {
    "@type": "Offer",
    price: "1290.00",
    priceCurrency: "MAD",
    availability: "https://schema.org/InStock",
    url: "https://arinilock.ma/produits/poignee-connectee-smart-door-lock",
    seller: { "@type": "Organization", name: "Arini Lock" },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "MAD" },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        businessDays: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"] },
        cutoffTime: "17:00:00+01:00",
        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
      },
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Arini Lock est-elle compatible avec toutes les portes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arini Lock s'adapte à la majorité des portes intérieures et d'entrée standards en bois et métal. Un guide de compatibilité détaillé est fourni avant l'achat.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il en cas de coupure de courant ou de panne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arini Lock fonctionne sur piles, indépendamment du réseau électrique. En cas de panne complète, une clé physique de secours fournie avec votre serrure permet toujours d'ouvrir la porte.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps dure la batterie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avec un usage quotidien moyen, les 4 piles AA tiennent environ 12 mois. L'application vous alerte automatiquement plusieurs semaines avant épuisement.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je l'installer moi-même ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. L'installation se fait sans perçage ni outils spécifiques, en suivant le guide illustré fourni — comptez environ 15 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Livrez-vous partout au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous livrons dans toutes les villes du Maroc, avec paiement à la livraison disponible. Le délai moyen est de 2 à 4 jours ouvrés.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
      <ChatWidget />
    </>
  );
}

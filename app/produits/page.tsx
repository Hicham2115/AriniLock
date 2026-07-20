import type { Metadata } from "next";
import { ProduitsPageClient } from "@/components/produits-page-client";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez la serrure connectée ARINILOCK et ses accessoires. Empreinte digitale, code PIN, app mobile — livraison partout au Maroc en 2 à 4 jours.",
  alternates: { canonical: "https://www.arinilock.ma/produits" },
  openGraph: {
    title: "Boutique — ARINILOCK",
    description:
      "Serrure connectée et accessoires. Livraison partout au Maroc, paiement à la livraison.",
    images: [{ url: "/og-home.jpg", width: 670, height: 1200, alt: "ARINILOCK boutique" }],
  },
};

export default function ProduitsPage() {
  return <ProduitsPageClient />;
}

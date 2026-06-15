import type { Metadata } from "next";
import { ProduitsPageClient } from "@/components/produits-page-client";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez la serrure connectée Arini Lock et ses accessoires. Empreinte digitale, code PIN, app mobile — livraison partout au Maroc en 2 à 4 jours.",
  alternates: { canonical: "https://arinilock.ma/produits" },
  openGraph: {
    title: "Boutique — Arini Lock",
    description:
      "Serrure connectée et accessoires. Livraison partout au Maroc, paiement à la livraison.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Arini Lock boutique" }],
  },
};

export default function ProduitsPage() {
  return <ProduitsPageClient />;
}

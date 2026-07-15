import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LegalPageBody } from "@/components/legal-page-body";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données personnelles d'AriniLock, conformément à la loi marocaine 09-08.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <CartDrawer />
      <Header />
      <main className="min-h-screen bg-white">
        <LegalPageBody page="privacy" />
      </main>
      <Footer />
    </>
  );
}

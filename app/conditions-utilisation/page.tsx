import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LegalPageBody } from "@/components/legal-page-body";

export const metadata: Metadata = {
  title: "Conditions d'utilisation & CGV",
  description: "Conditions générales de vente et d'utilisation d'ARINILOCK, incluant les modalités de paiement et de livraison.",
};

export default function ConditionsUtilisationPage() {
  return (
    <>
      <CartDrawer />
      <Header />
      <main className="min-h-screen bg-white">
        <LegalPageBody page="terms" />
      </main>
      <Footer />
    </>
  );
}

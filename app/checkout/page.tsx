import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutClient } from "@/components/checkout-client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Commande",
  description: "Finalisez votre commande ARINILOCK — paiement à la livraison.",
  alternates: { canonical: "https://www.arinilock.ma/checkout" },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24">
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}

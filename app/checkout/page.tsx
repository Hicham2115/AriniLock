import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";
import { CartDrawer } from "@/components/cart-drawer";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Commande",
  description: "Finalisez votre commande ARINILOCK — paiement à la livraison.",
  alternates: { canonical: "https://arinilock.ma/checkout" },
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

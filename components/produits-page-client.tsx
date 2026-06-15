"use client";

import { ShoppingBag, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { useAddToCart } from "@/hooks/use-cart";
import { useAccessories, useMainProduct } from "@/hooks/use-product";
import { formatMoney } from "@/types/shopify";

const FILTERS = ["Tout", "Serrure", "Accessoires"] as const;
type Filter = (typeof FILTERS)[number];

export function ProduitsPageClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Tout");
  const { data: mainProduct, isLoading: loadingMain } = useMainProduct();
  const { data: accessories, isLoading: loadingAcc } = useAccessories();
  const { addToCart, isPending } = useAddToCart();
  const isLoading = loadingMain || loadingAcc;

  const variant = mainProduct?.variants[0];

  const showMain = activeFilter === "Tout" || activeFilter === "Serrure";
  const showAcc = activeFilter === "Tout" || activeFilter === "Accessoires";

  return (
    <>
    <Header />
    <CartDrawer />
    <main className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="border-b border-line bg-background">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-32 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Collection — {new Date().getFullYear()}
              </p>
              <h1
                className="font-display2 uppercase leading-none text-ink"
                style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
              >
                Nos
                <br />
                Produits.
              </h1>
            </div>

            {/* Quick buy CTA */}
            {!isLoading && variant && (
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  addToCart([{ merchandiseId: variant.id, quantity: 1 }])
                }
                className="inline-flex h-14 shrink-0 items-center gap-2 self-start rounded-full bg-ink px-8 text-sm font-medium text-cream transition-colors hover:bg-ink/80 disabled:opacity-60 md:self-auto"
              >
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                Commander — {formatMoney(variant.price)}
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="mt-10 flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-cream/40" aria-hidden="true" />
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-all ${
                    activeFilter === f
                      ? "border-ink bg-ink text-cream"
                      : "border-line bg-transparent text-muted-foreground hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {showMain && mainProduct && (
              <Link href={`/produits/${mainProduct.handle}`}>
                <ProductCard product={mainProduct} />
              </Link>
            )}
            {showAcc && accessories?.map((acc) => (
              <Link key={acc.id} href={`/produits/${acc.handle}`}>
                <ProductCard product={acc} />
              </Link>
            ))}
          </div>
        )}

        {!isLoading && !mainProduct && !accessories?.length && (
          <div className="py-24 text-center text-sm text-muted-foreground">
            Aucun produit trouvé.
          </div>
        )}
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            { label: "Livraison partout au Maroc", sub: "2–4 jours ouvrés" },
            { label: "Paiement à la livraison", sub: "Disponible sur tout le Maroc" },
            { label: "Garantie 2 ans", sub: "Constructeur" },
            { label: "Installation sans perçage", sub: "En moins de 15 minutes" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 bg-background px-6 py-8">
              <p className="text-sm font-medium text-ink">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

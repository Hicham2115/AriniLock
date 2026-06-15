"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { useAccessories, useMainProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { queryKeys } from "@/lib/query-keys";
import { MAIN_PRODUCT_HANDLE } from "@/lib/shopify/products";
import type { Product } from "@/types/shopify";

export function ProduitsPageClient() {
  const t = useT();
  const queryClient = useQueryClient();
  const { data: mainProduct, isLoading: loadingMain, isError: errorMain } = useMainProduct();
  const { data: accessories, isLoading: loadingAcc, isError: errorAcc } = useAccessories();
  const isLoading = loadingMain || loadingAcc;
  const isError = errorMain || errorAcc;

  function handleRetry() {
    void queryClient.resetQueries({ queryKey: queryKeys.product(MAIN_PRODUCT_HANDLE) });
    void queryClient.resetQueries({ queryKey: queryKeys.accessories });
  }

  useEffect(() => {
    if (isError) {
      toast.error(t.errors.loadProducts, {
        description: t.errors.loadProductsDesc,
      });
    }
  }, [isError, t]);

  const visible: Product[] = [
    ...(mainProduct ? [mainProduct] : []),
    ...(accessories?.filter((a) => a.handle !== mainProduct?.handle) ?? []),
  ];

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-background">

        {/* Hero header */}
        <div className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:pt-32 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Collection — {new Date().getFullYear()}
                </p>
                <h1
                  className="font-display2 uppercase leading-none text-ink"
                  style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)" }}
                >
                  Nos
                  <br />
                  Produits.
                </h1>
              </div>

              {/* Product count badge */}
              {!isLoading && (
                <div className="self-start md:self-auto">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground md:text-right">
                    {visible.length} modèle{visible.length !== 1 ? "s" : ""}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground md:text-right">
                    Livraison partout au Maroc
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center gap-5 py-24 text-center">
              <p className="text-sm text-muted-foreground">
                {t.errors.loadError}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                {t.errors.retry}
              </button>
            </div>
          ) : visible.length === 0 ? (
            <div className="py-24 text-center text-sm text-muted-foreground">
              Aucun produit disponible.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {visible.map((p) => (
                <Link key={p.id} href={`/produits/${p.handle}`}>
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom trust bar */}
        <div className="border-t border-line">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
            {[
              { label: "Livraison partout au Maroc", sub: "2–4 jours ouvrés" },
              { label: "Paiement à la livraison",   sub: "Disponible sur tout le Maroc" },
              { label: "Garantie 2 ans",             sub: "Constructeur" },
              { label: "Installation sans perçage",  sub: "En moins de 15 minutes" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1 bg-background px-4 py-6 md:px-6 md:py-8">
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

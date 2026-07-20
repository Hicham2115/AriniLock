"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { useAccessories, useMainProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { isProductInStock, type Product } from "@/types/shopify";

export function BestSellers() {
  const t = useT();
  const s = t.sections.bestSellers;
  const { data: mainProduct, isLoading: loadingMain, isError: errorMain, refetch: refetchMain } = useMainProduct();
  const { data: accessories, isLoading: loadingAcc, isError: errorAcc, refetch: refetchAcc } = useAccessories();

  const isLoading = loadingMain || loadingAcc;
  const isError = errorMain || errorAcc;

  const products: Product[] = [
    ...(mainProduct ? [mainProduct] : []),
    ...(accessories?.filter((a) => a.handle !== mainProduct?.handle) ?? []),
  ]
    .filter(isProductInStock)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 flex items-start gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>{s.label}</span>
            </div>
            <h2
              className="font-display leading-none text-ink"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {s.title}
            </h2>
          </div>
          <Link
            href="/produits"
            className="text-sm font-medium text-ink underline-offset-4 hover:text-brass hover:underline"
          >
            {s.cta}
          </Link>
        </div>
      </Reveal>

      {isLoading && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">{t.errors.loadError}</p>
          <button
            type="button"
            onClick={() => {
              void refetchMain();
              void refetchAcc();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {t.errors.retry}
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link href={`/produits/${p.handle}`}>
                <ProductCard product={p} />
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

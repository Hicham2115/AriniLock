"use client";

import Link from "next/link";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
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
import { isProductInStock, type Product } from "@/types/shopify";

const COLOR_OPTIONS = [
  { label: "Black",  bg: "bg-[#1E1B18]" },
  { label: "Silver", bg: "bg-[#C7C9CC]" },
  { label: "Bronze", bg: "bg-[#8C6A3F]" },
  { label: "White",  bg: "bg-[#F5F5F0] border border-gray-200" },
];

export function ProduitsPageClient() {
  const t = useT();
  const queryClient = useQueryClient();
  const PRICE_RANGES = t.sections.produits.priceRanges;
  const { data: mainProduct, isLoading: loadingMain, isError: errorMain } = useMainProduct();
  const { data: accessories, isLoading: loadingAcc, isError: errorAcc } = useAccessories();
  const isLoading = loadingMain || loadingAcc;
  const isError = errorMain || errorAcc;

  const [search, setSearch] = useState("");
  const [priceIdx, setPriceIdx] = useState(0);
  const [activeColors, setActiveColors] = useState<string[]>([]);

  function toggleColor(label: string) {
    setActiveColors((prev) =>
      prev.includes(label) ? [] : [label]
    );
  }

  function handleRetry() {
    void queryClient.resetQueries({ queryKey: queryKeys.product(MAIN_PRODUCT_HANDLE) });
    void queryClient.resetQueries({ queryKey: queryKeys.accessories() });
  }

  useEffect(() => {
    if (isError) {
      toast.error(t.errors.loadProducts, {
        description: t.errors.loadProductsDesc,
      });
    }
  }, [isError, t]);

  const allProducts: Product[] = [
    ...(mainProduct ? [mainProduct] : []),
    ...(accessories?.filter((a) => a.handle !== mainProduct?.handle) ?? []),
  ];


  const range = PRICE_RANGES[priceIdx];
  const visible = allProducts.filter((p) => {
    if (!isProductInStock(p)) return false;
    const price = parseFloat(p.variants[0]?.price.amount ?? "0");
    if (price < range.min || price > range.max) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeColors.length > 0) {
      const tags = (p.tags ?? []).map((t) => t.toLowerCase());
      if (!activeColors.some((c) => tags.includes(`color-${c.toLowerCase()}`))) return false;
    }
    return true;
  });

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen bg-background">

        {/* Hero header */}
        <div
          className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40"
          style={{ background: "linear-gradient(135deg, #010d1a 0%, #032245 50%, #053d7a 100%)" }}
        >
          {/* Decorative glows */}
          <div
            className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #2a5fa8 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #053d7a 0%, transparent 70%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  {t.sections.produits.collection} — {new Date().getFullYear()}
                </p>
                <h1
                  className="font-display2 uppercase leading-none text-white"
                  style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)" }}
                >
                  {t.sections.produits.title.split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </h1>
              </div>

              {/* Delivery info */}
              {!isLoading && (
                <div className="self-start md:self-auto">
                  <p className="text-sm text-white/60 md:text-right">
                    {t.sections.produits.delivery}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="sticky top-16 z-20 border-b border-line bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-wrap items-center gap-3 py-4">

              {/* Search */}
              <div className="relative flex-1 min-w-44">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={t.sections.produits.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-full rounded-full border border-line bg-white pl-9 pr-4 text-sm text-ink placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Divider */}
              <div className="hidden h-5 w-px bg-line sm:block" />

              {/* Prix */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <select
                  value={priceIdx}
                  onChange={(e) => setPriceIdx(Number(e.target.value))}
                  className="h-9 rounded-full border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary/50 cursor-pointer"
                >
                  {PRICE_RANGES.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden h-5 w-px bg-line sm:block" />

              {/* Colors */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.sections.produits.colorLabel}</span>
                <div className="flex gap-1.5">
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      key={col.label}
                      type="button"
                      title={col.label}
                      onClick={() => toggleColor(col.label)}
                      className={`h-5 w-5 rounded-full border-2 transition-all ${col.bg} ${
                        activeColors.includes(col.label)
                          ? "border-primary scale-110"
                          : "border-transparent hover:border-line"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(search || priceIdx !== 0 || activeColors.length > 0) && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setPriceIdx(0); setActiveColors([]); }}
                  className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:text-ink hover:underline"
                >
                  {t.sections.produits.reset}
                </button>
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-white/90"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                {t.errors.retry}
              </button>
            </div>
          ) : visible.length === 0 ? (
            <div className="py-24 text-center text-sm text-muted-foreground">
              {t.sections.produits.noResults}
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
            {t.sections.produits.trust.map((item) => (
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

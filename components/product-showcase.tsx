"use client";

import { Minus, Plus, RotateCcw, Star } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useMainProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";

const SWATCH_COLORS: Record<string, string> = {
  "Noir Mat": "bg-[#1E1B18]",
  Argent: "bg-[#C7C9CC]",
  Or: "bg-[#C49A65]",
};

export function ProductShowcase() {
  const t = useT();
  const formatMoney = useFormatMoney();
  const s = t.sections.showcase;
  const { data: product, isLoading, isError, error, refetch } = useMainProduct();
  const { addToCart, isPending } = useAddToCart();

  const selectedVariantId = useUiStore((s) => s.selectedVariantId);
  const setSelectedVariantId = useUiStore((s) => s.setSelectedVariantId);
  const quantity = useUiStore((s) => s.quantity);
  const incrementQuantity = useUiStore((s) => s.incrementQuantity);
  const decrementQuantity = useUiStore((s) => s.decrementQuantity);

  const variant =
    product?.variants.find((v) => v.id === selectedVariantId) ??
    product?.variants[0];

  return (
    <section
      id="produit"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>{s.label}</span>
        <span>{s.right}</span>
      </div>

      {isLoading && (
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Skeleton className="mb-4 aspect-4/5 w-full rounded-3xl" />
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-8 w-56" />
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {t.errors.loadError}{" "}
            {error instanceof Error ? error.message : ""}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {t.errors.retry}
          </button>
        </div>
      )}

      {product && variant && (
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Info */}
          <div className="lg:sticky lg:top-28">
            {/* Title + rating */}
            <h2
              className="mb-4 font-display leading-none text-ink"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {s.productTitle}
            </h2>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex text-gold" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {s.rating} 312 {t.product.reviews}
              </span>
            </div>

            {/* Price */}
            <div className="mb-8 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl text-ink">
                {formatMoney(variant.price)}
              </span>
              {variant.compareAtPrice && (
                <span className="text-muted-foreground line-through">
                  {formatMoney(variant.compareAtPrice)}
                </span>
              )}
              <Badge className="rounded-full bg-gold/15 px-3 py-1 text-xs uppercase tracking-widest text-brass hover:bg-gold/15">
                {s.launchBadge}
              </Badge>
            </div>

            {/* Variant swatches */}
            <div className="mb-8">
              <p className="mb-3 text-sm text-muted-foreground">
                {t.product.finish} —{" "}
                <span className="text-ink">{variant.title}</span>
              </p>
              <div className="flex gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    aria-label={`${t.product.finish} ${v.title}`}
                    aria-pressed={v.id === variant.id}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all",
                      SWATCH_COLORS[v.title] ?? "bg-surface",
                      v.id === variant.id
                        ? "scale-110 border-gold shadow-[0_0_0_3px_rgba(196,154,101,0.2)]"
                        : "border-line",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-line bg-card">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  aria-label={t.cart.decrease}
                  className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-brass"
                >
                  <Minus aria-hidden="true" className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  aria-label={t.cart.increase}
                  className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-brass"
                >
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={isPending || !variant.availableForSale}
                onClick={() =>
                  addToCart([{ merchandiseId: variant.id, quantity }])
                }
                className="flex-1 rounded-full bg-ink px-8 py-4 font-medium text-cream transition-colors hover:bg-ink/80 disabled:opacity-60 sm:min-w-50"
              >
                {isPending ? t.product.adding : t.product.addToCart}
              </button>
            </div>

            {/* Specs */}
            <dl className="divide-y divide-line">
              {s.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="text-right text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}

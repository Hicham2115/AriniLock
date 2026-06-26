"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { Product } from "@/types/shopify";

const SWATCH_COLORS: Record<string, string> = {
  Black:  "bg-[#1E1B18]",
  Silver: "bg-[#C7C9CC]",
  Bronze: "bg-[#8C6A3F]",
  White:  "bg-[#F5F5F0] border border-white/40",
};

export function ProductCardSkeleton() {
  return (
    <div className="aspect-3/4 overflow-hidden rounded-xl">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const formatMoney = useFormatMoney();
  const { addToCart, isPending } = useAddToCart();
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0]?.id);
  const { toggle, isFavorite } = useFavoritesStore();
  const liked = isFavorite(product.id);

  const variant = product.variants.find((v) => v.id === activeVariantId) ?? product.variants[0];
  const image   = variant?.image ?? product.images[0];

  const hasSwatches =
    product.variants.length > 1 &&
    product.variants[0]?.selectedOptions?.[0]?.name !== "Default";

  return (
    <div className="group flex flex-col sm:block">
      {/* Image wrapper */}
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-ink">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-line" />
        )}

        {/* Permanent gradient — desktop only */}
        <div className="absolute inset-0 hidden bg-linear-to-t from-black/80 via-black/20 to-transparent sm:block" />

        {/* Hover tint */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-gold/60" />

        {/* Heart / favorite */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggle(product); }}
          aria-label={liked ? t.favorites.remove : t.favorites.add}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
        >
          <Heart
            className={cn("h-4 w-4 transition-colors", liked ? "fill-[#4a90d9] text-[#4a90d9]" : "text-white")}
          />
        </button>

        {/* Compare-at badge */}
        {variant?.compareAtPrice && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-dark">
              {t.product.promo}
            </span>
          </div>
        )}

        {/* Swatches — always visible */}
        {hasSwatches && (
          <div className="absolute bottom-4 left-4 flex gap-1.5 sm:hidden">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveVariantId(v.id); }}
                aria-label={`Finition ${v.title}`}
                aria-pressed={v.id === activeVariantId}
                className={cn(
                  "h-4 w-4 rounded-full border transition-all",
                  SWATCH_COLORS[v.title] ?? "bg-white/40",
                  v.id === activeVariantId ? "scale-125 border-gold" : "border-white/30"
                )}
              />
            ))}
          </div>
        )}

        {/* Desktop overlay content */}
        <div className="absolute inset-x-0 bottom-0 hidden p-5 sm:block">
          {hasSwatches && (
            <div className="mb-3 flex gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setActiveVariantId(v.id); }}
                  aria-label={`Finition ${v.title}`}
                  aria-pressed={v.id === activeVariantId}
                  className={cn(
                    "h-4 w-4 rounded-full border transition-all",
                    SWATCH_COLORS[v.title] ?? "bg-white/40",
                    v.id === activeVariantId ? "scale-125 border-gold" : "border-white/30 hover:border-white/70"
                  )}
                />
              ))}
            </div>
          )}
          <p className="mb-0.5 text-[10px] uppercase tracking-[0.25em] text-white/50">{t.product.brand}</p>
          <h3 className="font-display text-base font-medium leading-tight text-cream">{product.title}</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {variant && <span className="font-display2 text-lg leading-none text-white">{formatMoney(variant.price)}</span>}
              {variant?.compareAtPrice && <span className="text-xs text-white/35 line-through">{formatMoney(variant.compareAtPrice)}</span>}
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={() => variant && addToCart([{ merchandiseId: variant.id, quantity: 1 }])}
              className="flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#4a90d9] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 disabled:opacity-50"
              aria-label={`${t.product.addToCart}: ${product.title}`}
            >
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-dark" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-only text below image */}
      <div className="mt-2 px-0.5 sm:hidden">
        <p className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.product.brand}</p>
        <h3 className="font-display text-sm font-medium leading-tight text-foreground">{product.title}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          {variant && <span className="font-display2 text-sm leading-none text-primary">{formatMoney(variant.price)}</span>}
          {variant?.compareAtPrice && <span className="text-xs text-muted-foreground line-through">{formatMoney(variant.compareAtPrice)}</span>}
        </div>
      </div>
    </div>
  );
}

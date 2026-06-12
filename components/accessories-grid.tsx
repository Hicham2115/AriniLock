"use client";

import { Plus, RotateCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useAccessories } from "@/hooks/use-product";
import { formatMoney, type Product } from "@/types/shopify";

function getCardLetter(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("pile") || t.includes("batterie")) return "P";
  if (t.includes("finition") || t.includes("plaque")) return "F";
  if (t.includes("rfid") || t.includes("carte")) return "C";
  return title[0].toUpperCase();
}

function AccessoryCard({
  accessory,
  accent,
}: {
  accessory: Product;
  accent?: boolean;
}) {
  const { addToCart, isPending } = useAddToCart();
  const variant = accessory.variants[0];
  const letter = getCardLetter(accessory.title);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl ${
        accent ? "bg-gold" : "bg-dark"
      }`}
      style={{ aspectRatio: "3/4" }}
    >
      {/* Giant letter background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className={`select-none font-display2 leading-none ${
            accent ? "text-dark/20" : "text-white/[0.07]"
          }`}
          style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
        >
          {letter}
        </span>
      </div>

      {/* Stage badge — top left */}
      <div className="absolute left-4 top-4">
        <span
          className={`rounded-full border px-3 py-1 text-xs ${
            accent
              ? "border-dark/20 bg-dark/15 text-dark"
              : "border-white/20 bg-white/10 text-cream"
          }`}
        >
          Accessoire
        </span>
      </div>

      {/* Price — top right */}
      {variant && (
        <p
          className={`absolute right-4 top-4 text-sm font-medium ${
            accent ? "text-dark" : "text-cream/80"
          }`}
        >
          {formatMoney(variant.price)}
        </p>
      )}

      {/* Product name — bottom left */}
      <div className="absolute bottom-4 left-4 right-16">
        <h3
          className={`font-display text-lg leading-tight ${
            accent ? "text-dark" : "text-cream"
          }`}
        >
          {accessory.title}
        </h3>
        <p
          className={`mt-0.5 text-xs ${
            accent ? "text-dark/70" : "text-cream/60"
          }`}
        >
          {accessory.description}
        </p>
      </div>

      {/* Quick-add — bottom right, appears on hover */}
      {variant && (
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              addToCart([{ merchandiseId: variant.id, quantity: 1 }], {
                successMessage: `${accessory.title} ajouté`,
              })
            }
            aria-label={`Ajouter ${accessory.title} au panier`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-ink shadow-lg transition-colors hover:bg-gold disabled:opacity-60"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function AccessoriesGrid() {
  const { data: accessories, isLoading, isError, refetch } = useAccessories();

  return (
    <section
      id="accessoires"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>05 — Accessoires</span>
        <span>Complétez l&apos;installation</span>
      </div>

      <h2
        className="mb-12 font-display2 uppercase leading-none text-ink"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        Pensé pour<br />durer plus<br />longtemps.
      </h2>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="w-full rounded-2xl" style={{ aspectRatio: "3/4" }} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Impossible de charger les accessoires.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Réessayer
          </button>
        </div>
      )}

      {accessories && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accessories.map((accessory, index) => (
            <AccessoryCard
              key={accessory.id}
              accessory={accessory}
              accent={index === 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useAccessories } from "@/hooks/use-product";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import { formatMoney, type Product } from "@/types/shopify";

function AccessoryCard({ accessory }: { accessory: Product }) {
  const { addToCart, isPending } = useAddToCart();
  const { toggle, isFavorite } = useFavoritesStore();
  const variant = accessory.variants[0];
  const image = variant?.image ?? accessory.images[0];
  const liked = isFavorite(accessory.id);

  return (
    <Link
      href={`/produits/${accessory.handle}`}
      className="group relative block overflow-hidden rounded-2xl bg-dark"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Product image */}
      {image ? (
        <Image
          src={image.url}
          alt={image.altText ?? accessory.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-line" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Heart — top left */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); toggle(accessory); }}
        aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
        className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
      >
        <Heart className={cn("h-4 w-4 transition-colors", liked ? "fill-gold text-gold" : "text-white")} />
      </button>

      {/* Price — top right */}
      {variant && (
        <p className="absolute right-4 top-4 text-sm font-medium text-cream/90">
          {formatMoney(variant.price)}
        </p>
      )}

      {/* Product name — bottom left */}
      <div className="absolute bottom-4 left-4 right-16">
        <h3 className="font-display text-lg leading-tight text-cream">
          {accessory.title}
        </h3>
      </div>

      {/* Quick-add — bottom right, appears on hover */}
      {variant && (
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              addToCart([{ merchandiseId: variant.id, quantity: 1 }], {
                successMessage: `${accessory.title} ajouté`,
              });
            }}
            aria-label={`Ajouter ${accessory.title} au panier`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-ink shadow-lg transition-colors hover:bg-gold disabled:opacity-60"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
    </Link>
  );
}

export function AccessoriesGrid() {
  const { data: accessories, isLoading, isError, refetch } = useAccessories();

  return (
    <section
      id="accessoires"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-16 lg:px-10 lg:py-24"
    >
      {/* Section label */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
          <span>02 — Accessoires</span>
          <span>Complétez l&apos;installation</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mb-8 font-display2 uppercase leading-none text-ink lg:mb-12"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Pensé pour durer plus
          <br />
          longtemps.
        </h2>
      </Reveal>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton
              key={i}
              className="w-full rounded-2xl"
              style={{ aspectRatio: "3/4" }}
            />
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
          {accessories.slice(0, 6).map((accessory, index) => (
            <motion.div
              key={accessory.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
            >
              <AccessoryCard accessory={accessory} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

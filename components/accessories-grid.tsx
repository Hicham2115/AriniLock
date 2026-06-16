"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useAccessories } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { Product } from "@/types/shopify";

function AccessoryCard({ accessory }: { accessory: Product }) {
  const t = useT();
  const formatMoney = useFormatMoney();
  const { addToCart, isPending } = useAddToCart();
  const { toggle, isFavorite } = useFavoritesStore();
  const variant = accessory.variants[0];
  const image = variant?.image ?? accessory.images[0];
  const liked = isFavorite(accessory.id);

  return (
    <Link
      href={`/produits/${accessory.handle}`}
      className="group relative block overflow-hidden rounded-2xl bg-primary"
      style={{ aspectRatio: "3/4" }}
    >
      {image ? (
        <Image
          src={image.url}
          alt={image.altText ?? accessory.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-border" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Heart */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); toggle(accessory); }}
        aria-label={liked ? t.favorites.remove : t.favorites.add}
        className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
      >
        <Heart className={cn("h-4 w-4 transition-colors", liked ? "fill-white text-white" : "text-white")} />
      </button>

      {/* Price */}
      {variant && (
        <p className="absolute right-4 top-4 text-sm font-medium text-white/90">
          {formatMoney(variant.price)}
        </p>
      )}

      {/* Product name */}
      <div className="absolute bottom-4 left-4 right-16">
        <h3 className="font-display text-lg leading-tight text-white">
          {accessory.title}
        </h3>
      </div>

      {/* Quick-add */}
      {variant && (
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              addToCart([{ merchandiseId: variant.id, quantity: 1 }], {
                successMessage: `${accessory.title} ${t.product.addedMsg}`,
              });
            }}
            aria-label={`${t.product.addToCart}: ${accessory.title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-primary hover:text-white disabled:opacity-60"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
    </Link>
  );
}

export function AccessoriesGrid() {
  const t = useT();
  const s = t.sections.accessories;
  const { data: accessories, isLoading, isError, refetch } = useAccessories();

  return (
    <section
      id="accessoires"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-border px-6 py-16 lg:px-10 lg:py-24"
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
          <span>{s.label}</span>
          <span>{s.right}</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mb-8 font-display2 uppercase leading-none text-foreground lg:mb-12"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          {s.headline[0]}
          <br />
          {s.headline[1]}
        </h2>
      </Reveal>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="w-full rounded-2xl" style={{ aspectRatio: "3/4" }} />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">{t.errors.loadAccessories}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            {t.errors.retry}
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

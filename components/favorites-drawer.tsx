"use client";

import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useT } from "@/hooks/use-t";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoritesDrawer() {
  const t = useT();
  const formatMoney = useFormatMoney();
  const { items, drawerOpen, closeDrawer, toggle } = useFavoritesStore();

  return (
    <Sheet open={drawerOpen} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 border-line bg-card p-0"
      >
        <SheetHeader className="border-b border-line px-6 py-6">
          <SheetTitle className="font-display text-xl font-normal text-ink">
            {t.favorites.title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Vos produits AriniLock enregistrés
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Heart aria-hidden="true" className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {t.favorites.empty}
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((product) => {
                const image = product.images[0];
                const variant = product.variants[0];
                return (
                  <li key={product.id} className="flex gap-4">
                    <Link
                      href={`/produits/${product.handle}`}
                      onClick={closeDrawer}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-surface"
                    >
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.title}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/produits/${product.handle}`}
                          onClick={closeDrawer}
                          className="text-sm font-medium text-ink hover:text-gold transition-colors"
                        >
                          {product.title}
                        </Link>
                        {variant && (
                          <p className="mt-0.5 text-sm text-brass">
                            {formatMoney(variant.price)}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(product)}
                        aria-label={t.favorites.remove}
                        className="flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.favorites.removeBtn}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

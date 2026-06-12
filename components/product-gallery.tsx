"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ShopifyImage } from "@/types/shopify";

export function ProductGallery({
  images,
  title,
}: {
  images: ShopifyImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Agrandir l'image"
            className="relative mb-4 block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line"
          >
            <Image
              src={active.url}
              alt={active.altText ?? `${title} — vue ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 90vw, 40rem"
              className="object-cover"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl border-line bg-card p-2">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Vue agrandie du produit
          </DialogDescription>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src={active.url}
              alt={active.altText ?? title}
              fill
              sizes="48rem"
              className="object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Afficher la vue ${index + 1}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border-2 transition-colors",
              index === activeIndex
                ? "border-gold"
                : "border-line hover:border-gold/60",
            )}
          >
            <Image
              src={image.url}
              alt={image.altText ?? `${title} — miniature ${index + 1}`}
              fill
              sizes="8rem"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

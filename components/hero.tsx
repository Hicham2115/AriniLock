"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/nano-banana-2_3D_render_of_a_premium_smart_door_lock_handle_brushed_gold_and_matte_black_finis-0.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useMainProduct } from "@/hooks/use-product";
import { formatMoney } from "@/types/shopify";

export function Hero() {
  const { data: product, isLoading } = useMainProduct();
  const { addToCart, isPending } = useAddToCart();
  const variant = product?.variants[0];

  return (
    <section className="relative overflow-hidden">
      {/* Full-cover background image */}
      <Image
        src={lockImg}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay so text stays readable */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />

      {/* Split headline — full viewport width, behind everything */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-start justify-between px-6 pt-36 lg:px-16 lg:pt-44">
        <h1
            className="block mt-15 font-display leading-none text-white drop-shadow-lg"
          style={{
            fontSize: "clamp(3rem, 12vw, 11rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Votre
        </h1>
        <div className="text-right">
          <span
            className="block font-display leading-none text-white drop-shadow-lg"
            style={{
              fontSize: "clamp(3rem, 12vw, 11rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Porte.
          </span>
          <p
            className="mt-2 -rotate-2 font-script leading-none"
            style={{
              fontSize: "clamp(1.8rem, 7vw, 6.5rem)",
              background: "linear-gradient(135deg, #fdf3e0 0%, #f0d9a8 45%, #e0c080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 24px rgba(196,154,101,0.55))",
            }}
          >
            Réinventée.
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-24 lg:px-10">
        {/* Top label row */}
        <div className="flex items-center justify-between py-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/90">
            Édition de lancement · 2026
          </p>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-white/90 lg:block">
            Maroc
          </p>
        </div>

        <div className="flex-1" />

        {/* CTAs — centered below image */}
        <div className="flex flex-wrap items-center justify-center gap-4 pb-8 lg:pb-12">
          {isLoading || !variant ? (
            <Skeleton className="h-14 w-60 rounded-full" />
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                addToCart([{ merchandiseId: variant.id, quantity: 1 }])
              }
              className="inline-flex h-14 items-center gap-2 rounded-full bg-ink px-8 text-sm font-medium text-cream transition-colors cursor-pointer  disabled:opacity-60"
            >
              Commander — {formatMoney(variant.price)}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
          <a
            href="#fonctionnalites"
            className="inline-flex h-14 items-center rounded-full border border-line bg-card/60 px-8 text-sm font-medium text-ink backdrop-blur transition-colors"
          >
            Fonctionnalités →
          </a>
        </div>

        {/* Bottom metadata bar */}
        <div className="flex items-center justify-between border-t border-white/20 py-5 text-xs uppercase tracking-[0.2em] text-white/80">
          <div className="flex items-center gap-6">
            <span>Est. 2026</span>
            <span>// Arini Lock</span>
          </div>
          <span className="hidden sm:block">
            Maison connectée · Conçu pour le Maroc
          </span>
        </div>
      </div>
    </section>
  );
}

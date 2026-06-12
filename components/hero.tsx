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
      <Image
        src={lockImg}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-[center_30%] md:object-center"
        priority
      />

      {/* ─── MOBILE LAYOUT (hidden on md+) ─── */}
      <div className="relative flex min-h-svh flex-col md:hidden">
        {/* Gradient: transparent top → heavy bottom */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/90" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between px-5 pt-6 text-[10px] uppercase tracking-[0.25em] text-white/60">
          <span>Arini Lock</span>
          <span>Est. 2026</span>
        </div>

        <div className="flex-1" />

        {/* Bottom content panel */}
        <div className="relative px-5 pb-8">
          {/* Eyebrow */}
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
            Édition de lancement · Maroc
          </p>

          {/* Headline — stacked, left-aligned */}
          <h1
            className="mb-1 font-display leading-[0.9] text-white"
            style={{
              fontSize: "clamp(3.8rem, 18vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Votre
          </h1>
          <h1
            className="font-display leading-[0.9] text-white"
            style={{
              fontSize: "clamp(3.8rem, 18vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Porte.
          </h1>
          <p
            className="mb-8 ml-1 mt-2 -rotate-1 font-script leading-none"
            style={{
              fontSize: "clamp(1.8rem, 8vw, 2.8rem)",
              background:
                "linear-gradient(135deg, #fdf3e0 0%, #f0d9a8 50%, #e0c080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 12px rgba(196,154,101,0.5))",
            }}
          >
            Réinventée.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            {isLoading || !variant ? (
              <Skeleton className="h-14 w-full rounded-full" />
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  addToCart([{ merchandiseId: variant.id, quantity: 1 }])
                }
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-dark transition-colors disabled:opacity-60"
              >
                Commander — {formatMoney(variant.price)}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
            <a
              href="#fonctionnalites"
              className="flex h-12 w-full items-center justify-center rounded-full border border-white/25 text-sm font-medium text-white/80 backdrop-blur-sm"
            >
              Découvrir les fonctionnalités →
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/35">
            <span>Wifi · BT</span>
            <span>·</span>
            <span>12 mois batterie</span>
            <span>·</span>
            <span>Garantie 2 ans</span>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (hidden below md) ─── */}
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/30 via-black/10 to-black/40 md:block" />

      <div className="pointer-events-none absolute inset-0 hidden select-none items-start justify-between px-8 pt-32 md:flex lg:px-16 lg:pt-44">
        <h1
          className="mt-10 font-display leading-none text-white drop-shadow-lg lg:mt-20"
          style={{
            fontSize: "clamp(3rem, 12vw, 11rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Votre
        </h1>
        <div className="text-right">
          <span
            className="block font-display -mt-1 leading-none text-white drop-shadow-lg"
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
              background:
                "linear-gradient(135deg, #fdf3e0 0%, #f0d9a8 45%, #e0c080 100%)",
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

      <div className="relative mx-auto hidden min-h-screen max-w-7xl flex-col px-6 pt-24 md:flex lg:px-10">
        <div className="flex items-center justify-between py-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/90">
            Édition de lancement · 2026
          </p>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-white/90 lg:block">
            Maroc
          </p>
        </div>

        <div className="flex-1" />

        <div className="flex flex-wrap items-center justify-center gap-4 pb-12">
          {isLoading || !variant ? (
            <Skeleton className="h-14 w-60 rounded-full" />
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                addToCart([{ merchandiseId: variant.id, quantity: 1 }])
              }
              className="inline-flex h-14 items-center gap-2 rounded-full bg-ink px-8 text-sm font-medium text-cream transition-colors hover:bg-ink/80 disabled:opacity-60"
            >
              Commander — {formatMoney(variant.price)}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
          <a
            href="#fonctionnalites"
            className="inline-flex h-14 items-center rounded-full border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/50"
          >
            Fonctionnalités →
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 py-5 text-xs uppercase tracking-[0.2em] text-white/80">
          <div className="flex items-center gap-6">
            <span>Est. 2026</span>
            <span>// Arini Lock</span>
          </div>
          <span>Maison connectée · Conçu pour le Maroc</span>
        </div>
      </div>
    </section>
  );
}

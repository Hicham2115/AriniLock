"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/nano-banana-2_3D_render_of_a_premium_smart_door_lock_handle_brushed_gold_and_matte_black_finis-0.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/use-cart";
import { useMainProduct } from "@/hooks/use-product";
import { useUiStore } from "@/stores/ui-store";
import { formatMoney } from "@/types/shopify";

const ease = [0.25, 0.1, 0.25, 1] as const;
const HIDDEN = { opacity: 0, y: 22 } as const;
const VISIBLE = { opacity: 1, y: 0 } as const;

function fadeUp(ready: boolean, delay = 0) {
  return {
    initial: HIDDEN,
    animate: ready ? VISIBLE : HIDDEN,
    transition: { duration: 0.85, ease, delay },
  };
}

export function Hero() {
  const { data: product, isLoading } = useMainProduct();
  const { addToCart, isPending } = useAddToCart();
  const variant = product?.variants[0];
  const ready = useUiStore((s) => s.loadingScreenDone);

  return (
    <section className="relative overflow-hidden">
      {/* Background image with subtle zoom-in — starts when loading screen exits */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={ready ? { scale: 1 } : { scale: 1.07 }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={lockImg}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[center_30%] md:object-center"
          priority
        />
      </motion.div>

      {/* ─── MOBILE LAYOUT (hidden on md+) ─── */}
      <div className="relative flex min-h-svh flex-col md:hidden">
        {/* Gradient: transparent top → heavy bottom */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/90" />

        {/* Top bar */}
        <motion.div
          {...fadeUp(ready, 0.15)}
          className="relative flex items-center justify-between px-5 pt-6 text-[10px] uppercase tracking-[0.25em] text-white/60"
        >
          <span>Arini Lock</span>
          <span>Marque marocaine</span>
        </motion.div>

        <div className="flex-1" />

        {/* Bottom content panel */}
        <div className="relative px-5 pb-8">
          {/* Eyebrow */}
          <motion.p {...fadeUp(ready, 0.3)} className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
            Édition de lancement · Maroc
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(ready, 0.45)}
            className="mb-1 font-display leading-[0.9] text-white"
            style={{ fontSize: "clamp(3.8rem, 18vw, 5.5rem)", letterSpacing: "-0.03em" }}
          >
            Votre
          </motion.h1>
          <motion.h1
            {...fadeUp(ready, 0.58)}
            className="font-display leading-[0.9] text-white"
            style={{ fontSize: "clamp(3.8rem, 18vw, 5.5rem)", letterSpacing: "-0.03em" }}
          >
            Porte.
          </motion.h1>
          <motion.p
            {...fadeUp(ready, 0.72)}
            className="mb-8 ml-1 mt-2 -rotate-1 font-script leading-none"
            style={{
              fontSize: "clamp(1.8rem, 8vw, 2.8rem)",
              background: "linear-gradient(135deg, #fdf3e0 0%, #f0d9a8 50%, #e0c080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 12px rgba(196,154,101,0.5))",
            }}
          >
            Réinventée.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(ready, 0.88)} className="flex flex-col gap-3">
            {isLoading || !variant ? (
              <Skeleton className="h-14 w-full rounded-full" />
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={() => addToCart([{ merchandiseId: variant.id, quantity: 1 }])}
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
          </motion.div>

          {/* Trust strip */}
          <motion.div
            {...fadeUp(ready, 1.02)}
            className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/35"
          >
            <span>Wifi · BT</span>
            <span>·</span>
            <span>12 mois batterie</span>
            <span>·</span>
            <span>Garantie 2 ans</span>
          </motion.div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (hidden below md) ─── */}
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/30 via-black/10 to-black/40 md:block" />

      <div className="pointer-events-none absolute inset-0 hidden select-none items-start justify-between px-8 pt-32 md:flex lg:px-16 lg:pt-44">
        <motion.h1
          {...fadeUp(ready, 0.35)}
          className="mt-10 font-display leading-none text-white drop-shadow-lg lg:mt-20"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)", letterSpacing: "-0.02em" }}
        >
          Votre
        </motion.h1>
        <div className="text-right">
          <motion.span
            {...fadeUp(ready, 0.5)}
            className="block font-display -mt-1 leading-none text-white drop-shadow-lg"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)", letterSpacing: "-0.02em" }}
          >
            Porte.
          </motion.span>
          <motion.p
            {...fadeUp(ready, 0.65)}
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
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto hidden min-h-screen max-w-7xl flex-col px-6 pt-24 md:flex lg:px-10">
        <motion.div
          {...fadeUp(ready, 0.2)}
          className="flex items-center justify-between py-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/90">
            Édition de lancement · Maroc
          </p>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-white/90 lg:block">
            Maroc
          </p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          {...fadeUp(ready, 0.82)}
          className="flex flex-wrap items-center justify-center gap-4 pb-12"
        >
          {isLoading || !variant ? (
            <Skeleton className="h-14 w-60 rounded-full" />
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() => addToCart([{ merchandiseId: variant.id, quantity: 1 }])}
              className="inline-flex h-14 items-center gap-2 rounded-full group bg-ink px-8 text-sm font-medium cursor-pointer text-cream transition-colors disabled:opacity-60"
            >
              Commander — {formatMoney(variant.price)}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          )}
          <a
            href="#fonctionnalites"
            className="inline-flex group h-14 items-center rounded-full border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/50"
          >
            Fonctionnalités
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 ml-1 opacity-80 group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(ready, 0.96)}
          className="flex items-center justify-between border-t border-white/20 py-5 text-xs uppercase tracking-[0.2em] text-white/80"
        >
          <div className="flex items-center gap-6">
            <span>Marque marocaine</span>
            <span>// Arini Lock</span>
          </div>
          <span>Maison connectée · Conçu pour le Maroc</span>
        </motion.div>
      </div>
    </section>
  );
}

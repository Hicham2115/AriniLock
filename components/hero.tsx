"use client";

import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/Untitled design_LE_upscale_prime.png";
import mobileHeroImg from "@/app/assets/mobile hero.png";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useMainProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { useUiStore } from "@/stores/ui-store";

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
  const t = useT();
  const formatMoney = useFormatMoney();
  const { data: product } = useMainProduct();
  const variant = product?.variants[0];
  const ready = useUiStore((s) => s.loadingScreenDone);

  return (
    <section className="relative overflow-hidden">
      {/* Background image with subtle zoom-in — starts when loading screen exits */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={ready ? { scale: 1 } : { scale: 1.02 }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Mobile hero image */}
        <Image
          src={mobileHeroImg}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center md:hidden"
          priority
        />
        {/* Desktop hero image */}
        <Image
          src={lockImg}
          alt=""
          aria-hidden="true"
          fill
          className="hidden object-cover object-center md:block"
          priority
        />
      </motion.div>

      {/* ─── MOBILE LAYOUT (hidden on md+) ─── */}
      <div className="relative flex min-h-svh flex-col md:hidden">
        {/* Multi-stop gradient for richer depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 via-40% to-black/95" />

        <div className="flex-1" />

        {/* Bottom content panel */}
        <div className="relative px-5 pb-10">
          {/* Edition badge */}
          {/* <motion.div
            {...fadeUp(ready, 0.32)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 backdrop-blur-sm"
          >
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold/90">
              {t.hero.editionLabel}
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            {...fadeUp(ready, 0.45)}
            className="mb-0 font-display leading-[0.88] text-white"
            style={{
              fontSize: "clamp(4rem, 20vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {t.hero.headline1}
          </motion.h1>
          <motion.h1
            {...fadeUp(ready, 0.56)}
            className="font-display leading-[0.88] text-white"
            style={{
              fontSize: "clamp(4rem, 20vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {t.hero.headline2}
          </motion.h1>
          <motion.p
            {...fadeUp(ready, 0.68)}
            className="mb-8 ml-1 mt-3 -rotate-1 font-script leading-none"
            style={{
              fontSize: "clamp(2rem, 9vw, 3rem)",
              background:
                "linear-gradient(135deg, #fdf3e0 0%, #f0d9a8 50%, #e0c080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 16px rgba(196,154,101,0.6))",
            }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(ready, 0.82)} className="flex flex-col gap-3">
            <NextLink
              href="/produits"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-dark shadow-[0_8px_32px_rgba(196,154,101,0.4)] transition-colors"
            >
              {t.hero.buy}
              {variant ? ` — ${formatMoney(variant.price)}` : ""}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </NextLink>
            <a
              href="#fonctionnalites"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-medium text-white/75 backdrop-blur-sm"
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 order-last rtl:order-first"
              />
              {t.hero.discover}
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            {...fadeUp(ready, 0.96)}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            {t.hero.trust.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (hidden below md) ─── */}
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/30 via-black/10 to-black/40 md:block" />

      <div className="pointer-events-none absolute inset-0 hidden select-none items-start justify-between px-8 pt-32 md:flex lg:px-16 lg:pt-44 rtl:pr-[10vw] lg:rtl:pr-[12vw]">
        <motion.h1
          {...fadeUp(ready, 0.35)}
          className="mt-10 font-display leading-none text-white drop-shadow-lg lg:mt-20"
          style={{
            fontSize: "clamp(3rem, 12vw, 11rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {t.hero.headline1}
        </motion.h1>
        <div className="text-right rtl:text-left rtl:mr-[26vw]">
          <motion.span
            {...fadeUp(ready, 0.5)}
            className="block font-display -mt-1 leading-none text-white drop-shadow-lg"
            style={{
              fontSize: "clamp(3rem, 12vw, 11rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t.hero.headline2}
          </motion.span>
          <motion.p
            {...fadeUp(ready, 0.65)}
            className="mt-2 -rotate-2 font-script leading-none rtl:translate-x-[10vw]"
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
            {t.hero.tagline}
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto hidden min-h-screen max-w-7xl flex-col px-6 pt-24 md:flex lg:px-10">
        <motion.div
          {...fadeUp(ready, 0.2)}
          className="flex items-center justify-between py-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/90">
            {t.hero.editionLabel}
          </p>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-white/90 lg:block">
            {t.hero.countryLabel}
          </p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          {...fadeUp(ready, 0.82)}
          className="flex flex-wrap items-center justify-center gap-4 pb-12"
        >
          
            <NextLink
              href="/produits"
              className="group inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-ink px-8 text-sm font-medium text-cream transition-colors"
            >
              {t.hero.buy}
              {variant ? ` — ${formatMoney(variant.price)}` : ""}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </NextLink>
          <a
            href="#fonctionnalites"
            className="inline-flex group h-14 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/50"
          >
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 opacity-80 order-last rtl:order-first transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
            />
            {t.hero.discover}
          </a>
        </motion.div>

        <motion.div
          {...fadeUp(ready, 0.96)}
          className="flex items-center justify-between border-t border-white/20 py-5 text-xs uppercase tracking-[0.2em] text-white/80"
        >
          <div className="flex items-center gap-6">
            <span>{t.hero.brandLine}</span>
            <span>{t.hero.brandSlug}</span>
          </div>
          <span>{t.hero.bottomLine}</span>
        </motion.div>
      </div>
    </section>
  );
}

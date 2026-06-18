"use client";

import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/Gemini_Generated_Image_ftfrrhftfrrhftfr.png";
import mobileHero2Img from "@/app/assets/mobile hero2.png";
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
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={ready ? { scale: 1 } : { scale: 1.02 }}
        transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={mobileHero2Img}
          alt=""
          aria-hidden="true"
          fill
          className="object-contain object-center md:hidden"
          priority
        />
        <Image
          src={lockImg}
          alt=""
          aria-hidden="true"
          fill
          className="hidden object-contain object-center md:block"
          priority
        />
      </motion.div>

      {/* ─── MOBILE LAYOUT ─── */}
      <div className="relative flex min-h-svh flex-col md:hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 via-40% to-black/95" />
        <div className="flex-1" />
        <div className="relative px-5 pb-10">
          {/* <motion.h1
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
              color: "#4a7ab5",
            }}
          >
            {t.hero.tagline}
          </motion.p> */}

          <motion.div {...fadeUp(ready, 0.82)} className="flex flex-col gap-3">
            <NextLink
              href="/produits"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white shadow-[0_8px_32px_rgba(3,34,69,0.5)] transition-colors hover:bg-primary/90"
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

          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="absolute inset-0 hidden bg-linear-to-b from-black/30 via-black/10 to-black/40 md:block" />

      {/* <div className="pointer-events-none absolute inset-0 hidden select-none items-start justify-between px-8 pt-32 md:flex lg:px-16 lg:pt-44 rtl:pr-[10vw] lg:rtl:pr-[12vw]">
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
              color: "#4a7ab5",
            }}
          >
            {t.hero.tagline}
          </motion.p>
        </div>
      </div> */}

      <div className="relative mx-auto hidden min-h-screen max-w-7xl flex-col px-6 pt-24 md:flex lg:px-10">
        {/* <motion.div
          {...fadeUp(ready, 0.2)}
          className="flex items-center justify-between py-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/90">
            {t.hero.editionLabel}
          </p>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-white/90 lg:block">
            {t.hero.countryLabel}
          </p>
        </motion.div> */}

        <div className="flex-1" />

        <motion.div
          {...fadeUp(ready, 0.82)}
          className="flex flex-wrap items-center justify-center gap-4 pb-12"
        >
          <NextLink
            href="/produits"
            className="group inline-flex h-14 cursor-pointer items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-white shadow-[0_8px_32px_rgba(3,34,69,0.4)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_40px_rgba(3,34,69,0.6)]"
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

        {/* <motion.div
          {...fadeUp(ready, 0.96)}
          className="flex items-center justify-between border-t border-white/20 py-5 text-xs uppercase tracking-[0.2em] text-white/80"
        >
          <div className="flex items-center gap-6">
            <span>{t.hero.brandLine}</span>
            <span>{t.hero.brandSlug}</span>
          </div>
          <span>{t.hero.bottomLine}</span>
        </motion.div> */}
      </div>
    </section>
  );
}

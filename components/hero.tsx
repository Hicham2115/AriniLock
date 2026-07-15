"use client";

import Image from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/Gemini_Generated_Image_ftfrrhftfrrhftfr.png";
import arHeroImg from "@/app/assets/ar hero.png";
import mobileHero2Img from "@/app/assets/mobile hero2.png";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useMainProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { useLanguageStore } from "@/stores/language-store";
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
  const locale = useLanguageStore((s) => s.locale);
  const isAr = locale === "ar";
  const desktopHeroImg = isAr ? arHeroImg : lockImg;
  const mobileHeroImg = isAr ? arHeroImg : mobileHero2Img;

  return (
    <section className="relative overflow-hidden">
      {/* ─── MOBILE LAYOUT ─── */}
      <div className="relative flex min-h-svh flex-col md:hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.02 }}
          animate={ready ? { scale: 1 } : { scale: 1.02 }}
          transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={mobileHeroImg}
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 via-40% to-black/95" />
        <div className="relative mt-auto px-5 pb-10">
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
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="relative hidden md:block pt-25">
        <motion.div
          initial={{ scale: 1.02 }}
          animate={ready ? { scale: 1 } : { scale: 1.02 }}
          transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={desktopHeroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-10 px-6">
          <motion.div
            {...fadeUp(ready, 0.82)}
            className="flex flex-wrap items-center justify-center gap-4"
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
        </div>
      </div>
    </section>
  );
}

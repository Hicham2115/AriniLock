"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CreditCard,
  Fingerprint,
  Home,
  Key,
  KeyRound,
  MessageCircle,
  Monitor,
  Shield,
  Smartphone,
  Star,
  Truck,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/hooks/use-t";

import imgAsset1 from "./assets/Untitled design.png";
import imgAsset2 from "./assets/Gemini_Generated_Image_yu0rvhyu0rvhyu0r.png";
import imgAsset3 from "./assets/Gemini_Generated_Image_csl2xhcsl2xhcsl2.png";
import imgAsset4 from "./assets/Gemini_Generated_Image_uec5yluec5yluec5.png";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrderForm } from "@/components/order-form";
import { OrderModal } from "@/components/order-modal";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const PRICE = "2 590 dh";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── icon + image arrays (non-translatable) ─── */
const UNLOCK_ICONS = [Fingerprint, KeyRound, CreditCard, Smartphone, Users, Key] as const;
const FEATURE_META = [
  { img: imgAsset2, icon: Monitor },
  { img: imgAsset3, icon: Home },
  { img: imgAsset4, icon: AlertTriangle },
] as const;
const STATS_META = [
  { to: 6,   decimals: 0, decimalSep: "." },
  { to: 200, decimals: 0, decimalSep: "." },
  { to: 4.5, decimals: 1, decimalSep: "," },
  { to: 2,   decimals: 0, decimalSep: "." },
] as const;

/* ─── HELPERS ─── */

function Img({
  label,
  src,
  className = "",
  objectFit = "object-cover",
}: {
  label: string;
  src: StaticImageData;
  className?: string;
  objectFit?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white",
        className,
      )}
    >
      <Image
        src={src}
        alt={label}
        fill
        className={objectFit}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

function CountUp({
  to,
  decimals = 0,
  decimalSep = ".",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  decimals?: number;
  decimalSep?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [isInView, count, to, duration]);

  useEffect(() => {
    const unsubscribe = count.on("change", (v) => {
      if (!ref.current) return;
      const fixed = v.toFixed(decimals);
      const [int, dec] = fixed.split(".");
      ref.current.textContent =
        (decimals > 0 ? int + decimalSep + dec : int) + suffix;
    });
    return unsubscribe;
  }, [count, decimals, decimalSep, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(n)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-primary text-primary"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-foreground">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── STICKY BUY BAR (bottom) ─── */

function StickyBar({
  visible,
  onOrder,
  reviewsLabel,
  buttonLabel,
}: {
  visible: boolean;
  onOrder: () => void;
  reviewsLabel: string;
  buttonLabel: string;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-2 lg:px-0 lg:pb-6"
          style={{ pointerEvents: "none" }}
        >
          {/* Mobile — full-width bottom bar */}
          <div
            className="mx-auto flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-2px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:hidden"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">
                ARINILOCK M1 Pro
              </span>
              <Stars />
            </div>
            <button
              onClick={onOrder}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {buttonLabel}
            </button>
          </div>

          {/* Desktop — floating pill centred */}
          <div
            className="mx-auto hidden w-fit items-center gap-5 rounded-full border border-gray-200 bg-white/95 px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:flex"
            style={{ pointerEvents: "auto" }}
          >
            <span className="text-sm font-semibold text-foreground">
              ARINILOCK M1 Pro
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <Stars />
            <span className="text-xs text-muted-foreground">{reviewsLabel}</span>
            <div className="h-4 w-px bg-gray-200" />
            <button
              onClick={onOrder}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {buttonLabel}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── PAGE ─── */

export function M1ProClient() {
  const t = useT();
  const p = t.m1pro;

  const UNLOCK_METHODS = p.unlockMethods.map((m, i) => ({ ...m, icon: UNLOCK_ICONS[i] }));
  const FEATURES       = p.features.map((f, i)      => ({ ...f, ...FEATURE_META[i] }));
  const STATS          = p.stats.map((s, i)          => ({ ...s, ...STATS_META[i] }));
  const SPECS          = p.specs;
  const FAQS           = p.faqs;
  const REVIEWS        = p.reviews.map((r) => ({ ...r, stars: 5 as const }));

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const [orderOpen, setOrderOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setBarVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        productName="ARINILOCK M1 Pro"
        price={PRICE}
      />
      <Header />
      <CartDrawer />
      <StickyBar visible={barVisible} onOrder={() => setOrderOpen(true)} reviewsLabel={p.stickyReviews} buttonLabel={p.stickyButton} />

      <main className="bg-white">
        {/* ══ PAGE 1 — HERO ══ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-white pt-28 pb-0 lg:pt-32"
        >
          {/* thin gold accent line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left — copy */}
              <div className="order-2 pb-16 lg:order-1 lg:pb-24">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary"
                >
                  <Zap className="h-2.5 w-2.5" aria-hidden="true" />
                  {p.heroBadge}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease, delay: 0.08 }}
                  className="font-display2 leading-[0.88] text-foreground"
                  style={{ fontSize: "clamp(3.8rem, 9vw, 7.5rem)" }}
                >
                  ARINILOCK
                  <br />
                  <em className="not-italic text-primary">M1 Pro</em>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.2 }}
                  className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
                >
                  {p.heroDesc}
                </motion.p>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <Stars />
                  <span className="text-xs font-semibold text-foreground">4,9</span>
                  <span className="text-xs text-muted-foreground">· {p.heroRating}</span>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.42 }}
                  className="mt-9 flex flex-wrap gap-3"
                >
                  <button
                    onClick={() => setOrderOpen(true)}
                    className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-[0_6px_28px_rgba(22,40,71,0.28)] transition-all hover:shadow-[0_10px_36px_rgba(22,40,71,0.42)]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {p.heroCta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <a
                    href="#fonctionnalites"
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-gray-200 bg-white px-7 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/4"
                  >
                    {p.heroCtaSecondary}
                  </a>
                </motion.div>

                {/* Trust pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.56 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {([Truck, BadgeCheck, Shield] as const).map((Icon, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-primary/60"
                        aria-hidden="true"
                      />
                      {p.heroTrust[idx]}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right — product image */}
              <div className="order-1 lg:order-2">
                <motion.div style={{ y: imgY }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.1, ease, delay: 0.15 }}
                  >
                    <Img
                      src={imgAsset1}
                      label={p.heroImageAlt}
                      className="aspect-3/4 w-full lg:rounded-none lg:rounded-tl-[2.5rem] lg:rounded-tr-[2.5rem]"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TICKER / STRIP ══ */}
        <div className="overflow-hidden border-y border-gray-100 bg-primary py-3.5">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-6 px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                {p.ticker.map((item, j) => (
                  <span key={j} className="flex items-center gap-6">
                    <span>{item}</span>
                    <span className="text-white/30">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══ PAGE 2 — FONCTIONNALITÉS, STATS & SPECS (condensé) ══ */}
        <section
          id="fonctionnalites"
          className="scroll-mt-20 border-b border-gray-100 px-6 py-20 lg:px-10 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                {p.unlockSection}
              </p>
              <h2
                className="font-display2 max-w-lg leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              >
                {p.unlockTitle}
              </h2>
            </Reveal>

            {/* Méthodes d'accès */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UNLOCK_METHODS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.05}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-[0_4px_24px_rgba(22,40,71,0.07)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                      <m.icon
                        className="h-5 w-5 text-primary/60 transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Points forts — cartes compactes (remplace les 3 sections plein écran) */}
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.tag} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5">
                    <Img src={f.img} label={f.tag} className="aspect-4/3 w-full" objectFit="object-contain" />
                    <div className="mt-4 flex items-center gap-2">
                      <f.icon className="h-4 w-4 text-primary/60" aria-hidden="true" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                        {f.tag}
                      </p>
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
                      {f.title.split("\n").join(" ")}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Stats — rangée compacte */}
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-primary/10 lg:grid-cols-4">
              {STATS.map(({ to, decimals, decimalSep, suffix, l }, i) => (
                <Reveal key={l} delay={i * 0.05}>
                  <div className="flex flex-col items-center gap-1 bg-primary px-4 py-8 text-center">
                    <span
                      className="font-display2 leading-none text-white"
                      style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
                    >
                      <CountUp
                        to={to}
                        decimals={decimals}
                        decimalSep={decimalSep}
                        suffix={suffix}
                      />
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {l}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Spécifications — liste compacte */}
            <div className="mt-14">
              <Reveal>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                  {p.specsSection}
                </p>
                <h3 className="font-display2 text-2xl text-foreground">
                  {p.specsTitle}
                </h3>
              </Reveal>
              <div className="mt-6 grid divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-10">
                {SPECS.map(({ label, value }, i) => (
                  <Reveal key={label} delay={i * 0.03}>
                    <div className="flex items-baseline justify-between gap-6 border-gray-100 py-3 sm:border-b">
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                        {label}
                      </span>
                      <span className="text-right text-sm font-medium text-foreground">
                        {value}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PAGE 3 — COMMANDER ══ */}
        <section
          id="commander"
          className="border-y border-gray-100 bg-[#fafaf9] px-6 py-20 lg:px-10 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left — pitch */}
              <Reveal>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                  {p.orderSection}
                </p>
                <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground lg:text-5xl">
                  {p.orderTitle}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {p.orderDesc}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {p.orderBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-foreground"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Right — form */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <p className="mb-6 text-center text-sm font-semibold text-foreground">
                    {p.orderFormTitle}
                  </p>
                  <OrderForm productName="ARINILOCK M1 Pro" price={PRICE} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ AVIS & FAQ (condensé) ══ */}
        <section className="border-b border-gray-100 bg-white px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              {/* Reviews */}
              <div>
                <Reveal>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    {p.reviewsSection}
                  </p>
                  <div className="flex items-end gap-5">
                    <h2 className="font-display2 text-3xl leading-[0.9] text-foreground lg:text-4xl">
                      {p.reviewsTitle}
                    </h2>
                    <div className="mb-1 flex flex-col gap-1">
                      <Stars />
                      <span className="text-xs text-muted-foreground">
                        {p.reviewsRating}
                      </span>
                    </div>
                  </div>
                </Reveal>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {REVIEWS.map((r, i) => (
                    <Reveal key={r.name} delay={i * 0.06}>
                      <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
                        <div>
                          <Stars n={r.stars} />
                          <p className="mt-3 text-sm leading-relaxed text-foreground">
                            &ldquo;{r.body}&rdquo;
                          </p>
                        </div>
                        <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {r.name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              {r.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {r.city}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <Reveal>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    {p.faqSection}
                  </p>
                  <h2 className="font-display2 text-3xl leading-[0.9] text-foreground lg:text-4xl">
                    {p.faqTitle}
                  </h2>
                </Reveal>
                <div className="mt-8">
                  {FAQS.map((faq) => (
                    <FaqItem key={faq.q} {...faq} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA (compact) ══ */}
        <section className="relative overflow-hidden bg-primary px-6 py-16 lg:px-10 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              <Wifi className="h-3 w-3" aria-hidden="true" />
              {p.ctaBadge}
            </div>
            <h2
              className="font-display2 leading-[0.95] text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              {p.ctaTitle}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setOrderOpen(true)}
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-white px-8 text-sm font-bold text-primary shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_14px_50px_rgba(0,0,0,0.3)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {p.ctaButton}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

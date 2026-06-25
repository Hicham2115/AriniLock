"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  CreditCard,
  Fingerprint,
  Hand,
  Home,
  Key,
  KeyRound,
  MessageCircle,
  Monitor,
  ScanFace,
  Shield,
  Smartphone,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import { useEffect, useRef, useState } from "react";

import i60img5 from "./assets/Gemini_Generated_Image_8buncu8buncu8bun.png";
import i60img6 from "./assets/4.png";
import i60img8 from "./assets/8.png";
import i60img9 from "./assets/1.png";
import i60gemA from "./assets/2.png";
import i60gemB from "./assets/Gemini_Generated_Image_8buncu8buncu8bun.png";
import i60gemC from "./assets/5.png";
import i60gemD from "./assets/3.png";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrderForm } from "@/components/order-form";
import { OrderModal } from "@/components/order-modal";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

const PRICE = "3 490 dh";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── icon + image arrays (non-translatable) ─── */
const UNLOCK_ICONS = [
  ScanFace,
  Hand,
  Fingerprint,
  KeyRound,
  CreditCard,
  Smartphone,
  Key,
] as const;
const FEATURE_META = [
  { img: i60img9, icon: ScanFace, reverse: false },
  { img: i60img8, icon: Camera, reverse: true },
  { img: i60img6, icon: AlertTriangle, reverse: false },
] as const;
const STATS_META = [
  { to: 7, decimals: 0, decimalSep: "." },
  { to: 0.5, decimals: 1, decimalSep: "," },
  { to: 100, decimals: 0, decimalSep: "." },
  { to: 2, decimals: 0, decimalSep: "." },
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
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
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
          {/* Mobile */}
          <div
            className="mx-auto flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-2px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:hidden"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">
                AriniLock I 60
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

          {/* Desktop */}
          <div
            className="mx-auto hidden w-fit items-center gap-5 rounded-full border border-gray-200 bg-white/95 px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:flex"
            style={{ pointerEvents: "auto" }}
          >
            <span className="text-sm font-semibold text-foreground">
              AriniLock I 60
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <Stars />
            <span className="text-xs text-muted-foreground">
              {reviewsLabel}
            </span>
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

export function I60Client() {
  const t = useT();
  const q = t.i60;

  const UNLOCK_METHODS = q.unlockMethods.map((m, i) => ({
    ...m,
    icon: UNLOCK_ICONS[i],
  }));
  const FEATURES = q.features.map((f, i) => ({ ...f, ...FEATURE_META[i] }));
  const STATS = q.stats.map((s, i) => ({ ...s, ...STATS_META[i] }));
  const STEPS = q.steps;
  const SPECS = q.specs;
  const REVIEWS = q.reviews.map((r) => ({ ...r, stars: 5 as const }));

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
        productName="AriniLock I 60"
        price={PRICE}
      />
      <Header />
      <CartDrawer />
      <StickyBar
        visible={barVisible}
        onOrder={() => setOrderOpen(true)}
        reviewsLabel={q.stickyReviews}
        buttonLabel={q.stickyButton}
      />

      <main className="bg-white">
        {/* ══ 01 HERO ══ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-white pb-0 pt-28 lg:pt-32"
        >
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
                  {q.heroBadge}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease, delay: 0.08 }}
                  className="font-display2 leading-[0.88] text-foreground"
                  style={{ fontSize: "clamp(3.8rem, 9vw, 7.5rem)" }}
                >
                  AriniLock
                  <br />
                  <em className="not-italic text-primary">I 60</em>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.2 }}
                  className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
                >
                  {q.heroDesc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <Stars />
                  <span className="text-xs font-semibold text-foreground">
                    4,8
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · {q.heroRating}
                  </span>
                </motion.div>

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
                    {q.heroCta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <a
                    href="#comment-ca-marche"
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-gray-200 bg-white px-7 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/4"
                  >
                    {q.heroCtaSecondary}
                  </a>
                </motion.div>

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
                      {q.heroTrust[idx]}
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
                      src={i60img5}
                      label="Photo produit I 60 — Vue principale"
                      className="aspect-3/4 w-full lg:rounded-none lg:rounded-tl-[2.5rem] lg:rounded-tr-[2.5rem]"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TICKER ══ */}
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
                {q.ticker.map((item, j) => (
                  <span key={j} className="flex items-center gap-6">
                    <span>{item}</span>
                    <span className="text-white/30">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══ 02 UNLOCK METHODS ══ */}
        <section className="scroll-mt-20 border-b border-gray-100 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                {q.unlockSection}
              </p>
              <h2
                className="font-display2 max-w-lg leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                {q.unlockTitle}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UNLOCK_METHODS.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-[0_4px_24px_rgba(22,40,71,0.07)]">
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
          </div>
        </section>

        {/* ══ 03 FEATURES ══ */}
        {FEATURES.filter((_, fi) => fi !== 1).map((f, fi) => (
          <section
            key={f.tag}
            className="border-b border-gray-100 bg-white px-6 py-20 lg:px-10 lg:py-28"
          >
            <div className="mx-auto max-w-7xl">
              <Reveal delay={0.05}>
                <div
                  className={cn(
                    "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
                    fi % 2 === 1 && "lg:flex-row-reverse",
                  )}
                >
                  {/* Image */}
                  <div className="w-full lg:w-[55%]">
                    <Img
                      src={f.img}
                      label={f.tag}
                      className="aspect-3/4 w-full"
                      objectFit="object-contain"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-full lg:w-1/2">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                        <f.icon
                          className="h-4 w-4 text-primary/60"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/60">
                        {f.tag}
                      </p>
                    </div>
                    <h3 className="font-display2 text-3xl leading-tight text-foreground lg:text-4xl">
                      {f.title.split("\n").join(" ")}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {f.detail}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* ══ STATS ══ */}
        <section className="border-b border-gray-100 bg-primary px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
              {STATS.map(({ to, decimals, decimalSep, suffix, l }, i) => (
                <Reveal key={l} delay={i * 0.07}>
                  <div className="flex flex-col items-center gap-2 bg-primary px-6 py-12 text-center">
                    <span
                      className="font-display2 leading-none text-white"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
                    >
                      <CountUp
                        to={to}
                        decimals={decimals}
                        decimalSep={decimalSep ?? "."}
                        suffix={suffix}
                      />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {l}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INSTALLATION STEPS ══ */}
        <section
          id="comment-ca-marche"
          className="scroll-mt-24 border-b border-gray-100 bg-white px-6 py-24 lg:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    {q.installSection}
                  </p>
                  <h2
                    className="font-display2 leading-[0.9] text-foreground"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    {q.installTitle}
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {q.installDesc}
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <Img
                    src={i60gemD}
                    label="Installation AriniLock I 60"
                    className="mt-8 aspect-video w-full"
                  />
                </Reveal>
              </div>

              <div className="flex flex-col gap-4">
                {STEPS.map((step, i) => (
                  <Reveal key={step.num} delay={i * 0.09}>
                    <div className="group flex gap-6 rounded-2xl border border-gray-100 bg-gray-50/60 p-7 transition-all hover:border-primary/20 hover:bg-white hover:shadow-[0_4px_20px_rgba(22,40,71,0.06)]">
                      <span
                        className="font-display2 shrink-0 leading-none text-primary/20 transition-colors duration-300 group-hover:text-primary/50"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3 className="mb-2 text-base font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ GALLERY ══ */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                {q.gallerySection}
              </p>
              <h2
                className="font-display2 leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                {q.galleryTitle}
              </h2>
            </Reveal>

            <div className="mt-14 flex flex-col gap-3">
              <Reveal delay={0.05}>
                <Img
                  src={i60gemA}
                  label="I 60 — face avant Push-Pull"
                  className="aspect-4/3 w-full lg:aspect-4/3"
                />
              </Reveal>
              <div className="grid grid-cols-3 gap-3">
                <Reveal delay={0.1}>
                  <Img
                    src={i60img8}
                    label="Caméra HD + capteur facial 3D"
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
                <Reveal delay={0.15}>
                  <Img
                    src={i60gemB}
                    label="Écran LCD intérieur couleur"
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
                <Reveal delay={0.2}>
                  <Img
                    src={i60gemC}
                    label="Lecteur de paume sans contact"
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SPECS ══ */}
        <section className="border-b border-gray-100 bg-white px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    {q.specsSection}
                  </p>
                  <h2
                    className="font-display2 leading-[0.9] text-foreground"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    {q.specsTitle}
                  </h2>
                </Reveal>
              </div>
              <div className="divide-y divide-gray-100">
                {SPECS.map(({ label, value }, i) => (
                  <Reveal key={label} delay={i * 0.04}>
                    <div className="flex items-baseline justify-between gap-6 py-5">
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

        {/* ══ REVIEWS ══ */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                {q.reviewsSection}
              </p>
              <div className="flex items-end gap-5">
                <h2
                  className="font-display2 leading-[0.9] text-foreground"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                >
                  {q.reviewsTitle}
                </h2>
                <div className="mb-2 flex flex-col gap-1">
                  <Stars />
                  <span className="text-xs text-muted-foreground">
                    {q.reviewsRating}
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-7">
                    <div>
                      <Stars n={r.stars} />
                      <p className="mt-4 text-sm leading-relaxed text-foreground">
                        &ldquo;{r.body}&rdquo;
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
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
        </section>

        {/* ══ ORDER FORM ══ */}
        <section
          id="commander"
          className="border-y border-gray-100 bg-[#fafaf9] px-6 py-24 lg:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <Reveal>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                  {q.orderSection}
                </p>
                <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground lg:text-5xl">
                  {q.orderTitle}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {q.orderDesc}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {q.orderBullets.map((item) => (
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
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <p className="mb-6 text-center text-sm font-semibold text-foreground">
                    {q.orderFormTitle}
                  </p>
                  <OrderForm productName="AriniLock I 60" price={PRICE} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

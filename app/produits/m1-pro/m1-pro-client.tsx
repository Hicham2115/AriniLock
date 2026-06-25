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
  Bell,
  Camera,
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
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import img5 from "./assets/Gemini_Generated_Image_jd7j31jd7j31jd7j.png";
import img6 from "./6.png";
import img7 from "./7.png";
import img8 from "./assets/Gemini_Generated_Image_vhx2uavhx2uavhx2.png";
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

/* ─── DATA ─── */

const UNLOCK_METHODS = [
  {
    icon: Fingerprint,
    label: "Empreinte digitale",
    desc: "Ultra-rapide < 1 seconde · jusqu'à 100 empreintes",
  },
  {
    icon: KeyRound,
    label: "Code PIN tactile",
    desc: "Anti-espionnage · code virtuel intégré",
  },
  {
    icon: CreditCard,
    label: "Carte RFID",
    desc: "Accès instantané · sans connexion internet",
  },
  {
    icon: Smartphone,
    label: "Application Tuya / Smart Life",
    desc: "WiFi 2,4 GHz · iOS & Android",
  },
  {
    icon: Users,
    label: "Mot de passe temporaire",
    desc: "Invités & locations courte durée",
  },
  {
    icon: Key,
    label: "Clé mécanique de secours",
    desc: "2 clés fournies · noyau classe C",
  },
];

const FEATURES = [
  {
    tag: "Visiophone",
    title: "Voyez.\nParlez.\nSans ouvrir.",
    body: "L'écran HD couleur 4,5\" intégré vous permet de visualiser vos visiteurs de jour comme de nuit. La caméra grand angle avec vision nocturne, le visiophone bidirectionnel et les notifications instantanées vous donnent un contrôle total — même à distance via Tuya / Smart Life.",
    detail: "Caméra HD grand angle · vision nocturne · capture automatique",
    img: imgAsset2,
    imgLabel: 'Écran HD 4,5" — interface visiophone',
    icon: Monitor,
    reverse: false,
  },
  {
    tag: "Application",
    title: "Votre porte,\npartout dans\nle monde.",
    body: "Gérez jusqu'à 200 utilisateurs, consultez l'historique détaillé des accès, déverrouillez à distance et créez des codes temporaires pour vos visiteurs ou livreurs. Notifications push instantanées, album photo intégré et compatibilité Alexa & Google Home inclus.",
    detail: "Compatible Alexa · Google Home · Tuya Smart / Smart Life",
    img: imgAsset3,
    imgLabel: "Interface app Tuya — gestion des accès",
    icon: Home,
    reverse: true,
  },
  {
    tag: "Sécurité",
    title: "Alarmes.\nAlertés.\nProtégés.",
    body: "Le M1 Pro intègre un système d'alarmes multi-niveaux : alerte batterie faible, alarme anti-effraction en cas de forçage, blocage après 5 codes erronés consécutifs et code virtuel anti-espionnage. Le bouton anti-lock intérieur protège également les enfants.",
    detail: "Noyau classe C · alarme intrusion · anti-verrouillage enfants",
    img: imgAsset4,
    imgLabel: "Panneau intérieur — bouton anti-lock & écran",
    icon: AlertTriangle,
    reverse: false,
  },
];

const SPECS = [
  { label: "Modèle", value: "AriniLock M1 Pro" },
  {
    label: "Matériau",
    value: "Alliage d'aluminium haute résistance · noir mat",
  },
  { label: "Dimensions", value: "380 × 75 mm" },
  { label: "Écran", value: '4,5" HD couleur' },
  { label: "Caméra", value: "HD grand angle · vision nocturne" },
  { label: "Noyau de serrure", value: "Classe C (haute sécurité)" },
  {
    label: "Épaisseur de porte",
    value: "40 à 120 mm · poignée réversible gauche/droite",
  },
  { label: "Capacité", value: "Jusqu'à 200 utilisateurs" },
  {
    label: "Méthodes d'accès",
    value: "Empreinte · PIN · RFID · App · Temporaire · Clé",
  },
  { label: "Alimentation", value: "4 piles AA + port Type-C de secours" },
  { label: "Température", value: "-15 °C à +60 °C" },
  { label: "Connectivité", value: "WiFi 2,4 GHz" },
  { label: "Application", value: "Tuya Smart / Smart Life (iOS & Android)" },
  { label: "Compatibilité vocale", value: "Amazon Alexa & Google Home" },
  { label: "Garantie", value: "2 ans pièces & service" },
  {
    label: "Livraison",
    value: "Express · partout au Maroc · installation incluse",
  },
];

const FAQS = [
  {
    q: "Avec quels types de portes est-il compatible ?",
    a: "L'AriniLock M1 Pro est compatible avec les portes en bois, acier, aluminium, inox et portes blindées — simples ou doubles battants, d'une épaisseur de 40 à 120 mm. En cas de doute, notre équipe vérifie la compatibilité gratuitement sur photo avant l'achat.",
  },
  {
    q: "Que se passe-t-il si la batterie est vide ?",
    a: "L'application vous alerte automatiquement dès que la batterie passe sous 20 %. En cas d'urgence, un port Type-C de secours permet une charge rapide pour ouvrir la porte. Les 2 clés mécaniques fournies restent toujours disponibles.",
  },
  {
    q: "Comment fonctionne le visiophone à distance ?",
    a: "Via l'application Tuya Smart / Smart Life, vous recevez une notification photo dès que quelqu'un sonne. Vous pouvez voir, parler et déverrouiller depuis n'importe où dans le monde via WiFi 2,4 GHz.",
  },
  {
    q: "Puis-je créer des accès temporaires pour Airbnb ?",
    a: "Oui — c'est l'une des forces du M1 Pro. Créez des codes PIN à durée limitée pour vos locataires sans jamais partager votre code principal. Idéal pour les villas, riads et locations courte durée.",
  },
  {
    q: "L'installation est-elle incluse ?",
    a: "Oui. Notre équipe de techniciens qualifiés effectue l'installation à domicile partout au Maroc. Un kit de pose complet et une notice d'installation sont également fournis dans la boîte.",
  },
];

const REVIEWS = [
  {
    name: "Youssef K.",
    city: "Casablanca",
    stars: 5,
    body: "L'écran intégré change tout — je vois qui sonne avant d'ouvrir. Parfait pour ma villa. La qualité est vraiment premium.",
  },
  {
    name: "Salma R.",
    city: "Marrakech",
    stars: 5,
    body: "Idéal pour mon riad Airbnb. Je gère les codes à distance pour chaque locataire. Installation impeccable par l'équipe AriniLock.",
  },
  {
    name: "Mehdi A.",
    city: "Rabat",
    stars: 5,
    body: "Le visiophone fonctionne parfaitement depuis mon téléphone. L'alarme anti-effraction m'a déjà alerté une fois. Top produit.",
  },
];

/* ─── HELPERS ─── */

function Img({
  label,
  src,
  className = "",
}: {
  label: string;
  src: StaticImageData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gray-100",
        className,
      )}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover"
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
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="text-sm font-semibold text-foreground lg:text-base">
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
            <p className="pb-6 text-sm leading-relaxed text-muted-foreground">
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
}: {
  visible: boolean;
  onOrder: () => void;
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
                AriniLock M1 Pro
              </span>
              <Stars />
            </div>
            <button
              onClick={onOrder}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Commander
            </button>
          </div>

          {/* Desktop — floating pill centred */}
          <div
            className="mx-auto hidden w-fit items-center gap-5 rounded-full border border-gray-200 bg-white/95 px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] backdrop-blur-md lg:flex"
            style={{ pointerEvents: "auto" }}
          >
            <span className="text-sm font-semibold text-foreground">
              AriniLock M1 Pro
            </span>
            <div className="h-4 w-px bg-gray-200" />
            <Stars />
            <span className="text-xs text-muted-foreground">389 avis</span>
            <div className="h-4 w-px bg-gray-200" />
            <button
              onClick={onOrder}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Commander
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
        productName="AriniLock M1 Pro"
        price={PRICE}
      />
      <Header />
      <CartDrawer />
      <StickyBar visible={barVisible} onOrder={() => setOrderOpen(true)} />

      <main className="bg-white">
        {/* ══ 01 HERO ══ */}
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
                  Visiophone · Reconnaissance Faciale · WiFi
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
                  <em className="not-italic text-primary">M1 Pro</em>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.2 }}
                  className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
                >
                  Serrure connectée premium avec écran HD 4,5&quot;, visiophone
                  bidirectionnel et caméra vision nocturne. 6 modes de
                  déverrouillage, gestion via Tuya Smart — idéale pour villas,
                  riads et locations Airbnb haut de gamme.
                </motion.p>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <Stars />
                  <span className="text-xs font-semibold text-foreground">
                    4,9
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · 389 avis vérifiés
                  </span>
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
                    Commander maintenant
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <a
                    href="#fonctionnalites"
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-gray-200 bg-white px-7 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/4"
                  >
                    Voir les fonctionnalités
                  </a>
                </motion.div>

                {/* Trust pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.56 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {[
                    { icon: Truck, text: "Livraison 48h gratuite" },
                    { icon: BadgeCheck, text: "Garantie 2 ans" },
                    { icon: Shield, text: "Paiement à la livraison" },
                  ].map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-primary/60"
                        aria-hidden="true"
                      />
                      {text}
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
                      label="Photo produit M1 Pro — Vue principale"
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
                <span>Écran HD 4,5&quot;</span>
                <span className="text-white/30">✦</span>
                <span>Visiophone HD</span>
                <span className="text-white/30">✦</span>
                <span>6 modes d&apos;accès</span>
                <span className="text-white/30">✦</span>
                <span>WiFi 2,4 GHz</span>
                <span className="text-white/30">✦</span>
                <span>200 utilisateurs</span>
                <span className="text-white/30">✦</span>
                <span>Garantie 2 ans</span>
                <span className="text-white/30">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══ 02 UNLOCK METHODS ══ */}
        <section
          id="fonctionnalites"
          className="scroll-mt-20 border-b border-gray-100 px-6 py-24 lg:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                02 — Méthodes d&apos;accès
              </p>
              <h2
                className="font-display2 max-w-lg leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                Six façons
                <br />
                <em className="italic text-primary/70">d&apos;entrer.</em>
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

        {/* ══ 03 DEEP-DIVE FEATURES ══ */}
        {FEATURES.map((f, fi) => (
          <section
            key={f.tag}
            className={cn(
              "overflow-hidden border-b border-gray-100 px-6 py-24 lg:px-10 lg:py-32",
              fi % 2 === 1 ? "bg-gray-50/60" : "bg-white",
            )}
          >
            <div className="mx-auto max-w-7xl">
              <div
                className={cn(
                  "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
                  f.reverse && "",
                )}
              >
                {/* Image */}
                <Reveal
                  delay={0.05}
                  className={cn(f.reverse ? "lg:order-2" : "lg:order-1")}
                >
                  <Img
                    src={f.img}
                    label={f.imgLabel}
                    className="aspect-4/3 w-full lg:aspect-square"
                  />
                </Reveal>

                {/* Copy */}
                <div className={cn(f.reverse ? "lg:order-1" : "lg:order-2")}>
                  <Reveal>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                      {String(fi + 3).padStart(2, "0")} — {f.tag}
                    </p>
                    <h2
                      className="font-display2 leading-[0.9] text-foreground"
                      style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                    >
                      {f.title.split("\n").map((line, i) => (
                        <span key={i}>
                          {i === f.title.split("\n").length - 1 ? (
                            <em className="italic text-primary/80">{line}</em>
                          ) : (
                            <>
                              {line}
                              <br />
                            </>
                          )}
                        </span>
                      ))}
                    </h2>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground lg:text-base">
                      {f.body}
                    </p>
                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {f.detail}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ══ STATS ══ */}
        <section className="border-b border-gray-100 bg-primary px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
              {[
                {
                  to: 6,
                  decimals: 0,
                  decimalSep: ".",
                  suffix: "",
                  l: "Modes de déverrouillage",
                },
                {
                  to: 200,
                  decimals: 0,
                  decimalSep: ".",
                  suffix: "",
                  l: "Utilisateurs max",
                },
                {
                  to: 4.5,
                  decimals: 1,
                  decimalSep: ",",
                  suffix: "po",
                  l: "Écran HD intérieur",
                },
                {
                  to: 2,
                  decimals: 0,
                  decimalSep: ".",
                  suffix: " ans",
                  l: "Garantie",
                },
              ].map(({ to, decimals, decimalSep, suffix, l }, i) => (
                <Reveal key={l} delay={i * 0.07}>
                  <div className="flex flex-col items-center gap-2 bg-primary px-6 py-12 text-center">
                    <span
                      className="font-display2 italic leading-none text-white"
                      style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
                    >
                      <CountUp
                        to={to}
                        decimals={decimals}
                        decimalSep={decimalSep}
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

        {/* ══ GALLERY ══ */}
        <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                06 — Galerie
              </p>
              <h2
                className="font-display2 leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                Design
                <br />
                <em className="italic text-primary/70">d&apos;exception.</em>
              </h2>
            </Reveal>

            <div className="mt-14 flex flex-col gap-3">
              {/* Main image */}
              <Reveal delay={0.05}>
                <Img
                  src={img5}
                  label="M1 Pro — face avant"
                  className="aspect-4/3 w-full lg:aspect-16/7"
                />
              </Reveal>
              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                <Reveal delay={0.1}>
                  <Img
                    src={img6}
                    label={'Écran HD 4,5" — interface visiophone'}
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
                <Reveal delay={0.15}>
                  <Img
                    src={img7}
                    label="Panneau intérieur — bouton anti-lock"
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
                <Reveal delay={0.2} >
                  <Img
                    src={img8}
                    label="Caméra grand angle — vision nocturne"
                    className="aspect-2/3 w-full"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SPECS ══ */}
        <section className="border-y border-gray-100 bg-gray-50/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                    07 — Spécifications
                  </p>
                  <h2
                    className="font-display2 leading-[0.9] text-foreground"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    Conçu
                    <br />
                    pour
                    <br />
                    <em className="italic text-primary/70">durer.</em>
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Chaque composant du M1 Pro est sélectionné pour garantir une
                    fiabilité maximale sur le long terme.
                  </p>
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
        <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                08 — Avis clients
              </p>
              <div className="flex items-end gap-5">
                <h2
                  className="font-display2 leading-[0.9] text-foreground"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                >
                  389 clients
                  <br />
                  <em className="italic text-primary/70">satisfaits.</em>
                </h2>
                <div className="mb-2 flex flex-col gap-1">
                  <Stars />
                  <span className="text-xs text-muted-foreground">
                    Note moyenne 4,9 / 5
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-gray-50/60 p-7">
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

        {/* ══ FAQ ══ */}
        <section className="border-t border-gray-100 bg-gray-50/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                09 — FAQ
              </p>
              <h2
                className="font-display2 leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                Tout ce qu&apos;il
                <br />
                <em className="italic text-primary/70">faut savoir.</em>
              </h2>
            </Reveal>

            <div className="mt-12">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} {...faq} />
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
              {/* Left — pitch */}
              <Reveal>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                  09 — Commander
                </p>
                <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground lg:text-5xl">
                  Prêt à sécuriser votre porte ?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  Remplissez le formulaire et notre équipe vous contacte sous
                  24h pour confirmer votre commande. Paiement à la livraison,
                  partout au Maroc.
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {[
                    "Livraison gratuite partout au Maroc",
                    "Installation incluse (Casablanca & Rabat)",
                    "Garantie 2 ans — SAV réactif",
                    "Paiement à la livraison",
                  ].map((item) => (
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
                    Pour une commande rapide, veuillez remplir ce formulaire et
                    nous vous contacterons plus tard !
                  </p>
                  <OrderForm productName="AriniLock M1 Pro" price={PRICE} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="relative overflow-hidden bg-primary px-6 py-32 lg:px-10 lg:py-40">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
          {/* thin line */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                <Wifi className="h-3 w-3" aria-hidden="true" />
                Livraison gratuite · Installation incluse · Paiement à la
                livraison
              </div>
              <h2
                className="font-display2 leading-[0.88] text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                Prêt à passer
                <br />
                <em className="italic opacity-75">au niveau Pro ?</em>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/55">
                Commandez votre AriniLock M1 Pro sur WhatsApp et recevez-le sous
                48h partout au Maroc — avec installation professionnelle
                offerte.
              </p>

              <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setOrderOpen(true)}
                  className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-9 text-sm font-bold text-primary shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-all hover:shadow-[0_14px_50px_rgba(0,0,0,0.3)]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Commander maintenant
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/14"
                >
                  Nous contacter
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

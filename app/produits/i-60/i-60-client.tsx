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
  Clock,
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
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import i60img5 from "./assets/Gemini_Generated_Image_8buncu8buncu8bun.png";
import i60img6 from "./assets/Gemini_Generated_Image_g3gfiog3gfiog3gf.png";
import i60img8 from "./assets/8.png";
import i60img9 from "./assets/9.png";
import i60gemA from "./assets/Gemini_Generated_Image_5f7hgy5f7hgy5f7h.png";
import i60gemB from "./assets/Gemini_Generated_Image_b1pq0yb1pq0yb1pq.png";
import i60gemC from "./assets/5.png";
import i60gemD from "./assets/Gemini_Generated_Image_9dgx3p9dgx3p9dgx.png";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrderForm } from "@/components/order-form";
import { OrderModal } from "@/components/order-modal";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const PRICE = "3 490 dh";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── DATA ─── */

const UNLOCK_METHODS = [
  {
    icon: ScanFace,
    label: "Reconnaissance faciale 3D",
    desc: "Anti-usurpation · ultra-rapide",
  },
  { icon: Hand, label: "Paume de la main", desc: "Sans contact · hygiénique" },
  {
    icon: Fingerprint,
    label: "Empreinte digitale",
    desc: "< 0,5 seconde · haute précision",
  },
  {
    icon: KeyRound,
    label: "Code PIN sécurisé",
    desc: "Anti-espionnage · codes temporaires",
  },
  {
    icon: CreditCard,
    label: "Carte RFID / NFC",
    desc: "Accès instantané · incluses",
  },
  {
    icon: Smartphone,
    label: "Application Tuya Smart",
    desc: "WiFi · iOS & Android",
  },
  { icon: Key, label: "Clé mécanique", desc: "2 clés · noyau classe C" },
];

const FEATURES = [
  {
    tag: "Biométrie",
    title: "Visage.\nPaume.\nEmpreinte.",
    body: "L'i60 intègre trois modes biométriques avancés : reconnaissance faciale 3D avec technologie anti-usurpation, lecture de paume sans contact, et empreinte digitale haute précision en moins de 0,5 seconde. Le tout sans jamais toucher de clé.",
    detail: "Reconnaissance faciale 3D · anti-usurpation · < 0,5s",
    img: i60gemA,
    imgLabel: "Capteur facial 3D + lecteur de paume",
    icon: ScanFace,
    reverse: false,
  },
  {
    tag: "Visiophone",
    title: "Voyez vos\nvisiteurs.\nSans ouvrir.",
    body: "La caméra HD grand angle avec vision nocturne infrarouge et l'écran LCD couleur intérieur vous permettent de voir et de parler à vos visiteurs en temps réel. Notifications instantanées sur votre smartphone et historique des accès dans l'app Tuya Smart.",
    detail: "Caméra HD · vision nocturne · sonnette vidéo connectée",
    img: i60gemB,
    imgLabel: "Écran LCD intérieur + caméra grand angle",
    icon: Camera,
    reverse: true,
  },
  {
    tag: "Sécurité",
    title: "Verrouillage\nautomatique.\nAlertes immédiates.",
    body: "La serrure se verrouille automatiquement après chaque fermeture. Alarme anti-effraction, blocage après codes erronés, notification batterie faible et détection des tentatives d'ouverture forcée — vous êtes alerté instantanément sur votre téléphone.",
    detail: "Cylindre classe C · alarme intrusion · verrouillage auto",
    img: i60gemC,
    imgLabel: "Panneau extérieur — design Push-Pull",
    icon: AlertTriangle,
    reverse: false,
  },
];

const STEPS = [
  {
    num: "01",
    title: "Retirez l'ancienne serrure",
    description:
      "Dévissez les quatre vis de fixation de votre porte existante — aucun outil spécial requis.",
  },
  {
    num: "02",
    title: "Posez le panneau extérieur",
    description:
      "Installez le panneau Push-Pull avec caméra et clavier tactile. La mortaise multipoints 6068 est fournie.",
  },
  {
    num: "03",
    title: "Fixez le panneau intérieur",
    description:
      "Glissez l'écran LCD intérieur et connectez les deux panneaux via le câble fourni dans le kit.",
  },
  {
    num: "04",
    title: "Configurez via Tuya Smart",
    description:
      "Connectez via WiFi, enregistrez vos données biométriques et invitez votre famille en quelques secondes.",
  },
];

const SPECS = [
  { label: "Modèle", value: "AriniLock i60" },
  {
    label: "Matériau",
    value: "Alliage d'aluminium haute densité · panneau acrylique anti-rayures",
  },
  { label: "Design", value: "Push-Pull moderne · réversible gauche/droite" },
  {
    label: "Méthodes d'accès",
    value: "Face 3D · Paume · Empreinte · PIN · RFID · App · Clé",
  },
  { label: "Écran intérieur", value: "LCD couleur 3,5 à 4 pouces" },
  { label: "Caméra", value: "Grand angle · vision nocturne infrarouge" },
  { label: "Batterie", value: "Lithium rechargeable 4 200–5 000 mAh" },
  { label: "Recharge d'urgence", value: "Port USB-C" },
  { label: "Connectivité", value: "WiFi via Tuya Smart (iOS & Android)" },
  { label: "Cylindre", value: "Classe C haute sécurité" },
  { label: "Épaisseur porte", value: "40 à 120 mm" },
  { label: "Mortaise", value: "Multipoints 6068 incluse" },
  { label: "Capacité", value: "100 empreintes · plusieurs profils faciaux" },
  { label: "Garantie", value: "2 ans constructeur" },
  {
    label: "Livraison",
    value: "Express · partout au Maroc · installation incluse",
  },
];

const REVIEWS = [
  {
    name: "Hamid B.",
    city: "Rabat",
    stars: 5,
    body: "Le design Push-Pull est vraiment premium. La reconnaissance faciale fonctionne même la nuit. Parfait pour ma villa.",
  },
  {
    name: "Nadia T.",
    city: "Casablanca",
    stars: 5,
    body: "La caméra HD et l'écran intérieur changent tout — je vois qui sonne avant d'ouvrir. Très satisfaite.",
  },
  {
    name: "Karim O.",
    city: "Fès",
    stars: 5,
    body: "La reconnaissance palmaire sans contact est bluffante. Installation rapide par l'équipe AriniLock. Je recommande !",
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
              Commander
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
            <span className="text-xs text-muted-foreground">256 avis</span>
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

export function I60Client() {
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
      <StickyBar visible={barVisible} onOrder={() => setOrderOpen(true)} />

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
                  Reconnaissance Faciale 3D · Push-Pull · WiFi
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
                  Serrure connectée haut de gamme avec reconnaissance faciale
                  3D, lecteur de paume, caméra HD et design Push-Pull. 7 modes
                  d&apos;accès, connectée via Tuya Smart — idéale pour villas,
                  appartements et bureaux premium.
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
                    · 256 avis vérifiés
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
                    Commander maintenant
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>
                  <a
                    href="#comment-ca-marche"
                    className="inline-flex h-13 items-center gap-2 rounded-full border border-gray-200 bg-white px-7 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/4"
                  >
                    Comment ça marche ?
                  </a>
                </motion.div>

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
                <span>Face 3D · Paume · Empreinte</span>
                <span className="text-white/30">✦</span>
                <span>7 modes d&apos;accès</span>
                <span className="text-white/30">✦</span>
                <span>Caméra HD nocturne</span>
                <span className="text-white/30">✦</span>
                <span>Push-Pull premium</span>
                <span className="text-white/30">✦</span>
                <span>Cylindre classe C</span>
                <span className="text-white/30">✦</span>
                <span>Garantie 2 ans</span>
                <span className="text-white/30">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ══ 02 UNLOCK METHODS ══ */}
        <section className="scroll-mt-20 border-b border-gray-100 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                02 — Méthodes d&apos;accès
              </p>
              <h2
                className="font-display2 max-w-lg leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                Sept façons
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
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
                <div className={cn(f.reverse ? "lg:order-1" : "lg:order-2")}>
                  <Reveal>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                      {String(fi + 3).padStart(2, "0")} — {f.tag}
                    </p>
                    <h2
                      className="font-display2 leading-[0.9] text-foreground"
                      style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                    >
                      {f.title.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {i === arr.length - 1 ? (
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
                { to: 7, decimals: 0, suffix: "", l: "Modes d'accès" },
                {
                  to: 0.5,
                  decimals: 1,
                  decimalSep: ",",
                  suffix: "s",
                  l: "Déverrouillage",
                },
                { to: 100, decimals: 0, suffix: "", l: "Empreintes max" },
                { to: 2, decimals: 0, suffix: " ans", l: "Garantie" },
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
                    06 — Installation
                  </p>
                  <h2
                    className="font-display2 leading-[0.9] text-foreground"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    En 15
                    <br />
                    minutes,
                    <br />
                    <em className="italic text-primary/70">c&apos;est fait.</em>
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Sans perçage, sans technicien, sans stress. Juste votre
                    téléphone et le guide inclus.
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
                07 — Galerie
              </p>
              <h2
                className="font-display2 leading-[0.9] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
              >
                Simple
                <br />
                <em className="italic text-primary/70">et élégant.</em>
              </h2>
            </Reveal>

            <div className="mt-14 flex flex-col gap-3">
              <Reveal delay={0.05}>
                <Img
                  src={i60img6}
                  label="I 60 — face avant Push-Pull"
                  className="aspect-4/3 w-full lg:aspect-16/7"
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
                    src={i60img9}
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
                    08 — Spécifications
                  </p>
                  <h2
                    className="font-display2 leading-[0.9] text-foreground"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    Tout ce
                    <br />
                    qu&apos;il faut
                    <br />
                    <em className="italic text-primary/70">savoir.</em>
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
                09 — Avis clients
              </p>
              <div className="flex items-end gap-5">
                <h2
                  className="font-display2 leading-[0.9] text-foreground"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                >
                  256 clients
                  <br />
                  <em className="italic text-primary/70">satisfaits.</em>
                </h2>
                <div className="mb-2 flex flex-col gap-1">
                  <Stars />
                  <span className="text-xs text-muted-foreground">
                    Note moyenne 4,8 / 5
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
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <p className="mb-6 text-center text-sm font-semibold text-foreground">
                    Pour une commande rapide, veuillez remplir ce formulaire et
                    nous vous contacterons plus tard !
                  </p>
                  <OrderForm productName="AriniLock I 60" price={PRICE} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="relative overflow-hidden bg-primary px-6 py-32 lg:px-10 lg:py-40">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                <Clock className="h-3 w-3" aria-hidden="true" />
                Livraison gratuite · Installation incluse · Paiement à la
                livraison
              </div>
              <h2
                className="font-display2 leading-[0.88] text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                Simplifiez
                <br />
                <em className="italic opacity-75">votre quotidien.</em>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/55">
                Commandez votre AriniLock I 60 sur WhatsApp et recevez-le sous
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

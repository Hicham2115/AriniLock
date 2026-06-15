"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BatteryFull,
  Fingerprint,
  KeyRound,
  ShieldAlert,
  Smartphone,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

interface Feature {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: Fingerprint,
    title: "Empreinte digitale",
    description:
      "Jusqu'à 100 empreintes enregistrées. Reconnaissance et ouverture en moins d'une seconde.",
  },
  {
    num: "02",
    icon: KeyRound,
    title: "Code PIN",
    description:
      "Un code personnel à 4–8 chiffres, modifiable à tout moment depuis l'application.",
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Application mobile",
    description:
      "Verrouillez, déverrouillez et suivez l'activité de votre porte où que vous soyez.",
  },
  {
    num: "04",
    icon: Wifi,
    title: "Connectée 24/7",
    description:
      "Wifi et Bluetooth intégrés pour un contrôle à distance et des mises à jour automatiques.",
  },
  {
    num: "05",
    icon: BatteryFull,
    title: "Autonomie 12 mois",
    description:
      "4 piles AA standards. Une alerte vous prévient automatiquement avant épuisement.",
  },
  {
    num: "06",
    icon: ShieldAlert,
    title: "Alertes intrusion",
    description:
      "Notification immédiate sur votre téléphone en cas de tentative d'effraction.",
  },
];

export function FeaturesGrid() {
  return (
    <section
      id="fonctionnalites"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <Reveal>
        <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>02 — Fonctionnalités</span>
          <span>Sécurité nouvelle génération</span>
        </div>
      </Reveal>

      <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
        {/* Left: sticky large headline */}
        <div className="lg:sticky lg:top-28">
          <Reveal delay={0.1}>
            <h2
              className="font-display2 uppercase leading-[0.88] text-ink"
              style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
            >
              Quatre
              <br />
              façons
              <br />
              d&apos;entrer.
            </h2>
          </Reveal>
        </div>

        {/* Right: numbered divider list */}
        <div>
          <div className="divide-y divide-line">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.07,
                }}
                className="group flex items-start gap-5 py-6"
              >
                <span className="w-8 shrink-0 pt-0.5 font-display2 text-sm text-muted-foreground">
                  {feature.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 text-base font-semibold text-ink">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 mt-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

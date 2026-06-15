"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";

const STATS = [
  { value: "100", unit: "", label: "Empreintes", sub: "enregistrées max" },
  { value: "5", unit: "", label: "Méthodes", sub: "d'accès" },
  { value: "12", unit: "", label: "Mois", sub: "d'autonomie" },
  { value: "2", unit: "ans", label: "Garantie", sub: "constructeur" },
] as const;

const DETAILS = [
  {
    title: "EMPREINTE",
    body: "Jusqu'à 100 empreintes. Reconnaissance en moins d'une seconde. Jusqu'à 10 profils familiaux.",
  },
  {
    title: "CODE PIN",
    body: "Code 4–8 chiffres. Modifiable depuis l'app. Codes temporaires pour invités.",
  },
  {
    title: "APPLICATION",
    body: "Contrôle à distance. Historique des accès. Notifications en temps réel.",
  },
  {
    title: "RFID + CLÉ",
    body: "Cartes NFC rapides. Clé physique de secours incluse. Fonctionne hors connexion.",
  },
] as const;

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      {/* Section label row */}
      <Reveal>
        <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>01 — En chiffres</span>
          <span>Snapshot — {new Date().getFullYear()}</span>
        </div>
      </Reveal>

      {/* Big headline */}
      <Reveal delay={0.1}>
        <h2
          className="mb-12 font-display2 font-light uppercase leading-none text-ink"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Ce qui la rend
          <br />
          différente.
        </h2>
      </Reveal>

      {/* Stats row */}
      <div className="border-t border-ink/15">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.09}
              className={[
                i % 2 !== 0 ? "border-l border-ink/10" : "",
                i >= 2 ? "border-t border-ink/10" : "",
                i > 0 ? "lg:border-l lg:border-ink/10" : "",
                i >= 2 ? "lg:border-t-0" : "",
              ].filter(Boolean).join(" ")}
            >
            <motion.div
              whileHover="hovered"
              initial="rest"
              animate="rest"
              className="relative cursor-default overflow-hidden py-8 px-4 lg:px-6"
            >
              {/* Background fill — slides up on hover */}
              <motion.div
                variants={{
                  rest: { scaleY: 0 },
                  hovered: { scaleY: 1 },
                }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 origin-bottom bg-gold/6"
              />

              {/* Bottom gold accent line */}
              <motion.div
                variants={{
                  rest: { scaleX: 0 },
                  hovered: { scaleX: 1 },
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/70"
              />

              {/* Number */}
              <div className="relative mb-1 flex items-baseline gap-1">
                <motion.span
                  variants={{
                    rest: { color: "var(--color-ink)" },
                    hovered: { color: "#c49a65" },
                  }}
                  transition={{ duration: 0.25 }}
                  className="font-serif font-light leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 3.5rem)" }}
                >
                  {stat.value}
                </motion.span>
                {stat.unit && (
                  <motion.span
                    variants={{
                      rest: { color: "var(--color-muted-foreground)" },
                      hovered: { color: "#c49a65" },
                    }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-2xl"
                  >
                    {stat.unit}
                  </motion.span>
                )}
              </div>

              <p className="relative text-sm font-medium text-ink">{stat.label}</p>
              <p className="relative text-xs text-muted-foreground">{stat.sub}</p>
            </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail columns */}
      <div className="border-t border-ink/15 pt-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((detail, i) => (
            <Reveal key={detail.title} delay={i * 0.08}>
            <motion.div
              whileHover="hovered"
              initial="rest"
              animate="rest"
              className="cursor-default"
            >
              {/* Title */}
              <motion.p
                variants={{
                  rest: { color: "var(--color-ink)" },
                  hovered: { color: "#c49a65" },
                }}
                transition={{ duration: 0.2 }}
                className="mb-2 text-xs font-medium uppercase tracking-[0.25em]"
              >
                {detail.title}
              </motion.p>

              {/* Gold underline */}
              <motion.div
                variants={{
                  rest: { scaleX: 0 },
                  hovered: { scaleX: 1 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="mb-3 h-px origin-left bg-gold/50"
              />

              <p className="text-sm leading-relaxed text-muted-foreground">
                {detail.body}
              </p>
            </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

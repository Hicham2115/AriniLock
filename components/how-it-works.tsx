"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    num: "01",
    title: "Fixation sans perçage",
    description:
      "Se fixe directement sur votre porte existante, sans modification de la serrure d'origine ni outils spécifiques.",
  },
  {
    num: "02",
    title: "Connexion à l'application",
    description:
      "Associez votre serrure à l'application Arini Lock via Bluetooth et configurez vos préférences en quelques écrans.",
  },
  {
    num: "03",
    title: "Ajoutez vos accès",
    description:
      "Créez des accès permanents ou temporaires pour votre famille, vos invités ou votre aide à domicile.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      {/* Section label */}
      <Reveal>
        <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>04 — Mise en service</span>
          <span>Cycle : 0 → 1 en 15 min</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mb-12 font-display2 uppercase leading-none text-ink"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Installée en moins de
          <br />
          15 minutes.
        </h2>
      </Reveal>

      <div className="divide-y divide-line">
        {STEPS.map((step) => (
          <motion.div
            key={step.num}
            whileHover="hovered"
            initial="rest"
            animate="rest"
            className="group relative flex cursor-default items-start gap-8 overflow-hidden py-8"
          >
            {/* Background fill — slides in from left */}
            <motion.div
              variants={{
                rest: { scaleX: 0 },
                hovered: { scaleX: 1 },
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 origin-left bg-gold/5"
            />

            {/* Left accent line */}
            <motion.div
              variants={{
                rest: { scaleY: 0 },
                hovered: { scaleY: 1 },
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-gold/60"
            />

            {/* Step number */}
            <motion.span
              variants={{
                rest: { color: "var(--color-muted-foreground)" },
                hovered: { color: "#c49a65" },
              }}
              transition={{ duration: 0.2 }}
              className="relative w-10 shrink-0 font-display2 text-sm"
            >
              {step.num}
            </motion.span>

            {/* Content */}
            <div className="relative grid flex-1 gap-2 sm:grid-cols-[1fr_2fr]">
              <motion.h3
                variants={{
                  rest: { x: 0 },
                  hovered: { x: 6 },
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-semibold text-ink"
              >
                {step.title}
              </motion.h3>
              <motion.p
                variants={{
                  rest: { opacity: 0.6 },
                  hovered: { opacity: 1 },
                }}
                transition={{ duration: 0.25 }}
                className="text-sm leading-relaxed text-black"
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

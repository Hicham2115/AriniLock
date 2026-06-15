"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

export function HowItWorks() {
  const t = useT();
  const s = t.sections.howItWorks;

  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-16 lg:px-10 lg:py-24">
      {/* Section label */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
          <span>{s.label}</span>
          <span>{s.right}</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mb-8 font-display2 uppercase leading-none text-ink lg:mb-12"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          {s.headline[0]}
          <br />
          {s.headline[1]}
        </h2>
      </Reveal>

      <div className="divide-y divide-line">
        {s.steps.map((step, i) => (
          <motion.div
            key={step.title}
            whileHover="hovered"
            initial="rest"
            animate="rest"
            className="group relative flex cursor-default items-start gap-4 overflow-hidden py-6 sm:gap-8 sm:py-8"
          >
            {/* Background fill — slides in from left */}
            <motion.div
              variants={{ rest: { scaleX: 0 }, hovered: { scaleX: 1 } }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 origin-left bg-gold/5"
            />

            {/* Left accent line */}
            <motion.div
              variants={{ rest: { scaleY: 0 }, hovered: { scaleY: 1 } }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-gold/60"
            />

            {/* Step number */}
            <motion.span
              variants={{ rest: { color: "var(--color-muted-foreground)" }, hovered: { color: "#c49a65" } }}
              transition={{ duration: 0.2 }}
              className="relative w-10 shrink-0 font-display2 text-sm"
            >
              0{i + 1}
            </motion.span>

            {/* Content */}
            <div className="relative grid flex-1 gap-2 sm:grid-cols-[1fr_2fr]">
              <motion.h3
                variants={{ rest: { x: 0 }, hovered: { x: 6 } }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-semibold text-ink"
              >
                {step.title}
              </motion.h3>
              <motion.p
                variants={{ rest: { opacity: 0.6 }, hovered: { opacity: 1 } }}
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

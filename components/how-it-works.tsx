"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

export function HowItWorks() {
  const t = useT();
  const s = t.sections.howItWorks;

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        {/* Section label */}
        <Reveal>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
            <span>{s.label}</span>
            <span>{s.right}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="mb-12 font-display2 uppercase leading-none text-ink lg:mb-16"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            {s.headline[0]}
            <br />
            <span className="text-gold">{s.headline[1]}</span>
          </h2>
        </Reveal>

        <div className="divide-y divide-line">
          {s.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
              whileHover="hovered"
              className="group relative flex cursor-default items-start gap-6 overflow-hidden py-8 sm:py-10"
            >
              {/* Background fill */}
              <motion.div
                variants={{ rest: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                initial="rest"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 origin-left bg-gold/5"
              />

              {/* Left accent line */}
              <motion.div
                variants={{ rest: { scaleY: 0 }, hovered: { scaleY: 1 } }}
                initial="rest"
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute left-0 top-0 h-full w-0.5 origin-top bg-gold"
              />

              {/* Giant decorative number — background layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display2 font-light leading-none text-ink/4 transition-colors duration-300 group-hover:text-gold/8"
                style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
              >
                0{i + 1}
              </div>

              {/* Step number */}
              <motion.span
                variants={{ rest: { color: "var(--color-muted-foreground)" }, hovered: { color: "#c49a65" } }}
                initial="rest"
                transition={{ duration: 0.2 }}
                className="relative w-10 shrink-0 pt-1 font-display2 text-sm"
              >
                0{i + 1}
              </motion.span>

              {/* Content */}
              <div className="relative grid flex-1 gap-3 sm:grid-cols-[1fr_2fr] sm:gap-8">
                <motion.h3
                  variants={{ rest: { x: 0 }, hovered: { x: 6 } }}
                  initial="rest"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-semibold text-ink"
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  variants={{ rest: { opacity: 0.55 }, hovered: { opacity: 1 } }}
                  initial="rest"
                  transition={{ duration: 0.25 }}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

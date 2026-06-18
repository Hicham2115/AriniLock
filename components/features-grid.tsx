"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CreditCard,
  Fingerprint,
  Key,
  KeyRound,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

const ICONS: LucideIcon[] = [Fingerprint, KeyRound, Smartphone, CreditCard, Key];

export function FeaturesGrid() {
  const t = useT();
  const s = t.sections.features;

  return (
    <section id="fonctionnalites" className="scroll-mt-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
            <span>{s.label}</span>
            <span>{s.right}</span>
          </div>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left: sticky headline */}
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <h2
                className="font-display2 uppercase leading-[0.88] text-foreground"
                style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
              >
                {s.headline[0]}
                <br />
                {s.headline[1]}
                <br />
                <span className="text-primary">{s.headline[2]}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <div className="h-1 w-1 rounded-full bg-primary/60" />
              </div>
            </Reveal>
          </div>

          {/* Right: feature list */}
          <div className="divide-y divide-border">
            {s.items.map((feature, index) => {
              const Icon = ICONS[index]!;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.06 }}
                  whileHover="hovered"
                  className="group relative flex items-start gap-5 py-6 lg:py-7"
                >
                  {/* Icon bubble */}
                  <motion.div
                    variants={{
                      hovered: {
                        backgroundColor: "rgba(3, 34, 69, 0.1)",
                        color: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                      },
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-1 flex items-baseline gap-2">
                          <motion.h3
                            variants={{ hovered: { color: "var(--color-primary)" } }}
                            transition={{ duration: 0.2 }}
                            className="text-base font-semibold text-foreground"
                          >
                            {feature.title}
                          </motion.h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                      <motion.div
                        variants={{ hovered: { opacity: 1, x: 0 } }}
                        initial={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

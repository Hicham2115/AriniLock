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
    <section
      id="fonctionnalites"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-16 lg:px-10 lg:py-24"
    >
      {/* Section label */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
          <span>{s.label}</span>
          <span>{s.right}</span>
        </div>
      </Reveal>

      <div className="grid items-start gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* Left: sticky large headline */}
        <div className="lg:sticky lg:top-28">
          <Reveal delay={0.1}>
            <h2
              className="font-display2 uppercase leading-[0.88] text-ink"
              style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
            >
              {s.headline[0]}
              <br />
              {s.headline[1]}
              <br />
              {s.headline[2]}
            </h2>
          </Reveal>
        </div>

        {/* Right: numbered divider list */}
        <div>
          <div className="divide-y divide-line">
            {s.items.map((feature, index) => {
              const Icon = ICONS[index]!;
              return (
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
                    0{index + 1}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

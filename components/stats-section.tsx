"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

export function StatsSection() {
  const t = useT();
  const s = t.sections.stats;

  return (
    <section className="border-t border-primary/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        {/* Section label */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-ink/25 lg:mb-16">
            <span>{s.label}</span>
            <span>{s.right}</span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h2
            className="mb-12 font-display2 font-light uppercase leading-none text-ink lg:mb-16"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            {s.headline[0]}
            <br />
            <span className="text-primary/80">{s.headline[1]}</span>
          </h2>
        </Reveal>

        {/* Stats grid */}
        <div className="mb-16 border-t border-primary/10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {s.items.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className={[
                  i % 2 !== 0 ? "border-l border-primary/10" : "",
                  i >= 2 ? "border-t border-primary/10" : "",
                  i > 0 ? "lg:border-l lg:border-primary/10" : "",
                  i >= 2 ? "lg:border-t-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <motion.div
                  whileHover="hovered"
                  initial="rest"
                  animate="rest"
                  className="group relative cursor-default overflow-hidden px-4 py-10 lg:px-8"
                >
                  {/* Navy sweep on hover */}
                  <motion.div
                    variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-primary/5"
                  />
                  <motion.div
                    variants={{ rest: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary"
                  />

                  {/* Number */}
                  <div className="relative mb-2 flex items-baseline gap-1.5">
                    <motion.span
                      variants={{
                        rest: { color: "#032245" },
                        hovered: { color: "#053d7a" },
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-display2 font-light leading-none"
                      style={{ fontSize: "clamp(3.5rem, 9vw, 5.5rem)" }}
                    >
                      {stat.value}
                    </motion.span>
                    {stat.unit && (
                      <motion.span
                        variants={{
                          rest: { color: "#2a5fa8" },
                          hovered: { color: "#032245" },
                        }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-xl"
                      >
                        {stat.unit}
                      </motion.span>
                    )}
                  </div>

                  <p className="relative text-sm font-medium text-ink/70">
                    {stat.label}
                  </p>
                  <p className="relative text-xs text-ink/35">{stat.sub}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Detail columns */}
        {/* <div className="grid gap-x-10 gap-y-12 border-t border-primary/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {s.details.map((detail, i) => (
            <Reveal key={detail.title} delay={i * 0.08}>
              <motion.div
                whileHover="hovered"
                initial="rest"
                animate="rest"
                className="max-w-70 cursor-default"
              >
                <motion.p
                  variants={{ rest: { color: "#032245" }, hovered: { color: "#053d7a" } }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  {detail.title}
                </motion.p>

                <motion.div
                  variants={{ rest: { scaleX: 0 }, hovered: { scaleX: 1 } }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-4 h-px w-10 origin-left bg-primary/30"
                />

                <p className="text-base leading-relaxed text-ink/75">
                  {detail.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div> */}
      </div>
    </section>
  );
}

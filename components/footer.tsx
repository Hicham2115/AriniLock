"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/hooks/use-t";

export function Footer() {
  const t = useT();
  const s = t.sections.footer;

  return (
    <footer className="bg-ink text-cream overflow-hidden">

      {/* ── Closing statement ── */}
      <div className="relative overflow-hidden border-b border-cream/6 px-6 py-16 lg:px-10 lg:py-24">
        {/* Ghost wordmark behind headline */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 left-0 select-none whitespace-nowrap font-display2 uppercase leading-none text-cream/3"
          style={{ fontSize: "clamp(5rem, 16vw, 14rem)", letterSpacing: "-0.02em" }}
        >
          Arini Lock
        </p>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Big headline */}
          <div>
            {s.closing.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
                className="font-display2 uppercase leading-[0.9] text-cream"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)", letterSpacing: "-0.02em" }}
              >
                {i === s.closing.length - 1 ? (
                  <span className="text-gold">{line}</span>
                ) : line}
              </motion.p>
            ))}
          </div>

          {/* Right column: blurb + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            className="flex max-w-xs flex-col gap-6 lg:mb-2 lg:text-right"
          >
            <p className="text-sm leading-relaxed text-cream/45">{s.blurb}</p>
            <a
              href="#produit"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-dark lg:self-end"
            >
              {s.closingCta}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Gold divider */}
        <div className="relative mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-cream/8" />
          <div className="h-1 w-1 rounded-full bg-gold/60" />
          <div className="h-px flex-1 bg-cream/8" />
        </div>
      </div>

      {/* ── Nav grid ── */}
      <div className="relative border-b border-cream/6 px-6 py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <p className="font-display text-lg tracking-[0.18em] text-cream">Arini Lock</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold/60">{s.tagline}</p>
            </div>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: "Casablanca, Maroc" },
                { icon: Phone, text: "+212 6 00 00 00 00" },
                { icon: Mail,  text: "hello@arinilock.ma" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-cream/45">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/20 bg-gold/8">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {s.cols.map((col) => (
            <div key={col.title}>
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold/70">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-cream/45 transition-colors hover:text-cream"
                    >
                      <span className="h-px w-3 bg-cream/20 transition-all duration-300 group-hover:w-5 group-hover:bg-gold" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-[11px] text-cream/25 sm:flex-row lg:px-10">
        <p>© {new Date().getFullYear()} {s.copyright}</p>
        <div className="flex flex-wrap items-center gap-4 uppercase tracking-[0.2em]">
          {s.payment.map((m) => (
            <span key={m} className="border-l border-cream/10 pl-4 first:border-0 first:pl-0">
              {m}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

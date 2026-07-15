"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import lockImg from "@/app/assets/nano-banana-2_3D_render_of_a_premium_smart_door_lock_handle_brushed_gold_and_matte_black_finis-0.jpg";
import { useT } from "@/hooks/use-t";

export function PhotoBreak() {
  const t = useT();
  const p = t.sections.photoBreak;

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(55vh, 70vw, 80vh)" }}
    >
      {/* Background image — zoomed in for a close-up "detail shot" feel */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={lockImg}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[55%_40%]"
          sizes="100vw"
        />
      </motion.div>

      {/* Multi-layer overlay — vignette + dark tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/65" />

      {/* Centered editorial content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-2 text-[10px] uppercase tracking-widest2 text-gold/70"
        >
          ARINILOCK
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="flex items-end gap-3"
        >
          <span
            className="font-display2 leading-none text-cream"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)", letterSpacing: "-0.03em" }}
          >
            {p.stat}
          </span>
          <span
            className="mb-2 font-display2 leading-none text-gold"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            {p.statLabel}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.22 }}
          className="mt-3 text-sm uppercase tracking-[0.25em] text-cream/60"
        >
          {p.line}
        </motion.p>

        <motion.a
          href="#produit"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.36 }}
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-gold/15 hover:text-gold"
        >
          {p.cta}
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </div>
    </section>
  );
}

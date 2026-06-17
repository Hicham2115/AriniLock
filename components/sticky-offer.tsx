"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { useT } from "@/hooks/use-t";

const OFFER_DURATION_MS = (4 * 24 * 60 * 60 + 12 * 3600 + 45 * 60 + 10) * 1000;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function computeTimeLeft(endAt: number) {
  const diff = Math.max(0, endAt - Date.now());
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor(diff / 3_600_000) % 24),
    mins: pad(Math.floor(diff / 60_000) % 60),
    secs: pad(Math.floor(diff / 1000) % 60),
  };
}

const BUZZ = {
  animate: {
    x: [0, -4, 4, -4, 4, -2, 2, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export function StickyOffer() {
  const t = useT();
  const s = t.sections.offer;

  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
    computeTimeLeft(Date.now() + OFFER_DURATION_MS)
  );
  const [buzz, setBuzz] = useState(false);

  // Auto-open after 4 s
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(id);
  }, []);

  // Re-open 30 s after being collapsed
  useEffect(() => {
    if (open) return;
    const id = setTimeout(() => setOpen(true), 30_000);
    return () => clearTimeout(id);
  }, [open]);

  // Countdown tick
  useEffect(() => {
    const endAt = Date.now() + OFFER_DURATION_MS;
    const id = setInterval(() => setTimeLeft(computeTimeLeft(endAt)), 1000);
    return () => clearInterval(id);
  }, []);

  // Buzz every 8 s when collapsed
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setBuzz(true);
      setTimeout(() => setBuzz(false), 600);
    }, 8000);
    return () => clearInterval(id);
  }, [open]);

  /* ── Desktop card content ── */
  const cardContent = (
    <div className="overflow-hidden bg-[#162847] shadow-2xl rounded-2xl w-72">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <Tag className="h-3.5 w-3.5 text-white/60" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          {s.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
          {s.right}
        </p>
        <h3 className="mb-4 font-display2 text-xl font-bold leading-tight text-white">
          {s.headline[0]}<br />{s.headline[1]}
        </h3>

        {/* Countdown */}
        <div className="mb-4 flex items-center gap-1.5 rounded-xl bg-white/8 px-3 py-2.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-white/50" />
          <div className="flex flex-1 items-center justify-around text-center">
            {[
              { val: timeLeft.days,  label: s.unitLabels[0] },
              { val: timeLeft.hours, label: s.unitLabels[1] },
              { val: timeLeft.mins,  label: s.unitLabels[2] },
              { val: timeLeft.secs,  label: s.unitLabels[3] },
            ].map(({ val, label }, i, arr) => (
              <div key={label} className="flex items-center gap-1.5">
                <div>
                  <p className="font-display2 text-lg font-bold tabular-nums leading-none text-white">
                    {val}
                  </p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-widest text-white/40">
                    {label}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <span className="mb-3 text-white/30 text-sm">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {s.details.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-[#4a7ab5]" />
              <span className="text-[11px] text-white/60">{d}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/produits"
          onClick={() => setOpen(false)}
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-[#162847] transition-colors hover:bg-white/90"
        >
          Commander maintenant
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Collapse tab */}
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="w-full border-t border-white/10 py-2 text-center text-[10px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/60"
      >
        Réduire
      </button>
    </div>
  );

  /* ── Mobile compact card ── */
  const mobileCardContent = (
    <div className="overflow-hidden bg-[#162847] shadow-2xl rounded-t-2xl w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Tag className="h-3 w-3 text-white/60" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {s.label}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
        >
          Réduire
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="font-display2 text-base font-bold leading-tight text-white">
            {s.headline[0]} {s.headline[1]}
          </h3>
          {/* Compact countdown */}
          <div className="flex items-center gap-1 rounded-lg bg-white/8 px-2.5 py-1.5 shrink-0">
            <Clock className="h-3 w-3 text-white/50" />
            <span className="font-display2 text-sm font-bold tabular-nums text-white">
              {timeLeft.hours}:{timeLeft.mins}:{timeLeft.secs}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/produits"
          onClick={() => setOpen(false)}
          className="group flex h-9 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-[#162847] transition-colors hover:bg-white/90"
        >
          Commander maintenant
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop: bottom-left corner ── */}
      <div className="hidden sm:block fixed bottom-6 left-6 z-50">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {cardContent}
            </motion.div>
          ) : (
            <motion.button
              key="pill"
              {...(buzz ? BUZZ : {})}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              type="button"
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-[#162847] pl-3 pr-4 py-2.5 shadow-xl"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4a7ab5] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4a7ab5]" />
              </span>
              <span className="text-[12px] font-semibold text-white">
                {s.right} — {timeLeft.hours}:{timeLeft.mins}:{timeLeft.secs}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile: compact bottom sheet / bar ── */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {mobileCardContent}
            </motion.div>
          ) : (
            <motion.button
              key="bar"
              {...(buzz ? BUZZ : {})}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25 }}
              type="button"
              onClick={() => setOpen(true)}
              className="flex w-full items-center justify-between bg-[#162847] px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4a7ab5] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4a7ab5]" />
                </span>
                <span className="text-[12px] font-semibold text-white">{s.right}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-white/50" />
                <span className="font-display2 text-sm font-bold tabular-nums text-white">
                  {timeLeft.hours}:{timeLeft.mins}:{timeLeft.secs}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-white/60" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

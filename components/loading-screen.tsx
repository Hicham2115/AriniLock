"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { useUiStore } from "@/stores/ui-store";

const EASE = [0.76, 0, 0.24, 1] as const;
const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function LoadingScreen() {
  const done = useUiStore((s) => s.loadingScreenDone);
  const finish = useUiStore((s) => s.finishLoadingScreen);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 220);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  const strokeOffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
  const isComplete = progress >= 0.99;

  return (
    <AnimatePresence>
      {!done && (
        <div key="loading-root" aria-hidden="true" className="fixed inset-0 z-100">

          {/* ── Top panel ── */}
          <motion.div
            exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
            className="absolute inset-x-0 top-0 flex h-1/2 flex-col justify-between bg-black px-5 pb-5 pt-6 sm:px-12 sm:pt-8"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest2 text-white/25">
              <span>AriniLock</span>
              <span className="hidden sm:inline">Marque marocaine</span>
            </div>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.55 } }}
              className="text-[10px] uppercase tracking-[0.2em] text-white/30 sm:text-xs sm:tracking-[0.25em]"
            >
              Reconnaissance en cours…
            </motion.p>
          </motion.div>

          {/* ── Bottom panel ── */}
          <motion.div
            exit={{ y: "100%", transition: { duration: 0.9, ease: EASE, delay: 0.06 } }}
            className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-between bg-black px-5 pb-8 pt-5 sm:px-12 sm:pb-10"
          >
            <div className="h-px w-full bg-white/8" />
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.55 } }}
              className="text-[10px] uppercase tracking-[0.25em] text-white/40"
            >
              // La porte qui vous reconnaît
            </motion.p>
          </motion.div>

          {/* ── Centre overlay — fingerprint ── */}
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5"
          >
            {/* Ring + fingerprint — scaled down on small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }}
              className="relative flex items-center justify-center scale-[0.8] sm:scale-100"
            >
              {/* SVG progress ring */}
              <svg width="144" height="144" className="-rotate-90">
                <circle
                  cx="72" cy="72" r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.5"
                />
                <motion.circle
                  cx="72" cy="72" r={RADIUS}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.06, ease: "linear" }}
                />
              </svg>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1.4, 1.8] }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute h-24 w-24 rounded-full bg-white"
                />
              )}

              <motion.div
                className="absolute"
                animate={{
                  color: isComplete ? "#ffffff" : "rgba(255,255,255,0.55)",
                  filter: isComplete
                    ? "drop-shadow(0 0 14px rgba(255,255,255,0.7))"
                    : "none",
                }}
                transition={{ duration: 0.4 }}
              >
                <Fingerprint className="h-14 w-14" strokeWidth={1.25} />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.55 } }}
              className="font-display text-sm uppercase tracking-widest2 text-white/35"
            >
              AriniLock
            </motion.p>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

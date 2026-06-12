"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUiStore } from "@/stores/ui-store";

export function LoadingScreen() {
  const done = useUiStore((s) => s.loadingScreenDone);
  const finish = useUiStore((s) => s.finishLoadingScreen);

  useEffect(() => {
    const timer = setTimeout(finish, 1400);
    return () => clearTimeout(timer);
  }, [finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-dark"
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            className="font-display text-4xl tracking-[0.18em] text-cream"
          >
            Arini Lock
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: { duration: 1.1, ease: "easeInOut" },
            }}
            className="h-px w-40 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.6 } }}
            className="text-xs uppercase tracking-widest2 text-cream/60"
          >
            La porte qui vous reconnaît
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

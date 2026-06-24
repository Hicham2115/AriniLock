"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { OrderForm } from "./order-form";

interface Props {
  open: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  whatsappNumber?: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function OrderModal({ open, onClose, productName, price, whatsappNumber }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:inset-0 lg:m-auto lg:max-h-[90vh] lg:rounded-3xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/60">
                  Commande rapide
                </p>
                <h2 className="mt-0.5 text-base font-bold text-foreground">{productName}</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-muted-foreground transition-colors hover:border-gray-300 hover:bg-gray-50"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="px-6 py-6">
              <p className="mb-5 text-center text-sm font-medium text-muted-foreground">
                Remplissez ce formulaire et notre équipe vous contactera pour confirmer.
              </p>
              <OrderForm
                productName={productName}
                price={price}
                whatsappNumber={whatsappNumber}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

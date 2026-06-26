"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const CATEGORIES = [
  { label: "Notre boutique",                    href: "/produits" },
  { label: "Solutions pour bureau",             href: "/produits/serrure-intelligente-arini-m1-pro" },
  { label: "Solutions pour Airbnb",             href: "/produits/serrure-intelligente-arini-x5" },
  { label: "Solutions pour promoteurs",         href: "/contact" },
  { label: "Solutions pour hôtels",             href: "/produits/serrure-intelligente-arini-i60" },
  { label: "Solutions pour villas & apparts",   href: "/produits/serrure-intelligente-arini-i50" },
  { label: "Fonctionnalités",                   href: "/#fonctionnalites" },
  { label: "Comment ça marche",                 href: "/#comment-ca-marche" },
  { label: "Avis clients",                      href: "/#avis" },
  { label: "FAQ",                               href: "/#faq" },
  { label: "Contact & Support",                 href: "/contact" },
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} aria-hidden="true" />

      <div className="fixed inset-y-0 left-0 z-60 flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl">
        <div className="flex items-center justify-end border-b border-gray-100 px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-9 w-9 items-center justify-center rounded bg-ink text-white transition-colors hover:bg-ink/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              onClick={onClose}
              className="border-b border-gray-100 px-5 py-4 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-ink"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

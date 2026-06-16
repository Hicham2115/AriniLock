"use client";

import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type SubItem = { label: string; href: string };
type Category = {
  label: string;
  href?: string;
  sub?: SubItem[];
};

const CATEGORIES: Category[] = [
  {
    label: "Serrures connectées",
    sub: [
      { label: "Serrure Arini Pro", href: "/produits" },
      { label: "Cylindre électronique", href: "/produits" },
      { label: "Serrure à empreinte digitale", href: "/produits" },
      { label: "Serrure à code PIN", href: "/produits" },
      { label: "Serrure multi-accès", href: "/produits" },
    ],
  },
  {
    label: "Accessoires",
    sub: [
      { label: "Claviers numériques", href: "#accessoires" },
      { label: "Lecteurs d'empreintes", href: "#accessoires" },
      { label: "Badges RFID", href: "#accessoires" },
      { label: "Câbles & connecteurs", href: "#accessoires" },
    ],
  },
  {
    label: "Fonctionnalités",
    sub: [
      { label: "Accès à distance", href: "#fonctionnalites" },
      { label: "Gestion multi-utilisateurs", href: "#fonctionnalites" },
      { label: "Historique des accès", href: "#fonctionnalites" },
      { label: "Notifications en temps réel", href: "#fonctionnalites" },
      { label: "Intégration domotique", href: "#fonctionnalites" },
    ],
  },
  {
    label: "Installation & Guides",
    sub: [
      { label: "Guide d'installation", href: "#faq" },
      { label: "Vidéos tutoriels", href: "#faq" },
      { label: "FAQ technique", href: "#faq" },
      { label: "Support téléphonique", href: "#faq" },
    ],
  },
  {
    label: "Avis clients",
    href: "#avis",
  },
  {
    label: "Packs & Offres",
    sub: [
      { label: "Pack Starter", href: "/produits" },
      { label: "Pack Pro", href: "/produits" },
      { label: "Pack Entreprise", href: "/produits" },
    ],
  },
  {
    label: "Notre boutique",
    href: "/produits",
  },
  {
    label: "À propos",
    sub: [
      { label: "Notre histoire", href: "/" },
      { label: "Showroom Maroc", href: "/" },
      { label: "Blog & Actualités", href: "/" },
      { label: "Nous contacter", href: "/" },
    ],
  },
];

const firstWithSub = CATEGORIES.findIndex((c) => c.sub && c.sub.length > 0);

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(firstWithSub);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset active to first-with-sub whenever menu opens
  useEffect(() => {
    if (open) setActiveIndex(firstWithSub);
  }, [open]);

  if (!open) return null;

  const active = CATEGORIES[activeIndex];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — full height, capped width like Kitea */}
      <div className="fixed inset-y-0 left-0 z-60 flex w-full max-w-[860px] overflow-hidden shadow-2xl">
        {/* Left — category list */}
        <div className="flex w-[300px] shrink-0 flex-col overflow-y-auto bg-white">
          {/* Close row */}
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
            {CATEGORIES.map((cat, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    if (!cat.sub) {
                      onClose();
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  className={`flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 text-left text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "border-l-[3px] border-l-ink bg-gray-50 text-ink"
                      : "border-l-[3px] border-l-transparent text-gray-700 hover:bg-gray-50 hover:text-ink"
                  }`}
                >
                  {cat.sub ? (
                    <>
                      <span>{cat.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                    </>
                  ) : (
                    <Link
                      href={cat.href ?? "/"}
                      onClick={onClose}
                      className="w-full"
                    >
                      {cat.label}
                    </Link>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right — subcategory panel */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-white px-10 py-8">
          {active.sub ? (
            <>
              <h2 className="mb-3 font-display text-xl tracking-widest text-ink uppercase">
                {active.label}
              </h2>
              <div className="mb-8 h-px w-64 bg-ink/20" />
              <ul className="flex flex-col gap-1">
                {active.sub.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-gray-100 py-4 text-[15px] text-gray-600 transition-colors hover:text-ink"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300 text-sm">
              Sélectionnez une catégorie
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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
    label: "Solutions pour bureau",
    sub: [
      { label: "Serrure connectée bureau", href: "/produits" },
      { label: "Contrôle d'accès multi-utilisateurs", href: "/produits" },
      { label: "Historique des entrées/sorties", href: "/produits" },
      { label: "Badges RFID employés", href: "#accessoires" },
    ],
  },
  {
    label: "Solutions pour Airbnb",
    sub: [
      { label: "Accès temporaires par code", href: "/produits" },
      { label: "Gestion à distance", href: "/produits" },
      { label: "Notifications à chaque ouverture", href: "/produits" },
      { label: "Sans remise de clés en main propre", href: "/produits" },
    ],
  },
  {
    label: "Solutions pour promoteurs",
    sub: [
      { label: "Solutions sur mesure", href: "/contact" },
      { label: "Intégration projets immobiliers", href: "/contact" },
      { label: "Installation en lot", href: "/contact" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
  {
    label: "Solutions pour hôtels",
    sub: [
      { label: "Serrures pour chambres d'hôtel", href: "/produits" },
      { label: "Cartes RFID clients", href: "#accessoires" },
      { label: "Gestion centralisée", href: "/produits" },
      { label: "Audit d'accès en temps réel", href: "/produits" },
    ],
  },
  {
    label: "Solutions pour villas & appartements",
    sub: [
      { label: "Serrure d'entrée principale", href: "/produits" },
      { label: "Empreinte digitale & code PIN", href: "/produits" },
      { label: "Application mobile", href: "/produits" },
      { label: "Clé physique de secours", href: "/produits" },
    ],
  },
  {
    label: "Notre boutique",
    href: "/produits",
  },
  {
    label: "Contact & Support",
    sub: [
      { label: "Nous contacter", href: "/contact" },
      { label: "FAQ", href: "#faq" },
      { label: "Guide d'installation", href: "#faq" },
      { label: "Avis clients", href: "#avis" },
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
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(firstWithSub);
      setMobileAccordion(null);
    }
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

      {/* Panel */}
      <div className="fixed inset-y-0 left-0 z-60 flex w-full max-w-215 overflow-hidden shadow-2xl">
        {/* Left — category list (full width on mobile, 300px on desktop) */}
        <div className="flex w-full md:w-75 shrink-0 flex-col overflow-y-auto bg-white">
          {/* Close row */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 md:justify-end">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-gray-400 md:hidden">
              Menu
            </span>
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
              const isMobileExpanded = mobileAccordion === i;
              const rowClass = `flex w-full items-center justify-between border-b border-gray-100 px-5 py-4 text-left text-[15px] font-semibold transition-colors md:px-6 ${
                isActive
                  ? "border-l-[3px] border-l-ink bg-gray-50 text-ink"
                  : "border-l-[3px] border-l-transparent text-gray-700 hover:bg-gray-50 hover:text-ink"
              }`;
              return (
                <div key={cat.label}>
                  {cat.sub ? (
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        setActiveIndex(i);
                        setMobileAccordion(isMobileExpanded ? null : i);
                      }}
                      className={rowClass}
                    >
                      <span>{cat.label}</span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                          isMobileExpanded ? "rotate-90 md:rotate-0" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={cat.href ?? "/"}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={rowClass}
                    >
                      {cat.label}
                    </Link>
                  )}

                  {/* Mobile accordion sub-items */}
                  {cat.sub && isMobileExpanded && (
                    <div className="md:hidden border-b border-gray-100 bg-gray-50 pl-8 pr-4">
                      {cat.sub.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between border-b border-gray-100 py-3 text-sm text-gray-600 last:border-b-0 hover:text-ink"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right — subcategory panel (desktop only) */}
        <div className="hidden md:flex flex-1 flex-col overflow-y-auto bg-white px-10 py-8">
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

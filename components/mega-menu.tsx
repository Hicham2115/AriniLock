"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useT } from "@/hooks/use-t";

const HREFS = [
  "/produits",
  "/produits/serrure-intelligente-arini-m1-pro",
  "/produits/serrure-intelligente-arini-x5",
  "/contact",
  "/produits/serrure-intelligente-arini-i60",
  "/produits/serrure-intelligente-arini-i50",
  "/#fonctionnalites",
  "/#comment-ca-marche",
  "/#avis",
  "/#faq",
  "/contact",
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const t = useT();
  const categories = t.nav.menuCategories.map((label, i) => ({ label, href: HREFS[i] ?? "/" }));

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
            aria-label={t.nav.closeMenu}
            className="flex h-9 w-9 items-center justify-center rounded bg-ink text-white transition-colors hover:bg-ink/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col">
          {categories.map((cat) => (
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

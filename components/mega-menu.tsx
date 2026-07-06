"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useT } from "@/hooks/use-t";

const SHOP_HREF = "/produits";

const CATEGORY_HREFS = [
  {
    main: "/produits/serrure-intelligente-arini-m1-pro",
    subs: ["/produits/serrure-intelligente-arini-m1-pro", "/#fonctionnalites", "/#fonctionnalites"],
  },
  {
    main: "/produits/serrure-intelligente-arini-x5",
    subs: ["/produits/serrure-intelligente-arini-x5", "/#comment-ca-marche", "/produits/serrure-intelligente-arini-x5"],
  },
  {
    main: "/contact",
    subs: ["/contact", "/contact", "/contact"],
  },
  {
    main: "/produits/serrure-intelligente-arini-i60",
    subs: ["/produits/serrure-intelligente-arini-i60", "/produits/serrure-intelligente-arini-i60", "/#fonctionnalites"],
  },
  {
    main: "/produits/serrure-intelligente-arini-i50",
    subs: ["/produits/serrure-intelligente-arini-i50", "/produits/serrure-intelligente-arini-i50", "/#fonctionnalites"],
  },
] as const;

const LINK_HREFS = ["/#fonctionnalites", "/#comment-ca-marche", "/#avis", "/#faq", "/contact"];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const t = useT();

  const categories = t.nav.categories.map((cat, i) => ({
    label: cat.label,
    href: CATEGORY_HREFS[i]?.main ?? "/",
    subs: cat.subs.map((label, j) => ({ label, href: CATEGORY_HREFS[i]?.subs[j] ?? "/" })),
  }));
  const links = t.nav.links.map((label, i) => ({ label, href: LINK_HREFS[i] ?? "/" }));

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
          <Link
            href={SHOP_HREF}
            onClick={onClose}
            className="border-b border-gray-100 px-5 py-4 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-ink"
          >
            {t.nav.shopLink}
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              onClick={onClose}
              className="border-b border-gray-100 px-5 py-4 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-ink"
            >
              {cat.label}
            </Link>
            /* Subcategories hidden for now — re-enable by restoring the
               expandable chevron + cat.subs list (see git history). */
          ))}

          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="border-b border-gray-100 px-5 py-4 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

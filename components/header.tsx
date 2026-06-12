"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useUiStore } from "@/stores/ui-store";

const NAV_LINKS = [
  { href: "#produit", label: "Produit" },
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#accessoires", label: "Accessoires" },
  { href: "#avis", label: "Avis" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const openCart = useUiStore((s) => s.openCart);
  const { data: cart } = useCart();
  const count = cart?.totalQuantity ?? 0;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-card md:hidden">
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-display text-base tracking-[0.18em] text-ink">
              Arini Lock
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="w-full border-b border-line py-5 font-display text-2xl tracking-wide text-ink transition-colors hover:text-brass"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <button
              type="button"
              onClick={() => { openCart(); setMobileOpen(false); }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-medium text-cream"
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Panier {count > 0 && `(${count})`}
            </button>
          </div>
        </div>
      )}

      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full border px-3 h-14 shadow-sm backdrop-blur transition-all duration-300 ${
            scrolled ? "border-line bg-card/95" : "border-white/20 bg-white/10"
          }`}
        >
          <Link
            href="#"
            className={`shrink-0 px-3 font-display text-base tracking-[0.18em] transition-colors duration-300 ${scrolled ? "text-ink" : "text-white"}`}
          >
            Arini Lock
          </Link>

          <nav className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 text-[13px] transition-colors duration-300 ${scrolled ? "text-muted-foreground hover:text-ink" : "text-white/80 hover:text-white"}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className={`ml-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
              scrolled ? "text-ink hover:bg-line" : "text-white hover:bg-white/15"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Panier (${count} article${count !== 1 ? "s" : ""})`}
            className="ml-1 flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm text-cream transition-colors hover:bg-ink/80"
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-dark">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}

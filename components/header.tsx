"use client";

import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useUiStore } from "@/stores/ui-store";
import { useLanguageStore, type Locale } from "@/stores/language-store";
import { useT } from "@/hooks/use-t";
import { MegaMenu } from "@/components/mega-menu";

const LOCALES: Locale[] = ["fr", "en", "ar"];

export function Header() {
  const openCart = useUiStore((s) => s.openCart);
  const { data: cart } = useCart();
  const count = cart?.totalQuantity ?? 0;
  const { openDrawer: openFavorites, items: favoriteItems } = useFavoritesStore();
  const favCount = favoriteItems.length;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [barIndex, setBarIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);
  const t = useT();

  const NAV_LINKS = [
    { href: "/produits", label: t.nav.shop },
    { href: "#fonctionnalites", label: t.nav.features },
    { href: "#avis", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  function resolveHref(href: string) {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (barDismissed) return;
    const id = setInterval(() => setBarIndex((i) => (i + 1) % 3), 4000);
    return () => clearInterval(id);
  }, [barDismissed]);

  const linkClass = "px-3 text-[13px] text-foreground/50 transition-colors hover:text-primary";
  const mobileLinkClass = "w-full border-b border-border py-4 font-display text-xl tracking-wide text-foreground transition-colors hover:text-primary";

  return (
    <>
      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between px-5 pt-5">
            <Link href="/"><LogoMark /></Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={t.nav.closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-0 px-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher inside mobile menu */}
          <div className="px-5 pb-4 flex items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-foreground/30 mr-2">Langue</span>
            <div className="flex items-center gap-0.5 rounded-full border border-black/10 bg-secondary px-1 py-1">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { setLocale(loc); }}
                  aria-label={loc.toUpperCase()}
                  className={`flex h-7 w-8 items-center justify-center rounded-full text-[11px] font-semibold uppercase transition-all ${
                    locale === loc
                      ? "bg-black text-white shadow-sm"
                      : "text-foreground/50 hover:bg-black/8 hover:text-foreground"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 pb-8">
            <button
              type="button"
              onClick={() => { openCart(); setMobileOpen(false); }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Panier {count > 0 && `(${count})`}
            </button>
          </div>
        </div>
      )}

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />

      <header className={`fixed inset-x-0 top-0 z-40 border-b border-border transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-white shadow-sm"}`}>
        {/* Announcement bar */}
        {!barDismissed && (
          <div className="flex items-center justify-between gap-2 border-b border-primary/15 bg-primary px-4 py-1.5">
            <div className="flex flex-1 items-center justify-center gap-2 min-w-0">
              <span className="truncate text-center text-[11px] font-semibold tracking-wide text-white/90">
                {t.keyBadges[barIndex]}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {/* Dot indicators */}
              <div className="hidden items-center gap-1 sm:flex">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBarIndex(i)}
                    aria-label={t.keyBadges[i]}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${barIndex === i ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setBarDismissed(true)}
                aria-label="Fermer"
                className="flex h-5 w-5 items-center justify-center rounded text-white/50 transition-colors hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {/* Mega-menu trigger — desktop only */}
          <button
            type="button"
            onClick={() => setMegaOpen((v) => !v)}
            aria-label="Menu principal"
            className="hidden md:flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Menu className="h-5 w-5" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          <div className="hidden md:block mx-3 h-6 w-px bg-border" />

          <Link href="/">
            <LogoMark />
          </Link>

          <nav className="hidden flex-1 items-center justify-center md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={resolveHref(link.href)} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1 md:flex-none">
            {/* Favorites */}
            <button
              type="button"
              onClick={openFavorites}
              aria-label={`${t.nav.favorites} (${favCount})`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <Heart className="h-4 w-4" />
              {favCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-white">
                  {favCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Panier (${count} article${count !== 1 ? "s" : ""})`}
              className="flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm text-white transition-colors hover:bg-black/80"
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              {count > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-black">
                  {count}
                </span>
              )}
            </button>

            {/* Language switcher — desktop only */}
            <div className="hidden md:flex ml-2 items-center gap-0.5 rounded-full border border-black/10 bg-secondary px-1 py-1">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocale(loc)}
                  aria-label={loc.toUpperCase()}
                  className={`flex h-7 w-8 items-center justify-center rounded-full text-[11px] font-semibold uppercase transition-all ${
                    locale === loc
                      ? "bg-black text-white shadow-sm"
                      : "text-foreground/50 hover:bg-black/8 hover:text-foreground"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // On home page, check if there's a hash in the URL and scroll to it
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el || !lenisRef.current) return;
    // Small delay to let page render first
    const t = setTimeout(() => {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72, lerp: 0.1, duration: 1.6 });
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 });
    lenisRef.current = lenis;

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const anchor = target.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo(el as HTMLElement, { offset: -72, lerp: 0.1, duration: 1.6 });
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleClick, { capture: true });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

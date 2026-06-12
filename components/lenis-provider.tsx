"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Init Lenis once
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 });
    lenisRef.current = lenis;

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Intercept hash-anchor clicks on the same page
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, "", href);
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

  // On every route change: scroll to top OR to hash section
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const hash = window.location.hash;

    if (hash && hash !== "#") {
      // e.g. navigated to /#fonctionnalites from another page
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement, { offset: -72, lerp: 0.1, duration: 1.6 });
        }
      }, 150);
      return () => clearTimeout(t);
    }

    // Normal page navigation — instant scroll to top via Lenis
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}

"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Intercept anchor clicks so Lenis handles them smoothly
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
    };
  }, []);

  return <>{children}</>;
}

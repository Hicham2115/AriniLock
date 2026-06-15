"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Create once — never destroyed on navigation
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 });
    lenisRef.current = lenis;

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Stop Lenis when a Sheet/Dialog locks body scroll, restart when it unlocks
    const bodyObserver = new MutationObserver(() => {
      const locked = document.body.style.overflow === "hidden" ||
        document.body.hasAttribute("data-scroll-locked");
      if (locked) lenis.stop();
      else lenis.start();
    });
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "data-scroll-locked"],
    });

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
      bodyObserver.disconnect();
      document.removeEventListener("click", handleClick, { capture: true });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On navigation: jump to top, then recalculate scroll height after paint
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    // Two rAF frames to ensure new page DOM is fully laid out before resize
    let id1: number;
    let id2: number;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        lenis.resize();
      });
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, [pathname]);

  return <>{children}</>;
}

"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    // RAF loop
    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Recalculate scroll limit when async content changes page height.
    // Lenis's built-in ResizeObserver targets <html> which has height:100% (fixed),
    // so it never fires on content growth. Watching <body> catches it.
    const bodyResizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    bodyResizeObserver.observe(document.body);

    // Pause/resume around modals and drawers (Radix sets data-scroll-locked on body;
    // header/chat set body.style.overflow = "hidden").
    // Re-evaluate on every mutation rather than trying to track deltas.
    const syncScrollLock = () => {
      const locked =
        document.body.style.overflow === "hidden" ||
        document.body.hasAttribute("data-scroll-locked");
      if (locked) lenis.stop();
      else lenis.start();
    };

    const bodyObserver = new MutationObserver(syncScrollLock);
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "data-scroll-locked"],
    });

    // Anchor-link smooth scroll
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
      lenis.scrollTo(el as HTMLElement, { offset: -72, lerp: 0.1, duration: 1.4 });
    };
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      cancelAnimationFrame(frame);
      bodyResizeObserver.disconnect();
      bodyObserver.disconnect();
      document.removeEventListener("click", handleClick, { capture: true });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On navigation: jump to top, resize after paint
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
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

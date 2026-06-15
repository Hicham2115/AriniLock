"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Fresh Lenis instance every navigation — ensures correct scroll height
    const lenis = new Lenis({ lerp: 0.12 });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Scroll to top immediately on mount/navigation
    lenis.scrollTo(0, { immediate: true });

    // Intercept same-page hash-anchor clicks
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
    };
  }, [pathname]);

  return <>{children}</>;
}

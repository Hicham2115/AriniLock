"use client";

import { Marquee } from "@/components/marquee";
import { useT } from "@/hooks/use-t";

export function LocalizedMarquee() {
  const t = useT();
  return (
    <Marquee
      text={t.marquee}
      className="border-y border-line bg-surface py-4"
      trackClassName="text-sm uppercase tracking-[0.25em] text-muted-foreground rtl:font-arabic-display rtl:text-lg rtl:font-medium rtl:tracking-normal rtl:normal-case"
    />
  );
}

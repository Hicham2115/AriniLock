"use client";

import { useLanguageStore } from "@/stores/language-store";
import { translations } from "@/lib/translations";

export function useT() {
  const locale = useLanguageStore((s) => s.locale);
  return translations[locale];
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "fr" | "en" | "ar";

// Shopify LanguageCode enum values
export const SHOPIFY_LANG: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
};

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: "fr",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "arinilock-locale" },
  ),
);

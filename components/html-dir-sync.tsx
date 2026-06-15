"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/stores/language-store";
import { translations } from "@/lib/translations";

export function HtmlDirSync() {
  const locale = useLanguageStore((s) => s.locale);

  useEffect(() => {
    const { dir } = translations[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return null;
}

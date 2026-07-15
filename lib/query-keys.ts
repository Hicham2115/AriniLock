import type { Locale } from "@/stores/language-store";

export const queryKeys = {
  product: (handle: string, locale?: Locale) =>
    (locale ? (["product", handle, locale] as const) : (["product", handle] as const)),
  accessories: (locale?: Locale) =>
    (locale ? (["accessories", locale] as const) : (["accessories"] as const)),
  cart: ["cart"] as const,
};

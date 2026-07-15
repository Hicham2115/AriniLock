"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getAccessories,
  getMainProduct,
  getProductByHandle,
  MAIN_PRODUCT_HANDLE,
} from "@/lib/shopify/products";
import { useLanguageStore } from "@/stores/language-store";

export function useMainProduct() {
  const locale = useLanguageStore((s) => s.locale);
  return useQuery({
    queryKey: queryKeys.product(MAIN_PRODUCT_HANDLE, locale),
    queryFn: () => getMainProduct(locale),
  });
}

export function useProduct(handle: string) {
  const locale = useLanguageStore((s) => s.locale);
  return useQuery({
    queryKey: queryKeys.product(handle, locale),
    queryFn: () => getProductByHandle(handle, locale),
    enabled: !!handle,
  });
}

export function useAccessories() {
  const locale = useLanguageStore((s) => s.locale);
  return useQuery({
    queryKey: queryKeys.accessories(locale),
    queryFn: () => getAccessories(locale),
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  getAccessories,
  getMainProduct,
  getProductByHandle,
  MAIN_PRODUCT_HANDLE,
} from "@/lib/shopify/products";

export function useMainProduct() {
  return useQuery({
    queryKey: queryKeys.product(MAIN_PRODUCT_HANDLE),
    queryFn: getMainProduct,
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: queryKeys.product(handle),
    queryFn: () => getProductByHandle(handle),
    enabled: !!handle,
  });
}

export function useAccessories() {
  return useQuery({
    queryKey: queryKeys.accessories,
    queryFn: getAccessories,
  });
}

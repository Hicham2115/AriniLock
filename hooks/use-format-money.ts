"use client";

import { formatMoney as _fmt } from "@/types/shopify";
import type { Money } from "@/types/shopify";
import { useT } from "./use-t";

export function useFormatMoney() {
  const t = useT();
  return (money: Money) => _fmt(money, t.product.currencyLabel);
}

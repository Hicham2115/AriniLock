"use client";

import { useAddToCart } from "@/hooks/use-cart";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useMainProduct } from "@/hooks/use-product";
import { useUiStore } from "@/stores/ui-store";
import { useT } from "@/hooks/use-t";

export function StickyBuyBar() {
  const t = useT();
  const formatMoney = useFormatMoney();
  const { data: product } = useMainProduct();
  const { addToCart, isPending } = useAddToCart();
  const selectedVariantId = useUiStore((s) => s.selectedVariantId);

  const variant =
    product?.variants.find((v) => v.id === selectedVariantId) ??
    product?.variants[0];

  if (!variant) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-card px-4 py-3 lg:hidden">
      <div>
        <p className="text-sm font-medium text-ink">{product?.title}</p>
        <p className="text-sm text-brass">{formatMoney(variant.price)}</p>
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => addToCart([{ merchandiseId: variant.id, quantity: 1 }])}
        className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-goldhover disabled:opacity-60"
      >
        {t.product.addToCart}
      </button>
    </div>
  );
}

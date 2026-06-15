"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCart,
  useRemoveCartLine,
  useUpdateCartLine,
} from "@/hooks/use-cart";
import { useUiStore } from "@/stores/ui-store";
import { formatMoney, type Cart, type CartLine } from "@/types/shopify";
import { useT } from "@/hooks/use-t";

function computeSubtotal(lines: Cart["lines"]): string {
  if (!lines.length) return "0 MAD";
  const total = lines.reduce((sum, line) => {
    const qty = Math.max(line.quantity, 1);
    return sum + parseFloat(line.merchandise.price.amount) * qty;
  }, 0);
  const currency = lines[0]!.merchandise.price.currencyCode;
  return formatMoney({ amount: total.toFixed(2), currencyCode: currency });
}

function CartLineRow({ line }: { line: CartLine }) {
  const t = useT();
  const updateLine = useUpdateCartLine();
  const removeLine = useRemoveCartLine();
  const busy = updateLine.isPending || removeLine.isPending;
  const displayQty = Math.max(line.quantity, 1);

  return (
    <div className="flex gap-4">
      {line.merchandise.image?.url ? (
        <Image
          src={line.merchandise.image.url}
          alt={line.merchandise.product.title}
          width={80}
          height={80}
          className="h-20 w-20 rounded-xl border border-line object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-line bg-surface">
          <ShoppingBag aria-hidden="true" className="h-6 w-6 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <p className="text-sm font-medium text-ink">
          {line.merchandise.product.title}
        </p>
        {line.merchandise.title !== "Default" &&
          line.merchandise.title !== "Default Title" && (
            <p className="text-xs text-muted-foreground">{line.merchandise.title}</p>
          )}
        <p className="mt-1 text-sm text-brass">
          {formatMoney(line.merchandise.price)}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-line bg-card">
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                updateLine.mutate({ lineId: line.id, quantity: displayQty - 1 })
              }
              aria-label={t.cart.decrease}
              className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-brass disabled:opacity-40"
            >
              <Minus aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-medium">
              {displayQty}
            </span>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                updateLine.mutate({ lineId: line.id, quantity: displayQty + 1 })
              }
              aria-label={t.cart.increase}
              className="flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-brass disabled:opacity-40"
            >
              <Plus aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={() => removeLine.mutate(line.id)}
            aria-label={t.cart.remove}
            className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const t = useT();
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const { data: cart, isLoading, isError } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (!cart?.lines.length) return;
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 border-line bg-card p-0"
      >
        <SheetHeader className="border-b border-line px-6 py-6">
          <SheetTitle className="font-display text-xl font-normal text-ink">
            {t.cart.title}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Articles de votre panier Arini Lock
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {isLoading && (
            <>
              <div className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </>
          )}

          {isError && (
            <p className="text-sm text-muted-foreground">
              {t.errors.loadProducts}
            </p>
          )}

          {!isLoading && !isError && cart?.lines.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <ShoppingBag
                aria-hidden="true"
                className="h-8 w-8 text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                {t.cart.empty}
              </p>
            </div>
          )}

          {cart?.lines.map((line) => (
            <CartLineRow key={line.id} line={line} />
          ))}
        </div>

        <SheetFooter className="border-t border-line bg-card px-6 py-6">
          <div className="w-full">
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>{t.cart.subtotal}</span>
              <span className="text-ink">
                {cart ? computeSubtotal(cart.lines) : "—"}
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              {t.cart.shippingNote}
            </p>
            <Button
              onClick={handleCheckout}
              disabled={!cart || cart.lines.length === 0}
              className="h-13 w-full rounded-full bg-gold py-4 font-medium text-dark hover:bg-goldhover"
            >
              {t.cart.checkout}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

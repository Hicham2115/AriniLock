"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import {
  addCartLines,
  getCart,
  removeCartLines,
  updateCartLine,
  type CartLineInput,
} from "@/lib/shopify/cart";
import { useUiStore } from "@/stores/ui-store";
import type { Cart } from "@/types/shopify";

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: getCart,
  });
}

function useCartMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<Cart>,
  errorMessage: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (cart) => {
      queryClient.setQueryData(queryKeys.cart, cart);
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
    onError: (error: Error) => {
      toast.error(errorMessage, {
        description: error.message,
      });
    },
  });
}

export function useAddToCart() {
  const openCart = useUiStore((s) => s.openCart);
  const mutation = useCartMutation(
    (lines: CartLineInput[]) => addCartLines(lines),
    "Impossible d'ajouter au panier",
  );

  const addToCart = (
    lines: CartLineInput[],
    options?: { successMessage?: string },
  ) =>
    mutation.mutate(lines, {
      onSuccess: () => {
        toast.success(options?.successMessage ?? "Ajouté au panier");
        openCart();
      },
    });

  return { ...mutation, addToCart };
}

export function useUpdateCartLine() {
  return useCartMutation(
    ({ lineId, quantity }: { lineId: string; quantity: number }) =>
      updateCartLine(lineId, quantity),
    "Impossible de mettre à jour le panier",
  );
}

export function useRemoveCartLine() {
  return useCartMutation(
    (lineId: string) => removeCartLines([lineId]),
    "Impossible de retirer cet article",
  );
}

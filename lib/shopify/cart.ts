import { isShopifyConfigured, shopifyFetch } from "./client";
import { mockCartApi } from "./mock";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "./queries";
import { cartSchema, type Cart } from "@/types/shopify";

const CART_ID_STORAGE_KEY = "arinilock-cart-id";

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CART_ID_STORAGE_KEY);
}

function storeCartId(cartId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
}

function clearCartId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_ID_STORAGE_KEY);
}

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: unknown[] };
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
}

interface CartPayload {
  cart: RawCart | null;
  userErrors?: { message: string }[];
}

function normalizeCart(payload: CartPayload): Cart {
  if (payload.userErrors?.length) {
    throw new Error(payload.userErrors.map((e) => e.message).join(" — "));
  }
  if (!payload.cart) throw new Error("Panier indisponible.");
  return cartSchema.parse({ ...payload.cart, lines: payload.cart.lines.nodes });
}

const EMPTY_CART: Cart = {
  id: "",
  checkoutUrl: "",
  totalQuantity: 0,
  lines: [],
  cost: { subtotalAmount: { amount: "0", currencyCode: "MAD" } },
};

export async function getCart(): Promise<Cart> {
  if (!isShopifyConfigured) return mockCartApi.getCart();

  const cartId = getStoredCartId();
  if (!cartId) return EMPTY_CART;

  const data = await shopifyFetch<{ cart: RawCart | null }>(CART_QUERY, {
    cartId,
  });
  if (!data.cart) {
    clearCartId();
    return EMPTY_CART;
  }
  return normalizeCart({ cart: data.cart });
}

async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: CartPayload }>(
    CART_CREATE_MUTATION,
    { lines },
  );
  const cart = normalizeCart(data.cartCreate);
  storeCartId(cart.id);
  return cart;
}

export async function addCartLines(lines: CartLineInput[]): Promise<Cart> {
  if (!isShopifyConfigured) return mockCartApi.addLines(lines);

  const cartId = getStoredCartId();
  if (!cartId) return createCart(lines);

  try {
    const data = await shopifyFetch<{ cartLinesAdd: CartPayload }>(
      CART_LINES_ADD_MUTATION,
      { cartId, lines },
    );
    return normalizeCart(data.cartLinesAdd);
  } catch {
    clearCartId();
    return createCart(lines);
  }
}

export async function updateCartLine(
  lineId: string,
  quantity: number,
): Promise<Cart> {
  if (!isShopifyConfigured) return mockCartApi.updateLine(lineId, quantity);

  const cartId = getStoredCartId();
  if (!cartId) throw new Error("Aucun panier actif.");

  if (quantity <= 0) return removeCartLines([lineId]);

  const data = await shopifyFetch<{ cartLinesUpdate: CartPayload }>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  return normalizeCart(data.cartLinesUpdate);
}

export async function removeCartLines(lineIds: string[]): Promise<Cart> {
  if (!isShopifyConfigured) return mockCartApi.removeLines(lineIds);

  const cartId = getStoredCartId();
  if (!cartId) throw new Error("Aucun panier actif.");

  const data = await shopifyFetch<{ cartLinesRemove: CartPayload }>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds },
  );
  return normalizeCart(data.cartLinesRemove);
}

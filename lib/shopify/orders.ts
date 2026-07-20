import { shopifyAdminFetch } from "./admin";

const ORDER_CREATE_MUTATION = `#graphql
  mutation orderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
    orderCreate(order: $order, options: $options) {
      userErrors { field message }
      order { id name }
    }
  }
`;

interface OrderCreateResponse {
  orderCreate: {
    userErrors: { field: string[]; message: string }[];
    order: { id: string; name: string } | null;
  };
}

export interface OrderLineInput {
  variantId: string;
  quantity: number;
}

interface CreateOrderInput {
  lineItems: OrderLineInput[];
  fullName: string;
  phone: string;
  address1: string;
  city: string;
  note: string;
  tags: string[];
}

export interface QuickOrderInput {
  variantId: string;
  quantity: number;
  fullName: string;
  phone: string;
  address1: string;
  city: string;
  note: string;
}

export interface CartOrderInput {
  lines: OrderLineInput[];
  fullName: string;
  phone: string;
  address1: string;
  city: string;
  note: string;
}

// Shopify's orderCreate silently drops shippingAddress/billingAddress when
// lastName is empty (no userErrors) — always send a non-empty lastName.
// When only one word is given, use an invisible zero-width-space placeholder
// (NOT a duplicate of firstName) so downstream display can show the name alone.
export const NO_LAST_NAME_PLACEHOLDER = "​";

function splitName(fullName: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return { firstName, lastName: rest.length ? rest.join(" ") : NO_LAST_NAME_PLACEHOLDER };
}

async function createOrder(input: CreateOrderInput): Promise<{ id: string; name: string }> {
  const { firstName, lastName } = splitName(input.fullName);
  const data = await shopifyAdminFetch<OrderCreateResponse>(ORDER_CREATE_MUTATION, {
    order: {
      lineItems: input.lineItems,
      shippingAddress: {
        firstName,
        lastName,
        address1: input.address1,
        city: input.city,
        countryCode: "MA",
        phone: input.phone,
      },
      financialStatus: "PENDING",
      tags: input.tags,
      note: input.note,
    },
    // Without this, orderCreate defaults to BYPASS and never touches
    // inventory — orders would keep being placed regardless of stock.
    options: { inventoryBehaviour: "DECREMENT_OBEYING_POLICY" },
  });

  const { userErrors, order } = data.orderCreate;
  if (userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join(" — "));
  }
  if (!order) {
    throw new Error("La commande n'a pas pu être créée.");
  }
  return order;
}

export async function createQuickOrder(input: QuickOrderInput): Promise<{ id: string; name: string }> {
  return createOrder({
    lineItems: [{ variantId: input.variantId, quantity: input.quantity }],
    fullName: input.fullName,
    phone: input.phone,
    address1: input.address1,
    city: input.city,
    note: input.note,
    tags: ["achat-rapide", "cod"],
  });
}

export async function createOrderFromCart(input: CartOrderInput): Promise<{ id: string; name: string }> {
  return createOrder({
    lineItems: input.lines,
    fullName: input.fullName,
    phone: input.phone,
    address1: input.address1,
    city: input.city,
    note: input.note,
    tags: ["panier", "cod"],
  });
}

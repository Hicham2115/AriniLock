import { shopifyAdminFetch } from "./admin";

const ORDER_CREATE_MUTATION = `#graphql
  mutation orderCreate($order: OrderCreateOrderInput!) {
    orderCreate(order: $order) {
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

export interface QuickOrderInput {
  variantId: string;
  quantity: number;
  fullName: string;
  phone: string;
  address1: string;
  city: string;
  note: string;
}

// Shopify's orderCreate silently drops shippingAddress/billingAddress when
// lastName is empty (no userErrors) — always send a non-empty lastName.
function splitName(fullName: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return { firstName, lastName: rest.length ? rest.join(" ") : firstName };
}

export async function createQuickOrder(input: QuickOrderInput): Promise<{ id: string; name: string }> {
  const { firstName, lastName } = splitName(input.fullName);
  const data = await shopifyAdminFetch<OrderCreateResponse>(ORDER_CREATE_MUTATION, {
    order: {
      lineItems: [{ variantId: input.variantId, quantity: input.quantity }],
      shippingAddress: {
        firstName,
        lastName,
        address1: input.address1,
        city: input.city,
        countryCode: "MA",
        phone: input.phone,
      },
      financialStatus: "PENDING",
      tags: ["achat-rapide", "cod"],
      note: input.note,
    },
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

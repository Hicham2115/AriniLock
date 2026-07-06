import axios from "axios";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2025-04";

/**
 * Sans identifiants Shopify, le site bascule sur des données de
 * démonstration (lib/shopify/mock.ts) pour rester fonctionnel en local.
 */ 
export const isShopifyConfigured =
  Boolean(domain && token) &&
  domain !== "votre-boutique.myshopify.com" &&
  token !== "votre_token_storefront";

const storefront = axios.create({
  baseURL: `https://${domain}/api/${apiVersion}/graphql.json`,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token ?? "",
  },
});

interface GraphQLError {
  message: string;
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  try {
    const response = await storefront.post<{
      data: T;
      errors?: GraphQLError[];
    }>("", { query, variables });

    if (response.data.errors?.length) {
      throw new Error(response.data.errors.map((e) => e.message).join(" — "));
    }
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        (err.response?.data as { errors?: GraphQLError[] } | undefined)
          ?.errors?.[0]?.message ?? err.message;
      throw new Error(`Erreur Shopify : ${message}`);
    }
    throw err;
  }
}

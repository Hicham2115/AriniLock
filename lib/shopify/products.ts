import { isShopifyConfigured, shopifyFetch } from "./client";
import { MOCK_ACCESSORIES, MOCK_PRODUCT } from "./mock";
import { ACCESSORIES_QUERY, PRODUCT_BY_HANDLE_QUERY } from "./queries";
import { productSchema, type Product } from "@/types/shopify";

export const MAIN_PRODUCT_HANDLE =
  process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_HANDLE ??
  "poignee-connectee-smart-door-lock";

export const ACCESSORIES_TAG_QUERY =
  process.env.NEXT_PUBLIC_SHOPIFY_ACCESSORIES_QUERY ?? "tag:accessoire";

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  tags?: string[];
  images: { nodes: unknown[] };
  variants: { nodes: unknown[] };
}

function normalizeProduct(raw: RawProduct): Product {
  return productSchema.parse({
    ...raw,
    images: raw.images.nodes,
    variants: raw.variants.nodes,
  });
}

export async function getMainProduct(): Promise<Product> {
  if (!isShopifyConfigured) return MOCK_PRODUCT;

  const data = await shopifyFetch<{ product: RawProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle: MAIN_PRODUCT_HANDLE },
  );
  if (!data.product) {
    throw new Error(`Produit introuvable : ${MAIN_PRODUCT_HANDLE}`);
  }
  return normalizeProduct(data.product);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    const all = [MOCK_PRODUCT, ...MOCK_ACCESSORIES];
    return all.find((p) => p.handle === handle) ?? null;
  }
  const data = await shopifyFetch<{ product: RawProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  if (!data.product) return null;
  return normalizeProduct(data.product);
}

export async function getAccessories(): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_ACCESSORIES;

  const data = await shopifyFetch<{ products: { nodes: RawProduct[] } }>(
    ACCESSORIES_QUERY,
    { query: ACCESSORIES_TAG_QUERY },
  );
  return data.products.nodes.map(normalizeProduct);
}

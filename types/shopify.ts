import { z } from "zod";

export const moneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const imageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
});

export const variantSchema = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  quantityAvailable: z.number().nullable().optional(),
  price: moneySchema,
  compareAtPrice: moneySchema.nullable().optional(),
  image: imageSchema.nullable().optional(),
  selectedOptions: z.array(z.object({ name: z.string(), value: z.string() })),
});

export const metafieldSchema = z.object({
  key: z.string(),
  value: z.string(),
}).nullable();

export const productSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  descriptionHtml: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(imageSchema),
  variants: z.array(variantSchema),
  metafields: z.array(metafieldSchema).optional(),
});

export const cartLineSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  merchandise: z.object({
    id: z.string(),
    title: z.string(),
    price: moneySchema,
    image: imageSchema.nullable().optional(),
    product: z.object({ title: z.string(), handle: z.string() }),
  }),
});

export const cartSchema = z.object({
  id: z.string(),
  checkoutUrl: z.string(),
  totalQuantity: z.number(),
  lines: z.array(cartLineSchema),
  cost: z.object({
    subtotalAmount: moneySchema,
  }),
});

export type Money = z.infer<typeof moneySchema>;
export type ShopifyImage = z.infer<typeof imageSchema>;
export type ProductVariant = z.infer<typeof variantSchema>;
export type Product = z.infer<typeof productSchema>;
export type CartLine = z.infer<typeof cartLineSchema>;
export type Cart = z.infer<typeof cartSchema>;

export const newsletterSchema = z.object({
  email: z.email("Veuillez saisir une adresse email valide."),
});

export type NewsletterPayload = z.infer<typeof newsletterSchema>;

export function isProductInStock(product: Product): boolean {
  return product.variants.some((v) => {
    // Storefront API returns null when inventory isn't tracked for a
    // variant — treat that as always in stock (no count to be empty).
    if (v.quantityAvailable == null) return true;
    return v.quantityAvailable > 0;
  });
}

export function formatMoney(money: Money, currencyLabel?: string): string {
  const value = Number.parseFloat(money.amount);
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
  const label = currencyLabel ?? (money.currencyCode === "MAD" ? "MAD" : money.currencyCode);
  return `⁦${formatted} ${label}⁩`;
}

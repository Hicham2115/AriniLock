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
  price: moneySchema,
  compareAtPrice: moneySchema.nullable().optional(),
  image: imageSchema.nullable().optional(),
  selectedOptions: z.array(z.object({ name: z.string(), value: z.string() })),
});

export const productSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(imageSchema),
  variants: z.array(variantSchema),
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

export function formatMoney(money: Money): string {
  const value = Number.parseFloat(money.amount);
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
  return `${formatted} ${money.currencyCode === "MAD" ? "MAD" : money.currencyCode}`;
}

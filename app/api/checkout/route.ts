import { NextResponse } from "next/server";
import { z } from "zod";
import { logOrderToSheet } from "@/lib/google-sheets";
import { isShopifyAdminConfigured } from "@/lib/shopify/admin";
import { createOrderFromCart } from "@/lib/shopify/orders";

const itemSchema = z.object({
  variantId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/),
  title: z.string().min(1),
  variant: z.string().optional(),
  quantity: z.number().int().min(1),
  price: z.string().min(1),
});

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  phone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, "Numéro marocain invalide"),
  city: z.string().min(1, "Ville requise"),
  address: z.string().min(5, "Adresse requise"),
  notes: z.string().optional(),
  items: z.array(itemSchema).min(1),
});

export async function POST(req: Request) {
  let data: z.infer<typeof checkoutSchema>;
  try {
    data = checkoutSchema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const orderTotal = data.items
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);
  const note = [
    `Panier — ${data.items.map((i) => `${i.title} × ${i.quantity}`).join(", ")}`,
    data.notes,
  ]
    .filter(Boolean)
    .join(" | ");

  if (!isShopifyAdminConfigured) {
    // No real Shopify order is created here, so the orders/create webhook
    // will never fire for it — log directly as a fallback.
    console.log("[demo] Cart checkout (Shopify Admin not configured):", data);
    const orderRef = `DEMO-${Date.now()}`;
    for (const item of data.items) {
      const lineTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
      await logOrderToSheet({
        orderName: orderRef,
        productName: item.title,
        quantity: item.quantity,
        unitPrice: item.price,
        lineTotal,
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        orderTotal,
      });
    }
    return NextResponse.json({ ok: true, orderRef });
  }

  try {
    // Sheets logging happens via the orders/create webhook (app/api/webhooks/shopify-orders),
    // which fires for this order same as any other — no direct call needed here.
    const order = await createOrderFromCart({
      lines: data.items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
      fullName: data.fullName,
      phone: data.phone,
      address1: data.address,
      city: data.city,
      note,
    });
    return NextResponse.json({ ok: true, orderRef: order.name });
  } catch (err) {
    console.error("Cart checkout order creation failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

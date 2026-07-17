import { NextResponse } from "next/server";
import { z } from "zod";
import { isShopifyAdminConfigured } from "@/lib/shopify/admin";
import { createQuickOrder } from "@/lib/shopify/orders";

const quickOrderSchema = z.object({
  variantId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/),
  quantity: z.number().int().min(1),
  productName: z.string().min(1),
  price: z.string().min(1),
  prenom: z.string().min(1),
  telephone: z.string().regex(/^(0|\+212)[5-7]\d{8}$/),
  adresse: z.string().min(3),
  ville: z.string().min(1),
});

export async function POST(req: Request) {
  let data: z.infer<typeof quickOrderSchema>;
  try {
    data = quickOrderSchema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  if (!isShopifyAdminConfigured) {
    console.log("[demo] Quick order (Shopify Admin not configured):", data);
    return NextResponse.json({ ok: true, orderName: `DEMO-${Date.now()}` });
  }

  try {
    const order = await createQuickOrder({
      variantId: data.variantId,
      quantity: data.quantity,
      fullName: data.prenom,
      phone: data.telephone,
      address1: data.adresse,
      city: data.ville,
      note: `Achat rapide — ${data.productName} (${data.price}) × ${data.quantity}`,
    });
    return NextResponse.json({ ok: true, orderId: order.id, orderName: order.name });
  } catch (err) {
    console.error("Quick order creation failed:", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}

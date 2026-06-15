import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  phone: z.string().regex(/^(\+212|0)[5-7]\d{8}$/, "Numéro marocain invalide"),
  city: z.string().min(1, "Ville requise"),
  address: z.string().min(5, "Adresse requise"),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      variant: z.string(),
      quantity: z.number(),
      price: z.string(),
    }),
  ),
  total: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    // TODO: plug in Shopify Admin API draft order, email, or WhatsApp notification
    console.log("New COD order:", JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true, orderRef: `ARN-${Date.now()}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: err.issues }, { status: 422 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

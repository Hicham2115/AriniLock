import crypto from "crypto";
import { NextResponse } from "next/server";
import { logOrderToSheet } from "@/lib/google-sheets";

const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET ?? "";

function verifyHmac(rawBody: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) return false;
  const digest = crypto.createHmac("sha256", clientSecret).update(rawBody, "utf8").digest("base64");
  const a = Buffer.from(digest);
  const b = Buffer.from(hmacHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

interface ShopifyOrderWebhookPayload {
  name: string;
  total_price: string;
  currency: string;
  phone: string | null;
  line_items: { title: string; quantity: number }[];
  shipping_address: {
    first_name: string | null;
    last_name: string | null;
    address1: string | null;
    city: string | null;
    phone: string | null;
  } | null;
  customer: { first_name: string | null; last_name: string | null; phone: string | null } | null;
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!verifyHmac(rawBody, req.headers.get("x-shopify-hmac-sha256"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const order = JSON.parse(rawBody) as ShopifyOrderWebhookPayload;
  const address = order.shipping_address;
  const fullName =
    [address?.first_name ?? order.customer?.first_name, address?.last_name ?? order.customer?.last_name]
      .filter(Boolean)
      .join(" ") || "—";

  await logOrderToSheet({
    orderName: order.name,
    productName: order.line_items.map((li) => li.title).join(", "),
    quantity: order.line_items.reduce((sum, li) => sum + li.quantity, 0),
    price: `${order.total_price} ${order.currency}`,
    fullName,
    phone: address?.phone ?? order.phone ?? order.customer?.phone ?? "",
    address: address?.address1 ?? "",
    city: address?.city ?? "",
  });

  return NextResponse.json({ ok: true });
}

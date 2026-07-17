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
  line_items: { title: string; quantity: number; price: string }[];
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
  // Orders created via the quick-buy form send a zero-width-space lastName
  // when the customer only gave one name (see NO_LAST_NAME_PLACEHOLDER in
  // lib/shopify/orders.ts) — strip it so the sheet shows the name alone
  // instead of a duplicated "name name".
  const lastName = (address?.last_name ?? order.customer?.last_name ?? "").replace(/​/g, "").trim();
  const fullName =
    [address?.first_name ?? order.customer?.first_name, lastName || null].filter(Boolean).join(" ") || "—";
  const orderTotal = `${order.total_price} ${order.currency}`;
  const phone = address?.phone ?? order.phone ?? order.customer?.phone ?? "";
  const city = address?.city ?? "";
  const shippingAddress = address?.address1 ?? "";

  // One row per line item, so a multi-product order reads the same way it
  // does on the Shopify order page (each product with its own price × qty).
  for (const li of order.line_items) {
    const unitPrice = parseFloat(li.price);
    await logOrderToSheet({
      orderName: order.name,
      productName: li.title,
      quantity: li.quantity,
      unitPrice: `${unitPrice.toFixed(2)} ${order.currency}`,
      lineTotal: `${(unitPrice * li.quantity).toFixed(2)} ${order.currency}`,
      fullName,
      phone,
      address: shippingAddress,
      city,
      orderTotal,
    });
  }

  return NextResponse.json({ ok: true });
}

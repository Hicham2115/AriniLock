import axios from "axios";

const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

export const isGoogleSheetsConfigured = Boolean(webhookUrl && webhookSecret);

export interface SheetOrderRow {
  orderName: string;
  productName: string;
  quantity: number;
  price: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

// Best-effort logging — a Sheets outage must never block a real Shopify order,
// so failures are swallowed (and logged) rather than thrown.
export async function logOrderToSheet(row: SheetOrderRow): Promise<void> {
  if (!isGoogleSheetsConfigured) return;

  try {
    await axios.post(
      webhookUrl!,
      { secret: webhookSecret, ...row },
      { timeout: 10_000, maxRedirects: 5 },
    );
  } catch (err) {
    console.error("Google Sheets order logging failed:", err);
  }
}

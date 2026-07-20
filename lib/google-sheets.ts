import axios from "axios";

const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

export const isGoogleSheetsConfigured = Boolean(webhookUrl && webhookSecret);

// One row per line item, mirroring how Shopify's order page breaks a
// multi-product order into one line per product with its own price × qty.
export interface SheetOrderRow {
  orderName: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  orderTotal: string;
}

// Shopify sometimes drops the leading 0 from a Moroccan mobile number
// (e.g. "612345678" instead of "0612345678"). Restore it so the sheet reads
// naturally — everything else (other prefixes, foreign numbers) is left
// exactly as the client entered it.
function normalizeMoroccanPhone(phone: string): string {
  const trimmed = phone.trim();
  return /^[67]\d{8}$/.test(trimmed) ? `0${trimmed}` : trimmed;
}

// Best-effort logging — a Sheets outage must never block a real Shopify order,
// so failures are swallowed (and logged) rather than thrown.
export async function logOrderToSheet(row: SheetOrderRow): Promise<void> {
  if (!isGoogleSheetsConfigured) return;

  try {
    await axios.post(
      webhookUrl!,
      { secret: webhookSecret, ...row, phone: normalizeMoroccanPhone(row.phone) },
      { timeout: 10_000, maxRedirects: 5 },
    );
  } catch (err) {
    console.error("Google Sheets order logging failed:", err);
  }
}

import axios from "axios";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2025-04";

export const isShopifyAdminConfigured = Boolean(domain && clientId && clientSecret);

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAdminAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const response = await axios.post<{ access_token: string; expires_in: number }>(
    `https://${domain}/admin/oauth/access_token`,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId ?? "",
      client_secret: clientSecret ?? "",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, timeout: 10_000 },
  );

  const { access_token, expires_in } = response.data;
  cachedToken = { value: access_token, expiresAt: Date.now() + (expires_in - 60) * 1000 };
  return access_token;
}

interface GraphQLError {
  message: string;
}

export async function shopifyAdminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  try {
    const token = await getAdminAccessToken();
    const response = await axios.post<{ data: T; errors?: GraphQLError[] }>(
      `https://${domain}/admin/api/${apiVersion}/graphql.json`,
      { query, variables },
      {
        timeout: 10_000,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
      },
    );

    if (response.data.errors?.length) {
      throw new Error(response.data.errors.map((e) => e.message).join(" — "));
    }
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        (err.response?.data as { errors?: GraphQLError[] } | undefined)
          ?.errors?.[0]?.message ?? err.message;
      throw new Error(`Erreur Shopify Admin : ${message}`);
    }
    throw err;
  }
}

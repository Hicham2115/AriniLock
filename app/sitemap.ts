import type { MetadataRoute } from "next";
import { getAccessories, getMainProduct } from "@/lib/shopify/products";

const BASE = "https://arinilock.ma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [mainProduct, accessories] = await Promise.all([
    getMainProduct().catch(() => null),
    getAccessories().catch(() => []),
  ]);

  const productUrls: MetadataRoute.Sitemap = [];

  if (mainProduct) {
    productUrls.push({
      url: `${BASE}/produits/${mainProduct.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const acc of accessories) {
    productUrls.push({
      url: `${BASE}/produits/${acc.handle}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/produits`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...productUrls,
  ];
}

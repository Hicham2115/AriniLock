import type { Metadata } from "next";
import { ProductPageClient } from "@/components/product-page-client";
import { getProductByHandle } from "@/lib/shopify/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas ou n'est plus disponible.",
    };
  }

  const description = product.description.slice(0, 160);
  const image = product.images[0];
   
  return {
    title: product.title,
    description,
    alternates: { canonical: `https://www.arinilock.ma/produits/${handle}` },
    openGraph: {
      title: `${product.title} | ARINILOCK`,
      description,
      images: image
        ? [{ url: image.url, width: image.width ?? 900, height: image.height ?? 900, alt: image.altText ?? product.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ARINILOCK`,
      description,
      images: image ? [image.url] : ["/og-image.jpg"],
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  return <ProductPageClient params={params} />;
}

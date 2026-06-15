"use client";

import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { useAddToCart } from "@/hooks/use-cart";
import { useAccessories, useProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import { formatMoney } from "@/types/shopify";

const SWATCH_BG: Record<string, string> = {
  "Noir Mat": "bg-[#1E1B18]",
  Argent: "bg-[#C7C9CC]",
  Or: "bg-[#C49A65]",
};


const ACCORDION_ITEMS = [
  {
    value: "specs",
    trigger: "Spécifications techniques",
    content:
      "Empreintes : jusqu'à 100 · Codes PIN : jusqu'à 50 · Autonomie : 12 mois (4× AA) · Protocole : Bluetooth 5.0 + Wi-Fi (optionnel) · Certifications : IP65, EN 1634 · Dimensions : 245 × 70 × 28 mm",
  },
  {
    value: "installation",
    trigger: "Installation",
    content:
      "Compatible portes standard (60–80 mm d'épaisseur). Fixation adhésive 3M haute résistance — aucun perçage nécessaire. Un tutoriel vidéo est inclus, installation en moins de 15 minutes.",
  },
  {
    value: "warranty",
    trigger: "Garantie & retours",
    content:
      "Garantie constructeur 2 ans couvrant tout défaut de fabrication. Retours acceptés sous 30 jours si le produit est dans son état d'origine. Assistance 7j/7 par WhatsApp.",
  },
];

function GallerySkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Skeleton className="aspect-square w-full flex-1 rounded-2xl sm:aspect-4/5" />
      <div className="flex gap-2 lg:hidden">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-12 shrink-0 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function InfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-14 w-full" />
    </div>
  );
}

export function ProductPageClient({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const t = useT();

  const TRUST = [
    { icon: Truck, label: t.trust.delivery, sub: t.trust.deliverySub },
    { icon: ShieldCheck, label: t.trust.warranty, sub: t.trust.warrantySub },
    { icon: Zap, label: t.trust.install, sub: t.trust.installSub },
  ];

  const { handle } = use(params);
  const { data: product, isLoading, isError } = useProduct(handle);
  const {
    data: accessories,
    isLoading: loadingAcc,
    isError: isErrorAcc,
  } = useAccessories();
  const { addToCart, isPending } = useAddToCart();

  useEffect(() => {
    if (isError)
      toast.error(t.errors.notFound, {
        description: t.errors.backToShop,
      });
  }, [isError, t]);

  useEffect(() => {
    if (isErrorAcc)
      toast.error(t.errors.loadProducts);
  }, [isErrorAcc, t]);

  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);

  const variant =
    product?.variants.find(
      (v) => v.id === (activeVariantId ?? product.variants[0]?.id),
    ) ?? product?.variants[0];

  const images = product?.images ?? [];
  // Always drive the gallery from activeImageIdx — never let variant.image override
  const mainImage = images[activeImageIdx] ?? images[0];

  function selectVariant(id: string) {
    setActiveVariantId(id);
    const v = product?.variants.find((v) => v.id === id);
    if (v?.image) {
      const idx = images.findIndex((img) => img.url === v.image!.url);
      if (idx >= 0) setActiveImageIdx(idx);
    }
  }

  const relatedProducts =
    accessories?.filter((a) => a.handle !== handle).slice(0, 4) ?? [];

  const hasVariants =
    (product?.variants.length ?? 0) > 1 &&
    product?.variants[0]?.selectedOptions?.[0]?.name !== "Default";

  const { toggle, isFavorite } = useFavoritesStore();
  const liked = product ? isFavorite(product.id) : false;

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-background pb-safe">
        {/* Breadcrumb */}
        <div className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-4 pb-4 pt-20 sm:px-6 md:pt-28 lg:px-10">
            <nav
              aria-label="Fil d'Ariane"
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Link href="/" className="transition-colors hover:text-ink">
                {t.breadcrumb.home}
              </Link>
              <span>/</span>
              <Link
                href="/produits"
                className="transition-colors hover:text-ink"
              >
                {t.breadcrumb.shop}
              </Link>
              <span>/</span>
              <span className="max-w-40 truncate text-ink sm:max-w-none">
                {product?.title ?? "…"}
              </span>
            </nav>
          </div>
        </div>

        {/* Main grid */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-16">
            {/* ── Left: Gallery ── */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              {isLoading ? (
                <GallerySkeleton />
              ) : (
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-3">
                  {/* Thumbnails — horizontal on mobile, vertical on desktop */}
                  {images.length > 1 && (
                    <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0">
                      {images.map((img, i) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setActiveImageIdx(i)}
                          aria-label={img.altText ?? `Image ${i + 1}`}
                          className={cn(
                            "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                            i === activeImageIdx
                              ? "border-gold opacity-100"
                              : "border-transparent opacity-50 hover:opacity-80",
                          )}
                        >
                          <Image
                            src={img.url}
                            alt={img.altText ?? `Image ${i + 1}`}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Main image */}
                  <div
                    className={cn(
                      "order-1 relative flex-1 overflow-hidden rounded-2xl bg-white lg:order-2",
                      "aspect-square sm:aspect-4/5",
                    )}
                  >
                    {mainImage ? (
                      <Image
                        key={mainImage.url}
                        src={mainImage.url}
                        alt={mainImage.altText ?? product?.title ?? ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-line" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Info ── */}
            <div>
              {isLoading ? (
                <InfoSkeleton />
              ) : isError || !product ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  {t.errors.notFound}{" "}
                  <Link href="/produits" className="text-ink underline">
                    {t.errors.backToShop}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Title + rating */}
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {t.product.brand}
                    </p>
                    <div className="flex items-start justify-between gap-4">
                      <h1 className="font-display2 text-2xl uppercase leading-tight text-ink md:text-3xl">
                        {product.title}
                      </h1>
                      <button
                        type="button"
                        onClick={() => toggle(product)}
                        aria-label={
                          liked ? t.favorites.remove : t.favorites.add
                        }
                        className="mt-1 shrink-0 rounded-full border border-line p-2 transition-colors hover:border-gold"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-colors",
                            liked
                              ? "fill-gold text-gold"
                              : "text-muted-foreground",
                          )}
                        />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className="flex text-gold"
                        aria-label="4.8 étoiles sur 5"
                      >
                        {[0, 1, 2, 3, 4].map((i) => (
                          <svg
                            key={i}
                            className="h-3.5 w-3.5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        4.8 · 312 {t.product.reviews}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-display2 text-2xl leading-none text-gold sm:text-3xl">
                      {formatMoney(variant!.price)}
                    </span>
                    {variant?.compareAtPrice && (
                      <span className="text-base text-muted-foreground line-through">
                        {formatMoney(variant.compareAtPrice)}
                      </span>
                    )}
                    {variant?.compareAtPrice && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brass">
                        Promo
                      </span>
                    )}
                  </div>

                  {/* Description — formatted HTML from Shopify */}
                  {(product.descriptionHtml || product.description) && (
                    <div>
                      <div
                        className={cn(
                          "shopify-description text-sm leading-relaxed text-black",
                          !descExpanded && "line-clamp-4",
                        )}
                        dangerouslySetInnerHTML={{
                          __html:
                            product.descriptionHtml ?? product.description,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setDescExpanded((v) => !v)}
                        className="mt-1 flex items-center gap-1 text-xs text-gold hover:underline"
                      >
                        {descExpanded ? t.product.readLess : t.product.readMore}
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform",
                            descExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                  )}

                  {/* Variant swatches */}
                  {hasVariants && (
                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {t.product.finish} —{" "}
                        <span className="text-ink">
                          {variant?.selectedOptions[0]?.value}
                        </span>
                      </p>
                      <div className="flex gap-2">
                        {product.variants.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => selectVariant(v.id)}
                            aria-label={`Finition ${v.title}`}
                            aria-pressed={
                              v.id ===
                              (activeVariantId ?? product.variants[0]?.id)
                            }
                            className={cn(
                              "h-8 w-8 rounded-full border-2 transition-all",
                              SWATCH_BG[v.title] ?? "bg-muted",
                              v.id ===
                                (activeVariantId ?? product.variants[0]?.id)
                                ? "scale-110 border-gold ring-2 ring-gold/30"
                                : "border-transparent opacity-70 hover:opacity-100",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity + CTA */}
                  <div className="flex gap-3">
                    <div className="flex h-12 items-center rounded-full border border-line sm:h-14">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Diminuer la quantité"
                        className="flex h-full w-12 items-center justify-center text-muted-foreground transition-colors hover:text-ink"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-ink">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        aria-label="Augmenter la quantité"
                        className="flex h-full w-12 items-center justify-center text-muted-foreground transition-colors hover:text-ink"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        variant &&
                        addToCart([
                          { merchandiseId: variant.id, quantity: qty },
                        ])
                      }
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition-colors hover:bg-ink/80 disabled:opacity-50 sm:h-14"
                    >
                      <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                      {isPending ? t.product.adding : t.product.addToCart}
                    </button>
                  </div>

                  {/* Trust strip */}
                  <div className="grid divide-y divide-line rounded-xl border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {TRUST.map(({ icon: Icon, label, sub }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 px-4 py-3 sm:flex-col sm:items-center sm:gap-1 sm:px-3 sm:py-4 sm:text-center"
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-gold"
                        />
                        <div className="sm:contents">
                          <p className="text-[11px] font-medium leading-tight text-ink">
                            {label}
                          </p>
                          <p className="hidden text-[10px] text-muted-foreground sm:block">
                            {sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    {ACCORDION_ITEMS.map((item) => (
                      <AccordionItem key={item.value} value={item.value}>
                        <AccordionTrigger className="text-sm font-medium text-ink hover:text-gold hover:no-underline">
                          {item.trigger}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-black/70">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {(relatedProducts.length > 0 || loadingAcc) && (
          <div className="border-t border-line">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t.product.relatedTitle}
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {loadingAcc
                  ? [0, 1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
                  : relatedProducts.map((p) => (
                      <Link key={p.id} href={`/produits/${p.handle}`}>
                        <ProductCard product={p} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

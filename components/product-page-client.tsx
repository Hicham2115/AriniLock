"use client";

import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
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
import { cn } from "@/lib/utils";
import { formatMoney } from "@/types/shopify";

const SWATCH_BG: Record<string, string> = {
  "Noir Mat": "bg-[#1E1B18]",
  Argent: "bg-[#C7C9CC]",
  Or: "bg-[#C49A65]",
};

const TRUST = [
  { icon: Truck, label: "Livraison 2–4 jours", sub: "Partout au Maroc" },
  { icon: ShieldCheck, label: "Garantie 2 ans", sub: "Constructeur" },
  { icon: Zap, label: "Installation < 15 min", sub: "Sans perçage" },
];

const ACCORDION_ITEMS = [
  {
    value: "description",
    trigger: "Description",
    content:
      "La poignée connectée Arini Lock s'ouvre par empreinte digitale, code secret ou smartphone. Conçue pour s'adapter à votre porte existante sans perçage, elle allie sécurité bancaire et esthétique premium.",
  },
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
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-lg" />
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
  const { handle } = use(params);
  const { data: product, isLoading, isError } = useProduct(handle);
  const { data: accessories, isLoading: loadingAcc } = useAccessories();
  const { addToCart, isPending } = useAddToCart();

  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const variant =
    product?.variants.find(
      (v) => v.id === (activeVariantId ?? product.variants[0]?.id),
    ) ?? product?.variants[0];

  const images = product?.images ?? [];
  const mainImage = variant?.image ?? images[activeImageIdx];

  const relatedProducts =
    accessories?.filter((a) => a.handle !== handle).slice(0, 4) ?? [];

  function prev() {
    setActiveImageIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setActiveImageIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  const hasVariants =
    (product?.variants.length ?? 0) > 1 &&
    product?.variants[0]?.selectedOptions?.[0]?.name !== "Default";

  return (
    <>
      <Header />
      <CartDrawer />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-6 pb-10 pt-28 lg:px-10">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-ink">
                Accueil
              </Link>
              <span>/</span>
              <Link
                href="/produits"
                className="transition-colors hover:text-ink"
              >
                Boutique
              </Link>
              <span>/</span>
              <span className="text-ink">{product?.title ?? "…"}</span>
            </nav>
          </div>
        </div>

        {/* Main grid */}
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── Gallery ── */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              {isLoading ? (
                <GallerySkeleton />
              ) : (
                <div className="flex flex-col gap-3">
                  {/* Main image */}
                  <div className="group relative aspect-square overflow-hidden rounded-2xl bg-ink">
                    {mainImage ? (
                      <Image
                        key={mainImage.url}
                        src={mainImage.url}
                        alt={mainImage.altText ?? product?.title ?? ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-line" />
                    )}

                    {/* Nav arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prev}
                          aria-label="Image précédente"
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          aria-label="Image suivante"
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-ink opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {/* Dot indicators */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveImageIdx(i)}
                            aria-label={`Image ${i + 1}`}
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              i === activeImageIdx
                                ? "w-5 bg-gold"
                                : "w-1.5 bg-white/50",
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {images.map((img, i) => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setActiveImageIdx(i)}
                          className={cn(
                            "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                            i === activeImageIdx
                              ? "border-gold"
                              : "border-transparent opacity-60 hover:opacity-100",
                          )}
                        >
                          <Image
                            src={img.url}
                            alt={img.altText ?? `Image ${i + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div>
              {isLoading ? (
                <InfoSkeleton />
              ) : isError || !product ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  Produit introuvable.{" "}
                  <Link href="/produits" className="text-ink underline">
                    Retour à la boutique
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Title + rating + price */}
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Arini Lock
                    </p>
                    <h1 className="font-display2 text-2xl uppercase leading-tight text-ink md:text-3xl">
                      {product.title}
                    </h1>
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
                        4.8 · 312 avis
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-display2 text-3xl leading-none text-gold">
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

                  {/* Variant swatches */}
                  {hasVariants && (
                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Finition —{" "}
                        <span className="text-ink">
                          {variant?.selectedOptions[0]?.value}
                        </span>
                      </p>
                      <div className="flex gap-2">
                        {product.variants.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setActiveVariantId(v.id)}
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
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Stepper */}
                    <div className="flex h-14 items-center rounded-full border border-line">
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

                    {/* Add to cart */}
                    <button
                      type="button"
                      disabled={isPending || !variant?.availableForSale}
                      onClick={() =>
                        variant &&
                        addToCart([
                          { merchandiseId: variant.id, quantity: qty },
                        ])
                      }
                      className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-cream transition-colors hover:bg-ink/80 disabled:opacity-50"
                    >
                      <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                      {isPending ? "Ajout…" : "Ajouter au panier"}
                    </button>
                  </div>

                  {/* Trust strip */}
                  <div className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line">
                    {TRUST.map(({ icon: Icon, label, sub }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1 px-3 py-4 text-center"
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 text-gold"
                        />
                        <p className="text-[11px] font-medium leading-tight text-ink">
                          {label}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {sub}
                        </p>
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
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
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
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Vous aimerez aussi
                </span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Cpu,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { useAddToCart } from "@/hooks/use-cart";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useAccessories, useProduct } from "@/hooks/use-product";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";

const SWATCH_BG: Record<string, string> = {
  Black:  "bg-[#1E1B18]",
  Silver: "bg-[#C7C9CC]",
  Bronze: "bg-[#8C6A3F]",
  White:  "bg-[#F5F5F0] border border-gray-200",
};

function Stars() {
  return (
    <div className="flex text-primary" aria-label="4.8 étoiles sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function DiscountPct({ price, compareAt }: { price: string; compareAt: string }) {
  const current = parseFloat(price.replace(/[^0-9.]/g, ""));
  const original = parseFloat(compareAt.replace(/[^0-9.]/g, ""));
  if (!current || !original || original <= current) return null;
  const pct = Math.round(((original - current) / original) * 100);
  return (
    <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
      -{pct}%
    </span>
  );
}

function PriceBlock({
  price,
  compareAt,
  formatMoney,
  promoLabel,
  size = "lg",
}: {
  price: { amount: string; currencyCode: string };
  compareAt?: { amount: string; currencyCode: string } | null;
  formatMoney: (m: { amount: string; currencyCode: string }) => string;
  promoLabel: string;
  size?: "sm" | "lg";
}) {
  // If Shopify has no compare-at price, compute one (+23 %)
  const effectiveCompareAt: { amount: string; currencyCode: string } =
    compareAt ??
    {
      amount: (Math.ceil(parseFloat(price.amount) * 1.23 / 10) * 10).toFixed(2),
      currencyCode: price.currencyCode,
    };

  return (
    <div className="space-y-2">
      {/* Before price */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground line-through">
          {formatMoney(effectiveCompareAt)}
        </span>
        <DiscountPct price={price.amount} compareAt={effectiveCompareAt.amount} />
      </div>

      {/* After price */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span
          className={cn(
            "font-display2 font-semibold leading-none text-primary",
            size === "lg" ? "text-4xl" : "text-2xl",
          )}
        >
          {formatMoney(price)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Tag className="h-3 w-3" />
          {promoLabel}
        </span>
        <span className="text-xs text-muted-foreground">ou 3× sans frais</span>
      </div>
    </div>
  );
}

/* ── Three info cards replacing the plain accordion ───────────────── */
const CARD_META = [
  {
    icon: Cpu,
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-l-primary",
    parse: "dots",
  },
  {
    icon: Wrench,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    parse: "sentences",
  },
  {
    icon: ShieldCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    parse: "sentences",
  },
] as const;

function InfoCards({ accordion }: { accordion: { trigger: string; content: string }[] }) {
  return (
    <div className="flex gap-4">
      {accordion.map((item, i) => {
        const meta = CARD_META[i] ?? CARD_META[0];
        const Icon = meta.icon;
        const isSpecs = meta.parse === "dots";

        const specPairs = isSpecs
          ? item.content.split(" · ").map((s) => {
              const [label, ...rest] = s.split(/\s*:\s*/);
              return { label, value: rest.join(": ") };
            })
          : [];

        const sentences = !isSpecs
          ? item.content.split(/\.\s+/).filter(Boolean).map((s) => (s.endsWith(".") ? s : s + "."))
          : [];

        return (
          <div
            key={item.trigger}
            className={`flex flex-1 flex-col overflow-hidden rounded-xl border border-border border-l-4 ${meta.border} bg-white`}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 px-5 py-3.5">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${meta.bg}`}>
                <Icon aria-hidden="true" className={`h-4 w-4 ${meta.color}`} />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.trigger}</span>
            </div>

            {/* Card content */}
            <div className="border-t border-border px-5 py-4">
              {isSpecs ? (
                <div className="divide-y divide-border">
                  {specPairs.map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4 py-2.5">
                      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-right text-xs font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {sentences.map((s, si) => (
                    <li key={si} className="flex items-start gap-2.5">
                      <Check aria-hidden="true" className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${meta.color}`} />
                      <span className="text-xs leading-relaxed text-foreground/70">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Specs section shown below the main grid ──────────────────────── */
const SPECS = [
  { label: "Méthodes d'accès", value: "Empreinte, PIN, App, RFID, Clé" },
  { label: "Empreintes max", value: "100" },
  { label: "Connectivité", value: "WiFi + Bluetooth" },
  { label: "Alimentation", value: "4 piles AA" },
  { label: "Autonomie", value: "~12 mois" },
  { label: "Installation", value: "45 min" },
  { label: "Garantie", value: "2 ans" },
  { label: "Compatibilité", value: "Portes bois & métal standard" },
  { label: "Finitions", value: "Noir Mat · Argent · Or" },
  { label: "Alertes", value: "Intrusion en temps réel" },
];

function SpecsTable() {
  const half = Math.ceil(SPECS.length / 2);
  const left = SPECS.slice(0, half);
  const right = SPECS.slice(half);
  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Left label */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Fiche technique
            </p>
            <h2 className="font-display2 text-4xl font-light uppercase leading-none text-foreground lg:text-5xl">
              Caractéris&shy;tiques
            </h2>
          </div>

          {/* Right: two-column grid */}
          <div className="grid gap-x-16 sm:grid-cols-2">
            {[left, right].map((col, ci) => (
              <div key={ci} className="divide-y divide-border">
                {col.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-sm font-semibold text-foreground">{spec.label}</span>
                    <span className="text-sm text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Skeleton className="aspect-square w-full flex-1 rounded-2xl sm:aspect-4/5" />
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

export function ProductPageClient({ params }: { params: Promise<{ handle: string }> }) {
  const t = useT();
  const formatMoney = useFormatMoney();

  const TRUST = [
    { icon: Truck, label: t.trust.delivery, sub: t.trust.deliverySub },
    { icon: ShieldCheck, label: t.trust.warranty, sub: t.trust.warrantySub },
    { icon: Zap, label: t.trust.install, sub: t.trust.installSub },
  ];

  const { handle } = use(params);
  const { data: product, isLoading, isError } = useProduct(handle);
  const { data: accessories, isLoading: loadingAcc, isError: isErrorAcc } = useAccessories();
  const { addToCart, isPending } = useAddToCart();

  useEffect(() => {
    if (isError) toast.error(t.errors.notFound, { description: t.errors.backToShop });
  }, [isError, t]);

  useEffect(() => {
    if (isErrorAcc) toast.error(t.errors.loadProducts);
  }, [isErrorAcc, t]);

  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);

  const variant =
    product?.variants.find((v) => v.id === (activeVariantId ?? product.variants[0]?.id)) ??
    product?.variants[0];

  const images = product?.images ?? [];
  const mainImage = images[activeImageIdx] ?? images[0];

  function selectVariant(id: string) {
    setActiveVariantId(id);
    const v = product?.variants.find((v) => v.id === id);
    if (v?.image) {
      const idx = images.findIndex((img) => img.url === v.image!.url);
      if (idx >= 0) setActiveImageIdx(idx);
    }
  }

  const relatedProducts = accessories?.filter((a) => a.handle !== handle).slice(0, 4) ?? [];
  const hasVariants =
    (product?.variants.length ?? 0) > 1 &&
    product?.variants[0]?.selectedOptions?.[0]?.name !== "Default";

  const { toggle, isFavorite } = useFavoritesStore();
  const liked = product ? isFavorite(product.id) : false;

  const relatedSection = (relatedProducts.length > 0 || loadingAcc) && (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-6 flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t.product.relatedTitle}
          </span>
          <div className="h-px flex-1 bg-border" />
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
  );

  return (
    <>
      <CartDrawer />

      {/* ═══════ MOBILE ═══════ */}
      <div className="md:hidden">
        {/* Full-bleed image gallery */}
        <div className="relative w-full" style={{ paddingTop: "110%" }}>
          {isLoading ? (
            <Skeleton className="absolute inset-0" />
          ) : mainImage ? (
            <Image
              key={mainImage.url}
              src={mainImage.url}
              alt={mainImage.altText ?? product?.title ?? ""}
              fill sizes="100vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-border" />
          )}

          <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 pt-14">
            <Link href="/produits" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm" aria-label="Retour">
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </Link>
            {product && (
              <button type="button" onClick={() => toggle(product)} aria-label={liked ? t.favorites.remove : t.favorites.add} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
                <Heart className={cn("h-4 w-4 transition-colors", liked ? "fill-primary text-primary" : "text-muted-foreground")} />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} type="button" onClick={() => setActiveImageIdx(i)} aria-label={`Image ${i + 1}`}
                  className={cn("h-1.5 rounded-full transition-all duration-300", i === activeImageIdx ? "w-5 bg-primary" : "w-1.5 bg-foreground/20")}
                />
              ))}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-3">
            {images.map((img, i) => (
              <button key={img.url} type="button" onClick={() => setActiveImageIdx(i)} aria-label={img.altText ?? `Image ${i + 1}`}
                className={cn("relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all", i === activeImageIdx ? "border-primary opacity-100" : "border-transparent opacity-40")}
              >
                <Image src={img.url} alt="" fill sizes="56px" className="object-contain" />
              </button>
            ))}
          </div>
        )}

        <div className="pb-32">
          {isLoading ? (
            <div className="space-y-4 px-4 py-5"><InfoSkeleton /></div>
          ) : isError || !product ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              {t.errors.notFound}{" "}
              <Link href="/produits" className="text-primary underline">{t.errors.backToShop}</Link>
            </div>
          ) : (
            <>
              {/* Brand + title */}
              <div className="border-b border-border px-4 py-5">
                <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.product.brand}</p>
                <h1 className="font-display2 text-xl uppercase leading-tight text-foreground">{product.title}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <Stars />
                  <span className="text-xs text-muted-foreground">4.8 · 312 {t.product.reviews}</span>
                </div>
              </div>

              {/* Price block */}
              <div className="border-b border-border px-4 py-5">
                {variant && (
                  <PriceBlock
                    price={variant.price}
                    compareAt={variant.compareAtPrice}
                    formatMoney={formatMoney}
                    promoLabel={t.product.promo}
                    size="sm"
                  />
                )}
              </div>

              {/* Description */}
              {(t.product.description || product.descriptionHtml || product.description) && (
                <div className="border-b border-border px-4 py-4">
                  <div className={cn("text-sm leading-relaxed text-foreground/70", !descExpanded && "line-clamp-3")}>
                    {t.product.description ? (
                      <span className="whitespace-pre-line">{t.product.description}</span>
                    ) : (
                      <span className="shopify-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? product.description }} />
                    )}
                  </div>
                  <button type="button" onClick={() => setDescExpanded((v) => !v)} className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                    {descExpanded ? t.product.readLess : t.product.readMore}
                    <ChevronDown className={cn("h-3 w-3 transition-transform", descExpanded && "rotate-180")} />
                  </button>
                </div>
              )}

              {/* Variant swatches */}
              {hasVariants && (
                <div className="border-b border-border px-4 py-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {t.product.finish} — <span className="text-foreground">{variant?.selectedOptions[0]?.value}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.variants.map((v) => (
                      <button key={v.id} type="button" onClick={() => selectVariant(v.id)} aria-label={`Finition ${v.title}`} aria-pressed={v.id === (activeVariantId ?? product.variants[0]?.id)}
                        className={cn("h-9 w-9 rounded-full border-2 transition-all", SWATCH_BG[v.title] ?? "bg-muted",
                          v.id === (activeVariantId ?? product.variants[0]?.id) ? "scale-110 border-primary ring-2 ring-primary/25" : "border-transparent opacity-60")}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Trust pills */}
              <div className="flex gap-3 overflow-x-auto border-b border-border px-4 py-4">
                {TRUST.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2.5">
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-[11px] font-medium leading-tight text-foreground">{label}</p>
                      <p className="text-[10px] text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <SpecsTable />
        {product && (
          <div className="border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-10">
              <div className="mb-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">À savoir</p>
                <h2 className="font-display2 text-3xl font-light uppercase leading-none text-foreground">Infos pratiques</h2>
              </div>
              <div className="flex flex-col gap-4">
                {t.product.accordion.map((item, i) => {
                  const meta = CARD_META[i] ?? CARD_META[0];
                  const Icon = meta.icon;
                  return (
                    <div key={item.trigger} className={`overflow-hidden rounded-xl border border-border border-l-4 ${meta.border} bg-white`}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${meta.bg}`}>
                          <Icon aria-hidden="true" className={`h-4 w-4 ${meta.color}`} />
                        </span>
                        <span className="text-sm font-semibold text-foreground">{item.trigger}</span>
                      </div>
                      <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-foreground/70">
                        {item.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {relatedSection}
        <Footer />

        {product && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 px-4 pb-6 pt-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-12 shrink-0 items-center rounded-full border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer" className="flex h-full w-9 items-center justify-center text-muted-foreground">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium text-foreground">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Augmenter" className="flex h-full w-9 items-center justify-center text-muted-foreground">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button type="button" disabled={isPending} onClick={() => variant && addToCart([{ merchandiseId: variant.id, quantity: qty }])}
                className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary text-xs font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <ShoppingBag aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{isPending ? t.product.adding : t.product.addToCart}</span>
                {variant && <span className="whitespace-nowrap text-white/60">· {formatMoney(variant.price)}</span>}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════ DESKTOP ═══════ */}
      <div className="hidden md:block">
        <Header />
        <main className="min-h-screen bg-background">
          {/* Breadcrumb */}
          <div className="border-b border-border bg-background">
            <div className="mx-auto max-w-7xl px-6 pb-4 pt-28 lg:px-10">
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">{t.breadcrumb.home}</Link>
                <span>/</span>
                <Link href="/produits" className="transition-colors hover:text-foreground">{t.breadcrumb.shop}</Link>
                <span>/</span>
                <span className="truncate text-foreground">{product?.title ?? "…"}</span>
              </nav>
            </div>
          </div>

          {/* Main grid */}
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-[1fr_460px]">

              {/* Gallery */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                {isLoading ? <GallerySkeleton /> : (
                  <div className="flex flex-col gap-3 lg:flex-row lg:gap-3">
                    {images.length > 1 && (
                      <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0">
                        {images.map((img, i) => (
                          <button key={img.url} type="button" onClick={() => setActiveImageIdx(i)} aria-label={img.altText ?? `Image ${i + 1}`}
                            className={cn("relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                              i === activeImageIdx ? "border-primary opacity-100" : "border-transparent opacity-40 hover:opacity-70")}
                          >
                            <Image src={img.url} alt={img.altText ?? `Image ${i + 1}`} fill sizes="56px" className="object-contain" />
                          </button>
                        ))}
                      </div>
                    )}
                    <div className={cn("order-1 relative flex-1 overflow-hidden rounded-2xl lg:order-2", "aspect-4/5")}>
                      {mainImage ? (
                        <Image key={mainImage.url} src={mainImage.url} alt={mainImage.altText ?? product?.title ?? ""} fill sizes="55vw" className="object-contain" priority />
                      ) : (
                        <div className="absolute inset-0 bg-border" />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                {isLoading ? <InfoSkeleton /> : isError || !product ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    {t.errors.notFound}{" "}
                    <Link href="/produits" className="text-primary underline">{t.errors.backToShop}</Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">

                    {/* Title + heart */}
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.product.brand}</p>
                      <div className="flex items-start justify-between gap-4">
                        <h1 className="font-display2 text-3xl uppercase leading-tight text-foreground">{product.title}</h1>
                        <button type="button" onClick={() => toggle(product)} aria-label={liked ? t.favorites.remove : t.favorites.add}
                          className="mt-1 shrink-0 rounded-full border border-border p-2 transition-colors hover:border-primary"
                        >
                          <Heart className={cn("h-5 w-5 transition-colors", liked ? "fill-primary text-primary" : "text-muted-foreground")} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Stars />
                        <span className="text-xs text-muted-foreground">4.8 · 312 {t.product.reviews}</span>
                      </div>
                    </div>

                    {/* Price block */}
                    {variant && (
                      <div className="rounded-2xl border border-border bg-secondary p-5">
                        <PriceBlock
                          price={variant.price}
                          compareAt={variant.compareAtPrice}
                          formatMoney={formatMoney}
                          promoLabel={t.product.promo}
                          size="lg"
                        />
                      </div>
                    )}

                    {/* Description */}
                    {(t.product.description || product.descriptionHtml || product.description) && (
                      <div>
                        <div className={cn("text-sm leading-relaxed text-foreground/70", !descExpanded && "line-clamp-4")}>
                          {t.product.description ? (
                            <span className="whitespace-pre-line">{t.product.description}</span>
                          ) : (
                            <span className="shopify-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? product.description }} />
                          )}
                        </div>
                        <button type="button" onClick={() => setDescExpanded((v) => !v)} className="mt-1 flex items-center gap-1 text-xs text-primary hover:underline">
                          {descExpanded ? t.product.readLess : t.product.readMore}
                          <ChevronDown className={cn("h-3 w-3 transition-transform", descExpanded && "rotate-180")} />
                        </button>
                      </div>
                    )}

                    {/* Variant swatches */}
                    {hasVariants && (
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {t.product.finish} — <span className="text-foreground">{variant?.selectedOptions[0]?.value}</span>
                        </p>
                        <div className="flex gap-2">
                          {product.variants.map((v) => (
                            <button key={v.id} type="button" onClick={() => selectVariant(v.id)} aria-label={`Finition ${v.title}`} aria-pressed={v.id === (activeVariantId ?? product.variants[0]?.id)}
                              className={cn("h-8 w-8 rounded-full border-2 transition-all", SWATCH_BG[v.title] ?? "bg-muted",
                                v.id === (activeVariantId ?? product.variants[0]?.id) ? "scale-110 border-primary ring-2 ring-primary/25" : "border-transparent opacity-70 hover:opacity-100")}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity + CTA */}
                    <div className="flex gap-3">
                      <div className="flex h-14 items-center rounded-full border border-border">
                        <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité"
                          className="flex h-full w-14 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-foreground">{qty}</span>
                        <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Augmenter la quantité"
                          className="flex h-full w-14 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button type="button" disabled={isPending}
                        onClick={() => variant && addToCart([{ merchandiseId: variant.id, quantity: qty }])}
                        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                      >
                        <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                        {isPending ? t.product.adding : t.product.addToCart}
                      </button>
                    </div>

                    {/* Trust strip */}
                    <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border">
                      {TRUST.map(({ icon: Icon, label, sub }) => (
                        <div key={label} className="flex flex-col items-center gap-1 px-3 py-4 text-center">
                          <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                          <p className="text-[11px] font-medium leading-tight text-foreground">{label}</p>
                          <p className="text-[10px] leading-tight text-muted-foreground">{sub}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specs table — full width below product grid */}
          <SpecsTable />

          {/* Info cards — below specs table */}
          {product && (
            <div className="border-t border-border">
              <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      À savoir
                    </p>
                    <h2 className="font-display2 text-4xl font-light uppercase leading-none text-foreground lg:text-5xl">
                      Infos pratiques
                    </h2>
                  </div>
                </div>
                <InfoCards accordion={t.product.accordion} />
              </div>
            </div>
          )}

          {relatedSection}
        </main>
        <Footer />
      </div>
    </>
  );
}

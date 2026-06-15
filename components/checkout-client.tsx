"use client";

import { CheckCircle2, ChevronDown, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { formatMoney, type Cart } from "@/types/shopify";

function computeSubtotal(lines: Cart["lines"]) {
  if (!lines.length) return null;
  const total = lines.reduce((sum, line) => {
    const qty = Math.max(line.quantity, 1);
    return sum + parseFloat(line.merchandise.price.amount) * qty;
  }, 0);
  return { amount: total.toFixed(2), currencyCode: lines[0]!.merchandise.price.currencyCode };
}

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Safi", "Mohammedia",
  "Khouribga", "Béni Mellal", "Laâyoune", "Nador", "Settat",
  "Berrechid", "El Jadida", "Khémisset", "Taza", "Guelmim",
];

interface FormState {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

const EMPTY: FormState = { fullName: "", phone: "", city: "", address: "", notes: "" };

export function CheckoutClient() {
  const { data: cart, isLoading } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const lines = cart?.lines ?? [];
  const total = computeSubtotal(lines);

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Nom complet requis";
    if (!/^(\+212|0)[5-7]\d{8}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Numéro marocain invalide (ex: 0612345678)";
    if (!form.city) e.city = "Veuillez choisir une ville";
    if (form.address.trim().length < 5) e.address = "Adresse complète requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/\s/g, ""),
          items: lines.map((l) => ({
            title: l.merchandise.product.title,
            variant: l.merchandise.title,
            quantity: Math.max(l.quantity, 1),
            price: formatMoney(l.merchandise.price),
          })),
          total: total ? formatMoney(total) : "—",
        }),
      });
      const data: { ok: boolean; orderRef: string } = await res.json();
      if (data.ok) setOrderRef(data.orderRef);
    } catch {
      toast.error("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderRef) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <CheckCircle2 className="h-8 w-8 text-gold" />
        </div>
        <div>
          <h2 className="font-display2 text-2xl text-ink">Commande confirmée</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Référence : <span className="font-medium text-ink">{orderRef}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Notre équipe vous contactera sous 24h pour confirmer la livraison.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-ink px-8 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink/80"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
          <div>
            <h1 className="font-display2 text-3xl uppercase text-ink">
              Finaliser la commande
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Paiement à la livraison — aucune carte requise
            </p>
          </div>

          {/* Personal info */}
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Informations personnelles
            </legend>

            <Field label="Nom complet" error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="Mohammed Alami"
                autoComplete="name"
                className={inputCls(!!errors.fullName)}
              />
            </Field>

            <Field label="Téléphone" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0612 345 678"
                autoComplete="tel"
                className={inputCls(!!errors.phone)}
              />
            </Field>
          </fieldset>

          {/* Delivery info */}
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Adresse de livraison
            </legend>

            <Field label="Ville" error={errors.city}>
              <div className="relative">
                <select
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={cn(inputCls(!!errors.city), "appearance-none pr-10")}
                >
                  <option value="">Choisir une ville…</option>
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </Field>

            <Field label="Adresse complète" error={errors.address}>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="N° rue, quartier, immeuble…"
                autoComplete="street-address"
                className={inputCls(!!errors.address)}
              />
            </Field>

            <Field label="Notes (optionnel)">
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Étage, code d'entrée, instructions particulières…"
                rows={3}
                className={cn(inputCls(false), "resize-none")}
              />
            </Field>
          </fieldset>

          <button
            type="submit"
            disabled={submitting || lines.length === 0}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-dark transition-colors hover:bg-gold/90 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Confirmer la commande
                {total && <span>— {formatMoney(total)}</span>}
              </>
            )}
          </button>
        </form>

        {/* ── Order summary ── */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-line bg-card p-6">
            <h2 className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Récapitulatif
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[0, 1].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-16 w-16 animate-pulse rounded-lg bg-line" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 w-3/4 animate-pulse rounded bg-line" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-line" />
                    </div>
                  </div>
                ))}
              </div>
            ) : lines.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Votre panier est vide.{" "}
                <Link href="/produits" className="text-gold underline">
                  Voir les produits
                </Link>
              </p>
            ) : (
              <ul className="space-y-4">
                {lines.map((line) => {
                  const qty = Math.max(line.quantity, 1);
                  return (
                    <li key={line.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                        {line.merchandise.image?.url && (
                          <Image
                            src={line.merchandise.image.url}
                            alt={line.merchandise.product.title}
                            fill
                            sizes="64px"
                            className="object-contain"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="text-sm font-medium leading-tight text-ink">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-xs text-muted-foreground">{line.merchandise.title}</p>
                        )}
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Qté {qty}</p>
                          <p className="text-sm text-brass">{formatMoney(line.merchandise.price)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {total && (
              <div className="mt-6 space-y-2 border-t border-line pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-ink">{formatMoney(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold">
                  <span className="text-ink">Total</span>
                  <span className="text-gold">{formatMoney(total)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl bg-surface px-4 py-3">
              <p className="text-xs text-muted-foreground">
                💳 Paiement à la livraison — vous payez uniquement à la réception
                de votre commande.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/50",
    "focus:border-gold focus:ring-2 focus:ring-gold/20",
    hasError ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-line",
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-ink">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

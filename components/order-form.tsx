"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, MapPin, Phone, User } from "lucide-react";
import { z } from "zod";
import { useT } from "@/hooks/use-t";
import { cn } from "@/lib/utils";

const VILLES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Safi", "El Jadida",
  "Béni Mellal", "Nador", "Settat", "Khémisset", "Berrechid",
  "Khouribga", "Mohammedia", "Laâyoune", "Autre",
];

function buildSchema(errors: {
  prenomRequired: string;
  telephoneRequired: string;
  telephoneInvalid: string;
  adresseRequired: string;
  villeRequired: string;
}) {
  return z.object({
    prenom:    z.string().min(1, errors.prenomRequired),
    telephone: z
      .string()
      .min(1, errors.telephoneRequired)
      .refine(
        (v) => /^(0|\+212)[5-7]\d{8}$/.test(v.replace(/\s/g, "")),
        errors.telephoneInvalid,
      ),
    adresse:   z.string().min(3, errors.adresseRequired),
    ville:     z.string().min(1, errors.villeRequired),
  });
}

type FormValues = { prenom: string; telephone: string; adresse: string; ville: string };

interface Props {
  productName: string;
  price: string;
  whatsappNumber?: string;
}

function FieldError({ errors }: { errors: (string | undefined)[] }) {
  const msg = errors.find(Boolean);
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-red-500">{msg}</p>;
}

function InputField({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ElementType;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1.5 text-xs font-bold uppercase tracking-wider text-foreground/70">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-xl border bg-white transition-colors focus-within:ring-2 focus-within:ring-primary/20",
          error
            ? "border-red-400 focus-within:ring-red-200"
            : "border-gray-200 focus-within:border-primary/40",
        )}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center border-r border-gray-100 bg-gray-50/80">
          <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </span>
        {children}
      </div>
    </div>
  );
}

export function OrderForm({ productName, price, whatsappNumber = "212668898860" }: Props) {
  const t = useT();
  const tf = t.orderForm;
  const schema = buildSchema(tf.errors);

  const form = useForm({
    defaultValues: { prenom: "", telephone: "", adresse: "", ville: "" },
    onSubmit: async ({ value }) => {
      const msg = encodeURIComponent(
        `🛒 *${tf.whatsappNewOrder} — ${productName}*\n\n` +
        `👤 ${tf.fields.prenom} : ${value.prenom}\n` +
        `📞 ${tf.fields.telephone} : ${value.telephone}\n` +
        `📍 ${tf.fields.adresse} : ${value.adresse}\n` +
        `🏙️ ${tf.fields.ville} : ${value.ville}\n\n` +
        `💰 ${tf.whatsappPrice} : ${price}\n\n` +
        `_${tf.whatsappFooter}_`,
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    },
  });

  const submitted = form.state.submissionAttempts > 0 && form.state.isSubmitted;

  function validate<K extends keyof FormValues>(key: K) {
    return ({ value }: { value: FormValues[K] }) => {
      const result = (schema.shape as Record<string, z.ZodTypeAny>)[key].safeParse(value);
      return result.success ? undefined : result.error.issues[0].message;
    };
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-lg font-bold text-foreground">{tf.successTitle}</p>
        <p className="text-sm text-muted-foreground">{tf.successDesc}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
      noValidate
      className="flex flex-col gap-4"
    >
      <form.Field name="prenom" validators={{ onBlur: validate("prenom") }}>
        {(field) => (
          <div>
            <InputField label={tf.fields.prenom} icon={User} error={!!field.state.meta.errors.length}>
              <input
                type="text"
                placeholder={tf.placeholders.prenom}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="h-12 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-gray-400 focus:outline-none"
              />
            </InputField>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="telephone" validators={{ onBlur: validate("telephone") }}>
        {(field) => (
          <div>
            <InputField label={tf.fields.telephone} icon={Phone} error={!!field.state.meta.errors.length}>
              <input
                type="tel"
                placeholder={tf.placeholders.telephone}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="h-12 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-gray-400 focus:outline-none"
              />
            </InputField>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="adresse" validators={{ onBlur: validate("adresse") }}>
        {(field) => (
          <div>
            <InputField label={tf.fields.adresse} icon={MapPin} error={!!field.state.meta.errors.length}>
              <input
                type="text"
                placeholder={tf.placeholders.adresse}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="h-12 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-gray-400 focus:outline-none"
              />
            </InputField>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="ville" validators={{ onBlur: validate("ville") }}>
        {(field) => (
          <div>
            <InputField label={tf.fields.ville} icon={MapPin} error={!!field.state.meta.errors.length}>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="h-12 w-full bg-transparent px-4 text-sm text-foreground focus:outline-none"
              >
                <option value="" disabled>{tf.placeholders.ville}</option>
                {VILLES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </InputField>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-[0_4px_20px_rgba(22,40,71,0.28)] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? tf.submitting : tf.submitLabel(price)}
          </button>
        )}
      </form.Subscribe>

      <p className="text-center text-[11px] text-muted-foreground">{tf.footer}</p>
    </form>
  );
}

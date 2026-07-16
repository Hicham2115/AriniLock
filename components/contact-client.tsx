"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { useT } from "@/hooks/use-t";

const CHANNEL_META = [
  {
    icon: MessageCircle,
    href: "https://wa.me/212668898860",
    light: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Phone,
    href: "tel:+212668898860",
    light: "bg-primary/8 text-primary",
  },
  {
    icon: Phone,
    href: "tel:+212660648195",
    light: "bg-primary/8 text-primary",
  },
  {
    icon: Mail,
    href: "mailto:support@arinilock.ma",
    light: "bg-violet-50 text-violet-600",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function ContactClient() {
  const t = useT();
  const c = t.contact;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(c.errorRequired);
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success(c.successMsg);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <>
      <CartDrawer />
      <Header />

      <main className="min-h-screen bg-background">
        {/* ── Hero band ── */}
        <div
          className="relative overflow-hidden pt-32 pb-20"
          style={{
            background:
              "linear-gradient(135deg, #010d1a 0%, #032245 50%, #053d7a 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, #2a5fa8 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-20 bottom-0 h-64 w-64 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #053d7a 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40"
            >
              {c.heroPre}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display2 text-5xl font-light uppercase leading-none text-white lg:text-7xl"
            >
              {c.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/50"
            >
              {c.heroSub}
            </motion.p>
          </div>
        </div>

        {/* ── Contact channels ── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {c.channels.map((ch, i) => {
              const meta = CHANNEL_META[i];
              return (
                <motion.a
                  key={ch.label}
                  href={meta.href}
                  target={meta.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.light}`}
                  >
                    <meta.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {ch.label}
                    </p>
                    <p
                      dir="ltr"
                      className="truncate text-sm font-semibold text-foreground"
                    >
                      {ch.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {ch.sub}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ── Main grid: form + sidebar ── */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {c.formPre}
              </p>
              <h2 className="mb-8 font-display2 text-4xl font-light uppercase leading-none text-foreground lg:text-5xl">
                {c.formTitle.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {c.labelName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={c.placeholderName}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {c.labelEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={c.placeholderEmail}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {c.labelPhone}{" "}
                    <span className="text-muted-foreground/40">
                      {c.optional}
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={c.placeholderPhone}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {c.labelMessage} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={c.placeholderMessage}
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {c.sending}
                    </>
                  ) : (
                    <>
                      {c.send}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-6"
            >
              {/* Quick FAQ */}
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {c.faqTitle}
                </p>
                <div className="space-y-4">
                  {c.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        {faq.q}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {c.addressTitle}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {c.address}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {c.hours}
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/212668898860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-emerald-500 p-5 text-white transition-opacity hover:opacity-90"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.whatsappTitle}</p>
                  <p className="text-xs text-white/70">{c.whatsappSub}</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

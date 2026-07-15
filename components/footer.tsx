"use client";

import {
  Phone,
  MessageCircle,
  MapPin,
  CreditCard,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";
import { useT } from "@/hooks/use-t";

export function Footer() {
  const t = useT();
  const s = t.sections.footer;
  const pathname = usePathname();
  const isHome = pathname === "/";

  function resolveHref(href: string) {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  }

  const allCols = [...s.cols, s.selectionCol];

  return (
    <footer className="bg-white">
      {/* ── Floating card ── */}
      <div className="px-4 pt-4 pb-0 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl text-white shadow-2xl shadow-[#032245]/25"
          style={{
            background:
              "linear-gradient(135deg, #010d1a 0%, #032245 40%, #053d7a 75%, #021a36 100%)",
          }}
        >
          {/* Decorative glows */}
          <div
            className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #2a5fa8 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-10 h-100 w-100 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, #053d7a 0%, transparent 70%)",
            }}
          />

          {/* Top accent line */}
          <div
            className="relative h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 70%, transparent 100%)",
            }}
          />

          {/* Main grid */}
          <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr_auto] lg:gap-12">
              {/* Logo + tagline */}
              <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
                <LogoMark inverted />
                <p className="max-w-58 text-sm leading-relaxed text-white/80 font-light tracking-wide">
                  {s.taglineShort}
                </p>
              </div>

              {/* Link columns */}
              {allCols.map((col) => (
                <div key={col.title}>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    {col.title}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={resolveHref(link.href)}
                          className="group flex items-center gap-2 text-sm text-white/90 transition-all hover:text-white"
                        >
                          <span className="h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-3" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Right — service CTAs + socials */}
              <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1 lg:min-w-57.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                  {s.serviceTitle}
                </p>

                <a
                  href="tel:+212668898860"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Phone
                      className="h-3.5 w-3.5 text-white/80"
                      aria-hidden="true"
                    />
                  </span>
                  <span dir="ltr">+212 6 68 89 88 60</span>
                </a>

                <a
                  href="tel:+212660648195"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Phone
                      className="h-3.5 w-3.5 text-white/80"
                      aria-hidden="true"
                    />
                  </span>
                  <span dir="ltr">+212 6 60 64 81 95</span>
                </a>

                <a
                  href="#faq"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <MessageCircle
                      className="h-3.5 w-3.5 text-white/80"
                      aria-hidden="true"
                    />
                  </span>
                  {s.helpLink}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Partners & address bar ── */}
      <div className="border-t border-gray-100 bg-white px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Address row */}
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <MapPin
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf — Casablanca
              &nbsp;·&nbsp; Lun–Ven, 9h–18h
            </span>
          </div>

          {/* Payment methods — highlighted */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
              {s.paymentLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {s.payment.map((method, i) => {
                const isCod = i === s.payment.length - 1;
                const Icon = isCod ? Banknote : CreditCard;
                return (
                  <span
                    key={method}
                    className={
                      isCod
                        ? "inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/25 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                        : "inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary"
                    }
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {method}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal bottom bar ── */}
      <div className="border-t border-gray-100 bg-white px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link
              href="/conditions-utilisation"
              className="transition-colors hover:text-gray-700"
            >
              {s.legalLinks.terms}
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-gray-700"
            >
              {s.legalLinks.privacy}
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} {s.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

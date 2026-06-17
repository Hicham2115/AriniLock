"use client";

import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { useT } from "@/hooks/use-t";

const SOCIAL = [
  { letter: "f", href: "#", label: "Facebook" },
  { letter: "in", href: "#", label: "Instagram" },
  { letter: "li", href: "#", label: "LinkedIn" },
  { letter: "X", href: "#", label: "X / Twitter" },
  { letter: "yt", href: "#", label: "YouTube" },
];

export function Footer() {
  const t = useT();
  const s = t.sections.footer;

  const allCols = [...s.cols, s.selectionCol];

  return (
    <footer className="bg-white">

      {/* ── Floating card ── */}
      <div className="px-4 pt-4 pb-0 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl text-white shadow-2xl shadow-[#032245]/25"
          style={{ background: "linear-gradient(135deg, #010d1a 0%, #032245 40%, #053d7a 75%, #021a36 100%)" }}
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-125 w-125 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2a5fa8 0%, transparent 70%)" }} />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-100 w-100 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #053d7a 0%, transparent 70%)" }} />

          {/* Top accent line */}
          <div className="relative h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 70%, transparent 100%)" }} />

          {/* Main grid */}
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[auto_1fr_1fr_1fr_auto]">

              {/* Logo + tagline */}
              <div className="flex flex-col gap-5">
                <LogoMark className="h-10" inverted />
                <p className="max-w-40 text-xs leading-relaxed text-white/35">
                  {s.taglineShort}
                </p>
              </div>

              {/* Link columns */}
              {allCols.map((col) => (
                <div key={col.title}>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    {col.title}
                  </p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-sm text-white/65 transition-all hover:text-white"
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
              <div className="flex flex-col gap-4 lg:min-w-57.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  {s.serviceTitle}
                </p>

                <a
                  href="tel:+212600000000"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Phone className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
                  </span>
                  +212 6 00 00 00 00
                </a>

                <a
                  href="#faq"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <MessageCircle className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
                  </span>
                  {s.helpLink}
                </a>

                {/* Social icons */}
                <div className="mt-1 flex items-center gap-2">
                  {SOCIAL.map(({ letter, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[11px] font-bold text-white/60 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/12 hover:text-white"
                    >
                      {letter}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Partners bar — full width, sticks to page ── */}
      <div className="border-t border-gray-100 bg-white px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
              {s.partners}
            </p>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              {s.payment.map((m) => (
                <span
                  key={m}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-gray-500"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal bottom bar — full width, sticks to page ── */}
      <div className="border-t border-gray-100 bg-white px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center text-xs text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {s.legal.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-gray-700">
                {link}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} {s.copyright}</p>
        </div>
      </div>

    </footer>
  );
}

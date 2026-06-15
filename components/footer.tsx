import { Mail, MapPin, Phone } from "lucide-react";

const NAV_COLS = [
  {
    title: "Produit",
    links: [
      { href: "#produit", label: "Poignée connectée" },
      { href: "#fonctionnalites", label: "Fonctionnalités" },
      { href: "#accessoires", label: "Accessoires" },
      { href: "#avis", label: "Avis clients" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "#faq", label: "FAQ" },
      { href: "#", label: "Livraison & retours" },
      { href: "#", label: "Garantie" },
      { href: "#", label: "Contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink text-cream overflow-hidden">
      {/* Giant background wordmark */}
      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-b border-cream/6 min-h-105 lg:min-h-120"
      >
        <p
          className="whitespace-nowrap font-display2 uppercase leading-none text-cream/3"
          style={{
            fontSize: "clamp(6rem, 18vw, 16rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Arini Lock
        </p>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 py-16 lg:px-10 lg:py-20">
          {/* Brand + tagline row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-display text-2xl tracking-[0.18em] text-cream">
                Arini Lock
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold/60">
                Maison connectée · Casablanca, Maroc
              </p>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-xs uppercase tracking-[0.25em] text-cream/30">
                Conçu pour le foyer marocain
              </p>
            </div>
          </div>

          {/* Gold divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-cream/8" />
            <div className="h-1 w-1 rounded-full bg-gold/60" />
            <div className="h-px flex-1 bg-cream/8" />
          </div>

          {/* Nav grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand blurb */}
            <div className="lg:col-span-2">
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-cream/45">
                La serrure connectée qui s'ouvre par empreinte, code ou
                smartphone. Sécurité intelligente, sans compromis sur le style.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: MapPin, text: "Casablanca, Maroc" },
                  { icon: Phone, text: "+212 6 00 00 00 00" },
                  { icon: Mail, text: "hello@arinilock.ma" },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 text-sm text-cream/45"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/20 bg-gold/8">
                      <Icon
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-gold"
                      />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {NAV_COLS.map((col) => (
              <div key={col.title} className="">
                <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-cream/45 transition-colors hover:text-cream"
                      >
                        <span className="h-px w-3 bg-cream/20 transition-all duration-300 group-hover:w-5 group-hover:bg-gold" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-[11px] text-cream/25 sm:flex-row lg:px-10">
        <p>© {new Date().getFullYear()} Arini Lock. Tous droits réservés.</p>
        <div className="flex flex-wrap items-center gap-4 uppercase tracking-[0.2em]">
          {["CMI", "Visa", "Mastercard", "Paiement livraison"].map((m) => (
            <span
              key={m}
              className="border-l border-cream/10 pl-4 first:border-0 first:pl-0"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

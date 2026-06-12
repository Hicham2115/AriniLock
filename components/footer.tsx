import { Mail, MapPin, Phone } from "lucide-react";

const NAV_COLS = [
  {
    title: "Boutique",
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
    <footer className="bg-dark text-cream">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Top: logo bar */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-cream/10 pb-12 sm:flex-row sm:items-center">
          <p className="font-display text-2xl tracking-[0.18em] text-cream">
            Arini Lock
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/50">
            {`// Est. ${new Date().getFullYear()} // Maison connectée · Conçu pour le Maroc`}
          </p>
        </div>

        {/* Nav + contact */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="mb-4 text-sm leading-relaxed text-cream/60">
              La poignée connectée qui vous reconnaît. Sécurité intelligente,
              confort quotidien — pensée pour le foyer marocain.
            </p>
            <ul className="space-y-2 text-sm text-cream/60">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="h-4 w-4 text-gold shrink-0" />
                Casablanca, Maroc
              </li>
              <li className="flex items-center gap-2">
                <Phone aria-hidden="true" className="h-4 w-4 text-gold shrink-0" />
                +212 6 00 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail aria-hidden="true" className="h-4 w-4 text-gold shrink-0" />
                hello@arinilock.ma
              </li>
            </ul>
          </div>

          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream">
                {col.title}
              </p>
              <ul className="space-y-2 text-sm text-cream/60">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-cream/40 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Arini Lock. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-3 uppercase tracking-[0.2em]">
            <span>CMI</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Paiement à la livraison</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

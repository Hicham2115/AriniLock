import {
  ArrowUpRight,
  BatteryFull,
  Fingerprint,
  KeyRound,
  ShieldAlert,
  Smartphone,
  Wifi,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    num: "01",
    icon: Fingerprint,
    title: "Empreinte digitale",
    description:
      "Jusqu'à 100 empreintes enregistrées. Reconnaissance et ouverture en moins d'une seconde.",
  },
  {
    num: "02",
    icon: KeyRound,
    title: "Code PIN",
    description:
      "Un code personnel à 4–8 chiffres, modifiable à tout moment depuis l'application.",
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Application mobile",
    description:
      "Verrouillez, déverrouillez et suivez l'activité de votre porte où que vous soyez.",
  },
  {
    num: "04",
    icon: Wifi,
    title: "Connectée 24/7",
    description:
      "Wifi et Bluetooth intégrés pour un contrôle à distance et des mises à jour automatiques.",
  },
  {
    num: "05",
    icon: BatteryFull,
    title: "Autonomie 12 mois",
    description:
      "4 piles AA standards. Une alerte vous prévient automatiquement avant épuisement.",
  },
  {
    num: "06",
    icon: ShieldAlert,
    title: "Alertes intrusion",
    description:
      "Notification immédiate sur votre téléphone en cas de tentative d'effraction.",
  },
];

export function FeaturesGrid() {
  return (
    <section
      id="fonctionnalites"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>02 — Fonctionnalités</span>
        <span>Sécurité nouvelle génération</span>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
        {/* Left: sticky large headline */}
        <div className="lg:sticky lg:top-28">
          <h2
            className="font-display2 uppercase leading-[0.88] text-ink"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
          >
            Quatre<br />façons<br />d&apos;entrer.
          </h2>
        </div>

        {/* Right: numbered divider list */}
        <div>
          <div className="divide-y divide-line">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group flex items-start gap-5 py-6"
              >
                <span className="w-8 shrink-0 pt-0.5 font-display2 text-sm text-muted-foreground">
                  {feature.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-1 text-base font-semibold text-ink">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 mt-0.5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gold accent card at bottom — like forge's 0→1 card */}
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-gold/30 bg-gold/10 p-8">
            <div>
              <p
                className="font-display2 uppercase leading-none text-ink"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                5
              </p>
              <p className="mt-1 text-sm font-medium text-ink">
                façons d&apos;entrer
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                01 Empreinte · 02 Code · 03 App · 04 RFID · 05 Clé
              </p>
            </div>
            <div className="relative h-20 w-20 shrink-0">
              <div className="scan-sweep animate-scan-sweep" />
              <div className="scan-ring" />
              <div className="scan-ring scan-ring--2" />
              <div className="scan-ring scan-ring--3" />
              <div className="absolute inset-3 flex items-center justify-center rounded-full border border-gold/50 bg-card/90">
                <Fingerprint aria-hidden="true" className="h-6 w-6 text-brass" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

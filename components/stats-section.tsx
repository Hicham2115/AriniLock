const STATS = [
  { value: "100", unit: "", label: "Empreintes", sub: "enregistrées max" },
  { value: "5", unit: "", label: "Méthodes", sub: "d'accès" },
  { value: "12", unit: "", label: "Mois", sub: "d'autonomie" },
  { value: "2", unit: "ans", label: "Garantie", sub: "constructeur" },
] as const;

const DETAILS = [
  {
    title: "EMPREINTE",
    body: "Jusqu'à 100 empreintes. Reconnaissance en moins d'une seconde. Jusqu'à 10 profils familiaux.",
  },
  {
    title: "CODE PIN",
    body: "Code 4–8 chiffres. Modifiable depuis l'app. Codes temporaires pour invités.",
  },
  {
    title: "APPLICATION",
    body: "Contrôle à distance. Historique des accès. Notifications en temps réel.",
  },
  {
    title: "RFID + CLÉ",
    body: "Cartes NFC rapides. Clé physique de secours incluse. Fonctionne hors connexion.",
  },
] as const;

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      {/* Section label row */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>01 — En chiffres</span>
        <span>Snapshot — 2026</span>
      </div>

      {/* Big headline */}
      <h2
        className="mb-12 font-display2 font-light uppercase leading-none text-ink"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        Ce qui la rend
        <br />
        différente.
      </h2>

      {/* Stats row */}
      <div className="border-t border-ink/15">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 ${i > 0 ? "border-l border-ink/10 pl-6" : ""} ${i < STATS.length - 1 ? "pr-6" : ""}`}
            >
              <div className="mb-1 flex items-baseline gap-1">
                <span
                  className="font-serif font-light leading-none text-ink"
                  style={{ fontSize: "clamp(3rem, 8vw, 3.5rem)" }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="font-display text-2xl text-muted-foreground">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detail columns */}
      <div className="border-t border-ink/15 pt-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((detail) => (
            <div key={detail.title}>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-ink">
                {detail.title}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {detail.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

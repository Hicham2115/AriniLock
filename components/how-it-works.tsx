const STEPS = [
  {
    num: "01",
    title: "Fixation sans perçage",
    description:
      "Se fixe directement sur votre porte existante, sans modification de la serrure d'origine ni outils spécifiques.",
  },
  {
    num: "02",
    title: "Connexion à l'application",
    description:
      "Associez votre serrure à l'application Arini Lock via Bluetooth et configurez vos préférences en quelques écrans.",
  },
  {
    num: "03",
    title: "Ajoutez vos accès",
    description:
      "Créez des accès permanents ou temporaires pour votre famille, vos invités ou votre aide à domicile.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>03 — Mise en service</span>
        <span>Cycle : 0 → 1 en 15 min</span>
      </div>

      <h2
        className="mb-12 font-display2 uppercase leading-none text-ink"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
      >
        Installée en<br />moins de<br />15 minutes.
      </h2>

      <div className="divide-y divide-line">
        {STEPS.map((step) => (
          <div key={step.num} className="flex items-start gap-8 py-8">
            <span className="w-10 shrink-0 font-display2 text-sm text-muted-foreground">
              {step.num}
            </span>
            <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_2fr]">
              <h3 className="font-semibold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

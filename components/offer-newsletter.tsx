"use client";

import { FormEvent, useEffect, useState } from "react";
import { useNewsletter } from "@/hooks/use-newsletter";
import { Reveal } from "@/components/reveal";

const OFFER_DURATION_MS =
  (4 * 24 * 60 * 60 + 12 * 3600 + 45 * 60 + 10) * 1000;

interface TimeLeft {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

function computeTimeLeft(endAt: number): TimeLeft {
  const diff = Math.max(0, endAt - Date.now());
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hours: pad(Math.floor(diff / 3_600_000) % 24),
    mins: pad(Math.floor(diff / 60_000) % 60),
    secs: pad(Math.floor(diff / 1000) % 60),
  };
}

const OFFER_DETAILS = [
  "Installation sans perçage",
  "Garantie 2 ans",
  "Livraison partout au Maroc",
  "Paiement à la livraison",
] as const;

export function OfferNewsletter() {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const newsletter = useNewsletter();

  useEffect(() => {
    const endAt = Date.now() + OFFER_DURATION_MS;
    setTimeLeft(computeTimeLeft(endAt));
    const id = setInterval(() => setTimeLeft(computeTimeLeft(endAt)), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newsletter.mutate({ email }, { onSuccess: () => setEmail("") });
  };

  const units = [
    { value: timeLeft?.days ?? "--", label: "Jours" },
    { value: timeLeft?.hours ?? "--", label: "Heures" },
    { value: timeLeft?.mins ?? "--", label: "Min" },
    { value: timeLeft?.secs ?? "--", label: "Sec" },
  ];

  return (
    <section className="mx-auto max-w-7xl border-t border-line px-6 py-24 lg:px-10">
      <Reveal>
      <div className="rounded-3xl bg-dark px-8 py-16 lg:px-16">
        {/* Section label */}
        <div className="mb-10 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-cream/50">
          <span>08 — Offre de lancement</span>
          <span>-300 MAD</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          {/* Left: big text + countdown */}
          <div>
            <h2
              className="mb-8 font-display2 uppercase leading-none text-cream"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              L&apos;offre se<br />termine dans
            </h2>

            <div className="flex flex-wrap gap-6 sm:gap-8">
              {units.map((unit) => (
                <div key={unit.label}>
                  <p
                    className="font-display2 leading-none text-cream tabular-nums"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                  >
                    {unit.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/50">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <p className="mb-4 text-sm leading-relaxed text-cream/60">
              Inscrivez-vous pour recevoir les offres exclusives en
              avant-première et être alerté à chaque baisse de prix.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                aria-label="Votre adresse email"
                className="flex-1 rounded-full border border-cream/15 bg-cream/10 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsletter.isPending}
                className="whitespace-nowrap rounded-full bg-gold px-7 py-3 text-sm font-medium text-dark transition-colors hover:bg-goldhover disabled:opacity-60"
              >
                {newsletter.isPending ? "Envoi…" : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-12 border-t border-cream/10 pt-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {OFFER_DETAILS.map((detail, i) => (
              <div key={detail}>
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-cream/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-sm text-cream/80">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}

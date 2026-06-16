"use client";

import { FormEvent, useEffect, useState } from "react";
import { useNewsletter } from "@/hooks/use-newsletter";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

const OFFER_DURATION_MS = (4 * 24 * 60 * 60 + 12 * 3600 + 45 * 60 + 10) * 1000;

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

export function OfferNewsletter() {
  const t = useT();
  const s = t.sections.offer;
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

  const timeValues = [
    timeLeft?.days ?? "--",
    timeLeft?.hours ?? "--",
    timeLeft?.mins ?? "--",
    timeLeft?.secs ?? "--",
  ];

  return (
    <section className="mx-auto max-w-7xl border-t border-border px-6 py-16 lg:px-10 lg:py-24">
      <Reveal>
        <div className="rounded-3xl bg-primary px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
          {/* Section label */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/50 lg:mb-10">
            <span>{s.label}</span>
            <span>{s.right}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            {/* Left: big text + countdown */}
            <div>
              <h2
                className="mb-8 font-display2 uppercase leading-none text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {s.headline[0]}<br />{s.headline[1]}
              </h2>

              <div className="flex flex-wrap gap-6 sm:gap-8">
                {timeValues.map((val, i) => (
                  <div key={s.unitLabels[i]}>
                    <p
                      className="font-display2 leading-none text-white tabular-nums"
                      style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                    >
                      {val}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                      {s.unitLabels[i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <p className="mb-4 text-sm leading-relaxed text-white/60">
                {s.description}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  aria-label={t.newsletter.placeholder}
                  className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletter.isPending}
                  className="whitespace-nowrap rounded-full bg-white px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-white/90 disabled:opacity-60"
                >
                  {newsletter.isPending ? t.newsletter.submitting : t.newsletter.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Details row */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {s.details.map((detail, i) => (
                <div key={i}>
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm text-white/80">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

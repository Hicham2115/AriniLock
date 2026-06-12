import { Star } from "lucide-react";

const RATING_BARS = [
  { stars: "5★", pct: "86%", count: 268 },
  { stars: "4★", pct: "10%", count: 31 },
  { stars: "3★", pct: "3%", count: 9 },
  { stars: "2★", pct: "1%", count: 3 },
  { stars: "1★", pct: "0.5%", count: 1 },
] as const;

const TESTIMONIALS = [
  {
    title: "« Je n'ai plus jamais cherché mes clés »",
    body: "Installation faite en 10 minutes par mon mari, sans perceuse. L'app est simple, même ma mère l'utilise pour entrer chez moi avec son propre code.",
    author: "Salma B.",
    city: "Casablanca",
  },
  {
    title: "« Finition premium, pas un gadget »",
    body: "La finition or s'accorde parfaitement avec ma porte d'entrée. La batterie tient vraiment plusieurs mois, et les notifications d'alerte sont rassurantes en voyage.",
    author: "Youssef A.",
    city: "Marrakech",
  },
] as const;

function Stars() {
  return (
    <div className="flex text-gold" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="avis"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>06 — Avis clients</span>
        <span>Vérifié · 312 foyers</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {/* Rating summary */}
        <div>
          <h2
            className="mb-6 font-display2 uppercase leading-none text-ink"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Ce qu&apos;en<br />disent 312<br />foyers.
          </h2>
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-display2 text-6xl text-ink">4.8</span>
            <span className="text-muted-foreground">/ 5</span>
          </div>
          <div className="space-y-2">
            {RATING_BARS.map((bar) => (
              <div
                key={bar.stars}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="w-8">{bar.stars}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: bar.pct }}
                  />
                </div>
                <span className="w-8 text-right">{bar.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        {TESTIMONIALS.map((review) => (
          <div
            key={review.author}
            className="rounded-2xl border border-line bg-card p-8"
          >
            <Stars />
            <h3 className="mb-3 mt-4 font-display text-lg text-ink">
              {review.title}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>
            <p className="text-sm text-ink">
              {review.author}{" "}
              <span className="text-muted-foreground">— {review.city}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

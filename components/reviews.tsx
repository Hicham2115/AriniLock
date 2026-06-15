"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  {
    title: "« On ne retourne pas en arrière »",
    body: "Depuis qu'on a installé Arini Lock, on n'a plus sorti une clé physique. Les enfants rentrent seuls après l'école, on reçoit une notif à chaque ouverture.",
    author: "Karim M.",
    city: "Rabat",
  },
  {
    title: "« Service client au top »",
    body: "Une petite question d'installation, réponse en moins d'une heure. Le produit est solide, l'app intuitive, et la garantie 2 ans rassure vraiment.",
    author: "Nadia E.",
    city: "Agadir",
  },
  {
    title: "« Idéal pour les locations »",
    body: "Je gère trois appartements en location courte durée. Avec Arini Lock, j'envoie un code temporaire à chaque locataire. Fini les remises de clés en main propre.",
    author: "Hassan T.",
    city: "Fès",
  },
  {
    title: "« Mon père de 72 ans l'utilise sans souci »",
    body: "Mes parents sont âgés et j'avais peur que ce soit trop technique. En réalité, l'empreinte digitale est la méthode la plus simple qui soit. Ils adorent.",
    author: "Imane R.",
    city: "Tanger",
  },
] as const;

function Stars() {
  return (
    <div className="flex text-gold" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof TESTIMONIALS[number] }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(196,154,101,0.1)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gold/0 transition-all duration-500 group-hover:bg-gold/60" />

      <div className="flex items-start justify-between">
        <Stars />
        <span className="font-display2 text-4xl leading-none text-ink/8 transition-colors duration-300 group-hover:text-gold/20">
          "
        </span>
      </div>

      <h3 className="mb-3 mt-4 font-display text-base leading-snug text-ink">
        {review.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>

      <div className="flex items-center gap-3 border-t border-line pt-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-semibold text-brass">
          {review.author[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.city}</p>
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="avis"
      className="scroll-mt-20 border-t border-line py-16 lg:py-24"
    >
      {/* Inner header — respects page padding */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-10">
            <span>05 — Avis clients</span>
            <span>Vérifié · 312 foyers</span>
          </div>
        </Reveal>

        {/* Desktop: 3-col grid with sticky sidebar */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <h2
                className="mb-6 font-display2 uppercase leading-none text-ink"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Ce qu&apos;en<br />disent 312<br />foyers.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-display2 text-6xl text-ink">4.8</span>
                <span className="text-muted-foreground">/ 5</span>
              </div>
            </Reveal>
            <div className="space-y-2">
              {RATING_BARS.map((bar, i) => (
                <motion.div
                  key={bar.stars}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 + i * 0.06 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="w-8">{bar.stars}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.pct }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.35 + i * 0.06 }}
                    />
                  </div>
                  <span className="w-8 text-right">{bar.count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop carousel */}
          <div className="col-span-2">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((review) => (
                  <CarouselItem key={review.author} className="basis-1/2">
                    <ReviewCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-5 flex gap-2">
                <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-line bg-card hover:border-gold hover:bg-card" />
                <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-line bg-card hover:border-gold hover:bg-card" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Mobile: compact score */}
        <div className="flex items-center gap-4 lg:hidden">
          <span className="font-display2 text-5xl text-ink">4.8</span>
          <div>
            <Stars />
            <p className="mt-0.5 text-xs text-muted-foreground">312 avis vérifiés</p>
          </div>
        </div>
      </div>

      {/* Mobile carousel — full bleed to allow peek beyond padding */}
      <div className="mt-8 lg:hidden">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="pl-6">
            {TESTIMONIALS.map((review) => (
              <CarouselItem key={review.author} className="basis-[82%] pr-4 sm:basis-[45%]">
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-5 flex gap-2 px-6">
            <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-line bg-card hover:border-gold hover:bg-card" />
            <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-line bg-card hover:border-gold hover:bg-card" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

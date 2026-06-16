"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";
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
  { stars: "3★", pct: "3%",  count: 9 },
  { stars: "2★", pct: "1%",  count: 3 },
  { stars: "1★", pct: "0.5%",count: 1 },
] as const;

function Stars() {
  return (
    <div className="flex text-primary" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

type Testimonial = { title: string; body: string; author: string; city: string };

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-secondary p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(22,40,71,0.12)]">
      <div className="absolute inset-x-0 top-0 h-px bg-primary/0 transition-all duration-500 group-hover:bg-primary/40" />

      <div className="flex items-start justify-between">
        <Stars />
        <span className="font-display2 text-4xl leading-none text-foreground/8 transition-colors duration-300 group-hover:text-primary/15">
          "
        </span>
      </div>

      <h3 className="mb-3 mt-4 font-display text-base leading-snug text-foreground">
        {review.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {review.body}
      </p>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {review.author[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.city}</p>
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  const t = useT();
  const s = t.sections.reviews;
  const testimonials = s.testimonials;
  const carouselOpts = { align: "start" as const, loop: true, ...(t.dir === "rtl" ? { direction: "rtl" as const } : {}) };

  return (
    <section id="avis" className="scroll-mt-20 border-t border-border py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-10">
            <span>{s.label}</span>
            <span>{s.right}</span>
          </div>
        </Reveal>

        {/* Desktop: 3-col grid with sticky sidebar */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <h2
                className="mb-6 font-display2 uppercase leading-none text-foreground"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {s.headline[0]}<br />{s.headline[1]}<br />{s.headline[2]}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-display2 text-6xl text-foreground">4.8</span>
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
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full rounded-full bg-primary"
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

          <div className="col-span-2">
            <Carousel opts={carouselOpts} className="w-full">
              <CarouselContent>
                {testimonials.map((review) => (
                  <CarouselItem key={review.author} className="basis-1/2">
                    <ReviewCard review={review} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-5 flex gap-2" dir="ltr">
                {t.dir === "rtl" ? (
                  <>
                    <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary [&_svg]:scale-x-[-1]" />
                    <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary [&_svg]:scale-x-[-1]" />
                  </>
                ) : (
                  <>
                    <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary" />
                    <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary" />
                  </>
                )}
              </div>
            </Carousel>
          </div>
        </div>

        {/* Mobile: compact score */}
        <div className="flex items-center gap-4 lg:hidden">
          <span className="font-display2 text-5xl text-foreground">4.8</span>
          <div>
            <Stars />
            <p className="mt-0.5 text-xs text-muted-foreground">{s.count}</p>
          </div>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="mt-8 lg:hidden">
        <Carousel opts={carouselOpts} className="w-full">
          <CarouselContent className="pl-6">
            {testimonials.map((review) => (
              <CarouselItem key={review.author} className="basis-[82%] pr-4 sm:basis-[45%]">
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-5 flex gap-2 px-6" dir="ltr">
            {t.dir === "rtl" ? (
              <>
                <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary [&_svg]:scale-x-[-1]" />
                <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary [&_svg]:scale-x-[-1]" />
              </>
            ) : (
              <>
                <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary" />
                <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0 border-border bg-secondary hover:border-primary hover:bg-secondary" />
              </>
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
}

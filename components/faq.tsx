"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { useT } from "@/hooks/use-t";

export function Faq() {
  const t = useT();
  const s = t.sections.faq;

  return (
    <section
      id="faq"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-border px-6 py-16 lg:px-10 lg:py-24"
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground lg:mb-12">
          <span>{s.label}</span>
          <span>{s.right}</span>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal delay={0.1}>
            <h2
              className="font-display2 uppercase leading-none text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {s.headline[0]}<br />{s.headline[1]}<br />{s.headline[2]}
            </h2>
          </Reveal>
        </div>

        <Accordion type="single" collapsible>
          {s.items.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="border-b border-border last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:text-primary hover:no-underline transition-colors">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

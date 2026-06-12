import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Arini Lock est-elle compatible avec toutes les portes ?",
    a: "Arini Lock s'adapte à la majorité des portes intérieures et d'entrée standards en bois et métal. Un guide de compatibilité détaillé est fourni avant l'achat.",
  },
  {
    q: "Que se passe-t-il en cas de coupure de courant ou de panne ?",
    a: "Arini Lock fonctionne sur piles, indépendamment du réseau électrique. En cas de panne complète, une clé physique de secours fournie avec votre serrure permet toujours d'ouvrir la porte.",
  },
  {
    q: "Combien de temps dure la batterie ?",
    a: "Avec un usage quotidien moyen, les 4 piles AA tiennent environ 12 mois. L'application vous alerte automatiquement plusieurs semaines avant épuisement.",
  },
  {
    q: "Puis-je l'installer moi-même ?",
    a: "Oui. L'installation se fait sans perçage ni outils spécifiques, en suivant le guide illustré fourni — comptez environ 15 minutes.",
  },
  {
    q: "Livrez-vous partout au Maroc ?",
    a: "Oui, nous livrons dans toutes les villes du Maroc, avec paiement à la livraison disponible. Le délai moyen est de 2 à 4 jours ouvrés.",
  },
] as const;

export function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-7xl scroll-mt-20 border-t border-line px-6 py-24 lg:px-10"
    >
      {/* Section label */}
      <div className="mb-12 flex items-start justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>07 — FAQ</span>
        <span>Questions fréquentes</span>
      </div>

      <div className="grid gap-16 lg:grid-cols-[2fr_3fr]">
        {/* Left: sticky headline */}
        <div className="lg:sticky lg:top-28">
          <h2
            className="font-display2 uppercase leading-none text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Tout ce<br />qu&apos;il faut<br />savoir.
          </h2>
        </div>

        {/* Right: accordion as divider list */}
        <Accordion type="single" collapsible>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="border-b border-line last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium text-ink hover:no-underline">
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

"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <p className="text-xs uppercase tracking-widest2 text-brass">AriniLock</p>
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        Une erreur est survenue.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {error.message || "Quelque chose s'est mal passé. Veuillez réessayer."}
      </p>
      <Button
        onClick={reset}
        className="rounded-full bg-gold px-8 text-dark hover:bg-goldhover"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        Réessayer
      </Button>
    </main>
  );
}

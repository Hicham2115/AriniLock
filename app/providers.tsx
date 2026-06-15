"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { FavoritesDrawer } from "@/components/favorites-drawer";
import { HtmlDirSync } from "@/components/html-dir-sync";
import { LenisProvider } from "@/components/lenis-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 2 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HtmlDirSync />
      <LenisProvider>
        <LoadingScreen />
        {children}
        <FavoritesDrawer />
        <Toaster position="bottom-center" />
      </LenisProvider>
    </QueryClientProvider>
  );
}

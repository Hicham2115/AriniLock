"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
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
      <LenisProvider>
        <LoadingScreen />
        {children}
        <Toaster position="bottom-center" />
      </LenisProvider>
    </QueryClientProvider>
  );
}

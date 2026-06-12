"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterPayload } from "@/types/shopify";

export function useNewsletter() {
  return useMutation({
    mutationFn: async (payload: NewsletterPayload) => {
      const parsed = newsletterSchema.parse(payload);
      const response = await axios.post("/api/newsletter", parsed, {
        timeout: 10_000,
      });
      return response.data as { ok: boolean; email: string };
    },
    onSuccess: () => {
      toast.success("Inscription confirmée ✦", {
        description: "Vous recevrez nos offres en avant-première.",
      });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? ((error.response?.data as { message?: string } | undefined)
            ?.message ?? error.message)
        : error.message;
      toast.error("Inscription impossible", { description: message });
    },
  });
}

"use client";

import NextLink from "next/link";
import { privacyContent, termsContent } from "@/lib/legal-content";
import { useLanguageStore } from "@/stores/language-store";
import { useT } from "@/hooks/use-t";

export function LegalPageBody({ page }: { page: "privacy" | "terms" }) {
  const t = useT();
  const locale = useLanguageStore((s) => s.locale);
  const l = t.legalPage;
  const content = page === "privacy" ? privacyContent[locale] : termsContent[locale];
  const title = page === "privacy" ? l.privacyTitle : l.termsTitle;

  return (
    <>
      {/* Header band */}
      <div
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, #010d1a 0%, #032245 50%, #053d7a 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            {l.badge}
          </p>
          <h1 className="text-4xl font-bold text-white lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="prose prose-sm max-w-none text-gray-700 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#162847] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-gray-800 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:leading-relaxed">
          {content}
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <NextLink href="/" className="text-sm text-[#162847] hover:underline">
            {l.backHome}
          </NextLink>
        </div>
      </div>
    </>
  );
}

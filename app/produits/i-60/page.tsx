import type { Metadata } from "next";
import { I60Client } from "./i-60-client";

export const metadata: Metadata = {
  title: "I 60 — Serrure Connectée Compacte",
  description:
    "ARINILOCK I 60 — la serrure connectée ultra-compacte pour appartement et résidence. Empreinte digitale, code PIN et app mobile, installation en 15 minutes.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "I 60 — Serrure Connectée Compacte | ARINILOCK",
    description:
      "La serrure connectée ultra-compacte pour appartement et résidence. Empreinte digitale, code PIN et app mobile, installation en 15 minutes.",
    images: [{ url: "/og-i-60.jpg", width: 894, height: 1200, alt: "ARINILOCK I 60" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I 60 — Serrure Connectée Compacte | ARINILOCK",
    description:
      "La serrure connectée ultra-compacte pour appartement et résidence. Empreinte digitale, code PIN et app mobile.",
    images: ["/og-i-60.jpg"],
  },
};

export default function I60Page() {
  return <I60Client />;
}

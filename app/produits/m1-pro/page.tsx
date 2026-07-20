import type { Metadata } from "next";
import { M1ProClient } from "./m1-pro-client";

export const metadata: Metadata = {
  title: "M1 Pro — Serrure Connectée Premium",
  description:
    "ARINILOCK M1 Pro — la serrure connectée haut de gamme alliant reconnaissance biométrique avancée, sécurité militaire et design d'exception.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "M1 Pro — Serrure Connectée Premium | ARINILOCK",
    description:
      "La serrure connectée haut de gamme alliant reconnaissance biométrique avancée, sécurité militaire et design d'exception.",
    images: [{ url: "/og-m1-pro.jpg", width: 1200, height: 1200, alt: "ARINILOCK M1 Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "M1 Pro — Serrure Connectée Premium | ARINILOCK",
    description:
      "La serrure connectée haut de gamme alliant reconnaissance biométrique avancée et sécurité militaire.",
    images: ["/og-m1-pro.jpg"],
  },
};

export default function M1ProPage() {
  return <M1ProClient />;
}

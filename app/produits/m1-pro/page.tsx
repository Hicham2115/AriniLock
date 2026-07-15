import type { Metadata } from "next";
import { M1ProClient } from "./m1-pro-client";

export const metadata: Metadata = {
  title: "M1 Pro — Serrure Connectée Premium",
  description:
    "ARINILOCK M1 Pro — la serrure connectée haut de gamme alliant reconnaissance biométrique avancée, sécurité militaire et design d'exception.",
  robots: { index: false, follow: false },
};

export default function M1ProPage() {
  return <M1ProClient />;
}

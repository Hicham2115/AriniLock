import type { Metadata } from "next";
import { I60Client } from "./i-60-client";

export const metadata: Metadata = {
  title: "I 60 — Serrure Connectée Compacte",
  description:
    "AriniLock I 60 — la serrure connectée ultra-compacte pour appartement et résidence. Empreinte digitale, code PIN et app mobile, installation en 15 minutes.",
  robots: { index: false, follow: false },
};

export default function I60Page() {
  return <I60Client />;
}

import type { Metadata } from "next";
import { ContactClient } from "@/components/contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe ARINILOCK — WhatsApp, email ou formulaire en ligne.",
};

export default function ContactPage() {
  return <ContactClient />;
}

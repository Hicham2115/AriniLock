import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Lato,
  Inter,
  Noto_Sans_Arabic,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

/* Cormorant Garamond — luxury high-contrast serif for editorial headlines */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-serif-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arinilock.ma"),
  title: {
    default: "ARINILOCK — La porte qui vous reconnaît",
    template: "%s | ARINILOCK",
  },
  description:
    "La poignée connectée qui s'ouvre par empreinte digitale, code secret ou smartphone — sans clé qui traîne. Conçue pour le Maroc, livraison partout au Maroc.",
  keywords: [
    "serrure connectée",
    "poignée connectée",
    "smart lock",
    "serrure empreinte digitale",
    "serrure sans clé",
    "serrure Maroc",
    "serrure intelligente",
    "porte connectée",
    "sécurité maison",
    "ARINILOCK",
  ],
  authors: [{ name: "ARINILOCK", url: "https://www.arinilock.ma" }],
  creator: "ARINILOCK",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "ARINILOCK",
    title: "ARINILOCK — La porte qui vous reconnaît",
    description:
      "Poignée connectée premium : empreinte digitale, code PIN, app mobile et carte RFID. Installation garantie 2 ans.",
    images: [
      {
        url: "/og-home.jpg",
        width: 670,
        height: 1200,
        alt: "ARINILOCK — Poignée connectée premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARINILOCK — La porte qui vous reconnaît",
    description:
      "Poignée connectée : empreinte digitale, code PIN, app mobile. Installation livraison partout au Maroc.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "https://www.arinilock.ma",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${lato.variable} ${cormorant.variable} ${caveat.variable} ${notoArabic.variable} ${notoSerifArabic.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Caveat,
  Cormorant_Garamond,
  Lato,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://arinilock.ma"),
  title: {
    default: "Arini Lock — La porte qui vous reconnaît",
    template: "%s | Arini Lock",
  },
  description:
    "La poignée connectée qui s'ouvre par empreinte digitale, code secret ou smartphone — sans perçage, sans clé qui traîne. Conçue pour le Maroc, livraison partout au Maroc.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Arini Lock",
    title: "Arini Lock — La porte qui vous reconnaît",
    description:
      "Poignée connectée premium : empreinte digitale, code PIN, app mobile et carte RFID. Installation sans perçage, garantie 2 ans.",
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
      className={`${inter.variable} ${lato.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

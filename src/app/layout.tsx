import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/analitica";

/**
 * La verifica di Search Console arriva da variabile d'ambiente, così si
 * cambia senza toccare il codice. NEXT_PUBLIC_GSC_HUB serve solo se si
 * sceglie una proprietà per prefisso URL sul sottodominio: con una
 * proprietà di dominio (record TXT su eleviacom.space) non serve.
 */
const GSC_SITO = process.env.NEXT_PUBLIC_GSC_SITO ?? "eEl-D6vG2kOw7OjCStGkfKEXLP9YzVgnKL2CaGzRQFY";
const GSC_HUB = process.env.NEXT_PUBLIC_GSC_HUB;

export const metadata: Metadata = {
  title: "ELEVIACOM — Studio di Architettura AI per PMI Italiane | Chatbot, Automazioni, Agenti AI",
  description:
    "ELEVIACOM progetta chatbot AI, automazioni e agenti intelligenti su misura per PMI italiane. Consulenza gratuita. Soluzioni AI da €2.000.",
  keywords:
    "agenzia AI Italia, chatbot AI per PMI, automazioni AI per aziende, dipendente AI, soluzioni AI per PMI italiane, consulenza AI per imprese",
  metadataBase: new URL("https://www.eleviacom.space"),
  verification: { google: GSC_SITO },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {GSC_HUB && <meta name="google-site-verification" content={GSC_HUB} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELEVIACOM — Studio di Architettura AI per PMI Italiane | Chatbot, Automazioni, Agenti AI",
  description: "ELEVIACOM progetta chatbot AI, automazioni e agenti intelligenti su misura per PMI italiane. Consulenza gratuita. Soluzioni AI da €2.000.",
  keywords: "agenzia AI Italia, chatbot AI per PMI, automazioni AI per aziende, dipendente AI, soluzioni AI per PMI italiane, consulenza AI per imprese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

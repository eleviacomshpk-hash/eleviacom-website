import type { Metadata } from "next";
import "./hub.css";
import { Testata } from "@/components/hub/testata";
import { Piede } from "@/components/hub/pezzi";
import { HUB_URL, dataEstesa } from "@/lib/hub";

export const metadata: Metadata = {
  metadataBase: new URL(HUB_URL),
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const oggi = dataEstesa(new Date().toISOString());

  return (
    <>
      {/* I caratteri stanno in /public/font: nessuna chiamata a terzi.
          Il sito principale resta su Inter, l'hub ha la sua voce. */}
      <link rel="preload" as="font" type="font/woff2" href="/font/newsreader.woff2" crossOrigin="" />
      <link rel="preload" as="font" type="font/woff2" href="/font/jetbrains-mono-500.woff2" crossOrigin="" />
      <div className="hub">
        <Testata data={oggi} />
        {children}
        <Piede />
      </div>
    </>
  );
}

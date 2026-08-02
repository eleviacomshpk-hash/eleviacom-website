import type { Metadata } from "next";
import { HubHeader } from "@/components/hub/header";
import { FooterSection } from "@/components/ui/flickering-footer";
import { HUB_URL } from "@/lib/hub";

export const metadata: Metadata = {
  metadataBase: new URL(HUB_URL),
};

/**
 * L'hub usa il sistema visivo del sito: fondo nero, Inter, le stesse
 * Card e gli stessi bottoni. Nessun tema separato.
 */
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <HubHeader />
      {children}
      <FooterSection />
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo — ELEVIACOM",
  description: "ELEVIACOM è uno studio di architettura AI per PMI italiane. Progettiamo chatbot, automazioni e agenti AI su misura.",
};

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Chi Siamo</h1>

        <div className="space-y-8 text-neutral-400 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">ELEVIACOM &mdash; AI Architecture Studio</h2>
            <p>ELEVIACOM &egrave; uno studio di architettura AI specializzato in soluzioni su misura per piccole e medie imprese italiane. Non siamo un&apos;agenzia tradizionale &mdash; progettiamo, costruiamo e implementiamo sistemi intelligenti che trasformano il modo in cui le aziende operano.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">La Nostra Missione</h2>
            <p>Rendere l&apos;intelligenza artificiale accessibile alle PMI italiane, con soluzioni concrete che riducono i costi operativi e aumentano le vendite. Ogni progetto &egrave; unico, progettato intorno al flusso di lavoro specifico del cliente.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Cosa Facciamo</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Chatbot AI</strong> &mdash; Rispondiamo ai clienti 24/7 su WhatsApp, web e social</li>
              <li><strong className="text-white">Automazioni AI</strong> &mdash; Eliminiamo attivit&agrave; ripetitive: ordini, fatturazione, follow-up</li>
              <li><strong className="text-white">Agenti AI</strong> &mdash; Dipendenti digitali che imparano e migliorano continuamente</li>
              <li><strong className="text-white">App Web</strong> &mdash; Software personalizzato con AI integrata</li>
              <li><strong className="text-white">Consulenza AI</strong> &mdash; Strategia personalizzata per il tuo business</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Dati Aziendali</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>ELEVIACOM ShPK &mdash; Shoq&euml;ri me P&euml;rgj&euml;gj&euml;si t&euml; Kufizuar</li>
              <li>Sede: Shkod&euml;r, GUCI E RE PUSI I VUTHJANVE, Nd. 14 H. 1, Albania</li>
              <li>NUIS/NIPT: M66411006H</li>
              <li>Email: info@eleviacom.com</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

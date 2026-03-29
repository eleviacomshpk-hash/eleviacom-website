import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consulenza AI Gratuita — ELEVIACOM",
  description: "Prenota una consulenza AI gratuita di 30 minuti con ELEVIACOM. Analizziamo il tuo business e ti mostriamo come l'AI può aiutarti.",
};

export default function ConsulenzaPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Consulenza AI Gratuita</h1>

        <div className="space-y-8 text-neutral-400 leading-relaxed">
          <p className="text-lg">Prenota una consulenza gratuita di 30 minuti. Analizzeremo insieme il tuo business e ti mostreremo esattamente come l&apos;AI pu&ograve; ridurre i costi e aumentare le vendite.</p>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Come Funziona</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-bold text-white mb-2">1</div>
                <h3 className="font-medium text-white mb-1">Consulenza</h3>
                <p className="text-sm">Analizziamo il tuo business e identifichiamo dove l&apos;AI pu&ograve; avere il maggiore impatto.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-bold text-white mb-2">2</div>
                <h3 className="font-medium text-white mb-1">Progettazione</h3>
                <p className="text-sm">Creiamo l&apos;architettura AI perfetta per le tue esigenze.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-bold text-white mb-2">3</div>
                <h3 className="font-medium text-white mb-1">Implementazione</h3>
                <p className="text-sm">Mettiamo tutto in funzione e ti accompagniamo con supporto continuo.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Prenota Ora</h2>
            <p>Contattaci su WhatsApp per prenotare la tua consulenza gratuita:</p>
            <a
              href="https://wa.me/393473596624"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-white text-black px-6 py-3 font-medium hover:bg-neutral-200 transition-colors"
            >
              Prenota su WhatsApp
            </a>
            <p className="text-sm text-neutral-500">Risponderemo entro 24 ore. Nessun impegno, nessun costo.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

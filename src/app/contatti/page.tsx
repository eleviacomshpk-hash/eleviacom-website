import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti — ELEVIACOM",
  description: "Contatta ELEVIACOM per una consulenza AI gratuita. WhatsApp, email o telefono.",
};

export default function ContattiPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Contatti</h1>

        <div className="space-y-8 text-neutral-400 leading-relaxed">
          <p>Siamo qui per aiutarti a trasformare la tua azienda con l&apos;AI. Contattaci tramite il canale che preferisci.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="https://wa.me/393473596624"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors block"
            >
              <h3 className="font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-sm">+39 347 359 6624</p>
              <p className="text-xs text-neutral-500 mt-1">Risposta entro 24 ore</p>
            </a>
            <a
              href="mailto:info@eleviacom.com"
              className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors block"
            >
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-sm">info@eleviacom.com</p>
              <p className="text-xs text-neutral-500 mt-1">Per richieste dettagliate</p>
            </a>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Sede Legale</h2>
            <p className="text-sm">
              ELEVIACOM ShPK<br />
              Shkod&euml;r, GUCI E RE PUSI I VUTHJANVE, Nd. 14 H. 1<br />
              Albania<br />
              NUIS/NIPT: M66411006H
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

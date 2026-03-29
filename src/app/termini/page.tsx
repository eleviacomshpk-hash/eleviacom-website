import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni — ELEVIACOM",
  description: "Termini e condizioni generali di ELEVIACOM ShPK per i servizi di architettura AI.",
};

export default function TerminiPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Termini e Condizioni</h1>
        <p className="text-sm text-neutral-500 mb-10">Ultimo aggiornamento: Marzo 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Identificazione del Fornitore</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ragione sociale:</strong> ELEVIACOM ShPK</li>
              <li><strong>Forma giuridica:</strong> Shoq&euml;ri me P&euml;rgj&euml;gj&euml;si t&euml; Kufizuar (LLC albanese)</li>
              <li><strong>Sede legale:</strong> Shkodër, GUCI E RE PUSI I VUTHJANVE, Nd. 14 H. 1</li>
              <li><strong>NUIS/NIPT:</strong> M66411006H</li>
              <li><strong>Email:</strong> info@eleviacom.com</li>
              <li><strong>Rappresentante UE (Art. 27 GDPR):</strong> In fase di nomina</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Servizi Offerti</h2>
            <p>ELEVIACOM fornisce servizi di architettura AI per piccole e medie imprese, tra cui:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Progettazione e sviluppo di chatbot AI (WhatsApp, web, social)</li>
              <li>Automazioni di processi aziendali basate su AI</li>
              <li>Agenti AI autonomi per customer service, gestione ordini e follow-up</li>
              <li>Sviluppo di applicazioni web con AI integrata</li>
              <li>Consulenza strategica AI per PMI</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Disclaimer AI</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gli output generati dai sistemi AI non sono garantiti come accurati o completi</li>
              <li>Il cliente &egrave; tenuto a verificare autonomamente gli output AI</li>
              <li>Gli output possono essere simili a quelli forniti ad altri clienti</li>
              <li>Non viene garantita la protezione della propriet&agrave; intellettuale sui contenuti generati dall&apos;AI</li>
              <li>ELEVIACOM utilizza modelli AI di terze parti (OpenAI, Google e altri) soggetti alle rispettive condizioni di licenza</li>
            </ul>
            <p className="mt-2">Conformemente all&apos;Art. 50 del Regolamento EU sull&apos;AI, gli utenti vengono informati quando interagiscono con un sistema di intelligenza artificiale.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Propriet&agrave; Intellettuale</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Il cliente mantiene la propriet&agrave; intellettuale sui propri dati e input</li>
              <li>La propriet&agrave; degli output &egrave; definita nel contratto specifico di servizio</li>
              <li>ELEVIACOM mantiene la propriet&agrave; intellettuale su strumenti, metodologie e framework proprietari</li>
              <li>L&apos;utilizzo di modelli AI di terze parti &egrave; soggetto alle restrizioni di licenza upstream</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Limitazione di Responsabilit&agrave;</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>ELEVIACOM esclude danni indiretti, consequenziali o punitivi</li>
              <li>La responsabilit&agrave; aggregata &egrave; limitata all&apos;importo dei compensi versati nei 12 mesi precedenti</li>
              <li>Il cliente &egrave; responsabile dell&apos;uso conforme dei sistemi AI forniti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Trattamento Dati</h2>
            <p>Il trattamento dei dati personali &egrave; disciplinato dalla nostra <Link href="/privacy" className="text-white underline">Privacy Policy</Link>. Quando ELEVIACOM agisce come responsabile del trattamento, viene stipulato un Accordo sul Trattamento dei Dati (DPA) come allegato separato.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Trattamento IVA</h2>
            <p>Per i servizi B2B dall&apos;Albania a imprese italiane con partita IVA, si applica il meccanismo di inversione contabile (reverse charge) ai sensi dell&apos;Art. 196 della Direttiva IVA 2006/112/CE.</p>
            <p>Le fatture di ELEVIACOM riportano la dicitura: <em>&ldquo;Reverse charge &mdash; Art. 196 VAT Directive 2006/112/EC&rdquo;</em></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Legge Applicabile e Foro Competente</h2>
            <p>I presenti termini sono regolati dalla legge albanese. Per la risoluzione delle controversie si fa ricorso all&apos;arbitrato internazionale (ICC), salvo diverso accordo con il cliente per l&apos;applicazione della legge italiana.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">9. Contatti</h2>
            <p>Per domande sui presenti termini: <a href="mailto:info@eleviacom.com" className="text-white underline">info@eleviacom.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}

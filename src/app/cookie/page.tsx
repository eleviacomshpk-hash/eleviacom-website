import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — ELEVIACOM",
  description: "Informativa sui cookie di ELEVIACOM ShPK conforme alle Ligji Nr. 124/2024 per Mbrojtjen e të Dhënave Personale.",
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-sm text-neutral-500 mb-10">Ultimo aggiornamento: Marzo 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Cosa Sono i Cookie</h2>
            <p>I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell&apos;utente durante la navigazione. Vengono utilizzati per migliorare l&apos;esperienza di navigazione, analizzare il traffico e personalizzare i contenuti.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Tipologie di Cookie Utilizzati</h2>

            <h3 className="text-base font-medium text-neutral-200 mt-4">Cookie Tecnici (sempre attivi)</h3>
            <p>Necessari per il funzionamento del sito. Non richiedono consenso.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cookie di sessione per la navigazione</li>
              <li>Cookie per le preferenze di consenso</li>
            </ul>

            <h3 className="text-base font-medium text-neutral-200 mt-4">Cookie Analitici (previo consenso)</h3>
            <p>Utilizzati per raccogliere informazioni aggregate sull&apos;utilizzo del sito.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google Analytics (con IP anonimizzato)</li>
            </ul>

            <h3 className="text-base font-medium text-neutral-200 mt-4">Cookie di Profilazione (previo consenso)</h3>
            <p>Al momento non utilizziamo cookie di profilazione. Qualora venissero introdotti, sar&agrave; richiesto il consenso esplicito.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Gestione del Consenso</h2>
            <p>Conformemente alle linee guida del Komisioneri IDP (10 giugno 2021):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Al primo accesso viene mostrato un banner con pulsanti &ldquo;Accetta Tutto&rdquo; e &ldquo;Rifiuta Tutto&rdquo; di <strong>uguale dimensione, formato, colore e font</strong></li>
              <li>Il pulsante &ldquo;X&rdquo; chiude il banner senza accettare &mdash; solo i cookie tecnici restano attivi</li>
              <li>Tutti i cookie non tecnici sono <strong>disattivati per impostazione predefinita</strong></li>
              <li>La gestione granulare delle categorie di cookie &egrave; accessibile con un clic</li>
              <li>Il consenso pu&ograve; essere revocato in qualsiasi momento tramite il link &ldquo;Gestione Cookie&rdquo; nel footer</li>
              <li>Il banner non riappare per <strong>6 mesi</strong> dopo la scelta dell&apos;utente</li>
              <li>Viene mantenuto un registro dei consensi (data, ora, scelte effettuate)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Come Disabilitare i Cookie</h2>
            <p>&Egrave; possibile disabilitare i cookie tramite le impostazioni del browser:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Chrome:</strong> Impostazioni &gt; Privacy e sicurezza &gt; Cookie</li>
              <li><strong>Firefox:</strong> Impostazioni &gt; Privacy &gt; Cookie e dati</li>
              <li><strong>Safari:</strong> Preferenze &gt; Privacy &gt; Cookie</li>
              <li><strong>Edge:</strong> Impostazioni &gt; Cookie e autorizzazioni</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Contatti</h2>
            <p>Per domande sulla cookie policy: <a href="mailto:privacy@eleviacom.com" className="text-white underline">privacy@eleviacom.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ELEVIACOM",
  description: "Informativa sulla privacy di ELEVIACOM ShPK ai sensi del GDPR e del D.Lgs. 196/2003.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Torna alla home</Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-neutral-500 mb-10">Ultimo aggiornamento: Marzo 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Titolare del Trattamento</h2>
            <p>ELEVIACOM ShPK (Shoq&euml;ri me P&euml;rgj&euml;gj&euml;si t&euml; Kufizuar) &mdash; societ&agrave; di diritto albanese.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sede legale: Shkodër, GUCI E RE PUSI I VUTHJANVE, Nd. 14 H. 1</li>
              <li>NUIS/NIPT: M66411006H</li>
              <li>Email: info@eleviacom.com</li>
              <li>Telefono: +39 347 359 6624</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Rappresentante UE (Art. 27 GDPR)</h2>
            <p>Ai sensi dell&apos;Art. 27 del Regolamento UE 2016/679, ELEVIACOM ha nominato un rappresentante nell&apos;Unione Europea:</p>
            <p>[Nome del rappresentante] &mdash; [indirizzo in Italia] &mdash; [email di contatto]</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Dati Personali Raccolti</h2>
            <p>Raccogliamo le seguenti categorie di dati personali:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Dati di contatto:</strong> nome, email, telefono, azienda (tramite moduli di contatto)</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, durata della visita</li>
              <li><strong>Cookie:</strong> cookie tecnici e, previo consenso, cookie analitici e di profilazione</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Finalit&agrave; e Base Giuridica</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Esecuzione di un contratto:</strong> gestione delle richieste di consulenza e fornitura dei servizi AI</li>
              <li><strong>Consenso:</strong> invio di comunicazioni commerciali e newsletter</li>
              <li><strong>Legittimo interesse:</strong> miglioramento del sito web e analisi aggregate</li>
              <li><strong>Obbligo legale:</strong> adempimenti fiscali e contabili</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">5. Trasferimento Internazionale dei Dati</h2>
            <p>ELEVIACOM ha sede in Albania, paese che non dispone di una decisione di adeguatezza dell&apos;UE. I trasferimenti di dati dall&apos;UE all&apos;Albania sono protetti mediante Clausole Contrattuali Standard (SCC) approvate dalla Commissione Europea (giugno 2021), integrate da una Valutazione d&apos;Impatto sul Trasferimento (TIA).</p>
            <p>L&apos;Albania ha adottato la Legge n. 124/2024 sulla protezione dei dati personali, pienamente allineata al GDPR, ed &egrave; parte della Convenzione 108 del Consiglio d&apos;Europa.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">6. Periodo di Conservazione</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dati di contatto: fino a 24 mesi dall&apos;ultimo contatto, salvo rapporto contrattuale in corso</li>
              <li>Dati di navigazione: massimo 26 mesi</li>
              <li>Dati contabili/fiscali: 10 anni come richiesto dalla legge</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">7. Diritti dell&apos;Interessato</h2>
            <p>Ai sensi degli articoli 15-22 del GDPR, l&apos;interessato ha diritto di:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Accedere ai propri dati personali</li>
              <li>Rettificare dati inesatti</li>
              <li>Ottenere la cancellazione (&ldquo;diritto all&apos;oblio&rdquo;)</li>
              <li>Limitare il trattamento</li>
              <li>Portabilit&agrave; dei dati</li>
              <li>Opporsi al trattamento</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p>Per esercitare questi diritti, contattare: <a href="mailto:privacy@eleviacom.com" className="text-white underline">privacy@eleviacom.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">8. Autorit&agrave; di Controllo</h2>
            <p>L&apos;interessato ha il diritto di proporre reclamo al Komisioneri per të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale (IDP):</p>
            <p>Komisioneri per të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale (IDP) &mdash; Rruga "Abdi Toptani", Tiranë, Albania &mdash; <a href="https://www.idp.al" target="_blank" rel="noopener noreferrer" className="text-white underline">www.idp.al</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}

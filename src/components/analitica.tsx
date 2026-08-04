import Script from "next/script";

/**
 * Misurazione.
 *
 * Due livelli, accesi separatamente:
 *
 * 1. Vercel Web Analytics e Speed Insights — senza cookie, senza
 *    identificatori persistenti. Non serve consenso preventivo, quindi
 *    partono sempre. Danno pagine viste, sorgenti e Core Web Vitals.
 *
 * 2. Google Analytics 4 — parte solo se esiste NEXT_PUBLIC_GA_ID.
 *    Viene caricato con Consent Mode v2 e tutti i consensi negati:
 *    in questo stato GA non scrive cookie e invia solo ping anonimi.
 *    Quando ci sarà un banner di consenso basterà chiamare
 *    `concediConsenso()` alla scelta dell'utente.
 */

const GA = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA) return null;

  return (
    <>
      <Script
        id="ga-consent"
        strategy="afterInteractive"
        // Il default va impostato PRIMA che gtag.js parta.
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${GA}', { anonymize_ip: true });
try {
  if (localStorage.getItem('consenso-analitica') === 'si') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
`,
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
    </>
  );
}

/** Da chiamare quando l'utente accetta i cookie di misurazione. */
export const codiceConsenso = `
function concediConsenso() {
  try { localStorage.setItem('consenso-analitica', 'si'); } catch (e) {}
  if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'granted' });
}
`;

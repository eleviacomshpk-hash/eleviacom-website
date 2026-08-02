import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITO_URL, VIA } from "@/lib/hub";

/* ── Briciole ─────────────────────────────────────────────────── */

export function Briciole({ voci }: { voci: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Percorso" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      <Link href={VIA.home} className="transition-colors hover:text-foreground">
        Hub
      </Link>
      {voci.map((v, i) => (
        <span key={i} className="flex items-center gap-2">
          <span aria-hidden="true" className="text-muted/50">
            /
          </span>
          {v.href ? (
            <Link href={v.href} className="transition-colors hover:text-foreground">
              {v.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">{v.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Apertura di pagina ───────────────────────────────────────── */

export function Apertura({
  briciole,
  titolo,
  testo,
  dati,
  azioni,
}: {
  briciole: { label: string; href?: string }[];
  titolo: React.ReactNode;
  testo: string;
  dati?: { valore: string | number; etichetta: string }[];
  azioni?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Alone dell'apertura: una sola ellisse sfumata su tutti i lati.
          Prima era un blocco ritagliato in alto e si vedeva il bordo netto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[1100px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(131,80,232,0.30), rgba(131,80,232,0.10) 55%, rgba(131,80,232,0) 78%)",
          }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-20">
        {briciole.length > 0 && <Briciole voci={briciole} />}
        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-5xl">
          {titolo}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{testo}</p>

        {azioni && <div className="mt-8 flex flex-wrap gap-3">{azioni}</div>}

        {dati && dati.length > 0 && (
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {dati.map((d) => (
              <div key={d.etichetta}>
                <dt className="sr-only">{d.etichetta}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-foreground md:text-3xl">{d.valore}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{d.etichetta}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/* ── Iscrizione alla newsletter ───────────────────────────────── */

export function Iscrizione() {
  return (
    <Card>
      <CardContent className="p-6 pt-6 md:p-10">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary">Ogni giovedì</span>
          <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
            Tre notizie, un caso d&apos;uso, un tool. Niente altro.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            La versione scritta di quello che qui esce durante la settimana, tagliata per chi deve decidere.
          </p>

          <form action={`${SITO_URL}/contatti`} method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="email-hub" className="sr-only">
              Indirizzo email
            </label>
            <input
              id="email-hub"
              type="email"
              name="email"
              required
              placeholder="nome@azienda.it"
              className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-ring"
            />
            <Button type="submit" className="shrink-0">
              Iscriviti
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted">
            Un&apos;email a settimana, disiscrizione con un clic.{" "}
            <a href={`${SITO_URL}/privacy`} className="underline underline-offset-2 hover:text-muted-foreground">
              Informativa privacy
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Richiamo alla consulenza ─────────────────────────────────── */

export function Consulenza({
  titolo = "Se una di queste guide descrive un problema che hai, possiamo costruirla noi.",
  testo = "Progettiamo chatbot, automazioni e agenti AI su misura per PMI italiane. La prima valutazione è gratuita e finisce con un documento, non con un preventivo.",
}: {
  titolo?: string;
  testo?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 pt-6 md:p-10">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary">ELEVIACOM</span>
          <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
            {titolo}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{testo}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="https://wa.me/393473596624" target="_blank" rel="noopener noreferrer">
                Prenota consulenza
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`${SITO_URL}/consulenza`}>Come lavoriamo</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Coda comune a tutte le pagine ────────────────────────────── */

export function Coda({ consulenza }: { consulenza?: { titolo?: string; testo?: string } }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
      <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
        <Iscrizione />
        <Consulenza {...consulenza} />
      </div>
    </section>
  );
}

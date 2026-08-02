import Link from "next/link";
import { MARCHI } from "@/lib/marchi";
import { SITO_URL, VIA } from "@/lib/hub";

/* ── Marchio ufficiale, monocromatico. Niente tessera, niente sfumatura.
      Dove il marchio non è ridistribuibile resta un filetto: preferisco
      un vuoto onesto a un monogramma inventato. ───────────────────── */

export function Marchio({ slug, titolo }: { slug: string; titolo: string }) {
  const d = MARCHI[slug];
  if (!d) return <span className="hub-marchio-vuoto" aria-hidden="true" />;
  return (
    <svg className="hub-marchio-svg" viewBox="0 0 24 24" role="img" aria-label={`Logo ${titolo}`}>
      <path d={d} />
    </svg>
  );
}

/* ── Intestazione di sezione ──────────────────────────────────────── */

export function Sezione({
  numero,
  titolo,
  nota,
  href,
  hrefLabel,
  children,
}: {
  numero: string;
  titolo: string;
  nota?: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="hub-sezione">
      <div className="hub-larghezza">
        <div className="hub-sezione-testa">
          <div>
            <span className="hub-mono hub-mono-accento">{numero}</span>
            <h2 className="hub-sezione-titolo" style={{ marginTop: 6 }}>
              {titolo}
            </h2>
            {nota && <p className="hub-sezione-nota">{nota}</p>}
          </div>
          {href && (
            <Link href={href} className="hub-oltre">
              {hrefLabel ?? "Vedi tutto"} →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ── Briciole ─────────────────────────────────────────────────────── */

export function Briciole({ voci }: { voci: { label: string; href?: string }[] }) {
  return (
    <nav className="hub-briciole hub-mono" aria-label="Percorso">
      <Link href={VIA.home}>Hub</Link>
      {voci.map((v, i) => (
        <span key={i}>
          <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span>
          {v.href ? <Link href={v.href}>{v.label}</Link> : <span style={{ color: "var(--inchiostro)" }}>{v.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/* ── Iscrizione ───────────────────────────────────────────────────── */

export function Iscrizione({ compatta = false }: { compatta?: boolean }) {
  return (
    <div className={`hub-riquadro${compatta ? " hub-riquadro--carta" : ""}`}>
      <span className="hub-mono hub-mono-accento">Ogni giovedì</span>
      <h2
        style={{
          fontSize: compatta ? "1.4rem" : "1.9rem",
          fontWeight: 400,
          letterSpacing: "-0.018em",
          lineHeight: 1.18,
          margin: "10px 0 0",
          maxWidth: "22ch",
        }}
      >
        Tre notizie, un caso d&apos;uso, un tool. Niente altro.
      </h2>
      <p style={{ marginTop: 12, color: "var(--inchiostro-tenue)", fontSize: 15.5, maxWidth: "44ch" }}>
        La versione scritta di quello che qui esce durante la settimana, tagliata per chi deve decidere.
      </p>
      <form action={`${SITO_URL}/contatti`} method="get" className="hub-campo">
        <label htmlFor="email-hub" className="sr-only" style={{ position: "absolute", left: -9999 }}>
          Indirizzo email
        </label>
        <input id="email-hub" type="email" name="email" required placeholder="nome@azienda.it" />
        <button type="submit">Iscriviti</button>
      </form>
      <p className="hub-mono" style={{ marginTop: 10, textTransform: "none", letterSpacing: 0 }}>
        Disiscrizione con un clic ·{" "}
        <a href={`${SITO_URL}/privacy`} style={{ borderBottom: "1px solid var(--filetto)" }}>
          informativa
        </a>
      </p>
    </div>
  );
}

/* ── Piede ────────────────────────────────────────────────────────── */

export function Piede() {
  return (
    <footer className="hub-piede">
      <div className="hub-larghezza hub-piede-griglia">
        <div>
          <div className="hub-marchio" style={{ fontSize: 13 }}>
            Eleviacom <span style={{ color: "var(--accento)" }}>/</span> Hub
          </div>
          <p style={{ marginTop: 14, fontSize: 15, color: "var(--inchiostro-tenue)", maxWidth: "34ch" }}>
            News, guide operative e directory dei tool di intelligenza artificiale, per chi manda avanti
            un&apos;impresa italiana.
          </p>
        </div>

        <div>
          <h3>Hub</h3>
          <ul>
            <li>
              <Link href={VIA.articoli}>Articoli</Link>
            </li>
            <li>
              <Link href={VIA.guide}>Guide</Link>
            </li>
            <li>
              <Link href={VIA.tool}>Tool</Link>
            </li>
            <li>
              <a href={VIA.rss}>Feed RSS</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>ELEVIACOM</h3>
          <ul>
            <li>
              <a href={SITO_URL}>Sito</a>
            </li>
            <li>
              <a href={`${SITO_URL}/consulenza`}>Consulenza</a>
            </li>
            <li>
              <a href={`${SITO_URL}/chi-siamo`}>Chi siamo</a>
            </li>
            <li>
              <a href={`${SITO_URL}/contatti`}>Contatti</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Legale</h3>
          <ul>
            <li>
              <a href={`${SITO_URL}/privacy`}>Privacy</a>
            </li>
            <li>
              <a href={`${SITO_URL}/cookie`}>Cookie</a>
            </li>
            <li>
              <a href={`${SITO_URL}/termini`}>Termini</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hub-larghezza hub-mono" style={{ marginTop: 40, textTransform: "none", letterSpacing: 0 }}>
        © {new Date().getFullYear()} ELEVIACOM. I marchi citati appartengono ai rispettivi titolari.
      </div>
    </footer>
  );
}

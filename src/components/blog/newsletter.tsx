import Link from "next/link";

/**
 * Blocco iscrizione. Il modulo punta alla pagina contatti finché
 * l'endpoint Listmonk non è esposto pubblicamente.
 */
export function BloccoNewsletter({ compatto = false }: { compatto?: boolean }) {
  return (
    <section
      className={`rounded-3xl border border-[var(--lettura-bordo)] lettura-superficie ${
        compatto ? "p-7" : "p-8 md:p-12"
      }`}
    >
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--lettura-tenue)]">
          Newsletter
        </p>
        <h2
          className={`mt-3 font-semibold tracking-tight text-[var(--lettura-titolo)] ${
            compatto ? "text-xl" : "text-2xl md:text-3xl"
          }`}
        >
          L&apos;AI applicata alle imprese italiane, una volta a settimana.
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-400">
          Le tre notizie che contano, un caso d&apos;uso concreto e il tool della settimana.
          Niente riassunti di comunicati stampa.
        </p>

        <form action="/contatti" method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email-newsletter" className="sr-only">
            Il tuo indirizzo email
          </label>
          <input
            id="email-newsletter"
            type="email"
            name="email"
            required
            placeholder="nome@azienda.it"
            className="min-w-0 flex-1 rounded-full border border-[var(--lettura-bordo)] bg-[#151a1e] px-5 py-3 text-sm text-neutral-200 outline-none transition-colors placeholder:text-[#555f66] focus:border-neutral-500"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#eef2f5] px-6 py-3 text-sm font-medium text-[#15191c] transition-colors hover:bg-white"
          >
            Iscriviti
          </button>
        </form>

        <p className="mt-3 text-xs text-[var(--lettura-tenue)]">
          Un&apos;email a settimana. Disiscrizione con un clic.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-300">
            Informativa privacy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

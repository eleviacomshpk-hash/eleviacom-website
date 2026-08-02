import { cn } from "@/lib/utils";

/**
 * Marchio ELEVIACOM.
 *
 * Il wordmark che arrivava con il template della testata non è il nostro:
 * disegna la parola "Efferd". Qui il marchio è la parola ELEVIACOM
 * composta in Inter, come nell'apertura della home.
 */
export function MarchioEleviacom({ className, sezione }: { className?: string; sezione?: string }) {
  return (
    <span className={cn("flex items-baseline gap-2 whitespace-nowrap", className)}>
      <span className="text-[15px] font-semibold uppercase leading-none tracking-[0.2em] text-foreground">
        Eleviacom
      </span>
      {sezione && (
        <>
          <span aria-hidden="true" className="text-[13px] leading-none text-primary">
            /
          </span>
          <span className="text-[13px] font-medium uppercase leading-none tracking-[0.18em] text-muted-foreground">
            {sezione}
          </span>
        </>
      )}
    </span>
  );
}

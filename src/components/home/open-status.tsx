"use client";

import { useEffect, useState } from "react";
import { HOUR_GROUPS, montevideoClock, openStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** null until mounted: server HTML and first client render match, then the live value arrives. */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function OpenStatus() {
  const now = useNow();
  const status = now ? openStatus(now) : null;
  return (
    <p className="inline-flex min-h-10 items-center gap-2.5 rounded-full border border-ink-line py-2 pl-3.5 pr-4 text-sm text-cream">
      <span
        aria-hidden
        className={cn("size-2.5 shrink-0 rounded-full", status?.open ? "bg-ok-bright" : "bg-cream-3")}
      />
      {status ? status.label : "Horario de atención"}
    </p>
  );
}

/** Three real groups of hours; today's group gets the bronze rule once the clock is known. */
export function WeekHours() {
  const now = useNow();
  const today = now ? montevideoClock(now).day : -1;
  return (
    <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-3">
      {HOUR_GROUPS.map((g) => {
        const isToday = g.days.includes(today);
        return (
          <div key={g.label} className={cn("border-t-2 pt-3", isToday ? "border-bronze-500" : "border-ink-line")}>
            <dt className="flex items-center gap-2 text-sm text-cream-2">
              {g.label}
              {isToday ? <span className="rounded-full bg-bronze-500 px-2 py-0.5 text-xs font-semibold text-ink">Hoy</span> : null}
            </dt>
            <dd className="num mt-1 text-lg text-cream">{g.text}</dd>
          </div>
        );
      })}
    </dl>
  );
}

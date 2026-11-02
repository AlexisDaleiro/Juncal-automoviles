"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/search/filter-bar";
import { FilterChips } from "@/components/search/filter-chips";
import { ResultsBar } from "@/components/search/results-bar";
import { FinanceBanner } from "@/components/shared/finance-banner";
import { EmptyState } from "@/components/vehicles/empty-state";
import { Hero } from "@/components/vehicles/hero";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import { useFilters } from "@/hooks/useFilters";
import { PAGE_SIZE } from "@/lib/constants";

const FilterSheet = dynamic(() => import("@/components/search/filter-sheet").then((m) => m.FilterSheet), { ssr: false });

export function Catalog() {
  const f = useFilters();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [intro, setIntro] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Pagination belongs to one result set: a new set starts again at one page.
  const setKey = useMemo(() => JSON.stringify([f.state, f.orden]), [f.state, f.orden]);
  const [pager, setPager] = useState({ key: setKey, visible: PAGE_SIZE });
  const visible = pager.key === setKey ? pager.visible : PAGE_SIZE;

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1400);
    return () => {
      clearTimeout(t);
      clearTimeout(timer.current);
    };
  }, []);

  const total = f.results.length;
  const items = f.results.slice(0, visible);
  const done = visible >= total;

  const loadMore = () => {
    setLoadingMore(true);
    // The data is local; the pause lets the skeletons read as "fetching" and keeps the scroll position calm.
    timer.current = setTimeout(() => {
      setPager({ key: setKey, visible: visible + PAGE_SIZE });
      setLoadingMore(false);
    }, 550);
  };

  return (
    <>
      <Hero f={f} />
      <FilterBar
        f={f}
        onOpenSheet={() => {
          setSheetMounted(true);
          setSheetOpen(true);
        }}
      />
      <Container id="resultados" className="scroll-mt-[calc(var(--header-h)+4.5rem)] space-y-4 pb-24 pt-6">
        <h2 className="sr-only">Vehículos disponibles</h2>
        <ResultsBar f={f} />
        {f.chips.length ? <FilterChips f={f} /> : null}

        {total === 0 ? (
          <EmptyState onClear={f.clearAll} />
        ) : (
          <>
            <VehicleGrid items={items} view={f.vista} loadingMore={loadingMore} intro={intro} />
            <div className="mx-auto flex max-w-sm flex-col items-center gap-4 pt-8 text-center">
              <p className="text-sm text-text-2" role="status">
                Viendo <span className="num font-semibold text-ink">{Math.min(visible, total)}</span> de{" "}
                <span className="num font-semibold text-ink">{total}</span> vehículos
              </p>
              <div aria-hidden className="h-0.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-bronze-600 transition-[width] duration-500 ease-out"
                  style={{ width: `${(Math.min(visible, total) / total) * 100}%` }}
                />
              </div>
              {done ? null : (
                <Button variant="outline" size="lg" className="w-full" onClick={loadMore} disabled={loadingMore} aria-busy={loadingMore}>
                  {loadingMore ? "Cargando…" : `Cargar ${Math.min(PAGE_SIZE, total - visible)} más`}
                </Button>
              )}
            </div>
          </>
        )}
      </Container>
      <FinanceBanner />
      {sheetMounted ? <FilterSheet f={f} open={sheetOpen} onOpenChange={setSheetOpen} /> : null}
    </>
  );
}

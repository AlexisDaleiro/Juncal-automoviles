"use client";

import { useMemo } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CategoryPills } from "@/components/search/category-pills";
import { SearchBar } from "@/components/search/search-bar";
import { useFinance } from "@/components/shared/finance-provider";
import { vehicles } from "@/data/vehicles";
import type { FiltersApi } from "@/hooks/useFilters";

const cheapest = Math.min(...vehicles.map((v) => v.price));

/** Search is the hero. No carousel: the first screen is the question the visitor came to ask. */
export function Hero({ f }: { f: FiltersApi }) {
  const { quota } = useFinance();
  const from = useMemo(() => Math.round(quota(cheapest)), [quota]);

  return (
    <section aria-labelledby="titulo-catalogo" className="on-dark bg-ink text-cream">
      <Container className="pb-6 pt-5 sm:pb-8 sm:pt-8">
        <h1 id="titulo-catalogo" className="display text-4xl sm:text-5xl">
          Encontrá tu próximo auto
        </h1>
        <p className="mt-2 text-sm text-cream-2 sm:mt-3 sm:text-lg">
          <span className="num font-semibold text-cream">{f.total}</span> vehículos verificados · Financiación desde US${" "}
          <span className="num font-semibold text-cream">
            <AnimatedNumber value={from} />
          </span>
          /mes · Entrega inmediata
        </p>
        <div className="mt-4 max-w-3xl sm:mt-6">
          <SearchBar f={f} />
        </div>
        <div className="mt-4 sm:mt-5">
          <CategoryPills f={f} />
        </div>
      </Container>
    </section>
  );
}

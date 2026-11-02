"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { LogoMark, WhatsAppIcon } from "@/components/ui/icons";
import { useFinance } from "@/components/shared/finance-provider";
import { useFavorites } from "@/lib/favorites";
import { whatsappLink } from "@/lib/utils";

const MobileNav = dynamic(() => import("@/components/layout/mobile-nav").then((m) => m.MobileNav), { ssr: false });

/** Compacts past 48px, expands back under 8px. The gap avoids flicker when the shrinking header shifts content. */
function useCompactOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > 48) root.setAttribute("data-compact", "");
      else if (y < 8) root.removeAttribute("data-compact");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      root.removeAttribute("data-compact");
    };
  }, []);
}

export function Header() {
  useCompactOnScroll();
  const [navOpen, setNavOpen] = useState(false);
  const [navMounted, setNavMounted] = useState(false);
  const { openCalculator } = useFinance();
  const { ids } = useFavorites();

  const linkClass =
    "rounded-ctl px-3 py-2 text-sm font-medium text-cream-2 transition-colors hover:text-cream";

  return (
    <header
      className="on-dark sticky top-0 z-40 border-b border-ink-line bg-ink text-cream transition-[height] duration-200 ease-out"
      style={{ height: "var(--header-h)" }}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link
          href="/vehiculos"
          className="flex origin-left items-center gap-2.5 rounded-ctl transition-transform duration-200 ease-out [html[data-compact]_&]:scale-90"
        >
          <LogoMark size={32} />
          <span className="flex flex-col leading-none">
            <span className="display text-xl">Juncal</span>
            <span className="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-cream-2">Automóviles</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          <a
            className={linkClass}
            href={whatsappLink("Hola Juncal, quiero vender mi auto. ¿Cómo es el proceso?")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Vender mi auto
          </a>
          <button type="button" className={linkClass} onClick={() => openCalculator()}>
            Financiación
          </button>
          <Link
            href="/vehiculos?guardados=1"
            aria-label={ids.length ? `Guardados, ${ids.length}` : "Guardados"}
            className="relative ml-1 grid size-10 place-items-center rounded-full text-cream-2 transition-colors hover:text-cream"
          >
            <Heart size={20} aria-hidden />
            {ids.length ? (
              <span className="num absolute right-0 top-0 grid min-w-4 place-items-center rounded-full bg-bronze-500 px-1 text-[0.625rem] font-semibold leading-4 text-ink">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <a
            className={buttonVariants({ variant: "wa", size: "md", className: "ml-2" })}
            href={whatsappLink("Hola Juncal, quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/vehiculos?guardados=1"
            aria-label={ids.length ? `Guardados, ${ids.length}` : "Guardados"}
            className="relative grid size-11 place-items-center rounded-full text-cream-2"
          >
            <Heart size={22} aria-hidden />
            {ids.length ? (
              <span className="num absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-bronze-500 px-1 text-[0.625rem] font-semibold leading-4 text-ink">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            className="grid size-11 place-items-center rounded-full text-cream"
            onClick={() => {
              setNavMounted(true);
              setNavOpen(true);
            }}
          >
            <Menu size={24} aria-hidden />
          </button>
        </div>
      </Container>
      {navMounted ? <MobileNav open={navOpen} onOpenChange={setNavOpen} /> : null}
    </header>
  );
}

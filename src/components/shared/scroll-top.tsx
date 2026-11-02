"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Appears after two viewport heights of scrolling. */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight * 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
      }
      className={cn(
        "fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] right-4 z-40 grid size-11 place-items-center rounded-full bg-ink text-cream shadow-fab transition-[opacity,transform] duration-300 ease-out hover:bg-ink-raised md:bottom-6 md:right-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp size={20} aria-hidden />
    </button>
  );
}

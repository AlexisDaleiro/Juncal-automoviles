"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

/**
 * Counts to `value` with an ease-out. First render is exact (no animation on load),
 * reduced-motion users get the final value immediately, screen readers get only the final value.
 */
export function AnimatedNumber({
  value,
  format = formatNumber,
  duration = 420,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const shown = useRef(value);

  useEffect(() => {
    const from = shown.current;
    if (from === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = value;
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      shown.current = from + (value - from) * eased;
      setDisplay(shown.current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <>
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden>{format(display)}</span>
    </>
  );
}

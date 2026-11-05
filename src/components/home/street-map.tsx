import { cn } from "@/lib/utils";

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: 3,
  fill: "var(--color-text-3)",
} as const;

/**
 * Authored schematic of the corner (Constituyente x Emilio Frugoni). It is a diagram, not a survey:
 * block sizes are invented, the caption says so. The lines draw once, then the pin drops.
 */
export function StreetMap({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-card bg-paper p-3 text-ink shadow-pop sm:p-4", className)}>
      <svg
        viewBox="0 0 480 360"
        role="img"
        aria-label="Esquema de la esquina: Juncal Automóviles está sobre Constituyente, esquina Emilio Frugoni, número 1880."
        className="block h-auto w-full rounded-xl bg-paper-2"
      >
        <g fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth="1.5">
          <rect x="24" y="24" width="212" height="114" rx="14" pathLength="1" className="draw" />
          <rect x="308" y="24" width="148" height="114" rx="14" pathLength="1" className="draw" style={{ animationDelay: "80ms" }} />
          <rect x="24" y="210" width="212" height="126" rx="14" pathLength="1" className="draw" style={{ animationDelay: "160ms" }} />
          <rect x="308" y="210" width="148" height="126" rx="14" pathLength="1" className="draw" style={{ animationDelay: "240ms" }} />
        </g>

        <g stroke="var(--color-line-strong)" strokeWidth="1.5" strokeDasharray="6 8" fill="none">
          <path d="M0 174H480" />
          <path d="M272 0V360" />
        </g>

        <text x="40" y="178" style={labelStyle}>
          CONSTITUYENTE
        </text>
        <text transform="translate(276 332) rotate(-90)" style={labelStyle}>
          EMILIO FRUGONI
        </text>

        <rect x="308" y="210" width="62" height="46" rx="6" fill="var(--color-ink)" />
        <text x="339" y="238" textAnchor="middle" style={{ ...labelStyle, fill: "var(--color-cream)", letterSpacing: 1, fontSize: 13 }}>
          1880
        </text>

        <g transform="translate(316 212)">
          <ellipse cx="0" cy="1" rx="9" ry="3" fill="var(--color-ink)" opacity="0.25" />
          <g className="pin-drop">
            <path
              d="M0 0C-4-8-14-17-14-30a14 14 0 0 1 28 0C14-17 4-8 0 0Z"
              fill="var(--color-bronze-600)"
              stroke="var(--color-paper)"
              strokeWidth="2"
            />
            <circle cx="0" cy="-30" r="5" fill="var(--color-cream)" />
          </g>
        </g>
      </svg>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs text-text-3">
        <span>Esquema de la esquina, sin escala.</span>
        <span className="num text-ink">N.º 1880</span>
      </figcaption>
    </figure>
  );
}

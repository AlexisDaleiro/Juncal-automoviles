import { ImageResponse } from "next/og";

export const alt = "Juncal Automóviles: autos usados y 0 km en Montevideo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f4f2ec",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Juncal</div>
          <div style={{ fontSize: 28, letterSpacing: 10, color: "#b9b5aa" }}>AUTOMÓVILES</div>
          <div style={{ width: 120, height: 6, background: "#b87333", marginTop: 12 }} />
        </div>
        <div style={{ fontSize: 44, lineHeight: 1.25, maxWidth: 900 }}>
          Autos usados seleccionados, 0 km y eléctricos. Financiación y gestoría propia en Montevideo.
        </div>
      </div>
    ),
    size,
  );
}

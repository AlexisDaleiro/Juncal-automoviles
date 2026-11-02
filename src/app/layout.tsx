import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";
import { JsonLd } from "@/components/shared/json-ld";
import { ScrollTop } from "@/components/shared/scroll-top";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";
import { SITE } from "@/lib/constants";
import { organizationLd } from "@/lib/seo";
import "./globals.css";

/** Archivo has a width axis: semi-expanded cuts give headings an automotive-signage stance. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Autos usados y 0 km en Montevideo | Juncal Automóviles", template: "%s | Juncal Automóviles" },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: SITE.name,
    title: "Juncal Automóviles: autos usados y 0 km en Montevideo",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: "Juncal Automóviles", description: SITE.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-ctl bg-cream px-4 py-3 text-sm font-semibold text-ink shadow-pop transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Providers>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ScrollTop />
        </Providers>
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}

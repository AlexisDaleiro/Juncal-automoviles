# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Pinned by the user's brief: Next.js 15 App Router + TypeScript, Tailwind CSS v4, Radix UI primitives, Framer Motion (layout animations only), nuqs for URL state, lucide-react. Mock data, no backend.

## Users

*(Inferred from the brief; not interview-confirmed.)* Uruguayans aged 28-55 shopping for a car, 75%+ on mobile. A car is a high-value emotional and financial purchase: they want USD prices stated plainly, a monthly-payment estimate, and signals they can trust the seller. Secondary reader: the dealership owner evaluating this prototype as a sales demo.

## Product Purpose

Juncal Automóviles is a dealership in Montevideo selling curated used cars, 0 km and electric vehicles (OMODA, MCROWN, BAW among them). The catalog page `/vehiculos` must let a visitor find, compare and contact about a car faster than on the current Wix store, and make the before/after comparison close the sale of the redesign itself.

## Positioning

Premium-accessible: trust meets desire. Differentiators a neighbour cannot truthfully copy: own gestoría (paperwork and transfer handled in-house), financing with all banks, Ezzatti Seguros insurance partnership, mechanical review and warranty on every vehicle.

## Operating Context

Real, read from juncalautomoviles.com on 2026-11-02: Constituyente 1880 esq. Emilio Frugoni, Montevideo. Ventas: 091 223 355 | 099 601 062. Hours: Mon-Fri 09:30-18:00, Sat 09:00-13:00. Current nav: Inicio, Vehículos, Sobre nosotros, Ezzatti Seguros, Gestoría. Current store lists 35 vehicles priced US$ 4.490 to US$ 39.900.

## Capabilities and Constraints

- Prices in USD (US$), formatted es-UY.
- Filters reflected in the URL so a search is shareable.
- Photos are Wikimedia Commons stand-ins matched to the model, credited in `public/cars/CREDITS.md`; they must be replaced with the dealership's own photography.
- Vehicle spec, year, km and prices are mock data except where noted in `src/data/vehicles.ts`; Chinese-brand model names (MCROWN, BAW, JMC) are plausible stand-ins to validate with the client.
- Logo not provided: a wordmark placeholder is used.
- Undecided: social media URLs, exact financing rates and terms, warranty terms, client-count claim beyond the brief's example.

## Brand Commitments

Name: Juncal Automóviles. Voice: Rioplatense Spanish, voseo ("Encontrá", "Calculá"), direct and warm, never salesy. Explicit palette from the brief: #0A0A0A base, #FAFAF8 surface, one accent (bronze/copper), green for Disponible/Verificado.

## Evidence on Hand

Contact data and a handful of real listings from the current site. No testimonials, review scores, or customer counts are on hand; the trust strip states only what the brief asserts (mechanical review, warranty, financing, gestoría) and marks the customer-count figure as a placeholder to confirm.

## Product Principles

1. Trust before conversion: show price, history and who stands behind the car before asking for contact.
2. Mobile is the product; desktop is the scaled-up version.
3. The price and the monthly payment weigh as much as the photo.
4. Every control either helps find, compare or contact; anything else is removed.
5. Motion communicates state, hierarchy or feedback, otherwise it is cut.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard operation, visible custom focus, `aria-live` announcements for filter results, `prefers-reduced-motion` respected.

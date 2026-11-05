# DESIGN.md · Juncal Automóviles

Catálogo `/vehiculos`. Prototipo de alta fidelidad en Next.js 15 + Tailwind v4. Fuente de verdad de los tokens: `src/app/globals.css` (`@theme static`). Este archivo documenta lo construido, no lo deseado.

**Concepto.** Una vitrina de relojería: superficies crema, tinta negra, un solo acento bronce que actúa como bisturí. El producto habla; la interfaz se aparta. Negro profundo para lo que da autoridad (header, hero, confianza, footer), crema para lo que se compara (catálogo).

---

## 1. Tokens de diseño

### Color

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `ink` | `#0A0A0A` | Base, texto principal, header/hero/footer | 18.9:1 sobre paper |
| `ink-soft` | `#151513` | Superficie oscura secundaria | |
| `ink-raised` | `#1D1B18` | Hover sobre tinta, bloques elevados | |
| `ink-line` | `#2C2924` | Bordes sobre tinta | |
| `cream` | `#F4F2EC` | Texto sobre tinta | 17:1 sobre ink |
| `cream-2` | `#B9B5AA` | Texto secundario sobre tinta | 9.6:1 |
| `cream-3` | `#8E8A80` | Texto terciario sobre tinta | 5.8:1 |
| `paper` | `#FAFAF8` | Superficie base (crema, no blanco quirúrgico) | |
| `paper-2` | `#F2F1EC` | Relleno sutil, skeleton, hover | |
| `line` | `#E6E4DD` | Divisores, bordes (solo cuando el espacio no alcanza) | |
| `line-strong` | `#CFCCC2` | Bordes de inputs y botones outline | |
| `text-2` | `#46433D` | Texto secundario sobre paper | 8.7:1 |
| `text-3` | `#6E6A61` | Metadatos, placeholder | 5.1:1 |
| `bronze-500` | `#B87333` | Acento sobre tinta, línea de énfasis, hover de card | 5.2:1 sobre ink |
| `bronze-600` | `#9A5C26` | Acento sobre paper: foco, rango de slider, badge "0 km", enlaces | 5.1:1 sobre paper |
| `bronze-700` | `#7D4A1E` | Hover del acento, texto sobre `bronze-100` | 5.9:1 |
| `bronze-100` | `#F3E6D8` | Fondo del badge "Destacado" | |
| `ok` / `ok-soft` / `ok-bright` | `#1F7A4D` / `#E3F1E9` / `#46C37B` | Disponible, verificado (punto brillante sobre foto) | 5.1:1 |
| `alert` / `alert-soft` | `#B3372D` / `#F8E4E1` | Alertas suaves | 5.7:1 |
| `wa` / `wa-hover` | `#137A3F` / `#0F6A36` | WhatsApp (botón del header, FAB). Único verde de marca ajena | 5.5:1 con texto blanco |

Escala neutra con intención (6 pasos): `text 0A0A0A` → `text-2` → `text-3` (placeholder/meta) → `line-strong` (bordes de control) → `line` (divisores) → `paper-2` (relleno).

Regla del acento: el bronce aparece en foco, rango de slider, badge "0 km", línea bajo cada título, borde de card en hover, contador de favoritos, íconos de confianza. Nunca como fondo de superficie ni como botón primario: el CTA principal es tinta.

### Tipografía

| Rol | Familia | Pesos | Notas |
|---|---|---|---|
| Display | **Archivo** (variable, eje `wdth`) | 650 | `font-variation-settings: "wdth" 112`, tracking −0.022em. Clase `display`. Semi-expandida: postura de señalética automotriz |
| Cuerpo | **Archivo** `wdth 100` | 400 / 500 / 600 | Misma familia: un solo archivo de fuente, menos peso de carga |
| Datos | **JetBrains Mono** | 500 / 600 | Precios, km, cuotas, años, contadores. Clase `num`, `tabular-nums`, tracking −0.03em |

Escala modular, razón 1.25 sobre 16 px, fluida con `clamp()`:

| Token | Rango | Uso |
|---|---|---|
| `xs` | 12 px | Metadatos, badges |
| `sm` | 14 px | Specs, botones, ayudas |
| `base` | 16 px | Cuerpo, inputs (16 px evita el zoom de iOS) |
| `lg` | 17 → 20 px | Título de card |
| `xl` | 20 → 25 px | Títulos de sheet |
| `2xl` | 25 → 31 px | Título de card destacada, secciones |
| `3xl` | 31 → 39 px | Títulos de página interna |
| `4xl` | 39 → 49 px | Headline hero en móvil |
| `5xl` | 40 → 64 px | Headline hero desktop |

Medida de cuerpo ≤ 65 caracteres; títulos con `text-wrap: balance`.

### Espaciado

Base de 4 px: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128` = utilidades `1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32`. Gutter de card: 20 px móvil, 24 px desktop. Más aire sobre un título que debajo.

### Radios

Cards 16 px (`rounded-card`), sheets 24 px, inputs y botones 8 px (`rounded-ctl`), chips, badges y avatares `rounded-full`.

### Sombras

Siempre dos capas: una ambiental y una direccional.

| Token | Valor | Uso |
|---|---|---|
| `shadow-card` | `0 1px 2px /5%, 0 6px 16px −6px /10%` | Reposo |
| `shadow-card-hover` | `0 2px 4px /5%, 0 18px 36px −12px /22%` | Hover de card |
| `shadow-pop` | `0 2px 6px /8%, 0 16px 40px −10px /28%` | Popovers, sheets, buscador |
| `shadow-fab` | `0 2px 6px /18%, 0 10px 24px −6px /35%` | FAB, volver arriba |

Sin glassmorphism, sin blur decorativo. Único gradiente: scrim de 64 px bajo la foto de la card para que puntos y "Disponible" se lean sobre cualquier imagen.

### Easing

`--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` para entradas. `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` solo para feedback táctil (tap, corazón).

---

## 2. Componentes

Estados: **D** default, **H** hover, **A** active, **X** disabled, **F** focus (anillo bronce 2 px, offset 2 px; sobre tinta `bronze-500`), **L** loading.

| Componente | Archivo | Variantes | Estados y notas |
|---|---|---|---|
| Button | `ui/button.tsx` | `primary` (tinta), `accent`, `wa`, `outline`, `ghost`, `onDark` · `sm` 36, `md` 44, `lg` 48, `icon` | D/H/A (baja 1 px)/X (45 %)/F. `buttonVariants()` da el mismo aspecto a `<a>` y `<Link>`. `aria-busy` en L |
| Badge | `ui/badge.tsx` | `solid` (año), `accent` (0 km), `soft` (Destacado), `ok`, `neutral` | 28 px, `rounded-full` |
| ChoiceChips | `ui/choice-chips.tsx` | radio / checkbox | Inputs nativos: flechas, agrupación y lectores gratis. Marcado = tinta |
| RangeSlider | `ui/range-slider.tsx` | doble / simple | Radix Slider + campos numéricos que validan al blur/Enter. Pulgar 24 px con área de toque 44 px. Actualiza en cada tick |
| Sheet | `ui/sheet.tsx` | `side` (abajo en móvil, panel derecho ≥ md), `center` | Radix Dialog: trampa de foco, Escape, bloqueo de scroll. Manija visual en móvil |
| Skeleton | `ui/skeleton.tsx` | | Shimmer una pasada, izquierda a derecha |
| AnimatedNumber | `ui/animated-number.tsx` | | Cuenta con ease-out cúbico 420 ms; valor final para lectores y `reduce-motion` |
| Header | `layout/header.tsx` | | Sticky. Compacto pasados 48 px (vuelve bajo 8 px): 76→60 px desktop, 60→52 móvil. Hamburguesa abre sheet inferior |
| Footer | `layout/footer.tsx` | | Dirección → Maps, horarios reales, atajos, WhatsApp y teléfonos, redes, sello Gestoría propia |
| SearchBar | `search/search-bar.tsx` | | Combobox ARIA 1.2: flechas, Enter, Escape, `aria-activedescendant`. Sugiere marcas y modelos. Filtra en vivo |
| CategoryPills | `search/category-pills.tsx` | SUV, Sedán, Pick-up, Eléctricos, 0 km | `aria-pressed`; conteo sobre todo el stock |
| FilterBar | `search/filter-bar.tsx` | pills (≥ lg) / botón Filtros | Sticky bajo el header (`top: var(--header-h)`). Popovers Radix; pill activa muestra su resumen |
| FilterSheet | `search/filter-sheet.tsx` | | Móvil: todas las secciones. Desktop: solo el resto. Pie: "Ver N vehículos" en vivo |
| FilterChips | `search/filter-chips.tsx` | | Entra con spring, sale con fade + colapso horizontal |
| ResultsBar | `search/results-bar.tsx` | Sort (Radix Dropdown), ViewToggle (2 / 3 / lista) | Contador `role=status` `aria-live=polite` |
| VehicleCard | `vehicles/vehicle-card.tsx` | `grid`, `list`, `feature` | Ver abajo |
| VehicleGallery | `vehicles/vehicle-gallery.tsx` | | Crossfade; barrido con mouse, swipe táctil, flechas con foco |
| FavoriteButton | `vehicles/favorite-button.tsx` | | `aria-pressed`; persiste en `localStorage` |
| TrustBanner | `shared/trust-banner.tsx` | | Interstitial a ancho completo tras la card 12 |
| FinanceBanner | `shared/finance-banner.tsx` | | Móvil: barra inferior. Desktop: tarjeta lateral inferior izquierda |
| FinanceCalculator | `shared/finance-calculator.tsx` | | Sheet centrado; anticipo y plazo compartidos con todas las cuotas |
| WhatsAppFab / ScrollTop | `shared/` | | FAB solo móvil; volver arriba tras 2 viewports |
| EmptyState | `vehicles/empty-state.tsx` | | Ilustración lineal + copy empático + dos salidas |

### VehicleCard (anatomía)

Foto 4:3 con año (badge sólido), "0 km", "Destacado", Guardar (arriba) y "Disponible" con punto verde (abajo). Título en un renglón: **marca** semibold, *modelo y versión* regular. Línea de 1 px con 32 px de bronce. Specs en una línea: combustible, km, transmisión. Precio en JetBrains Mono, el número más grande después del título, sin la palabra "Precio". Cuota estimada debajo: abre la calculadora. Doble CTA 44 px: Ver detalle (outline) + WhatsApp (tinta, mensaje prellenado con el vehículo).

- **grid** vertical. **list** horizontal (foto 42 % móvil, 320 px desktop; precio y CTA en columna derecha ≥ md). **feature** ocupa dos columnas si el primer resultado es destacado.
- `article` etiquetado por su título; un solo enlace por card (el título, estirado con `::after`), controles por encima (`z-10`).
- Estados: D (`shadow-card`, borde transparente) / H (borde bronce 60 %, `shadow-card-hover`) / A táctil (`scale 0.98`, resorte al soltar) / F (anillo bronce alrededor de la card entera, vía `:has`).
- `contain: layout style paint`.

---

## 3. Patrones de interacción

Principio: toda animación comunica estado, jerarquía o feedback. Si no, se elimina. CSS para micro-interacciones; Framer Motion (`LazyMotion` + `domMax`, carga diferida) solo para layout y presencia.

| Patrón | Qué hace | Tiempo y curva | Propósito |
|---|---|---|---|
| Entrada de cards | Fade + `translateY(8px)`, stagger 40 ms (máx. 10) solo en la primera carga | 300 ms, ease-out-expo | Orden de lectura, sin espectáculo |
| Header compacto | Altura, logo a 90 % | 200 ms ease-out, histéresis 48/8 px | Gana espacio sin saltos |
| Filtrar | Las que no coinciden se comprimen (`scale .94`, fade) y salen; el resto se reubica | exit 180 ms, layout 400 ms ease-out-expo (`layout="position"`, `popLayout`) | Se ve qué cambió |
| Cambio de vista | Mismos nodos, el layout se interpola | 400 ms | Continuidad, sin remount |
| Hover de card (desktop) | Sombra y borde bronce | 300 ms ease-out-expo | Sin zoom genérico |
| Galería | Crossfade entre fotos; al mover el mouse por la foto se recorre según la zona | opacidad 300 ms | Sensación premium, sin slide |
| Fotos extra | Solo se montan en la primera intención (hover, foco, toque) | | Una foto por card en el grid |
| Tap (móvil) | `scale(.98)` y resorte al soltar | 100 ms / 260 ms spring | Feedback táctil |
| Guardar | Corazón se llena y hace pop 1→1.3→1, solo tras un clic | 420 ms spring | Recompensa pequeña, nunca al cargar |
| Chips de filtro | Entran con resorte desde 0; salen con fade + colapso horizontal | spring 520/32 | Alta y baja legibles |
| Contadores | Cuenta hasta el valor nuevo: resultados, "desde US$ X/mes", cuotas al mover anticipo o plazo | 420 ms ease-out cúbico | Cambio de precio perceptible |
| Skeleton | Shimmer **una** pasada | 1300 ms | Un bucle infinito parece un bug |
| Cargar más | Botón explícito; 6 skeletons 550 ms; barra de progreso | | Sin auto-carga que desoriente |
| Banner de financiación | Aparece tras 560 px; descartable; vuelve una vez al re-entrar la 3.ª card | 500 ms ease-out | Ayuda sin insistir |
| FAB WhatsApp | Tres pulsos suaves, luego reposo | 2.4 s ×3 | Atrae sin molestar |
| Volver arriba | Fade + deslizamiento | 300 ms | Tras 2 viewports |
| Sheets / popovers | Subir desde abajo (móvil) / entrar desde la derecha / modal centrado | 420 ms ease-out-expo · salida 260 ms | Origen espacial claro |

**Movimiento reducido.** `MotionConfig reducedMotion="user"` apaga transformaciones y layout; `@media (prefers-reduced-motion: reduce)` reduce toda animación y transición CSS a 0.01 ms y oculta el pulso y el shimmer; los contadores saltan al valor final.

---

## 4. Principios

1. **Confianza antes que conversión.** Precio y cuota a la vista, garantía, gestoría y revisión mecánica dichas con claridad, antes de pedir un contacto.
2. **Móvil no es desktop comprimido.** Se diseñó a 375 px: sheet inferior, FAB, controles de 44 px, un solo enlace por card. Desktop agrega pills, popovers y hover.
3. **El precio pesa como la foto.** Monoespaciado, tamaño de título, cuota debajo. Los números alineados comunican precisión.
4. **El acento es bisturí.** Bronce en pocas líneas y estados; el CTA principal es tinta. Si todo destaca, nada destaca.
5. **Sin movimiento gratuito.** Cada animación tiene razón funcional y se apaga con `prefers-reduced-motion`.

---

## 5. Grid y layout

| Breakpoint | Ancho | Columnas del grid | Notas |
|---|---|---|---|
| base | < 640 | 1 | Gutter 16. Filtros en sheet inferior. Vista: cuadrícula / lista |
| `sm` | ≥ 640 | 2 | Gutter 24 |
| `md` | ≥ 768 | 2 | Nav del header visible; FAB oculto; sheet como panel derecho |
| `lg` | ≥ 1024 | 3 (vista "3") o 2 (vista "2") | Gutter 32. Pills de filtro y popovers. Selector de 3 vistas |
| `xl` | ≥ 1280 | igual | |

- Contenedor máximo **1360 px**, centrado. Gap entre cards 20 px (base) / 24 px (lg); lista 12–16 px.
- Variables: `--header-h` 60 / 76 px (52 / 60 compacto); `scroll-padding-top` descuenta header y barra de filtros.
- Capas: header 40 · barra de filtros 30 · banner 40 · FAB 50 · popovers 55 · sheets 60–61.
- Hero: búsqueda protagonista, sin carrusel, ≤ 40 vh.
- Interstitial de confianza: `col-span-full` tras la card 12. Primer resultado destacado: `sm:col-span-2`.

## 6. Home `/`

Estructura "El local como lugar": la home es un lugar al que se puede ir hoy, no un segundo catálogo. Prioridades: visitar, vender, financiar. Sin fotos del local, reseñas ni cifras (el cliente confirmó que no existen todavía): nada se inventa y los huecos quedan abiertos.

| Sección | Archivo | Qué prueba |
|---|---|---|
| Hero "Pasá a verlos." | `home/home-hero.tsx` | Estado en vivo (abierto/cerrado, hora de Montevideo), dirección, Cómo llegar, WhatsApp |
| Esquema de la esquina | `home/street-map.tsx` | Diagrama dibujado a mano (Constituyente × Emilio Frugoni, N.º 1880), rotulado "sin escala". Las líneas se trazan una vez y el pin cae |
| Horarios | `home/open-status.tsx` | Tres grupos reales; el de hoy lleva regla bronce y "Hoy" |
| En el salón ahora | `home/stock-strip.tsx` | Tres destacados con la misma `VehicleCard` y camino al catálogo |
| Elegí la cuota | `home/finance-section.tsx` | Inverso de la cuota de la card: cuota mensual → precio máximo → N autos que entran. Comparte anticipo y plazo con todo el sitio |
| ¿Querés vender tu auto? | `home/sell-section.tsx` | Formulario sin backend que arma el mensaje de WhatsApp. No guarda datos |
| Todo en la misma puerta | `home/services.tsx` | Lista con reglas (no tarjetas): revisión y garantía, gestoría propia, Seguros Ezzatti |

- Movimiento autorizado en la home: el trazado del esquema (900 ms) y la caída del pin (520 ms, resorte, 700 ms de demora). El resto es estático salvo el contador de cuota.
- Horario: `lib/hours.ts` calcula el estado en `America/Montevideo` sin importar la zona del visitante. El HTML del servidor muestra "Horario de atención" y el estado vivo llega tras montar, sin desajuste de hidratación.
- Ritmo de fondos: tinta (hero) → paper (salón) → paper-2 (financiación) → paper (vender) → paper-2 (servicios) → tinta (footer).
- Navegación: el logo vuelve a `/`; "Vender mi auto" apunta a `/#vender`; el catálogo pasó a "Vehículos".

## 7. URL como estado

`/vehiculos?q=&tipo=suv,pickup&marca=Toyota&comb=electrico&trans=automatica&estado=0km&pmin=&pmax=&amin=&amax=&kmin=&kmax=&guardados=1&orden=precio-asc&vista=lista`. Los valores por defecto no aparecen. La página se renderiza por request para que el HTML ya traiga las cards filtradas.

## 8. Datos y supuestos

- Contacto, dirección y horarios: leídos de juncalautomoviles.com. Redes: handles supuestos, confirmar.
- Inventario de demostración; precios plausibles del mercado. Modelos chinos (MCROWN, BAW, JMC) a validar con el cliente.
- Fotos: Wikimedia Commons, emparejadas por modelo; créditos en `public/cars/CREDITS.md`. Reemplazar por fotografía propia.
- Logo: wordmark provisorio (`LogoMark`).
- Tasa de financiación 9,5 % TEA en USD: referencial, sujeta a aprobación bancaria. "+200 clientes" proviene del texto del pedido: confirmar la cifra real.

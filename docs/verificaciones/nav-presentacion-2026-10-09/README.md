# Navegación con presentación y estado compacto

Implementación autorizada después de confirmar el comportamiento: logo completo y grande al inicio; símbolo CR y navegación fija al bajar; recuperación del logo completo al volver al inicio; CR y botón Menú en la barra compacta móvil.

## Ajuste posterior del tamaño inicial

Por corrección del usuario, se reduce únicamente el ancho del logo completo a `clamp(8rem, 12vw, 11rem)`, limitado al espacio disponible. Equivale a 128–176 px con fuente base de 16 px. El CR compacto conserva 56 px y la barra compacta 81 px; la lógica de scroll no cambia. Los resultados de la primera implementación descritos más abajo son históricos.

Verificado en 320, 390, 1024 y 1440 px: sin desborde. Logo inicial de 128 px en los tres primeros anchos y 172,8 px en 1440 px; altura inicial de barra de 121,52/155,30 px, con reserva redondeada correcta de 122/156 px. Al bajar conserva CR de 56 px y barra de 81 px, con reserva estable de 156 px en escritorio. Modern Web Guidance `responsive-design` consultada antes del ajuste. Resultados en `ajuste-tamano.json`; captura en `/tmp/cecilia-nav-presentation/expanded-smaller.jpg`.

## Aislamiento

El estilo del componente está en `styles/navigation-presentation.css`, limitado a la navegación y sus offsets de desplazamiento. El comportamiento permanece en `scripts/components/navigation.js`. El HTML agrega el logo completo y el símbolo como dos representaciones decorativas dentro del mismo enlace con nombre accesible; utiliza el mismo PNG original, recortado por CSS, sin alterar sus bytes.

El componente se carga como script autónomo diferido, dentro de una función cerrada, para poder inicializarse sin depender de los módulos del resto de la página. `scripts/main.js` deja de importar/inicializar la navegación. Los parámetros de versión de sus cargadores evitan reutilizar la representación anterior de ese archivo como módulo desde la caché. No se agrega biblioteca o dependencia.

## Comportamiento y accesibilidad

- Un marcador estable a 80 px del inicio y un IntersectionObserver alternan las dos presentaciones. No se añade un controlador continuo de scroll ni una animación de altura en cada cuadro.
- La página reserva siempre la altura expandida. La altura visible se mide por separado para el desplazamiento a secciones y el foco. ResizeObserver mantiene las medidas al cambiar el ancho, fuentes o menú. La contracción no cambia la posición ni la altura de la portada.
- Los enlaces siguen siendo anclas nativas; el menú conserva Escape, estado `aria-expanded` y foco al título de destino. El enlace de marca vuelve al inicio real de la página.
- El enlace de marca conserva un único nombre accesible. Cambiar su representación no sustituye el elemento enfocado ni duplica la lectura del logo.
- Movimiento reducido elimina la transición de opacidad y selecciona desplazamiento instantáneo. Sin scripts, la navegación completa permanece en el flujo, con enlaces visibles, evitando que una barra expandida sin medición tape los destinos.

## Comprobaciones

Navegador integrado local por HTTP en 320, 390, 768, 800, 801, 1024 y 1440 px: sin desborde horizontal en la barra compacta. Se conservan siete enlaces en escritorio y el botón Menú en móvil. Revisados visualmente los estados expandido/compacto en escritorio y móvil.

A 1280 × 900 px: barra expandida 237,34 px y compacta 81 px; espacio reservado 238 px en ambos estados. La portada mantiene su posición documental (238 px) y su altura (662 px) antes y después de contraerse.

Enlace Servicios activado con Enter: foco en «Mis Servicios», a 165 px de la parte superior, con barra de 81 px. Menú móvil abierto: altura visible y offset de 205 px, reserva de 158 px; Escape lo cierra y devuelve el foco al botón. Regreso al inicio comprobado: scroll 0 y logo completo; en móvil, altura expandida 157,72 px y reserva de 158 px.

Comprobaciones de sintaxis del componente mediante Node y de espacios mediante `git diff --check`. Evidencia medida en `resultados.json`. Capturas en `/tmp/cecilia-nav-presentation/`.

## Referencias y límites

Se leyó el skill local Modern Web Guidance. Búsqueda y recuperación en caché de `shrinking-header-on-scroll`: reserva del espacio inicial, medición de altura, movimiento reducido y alternativa nativa sin polyfill. La implementación usa dos estados con IntersectionObserver y una transición de opacidad, en lugar de interpolación continua de altura ligada al scroll. Se consultaron fragmentos de las páginas físicas 47–48 y 77–78 de `Vanilla_Web_v6.pdf`, sobre estabilidad, accesibilidad y mejora progresiva; no se leyó el libro completo ni se distribuyó el PDF.

La política del navegador de pruebas bloquea URLs `file://`; no se verificó visualmente esa modalidad ni se intentó eludir el bloqueo. No se emularon movimiento reducido o JavaScript desactivado: esas alternativas se revisaron en el código. No se ejecutaron pruebas en Safari/Firefox, con lectores de pantalla o con usuarios reales, ni una auditoría completa del resto del sitio. No se publicó la web ni se enviaron consultas.

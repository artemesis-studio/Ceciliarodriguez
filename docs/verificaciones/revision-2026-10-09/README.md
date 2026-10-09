# Revisión de buenas prácticas del 9 de octubre de 2026

La base de la web funciona correctamente en las comprobaciones realizadas. Quedan dos ajustes concretos de accesibilidad y la optimización de imágenes ya aplazada. No corresponde afirmar que todo está resuelto ni certificar cumplimiento completo de WCAG.

Actualización posterior: los dos ajustes de contraste se corrigieron en el pedido siguiente. Ver `../alineaciones-2026-10-09/README.md` y sus resultados. Este documento conserva los hallazgos históricos de la revisión anterior a esa corrección.

El pedido fue revisar la implementación. El documento `Correcciones - web 8_10_26.docx` se trató como referencia para contrastar el resultado, sin convertir sus propuestas pendientes en nuevas instrucciones de implementación. Esta revisión no modifica HTML, CSS, JavaScript, fotografías o fuentes; agrega este registro y los resultados.

## Hallazgos que requieren ajustes

### 1. Bordes del formulario con contraste insuficiente

Prioridad media. En `styles/redesign.css:736`, los campos usan un borde `#0f336359`, calculado por Chrome como `rgba(15, 51, 99, 0.35)`, sobre blanco por ambos lados. Su contraste efectivo es **2,02:1**. La delimitación del campo es muy tenue, particularmente para personas con baja visión. El criterio WCAG 1.4.11 establece **3:1** para información visual necesaria para identificar controles.

Recomendación: aumentar la opacidad del azul del borde. Como ejemplo comprobado, azul con opacidad 0,55 da **3,32:1** sobre blanco. Mantener los estados actuales de foco y error, que sí se distinguen. No se necesita cambiar textos, clases o estructura.

Fuente: [W3C — contraste de controles y delimitación de campos](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### 2. Foco de teclado del footer con contraste insuficiente

Prioridad media. La regla global de `styles/main.css:44` dibuja el foco en rosa `#BC4265`; en el footer, con fondo `#0F3363` (`styles/main.css:715`), el contraste es **2,45:1**, inferior a 3:1. Se reprodujo al enfocar «Servicios» y se inspeccionó la captura. La misma combinación se aplica a los demás enlaces del footer.

Recomendación: añadir una regla específica de foco para enlaces del footer que utilice blanco humo o rosa claro de la paleta, conservando el grosor y la separación del contorno. El foco de navegación y formulario sobre superficies claras no presenta este problema.

Fuente: [W3C — contraste del indicador de foco](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#relationship-with-focus-visible).

## Rendimiento pendiente por decisión previa

Las 36 imágenes enlazadas suman **14.986.223 bytes**, aproximadamente **15 MB**. Es el total de archivos de imagen usados por la página, no la descarga inicial: la carga diferida y los grupos ocultos del carrusel evitan solicitar todos al entrar.

Cuatro fotos de galería pesan individualmente entre 2,0 y 2,7 MB y tienen resoluciones grandes respecto a los marcos en móvil. No hay variantes `srcset`/`sizes` ni formatos WebP/AVIF. El siguiente trabajo de rendimiento sería generar copias optimizadas y adaptables, preservando originales. **No se realizó**, porque la instrucción vigente mantiene esta etapa pendiente. La portada conserva `fetchpriority="high"` y no tiene carga diferida.

No se midieron LCP, INP o CLS con red móvil ni en producción. El tamaño de archivos identifica una oportunidad concreta, pero no permite atribuir tiempos de carga ni una puntuación de rendimiento.

## Comprobaciones realizadas

- Chrome 154.0.8037.98 local en 320, 390, 600, 700, 768, 800, 801, 1024, 1440 y 1894 px: sin desborde horizontal; navegación reserva su altura real; párrafos de servicios de 16 px.
- Texto al 200 % en 720 px y ampliación del espaciado de lectura: sin desborde horizontal.
- Recorrido de 70 pulsaciones Tab en móvil: sin elementos interactivos enfocados tapados por la navegación. Menú abre, cierra con Escape, devuelve foco al botón y enfoca «Mis Servicios» al activar el enlace con Enter. Atrás restaura la ubicación de la sección.
- Formulario: nombre/motivo de solo espacios y email inválido bloquean el borrador; mensajes vinculados mediante ARIA. Los cuatro servicios preseleccionan correctamente el mensaje. Con datos ficticios y acentos se prepara el enlace, se enfoca «Revisar en WhatsApp» y editar invalida el borrador. No se abrió WhatsApp ni se envió información.
- Carrusel: veinte fotos repartidas 7/7/6; controles funcionan; todas las fotos decodificadas. Las tres páginas conservan la misma altura a 390 px. Rotación automática comprobada con espera real; el foco la detiene y no se reanuda solo. Con reducción de movimiento comienza pausado y sin animación.
- Sin JavaScript a 390 px: veinte fotos visibles, navegación sticky y alternativa directa de WhatsApp; botón de preparación desactivado.
- Un h1, idioma `es-AR`, sin IDs duplicados, anclas inexistentes o imágenes sin atributo alt. Campos con etiquetas, autocomplete de nombre/email y restricciones nativas. Fuentes locales cargadas. Sin errores de página, respuestas fallidas de recursos o solicitudes remotas durante la carga de la web local.
- axe-core 4.10.3, reglas WCAG A/AA hasta 2.2 y buenas prácticas, a 390 y 1440 px: cero infracciones automáticas. Los resultados incompletos de contraste y enlaces se revisaron por separado. El análisis automático no evalúa suficientemente los dos hallazgos manuales descritos arriba.
- Contraste de texto blanco/rosa: 5,12:1; placeholder gris/blanco: 4,61:1. Las flechas de galería tienen texto azul sobre blanco y nombre accesible; los enlaces independientes del footer se distinguen por su ubicación y texto. No se clasificaron estos resultados incompletos de axe como fallos confirmados.
- Inspeccionadas capturas completas de móvil/escritorio y capturas de portada, servicios, testimonios/logos, recursos, contacto y foco del footer. Los recortes de secciones pueden incluir superposiciones de la navegación fija propias de la captura; la cobertura del foco se comprobó por separado en pantalla.

## Contraste con las correcciones y contenido pendiente

Se comprobaron los cuatro servicios con Conferencias primero, los cuatro textos de CTA, logo y fotografía de escenario en portada, seis testimonios e Indira identificada como curso grupal, doce logos grises y los tres enlaces de Oratoria Pocket. Los doce párrafos de Sobre mí coinciden con el documento al normalizar espacios. Los enlaces de las clases abren las páginas de producto con títulos coincidentes; el enlace general respondió HTTP 200.

Siguen pendientes el email de contacto, los PDF/audios para descargas y el proveedor o formulario real de newsletter. La web muestra el email pendiente y ofrece consultar por recursos gratuitos. No hay descargas ni suscripción implementadas. La fotografía futura de la conferencia aún no fue aportada.

## Referencias y límites

Se aplicó el skill local Modern Web Guidance: búsqueda y recuperación de `forms`, `optimize-image-priority` y `performance`. Se revisaron nuevamente las páginas físicas 47–48 y 77–78 de `Vanilla_Web_v6.pdf`, sobre rendimiento, accesibilidad, HTML semántico, mejora progresiva y formularios. Es una revisión parcial del PDF, no una lectura completa. El original no fue modificado ni distribuido.

También se consultaron [el patrón W3C de carruseles](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) y [el criterio de contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). La pausa por foco, controles nativos y reducción de movimiento se preservan; no se requieren bibliotecas adicionales para esta web.

La verificación corresponde a Chrome local. No se ejecutaron pruebas en Safari/Firefox, con lector de pantalla o visitantes reales, ni se comprobó HTTPS, compresión o caché de un hosting publicado. No se publicó la web.

Resultados detallados: `resultados.json`. Capturas de QA en `/tmp/cecilia-audit/`.

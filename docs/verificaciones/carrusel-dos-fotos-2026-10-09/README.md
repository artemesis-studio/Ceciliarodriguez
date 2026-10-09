# Carrusel de dos fotos y footer del 9 de octubre de 2026

Se eliminó el bloque Links rápidos completo del footer y se adaptó su retícula a dos columnas en escritorio y una en móvil. Instagram, marca, contacto y copyright conservan sus enlaces y los ajustes de contraste previos.

La galería conserva las veinte fotografías, agrupadas en diez vistas de dos fotos. Desde 801 px las dos fotos aparecen juntas; hasta 800 px aparecen apiladas, con un máximo de dos fotos en vertical. Se retiró la composición anterior de siete fotografías por vista. El carrusel mantiene controles de avance, retroceso y reproducción/pausa, así como pausa persistente por foco y preferencias de movimiento.

Los grupos ahora están en el HTML. Sin JavaScript o abriendo `index.html` directamente, el carrusel funciona como un desplazamiento horizontal nativo con scroll snap, en lugar de desplegar las veinte fotos verticalmente. Es recorrible deslizando, con barra de desplazamiento o con teclado al enfocar la galería. La indicación «Deslizá hacia los lados para ver más fotos» se muestra en esta alternativa. Los controles automáticos solo aparecen cuando JavaScript está disponible.

## Comprobaciones

Chrome local, nueve anchos de 320 a 1894 px: exactamente dos fotografías mostradas por vista y ningún desborde horizontal de la página. Las diez vistas se recorrieron y las veinte imágenes se decodificaron. Altura estable en las diez vistas a 390 px; avance vuelve de 10 a 1 y retroceso de 1 a 10. Los botones mantienen el foco. Reproducción automática comprobada con espera real y detención persistente al entrar foco. Reducción de movimiento: comienzo pausado y sin animación.

Texto al 200 % a 720 px sin desborde; menú con Escape correcto. Sin JavaScript a 390 px, ArrowRight desplaza a la siguiente vista y conserva dos fotos visibles. Apertura directa mediante `file://` comprobada: dos fotos visibles, scroll horizontal a la segunda vista y primeras dos imágenes decodificadas. Chrome no ejecuta los módulos del sitio bajo `file://`; el carrusel nativo evita que esto muestre todas las fotos en vertical.

Bloque `.footer-links` ausente y encabezado Links rápidos eliminado. Sin errores de página ni recursos fallidos en HTTP. axe-core a 390 y 1440 px sin infracciones automáticas; esto no certifica conformidad completa de accesibilidad. Fotos y fuentes conservan los hashes registrados en la etapa anterior.

Capturas de galería y footer en móvil/escritorio y galería como archivo local inspeccionadas en `/tmp/cecilia-carousel-2/`. Resultados en `resultados.json`. Verificación en Chrome local, sin pruebas Safari/Firefox o de rendimiento real; no se publicó la web.

## Referencias

Se consultó Modern Web Guidance mediante búsqueda y recuperación de `carousel-slide-effects`. Se aplicaron scroll snap y mejora progresiva; no se agregaron animaciones ligadas al scroll, polyfills o dependencias. Se mantiene el patrón accesible de carrusel W3C consultado en la revisión anterior. Como referencia técnica se mantienen las páginas físicas 48 y 78 de `Vanilla_Web_v6.pdf`, revisadas en esta sesión para semántica, accesibilidad y mejora progresiva; no se leyó el libro completo.

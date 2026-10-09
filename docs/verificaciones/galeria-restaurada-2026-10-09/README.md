# Restauración de la galería anterior

Se recuperó la composición anterior de la conversación: veinte fotos en tres grupos de 7, 7 y 6, con flechas de avance/retroceso, indicador y control de reproducción arriba. Reemplaza el carrusel de dos fotos por vista solicitado en la etapa anterior.

El repositorio solo contiene el commit `e1de40b` («Primer commit»), cuya galería tenía siete espacios vacíos, sin fotos o controles. Por eso se recuperó la implementación anterior de la conversación, no se afirma haber restaurado una versión con fotos desde Git.

La galería se inicia mediante un script externo diferido y aislado, independiente de las importaciones del módulo principal. Esto permite usar sus botones también al abrir `index.html` con `file://`, donde Chrome bloquea las importaciones ES de la página. Se retiró únicamente la importación y llamada anteriores de galería del módulo principal para no inicializarla dos veces. No se cambia el funcionamiento de los otros componentes.

Se mantiene la alternativa nativa de desplazamiento horizontal cuando JavaScript está completamente desactivado, sin desplegar todos los grupos en vertical. Continúan la pausa por foco, pausa con el puntero encima, suspensión fuera de pantalla y reproducción desactivada inicialmente con reducción de movimiento.

Chrome local a 320, 390, 600, 768, 800, 801, 1024, 1440 y 1894 px: sin desborde de página; grupos 7/7/6 y controles arriba comprobados. Las veinte fotos se decodificaron al recorrer los tres grupos. Avance vuelve de 3 a 1 y retroceso de 1 a 3; foco conservado en el botón. Rotación y pausa por foco comprobadas con espera real. Texto al 200 % en 720 px sin desborde.

En apertura directa del HTML las flechas avanzan de 1/3 a 2/3 y retroceden a 1/3. Sin JavaScript, ArrowRight desplaza el carrusel nativo. Cero errores JavaScript en HTTP. HTML de las demás secciones conserva sus bytes; fotos y fuentes conservan sus hashes. Capturas de móvil/escritorio y apertura directa inspeccionadas en `/tmp/cecilia-restore-gallery/`. Resultados en `resultados.json`.

Consultada Modern Web Guidance mediante búsqueda y recuperación de `html`, y las guías de carrusel/retículas ya revisadas en esta sesión. Referencia técnica: páginas físicas 48 y 78 del PDF local revisadas en la sesión para semántica y mejora progresiva; no se leyó el libro completo. No se publicó la web; las comprobaciones son de Chrome local y no equivalen a pruebas en otros navegadores o rendimiento real.

# Ajustes de alineación y contraste del 9 de octubre de 2026

Se corrigieron los dos contrastes de la revisión previa y se aplicaron las alineaciones solicitadas. Cambios de HTML y CSS; sin modificar JavaScript, fotografías o fuentes.

- Campos: borde azul con opacidad 0,55; contraste calculado **3,32:1** sobre blanco. Hover, foco rosa y error conservados.
- Footer: foco de enlaces en blanco humo; contraste **11,51:1** sobre el azul de fondo. Links rápidos ocupa el centro de la retícula simétrica en escritorio; copyright centrado. En móvil se apilan los bloques. Marca e Instagram centrados en su bloque.
- Instagram: ambos enlaces centrados con ícono SVG blanco de cámara y texto visible, sin flecha. En contacto el fondo azul asegura contraste al ícono blanco. SVG decorativo, enlace con nombre textual accesible; aviso de nueva pestaña conservado para lectores de pantalla donde corresponde. Destinos y comportamiento de los enlaces conservados.
- Oratoria Pocket: logo, encabezado y descripción centrados; enlace general centrado y sin flecha visible. La nota para lectores de pantalla sobre nueva pestaña se conserva. Las tres tarjetas de clase conservan sus enlaces y contenido.
- Recursos gratis: tarjeta limitada a 48 rem (768 px con tamaño base), centrada, con contenido y botón centrados. En pantallas pequeñas ocupa el ancho disponible sin desbordar.
- Organizaciones: título centrado; logos y fotografías conservados.

## Comprobación

Chrome 154 local a 320, 390, 600, 768, 800, 801, 1024, 1440 y 1894 px: sin desborde horizontal. Se midió el centro de Links rápidos, Recursos gratis, logo de Pocket y enlace general: coincide con el centro de la ventana (diferencia por redondeo inferior a 0,02 px). Instagram está centrado dentro de su bloque y ambos íconos calculan color blanco. Navegación reserva su altura real.

Texto al 200 % a 720 px sin desborde. Menú con Escape correcto. Formulario rechaza espacios y email inválido, prepara borrador con datos ficticios y acentos y lo invalida al editar; foco y bordes de error conservados. No se abrió WhatsApp ni se envió información.

Sin JavaScript a 390 px: veinte fotos, dos íconos Instagram, sin desborde y preparación de consulta desactivada. Cero errores de JavaScript o recursos fallidos. axe-core a 390/1440 px no reportó infracciones automáticas; los contrastes corregidos se midieron manualmente. JavaScript conserva los hashes de la revisión anterior.

Capturas de recursos, footer y contacto en 390 y 1440 px y foco del footer inspeccionadas en `/tmp/cecilia-alineaciones/`. Resultados en `resultados.json`. Verificación en Chrome local; no implica comprobación en Safari/Firefox o de rendimiento real.

## Referencias

Se consultó Modern Web Guidance mediante búsqueda y recuperación de `css-layout`: alineación con Flexbox/Grid, pistas flexibles, ancho intrínseco y adaptación sin ocultar desbordes. Se revisaron nuevamente las páginas físicas 48 y 78 de `Vanilla_Web_v6.pdf`, sobre semántica y accesibilidad; no se leyó el libro completo. Los contrastes se contrastaron con la referencia W3C de la revisión previa, [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Optimización de imágenes, email, archivos de descargas y proveedor de newsletter siguen pendientes. No se publicó la web.

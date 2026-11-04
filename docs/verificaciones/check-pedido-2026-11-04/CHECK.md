# Comprobación del pedido

- [x] Foto principal: PORTADA DE HEADER aportada, centrada, completa y cuadrada.
- [x] Testimonios: Ana, Silvana, Soraya, Mario, Lara e Indira; únicamente nombre y formación, sin apellidos ni empresa en la identificación.
- [x] Galería: selección corregida a GALERIA 1, 2, 8 y 14; exposición en escenario, capacitación presencial, sesión online y escenario frente al público. Retirados del HTML los retratos, grupos posando, radio y salas vacías. Originales conservados. Dos grupos manuales de dos fotos, completos y sin recortar rostros.
- [x] Pocket: tres cards con su portada correspondiente, título y enlace conservado.
- [x] Banner: debajo de Servicios y antes de Beneficios. Arte completo; transcripción legible en móvil y accesible en escritorio.
- [x] Movimiento: título en dos pasos (60/240 ms de demora, 620 ms de duración), tarjetas al entrar en pantalla (560 ms, subida de 14 px, opacidad 0,35→1, secuencia de 60/120 ms). Hover de tarjeta -4 px y botón -2 px; curva de desaceleración suave, sin rebotes, animaciones repetitivas ni listeners de scroll. Movimiento reducido cancela entradas y desplazamientos y admite cambios de preferencia en vivo.
- [x] Título de galería: Escenarios y experiencias.
- [x] Beneficios: fondo azul #0F3363, tarjetas claras y separación de Sobre mí.
- [x] Mi enfoque: presencia, técnica y humanidad con los tres íconos aportados.

Chrome local en ocho anchos 320–1894 px: sin desborde ni imágenes nuevas fallidas. Cero errores de página. Carrusel adelante/atrás, texto al 200 %, alternativa sin JavaScript y movimiento reducido comprobados. Hover y nombres/duraciones de animaciones medidos en navegador. Cuatro pruebas existentes de construcción, sintaxis del módulo, anidación HTML y diff sin errores. Dist regenerado. Sin publicación ni pruebas Safari/Firefox o lector de pantalla.

Evidencia: resultados.json y capturas de inicio, beneficios, Pocket y galería. Este informe reemplaza la selección provisional de 16 fotos de la comprobación anterior.

Referencias consultadas: Modern Web Guidance motion e individual-transform-properties; Apple HIG Motion (https://developer.apple.com/design/human-interface-guidelines/motion) y Material motion (https://m3.material.io/styles/motion). Adaptación estética discreta; no se afirma una réplica exacta de Apple o Google.

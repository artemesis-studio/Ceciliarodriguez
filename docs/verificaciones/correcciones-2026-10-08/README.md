# Correcciones del 8 de octubre de 2026

Implementación basada en `Correcciones - web 8_10_26.docx` aportado por el usuario, las carpetas de fotos, logos y capturas locales.

## Cambios aplicados

- Portada: oferta con Conferencias en primer lugar, título y frase conservados, foto de escenario existente `Images/header-iamgen.jpg` y logo azul CR aportado. Fondo azul claro, sin degradado rosa.
- Servicios: Conferencias primero, cuatro propuestas en dos columnas desde 701 px y una columna hasta 700 px. Texto de conferencias transcrito del documento y cuatro CTA específicos que preseleccionan la consulta en el mensaje del formulario.
- Sobre mí: doce párrafos transcritos del documento, con Conferencista en la primera oración. Párrafos a la izquierda y sin justificación. Se conserva la cita previa.
- Lectura y diseño: azul, blanco y superficies azul claro; rosa como acento de botones. Montserrat para textos y mayoría de títulos; Dancing Script en la portada, testimonios, galería y el título de contacto. Textos de lectura alineados a la izquierda.
- Testimonios: Ana, Silvana, Soraya Jaramillo y Mario Moya transcritos de las tres capturas de `+testitimonios`, con ajustes de puntuación para lectura. Mario comienza en «Quiero agradecerte…». Se conservan Lara e Indira del contenido previo; Indira figura como Curso grupal, según la corrección explícita. Se elimina la antigua tarjeta de Jorge, cuyo nuevo recorte no contiene el testimonio completo.
- Organizaciones: doce logos en galería debajo de testimonios; sin ul ni li. Gris suave mediante CSS. El archivo 11 repite el logo de Clínica Dra. Urcera del archivo 06 y se muestra una sola vez.
- Galería: veinte fotos originales distribuidas en tres grupos (7, 7 y 6), con cambio automático cada 6,5 segundos al entrar en pantalla, flechas y pausa. El foco pausa hasta una reactivación explícita; hover y pestaña oculta suspenden la rotación. Reducción de movimiento comienza con la reproducción desactivada. Sin JavaScript, las veinte fotos permanecen visibles en una retícula estática.
- Recursos: sección Recursos gratis con consulta al formulario y Oratoria Pocket con logo y enlaces a las tres clases y la página general. Las clases grabadas se presentan con acceso a Hotmart y opciones de compra.

## Descargas y newsletter

No se aportaron PDF/audios gratuitos ni un proveedor o enlace de newsletter. Se consultó al usuario durante el trabajo. La página permite pedir información de recursos gratuitos, sin enlaces de descarga inexistentes ni confirmaciones de suscripción simuladas.

Para activar descargas, guardar los archivos reales en `assets/resources/` y añadir entradas en `freeResources` dentro de `scripts/resources.js`:

```js
{ title: "Título del recurso", href: "assets/resources/archivo.pdf", format: "PDF" }
```

Para audios usar el formato real, por ejemplo `MP3`. Los enlaces se muestran automáticamente cuando existen entradas. Antes de publicarlos, verificar que cada archivo se descarga correctamente.

El newsletter necesita un formulario alojado o una integración con la plataforma de correo elegida, con suscripción real y confirmación proporcionada por el servicio. Integrar el enlace o formulario una vez suministrado; no es necesario cambiar el formulario de WhatsApp existente.

La foto de portada podrá reemplazarse por la nueva fotografía de la conferencia cuando se aporte. Se mantuvieron los archivos originales y no se generaron variantes ni se alteraron sus bytes.

## Referencias consultadas

- Vanilla Web v6: páginas físicas 47–48 (accesibilidad, apartado 2.3.2) y 77–78 (HTML semántico, mejora progresiva, landmarks y formularios, apartado 3.5). Revisión parcial; no se leyó el libro completo ni se distribuyó el PDF.
- Modern Web Guidance: búsqueda de carrusel accesible y consulta de `carousel-slide-effects`, `motion` y `optimize-image-priority`. Se usan botones nativos, módulos, transición de opacidad y preferencias de movimiento; no se necesitan animaciones ligadas al scroll ni sus polyfills.
- Patrón W3C para carruseles: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ . Rotación controlable, foco que pausa y cambios manuales sin trasladar el foco.
- Tres páginas de clases de Hotmart abiertas y títulos comprobados; enlaces sin parámetros de seguimiento. La página general se conserva a partir del enlace suministrado y responde HTTP 200, comprobado con curl.

## Comprobaciones

Resultados en `resultados.json`. Chrome local en 320, 390, 600, 700, 768, 800, 801, 1024, 1440 y 1894 px: sin desborde horizontal. Texto al 200 % a 720 px: sin desborde. Servicios, fotos, logos y testimonios contados; todos los párrafos comprobados a la izquierda. Cero errores JavaScript, imágenes rotas o recursos locales fallidos. Sin IDs duplicados, anclas inexistentes ni archivos locales ausentes.

Reproducción automática comprobada con espera real; pausa persistente por foco, botones de avance/retroceso y pausa/reactivación con ratón. Imágenes de los tres grupos decodificadas. Inicio pausado con reducción de movimiento. Sin JavaScript: veinte fotos visibles y formulario con alternativa de WhatsApp existente.

Menú móvil abre y cierra con Escape. Los cuatro servicios preparan su texto correcto. Validación de campos vacíos o de espacios, borrador válido e invalidación al editar comprobadas con datos ficticios. No se abrió ni envió un mensaje de WhatsApp.

Capturas de portada, servicios, Sobre mí, testimonios/logos, recursos y galería en escritorio y móvil revisadas en `/tmp/cecilia-correcciones`. Estas pruebas corresponden a Chrome local; no se ejecutaron en Safari/Firefox ni miden rendimiento con usuarios reales.

Revisión visual final: composición de los tres grupos de galería ajustada para conservar los rostros en los retratos; todas las fotos decodificadas. Portada a 320 px y Sobre mí revisados nuevamente. `http://localhost:8000/` responde HTTP 200.

# Cecilia Rodríguez — instrucciones técnicas

## Recordatorio pendiente — Newsletter con MailerLite

Por instrucción explícita del usuario, desarrollar el bloque visual del newsletter pero **dejar la conexión a MailerLite para más adelante**: aún no hay confirmación de la cliente. Por pedido posterior, el bloque está debajo de `.contact-grid`, dentro de Contacto y antes del footer, en `#newsletter`. Email y botón están desactivados y no recibe, guarda ni envía emails. El usuario pidió retirar «Próximamente» y el atributo de estado pendiente del HTML; esto no autoriza conectar MailerLite. El bloque muestra un aviso neutral de suscripción no habilitada. **El popup fue eliminado por pedido explícito posterior**: no conservar ni reactivar avisos flotantes, condiciones de tiempo o scroll. No habilitar el formulario ni agregar scripts de MailerLite hasta que el usuario confirme la integración.

Cuando llegue la confirmación:

- Confirmar cuenta MailerLite, grupo/lista, correo remitente y formulario real. No inventar IDs, URLs de envío o credenciales; no poner claves privadas en el HTML o JavaScript público.
- Confirmar con la cliente contenido, frecuencia (mensual fue una propuesta, aún no una promesa aprobada), texto de consentimiento/privacidad y primera entrega. No asociar automáticamente las consultas de WhatsApp a la lista.
- Configurar el formulario integrado de MailerLite y confirmación por email (double opt-in). Conectar la UI del bloque o reemplazarla por el formulario oficial manteniendo diseño y accesibilidad; definir el destino de envío real antes de habilitar los controles. El popup y su script fueron retirados y no deben recrearse sin nuevo pedido.
- Retirar el aviso de formulario inactivo y los atributos `disabled` solo cuando la conexión esté lista. Probar confirmación, errores, suscripción y baja reales con una dirección de prueba autorizada antes de publicarlo.

Referencias: https://www.mailerlite.com/help/how-to-create-an-embedded-form y https://www.mailerlite.com/help/how-to-use-double-opt-in-when-collecting-subscribers . Este recordatorio no crea una automatización ni autoriza envíos o una publicación.

Comprobación del bloque pendiente: Modern Web Guidance `autofill-sign-up-form` consultada y página física 78 del PDF local releída (semántica, etiquetas y formularios; revisión parcial). Chrome local a 320, 390, 600, 768, 801, 1024 y 1440 px y texto al 200 % sin desborde. Bloque centrado, al final de Recursos y antes de Contacto, con etiqueta vinculada al email, IDs únicos, controles realmente desactivados y cero eventos de envío al intentar activar el botón. Sin solicitudes remotas o errores de JavaScript; contacto de WhatsApp permanece habilitado. Sin JavaScript el newsletter sigue desactivado. axe-core del bloque a 390/1440 px sin infracciones automáticas; capturas móvil/escritorio inspeccionadas. Evidencia en `docs/verificaciones/newsletter-pendiente-2026-10-09/resultados.json`. No se conectó MailerLite, creó cuenta/lista, envió correo ni publicó la web.

## Referencias y enfoque

Por instrucción del usuario del 6 de octubre de 2026, usar `Vanilla_Web_v6.pdf`, disponible en la raíz del proyecto, como referencia técnica. Corresponde a *Vanilla Web: Building apps without frameworks*, Maximiliano Firtman, Manning, MEAP versión 6 (2026).

- Priorizar HTML semántico, CSS moderno, JavaScript modular y APIs nativas del navegador.
- Elegir arquitectura y herramientas según los requisitos; incorporar dependencias solamente cuando resuelvan una necesidad concreta.
- Cuidar accesibilidad, usabilidad, rendimiento, simplicidad y mantenimiento.
- Consultar las páginas o capítulos relevantes antes de implementar y registrar qué se revisó. No presentar una revisión parcial como lectura completa.
- El PDF es una referencia local con licencia: conservar el original y no publicarlo ni copiarlo en los recursos públicos del sitio.
- Las instrucciones explícitas del usuario tienen prioridad. Contrastar las APIs y compatibilidad actuales con documentación oficial.

## Modern Web Guidance

Fuente oficial: https://developer.chrome.com/docs/modern-web-guidance

Instalación ejecutada correctamente desde esta carpeta:

```sh
npx -y modern-web-guidance@latest install
```

Skill local: `.agents/skills/modern-web-guidance/SKILL.md`. Leer y aplicar sus instrucciones antes de implementar o modificar HTML, CSS o JavaScript del cliente.

Flujo de consulta:

```sh
npx -y modern-web-guidance@latest search "<objetivo de implementación>" --skill-version 2026_09_04-7de96777
npx -y modern-web-guidance@latest retrieve "<id>"
```

Buscar primero, recuperar las guías pertinentes y comprobar la implementación contra ellas. Si la búsqueda no aporta resultados útiles, consultar `npx -y modern-web-guidance@latest list`. Respetar la compatibilidad Baseline y las alternativas recomendadas para características que no sean ampliamente disponibles. No agregar componentes ni dependencias por el solo hecho de aparecer en una guía.

## Identidad visual: paleta y tipografías

Referencia: imagen aportada directamente por el usuario el 6 de octubre de 2026. Los valores siguientes se transcriben de sus etiquetas; el fondo gris de la captura no forma parte de la paleta indicada.

| Color | HEX |
| --- | --- |
| Rosa intenso | `#BC4265` |
| Azul profundo | `#0F3363` |
| Rosa claro | `#FAD7D3` |
| Blanco humo | `#F5F5F5` |
| Negro | `#101010` |

Los nombres de los colores son descriptivos; los valores HEX son los proporcionados en la referencia.

- **Montserrat**: textos generales.
- **Dancing Script**: títulos y textos llamativos.

La imagen no especifica pesos, tamaños ni archivos tipográficos. Elegirlos según la composición y la legibilidad sin atribuirlos a la referencia. Comprobar el contraste de cada combinación de texto y fondo antes de implementarla.

## Registro de comprobaciones

- 6 de octubre de 2026: confirmado el PDF local; revisadas las primeras ocho páginas físicas (portada, identificación, introducción, índice e inicio del capítulo 1). No se revisó el libro completo.
- 6 de octubre de 2026: consultada la página oficial de Chrome y completada la instalación del skill en `.agents/skills/modern-web-guidance`; leído su `SKILL.md`.
- Esta configuración no implica que se haya construido o verificado una web. Registrar las pruebas reales a medida que se implemente el proyecto.

## Implementación de la landing — 6 de octubre de 2026

- Ocho capturas del usuario definen el orden: navegación fija y header, servicios, ventajas, Sobre mí, enfoque, testimonios y organizaciones, galería, contacto y footer. Clases principales: `nav`, `header`, `main`, `services`, `benefits`, `about`, `approach`, `testimonials`, `gallery`, `contact`, `footer`.
- HTML semántico, CSS adaptable y un módulo JavaScript nativo; sin frameworks. Paleta y tipografías previas conservadas. Textos, cifras, testimonios y organizaciones transcritos de las capturas del usuario, sin verificación independiente.
- Solo hay tres JPG válidos en `Images/`. `Oratoria-4.jpg.html` y `Oratoria-5.jpg.html` son documentos HTML, no fotografías. Se conservan sin modificar; tres espacios de galería quedan pendientes. El usuario aportó después `Images/header-iamgen.jpg` y `Images/sobremi.jpg`, conectadas a sus secciones. Por instrucción posterior, los tres espacios sin foto permanecen vacíos.
- Contacto: Neuquén, teléfono e Instagram transcritos de la referencia. Email pendiente. No inventar enlaces de las demás redes. Formulario valida y prepara enlace de WhatsApp para revisión y envío manual; no envía automáticamente ni almacena datos. Mapa mediante enlace real a Google Maps, sin fingir una dirección exacta.
- Revisadas páginas físicas 9–12 del PDF (arquitectura y objetivos) y guías locales `responsive-design`, `required-field-feedback`, `optimize-image-priority`, tras búsqueda con Modern Web Guidance.

### Comprobaciones de la implementación

Chrome local: 320, 390, 768, 1024 y 1440 px sin desborde horizontal; navegación `fixed`, tres espacios de galería realmente vacíos. Imágenes locales decodificadas correctamente tras entrar en pantalla en móvil y escritorio. Menú móvil abre y cierra con Escape. Formulario probado con datos ficticios: prepara URL de WhatsApp e invalida el borrador al editar; no se abrió ni envió una consulta. Sin errores de JavaScript. Capturas completas de 390 y 1440 px inspeccionadas en /tmp; servidor local en http://127.0.0.1:4173/. Las fuentes cargan desde Google Fonts. Mapa simplificado como enlace; solo Instagram dispone de URL proporcionada en las capturas.

## Mejoras de Modern Web Guidance — 6 de octubre de 2026

Pedido: implementar puntos 1–6, 8 y 9 de la revisión; **punto 7 pendiente por decisión del usuario**. No optimizar ni reemplazar las imágenes en esta etapa: conservar sus bytes, URLs, dimensiones y los tres espacios vacíos.

- Navegación: sticky en flujo sin JavaScript; fija con JavaScript, con altura real observada por ResizeObserver. Menú móvil conserva enlaces nativos, cierra con Escape y lleva el foco al título de destino. El foco con teclado se mantiene debajo de la barra.
- Formulario: rechaza nombre y motivo vacíos o de solo espacios; errores relacionados mediante `aria-errormessage` y `aria-describedby` al mostrarse; `aria-invalid` sincronizado. Aviso de campos obligatorios. Conserva borrador de WhatsApp e invalidación al editar.
- Lectura: párrafos principales y campos de 16 px base, secundarios de 14 px base y unidades rem para ampliar texto.
- Fuentes: Montserrat y Dancing Script variables locales WOFF2, subconjuntos latin y latin-ext, `font-display: swap`, precarga de Montserrat latin y ajuste progresivo de fuente alternativa. Descargadas desde la API de Google Fonts; licencias SIL OFL 1.1 completas en `assets/fonts/`. No hay importación o petición de fuentes a Google en la página.
- Mantenimiento: módulos independientes `scripts/components/navigation.js` y `scripts/components/contact.js`; entrada en `scripts/main.js`. Formato legible de HTML, CSS y JavaScript. Se preservan texto, orden de secciones, paleta y fotografías.
- Pendiente **7: variantes WebP, srcset y sizes**. Otros pendientes de contenido previos siguen vigentes: email y tres fotos de galería.

### Verificación de las mejoras

Chrome local a 320, 390, 600, 768, 800, 801, 1024 y 1440 px: sin desborde horizontal; altura real de navegación y espacio reservado coinciden; campos y párrafos principales de 16 px; fuentes locales cargadas. El enlace del menú móvil con Enter cierra el menú y enfoca «Mis Servicios» debajo de la barra.

Nombre y motivo de solo espacios rechazados, mensajes relacionados y estado ARIA comprobados. Borrador válido con acentos e invalidación al editar, sin abrir WhatsApp ni enviar mensajes. Sin JavaScript a 320, 390, 768 y 1440 px: navegación en flujo sticky, header libre y contacto desactivado con enlace directo alternativo.

Texto ampliado al 200 % a 720 px: sin desborde y navegación con altura reservada correcta. Recorrido de 40 pulsaciones Tab a 390 px sin foco tapado por la barra. Bloqueo de fuentes: contenido legible sin desborde y altura de navegación recalculada. No se ejecutaron pruebas en Safari o Firefox ni se midieron Core Web Vitals de usuarios reales.

Sin errores de página ni solicitudes remotas al cargar la página. Capturas completas de móvil y escritorio inspeccionadas. Hashes de los archivos de Images idénticos antes y después: **punto 7 sigue pendiente**. Resultados en `docs/verificaciones/modern-web/mejoras.json`.

## Nueva dirección visual — 6 de octubre de 2026

Las seis nuevas capturas del usuario reemplazan la composición de header, servicios, ventajas, Sobre mí, enfoque, testimonios y galería. Navegación, `#contacto` completo y footer quedan excluidos y se conservan; organizaciones mantienen su bloque existente debajo de los testimonios.

- Estilos nuevos limitados a `styles/redesign.css`, con selectores de las secciones autorizadas. Se mantienen mejoras de accesibilidad, formularios, navegación y fuentes locales previas. Sin nuevos módulos, dependencias o animaciones.
- Fotografías del usuario: `Images/Header-new.jpg` (550 × 400) y `Images/Sobre-mi-new.jpg` (435 × 445), conectadas con sus dimensiones reales. No alterar sus bytes ni aplicar filtros. Su resolución limita la nitidez en pantallas grandes; la optimización de imágenes del punto 7 sigue pendiente. El cambio de URL de estas dos fotos está autorizado por el nuevo pedido y reemplaza la preservación de URL de la etapa anterior.
- Títulos en Dancing Script; encabezados de tarjetas en Montserrat Black 900, añadido localmente desde Google Fonts con la misma licencia OFL. No cambiar la tipografía o estilos del contacto, navegación o footer.
- Textos y hechos de servicios se conservan. La captura nueva de Empresas muestra «Online», pero se mantiene la modalidad previa «Presencial», coherente con la etiqueta y el servicio documentado. CTA de las tres tarjetas «Quiero sumarme», con el servicio diferenciado en su atributo para preparar la consulta. Header conserva voseo y suma «Mis servicios» hacia `#servicios`.
- Testimonios con bordes rosa, texto sin cursiva, autores al pie y círculos vacíos decorativos. Se retiran las estrellas de esta sección según la referencia nueva. No agregar testimonios, nombres ni organizaciones.
- Galería nueva: siete marcos totalmente vacíos, `gallery-foto-1` a `gallery-foto-7`, con `data-photo-slot="galeria-N"`. En escritorio el primero ocupa la columna izquierda y dos filas; otros seis se reparten en tres columnas y dos filas. Sin imágenes ficticias ni peticiones faltantes. Fotos anteriores conservadas en Images. Al aportar cada foto, insertar un img con sus dimensiones, alt y carga diferida en el marco correspondiente; retirar `aria-hidden="true"` de ese marco.
- Consultadas las guías de retículas adaptables de Modern Web Guidance (`css-layout`) antes de implementar.

### Comprobación de la nueva dirección visual

Chrome local a 320, 390, 600, 768, 800, 801, 1024, 1440 y 1894 px: sin desborde horizontal ni recortes en paneles de texto; siete marcos de galería vacíos y únicamente las dos fotos nuevas cargadas. En escritorio las tres tarjetas de servicio igualan altura y alinean su CTA al pie. Texto ampliado al 200 % a 720 px sin desborde.

El HTML de navegación, contacto y footer conserva sus bytes. Organización conserva contenido y orden; solo cambia su indentación dentro de un contenedor que mantiene el ancho anterior. Comparación de dimensiones, fuentes, colores, fondos, bordes y espaciado con la hoja nueva activada/desactivada en 1440 px: misma apariencia en navegación, contacto, footer y organizaciones. Estilos compartidos, fuentes anteriores y módulos conservan hashes; todos los archivos de Images mantienen los bytes originales.

Menú y enlace Servicios con Enter: foco correcto en «Mis Servicios». CTA de mentoría conserva selección del servicio en el formulario, borrador válido con acentos e invalidación al editar. No se abrió WhatsApp ni se envió mensaje. Sin JavaScript en 390 px: contenido completo, navegación en flujo y envío desactivado. Sin errores de página o recursos fallidos.

Capturas finales completas de 390 y 1440 px inspeccionadas; revisadas además capturas de header, servicios, Sobre mí, enfoque, testimonios y galería. Resultados en `docs/verificaciones/nuevo-estilo/resultados.json`. Las pruebas de esta etapa corresponden a Chrome local; no son pruebas en otros navegadores ni de rendimiento real. Optimización de imágenes del punto 7 pendiente, por instrucción vigente.

- Ajuste posterior solicitado: `services-grid` y contenido de sus tres tarjetas centrados; etiquetas, títulos, párrafos y datos alineados al centro. Se conservan dimensiones, enlaces y adaptación móvil.

- Navegación: por nuevo pedido, Servicios, Sobre mí, Testimonios, Galería y Contacto reciben fondo `#BC4265` (mismo que «Quiero empezar») y texto blanco al pasar el cursor o enfocar con teclado. Área redondeada de radio 8 px, ancho proporcional al texto y alto mínimo 44 px; espacio reservado desde el estado normal para que hover no mueva los enlaces. Transición breve de color; reducción de movimiento elimina la transición. Este pedido autoriza el cambio de estilos de navegación previamente excluidos del rediseño.

- Comprobación del efecto de navegación en Chrome a 320, 390, 801, 1024, 1440 y 1894 px: los cinco enlaces muestran fondo RGB(188, 66, 101) y texto blanco en hover y foco visible; sus anchos no cambian al activarse. Sin desborde horizontal. Probado con reducción de movimiento.

## Acabado inspirado en Material Design — 6 de octubre de 2026

El usuario aclaró «parecidos a la web de Google», **solo estilos de componentes**: no cambiar clases ni estructura. Esta instrucción autoriza actualizar bordes y formas de los componentes existentes, incluidos navegación y contacto previamente excluidos del rediseño.

- Solo CSS en `styles/redesign.css`: radios compartidos de 8/16/24 px y forma de píldora para botones y navegación, bordes de 1 px, superficies claras y sombras suaves. Paleta existente; transparencias de tinta y rosa derivadas para bordes y estados.
- Botones con estados hover/pressed discretos, sin desplazamiento; foco visible conservado. Campos delineados, esquinas de 8 px y estados de error existentes. Tarjetas estáticas conservan comportamiento estático; tarjetas de servicios con sombra discreta al pasar el cursor en dispositivos con puntero fino. Reducir movimiento elimina las transiciones.
- Se mantienen fuentes, textos, fotos, estructura, clases, grillas, tarjetas de servicios centradas, siete marcos vacíos y efecto rosa de los enlaces del menú. HTML y JavaScript no se editan. No se agrega biblioteca Material Web.
- Adaptación visual inspirada, sin afirmar cumplimiento completo de Material Design. Referencias oficiales: https://material-web.dev/theming/shape/ , https://material-web.dev/components/button/ y https://material-web.dev/components/text-field/ . Consultada Modern Web Guidance.
- Punto 7 (variantes de imágenes) sigue pendiente.

### Comprobación del acabado Material

Chrome a 320, 390, 768, 801, 1024, 1440 y 1894 px sin desborde; tarjetas con radio 24 px, botones redondeados y campos de 8 px; servicios siguen centrados y siete marcos de galería vacíos. Navegación fija reserva su altura real y conserva el efecto rosa. Texto ampliado al 200 % a 720 px sin desborde.

Menú con teclado y foco de destino correctos; formulario rechaza espacios, prepara borrador válido y lo invalida al editar, sin abrir ni enviar WhatsApp. Alternativa sin JavaScript comprobada en 390 px. Sin errores de página.

Hashes idénticos de HTML completo, JavaScript, fotos y fuentes: ninguna clase, contenido o comportamiento fue modificado. Capturas completas de móvil/escritorio y de servicios/contacto inspeccionadas. Resultados en `docs/verificaciones/material/resultados.json`. Verificación local en Chrome; no implica pruebas en otros navegadores.

- Ajuste de Sobre mí solicitado: los párrafos de `.about-copy` se justifican con `text-align: justify` y última línea centrada mediante `text-align-last: center`. Solo cambia CSS; título, cita y texto se conservan.

## Ajuste de lectura y alineación de servicios

Por corrección explícita del usuario, los párrafos de Servicios y Sobre mí quedan **justificados con última línea a la izquierda**, reemplazando el cierre centrado anterior. El texto interior de servicios usa Montserrat Regular 400, 16 px y line-height 1.5; etiquetas de los datos mantienen un énfasis discreto de 600.

En escritorio las tres líneas superiores de `service-facts` se alinean mediante subgrid: pistas compartidas para encabezado, descripción, datos y acción. Se agrupan los párrafos de cada tarjeta en un div sin clase; las clases existentes, textos, enlaces y servicios se conservan. No se fijan alturas de texto ni se añade JavaScript. En móvil siguen apiladas; navegador sin subgrid dispone de tarjetas en columna. El título y los botones mantienen su estilo actual; navegación, contacto y footer no se modifican.

- Comprobación del ajuste: Chrome a 320, 390, 768, 1024, 1440 y 1894 px sin desborde. Servicios en Regular 400/16 px; ambos bloques de párrafos justificados con última línea a la izquierda. Las tres coordenadas superiores de `service-facts` coinciden exactamente a 1024, 1440 y 1894 px. Captura de escritorio inspeccionada. Navegación, contacto y footer conservan HTML exacto.

## Claridad de oferta, comparación y consulta — 6 de octubre de 2026

El usuario autorizó implementar los puntos 1, 2 y 3 de la revisión de `Proceso-unificado-diseno-producto.md`: explicar la oferta en el header, facilitar comparación de servicios y aclarar el recorrido a WhatsApp.

1. Header: conserva literalmente el título y la bajada; añade «Cursos, mentorías y capacitación en oratoria» encima del título.
2. Servicios: reorganiza el texto de cada tarjeta en «Para quién es», «Qué vas a trabajar» y «Cómo funciona», mediante h4 y párrafos. Adaptación editorial de contenido previo: curso grupal, mentoría individual y capacitación para equipos. No agrega precios, horarios, fechas, requisitos, cupos o disponibilidad sin confirmar. Listas `service-facts`, duración, modalidad, incluidos, nombres y selección del servicio conservados. Texto sigue en Montserrat Regular de 16 px, justificado con última línea a la izquierda; encabezados de los apartados a la izquierda. Las clases y retícula subgrid se conservan.
3. Formulario: botón «Preparar consulta», explicación «Primero preparás tu consulta. Después la revisás y la enviás desde WhatsApp», enlace «Revisar en WhatsApp» y estado que identifica el paso 2. `aria-describedby` relaciona el botón con la explicación. Se mantiene la validación y el borrador invalidado al editar; no se envía automáticamente, almacena o confirma recepción. Sin JavaScript permanece desactivado con enlace directo alternativo.

No se implementan los otros puntos de la revisión. Paleta, acabado Material, clases existentes, navegación, footer, Sobre mí, enfoque, testimonios, organizaciones y siete marcos vacíos conservados. Fotos y fuentes intactas. Optimización de imágenes pendiente. Referencia de proceso: pasos 4, 5, 7, 8 y 13; guía técnica Modern Web Guidance: forms. La eficacia con visitantes reales aún requiere pruebas de usuarios.

### Comprobación de los puntos 1, 2 y 3

Chrome a 320, 390, 768, 1024, 1440 y 1894 px sin desborde: oferta visible en header; tres apartados iguales por servicio; Regular 400, justificación y última línea a la izquierda conservadas. En escritorio, subgrid comparte nueve pistas para alinear también los apartados de comparación, además de las tres líneas de `service-facts` y los CTA. Texto al 200 % a 720 px sin desborde.

Pruebas del formulario vacío, campos con espacios y email inválido: no se prepara borrador. Las tres tarjetas conservan selección del servicio; botón «Preparar consulta» con teclado prepara un enlace con acentos y datos correctos; estado «Paso 2», enlace «Revisar en WhatsApp» enfocado e invalidación al editar comprobados. Cero ventanas automáticas; no se abrió ni envió WhatsApp. Sin JavaScript: nueve encabezados de comparación presentes y formulario desactivado con enlace directo alternativo. Sin errores de página ni peticiones remotas.

Clases existentes, listas service-facts y HTML de navegación, footer, Sobre mí, ventajas, enfoque, testimonios, galería y detalles de contacto preservados. Fotos, fuentes, estilos base y módulo de navegación conservan hashes. Capturas de móvil/escritorio y de los tres bloques intervenidos inspeccionadas. Resultados en `docs/verificaciones/claridad/resultados.json`. No se afirma una mejora de conversión ni validación con usuarios: estas comprobaciones son técnicas y visuales en Chrome.

## Correcciones del documento del 8 de octubre de 2026

El pedido actual reemplaza las restricciones anteriores de galería vacía, texto justificado, servicios centrados y ausencia de servicios/testimonios adicionales. Se implementaron cuatro servicios (Conferencias primero), portada con logo y foto de escenario, Sobre mí del documento, lectura a la izquierda, predominio azul/blanco, seis testimonios y doce logos grises. Veinte fotos en carrusel progresivo con controles y reducción de movimiento. Oratoria Pocket con tres clases enlazadas; Recursos gratis con consulta y manifiesto preparado para archivos reales. Descargas y newsletter pendientes de archivos/proveedor, consultados al usuario.

Consultadas las páginas físicas 47–48 y 77–78 del PDF local, tres guías Modern Web Guidance y el patrón de carruseles W3C. No se revisó el libro completo. Resultados técnicos y notas de integración: `docs/verificaciones/correcciones-2026-10-08/`. Chrome de 320 a 1894 px y texto al 200 % sin desborde; carrusel, cuatro CTA, formulario, navegación, imágenes y alternativa sin JavaScript comprobados. No se alteraron bytes de fotos originales ni se implementó la optimización de imágenes previamente pendiente. No se envió WhatsApp ni se publicó la web.

## Revisión de buenas prácticas — 9 de octubre de 2026

Pedido de revisión; sin cambios de implementación. Contrastado el documento de correcciones como referencia, sin tomar sus propuestas pendientes como una nueva orden. Releídas páginas físicas 47–48 y 77–78 del PDF local (revisión parcial); consultadas guías Modern Web Guidance `forms`, `optimize-image-priority`, `performance` y referencias W3C de carrusel y contraste.

Chrome local a diez anchos de 320 a 1894 px, texto al 200 %, espaciado de texto, teclado, menú, formulario, carrusel, imágenes y alternativa sin JavaScript comprobados. Sin desborde, errores JavaScript o recursos locales fallidos. axe-core a 390/1440 px: cero infracciones automáticas; revisión manual detectó dos ajustes de contraste pendientes: bordes de campos 2,02:1 sobre blanco y foco rosa del footer 2,45:1 sobre azul, ambos por debajo de 3:1. No se corrigieron durante el pedido de revisión.

36 imágenes enlazadas suman aproximadamente 15 MB; carga progresiva conservada. Optimización de imágenes, email, archivos gratuitos y proveedor de newsletter siguen pendientes. HTML, CSS, JavaScript, fotos y fuentes no fueron modificados por esta revisión. No se envió WhatsApp ni se publicó la web. Sin pruebas Safari/Firefox, lector de pantalla o rendimiento real. Informe y evidencia en `docs/verificaciones/revision-2026-10-09/`.

## Ajustes de alineación y contraste — 9 de octubre de 2026

Por pedido posterior, se corrigieron ambos contrastes: bordes de campos 3,32:1 sobre blanco y foco blanco humo del footer 11,51:1 sobre azul. Links rápidos y copyright centrados; footer con columna central simétrica en escritorio y bloques apilados en móvil. Marca e Instagram centrados en su bloque. Instagram en contacto y footer conserva texto y destino, agrega ícono SVG blanco y retira la flecha; contacto usa fondo azul para el ícono blanco. Pocket (logo, encabezado y enlace general sin flecha), tarjeta compacta de Recursos gratis (48 rem máximo) y título de organizaciones centrados. Avisos ocultos de nueva pestaña conservados.

Consultada Modern Web Guidance `css-layout` y releídas páginas físicas 48 y 78 del PDF local (revisión parcial). Chrome local de 320 a 1894 px, nueve anchos, y texto al 200 % sin desborde; alineaciones medidas, contrastes calculados y capturas de móvil/escritorio inspeccionadas. Menú, validación, borrador e invalidación del formulario conservados. Sin JavaScript: íconos presentes y alternativa previa conservada. Sin errores o recursos fallidos; axe no reportó infracciones automáticas. JavaScript conserva hashes de la revisión anterior. Fotos y fuentes sin editar. No se abrió ni envió WhatsApp ni se publicó. Evidencia en `docs/verificaciones/alineaciones-2026-10-09/`. Optimización de imágenes y pendientes de contenido anteriores siguen vigentes.

## Galería más simple y eliminación de Links rápidos — 9 de octubre de 2026

Por pedido explícito, se retira el bloque Links rápidos del footer y se muestran como máximo dos fotos por vista del carrusel, juntas en escritorio y apiladas hasta 800 px. Veinte fotos originales conservadas en diez grupos presentes en HTML. Reemplaza la composición 7/7/6 y la alternativa anterior de veinte fotos en una retícula vertical. Con JavaScript: botones y rotación automática, pausa por foco y reducción de movimiento conservados. Sin JavaScript o al abrir el archivo HTML directamente: carrusel horizontal nativo con scroll snap y foco para teclado; no se despliegan todas las fotos verticalmente.

Modern Web Guidance `carousel-slide-effects` consultada antes de implementar; semántica y mejora progresiva según páginas físicas 48/78 del PDF revisadas en esta sesión. Chrome local en nueve anchos de 320 a 1894 px, texto al 200 %, diez grupos, controles, pausa, imágenes y apertura directa comprobados. Exactamente dos fotos visibles por vista; sin desborde de página o errores en HTTP. Sin JavaScript, ArrowRight cambia de vista; `file://` conserva dos fotos y las imágenes decodifican. Fotos y fuentes conservan hashes. Capturas inspeccionadas y resultados en `docs/verificaciones/carrusel-dos-fotos-2026-10-09/`. Sin publicación; pendientes de optimización y contenido anteriores conservados.

## Ajuste posterior de Oratoria Pocket — 9 de octubre de 2026

Por pedido explícito se elimina el h3 «Oratoria Pocket» repetido debajo del logo. Descripción en negro de la paleta (#101010); título y bajada de Recursos centrados. Etiquetas, títulos y botones de las tres tarjetas Pocket centrados. Los títulos de las tarjetas pasan de h4 a h3 para mantener la jerarquía al retirar el encabezado anterior, conservando su estilo visual y texto. Solo HTML/CSS; enlaces, fotografías, fuentes y JavaScript conservados.

Consultada Modern Web Guidance `css-layout`, usando las páginas físicas 48/78 del PDF revisadas en esta sesión como referencia de semántica. Chrome local a 320, 390, 768, 1024 y 1440 px y texto al 200 %: sin desborde; color y alineaciones calculados correctos, botones centrados y cero errores JavaScript. Capturas de recursos a 390/1440 px inspeccionadas. Resultados en `docs/verificaciones/pocket-2026-10-09/resultados.json`. Pendientes previos conservados; sin publicación.

- Ajuste posterior: descripción de Pocket sin el límite de ancho de 45 rem, para mostrar la frase completa en una línea en escritorio. Modern Web Guidance `typography` consultada. Chrome a 1024 y 1440 px: una línea, centrada y en negro; a 390 px conserva adaptación natural sin desborde. Solo CSS; texto y enlaces conservados.

## Restauración de galería anterior — 9 de octubre de 2026

Por pedido posterior se recupera la galería anterior con veinte fotos en grupos 7/7/6 y flechas arriba, reemplazando la etapa de dos fotos por vista. Git solo contiene el primer commit con marcos vacíos: la restauración corresponde a la implementación anterior de la conversación, no a una versión con fotos guardada en Git. Los demás ajustes visuales y de contenido se conservan.

Galería en script externo diferido e independiente del módulo principal, para que sus flechas funcionen al abrir `index.html` directamente; importación y llamada duplicadas retiradas del módulo principal. Sin JavaScript se conserva el carrusel horizontal nativo. Pausa por foco, puntero, visibilidad y reducción de movimiento conservadas. Modern Web Guidance `html` consultada; referencias de semántica y mejora progresiva según PDF y guías ya revisadas en esta sesión.

Chrome local en nueve anchos de 320 a 1894 px y texto al 200 % sin desborde. Tres grupos y veinte imágenes decodificadas; avance/retroceso, retorno al primer grupo, foco, rotación y pausa comprobados. Flechas funcionan también en `file://`. Sin JavaScript, ArrowRight recorre los grupos. HTML de las otras secciones, fotos y fuentes conservados. Capturas inspeccionadas y evidencia en `docs/verificaciones/galeria-restaurada-2026-10-09/`. Sin publicación; pendientes anteriores conservados.

## Logos en navegación y footer — 9 de octubre de 2026

Por pedido explícito, marca textual de navegación reemplazada por `Images/Logos/LOGO CECI - NUEVO 2026_Mesa de trabajo 1 copia 3.png` y marca textual del footer por `copia 5.png`. Logo duplicado de la portada y sus reglas CSS retirados. Ambos siguen enlazando a inicio, con alt descriptivo y dimensiones intrínsecas 1080 × 1080. Se encuadran mediante CSS los márgenes transparentes de los archivos, sin modificar sus bytes ni recortar el arte visible. Navegación: ancho visible 9 rem en escritorio/8 rem en móvil; footer: hasta 16 rem. Proporción reservada, altura de navegación observada y espaciado de la portada conservados.

Todo el texto del footer centrado; columnas alineadas verticalmente al centro y logo centrado. Se corrige la prioridad CSS del color de la oferta de portada para evitar que la regla antigua de primer párrafo la vuelva blanca al quitar el logo.

Modern Web Guidance `responsive-design` consultada, con semántica y accesibilidad según referencias del PDF ya revisadas en esta sesión. Chrome local en nueve anchos de 320 a 1894 px, texto al 200 % y alternativa sin JavaScript: sin desborde. Ambos logos decodificados, cero marcas textuales/logo de portada, altura reservada correcta y textos del footer centrados. Enlace del logo enfoca título de inicio; menú móvil y foco de Servicios correctos. Sin errores ni recursos fallidos. Capturas de navegación, portada y footer en móvil/escritorio inspeccionadas. Evidencia en `docs/verificaciones/logos-nav-footer-2026-10-09/resultados.json`. Sin publicación; pendientes anteriores conservados.

## Fondos de contacto — 9 de octubre de 2026

Pedido explícito: `Images/contact-box social-box.jpg` como fondo de Instagram y `Images/a class=_map_.jpg` como fondo del enlace de mapa con degradado. Solo CSS en `styles/corrections.css`; imágenes originales, HTML, enlaces y JavaScript conservados. Fotografías decorativas con recorte adaptable `cover`, capa azul sobre Instagram y degradado azul sobre mapa. Texto e ícono de mapa blancos; botón Instagram conserva ícono blanco y añade borde blanco. Colores de fondo sirven también si no carga la imagen. Degradado Oklab progresivo con alternativa estándar para navegadores anteriores.

Consultada Modern Web Guidance `visual-effects` antes de implementar; referencias de semántica y accesibilidad del PDF local ya revisadas en esta sesión. Ambas fotos de 1200 × 600 decodificadas. Chrome local a 320, 390, 768, 1024 y 1440 px y texto al 200 % sin desborde; sin errores o recursos fallidos. Foco del mapa y destino conservados. Contraste mínimo conservador de texto blanco sobre las capas, usando foto completamente blanca como peor caso: Instagram 6,46:1 y mapa 5,87:1. Capturas de móvil/escritorio inspeccionadas; resultados en `docs/verificaciones/fondos-contacto-2026-10-09/resultados.json`. Sin publicación ni optimización de los archivos de imagen.

- Ajuste posterior solicitado: los fondos de Instagram y mapa pasan de capas azules a degradados gris claro suave, derivados de blanco humo (#F5F5F5), con textos negros resaltados (600/700). Ícono de mapa azul y botón Instagram con texto e ícono blancos conservados. Solo CSS. Consultada Modern Web Guidance `color`; Chrome de 320 a 1440 px y texto al 200 % sin desborde, imágenes decodificadas y capturas móvil/escritorio inspeccionadas. Contraste mínimo conservador de texto negro sobre la capa gris, usando foto completamente negra: 12,04:1; ícono de mapa: 7,94:1. Sin errores ni recursos fallidos. Evidencia en `docs/verificaciones/fondos-grises-2026-10-09/resultados.json`.

## Detalles de fondos y organizaciones — 9 de octubre de 2026

Según pedido y capturas del usuario, se quitan bordes y sombras de las tarjetas con fondos fotográficos de Instagram y mapa, conservando radios y foco de teclado. Se retira la flecha visible de «Abrir en Google Maps», con destino y comportamiento conservados. Título de organizaciones en azul de marca (#0F3363), Montserrat 700 y centrado. Los doce logos quedan con espacios iguales entre el título de organizaciones y «Las clases»: padding adaptable arriba/abajo de la retícula y eliminación del doble espaciado entre secciones. Fotos, logos, galería y demás contenido conservados.

Modern Web Guidance `css-layout` consultada, con referencias técnicas del PDF ya revisadas en esta sesión. Chrome a 320, 390, 600, 768, 1024, 1440 y 1894 px: sin desborde; separación superior e inferior de logos idéntica (32–64 px según ancho), doce logos, título azul/700 y ambos fondos con borde 0/sin sombra. Texto al 200 % sin desborde, foco del mapa visible y destino correcto; cero errores JavaScript. Capturas móvil/escritorio inspeccionadas. Evidencia en `docs/verificaciones/detalles-contacto-logos-2026-10-09/resultados.json`. Sin publicación.

## Footer compacto y carrusel manual — 9 de octubre de 2026

Por pedido explícito se limita el contenedor del footer a 60 rem, se reducen padding y separación de columnas y se achica el logo blanco a 10 rem en escritorio/8,5 rem en móvil. Se retira la frase «La palabra no solo expresa quiénes somos…». Todo el footer sigue centrado. Navegación y demás contenedores conservados.

Se elimina el botón Pausar/Reproducir fotos y la rotación automática: el carrusel ahora avanza manualmente con las flechas, centradas junto al contador arriba de la galería. Se retiran temporizadores y observadores de reproducción; se conservan tres grupos 7/7/6, foco del botón, indicador aria-live polite, preferencia de movimiento en CSS y alternativa nativa sin JavaScript. Controles siguen funcionando bajo file://.

Consultada Modern Web Guidance `carousel-slide-effects`, con patrones accesibles y referencias del PDF ya revisados en esta sesión. Chrome en ocho anchos de 320 a 1894 px y texto al 200 % sin desborde; footer de hasta 960 px, logo reducido, frase y botón ausentes. Centro de flechas/contador coincide con la ventana (menos de 0,02 px de diferencia). Espera real de siete segundos sin rotación; avance con Enter y retroceso correctos, incluido file://. Sin errores JavaScript. Capturas móvil/escritorio inspeccionadas; evidencia en `docs/verificaciones/footer-compacto-carrusel-manual-2026-10-09/resultados.json`. Sin publicación; pendientes anteriores conservados.

## Popup de newsletter eliminado — 9 de octubre de 2026

Por pedido explícito del usuario se elimina por completo la invitación flotante: HTML del aside y anuncio accesible, reglas CSS, carga del script y archivo `scripts/components/newsletter.js`. Se retiran las condiciones de siete segundos y 35 % de scroll y la clonación del formulario. No recrear el popup sin nuevo pedido. El bloque `#newsletter` debajo de `.contact-grid` se conserva, sin «Próximamente» y con MailerLite aún pendiente y controles desactivados.

Chrome local a 390 px: tras recorrer más del 35 % y esperar 7,5 segundos no hay popup ni script asociado; existe un único formulario de newsletter, debajo de contacto, desactivado. Sin desborde ni errores JavaScript. Sin referencias de popup en HTML/CSS/JS ni errores de formato. Guía Modern Web Guidance de avisos ya revisada en esta sesión; sin publicación.

## Auditoría de rendimiento y seguridad local — 9 de octubre de 2026

Usuario confirmó que la web aún no está publicada. Guía `agent-perfomance.md` adaptada a este sitio estático, sin atribuir sus ejemplos Express a este proyecto. Modern Web Guidance: búsqueda y guías `performance`/`security`; referencia parcial páginas físicas 47–48 del PDF local. No publicar el libro.

Corrección: precarga de hero y de scripts pequeños; navegación/galería inicializadas después de su HTML antes del contenido posterior; contención layout/paint limitada a gallery-grid. Cinco repeticiones frías/calientes por perfil, Chrome 154, escritorio 1440×900 y móvil 390×844/DPR1, 1,6 Mbps/300 ms/CPU4×. Móvil frío: LCP mediano 2,740→2,504 s, p75 final 2,536 s; CLS 0,9883→0,0009. FCP 1,152→1,212 s; LCP caliente 0,076→0,384 s: compromiso de inicialización temprana documentado. Event Timing de cinco recorridos: máximos 48–56 ms; no se afirma INP real. Sin tareas largas detectadas en esas cargas finales. Estos datos son locales; no acreditan CWV de producción.

Chrome en siete anchos 320–1894 px: sin desborde, errores JS o infracciones axe automáticas. Texto 200 %, sin JS, menú/Escape/foco, formulario con espacios/payloads, invalidación y veinte fotos comprobados. Capturas inspeccionadas. Sin Safari/Firefox ni lector de pantalla en esta etapa.

`tools/build_site.py` genera únicamente recursos públicos referenciados y licencias en `dist/`, ignorado por Git. Publicar solo esa carpeta, nunca la raíz. Libro excluido también por .gitignore; original intacto. Encabezados propuestos en dist/_headers, probados con CSP local: flujos funcionan, script inline bloqueado y archivos internos 404. Comprobar soporte/aplicación de encabezados, HTTPS, compresión y dominio en el hosting futuro. Si se agregan archivos dinámicos a freeResources, incluirlos explícitamente en la construcción; revisar CSP al aprobar MailerLite.

## Selección de interés en contacto — 9 de octubre de 2026

Por pedido del usuario se agregó entre nombre y email el campo opcional «¿Sobre qué te gustaría conversar?», con opciones para conferencias, curso, entrenamiento individual, propuesta para empresas y recursos gratis. Cada enlace con `data-service` completa esa opción, completa el mensaje, desplaza al formulario y devuelve el foco al campo. Botón «Quitar» permite eliminarla y cambiarla. El borrador de WhatsApp incorpora el interés elegido; no se envía automáticamente. Se consultó Modern Web Guidance `forms`; se conservaron etiquetas visibles, control nativo, validación existente y alternativa sin JavaScript. `node --check scripts/components/contact.js` y `git diff --check` pasan. La comprobación visual con Chrome quedó pendiente por límite temporal del ejecutor, aunque el flujo usa APIs ya verificadas en la revisión previa.

Sin publicación ni mensajes enviados. Fotografías conservan hashes; optimización de imágenes continúa aplazada por instrucción vigente. Newsletter desactivado y popup eliminado. Informe, mediciones, seguridad, hashes y capturas: `docs/verificaciones/rendimiento-seguridad-2026-10-09/INFORME.md`.

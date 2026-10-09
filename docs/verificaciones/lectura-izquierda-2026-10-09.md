# Lectura alineada a la izquierda

Pedido actual: priorizar la lectura con textos a la izquierda y sin justificación. Reemplaza las alineaciones centradas previas de los bloques de lectura.

Cambios limitados a CSS: párrafos, testimonios, autores, listas, textos de recursos y tarjetas Pocket, información textual de redes, título de organizaciones y textos del footer alineados a la izquierda. Se eliminan las dos declaraciones de justificación de Sobre mí y Servicios de la hoja de rediseño. Los párrafos usan espaciado normal de palabras y última línea sin justificación. Los controles, logos e indicadores del carrusel mantienen sus alineaciones funcionales.

Referencias: Modern Web Guidance `typography`, buscada y recuperada desde la herramienta en caché; recomienda evitar justificación y los espacios excesivos. Página física 48 de Vanilla Web v6 revisada en esta conversación sobre accesibilidad; revisión parcial.

Comprobación estática: sin declaraciones `text-align: justify` o `text-align-last: center` en las hojas del proyecto y sin errores de espacios en `git diff --check`. No se ejecutaron nuevas pruebas de navegador. No se modificaron HTML, JavaScript, fotografías, fuentes ni comportamiento del formulario.

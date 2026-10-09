# Revisión local de rendimiento y seguridad — 9 de octubre de 2026

Se corrigió un salto visual importante durante la carga lenta. Se preparó una carpeta pública independiente y una configuración de encabezados de seguridad probada localmente. **La web no se publicó. Esta revisión no certifica seguridad absoluta ni Core Web Vitals reales.**

## Alcance y referencias

Sitio estático HTML/CSS/JavaScript, sin servidor de aplicación, cuentas, base de datos ni dependencias de ejecución externas. Se aplicó el skill local Modern Web Guidance: búsqueda previa y guías `performance` y `security`. Referencia parcial del libro local: páginas físicas 47–48, ya consultadas para esta revisión. El libro completo no fue revisado.

La guía aportada `agent-perfomance.md` se usó para el método de evidencia, repeticiones y validación. Sus ejemplos de Express y otros archivos corresponden a otra aplicación; no se atribuyeron a esta web.

Fuentes oficiales: [Core Web Vitals](https://web.dev/articles/vitals), [encabezados OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html), [CSP OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html). Los umbrales de buena experiencia son LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en el percentil 75 de visitas reales; los resultados siguientes son de laboratorio.

## Cambios realizados

- `index.html`: precarga de la foto principal, sin alterar su archivo. Navegación y galería se precargan y se inicializan inmediatamente después de su HTML, antes de que el contenido posterior se pinte con el diseño alternativo. El resto del JavaScript continúa como módulo. Esto elimina la transición tardía de la navegación y reduce las diferencias al inicializar el carrusel. Los dos scripts pequeños pasan a bloquear brevemente el parser; se midió este compromiso.
- `styles/corrections.css`: contención de layout y pintura limitada a la retícula de fotos para evitar el salto intermitente de sus páginas horizontales durante la inicialización. Los controles y el foco quedan fuera de esta contención. Composición y fotos conservadas.
- `tools/build_site.py`: genera `dist/` con los recursos efectivamente referenciados por HTML, CSS e importaciones JS, más las dos licencias tipográficas. Valida referencias antes de reemplazar la carpeta generada. Sin dependencias adicionales. **Publicar solo `dist/`, nunca la raíz del proyecto.**
- `.gitignore`: excluye la salida generada y el PDF con licencia, que se conserva localmente.

La carpeta generada contiene 58 archivos del sitio y licencias, más `_headers`. Los originales de imágenes conservan sus hashes. No se activó MailerLite, no se recreó el popup y no se envió WhatsApp.

## Mediciones reproducibles

Chrome 154.0.8037.98, Playwright y CDP Network/Performance Observer. Servidor local `http://127.0.0.1:4173/`, sin compresión de hosting. Escritorio: 1440 × 900, DPR 1, sin limitación. Móvil emulado: 390 × 844, DPR 1, descarga/subida 200.000 bytes/s (1,6 Mbps), latencia configurada 300 ms y CPU 4×. No es un teléfono físico.

Cinco contextos nuevos por perfil; cada uno realiza una carga fría y una navegación posterior con caché caliente. Observación inicial hasta 1,5 segundos después de `load`; sin interacción antes de obtener LCP. Mismas condiciones antes/después, 20 cargas en cada serie. CLS suma los desplazamientos iniciales sin entrada reciente; no representa una sesión completa. P75 de laboratorio calculado por rango más próximo en cinco repeticiones. El TTFB de loopback no sirve para estimar el hosting futuro.

| Móvil lento | Antes, mediana | Después, mediana | Después, p75 de laboratorio |
| --- | ---: | ---: | ---: |
| LCP frío | 2,740 s | 2,504 s | 2,536 s |
| CLS frío | 0,9883 | 0,0009 | 0,0009 |
| FCP frío | 1,152 s | 1,212 s | 1,220 s |
| LCP caliente | 0,076 s | 0,384 s | 0,384 s |
| CLS caliente | 0 | 0 | 0 |

La estabilidad mejora claramente. LCP frío queda cerca del objetivo, **todavía ligeramente por encima**, y la primera pintura fría aumenta 60 ms. La inicialización temprana puede añadir una espera en caché caliente bajo latencia simulada; sigue por debajo de 0,4 s en esta serie. No se presenta como una mejora de todas las métricas.

Escritorio frío: LCP mediano 60 → 40 ms; CLS 0 → 0,0006, variación pequeña de fuentes. Son valores locales, no predicciones de producción.

Cinco recorridos de menú, Escape, flechas y formulario con CPU 4×: máxima duración Event Timing por recorrido 48, 56, 56, 56 y 56 ms. Solo se registran eventos ≥ 16 ms. **Es una comprobación de respuesta de laboratorio, no INP de usuarios reales.** Ninguna tarea ≥ 50 ms detectada en las cinco cargas frías finales de móvil; esto no excluye tareas largas en otros equipos o recorridos.

CSS total 61.473 bytes; JS 11.158 bytes. Compresión gzip calculada, todavía no entregada por el hosting: 14.028 y 4.066 bytes respectivamente. El paquete completo ronda 15,5 MB; no se descarga entero al inicio debido a la carga diferida de fotografías. Las variantes WebP/srcset siguen aplazadas por la instrucción vigente del usuario.

## Seguridad y privacidad

- Revisión estática: sin coincidencias de los patrones examinados de ejecución dinámica, inserción de HTML, cookies, almacenamiento o peticiones mediante fetch/XHR en el cliente. Escaneo de 43 archivos de texto: sin patrones de claves privadas o tokens comunes. Esto no garantiza ausencia de todos los secretos o vulnerabilidades.
- Payloads ficticios con etiquetas y manejadores en nombre/mensaje: se codifican dentro del enlace de WhatsApp, sin crear imágenes o scripts en el formulario. El borrador se invalida al editar. No se abre ni envía automáticamente.
- Newsletter desactivado y sin proveedor conectado; cero popup. Las restricciones del proveedor deberán revisarse cuando se apruebe MailerLite.
- `_headers` propone CSP sin scripts/estilos inline, recursos del mismo origen, conexiones bloqueadas, `base-uri`/`object-src`/`form-action`/`frame-ancestors` restringidos; además nosniff, DENY, política de referencia, permisos de cámara/micrófono/geolocalización desactivados y COOP compatible con popups iniciados por el sitio.
- CSP **aplicada localmente** sobre `dist/`: menú, foco de Servicios, carrusel y borrador funcionan sin infracciones. Un script inline de prueba fue bloqueado. Esta CSP convencional confía en scripts del propio origen; no es una política estricta de hashes ni elimina todo riesgo XSS.
- `.git/config`, `AGENTS.md`, libro, `docs/` y script de construcción responden 404 en la vista del paquete público. No hay listado de directorios en esa vista. No se afirma nada sobre un hosting aún inexistente.
- `_headers` solo funciona si el proveedor interpreta ese formato. En otros hostings habrá que traducir sus reglas. HTTPS, certificados, redirecciones, HSTS y encabezados públicos quedan pendientes. No se activó HSTS largo ni preload sin dominio validado. `no-cache` permite revalidar archivos sin nombres fingerprinted; no se recomienda caché immutable para estos nombres.

## Funcionamiento y accesibilidad

Chrome a 320, 390, 768, 801, 1024, 1440 y 1894 px: sin desborde, errores JS ni infracciones automáticas de axe-core 4.10.3. Texto ampliado al 200 % a 720 px: sin desborde. Menú/Escape, foco de Galería debajo de la barra, avance/retroceso, tres grupos y decodificación de las veinte fotos comprobados. Formulario rechaza campos de solo espacios. Sin JavaScript a 390 px: enlaces y carrusel nativo presentes, preparación del formulario desactivada.

Capturas de portada y galería en 390/1440 px inspeccionadas. No se probaron Safari, Firefox, lector de pantalla ni dispositivos físicos en esta etapa.

## Próximo paso antes de publicar

1. Elegir hosting y dominio; ejecutar `python3 tools/build_site.py` y publicar únicamente `dist/`.
2. Aplicar y comprobar encabezados en respuestas reales, Content-Type correcto, HTTPS/redirección y compresión Brotli/gzip. Revisar CSP nuevamente si se agrega una integración.
3. Resolver la optimización de imágenes pendiente y repetir el mismo perfil lento. Después de publicar, revisar datos de visitas reales cuando exista muestra suficiente, junto con pruebas Safari/Firefox y móvil físico.
4. Revisión humana breve: portada móvil, apertura del menú, recorrido de fotos y claridad del paso a WhatsApp. MailerLite y recursos descargables necesitan aprobación/archivos reales.

## Evidencia y reversión

`antes.json`, `despues.json`: resultados por repetición, recursos/tiempos/bytes y verificaciones. `interacciones.json`: duraciones de eventos y teclado. `seguridad.json`: encabezados, flujo bajo CSP y prueba bloqueada. `revision-estatica.json`: alcance del escaneo y hashes. Capturas de portada y galería junto a este informe. No se generó un informe Lighthouse ni se consultó CrUX/WebPageTest para una URL pública.

Para revertir solo esta corrección: retirar las precargas agregadas, devolver navegación/galería a sus scripts diferidos en head y retirar `contain: layout paint` de `.gallery-grid`. Conservar los cambios visuales anteriores del usuario; no restablecer archivos completos desde Git porque contienen trabajo previo. El paquete se regenera; no modifica originales. La configuración de seguridad puede ajustarse en el script según el hosting.

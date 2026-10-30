# Corrección de rutas — 30 de octubre de 2026

Se compararon el HTML, CSS e importaciones JS de GitHub con los nombres exactos del árbol remoto: 63 referencias locales. Veinte rutas de la galería usaban Unicode descompuesto (NFD), mientras Git almacena los nombres compuestos (NFC). Dos referencias de portada apuntaban a header-iamgen.jpg, ausente en GitHub; el recurso remoto existente es imagen_header-cecilia.jpg. El parche corrige esas referencias sin cambiar fotografías ni diseño. Tras la corrección propuesta, las 63 referencias coinciden exactamente. No se comprobaron destinos externos ni funcionalidades ajenas a los recursos.

El armado ahora rechaza URLs no normalizadas, nombres con mayúsculas incorrectas y archivos ausentes; copia nombres NFC al paquete público. Cuatro pruebas de regresión pasan. El paquete local se generó con 273 archivos públicos; todos respondieron HTTP 200. Las variantes responsive preexistentes en el directorio local no se agregan al parche remoto. El generador local se ajustó para emitir URLs NFC. Los cambios locales anteriores se conservaron.

Se consultaron la búsqueda y guía HTML de Modern Web Guidance (apartado de imágenes). Vanilla_Web_v6.pdf no está en la raíz durante esta revisión y no pudo releerse; no se atribuye una nueva revisión del libro. Sin pruebas visuales nuevas de navegador ni verificación de decodificación de imágenes.

La revisión automática rechazó escribir directamente en main por falta de autorización explícita para ese destino. La integración GitHub además respondió 403 al intentar crear una rama para un PR. GitHub permanece sin cambios. El parche está preparado contra el contenido remoto consultado y requiere autorización para aplicarlo a main.

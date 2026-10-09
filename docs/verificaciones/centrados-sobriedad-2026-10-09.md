# Centrado puntual y acabado sobrio

Pedido: centrar el bloque de redes de contacto, el título de organizaciones, los botones de consulta de Servicios y el título/bajada de Recursos. Aplicado mediante reglas CSS específicas, conservando a la izquierda los párrafos de lectura restantes y sin justificación.

La portada ya usa fondo azul claro sólido `#eef3f9`, sin degradado visible. Se refuerza el predominio azul/blanco mediante iconos de ventajas azules, borde de retrato azul tenue y títulos del enfoque/footer en blanco humo. Contacto usa Montserrat en su título; Dancing Script se conserva como destaque en portada, testimonios y galería. El rosa permanece como acento en botones, detalles y estados de foco/error.

Referencias: Modern Web Guidance, búsqueda y recuperación en caché de `color` y `typography`. Página física 48 de Vanilla Web v6 revisada previamente en esta conversación sobre accesibilidad; revisión parcial del libro.

Comprobación estática de las cinco alineaciones solicitadas y `git diff --check`. Contrastes calculados: azul sobre azul claro 11,24:1; blanco humo sobre azul 11,51:1; blanco sobre rosa 5,12:1. No se ejecutaron pruebas nuevas de navegador en esta conversación lateral. Solo CSS; sin cambios en estructura, contenido, fotos, fuentes o JavaScript.

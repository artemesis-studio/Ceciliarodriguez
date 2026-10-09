# Sistema visual

La web usa una base pequeña de tokens Vanilla CSS en `styles/main.css` y los componentes se refinan en `styles/corrections.css`.

## Tokens principales

- `--blue`: azul profundo de marca.
- `--pink`: rosa intenso para acciones y estados.
- `--blush`: rosa claro para acciones secundarias.
- `--white`: blanco humo para superficies y fondos.
- `--black`: texto oscuro.
- `--space-section`: separación vertical de secciones.
- `--space-card`: padding adaptable de tarjetas.
- `--radius-card`: radios grandes de tarjetas.
- `--radius-control`: radios de campos y controles.
- `--shadow-soft`: sombra suave de superficies.
- `--motion-fast` y `--motion-entrance`: tiempos de interacción y entrada.

## Movimiento

La portada usa una entrada tipográfica breve solo en el texto superior de servicios y el título; los botones y la foto no se animan. «Sobre mí» se revela al entrar en el viewport y la cita muestra un subrayado breve. `scripts/components/motion.js` aplica esas mejoras progresivas sin bloquear la lectura: sin JavaScript el contenido queda visible, y con `prefers-reduced-motion`, ahorro de datos, conexión 2G, batería baja o un dispositivo limitado se desactivan las transformaciones.

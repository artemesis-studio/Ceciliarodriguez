# Preparación de publicación

Ejecutar desde la raíz: `python3 tools/build_site.py`.

Publicar **solo `dist/`**. El comando reemplaza esa carpeta generada tras validar referencias; no cambia las fotografías ni otros originales. Incluye los recursos referenciados y las licencias de fuentes; excluye Git, informes, instrucciones internas y el libro con licencia.

`dist/_headers` es una propuesta de encabezados para proveedores que admiten ese formato. Comprobar su aplicación real al elegir hosting; para otros servidores traducir las reglas. Configurar HTTPS y compresión allí. No ejecutar el servidor Python de pruebas como servidor de producción.

Si se agregan recursos cargados dinámicamente (por ejemplo entradas de `freeResources`), incorporar esos archivos al grafo de construcción y verificar el paquete antes de publicar. El script actual analiza referencias HTML/CSS e importaciones JS estáticas; no ejecuta JavaScript ni interpreta manifiestos futuros. Revalidar CSP al conectar MailerLite. Las imágenes y sus variantes siguen pendientes de aprobación.

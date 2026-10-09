// Add entries when the actual PDFs or audio files are supplied.
// { title: 'Ejercicio de respiración', href: 'assets/resources/respiracion.pdf', format: 'PDF' }
export const freeResources = [];

export function initResources() {
  const container = document.querySelector('#resource-downloads');
  if (!container || freeResources.length === 0) return;
  for (const resource of freeResources) {
    const link = document.createElement('a');
    link.className = 'resource-download';
    link.href = resource.href;
    link.textContent = `${resource.title} · ${resource.format}`;
    link.download = '';
    container.append(link);
  }
  container.hidden = false;
}

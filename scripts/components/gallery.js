// Manual controls work over HTTP and when the HTML is opened as a file.
(function initGallery() {
  const carousel = document.querySelector('.gallery-carousel');
  if (!carousel) return;
  const grid = carousel.querySelector('.gallery-grid');
  const pages = [...grid.querySelectorAll(':scope > .gallery-page')];
  if (pages.length < 2) return;
  const controls = carousel.querySelector('.gallery-controls');
  const position = controls.querySelector('.gallery-position');
  const controller = new AbortController();
  const events = { signal: controller.signal };
  let current = 0;

  pages.forEach((page, index) => { page.hidden = index !== 0; });
  grid.removeAttribute('tabindex');

  function show(index) {
    pages[current].hidden = true;
    pages[current].classList.remove('is-entering');
    current = (index + pages.length) % pages.length;
    pages[current].hidden = false;
    pages[current].classList.add('is-entering');
    position.textContent = `${current + 1} / ${pages.length}`;
  }

  controls.querySelector('.gallery-prev').addEventListener('click', () => {
    show(current - 1);
  }, events);
  controls.querySelector('.gallery-next').addEventListener('click', () => {
    show(current + 1);
  }, events);
  carousel.classList.add('is-ready');
  controls.hidden = false;
  position.textContent = `1 / ${pages.length}`;

  return () => {
    controller.abort();
    controls.hidden = true;
    pages.forEach(page => {
      page.hidden = false;
      page.classList.remove('is-entering');
    });
    grid.setAttribute('tabindex', '0');
    carousel.classList.remove('is-ready');
  };
})();

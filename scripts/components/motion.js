// Progressive motion: content stays readable before and without JavaScript.
export function initMotion() {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection;
  const limitedNetwork = Boolean(connection &&
    (connection.saveData || /slow-2g|2g/.test(connection.effectiveType || "")));
  const cards = document.querySelectorAll(
    ".service-card, .benefit-card, .approach-card, .testimonial-card, .pocket-card",
  );
  const targets = document.querySelectorAll(
    ".about-copy, .about-copy blockquote, .service-card, .benefit-card, .approach-card, .testimonial-card, .pocket-card",
  );
  let observer;

  const updatePreference = () => {
    const minimal = reduce.matches || limitedNetwork;
    root.classList.toggle("motion-minimal", minimal);
    if (minimal) {
      observer?.disconnect();
      targets.forEach((target) => target.classList.add("is-visible"));
    }
  };
  updatePreference();
  cards.forEach((card) => card.classList.add("reveal-card"));
  root.classList.add("motion-ready");
  reduce.addEventListener?.("change", updatePreference);

  if (reduce.matches || limitedNetwork || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  // On touch screens, highlight items as they pass through the centre of the viewport.
  const touch = matchMedia("(hover: none) and (pointer: coarse)");
  if (touch.matches) {
    const touchTargets = document.querySelectorAll(
      ".service-card, .benefit-card, .approach-card, .testimonial-card, .pocket-card, .gallery-item, .about-photo, .hero-image",
    );
    const touchObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("touch-in-view", entry.isIntersecting));
    }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 });
    touchTargets.forEach((target) => touchObserver.observe(target));
    reduce.addEventListener?.("change", () => {
      if (reduce.matches) {
        touchObserver.disconnect();
        touchTargets.forEach((target) => target.classList.remove("touch-in-view"));
      } else {
        touchTargets.forEach((target) => touchObserver.observe(target));
      }
    });
  }

  observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -4%" });
  targets.forEach((target) => observer.observe(target));
}

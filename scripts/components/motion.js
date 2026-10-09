// Lightweight progressive enhancement: the page remains fully readable without JS.
export function initMotion() {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection;
  const limitedDevice =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const limitedNetwork = connection &&
    (connection.saveData || /slow-2g|2g/.test(connection.effectiveType || ""));
  const minimalByEnvironment = Boolean(reduce.matches || limitedDevice || limitedNetwork);

  root.classList.add("motion-ready");
  if (minimalByEnvironment) {
    root.classList.add("motion-minimal");
  }

  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        root.classList.toggle(
          "motion-minimal",
          minimalByEnvironment || (battery.level < 0.2 && !battery.charging),
        );
      };
      updateBattery();
      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    }).catch(() => {});
  }

  const targets = document.querySelectorAll(".about-copy, .about-copy blockquote");
  if (reduce.matches || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8%" },
  );
  targets.forEach((target) => observer.observe(target));

  const updateMotion = () => {
    root.classList.toggle("motion-minimal", minimalByEnvironment || reduce.matches);
  };
  reduce.addEventListener?.("change", updateMotion);
}

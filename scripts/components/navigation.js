// Standalone component: also works when the HTML is opened directly as a file.
(function initNavigation() {
  const nav = document.querySelector(".nav");
  if (!nav || nav.classList.contains("js-ready")) return;
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".nav-links");
  const root = document.documentElement;
  const controller = new AbortController();
  const events = { signal: controller.signal };
  const desktop = matchMedia("(min-width: 801px)");
  const fullBrand = nav.querySelector(".nav-brand-full");
  const marker = document.createElement("span");
  marker.className = "nav-presentation-marker";
  marker.setAttribute("aria-hidden", "true");
  document.body.prepend(marker);

  function measureNavigation() {
    const height = Math.ceil(nav.getBoundingClientRect().height);
    const style = getComputedStyle(nav);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
      + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const expanded = Math.ceil(Math.max(
      fullBrand.getBoundingClientRect().height,
      desktop.matches ? links.getBoundingClientRect().height : 0,
    ) + padding);
    // Layout space stays expanded; only the focus/anchor offset follows the bar.
    for (const [name, value] of [
      ["--nav-height", `${expanded}px`],
      ["--nav-presentation-space", `${expanded}px`],
      ["--nav-visible-height", `${height}px`],
    ]) {
      if (root.style.getPropertyValue(name) !== value)
        root.style.setProperty(name, value);
    }
  }

  function setCompact(compact) {
    nav.classList.toggle("is-compact", compact);
    measureNavigation();
  }

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    measureNavigation();
  }

  nav.classList.add("js-ready");
  root.classList.add("has-nav-presentation");
  document.body.classList.add("has-fixed-nav");
  toggle.hidden = false;
  setCompact(window.scrollY > 80);

  // A fixed document marker avoids layout feedback and high-frequency scroll work.
  const scrollObserver = new IntersectionObserver(([entry]) => {
    setCompact(entry.boundingClientRect.top < 0);
  });
  scrollObserver.observe(marker);

  toggle.addEventListener(
    "click",
    () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      links.classList.toggle("is-open", open);
      measureNavigation();
    },
    events,
  );

  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      setCompact(anchor.hash !== "#inicio");
      closeMenu();
      if (location.hash !== anchor.hash)
        history.pushState(null, "", anchor.hash);
      const heading = target.querySelector("h1, h2") || target;
      if (!heading.hasAttribute("tabindex"))
        heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant" : "smooth";
      if (anchor.hash === "#inicio") {
        window.scrollTo({ top: 0, behavior });
      } else {
        target.scrollIntoView({ block: "start", behavior });
      }
    },
    events,
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        toggle.focus({ preventScroll: true });
      }
    },
    events,
  );

  // Keep keyboard focus below the fixed bar, including after text enlargement.
  document.addEventListener(
    "focusin",
    (event) => {
      const target = event.target;
      if (
        nav.contains(target) ||
        target.matches(".skip-link") ||
        target.tabIndex < 0
      )
        return;
      const top = target.getBoundingClientRect().top;
      const barBottom = nav.getBoundingClientRect().bottom;
      if (top < barBottom + 12) {
        window.scrollBy({ top: top - barBottom - 16, behavior: "instant" });
      }
    },
    events,
  );

  desktop.addEventListener("change", closeMenu, events);
  const observer = new ResizeObserver(measureNavigation);
  observer.observe(nav);
  observer.observe(fullBrand);
  observer.observe(links);

  return () => {
    controller.abort();
    observer.disconnect();
    scrollObserver.disconnect();
    marker.remove();
    nav.classList.remove("js-ready");
    nav.classList.remove("is-compact");
    root.classList.remove("has-nav-presentation");
    document.body.classList.remove("has-fixed-nav");
    toggle.hidden = true;
    root.style.removeProperty("--nav-height");
    root.style.removeProperty("--nav-presentation-space");
    root.style.removeProperty("--nav-visible-height");
  };
})();

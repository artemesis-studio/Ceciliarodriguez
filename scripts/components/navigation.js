// The links remain native anchors; JavaScript adds menu and focus behavior.
export function initNavigation() {
  const nav = document.querySelector(".nav");
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".nav-links");
  const root = document.documentElement;
  const controller = new AbortController();
  const events = { signal: controller.signal };
  const desktop = matchMedia("(min-width: 801px)");

  function measureNavigation() {
    const height = Math.ceil(nav.getBoundingClientRect().height);
    const value = `${height}px`;
    if (root.style.getPropertyValue("--nav-height") !== value) {
      root.style.setProperty("--nav-height", value);
    }
  }

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    measureNavigation();
  }

  nav.classList.add("js-ready");
  document.body.classList.add("has-fixed-nav");
  toggle.hidden = false;
  measureNavigation();

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
      closeMenu();
      if (location.hash !== anchor.hash)
        history.pushState(null, "", anchor.hash);
      const heading = target.querySelector("h1, h2") || target;
      if (!heading.hasAttribute("tabindex"))
        heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      target.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
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

  return () => {
    controller.abort();
    observer.disconnect();
    nav.classList.remove("js-ready");
    document.body.classList.remove("has-fixed-nav");
    toggle.hidden = true;
    root.style.removeProperty("--nav-height");
  };
}

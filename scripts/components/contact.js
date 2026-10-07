// Prepare a draft only. The visitor reviews and sends it from WhatsApp.
export function initContact() {
  const form = document.querySelector("#contact-form");
  const status = form.querySelector(".form-status");
  const draft = form.querySelector(".draft-link");
  const button = form.querySelector('button[type="submit"]');
  const fields = [...form.querySelectorAll("input, textarea")];
  const touched = new WeakSet();
  const controller = new AbortController();
  const events = { signal: controller.signal };
  const messages = {
    name: "Completá tu nombre; no puede contener solo espacios.",
    email: "Ingresá un email válido.",
    message:
      "Contame qué te gustaría trabajar; no puede contener solo espacios.",
  };

  function validate(field) {
    if (field.id === "name" || field.id === "message") {
      field.setCustomValidity(field.value.trim() ? "" : messages[field.id]);
    }
    return field.validity.valid;
  }

  function syncError(field, reveal = false) {
    const invalid = !validate(field) && (reveal || touched.has(field));
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", `${field.id}-error`);
    } else {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }
  }

  function invalidateDraft() {
    draft.hidden = true;
    draft.removeAttribute("href");
    status.textContent = "";
  }

  form.addEventListener(
    "input",
    (event) => {
      const field = event.target;
      if (!fields.includes(field)) return;
      invalidateDraft();
      syncError(field);
    },
    events,
  );

  form.addEventListener(
    "blur",
    (event) => {
      const field = event.target;
      if (!fields.includes(field)) return;
      touched.add(field);
      syncError(field, true);
    },
    { ...events, capture: true },
  );

  form.addEventListener(
    "invalid",
    (event) => {
      const field = event.target;
      if (!fields.includes(field)) return;
      touched.add(field);
      syncError(field, true);
    },
    { ...events, capture: true },
  );

  document.querySelectorAll("[data-service]").forEach((anchor) => {
    anchor.addEventListener(
      "click",
      () => {
        form.elements.message.value = `Me interesa ${anchor.dataset.service}. `;
        syncError(form.elements.message);
        invalidateDraft();
      },
      events,
    );
  });

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      fields.forEach((field) => syncError(field, true));
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = `Hola Cecilia, soy ${data.get("name").trim()}.\nMi email es ${data.get("email").trim()}.\n\n${data.get("message").trim()}`;
      draft.href = `https://wa.me/5492995751684?text=${encodeURIComponent(message)}`;
      draft.hidden = false;
      status.textContent =
        "Tu consulta está preparada. Paso 2: abrí WhatsApp para revisarla y enviarla.";
      draft.focus();
    },
    events,
  );

  form.addEventListener(
    "reset",
    () => {
      invalidateDraft();
      fields.forEach((field) => {
        touched.delete(field);
        field.setCustomValidity("");
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      });
    },
    events,
  );

  button.disabled = false;
  return () => {
    controller.abort();
    invalidateDraft();
    button.disabled = true;
  };
}

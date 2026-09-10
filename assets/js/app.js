function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-sitio");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function setCurrentYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

function mostrarErrorCampo(form, campoId, mensaje) {
  const campo = form.querySelector(`#${campoId}`);
  const error = form.querySelector(`[data-error-for="${campoId}"]`);

  if (campo) {
    campo.classList.toggle("is-invalid", Boolean(mensaje));
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
  }

  if (error) {
    error.textContent = mensaje || "";
  }
}

function limpiarErroresFormulario(form) {
  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (campo.id) {
      mostrarErrorCampo(form, campo.id, "");
    }
  });
}

function mensajeErrorCampo(campo, form) {
  const valor = campo.value.trim();
  const tipo = campo.dataset.validate;

  if (campo.required && !valor) {
    return "Este campo es obligatorio.";
  }

  if (!valor) {
    return "";
  }

  if (tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    return "Ingresa un correo válido.";
  }

  if (tipo === "password" && valor.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  if (tipo === "nombre" && valor.length < 2) {
    return "Ingresa al menos 2 caracteres.";
  }

  if (tipo === "telefono" && valor.replace(/\D/g, "").length < 8) {
    return "Ingresa un teléfono válido.";
  }

  if (tipo === "password2") {
    const original = form.querySelector("#password-reg");
    if (original && valor !== original.value) {
      return "Las contraseñas no coinciden.";
    }
  }

  if (campo.minLength > 0 && valor.length < campo.minLength) {
    return `Escribe al menos ${campo.minLength} caracteres.`;
  }

  return "";
}

function validarFormulario(form) {
  let valido = true;
  limpiarErroresFormulario(form);

  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (!campo.id) return;
    const mensaje = mensajeErrorCampo(campo, form);
    if (mensaje) {
      mostrarErrorCampo(form, campo.id, mensaje);
      valido = false;
    }
  });

  return valido;
}

function mostrarMensajeFormulario(elemento, texto, ok) {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.classList.toggle("is-ok", Boolean(ok));
  elemento.classList.toggle("is-error", !ok);
}

function initFormularios() {
  document.querySelectorAll("form.form-card").forEach((form) => {
    form.querySelectorAll("input, select, textarea").forEach((campo) => {
      campo.addEventListener("blur", () => {
        mostrarErrorCampo(form, campo.id, mensajeErrorCampo(campo, form));
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  setCurrentYear();
  initFormularios();
});

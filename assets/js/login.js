document.addEventListener("DOMContentLoaded", () => {
    initRolesLogin();
    initFormLogin();
    initFormRegistro();
});

function initRolesLogin() {
    const chips = document.querySelectorAll(".login-roles .chip");
    const selectRol = document.querySelector("#rol");
    if (!chips.length || !selectRol) return;

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((item) => item.classList.remove("is-active"));
            chip.classList.add("is-active");
            selectRol.value = chip.dataset.rol || "";
            mostrarErrorCampo(selectRol.form, selectRol.id, "");
        });
    });

    selectRol.addEventListener("change", () => {
        chips.forEach((chip) => {
            chip.classList.toggle("is-active", chip.dataset.rol === selectRol.value);
        });
    });
}

function initFormLogin() {
    const form = document.querySelector("#form-login");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const mensaje = form.querySelector(".form-msg");

        if (!validarFormulario(form)) {
            mostrarMensajeFormulario(mensaje, "Revisa los campos marcados.", false);
            return;
        }

        const email = form.querySelector("#email").value.trim();
        const rol = form.querySelector("#rol").value;
        const nombresRol = {
            administrador: "administradora",
            operadora: "operadora",
            repartidor: "repartidor",
            cliente: "cliente"
        };

        sessionStorage.setItem("volcan-sesion", JSON.stringify({ email, rol }));
        mostrarMensajeFormulario(
            mensaje,
            `Ingreso correcto como ${nombresRol[rol] || rol}. Bienvenida/o, ${email}.`,
            true
        );
    });
}

function initFormRegistro() {
    const form = document.querySelector("#form-registro");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const mensaje = form.querySelector(".form-msg");

        if (!validarFormulario(form)) {
            mostrarMensajeFormulario(mensaje, "Revisa los campos marcados.", false);
            return;
        }

        const usuario = {
            nombre: form.querySelector("#nombre").value.trim(),
            email: form.querySelector("#email-reg").value.trim(),
            telefono: form.querySelector("#telefono").value.trim()
        };

        const usuarios = JSON.parse(localStorage.getItem("volcan-usuarios") || "[]");
        const existe = usuarios.some((item) => item.email.toLowerCase() === usuario.email.toLowerCase());

        if (existe) {
            mostrarErrorCampo(form, "email-reg", "Este correo ya está registrado.");
            mostrarMensajeFormulario(mensaje, "No se pudo crear la cuenta.", false);
            return;
        }

        usuarios.push(usuario);
        localStorage.setItem("volcan-usuarios", JSON.stringify(usuarios));
        form.reset();
        limpiarErroresFormulario(form);
        mostrarMensajeFormulario(mensaje, "Cuenta creada. Ya puedes ingresar con tu correo.", true);
    });
}

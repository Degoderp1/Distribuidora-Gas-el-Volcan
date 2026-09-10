document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-contacto");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const mensaje = form.querySelector(".form-msg");

        if (!validarFormulario(form)) {
            mostrarMensajeFormulario(mensaje, "Revisa los campos marcados.", false);
            return;
        }

        form.reset();
        limpiarErroresFormulario(form);
        mostrarMensajeFormulario(
            mensaje,
            "Mensaje enviado. La operadora te contactará a la brevedad.",
            true
        );
    });
});

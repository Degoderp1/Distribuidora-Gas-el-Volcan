const productos = [
    { codigo: "CL001", nombre: "Cilindro GLP 5 kg", precio: 6500 },
    { codigo: "CL002", nombre: "Cilindro GLP 11 kg", precio: 12000 },
    { codigo: "CL003", nombre: "Cilindro GLP 15 kg", precio: 16000 },
    { codigo: "CL004", nombre: "Cilindro GLP 45 kg", precio: 45000 },
    { codigo: "RG001", nombre: "Regulador doméstico estándar", precio: 8990 },
    { codigo: "RG002", nombre: "Regulador de alta presión", precio: 18990 },
    { codigo: "RG003", nombre: "Regulador dual (2 salidas)", precio: 14990 },
    { codigo: "MG001", nombre: "Manguera gas 1.5 m", precio: 3990 },
    { codigo: "MG002", nombre: "Manguera gas 3 m", precio: 6990 },
    { codigo: "MG003", nombre: "Abrazadera metálica", precio: 990 },
    { codigo: "MG004", nombre: "Kit conexión completo", precio: 12990 },
    { codigo: "AC001", nombre: "Carro porta cilindro 11/15 kg", precio: 12990 },
    { codigo: "AC002", nombre: "Tapa protectora para válvula", precio: 1490 },
    { codigo: "AC003", nombre: "Detector de gas a batería", precio: 19990 }
];

const carrito = [];

function formatoPrecio(valor) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(valor);
}

function renderCarrito() {
    const contenedor = document.querySelector("#carrito-pedido");
    const totalElemento = document.querySelector("#total-pedido");

    if (!contenedor || !totalElemento) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">No has agregado productos.</p>';
        totalElemento.textContent = formatoPrecio(0);
        return;
    }

    contenedor.innerHTML = carrito.map((item, indice) => `
        <div class="carrito-item">
            <span>${item.nombre}</span>
            <span class="carrito-cantidad">x ${item.cantidad}</span>
            <strong>${formatoPrecio(item.precio * item.cantidad)}</strong>
            <button class="quitar-producto" type="button" data-indice="${indice}" aria-label="Quitar ${item.nombre}">×</button>
        </div>
    `).join("");

    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    totalElemento.textContent = formatoPrecio(total);

    contenedor.querySelectorAll(".quitar-producto").forEach(boton => {
        boton.addEventListener("click", () => {
            carrito.splice(Number(boton.dataset.indice), 1);
            renderCarrito();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#pedido-form");
    const selector = document.querySelector("#producto-pedido");
    const cantidad = document.querySelector("#cantidad-pedido");
    const botonAgregar = document.querySelector("#agregar-producto");
    const mensaje = document.querySelector("#pedido-mensaje");

    if (!form || !selector || !cantidad || !botonAgregar) return;

    selector.innerHTML = productos.map(producto => `
        <option value="${producto.codigo}">
            ${producto.nombre} - ${formatoPrecio(producto.precio)}
        </option>
    `).join("");

    const params = new URLSearchParams(window.location.search);
    const productoInicial = params.get("producto");
    if (productoInicial && productos.some(producto => producto.codigo === productoInicial)) {
        selector.value = productoInicial;
    }

    botonAgregar.addEventListener("click", () => {
        const producto = productos.find(p => p.codigo === selector.value);
        const cantidadNumero = Number(cantidad.value);

        if (!producto || cantidadNumero < 1) return;

        const existente = carrito.find(item => item.codigo === producto.codigo);
        if (existente) {
            existente.cantidad += cantidadNumero;
        } else {
            carrito.push({
                ...producto,
                cantidad: cantidadNumero
            });
        }

        cantidad.value = 1;
        mensaje.textContent = `${producto.nombre} agregado al pedido.`;
        renderCarrito();
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (carrito.length === 0) {
            mensaje.textContent = "Agrega al menos un producto al pedido.";
            return;
        }

        const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
        mensaje.textContent = `Pedido recibido. Total: ${formatoPrecio(total)}.`;
    });

    renderCarrito();
});

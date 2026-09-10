document.addEventListener("DOMContentLoaded", () => {
    initCatalogo();
});

function initCatalogo() {
    const grid = document.querySelector("#catalogo-grid");
    const buscador = document.querySelector("#buscar-producto");

    if (!grid) return;

    const productos = [
        {
            codigo: "CL001",
            nombre: "Cilindro GLP 5 kg",
            categoria: "Cilindros de gas",
            imagen: "assets/img/CL001.jpg"
        },
        {
            codigo: "CL002",
            nombre: "Cilindro GLP 11 kg",
            categoria: "Cilindros de gas",
            imagen: "assets/img/CL002.jpg"
        },
        {
            codigo: "CL003",
            nombre: "Cilindro GLP 15 kg",
            categoria: "Cilindros de gas",
            imagen: "assets/img/CL003.jpg"
        },
        {
            codigo: "CL004",
            nombre: "Cilindro GLP 45 kg",
            categoria: "Cilindros de gas",
            imagen: "assets/img/CL004.jpg"
        },
        {
            codigo: "RG001",
            nombre: "Regulador doméstico estándar",
            categoria: "Reguladores",
            imagen: "assets/img/RG001.jpg"
        },
        {
            codigo: "RG002",
            nombre: "Regulador de alta presión",
            categoria: "Reguladores",
            imagen: "assets/img/RG002.jpg"
        },
        {
            codigo: "RG003",
            nombre: "Regulador dual (2 salidas)",
            categoria: "Reguladores",
            imagen: "assets/img/RG003.jpg"
        },
        {
            codigo: "MG001",
            nombre: "Manguera de gas 1,5 m",
            categoria: "Mangueras",
            imagen: "assets/img/MG001.jpg"
        },
        {
            codigo: "MG002",
            nombre: "Manguera de gas 3 m",
            categoria: "Mangueras",
            imagen: "assets/img/MG002.jpg"
        },
        {
            codigo: "MG003",
            nombre: "Abrazadera metálica",
            categoria: "Accesorios",
            imagen: "assets/img/MG003.jpg"
        },
        {
            codigo: "MG004",
            nombre: "Kit conexión completo",
            categoria: "Accesorios",
            imagen: "assets/img/MG004.jpg"
        },
        {
            codigo: "AC001",
            nombre: "Carro porta cilindro 11/15 kg",
            categoria: "Accesorios",
            imagen: "assets/img/AC001.jpg"
        },
        {
            codigo: "AC002",
            nombre: "Tapa protectora para válvula",
            categoria: "Accesorios",
            imagen: "assets/img/AC002.jpg"
        },
        {
            codigo: "AC003",
            nombre: "Detector de gas a batería",
            categoria: "Seguridad",
            imagen: "assets/img/AC003.jpg"
        }
    ];

    function renderProductos(lista) {
        if (lista.length === 0) {
            grid.innerHTML = '<p class="catalogo-vacio">No encontramos productos con esa búsqueda.</p>';
            return;
        }

        grid.innerHTML = lista.map((producto) => `
            <article class="carta-producto catalogo-card">
                <div class="media-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="body-producto">
                    <span class="producto-categoria">${producto.categoria}</span>
                    <h2>${producto.nombre}</h2>
                    <p class="producto-codigo">Código: ${producto.codigo}</p>
                    <a class="boton" href="pedido.html">Pedir</a>
                </div>
            </article>
        `).join("");
    }

    function filtrarProductos() {
        const texto = buscador.value.trim().toLowerCase();

        const filtrados = productos.filter((producto) => {
            const contenido = `${producto.nombre} ${producto.categoria} ${producto.codigo}`.toLowerCase();
            return contenido.includes(texto);
        });

        renderProductos(filtrados);
    }

    renderProductos(productos);
    buscador.addEventListener("input", filtrarProductos);
}

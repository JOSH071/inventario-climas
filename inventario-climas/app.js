// ================================
// PRODUCTOS Y PRECIOS
// ================================

const productos = {

    cable12: {
        nombre: "Cable calibre 12",
        precio: 18,
        unidad: "metros"
    },

    cable10: {
        nombre: "Cable calibre 10",
        precio: 25,
        unidad: "metros"
    },

    cable14: {
        nombre: "Cable calibre 14",
        precio: 14,
        unidad: "metros"
    },

    cobre14: {
        nombre: "Tubería de cobre 1/4",
        precio: 95,
        unidad: "metros"
    },

    cobre38: {
        nombre: "Tubería de cobre 3/8",
        precio: 125,
        unidad: "metros"
    },

    capacitor: {
        nombre: "Capacitor 35+5 µF",
        precio: 240,
        unidad: "piezas"
    },

    cinta: {
        nombre: "Cinta aislante",
        precio: 35,
        unidad: "piezas"
    },

    manguera: {
        nombre: "Manguera de desagüe",
        precio: 22,
        unidad: "metros"
    }

};


// ================================
// CARRITO
// ================================

let carrito = [];


// ================================
// CALCULAR PRECIO
// ================================

function calcularPrecio() {

    const seleccion =
        document.getElementById("producto").value;

    const cantidad =
        Number(
            document.getElementById("cantidad").value
        );

    const producto =
        productos[seleccion];


    if (cantidad <= 0) {

        document.getElementById(
            "resultado"
        ).textContent =
            "Ingresa una cantidad válida.";

        return;
    }


    const total =
        producto.precio * cantidad;


    document.getElementById(
        "precioUnitario"
    ).textContent =
        `Precio: $${producto.precio.toFixed(2)} MXN por ${producto.unidad}`;


    document.getElementById(
        "resultado"
    ).textContent =
        `${cantidad} ${producto.unidad} de ${producto.nombre} = $${total.toFixed(2)} MXN`;

}


// ================================
// AGREGAR A COTIZACIÓN
// ================================

function agregarAlCarrito() {

    const seleccion =
        document.getElementById("producto").value;

    const cantidad =
        Number(
            document.getElementById("cantidad").value
        );

    const producto =
        productos[seleccion];


    if (cantidad <= 0) {

        alert(
            "Ingresa una cantidad válida."
        );

        return;
    }


    const existente =
        carrito.find(
            item =>
                item.id === seleccion
        );


    if (existente) {

        existente.cantidad += cantidad;

        existente.total =
            existente.precio *
            existente.cantidad;

    } else {

        carrito.push({

            id: seleccion,

            nombre:
                producto.nombre,

            precio:
                producto.precio,

            unidad:
                producto.unidad,

            cantidad:
                cantidad,

            total:
                producto.precio *
                cantidad

        });

    }


    mostrarCarrito();

}


// ================================
// MOSTRAR COTIZACIÓN
// ================================

function mostrarCarrito() {

    const tabla =
        document.getElementById(
            "tablaCarrito"
        );


    tabla.innerHTML = "";


    let totalGeneral = 0;


    carrito.forEach(
        (item, index) => {

            totalGeneral +=
                item.total;


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    ${item.nombre}
                </td>

                <td>
                    $${item.precio.toFixed(2)}
                </td>

                <td>
                    ${item.cantidad} ${item.unidad}
                </td>

                <td>
                    $${item.total.toFixed(2)}
                </td>

                <td>

                    <button
                        onclick="eliminarProducto(${index})"
                    >
                        Eliminar
                    </button>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        }
    );


    document.getElementById(
        "totalCarrito"
    ).textContent =
        `Total cotización: $${totalGeneral.toFixed(2)} MXN`;

}


// ================================
// ELIMINAR PRODUCTO
// ================================

function eliminarProducto(index) {

    carrito.splice(
        index,
        1
    );


    mostrarCarrito();

}


// ================================
// LIMPIAR COTIZACIÓN
// ================================

function limpiarCotizacion() {

    carrito = [];


    mostrarCarrito();

}


// ================================
// OCULTAR PRECIO AL CAMBIAR DATOS
// ================================

function limpiarCalculo() {

    document.getElementById(
        "precioUnitario"
    ).textContent =
        "Precio unitario: ---";


    document.getElementById(
        "resultado"
    ).textContent =
        'Presiona "Calcular precio"';

}


// Cuando cambia el producto

document.getElementById(
    "producto"
).addEventListener(
    "change",
    limpiarCalculo
);


// Cuando cambia la cantidad

document.getElementById(
    "cantidad"
).addEventListener(
    "input",
    limpiarCalculo
);
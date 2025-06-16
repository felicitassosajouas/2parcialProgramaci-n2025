// SINGLETON con ITERATOR
const Carrito = (function () {
    let instancia;

    function crearInstancia() {
        const productos = [];

        return {
        agregar: function (producto) {
            productos.push(producto);
        },
        obtener: function () {
            return productos;
        },
        vaciar: function () {
            productos.length = 0;
        },
        crearIterador: function () {
            let indice = 0;
            return {
            hasNext: function () {
                return indice < productos.length;
            },
            next: function () {
                return this.hasNext() ? productos[indice++] : null;
            }
            };
        }
        };
    }

    return {
        getInstancia: function () {
        if (!instancia) {
            instancia = crearInstancia();
        }
        return instancia;
        }
    };
    })();

    function agregarProducto(nombre) {
    const carrito = Carrito.getInstancia();
    carrito.agregar(nombre);
    alert(`Producto agregado: ${nombre}`);
    }

    function mostrarCarrito() {
    const carrito = Carrito.getInstancia();
    const productos = carrito.obtener();
    document.getElementById("carrito").innerHTML =
        `<strong>Productos en el carrito:</strong><br>${productos.join(", ")}`;
    }

    function recorrerConIterator() {
    const carrito = Carrito.getInstancia();
    const iterador = carrito.crearIterador();
    let resultado = "<strong>Iterando productos:</strong><br>";

    while (iterador.hasNext()) {
        resultado += "- " + iterador.next() + "<br>";
    }

    document.getElementById("carrito").innerHTML = resultado;
    }

    function vaciarCarrito() {
    const carrito = Carrito.getInstancia();
    carrito.vaciar();
    document.getElementById("carrito").innerHTML = "<strong>El carrito está vacío.</strong>";
}

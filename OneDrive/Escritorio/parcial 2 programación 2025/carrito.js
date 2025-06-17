// SINGLETON con ITERATOR
const Carrito = (function () {
    let instancia; //privada: guardará la única instancia de "Carrito"

    //CREAR INSTANCIA
    function crearInstancia() {
        const productos = [];

        return { //crearInstancia() devuelve objeto con todos los métodos públicos
            //FUNCIONES QUE SE VAN A LLAMAR DEPENDIENDO DE LO QUE SE REQUIERA
            agregar: function (producto) {
                productos.push(producto); //agrega producto al array
            },
            obtener: function () {
                return productos; //devuelve array completo
            },
            vaciar: function () {
                productos.length = 0; //borra todos los elementos del array
            },

            //CREO EL ITERATOR 
            crearIterador: function () {
                let indice = 0;
                return {
                    hasNext: function () {
                        return indice < productos.length;
                    },
                    next: function () {
                        if (this.hasNext()) {
                            return productos[indice++];
                        } else {
                            let mensaje = "El carrito está vacío"
                            return mensaje;
                        }
                    }
                };
            }
        };
    }
    //SINGLETON
    return {
        getInstancia: function () {
            if (!instancia) { // si no existe (false) instancia, la crea
                instancia = crearInstancia();
            }
            return instancia; // si existe, siempre retornará esa
        }
    };
})();

function agregarProducto(nombre) {
    const carrito = Carrito.getInstancia();
    carrito.agregar(nombre);
}

function mostrarCarrito() {
    const carrito = Carrito.getInstancia();
    const productos = carrito.obtener();
    document.getElementById("carrito").innerHTML =
        `<strong>Productos en el carrito:</strong><br>${productos.join(", ")}`;
}

//ITERATOR
function recorrerConIterator() { //Encapsula la forma de recorrer la colección productos
    const carrito = Carrito.getInstancia();
    const iterador = carrito.crearIterador();

    let resultado = "<strong>Iterando productos:</strong><br>";

    while (iterador.hasNext()) { //Método hasNext()
        resultado += "- " + iterador.next() + "<br>"; //Método next()
    }

    document.getElementById("carrito").innerHTML = resultado;
}

function vaciarCarrito() {
    const carrito = Carrito.getInstancia();
    carrito.vaciar(); //llama a esa función
    document.getElementById("carrito").innerHTML = "<strong>El carrito está vacío.</strong>";
}

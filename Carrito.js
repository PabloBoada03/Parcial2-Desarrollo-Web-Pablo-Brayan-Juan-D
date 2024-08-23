class Carrito {
    constructor() {
        this.items = [];
        this.subtotal = 0;
        this.impuesto = 0.19; // 19% de impuesto, por ejemplo
        this.contenedorOrdenes = document.getElementById('ordenes');
        this.contenedorSubtotal = document.querySelectorAll('.costo')[0];
        this.contenedorImpuesto = document.querySelectorAll('.costo')[1];
    }

    agregarPlato(plato) {
        // Verificar si el plato ya está en el carrito
        let item = this.items.find(item => item.id === plato.id);

        if (item) {
            // Si ya está en el carrito, incrementamos la cantidad
            item.cantidad++;
        } else {
            // Si no está, lo agregamos
            this.items.push({
                id: plato.id,
                nombre: plato.informacion.nombre,
                precio: plato.informacion.precio,
                cantidad: 1
            });
        }

        this.actualizarCarrito();
    }

    actualizarCarrito() {
        // Resetear subtotal
        this.subtotal = 0;

        // Calcular el nuevo subtotal y actualizar la vista
        this.items.forEach(item => {
            this.subtotal += item.precio * item.cantidad;
        });

        // Mostrar las órdenes en el carrito
        this.mostrarOrdenes();

        // Actualizar subtotal en la vista
        this.contenedorSubtotal.textContent = `$${this.subtotal.toFixed(2)}`;
        
        // Calcular y mostrar el impuesto
        const totalImpuesto = this.subtotal * this.impuesto;
        this.contenedorImpuesto.textContent = `$${totalImpuesto.toFixed(2)}`;
    }

    mostrarOrdenes() {
        // Limpiar el contenedor antes de actualizar
        this.contenedorOrdenes.innerHTML = '';

        // Agregar cada ítem al contenedor de órdenes
        this.items.forEach(item => {
            const elementoOrden = document.createElement('div');
            elementoOrden.classList.add('ordenItem');

            const nombre = document.createElement('span');
            nombre.textContent = `${item.nombre} x${item.cantidad}`;
            nombre.classList.add('nombreOrden');

            const precio = document.createElement('span');
            precio.textContent = `$${(item.precio * item.cantidad).toFixed(2)}`;
            precio.classList.add('precioOrden');

            elementoOrden.append(nombre, precio);
            this.contenedorOrdenes.appendChild(elementoOrden);
        });
    }
}

// Instancia global del carrito
const carrito = new Carrito();

// Supongamos que cuando el usuario hace clic en un botón "+", se llama esta función:
function agregarAlCarrito(plato) {
    carrito.agregarPlato(plato);
}

// Asocia la función agregarAlCarrito a los botones "+" de cada plato en tu script principal

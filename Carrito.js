class Carrito {
    constructor() {
        this.items = [];
        this.subtotal = 0;
        this.impuesto = 0.19;
        this.contenedorOrdenes = document.getElementById('ordenes');
        this.contenedorSubtotal = document.querySelectorAll('.costo')[0];
        this.contenedorImpuesto = document.querySelectorAll('.costo')[1];
    }

    agregarPlato(plato) {
        let item = this.items.find(item => item.id == plato.id);

        if (!item) {
            this.items.push(plato);
        } else if (item.cantidad == 0) {
            this.items = this.items.filter(elemento => elemento != item);
        }

        this.actualizarCarrito();

        sessionStorage.setItem('pedido', this.obtenerEnvio());
        sessionStorage.setItem('total', this.subtotal + this.subtotal*this.impuesto);
    }

    actualizarCarrito() {
        this.subtotal = 0;

        this.items.forEach(item => this.subtotal += item.informacion.precio * item.cantidad);

        this.mostrarOrdenes();

        this.contenedorSubtotal.textContent = "$" + this.subtotal.toFixed(2);
        
        const totalImpuesto = this.subtotal * this.impuesto;
        this.contenedorImpuesto.textContent = "$" + totalImpuesto.toFixed(2);

        this.contenedorOrdenes.childNodes.forEach(hijo => {
            hijo.childNodes.forEach(nieto => {
                let claseActiva;

                if (nieto.classList.contains("cantidad")) {
                    nieto.textContent = this.cantidad;
                    claseActiva = "cantidadActiva";
                } else if (nieto.classList.contains("botonMenos")) {
                    claseActiva = "botonMenosActivo";
                } else if (nieto.classList.contains("botonMas")) {
                    claseActiva = "botonMasActivo";
                }
    
                if (claseActiva) {
                    if (this.cantidad > 0) {
                        nieto.classList.add(claseActiva);
                    } else {
                        nieto.classList.remove(claseActiva);
                    }
                }
            });
        });
    }

    mostrarOrdenes() {
        this.contenedorOrdenes.innerHTML = '';

        this.items.forEach(item => {
            const botonMas = document.createElement('button');
            botonMas.textContent = "+";
            botonMas.classList.add('botonMas');
            botonMas.addEventListener('click', (event) => item.modificarCantidad(event));

            const botonMenos = document.createElement('button');
            botonMenos.textContent = "-";
            botonMenos.classList.add('botonMenos');
            botonMenos.addEventListener('click', (event) => item.modificarCantidad(event, "menos"));

            const cantidad = document.createElement('span');
            cantidad.textContent = item.cantidad;
            cantidad.classList.add('cantidad');

            const contenedorCantidad = document.createElement('div');
            contenedorCantidad.classList.add('contenedorCantidad');
            contenedorCantidad.append(botonMenos, cantidad, botonMas);

            const nombre = document.createElement('h3');
            nombre.textContent = `${item.informacion.nombre} (${item.informacion.categoria})`;
            nombre.classList.add('nombre');

            const descripcion = document.createElement('span');
            descripcion.textContent = item.informacion.descripcion;
            descripcion.classList.add('descripcion');

            const precio = document.createElement('span');
            precio.textContent = item.informacion.precio;
            precio.classList.add('precio');

            const elemento = document.createElement('li');
            elemento.setAttribute('id', String(item.id));
            elemento.append(nombre, descripcion, precio, contenedorCantidad);

            this.contenedorOrdenes.appendChild(elemento);
        });
    }

    obtenerEnvio () {
        let envio = [];

        this.items.forEach(item => {
            envio.push({"id":item.id, "informacion":item.informacion, "cantidad":item.cantidad});
        });

        return JSON.stringify(envio);
    }
}

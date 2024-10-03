class Plato {
    constructor(informacion, carritoCompras) {
        this.informacion = informacion;
        this.carritoCompras = carritoCompras;
        this.id = this.informacion.id;
        this.cantidad = 0;
    }

    crearElemento() {
        const botonMas = document.createElement('button');
        botonMas.textContent = "+";
        botonMas.classList.add('botonMas');
        botonMas.addEventListener('click', (event) => this.modificarCantidad(event));

        const botonMenos = document.createElement('button');
        botonMenos.textContent = "-";
        botonMenos.classList.add('botonMenos');
        botonMenos.addEventListener('click', (event) => this.modificarCantidad(event, "menos"));

        const cantidad = document.createElement('span');
        cantidad.textContent = this.cantidad;
        cantidad.classList.add('cantidad');

        const contenedorCantidad = document.createElement('div');
        contenedorCantidad.classList.add('contenedorCantidad');
        contenedorCantidad.append(botonMenos, cantidad, botonMas);

        const nombre = document.createElement('h3');
        nombre.textContent = this.informacion.nombre;
        nombre.classList.add('nombre');

        const descripcion = document.createElement('span');
        descripcion.textContent = this.informacion.descripcion;
        descripcion.classList.add('descripcion');

        const precio = document.createElement('span');
        precio.textContent = this.informacion.precio;
        precio.classList.add('precio');

        const img = document.createElement('img');
        img.setAttribute('src', this.informacion.imgUrl);

        const contenedorImg = document.createElement('div');
        contenedorImg.append(img);
        contenedorImg.classList.add('contenedorImg');

        const elemento = document.createElement('li');
        elemento.setAttribute('id', String(this.id));
        elemento.append(contenedorImg, nombre, descripcion, precio, contenedorCantidad);

        return elemento;
    }

    modificarCantidad(event, tipo = "mas") {
        let cantidad = this.cantidad;
        cantidad += (tipo === "mas") ? 1 : -1;

        if (cantidad >= 0) {
            this.cantidad = cantidad;
        } else {
            return;
        }

        let elementoPadre = event.target.parentElement;

        // Actualiza el carrito
        this.carritoCompras.agregarPlato(this);

        // Actualiza la cantidad en el DOM
        elementoPadre.childNodes.forEach(hijo => {
            if (hijo.classList.contains("cantidad")) {
                hijo.textContent = this.cantidad;
                if (this.cantidad > 0) {
                    hijo.classList.add("cantidadActiva");
                } else {
                    hijo.classList.remove("cantidadActiva");
                }
            } else if (hijo.classList.contains("botonMenos")) {
                if (this.cantidad > 0) {
                    hijo.classList.add("botonMenosActivo");
                } else {
                    hijo.classList.remove("botonMenosActivo");
                }
            } else if (hijo.classList.contains("botonMas")) {
                if (this.cantidad > 0) {
                    hijo.classList.add("botonMasActivo");
                } else {
                    hijo.classList.remove("botonMasActivo");
                }
            }
        });

        let elementoAbuelo = elementoPadre.parentElement;

        if (this.cantidad > 0) {
            elementoAbuelo.classList.add("platoActivo");
        } else {
            elementoAbuelo.classList.remove("platoActivo");
        }
    }
}

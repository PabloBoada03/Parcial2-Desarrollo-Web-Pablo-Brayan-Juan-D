class Plato {
    constructor(informacion, carritoCompras, cantidad=0) {
        this.informacion = informacion;
        this.carritoCompras = carritoCompras;
        this.id = this.informacion.id;
        this.cantidad = cantidad;
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

    modificarCantidad(event, tipo="mas"){
        let cantidad = this.cantidad;
        // console.log(cantidad);
        cantidad += (tipo == "mas") ? 1 : -1;

        if (cantidad >= 0) {
            this.cantidad = cantidad;
        } else {
            return;
        }

        let elementoPadre = event.target.parentElement;
        
        this.carritoCompras.agregarPlato(this); // Verifica que la cantidad del planto sea cero y si es cero lo elimina del carrito de lo contrario lo agrega

        elementoPadre.childNodes.forEach(hijo => {
            let claseActiva;

            if (hijo.classList.contains("cantidad")) {
                hijo.textContent = this.cantidad;
                claseActiva = "cantidadActiva";
            } else if (hijo.classList.contains("botonMenos")) {
                claseActiva = "botonMenosActivo";
            } else if (hijo.classList.contains("botonMas")) {
                claseActiva = "botonMasActivo";
            }

            if (claseActiva) {
                if (this.cantidad > 0) {
                    hijo.classList.add(claseActiva);
                } else {
                    hijo.classList.remove(claseActiva);
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
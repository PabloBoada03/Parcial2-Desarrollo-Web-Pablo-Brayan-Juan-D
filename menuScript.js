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

    modificarCantidad(event, tipo="mas"){
        let cantidad = this.cantidad;
        cantidad += (tipo == "mas") ? 1 : -1;

        if (cantidad >= 0) {
            this.cantidad = cantidad;
        } else {
            return;
        }

        let elementoPadre = event.target.parentElement;
        
        this.carritoCompras.agregarPlato(this);

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

window.onload = () => {

    const menu = document.getElementById('menu');
    let platos = [];
    const carrito = new Carrito();

    informacionPlatos.forEach(informacion => {
        platos.push(new Plato(informacion, carrito));
    })

    let parametrosBusqueda = new URLSearchParams(window.location.search);

    if (!parametrosBusqueda.get('categoria')) {
        window.history.pushState({ categoria: "entrada" }, '', "?categoria=entrada");
    }

    const pestañas = document.getElementById('pestañas');

    pestañas.children.item(0).childNodes.forEach(pestaña => {
        pestaña.addEventListener('click', (event) => {
            let categoria = event.target.id;
            let nuevaCategoria = "?categoria=" + categoria;

            let padre = event.target.parentElement;
            padre.childNodes.forEach(hijo => {
                hijo.classList?.remove("pestañaActiva");
            })

            event.target.classList.add("pestañaActiva");

            window.history.pushState({ categoria }, '', nuevaCategoria);
            mostrarPestañas(platos);
        })

        parametrosBusqueda = new URLSearchParams(window.location.search); 

        if (pestaña.id == parametrosBusqueda.get('categoria')) {
            pestaña.click();
        }
    });

    const enviar = document.getElementById('submit');
    console.log(enviar);

    enviar.addEventListener('click', () => {
        let envio = carrito.obtenerEnvio();

        if (envio != "[]") {
            window.location.href = "index.html?=envio" + envio;
        }
    });

    mostrarPestañas(platos);
}

function mostrarPestañas (platos) {
    const contenedor = document.createElement('ul');
    const parametrosBusqueda = new URLSearchParams(window.location.search);

    platos.forEach(plato => {
        let categoriaActual = parametrosBusqueda.get('categoria') ?? 'entrada';
        if (plato.informacion.categoria.toLowerCase() == categoriaActual) {
            let platoCreado = plato.crearElemento();

            platoCreado.childNodes.forEach(hijo => {
                if (hijo.classList == "contenedorCantidad") {
                    hijo.childNodes.forEach(nieto => {
                        if (nieto.classList.contains("cantidad") && plato.cantidad > 0) {
                            nieto.classList.add("cantidadActiva");
                        } else if (nieto.classList.contains("botonMenos") && plato.cantidad > 0) {
                            nieto.classList.add("botonMenosActivo");
                        } else if (nieto.classList.contains("botonMas") && plato.cantidad > 0) {
                            nieto.classList.add("botonMasActivo");
                        }
                    });
                }
            });

            if (plato.cantidad > 0) {
                platoCreado.classList.add("platoActivo");
            }     

            contenedor.append(platoCreado);
        }
    });

    menu.innerHTML = '';
    menu.append(contenedor);

}



// obtener platos
// instanciarlos
// agregarlos dependiendo de su categoría
// agregarles el event Listener de sus botones
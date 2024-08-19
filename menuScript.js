import { platos as informacionPlatos } from './platos.js';



class Plato {
    constructor(informacion) {
        this.informacion = informacion;
        this.id = this.informacion.id;
        this.cantidad = 0;
    }

    crearElemento() {

        const masBoton = document.createElement('button');
        masBoton.textContent = "+";
        masBoton.classList.add('masBoton');
        masBoton.addEventListener('click', () => this.modificarCantidad());

        const menosBoton = document.createElement('button');
        menosBoton.textContent = "-";
        menosBoton.classList.add('menosBoton');
        menosBoton.addEventListener('click', () => this.modificarCantidad("menos"));

        const cantidad = document.createElement('span');
        cantidad.textContent = this.cantidad;
        cantidad.classList.add('cantidad');

        const contenedorCantidad = document.createElement('div');
        contenedorCantidad.classList.add('contenedorCantidad');
        contenedorCantidad.append(masBoton, cantidad, menosBoton);

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

    modificarCantidad(tipo="mas"){
        let cantidad = this.cantidad;
        cantidad += (tipo == "mas") ? 1 : -1;

        if (cantidad >= 0) {
            this.cantidad = cantidad;
        } else {
            return;
        }

        const elementoTemporal = document.getElementById(this.id);

        elementoTemporal.childNodes.forEach(hijo => {
            if (hijo.classList == "contenedorCantidad") {
                hijo.childNodes.forEach(nieto => {
                    if (nieto.classList == "cantidad") {
                        nieto.textContent = this.cantidad;
                        return
                    }
                })
            }
        });
    }
}

window.onload = () => {

    const pestañas = document.getElementById('pestañas');
    const menu = document.getElementById('menu');
    let platos = [];

    informacionPlatos.forEach(informacion => {
        platos.push(new Plato(informacion));
    })

    mostrarPestañas(platos);

    pestañas.children.item(0).childNodes.forEach(pestaña => {
        pestaña.addEventListener('click', (event) => {
            let categoria = event.target.id;
            let nuevaCategoria = "?categoria=" + categoria;

            window.history.pushState({ categoria }, '', nuevaCategoria);
            mostrarPestañas(platos);
        })
    });
}

function mostrarPestañas (platos) {
    console.log("mostrando pestañas....");
    const contenedor = document.createElement('ul');
    
    const parametrosBusqueda = new URLSearchParams(window.location.search);

    platos.forEach(plato => {
        let categoriaActual = parametrosBusqueda.get('categoria') ?? 'entrante';
        if (plato.informacion.categoria.toLowerCase() == categoriaActual) {
            contenedor.append(plato.crearElemento());
        }
    });

    menu.innerHTML = '';
    menu.append(contenedor);

}



// obtener platos
// instanciarlos
// agregarlos dependiendo de su categoría
// agregarles el event Listener de sus botones
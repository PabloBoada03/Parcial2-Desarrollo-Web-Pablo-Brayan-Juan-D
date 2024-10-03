window.onload = () => {
    // Extrae la información de los platos
    let platos = [];
    const carrito = new Carrito();
    informacionPlatos.forEach(informacion => platos.push(new Plato(informacion, carrito)));

    // Se obtienen los datos almacenados en localStorage
    carrito.items = obtenerPedidoAlmacenado(carrito);
    // console.log(carrito.items);
    carrito.actualizarCarrito();

    // Se actualizan los platos de la base de datos con la información almacenada en localStorage
    actualizarCantidadPlatos(platos, carrito.items);

    // Chequea que categoría se desea ver
    let parametrosBusqueda = new URLSearchParams(window.location.search);
    if (!parametrosBusqueda.get('categoria')) {
        window.history.pushState({ categoria: "entrada" }, '', "?categoria=entrada");
    }

    // Asigna funcionalidad a las pestañas
    const pestañas = document.getElementById('pestañas');
    pestañas.children.item(0).childNodes.forEach(pestaña => {
        pestaña.addEventListener('click', (event) => {
            let categoria = event.target.id;
            let nuevaCategoria = "?categoria=" + categoria;

            let padre = event.target.parentElement;
            padre.childNodes.forEach(hijo => {
                hijo.classList?.remove("pestañaActiva");
            });

            event.target.classList.add("pestañaActiva");

            window.history.pushState({ categoria }, '', nuevaCategoria);
            mostrarPlatos(platos);
        });

        parametrosBusqueda = new URLSearchParams(window.location.search); 

        if (pestaña.id == parametrosBusqueda.get('categoria')) {
            pestaña.click();
        }
    });

    // Muestra la pestaña actual
    mostrarPlatos(platos);

    // Se verifique que la haya algún elemento en el pedido
    const botonEnvio = document.getElementById('submit');
    botonEnvio.addEventListener('click', event => {
        console.log("Probando probando");
        let pedido = JSON.parse(localStorage.getItem('pedido')) ?? [];
        if (pedido.length == 0) {
            alert('No hay elementos en tu pedido, agrega alguno e intentalo de nuevo, por favor.')
            return;
        }

        let destino = String(window.location).split('/');
        destino[destino.length-1] = 'order.html';
        destino = destino.join('/');

        window.location.href = destino;

    });
}

// Funciones

function mostrarPlatos (platos) {
    const menu = document.getElementById('menu');
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

function obtenerPedidoAlmacenado(carrito) {
    let items = JSON.parse(localStorage.getItem('pedido')) ?? [];
    return items.map(item => new Plato(item.informacion, carrito, item.cantidad));
}

function actualizarCantidadPlatos(platos, platosActualizados) {
    for (let i = 0; i < platosActualizados.length; i++) {
        for (let j = 0; j < platos.length; j++) {
            if (platos[j].id == platosActualizados[i].id) {
                platos[j] = platosActualizados[i];
                break;
            }
        }
    }
}
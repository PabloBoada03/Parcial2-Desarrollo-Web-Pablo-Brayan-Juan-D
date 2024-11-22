window.onload = async () => {
    // Extrae la información de los platos
    const carrito = new Carrito();
    let platos = [];
    let informacionPlatos = await obtenerPlatosAPI();
    informacionPlatos.forEach(informacion => platos.push(new Plato(informacion, carrito)));

    // Se obtienen los datos almacenados en localStorage
    carrito.items = obtenerPedidoAlmacenado(carrito);
    carrito.actualizarCarrito();

    // Se actualizan los platos de la base de datos con la información almacenada en localStorage   
    actualizarCantidadPlatos(platos, carrito.items);

    // Chequea que categoría se desea ver
    let parametrosBusqueda = new URLSearchParams(window.location.search);
    if (!parametrosBusqueda.get('category')) {
        window.history.pushState({ categoria: "Appetizers" }, '', "?categoria=Appetizers");
    }

    // Asigna funcionalidad a las pestañas
    const pestañas = document.getElementById('pestañas');
    pestañas.children.item(0).childNodes.forEach(pestaña => {
        pestaña.addEventListener('click', (event) => {
            let categoria = event.target.id;
            let nuevaCategoria = "?category=" + categoria;

            let padre = event.target.parentElement;
            padre.childNodes.forEach(hijo => {
                hijo.classList?.remove("pestañaActiva");
            });

            event.target.classList.add("pestañaActiva");

            window.history.pushState({ categoria }, '', nuevaCategoria);
            mostrarPlatos(platos);
        });

        parametrosBusqueda = new URLSearchParams(window.location.search); 

        if (pestaña.id == parametrosBusqueda.get('category')) {
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

const apiDatos = 'http://127.0.0.1:8000/dishes'; // Enlace de la API donde estamos solicitando información de los platos

function obtenerPlatosAPI() {
    const apiDatos = 'http://127.0.0.1:8000/api/dishes';

    fetch(apiDatos)
        .then(response => {
            if (!response.ok) {
                console.error(`Error HTTP: ${response.status}`);
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();  // Parseamos la respuesta a JSON
        })
        .then(data => {
            // Usamos .map para transformar los objetos recibidos
            const platosTransformados = data.map(plato => ({
                id: plato.id, // Asegúrate de que estos nombres coincidan con los datos reales
                categoria: plato.category,
                nombre: plato.name,
                descripcion: plato.description,
                precio: plato.price,
                imgUrl: plato.img_url
            }));
        
            console.log('Platos transformados:', platosTransformados); // Verifica que los datos están correctamente transformados
            mostrarPlatos(platosTransformados); // Pasa los datos transformados a la función para mostrarlos
        })
} 

function mostrarPlatos (plato) {
    const menu = document.getElementById('menu');
    const contenedor = document.createElement('ul');
    const parametrosBusqueda = new URLSearchParams(window.location.search);

    plato.forEach(data => {
        console.log(data);  // Verifica que el objeto 'plato' tiene las propiedades correctas
    
        let categoriaActual = parametrosBusqueda.get('category') ?? 'Appetizers';
        console.log('Categoria actual:', categoriaActual);
    
        if (data.category) {
            console.log('Categoria del plato:', data.category);
            if (plato.category.toLowerCase() == categoriaActual) {
                console.log(data);
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
        } else {
            console.log('Este plato no tiene categoría definida:', data);
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
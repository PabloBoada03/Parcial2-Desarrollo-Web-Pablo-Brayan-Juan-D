window.onload = async () => {
    const token = sessionStorage.getItem('token');
    console.log(token)
    if (!sessionStorage.getItem('token')) {
        document.getElementById('button-logout').style.display = 'none';
    } else {
        document.getElementById('button-logout').style.display = 'block';
    }

    const logout = document.getElementById('button-logout');

    logout.addEventListener('click', async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        if (token) {
            await fetch('https://triogourmet-bps-pnt20242-unisabana.onrender.com/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    console.log("Error en la respuesta");
                    return;
                }
                response.json();
            })
            .then(response => {
                console.log(response);
                sessionStorage.clear();
                window.location.href = "index.html";
            })
            .catch(error => console.log("Error: ", error));
        }  
    });

    // Extrae la información de los platos
    const carrito = new Carrito();
    let platos = [];
    informacionPlatos = await obtenerPlatosAPI();
    informacionPlatos.forEach(informacion => platos.push(new Plato(informacion, carrito)));

    // Se obtienen los datos almacenados en sessionStorage
    carrito.items = obtenerPedidoAlmacenado(carrito);
    carrito.actualizarCarrito();

    // Se actualizan los platos de la base de datos con la información almacenada en sessionStorage   
    actualizarCantidadPlatos(platos, carrito.items);

    // Chequea que categoría se desea ver
    let parametrosBusqueda = new URLSearchParams(window.location.search);
    if (!parametrosBusqueda.get('categoria')) {
        window.history.pushState({ categoria: "entradas" }, '', "?categoria=entradas");
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
        let pedido = JSON.parse(sessionStorage.getItem('pedido')) ?? [];
        if (pedido.length == 0) {
            alert('No hay elementos en tu pedido, agrega alguno e intentalo de nuevo, por favor.')
            return;
        }

        let destino = String(window.location).split('/');
        if (sessionStorage.getItem('token')) {
            destino[destino.length-1] = 'order.html';
        } else {
            destino[destino.length-1] = 'loginCliente.html';
        }
        destino = destino.join('/');

        window.location.href = destino;

    });
}

// Funciones

const apiDatos = 'https://triogourmet-bps-pnt20242-unisabana.onrender.com/api/dishes'; // Enlace de la API donde estamos solicitando información de los platos

async function obtenerPlatosAPI() {
    respuesta = await fetch(apiDatos)
        .then(response => response.json())
        .then(response => response.map(plato => ({
            id: plato.id,
            categoria: plato.category,
            nombre: plato.name,
            descripcion: plato.description,
            precio: plato.price,
            imgUrl: plato.image_url
        })))
        .catch(error => console.log(error));
    return respuesta;
  }

function mostrarPlatos (platos) {
    const menu = document.getElementById('menu');
    const contenedor = document.createElement('ul');
    const parametrosBusqueda = new URLSearchParams(window.location.search);

    platos.forEach(plato => {
        let categoriaActual = parametrosBusqueda.get('categoria') ?? 'entradas';
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
    let items = JSON.parse(sessionStorage.getItem('pedido')) ?? [];
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
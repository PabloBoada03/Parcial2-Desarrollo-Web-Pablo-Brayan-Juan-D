window.onload = () => {
    if (!sessionStorage.getItem('token')) {
        alert('En estos momentos no se encuentra en una sesión activa. Inicie sesión antes de continuar, por favor.')
        window.location.href = 'loginCliente.html?redirect=order.html';
    }
    // Se comprueba que haya pedidos para realizar la compra
    const pedido = JSON.parse(sessionStorage.getItem('pedido')) ?? []; 
    if (pedido.length == 0) {
        alert("El pedido no se puede completar debido a que no hay ningun producto por comprar. Sera devuelto al menú para que pueda hacer su compra.");

        let destino = String(window.location);
        destino = destino.split("/");
        destino[destino.length-1] = "menu.html";
        destino = destino.join("/");

        // console.log(destino)

        window.location.href = destino;
        return;
    }

    // Se guarda la información del pedido en un input oculto para enviarlo posteriormente a la API
    document.getElementById('pedido').setAttribute('value', sessionStorage.getItem('pedido'));

    // Se establecen los eventos que guardan los datos del usuario
    const nombreCliente = document.getElementById('nombre');
    const telefonoCliente = document.getElementById('telefono');
    const direccionCliente = document.getElementById('direccion');

    nombreCliente.addEventListener('input', event => sessionStorage.setItem('nombreCliente', event.target.value));
    telefonoCliente.addEventListener('input', event => sessionStorage.setItem('telefonoCliente', event.target.value));
    direccionCliente.addEventListener('input', event => sessionStorage.setItem('direccionCliente', event.target.value));

    // Se muestra el pedido, el total y la información guardada del usuario
    agregarElementosPedido();

    document.getElementById('total').innerHTML = (Number(sessionStorage.getItem('total') ?? 0)).toFixed(3);

    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        nombreCliente.setAttribute('value', user.name);
        telefonoCliente.setAttribute('value', user.phone_number);
        direccionCliente.setAttribute('value', user.email);
    }

    // Enviar información del pedido al servidor
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', event => enviarPedidoServidor(event));
}

function agregarElementosPedido () {
    let informacionPedido = JSON.parse(sessionStorage.getItem('pedido')) ?? [];
    const elementosPedido = document.getElementById('elementos-pedido');

    let temp = document.createDocumentFragment();

    informacionPedido.forEach(elemento => {
        let contenedorElemento = document.createElement('ul');
        contenedorElemento.setAttribute('id', 'contenedor-elemento');

        let nombreElemento = document.createElement('li');
        let nombreModificado = elemento.informacion.nombre; // Agrega una (s) a la primera palabra
        nombreModificado = nombreModificado.split(' ');
        nombreModificado[0] += '(s)';
        nombreModificado = nombreModificado.join(' ');
        nombreElemento.innerHTML = nombreModificado;

        let valorElemento = document.createElement('li');
        valorElemento.innerHTML = elemento.informacion.precio;

        let cantidad = document.createElement('li');
        cantidad.innerHTML = elemento.cantidad;

        contenedorElemento.append(cantidad, nombreElemento, valorElemento);
        temp.appendChild(contenedorElemento);
    });

    elementosPedido.appendChild(temp);
}

// const apiPedidos = "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxIsFO3fw-FxkuLx3yOK8OeYiAXWbK4wSQr3LCWdP1BHt8--ptzlvPX0JIV_fS5KI6Zgw/exec"; // Enlace de la API donde estamos solicitando información de los platos 
const guardarPedidoEndPoint = "https://triogourmet-bps-pnt20242-unisabana.onrender.com/api/orders";

async function enviarPedidoServidor (event) {
    event.preventDefault();

    const client_id = parseInt(sessionStorage.getItem('id'));
    // console.log(client_id)
    const datosForm = new FormData(formulario);
    // console.log(datosForm.get('productosPedido'))

    const datosPedidoJSON = {
        status: "PENDING",
        dishes: JSON.parse(datosForm.get("productosPedido")).map(elemento => ({
            id: elemento.id,
            quantity: elemento.cantidad
        })),
        client_id: client_id
    };

    const token = sessionStorage.getItem('token');
    // console.log(JSON.stringify(datosPedidoJSON))
    // console.log(token)

    await fetch(guardarPedidoEndPoint, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(datosPedidoJSON)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al realizar la solicitud: " + response.status);
        }
    })
    .then(response => {
        console.log("Solicitud realizada con exito!");
        // console.log(response);

        sessionStorage.setItem('pedido', null);
        sessionStorage.setItem('total', null);

        alert("Compra exitosa! Será redirigido a la página principal. Muchas gracias por utilizar nuestros servicios.");

        let destino = String(window.location);
        destino = destino.split("/");
        destino[destino.length-1] = "index.html";
        destino = destino.join("/");

        window.location.href = destino;
        return;
    })
    .catch(error => {
        console.log(error);
        alert('En estos momentos no se encuentra en una sesión activa. Inicie sesión antes de continuar, por favor.');
        window.location.href = 'loginCliente.html?redirect=history.html';
    });
}
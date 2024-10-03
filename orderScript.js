window.onload = () => {
    // Se comprueba que haya pedidos para realizar la compra
    const pedido = JSON.parse(localStorage.getItem('pedido')) ?? []; 
    if (pedido.length == 0) {
        alert("El pedido no se puede completar debido a que no hay ningun producto por comprar. Sera devuelto al menú para que pueda hacer su compra.");

        let destino = String(window.location);
        destino = destino.split("/");
        destino[destino.length-1] = "menu.html";
        destino = destino.join("/");

        console.log(destino)

        window.location.href = destino;
        return;
    }

    // Se guarda la información del pedido en un input oculto para enviarlo posteriormente a la API
    document.getElementById('pedido').setAttribute('value', localStorage.getItem('pedido'));

    // Se establecen los eventos que guardan los datos del usuario
    const nombreCliente = document.getElementById('nombre');
    const telefonoCliente = document.getElementById('telefono');
    const direccionCliente = document.getElementById('direccion');

    nombreCliente.addEventListener('input', event => localStorage.setItem('nombreCliente', event.target.value));
    telefonoCliente.addEventListener('input', event => localStorage.setItem('telefonoCliente', event.target.value));
    direccionCliente.addEventListener('input', event => localStorage.setItem('direccionCliente', event.target.value));

    // Se muestra el pedido, el total y la información guardada del usuario
    agregarElementosPedido();

    document.getElementById('total').innerHTML = (Number(localStorage.getItem('total') ?? 0)).toFixed(3);

    nombreCliente.setAttribute('value', localStorage.getItem('nombreCliente') ?? '');
    telefonoCliente.setAttribute('value', localStorage.getItem('telefonoCliente') ?? '');
    direccionCliente.setAttribute('value', localStorage.getItem('direccionCliente') ?? '');

    // Enviar información del pedido al servidor
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', event => enviarPedidoServidor(event));
}

function agregarElementosPedido () {
    let informacionPedido = JSON.parse(localStorage.getItem('pedido')) ?? [];
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

const apiPedidos = "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxIsFO3fw-FxkuLx3yOK8OeYiAXWbK4wSQr3LCWdP1BHt8--ptzlvPX0JIV_fS5KI6Zgw/exec"; // Enlace de la API donde estamos solicitando información de los platos 

async function enviarPedidoServidor (event) {
    event.preventDefault();

    const datosPedido = new FormData(formulario);
    const datosPedidoJSON = {};
    datosPedido.forEach((valor, clave) => {
        datosPedidoJSON[clave] = valor;
    })

    const datosRelevantesProductos = JSON.parse(datosPedidoJSON.productosPedido).map(elemento => (
        {
            id: elemento.id,
            precio: elemento.informacion.precio,
            cantidad: elemento.cantidad
        }
    ));

    datosPedidoJSON.productosPedido = datosRelevantesProductos;
    datosPedidoJSON['valorTotal'] = localStorage.getItem('total');

    await fetch(apiPedidos, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosPedidoJSON)
    })
        .then(response => {
            console.log("Solicitud realizada con exito!");
            console.log(response);

            localStorage.setItem('pedido', null);
            localStorage.setItem('total', null);

            alert("Compra exitosa! Será redirigido a la página principal. Muchas gracias por utilizar nuestros servicios.");

            let destino = String(window.location);
            destino = destino.split("/");
            destino[destino.length-1] = "index.html";
            destino = destino.join("/");

            window.location.href = destino;
            return;
        })
        .catch(error => console.log(error))
}
window.onload = () => {
    const pedido = document.getElementById('pedido');
    pedido.setAttribute('value', localStorage.getItem('pedido'));

    // Configurar proceso al recibir respuesta del servidor

    agregarElementosPedido();
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

    console.log(temp)
    elementosPedido.appendChild(temp);
}
const apiDatos = 'https://script.google.com/macros/s/AKfycbzbRgQm2M03Jh_JQ1xTdWjm8H6xl0dkSQXuo1o5oHCflh-pnmaENpyEV5sjsQE6TE2-Ow/exec';
let datosPlatos = []; 

async function informacionPlatos() {
  try {
    const respuesta = await fetch(apiDatos);
    
    if (!respuesta.ok) {
      throw new Error('Error de la respuesta: ' + respuesta.status);
    }

    const resultado = await respuesta.json();
    datosPlatos = resultado.data;

    // Acceder al contenedor donde se van a agregar los platos
    const contenedorPlatos = document.getElementById('menu');
    contenedorPlatos.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos platos

    const pestana = document.getElementById('pestañas');
    // Iterar sobre los datos obtenidos y crear instancias de la clase Plato
    datosPlatos.forEach(item => {
      const informacionPlato = {
        id: item.ID,
        nombre: item.NOMBRE,
        descripcion: item.DESCRIPCION,
        precio: item.PRECIO,
        imgUrl: item.IMGURL
      };
      
      // Crear una instancia de la clase Plato y agregarla al contenedor
      const carrito = new Carrito(); // Asegúrate de que la clase Carrito esté definida
      const plato = new Plato(informacionPlato, carrito);
      const platoElemento = plato.crearElemento();
      contenedorPlatos.appendChild(platoElemento);

      const categoria = item.CATEGORIA;
      if (categoria == "Entradas"){
        document.querySelector('#contenedorEntradas').appendChild(platoElemento);
      } else if (categoria === 'Principales') {
        document.querySelector('#contenedorPrincipales ul').appendChild(platoElemento);
      } else if (categoria === 'Postres') {
        document.querySelector('#contenedorPostres ul').appendChild(platoElemento);
      } else if (categoria === 'Bebidas') {
        document.querySelector('#contenedorBebidas ul').appendChild(platoElemento);
      }
    });
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
}

// Llamar a la función para obtener los datos
informacionPlatos();

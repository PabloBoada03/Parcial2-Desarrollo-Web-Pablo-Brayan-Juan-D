window.onload = async () => {
    if (!sessionStorage.getItem('token')) {
        alert('En estos momentos no se encuentra en una sesión activa. Inicie sesión antes de continuar, por favor.')
        window.location.href = 'loginCliente.html?redirect=history.html';
        return;
    }

    const client = await getClient();
    showOrders(client.orders);

    const logout_button = document.getElementById('button-logout');

    logout_button.addEventListener('click', async (event) => {
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
                // console.log(response)
                if (!response.ok) {
                    console.log("Error en la respuesta");
                    return;
                }
                response.json();
            })
            .then(response => {
                sessionStorage.clear();
                window.location.href = 'index.html'
            })
            .catch(error => console.log("Error: ", error));
        }  
    });

}


// FUNCIONES

async function getClient() {
    const API_URL = 'https://triogourmet-bps-pnt20242-unisabana.onrender.com';
    const client_id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    // console.log(token);
    return await fetch (`${API_URL}/api/clients/${client_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al realizar la solicitud: " + response.status);
        }
    })
    .catch(error => {
        console.log(error);
        alert('En estos momentos no se encuentra en una sesión activa. Inicie sesión antes de continuar, por favor.');
        window.location.href = 'loginCliente.html?redirect=history.html';
    });
}

function showOrders(orders) {
    const ordersFields = document.getElementById('ordersFields');
    ordersFields.innerHTML = ''; 
    // console.log(orders.length);

    if (orders.length === 0) {
        ordersFields.innerHTML = '<tr><td colspan="4">No se encontraron pedidos.</td></tr>';
        return;
    }
    // console.log(orders);
    orders.forEach((order) => {
        console.log('Procesando pedido:', order); 

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${getLocalTime(order.created_at)}</td>
        `;
        let dishes = document.createElement('ul');
        let total = 0;
        order.dishes.forEach((dish) => {
            let li = document.createElement('li')
            li.innerHTML = `${dish.name} (${dish.pivot.quantity})`;
            total += dish.price*dish.pivot.quantity;
            dishes.append(li)
        });
        let dishes_campo = document.createElement('td');
        dishes_campo.append(dishes);
        row.append(dishes_campo);
        row.innerHTML += `<td>$${total}</td>`;
        ordersFields.appendChild(row);
    });
}

function getLocalTime(time) {
    const fechaUTC = new Date(time);

    const options = {
        timeZone: 'America/Bogota', 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, 
    };

    const fechaColombiana = new Intl.DateTimeFormat('es-CO', options).format(fechaUTC);
    return fechaColombiana;
}
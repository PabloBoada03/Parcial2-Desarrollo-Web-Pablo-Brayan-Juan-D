window.onload = () => {
    const button_ingresar = document.getElementById("button_ingresar");
    const input_email = document.getElementById("input_email");
    const input_password = document.getElementById("input_password");
    const label_message = document.getElementById("label_message");

    input_email.setAttribute('value', sessionStorage.getItem('email'));
    input_password.setAttribute('value', sessionStorage.getItem('password'));

    
    button_ingresar.addEventListener("click", async () => {
        const email = input_email.value;
        const password = input_password.value;

        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);

        input_email.innerHTML = '';
        input_password.innerHTML = '';
        
        const token = sessionStorage.getItem('token');
        let loged = true;

        if (!token || token == "undefined") {
            loged = await login(email, password);
        }

        if (loged) {
            alert('Se ha iniciado sesión exitosamente.')
            const params = new URLSearchParams(window.location.search);
            window.location.href = params.get('redirect') ?? 'index.html';
        }
    });
}


async function login(email, password) {
    console.log("login");
    return fetch('https://triogourmet-bps-pnt20242-unisabana.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${email}:${password}`),
            'Content-Type': 'application/json',
            'User-Type': 'client'
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            label_message.textContent = 'Nombre o contraseña incorrectos';
            throw new Error("Error de autenticación: " + response.status);
        }
    })
    .then(datos =>{
        sessionStorage.setItem('token', datos.access_token);
        sessionStorage.setItem('id', datos.user.id);
        sessionStorage.setItem('user', JSON.stringify(datos.user))
        return true;
    })
    .catch(error => {
        console.error("Error: " + error);
        return false;
    });
}

window.onload = () => {
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
}
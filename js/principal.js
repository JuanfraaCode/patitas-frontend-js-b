window.addEventListener('load', function(){
    
    // Referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // Recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    const btnLogout = this.document.getElementById('btnLogout');

    // Mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    /* btnLogout.addEventListener('click', function(event){
        event.preventDefault();
        logout();
    })*/
});


btnLogout.addEventListener('click', function(event) {
    event.preventDefault();

    const tipoDocumento = JSON.parse(localStorage.getItem('result')).tipoDocumento
    const numeroDocumento = JSON.parse(localStorage.getItem('result')).numeroDocumento

    const url = 'http://localhost:8082/login/logout';

    if (!tipoDocumento || !numeroDocumento) {
        alert('Error: no se encontraron las credenciales necesarias.');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.msjError || 'Error en la respuesta de la red');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.resultado) {
            alert('Sesión cerrada con éxito');
            localStorage.removeItem('result');
            window.location.replace('index.html');
        } else {
            alert(data.msjError);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al cerrar sesión: ' + error.message);
    });
});


function mostrarAlerta(msjError){
    msgSuccess.innerHTML = msjError;
    msgSuccess.style.display = 'block';
}

// PARTE DEL EXAMEN T3
/*
async function logout() {
    const url = 'http://localhost:8082/login/logout-async';
    const result = JSON.parse(localStorage.getItem('result'));
    if (!result) {
        console.error("No se encontró el item 'result' en localStorage.");
        return;
    }
    const responseBody = {
        tipoDocumento: result.tipoDocumento,
        numeroDocumento: result.numeroDocumento
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        });

        if (!response.ok) {
            console.error('Error al cerrar sesión: ', response.statusText);
            throw new Error(`Error: ${response.statusText}`);
        }

        const resultLogout = await response.json();
        console.log('Respuesta del servidor: ', resultLogout);
        
        if (resultLogout.resultado === true) {
            localStorage.setItem('resultLogout', JSON.stringify(resultLogout));
            localStorage.removeItem('result');
            window.location.replace('index.html');
        } else {
            mostrarAlerta(resultLogout.msjError);
        }


    } catch (error) {
        console.error('Error: Ocurrio un problema ', error);
        mostrarAlerta('Error: Ocurrio un problema ')
    }
};
*/

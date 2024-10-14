window.addEventListener('load', function(){
    
    // Referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // Recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    const btnLogout = this.document.getElementById('btnLogout');

    // Mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    btnLogout.addEventListener('click', function(event){
        event.preventDefault();
        logout(); 
    })
});

function mostrarAlerta(msjError){
    msgSuccess.innerHTML = msjError;
    msgSuccess.style.display = 'block';
}

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
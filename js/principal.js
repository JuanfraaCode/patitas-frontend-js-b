window.addEventListener('load', function(){
    
    // Referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // Recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // Mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
});

function mostrarAlerta(mensaje){
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}